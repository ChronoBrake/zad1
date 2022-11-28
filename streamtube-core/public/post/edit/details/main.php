<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$postdata = $args['post'];

$args = $args['args'];

streamtube_core_the_field_control( array(
    'label'         =>  esc_html__( 'Title', 'streamtube-core' ),
    'type'          =>  'text',
    'name'          =>  'post_title',
    'value'         =>  $postdata ? $postdata->post_title : ''
) );

streamtube_core_the_field_control( array(
    'label'         =>  esc_html__( 'Slug', 'streamtube-core' ),
    'type'          =>  'text',
    'name'          =>  'post_name',
    'value'         =>  $postdata ? $postdata->post_name : ''
) );

if( $postdata && $postdata->post_status == 'future' ): ?>
    <div class="alert alert-scheduled alert-info p-2 px-3">
        <?php printf(
            esc_html__( 'This %s is scheduled.', 'streamtube-core' ),
            $postdata->post_type
        );?>
    </div>
<?php endif;

/**
 *
 * Fires before content
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/post/edit/content/before' );

if( array_key_exists( 'mode', $args ) && $args['mode'] == 'simple' ){
    streamtube_core_the_field_control( array(
        'type'          =>  'textarea',
        'label'         =>  esc_html__( 'Content', 'streamtube-core' ),
        'name'          =>  'post_content',
        'value'         =>  $postdata ? $postdata->post_title : ''
    ) );
}
else{

    $editor_setings = array(
        'teeny'             =>  false,
        'media_buttons'     =>  false,
        'drag_drop_upload'  =>  false
    );

    if( get_option( 'editor_add_media' ) ){
        $editor_setings = array_merge( $editor_setings, array(
            'media_buttons'     =>  current_user_can( 'upload_files' ) ? true : false,
            'drag_drop_upload'  =>  current_user_can( 'upload_files' ) ? true : false
        ) );
    }

    if( ! current_user_can( 'administrator' ) ){
        $editor_setings = array_merge( $editor_setings, array(
            'teeny'         => true,
            'tinymce'       => array(
                'toolbar1'      => 'bold,italic,underline,bullist,numlist,unlink,forecolor,undo,redo,image'
            ),
            'quicktags'     =>  array(
                'buttons'   => 'strong,em,underline,ul,ol,li,code,img'
            )
        ) );
    }    

    streamtube_core_the_field_control( array(
        'label'     =>  esc_html__( 'Content', 'streamtube-core' ),
        'type'      =>  'editor',
        'name'      =>  'post_content',
        'settings'  =>  $editor_setings,
        'value'     =>  $postdata ? $postdata->post_content : ''
    ) );
}
/**
 *
 * Fires after content field.
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/post/edit/content/after' );

$tax = '';

$terms = array();

if( $postdata ){

    $args['post_type'] = $postdata->post_type;

    $tax = sprintf( '%s_tag', $postdata->post_type );

    $terms = get_the_terms( $postdata->ID,  $tax );
}
else{
    $tax = sprintf( '%s_tag', $args['post_type'] );
}

if( get_option( $args['post_type'] . '_taxonomy_' . $tax, 'on' ) ){
    streamtube_core_the_field_control( array(
    	'label'			=>	esc_html__( 'Tags', 'streamtube-core' ),
    	'name'			=>	sprintf( 'tax_input[%s]', $tax ),
    	'value'			=>	is_array( $terms ) ? join(',', wp_list_pluck( $terms, 'name' ) ) : '',
        'data'          =>  array(
            'data-role'     =>  'tagsinput',
            'data-max-tags' =>  get_option( $args['post_type'] . '_taxonomy_' . $tax . '_max_items', 0 )
        ),
    	'wrap_class'	=>	'taginput-wrap'
    ) );
}

$post_statuses = get_post_statuses();

unset( $post_statuses['draft'] );

if( current_user_can( 'edit_others_posts' ) ){
    $post_statuses['reject'] = esc_html__( 'Reject', 'streamtube-core' );
}
else{
    unset( $post_statuses['publish'] );
}

if( array_key_exists( 'publish', $post_statuses ) ){
    $post_statuses['publish'] = esc_html__( 'Public', 'streamtube-core' );
}

if( get_option( 'auto_publish', 'on' ) ){
    $post_statuses['publish'] = esc_html__( 'Public', 'streamtube-core' );
}

/**
 *
 * Filter the statuses
 * 
 * @param  array $post_statuses
 *
 * @since  1.0.0
 * 
 */
$post_statuses = apply_filters( 'streamtube/core/post/edit/statuses', $post_statuses );

$post_status = $postdata ? $postdata->post_status : '';

if( $post_status == 'future' ){
    $post_status = 'publish';
}

streamtube_core_the_field_control( array(
	'label'			=>	esc_html__( 'Visibility', 'streamtube-core' ),
	'type'			=>	'select',
	'name'			=>	'post_status',
	'current'		=>	$post_status,
	'options'		=>	$post_statuses
) );

streamtube_core_the_field_control( array(
    'label'         =>  esc_html__( 'Publish', 'streamtube-core' ),
    'type'          =>  'datetime-local',
    'name'          =>  'post_date',
    'value'         =>  $postdata ? date( 'Y-m-d\TH:i' , strtotime( $postdata->post_date ) ) : ''
) );

/**
 *
 * Fires before meta fields
 *
 * @since 1.1
 * 
 */
do_action( 'streamtube/core/post/edit/meta/before', $postdata );

if( $postdata && $postdata->post_type == 'video' ):

    ?>
    <div class="row">
        <div class="col-6">
            <?php
        	streamtube_core_the_field_control( array(
        		'label'			=>	esc_html__( 'Aspect Ratio', 'streamtube-core' ),
        		'type'			=>	'select',
        		'name'			=>	'meta_input[_aspect_ratio]',
                'current'       =>  $postdata ? streamtube_core()->get()->post->get_aspect_ratio( $postdata->ID ) : '',
        		'options'		=>	array(
                    ''      =>  esc_html__( 'Default', 'streamtube-core' ),
        			'21x9'	=>	esc_html__( '21x9', 'streamtube-core' ),
        			'16x9'	=>	esc_html__( '16x9', 'streamtube-core' ),
        			'4x3'	=>	esc_html__( '4x3', 'streamtube-core' ),
        			'1x1'	=>	esc_html__( '1x1', 'streamtube-core' )
        		)
        	) );
            ?>
            </div>
        <div class="col-6">
            <?php
            streamtube_core_the_field_control( array(
                'label'         =>  esc_html__( 'Video Length', 'streamtube-core' ),
                'type'          =>  'text',
                'name'          =>  'meta_input[_length]',
                'value'         =>  $postdata ? streamtube_core()->get()->post->get_length( $postdata->ID ) : ''
            ) );
            ?>
        </div>
    </div>

    <?php

endif;

/**
 *
 * Fires after meta fields
 *
 * @since 1.1
 * 
 */
do_action( 'streamtube/core/post/edit/meta/after', $postdata );

streamtube_core_the_field_control( array(
	'label'			=>	esc_html__( 'Allow comments', 'streamtube-core' ),
	'type'			=>	'checkbox',
	'name'			=>	'comment_status',
    'value'         =>  'open',
    'current'       =>  $postdata ? $postdata->comment_status : 'open'
) );
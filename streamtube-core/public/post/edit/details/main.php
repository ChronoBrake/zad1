<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

global $post, $post_type_screen, $streamtube;

/**
 *
 * Fires before title
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/post/edit/title/before', $post );

if( $post && $post->post_status == 'future' ): ?>
    <div class="alert alert-scheduled alert-info p-2 px-3">
        <?php printf(
            esc_html__( 'This %s is scheduled.', 'streamtube-core' ),
            $post->post_type
        );?>
    </div>
<?php endif;

streamtube_core_the_field_control( array(
    'label'         =>  esc_html__( 'Title', 'streamtube-core' ),
    'type'          =>  'text',
    'name'          =>  'post_title',
    'value'         =>  $post ? $post->post_title : ''
) );

if( apply_filters( 'streamtube/core/post/edit/slug', true ) === true ){
    streamtube_core_the_field_control( array(
        'label'         =>  esc_html__( 'Slug', 'streamtube-core' ),
        'type'          =>  'text',
        'name'          =>  'post_name',
        'value'         =>  $post ? $post->post_name : ''
    ) );
}

if( $post && $post->post_type == 'video' && ! wp_doing_ajax() ){
    if( get_option( 'allow_edit_source' ) || current_user_can( 'administrator' ) ){
        streamtube_core_the_field_control( array(
            'label'         =>  esc_html__( 'Trailer', 'streamtube-core' ),
            'type'          =>  'text',
            'name'          =>  'video_trailer',
            'value'         =>  $post ? esc_attr( $streamtube->get()->post->get_video_trailer( $post->ID ) ) : '',
            'wpmedia'       =>  true
        ) );

        streamtube_core_the_field_control( array(
            'label'         =>  esc_html__( 'Main Source', 'streamtube-core' ),
            'type'          =>  'text',
            'name'          =>  'video_source',
            'value'         =>  $post ? esc_attr( $streamtube->get()->post->get_source( $post->ID ) ) : '',
            'wpmedia'       =>  true
        ) );        
    }
}

/**
 *
 * Fires before content
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/post/edit/content/before', $post );

if( ! wp_doing_ajax() ){
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

    if( apply_filters( 'streamtube/core/wpeditor/teeny', false ) === true ){
        $editor_setings = array_merge( $editor_setings, array(
            'teeny'             =>  true,
            'media_buttons'     =>  false,
            'drag_drop_upload'  =>  false,
            'tinymce'       => array(
                'toolbar1'      => 'bold,italic,underline,bullist,numlist,link,unlink,forecolor,undo,redo,image'
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
        'value'     =>  $post ? $post->post_content : ''
    ) );    
}
else{
    echo '<div class="wp-editor-wrap">';
        streamtube_core_the_field_control( array(
            'type'      =>  'textarea',
            'name'      =>  'post_content',
            'id'        =>  '_post_content',
            'value'     =>  $post ? $post->post_content : ''
        ) );
    echo '</div>';
}


?>
<style type="text/css">

    <?php if( ! current_user_can( 'administrator' ) ): ?>
        #wp-link-wrap{
            height:  320px;
        }            
        #wp-link-wrap #search-panel,
        #wp-link-wrap #wplink-link-existing-content,
        #wp-link .link-target label span{
            display: none!important;
        }
    <?php endif;?>

    #wp-link-wrap .link-target{
        margin-top: 1rem
    }

    #wp-link-wrap #link-options label,
    #wp-link-wrap #link-options label input[type=text],
    #wp-link-wrap #link-options label input[type=url]{
        width:  100%;
    }

    #wp-link-wrap #link-options label span{
        width:  auto;
    }

    html[data-theme=dark] div.mce-panel,
    html[data-theme=dark] #wp-link-wrap{
        background: #333;
        border: 1px solid #444;
    }

    html[data-theme=dark] #wp-link-wrap #link-modal-title{
        background:  #222;
        border-bottom: 1px solid #666;
    }

    html[data-theme=dark] #wp-link-wrap .submitbox{
        background:  #222;
        border-top: 1px solid #666;
    }

    html[data-theme=dark] #wp-link-wrap .submitbox #wp-link-cancel button{
        color: #f9f9f9;
        border-color: #444;
        background: #333;            
    }

    html[data-theme=dark] .mce-window-head{
        background:  #222;
        border-bottom: 1px solid #666;
        color: #f9f9f9;
    }

    html[data-theme=dark] .mce-window-head .mce-title{
        color: #f9f9f9;
    }
</style>
<?php
/**
 *
 * Fires after content field.
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/post/edit/content/after', $post );

$tax = sprintf( '%s_tag', $post_type_screen );

$terms = array();

if( $post ){
    $terms = get_the_terms( $post->ID,  $tax );
}

if( get_option( $post_type_screen . '_taxonomy_' . $tax, 'on' ) ){
    streamtube_core_the_field_control( array(
    	'label'			=>	esc_html__( 'Tags', 'streamtube-core' ),
    	'name'			=>	sprintf( 'tax_input[%s]', $tax ),
    	'value'			=>	is_array( $terms ) ? join(',', wp_list_pluck( $terms, 'name' ) ) : '',
        'data'          =>  array(
            'data-role'     =>  'tagsinput',
            'data-max-tags' =>  get_option( $post_type_screen . '_taxonomy_' . $tax . '_max_items', 0 )
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
$post_statuses = apply_filters( 'streamtube/core/post/edit/statuses', $post_statuses, $post );

$post_status = $post ? $post->post_status : '';

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
    'value'         =>  $post ? date( 'Y-m-d\TH:i' , strtotime( $post->post_date ) ) : ''
) );

/**
 *
 * Fires before meta fields
 *
 * @since 1.1
 * 
 */
do_action( 'streamtube/core/post/edit/meta/before', $post );

if( $post && $post->post_type == 'video' ):

    ?>
    <div class="row">
        <div class="col-6">
            <?php
        	streamtube_core_the_field_control( array(
        		'label'			=>	esc_html__( 'Aspect Ratio', 'streamtube-core' ),
        		'type'			=>	'select',
        		'name'			=>	'meta_input[_aspect_ratio]',
                'current'       =>  $post ? streamtube_core()->get()->post->get_aspect_ratio( $post->ID ) : '',
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
                'value'         =>  $post ? streamtube_core()->get()->post->get_length( $post->ID ) : ''
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
do_action( 'streamtube/core/post/edit/meta/after', $post );

streamtube_core_the_field_control( array(
	'label'			=>	esc_html__( 'Allow comments', 'streamtube-core' ),
	'type'			=>	'checkbox',
	'name'			=>	'comment_status',
    'value'         =>  'open',
    'current'       =>  $post ? $post->comment_status : 'open'
) );

if( $post ){
    printf(
        '<input type="hidden" name="post_ID" value="%s">',
        $post->ID
    );
}
<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$output = '';

$user_id = get_queried_object_id();

$widget_args = array(
	'before_widget' => '<div class="widget widget-elementor %1$s">',
	'after_widget'  => '</div>',
	'before_title'  => '<div class="widget-title-wrap"><h2 class="widget-title no-after">',
	'after_title'   => '</h2></div>',	
);

$template = streamtube_get_user_template_settings();

extract( $template );    
?>
<section class="section-profile profile-home py-4 pb-0 m-0">
    <div class="<?php echo sanitize_html_class( get_option( 'user_content_width', 'container' ) );?>">
    	<?php 

    	ob_start();

    	/**
    	 *
    	 * Fires before widgets
    	 * 
    	 */
    	do_action( 'streamtube/core/user/profile/home/widgets/before' );

    	if( count_user_posts( $user_id, 'video', true ) > 0 ):
	    	the_widget( 'Streamtube_Core_Widget_Posts', array(
	    		'title'					=>	esc_html__( 'Videos', 'streatube-core' ),
	    		'author'				=>	$user_id,
	    		'posts_per_page'		=>	4,
	    		'orderby'				=>	'date',
	    		'order'					=>	'DESC',
	            'show_post_date'        =>  true,
	            'show_post_comment'     =>  false,
	            'hide_empty_thumbnail'  =>  true,
	            'col_xxl'               =>  (int)$posts_per_column,
	            'col_xl'                =>  (int)$col_xl,
	            'col_lg'                =>  (int)$col_lg,
	            'col_md'                =>  (int)$col_md,
	            'col_sm'                =>  (int)$col_sm,
	            'col'                   =>  (int)$col	            
	    	), $widget_args );
    	endif;
    	?>

    	<?php the_widget( 'Streamtube_Core_Widget_Term_Grid', array(
    		'title'					=>	esc_html__( 'Collections', 'streatube-core' ),
    		'taxonomy'				=>	array( Streamtube_Core_Collection::TAX_COLLECTION ),
    		'user_id'				=>	$user_id,
    		'number'				=>	4,
    		'public_only'			=>	true,
    		'layout'				=>	'playlist',
            'col_xxl'               =>  (int)$posts_per_column,
            'col_xl'                =>  (int)$col_xl,
            'col_lg'                =>  (int)$col_lg,
            'col_md'                =>  (int)$col_md,
            'col_sm'                =>  (int)$col_sm,
            'col'                   =>  (int)$col
    	), $widget_args );
    	?>    	

    	<?php 
    	if( count_user_posts( $user_id, 'post', true ) > 0 ):
	    	the_widget( 'Streamtube_Core_Widget_Posts', array(
	    		'title'					=>	esc_html__( 'Blogs', 'streatube-core' ),
	    		'post_type'				=>	'post',
	    		'author'				=>	$user_id,
	    		'posts_per_page'		=>	4,
	    		'orderby'				=>	'date',
	    		'order'					=>	'DESC',
	            'show_post_date'        =>  true,
	            'show_post_comment'     =>  false,
	            'hide_empty_thumbnail'  =>  true,
	            'col_xxl'               =>  (int)$posts_per_column,
	            'col_xl'                =>  (int)$col_xl,
	            'col_lg'                =>  (int)$col_lg,
	            'col_md'                =>  (int)$col_md,
	            'col_sm'                =>  (int)$col_sm,
	            'col'                   =>  (int)$col	            
	    	), $widget_args );
    	endif;
    	?>

    	<?php
    	/**
    	 *
    	 * Fires after widgets
    	 * 
    	 */
    	do_action( 'streamtube/core/user/profile/home/widgets/after' );    	

    	$output = ob_get_clean();
    	?>

    	<?php if( ! empty( trim( $output ) ) ){
    		echo $output;
    	}else{
    		?>
            <div class="not-found p-3 text-center text-muted fw-normal h6"><p>
                <?php
                 if( streamtube_core_is_my_profile() ){
                 	esc_html_e( 'You have not updated any content yet.', 'streamtube-core' );
                 }
                 else{
                    printf(
                        esc_html__( '%s has not updated any content yet.', 'streamtube-core' ),
                        '<strong>'. get_user_by( 'ID', $user_id )->display_name .'</strong>'
                    );                    
                 }
                ?>
            </p></div>
    		<?php
    	}?>

    </div>
</section>
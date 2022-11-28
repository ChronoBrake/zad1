<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$template = streamtube_get_user_template_settings();

extract( $template );

$heading = apply_filters( 'streamtube/core/user/profile/collections', esc_html__( 'Collections', 'streatube-core' ));
?>
<section class="section-profile profile-collections py-4 pb-0 m-0">
    <div class="<?php echo sanitize_html_class( get_option( 'user_content_width', 'container' ) );?>">

    	<?php if( $heading ): ?>
	        <div class="widget-title-wrap">
	            <h2 class="widget-title no-after">
	                <?php echo $heading;?>
	            </h2>
	        </div>
        <?php endif;?>
        
		<?php

		$args = apply_filters( 'streamtube/core/user/profile/collections/args', array(
			'taxonomy'		=>	array( Streamtube_Core_Collection::TAX_COLLECTION ),
			'public_only'	=>	true,
			'layout'		=>	'playlist',
			'user_id'		=>	get_queried_object_id(),
			'number'		=>	(int)$posts_per_column * (int)$rows_per_page,
			'term_author'	=>	false,
            'col_xxl'       =>  (int)$posts_per_column,
            'col_xl'        =>  (int)$col_xl,
            'col_lg'        =>  (int)$col_lg,
            'col_md'        =>  (int)$col_md,
            'col_sm'        =>  (int)$col_sm,
            'col'           =>  (int)$col,
            'pagination'     =>  $pagination,
		) );

		ob_start();
		the_widget( 'Streamtube_Core_Widget_Term_Grid', $args );
		$output = ob_get_clean();

		if( ! empty( $output ) ){
			echo $output;
		}else{
	        echo '<div class="not-found p-3 text-center text-muted fw-normal h6"><p>';

	            if( streamtube_core_is_my_profile() ){
	                esc_html_e( 'You have not created any collections yet.', 'streamtube' );
	            }
	            else{
	                printf(
	                    esc_html__( '%s has not created any collections yet.', 'streamtube' ),
	                    '<strong>'. get_user_by( 'ID', get_queried_object_id() )->display_name .'</strong>'
	                );
	            }

	        echo '</p></div>';
		}

		?>

    </div>
</section>
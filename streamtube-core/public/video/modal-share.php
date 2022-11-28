<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

if( ! is_singular( 'video' ) ){
	return;
}

?>
<div class="modal fade" id="modal-video-share" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-video-share-label" aria-hidden="true">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content bg-white">
			<div class="modal-header bg-light">
				<h5 class="modal-title" id="modal-video-share-label">
					<?php esc_html_e( 'Share', 'streamtube-core' ); ?>
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="<?php esc_html_e( 'Close', 'streamtube-core' ); ?>"></button>
			</div>
			<div class="modal-body">
				<form>

					<?php
					/**
					 *
					 * Fires before share fields.
					 *
					 * @since  1.0.0
					 * 
					 */
					do_action( 'streamtube/single/video/share/before' );
					?>

					<?php get_template_part( 'template-parts/social-share' ); ?>

					<?php 

					$share_url = wp_get_shortlink();

					if( function_exists( 'streamtube_get_share_permalink' ) ){
						$share_url = streamtube_get_share_permalink();
					}

					streamtube_core_the_field_control( array(
						'label'	=>	esc_html__( 'Link', 'streamtube-core' ),
						'type'	=>	'url',
						'name'	=>	'short-link',
						'value'	=>	$share_url,
						'data'	=>	array(
							'onfocus'	=>	'this.select();'
						)
					) );
					?>

					<?php 
					streamtube_core_the_field_control( array(
						'label'	=>	esc_html__( 'Embed', 'streamtube-core' ),
						'type'	=>	'textarea',
						'name'	=>	'share-embed',
						'value'	=>	get_post_embed_html( 560, 315, get_the_ID() ),
						'data'	=>	array(
							'onfocus'	=>	'this.select();'
						)						
					) );
					?>

					<?php
					/**
					 *
					 * Fires after share fields.
					 *
					 * @since  1.0.0
					 * 
					 */
					do_action( 'streamtube/single/video/share/after' );
					?>

				</form>
			</div><!--.modal-body-->
		</div>
	</div>
</div>
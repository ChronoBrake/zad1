<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
wp_enqueue_script( 'bootstrap-tagsinput' );
wp_enqueue_style( 'bootstrap-tagsinput' );
?>
<div class="modal fade" id="modal-embed" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modal-upload-label" aria-hidden="true">
	<div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content step-wrap bg-white">
			<div class="modal-header bg-light">
				<h5 class="modal-title" id="modal-embed-label">
					<?php esc_html_e( 'Embed Video', 'streamtube-core' ); ?>
				</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="<?php esc_attr_e( 'Close', 'streamtube-core' ); ?>"></button>
			</div>

			<div class="modal-body">

				<form id="form-embed-video" class="form-ajax form-regular upload-video-form">

					<div class="tab-content">

						<?php if( ! Streamtube_Core_Permission::can_upload() ):?>

							<div class="alert alert-danger d-flex align-items-center mb-3">
								<span class="icon-cancel-circled h4 m-0"></span>
								<div class="error-messsage">
									<?php esc_html_e( 'Sorry, You do not have permission to embed videos.', 'streamtube-core' ); ?>

									<?php do_action( 'streamtube/core/form/embed_video/no_perm_text' );?>
								</div>
							</div>

						<?php endif;?>						
					
						<div class="tab-pane tab-upload-file active">

							<?php
							/**
							 * @since 2.1.7
							 */
							do_action( 'streamtube/core/form/embed_video/before' );
							?>

							<?php streamtube_core_the_field_control( array(
								'label'			=>	esc_html__( 'Source', 'streamtube-core' ),
								'name'			=>	'source',
								'type'			=>	'textarea',
								'required'		=>	true
							) );
							?>

							<?php
							/**
							 * @since 2.1.7
							 */
							do_action( 'streamtube/core/form/embed_video/after' );
							?>

						</div>

						<div class="tab-pane tab-details">

				            <div class="row">
				                <div class="col-12 col-xl-8">
			                        <?php streamtube_core_load_template( 'post/edit/details/main.php', false, array(
			                            'post'  =>  null,
			                            'args'  =>  array(
			                            	'post_type'	=>	'video',
			                            	'mode'		=>	'simple'
			                            )
			                        ) ); ?>
	                    		</div>
				                <div class="col-12 col-xl-4">
				                    <?php streamtube_core_load_template( 'post/edit/metaboxes.php', false, array(
			                            'post'  =>  null,
			                            'args'  =>  array(
			                            	'post_type'	=>	'video'
			                            )
			                        )  ); ?>
				                </div><!--.col-3-->
	                		</div>
						</div>

					</div>

					<input type="hidden" name="action" value="import_embed">
					<input type="hidden" name="post_ID" value="0">
					<input type="hidden" name="quick_update" value="1">

				</form>

			</div>

			<div class="modal-footer bg-light gap-3">

				<div class="form-submit d-flex">

					<button form="form-embed-video" type="submit" class="btn btn-danger px-4 text-white btn-next">
						<span class="icon-plus"></span>
						<?php esc_html_e( 'Import', 'streamtube-core' ); ?>
					</button>

				</div>

			</div>			

		</div>
	</div>
</div>
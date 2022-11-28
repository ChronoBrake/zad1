<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

wp_enqueue_style( 'cropperjs' );
wp_enqueue_script( 'cropperjs' );

?>
<div class="widget">

	<div class="widget-content">
		<form class="form form-profile form-avatar form-user-photo form-ajax">
			<?php
			$opts = array(
				'viewMode'				=>	3,
				'dragMode'				=>	'move',
				'cropBoxMovable'		=>	false,
				'aspectRatio'			=>	'1/1',
				'rotatable'		=>	true,
				'minCropBoxWidth'		=>	250,
				'minCropBoxHeight'		=>	250
			);
			?>
			<div class="d-flex flex-column">
				<?php printf(
					'<div class="cropper-wrap border" style="width: %spx; height: %spx">',
					esc_attr( $opts['minCropBoxWidth'] ),
					esc_attr( $opts['minCropBoxHeight'] )
				);?>
					
					<?php printf(
						'<img data-option="%s" class="cropper-img invisible">',
						esc_attr( json_encode($opts) )
					);?>

				</div>
				<div class="form-submit mx-auto mt-5">
					<label class="btn btn-info text-white me-3">
						<input type="file" name="file" class="cropper-input d-none" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff">
						<span class="icon-picture"></span>
						<span class="button-label">Browse image</span>
					</label>

					<button type="submit" class="btn btn-primary ms-auto">
						<span class="icon-floppy"></span>
						<span class="button-label">
							<?php esc_html_e( 'Save Changes', 'streamtube-core' ); ?>
						</span>
					</button>

					<input type="hidden" name="image_data">
					<input type="hidden" name="image_base64">

					<input type="hidden" name="action" value="update_user_photo">

					<input type="hidden" name="field" value="avatar">

					<?php printf(
						'<input type="hidden" name="request_url" value="%s">',
						streamtube_core()->get()->rest_api['user']->get_rest_url( '/upload-photo' )
					);?>					

				</div>
			</div>
		</form>
	</div>
</div>
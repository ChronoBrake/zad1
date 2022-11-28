<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

// Check if current user can publish posts
$can_upload = Streamtube_Core_Permission::can_upload();

/**
 *
 * Fires after open form
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/form/upload_video/before' );
?>

<div id="drag-drop-upload" class="drag-drop-upload upload-form__group">

	<?php if( ! $can_upload ):?>

		<div class="alert alert-danger d-flex align-items-center mb-3">
			<span class="icon-cancel-circled h4 m-0"></span>
			<div class="error-messsage">
				<p>
					<?php echo $args['no_perm_text'] ?>
				</p>

				<?php do_action( 'streamtube/core/form/upload_video/no_perm_text' );?>
			</div>
		</div>

	<?php endif;?>

	<?php echo $can_upload ? '<label class="upload-form__label">' : '<div class="upload-form__label">'; ?>

		<input name="video_file" type="file" accept="video/*" class="d-none video_file">
		<div class="top-50 start-50 translate-middle position-absolute text-center">
			<span class="icon icon-upload"></span>
			<h5>
				<?php echo $args['uppload_text'] ?>
			</h5>

			<p class="text-muted small">
				<?php echo $args['max_size_text']?><br/>
				<?php echo $args['allowed_formats_text']?>				
			</p>		
		</div>
	<?php echo $can_upload ? '</label>' : '</div>'; ?>

	<?php if( $can_upload ):?>

		<div class="progress-wrap my-3">

			<div class="row">

				<div class="col-12 col-md-3">
					<div class="post-thumbnail ratio ratio-16x9 rounded overflow-hidden bg-dark"></div>
				</div>

				<div class="col-12 col-md-9 col__main">
					<p class="text-info my-3 mt-md-0">
						<span class="file-name fw-bold me-1">{filename}</span>
						<span class="text-muted">
							<?php echo $args['uploading_text']; ?>
						</span>
					</p>
					<div class="progress my-3" style="height: 25px;">
						<div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">0%</div>
					</div>
				</div>
			</div>

		</div>

	<?php endif;?>
</div>

<?php 
/**
 *
 * Fires after close form
 *
 * @since  1.0.0
 * 
 */
do_action( 'streamtube/core/form/upload_video/after' );
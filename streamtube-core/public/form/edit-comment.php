<form class="form-ajax edit-comment position-relative d-none">

	<?php streamtube_core_the_field_control( array(
		'label'			=>	esc_html__( 'Comment', 'streamtube-core' ),
		'name'			=>	'comment_content',
		'type'			=>	'editor',
		'settings'		=>	array(
			'media_buttons'		=> false,
			'drag_drop_upload'	=> false,
			'teeny'				=> false,
	        'tinymce' 			=> array(
	        	'toolbar1'		=> 'bold,italic,underline,bullist,numlist,unlink,forecolor,undo,redo'
	        ),
	        'quicktags'     	=>  array(
	            'buttons' 		=> 'strong,em,underline,ul,ol,li,code'
	        )
		)
	) );
	?>
	<input type="hidden" name="action" value="edit_comment">
	<input type="hidden" name="comment_ID" value="0">

	<div class="form-submit d-flex">

		<button type="submit" class="btn btn-danger px-4 btn-next ms-auto">
			<?php esc_html_e( 'Save Changes', 'streamtube-core' ); ?>
		</button>

	</div>
</form>
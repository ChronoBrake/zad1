<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="page-head mb-3 d-flex gap-3 align-items-center">
	<h1 class="page-title h4">
		<?php esc_html_e( 'Videos', 'streamtube-core' );?>
	</h1>

	<div class="add-new dropdown">

		<button class="btn btn-danger text-white px-4" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
			<span class="btn__icon icon-plus"></span>
			<span class="btn__text"><?php esc_html_e( 'Add new', 'streamtube-core' ); ?></span>
		</button>

		<?php streamtube_core_load_template( 'misc/upload-dropdown.php', false )?>
	</div>	
</div>

<div class="page-content">
	<?php
	streamtube_core_load_template( 'post/table-posts.php', true, array(
		'post_type'	=>	'video'
	) );
	?>
</div>
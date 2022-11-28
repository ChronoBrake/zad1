<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="page-head mb-3 d-flex gap-3 align-items-center">
	<h1 class="page-title h4">
		<?php esc_html_e( 'Posts', 'streamtube-core' );?>
	</h1>

	<a class="btn btn-danger text-white px-4" href="<?php echo esc_url( add_query_arg( array( 'view' => 'add-post' ) ) ); ?>">
		<span class="btn__icon icon-plus"></span>
		<span class="btn__text"><?php esc_html_e( 'Add new', 'streamtube-core' ); ?></span>
	</a>	
</div>

<div class="page-content">
	<?php
	streamtube_core_load_template( 'post/table-posts.php', true, array(
		'post_type'	=>	'post'
	) );
	?>
</div>
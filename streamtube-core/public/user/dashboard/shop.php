<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

?>
<div class="page-head mb-3 d-flex gap-3 align-items-center">
	<h1 class="page-title h4">
		<?php esc_html_e( 'Shopping', 'streamtube-core' );?>
	</h1>

	<a class="btn btn-danger text-white px-4" href="<?php echo esc_url( get_permalink( wc_get_page_id( 'shop' ) ) ); ?>">
		<span class="btn__text"><?php esc_html_e( 'Browse to shop', 'streamtube-core' ); ?></span>
	</a>	
</div>

<div class="page-content">
	<div class="woocommerce">
		<?php 

		$page = 'shop';

		streamtube_core()->get()->user_dashboard->the_menu( array(
			'user_id'		=>	get_current_user_id(),
			'base_url'		=>	streamtube_core_get_user_dashboard_url( get_current_user_id(), $page ),
			'menu_classes'	=>	'nav-tabs secondary-nav',
			'item_classes'	=>	'text-secondary d-flex align-items-center'
		), $page );?>

		<div class="bg-white p-4 border-start border-right border-bottom border-end">
			<?php streamtube_core()->get()->user_dashboard->the_main( $page );?>
		</div>
	</div>
</div>
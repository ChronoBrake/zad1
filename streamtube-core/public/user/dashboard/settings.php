<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>

<div class="page-head mb-3 d-flex gap-3 align-items-center">
	<h1 class="page-title h4">
		<?php esc_html_e( 'Settings', 'streamtube-core' ); ?>
	</h1>
</div>

<div class="page-content">

	<?php 

	$page = 'settings';

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


<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$endpoint = $GLOBALS['wp_query']->query_vars['dashboard'];

$args = array(
	'number'	=>	get_option( 'posts_per_page' ),
	'paged'		=> 	isset( $_GET['page'] ) ? (int)$_GET['page'] : 1,
	'user_id'	=>	get_queried_object_id(),
	'orderby'	=>	'time',
	'order'		=>	isset( $_GET['order'] )	? $_GET['order'] : 'DESC'
);

if ( preg_match ( '/points\/page\/([0-9]+)/', $endpoint, $matches ) ){
	$args['paged']	=	$matches[1];
}

if( isset( $_GET['ref'] ) ){
	$args['ref']  = sanitize_key($_GET['ref']);
}

if( current_user_can( 'administrator' ) ){
	unset( $args['user_id'] );

	if( isset( $_GET['user'] ) ){
		$user = get_user_by( 'login', $_GET['user'] );

		if( $user instanceof WP_User ){
			$args['user_id'] = $user->ID;
		}
	}	
}

// The Query
$logs = new myCRED_Query_Log( $args );

?>
<div class="page-head mb-3 d-flex gap-3 align-items-center">

	<?php
	/**
	 *
	 * Fires after heading
	 *
	 * @since 1.1.7.2
	 * 
	 */
	do_action( 'streamtube/core/dashboard/transactions/heading/before' );
	?>

	<h1 class="page-title h4">
		<?php esc_html_e( 'Transactions', 'streamtube-core' );?>
	</h1>

	<?php if( $buy_points_url = streamtube_core()->get()->myCRED->get_buy_points_page() ){

		printf(
			'<a class="btn btn-danger text-white" href="%s"><span class="icon-dollar me-1"></span>%s</a>',
			esc_url( $buy_points_url ),
			esc_html__( 'Buy Points', 'streamtube-core' )
		);
	}?>

	<?php
	/**
	 *
	 * Fires after heading
	 *
	 * @since 1.1.7.2
	 * 
	 */
	do_action( 'streamtube/core/dashboard/transactions/heading/after' );
	?>

</div>
<div class="widget transactions-points">

	<form method="get">

		<?php include( 'bar-top.php' ) ?>

		<?php if ( $logs->have_entries() ):?>

			<?php $logs->display(); ?>

		<?php else:?>

			<?php
				printf(
					'<p class="text-muted p-2 px-3">%s</p>',
					esc_html__( 'No transactions were found.', 'streamtube-core' )
				);
			?>

		<?php endif;?>

		<?php include( 'bar-bottom.php' ) ?>
	</form>
</div>
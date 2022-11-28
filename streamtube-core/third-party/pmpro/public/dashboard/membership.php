<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$page 		= StreamTube_Core_PMPro::PAGE_SLUG;

$mylevels 	= pmpro_getMembershipLevelsForUser();
?>
<div class="page-head mb-3 d-flex gap-3 align-items-center">
	<h1 class="page-title h4">
		<?php esc_html_e( 'Membership', 'streamtube-core' ); ?>
	</h1>
</div>

<div class="page-content">
	<?php if ( empty( $mylevels ) ): ?>
		<?php
		/**
		 *
		 * Fires before Plans
		 *
		 * @since 2.2
		 * 
		 */
		do_action( 'streamtube/core/pmpro/dashboard/membership/plans/before' );

		$levels_output = '';

		if( 0 < $levels_page_id = get_option( 'pmpro_levels_page_id' ) ){

			if( get_post_meta( $levels_page_id, '_elementor_edit_mode', true ) && class_exists( '\Elementor\Plugin' ) ){
	            $pluginElementor = \Elementor\Plugin::instance();
	            $levels_output = $contentElementor = $pluginElementor->frontend->get_builder_content( $levels_page_id );
			}
			else{
				$levels_output = do_shortcode( get_post( $levels_page_id )->post_content );
			}

		}else{
			$levels_output = streamtube_core()->get()->pmpro->_shortcode_membership_levels(
				apply_filters( 'streamtube/core/shortcode/membership_levels_args', array() )
			);
		}

		/**
		 *
		 * Filter the output of levels
		 *
		 * @since 2.2
		 * 
		 */
		$levels_output = apply_filters( 'streamtube/core/pmpro/dashboard/membership/levels_output', $levels_output );

		if( $levels_output ){
			echo $levels_output;
		}

		/**
		 *
		 * Fires after Plans
		 *
		 * @since 2.2
		 * 
		 */
		do_action( 'streamtube/core/pmpro/dashboard/membership/plans/after' );
		?>
	<?php else: ?>

		<?php 
		streamtube_core()->get()->user_dashboard->the_menu( array(
			'user_id'		=>	get_current_user_id(),
			'base_url'		=>	streamtube_core_get_user_dashboard_url( get_current_user_id(), $page ),
			'menu_classes'	=>	'nav-tabs secondary-nav',
			'item_classes'	=>	'text-secondary d-flex align-items-center'
		), $page );?>

		<div class="bg-white p-4 border-start border-right border-bottom border-end">
			<?php streamtube_core()->get()->user_dashboard->the_main( $page );?>
		</div>	

	<?php endif; ?>
</div>
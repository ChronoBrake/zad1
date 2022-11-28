<?php
/**
 *
 * User balance template
 *
 * @link       https://1.envato.market/mgXE4y
 * @since      1.1
 *
 * @package    WordPress
 * @subpackage StreamTube
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined( 'ABSPATH' ) ){
    exit;
}

$args = wp_parse_args( $args, array(
	'user_id'	=>	get_current_user_id()
) );
?>
<div class="mycred-balances text-secondary mt-4">
	<?php 
	printf(
		esc_html__( 'Your balance: %s', 'streamtube-core' ),
		mycred_display_users_balance( $args['user_id'] )
	)

	?>
</div>
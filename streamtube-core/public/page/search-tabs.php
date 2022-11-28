<?php
/**
 * The template for displaying search tabs
 *
 * @link       https://1.envato.market/mgXE4y
 * @since      1.0.0
 *
 * @package    WordPress
 * @subpackage StreamTube
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined( 'ABSPATH' ) ){
    exit;
}

if( ! $args || ! is_array( $args ) ){
	return;
}

if( $args['current_post_type'] != 'any' ){
	return;
}

if( array_key_exists( 'any', $args['post_types'] ) ){
	unset( $args['post_types']['any'] );
}

$http_get = wp_parse_args( $_GET, array(
	'tab'			=>	'',
	'search'		=>	'',
	'search_filter'	=>	'',
	'cpage'			=>	''
) );

?>
<ul class="search-tabs nav-tabs secondary-nav nav">
	<?php foreach ( $args['post_types'] as $post_type => $label ): ?>
		<?php
		$search_url = add_query_arg( array_merge( $http_get, array(
			'tab'	=>	$post_type
		) ), home_url('/') );
		?>
		<li class="nav-item">
			<?php printf(
				'<a class="text-secondary px-4 nav-link %s" aria-current="page" href="%s">%s</a>',
				$args['current_tab'] == $post_type ? 'active' : '',
				esc_url( $search_url ),
				$label
			);?>
		</li>

	<?php endforeach; ?>
</ul>
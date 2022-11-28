<?php
/**
 * Define the user profile functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 * Define the profile functionality
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_User_Profile extends Streamtube_Core_User {
	/**
	 * 
	 * Get menu items
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_menu_items(){

		$items = array();

		$items[ 'home' ] 	= array(
			'title'			=>	esc_html__( 'Home', 'streamtube-core' ),
			'icon'			=>	'icon-home',
			'callback'		=>	function(){
				streamtube_core_load_template( 'user/profile/home.php' );
			},
			'priority'		=>	1
		);		

		if( post_type_exists( Streamtube_Core_Post::CPT_VIDEO ) ){

			$post_type_object = get_post_type_object( Streamtube_Core_Post::CPT_VIDEO );

			$items[ 'videos' ] 	= array(
				'title'			=>	$post_type_object->labels->name,
				'icon'			=>	'icon-videocam',
				'callback'		=>	function(){
					streamtube_core_load_template( 'user/profile/videos.php' );
				},
				'cap'			=>	'publish_posts',
				'priority'		=>	10
			);
		}

		if( function_exists( 'WPPL' ) ){
			$items['liked'] = array(
				'title'		=>	esc_html__( 'Liked', 'streamtube-core' ),
				'icon'		=>	'icon-thumbs-up',
				'callback'	=>	function(){
					streamtube_core_load_template( 'user/profile/liked.php' );
				},				
				'priority'	=>	20
			);
		}				

		$items[ 'post' ] 	= array(
			'title'			=>	esc_html__( 'Blog', 'streamtube-core' ),
			'icon'			=>	'icon-pencil',
			'callback'		=>	function(){
				streamtube_core_load_template( 'user/profile/posts.php' );
			},
			'cap'			=>	'publish_posts',
			'priority'		=>	30
		);	

		$items['profile'] 	= array(
			'title'			=>	esc_html__( 'Profile', 'streamtube-core' ),
			'icon'			=>	'icon-user-circle-o',
			'callback'		=>	function(){
				streamtube_core_load_template( 'user/profile/profile.php' );
			},
			'priority'		=>	40
		);

		if( function_exists( 'run_wp_user_follow' ) ){
			$items['following'] = array(
				'title'			=>	esc_html__( 'Following', 'streamtube-core' ),
				'icon'			=>	'icon-user-plus',
				'callback'		=>	function(){
					streamtube_core_load_template( 'user/profile/following.php' );
				},				
				'priority'		=>	50
			);

			$items['followers'] = array(
				'title'			=>	esc_html__( 'Followers', 'streamtube-core' ),
				'icon'			=>	'icon-users',
				'callback'		=>	function(){
					streamtube_core_load_template( 'user/profile/followers.php' );
				},				
				'priority'		=>	60
			);
		}

		if( function_exists( 'bbpress' ) ){
			$items['forums'] = array(
				'title'			=>	esc_html__( 'Forums', 'streamtube-core' ),
				'icon'			=>	'icon-chat-empty',
				'callback'		=>	function(){
					streamtube_core_load_template( 'user/profile/forum.php' );
				},				
				'priority'		=>	70
			);
		}

		if( function_exists( 'WC' ) && get_option( 'woocommerce_enable', 'on' ) ){
			$items['shop'] 	= array(
				'title'			=>	esc_html__( 'Shopping', 'streamtube-core' ),
				'icon'			=>	'icon-th-list',
				'url'			=>	trailingslashit( get_author_posts_url( get_current_user_id() ) ) . 'dashboard/shop',
				'priority'		=>	80,
				'private'		=>	true
			);

			if( $cart_url = wc_get_cart_url() ){
				$items['cart'] 	= array(
					'title'			=>	esc_html__( 'Cart', 'streamtube-core' ),
					'icon'			=>	'icon-cart-plus',
					'url'			=>	$cart_url,
					'priority'		=>	81,
					'private'		=>	true
				);
			}
		}

		$items['settings'] = array(
			'title'			=>	esc_html__( 'Settings', 'streamtube-core' ),
			'icon'			=>	'icon-cog',
			'url'			=>	trailingslashit( get_author_posts_url( get_current_user_id() ) ) . 'dashboard/settings',				
			'priority'		=>	500,
			'private'		=>	true
		);

		/**
		 *
		 * @since 1.0.8
		 * 
		 */
		return apply_filters( 'streamtube/core/user/profile/menu/items', $items );
	}

	/**
	 * @since 1.0.8
	 */
	public function pre_get_menu_items(){
		$menu_items = $this->get_menu_items();

		$enabled_pages = get_option( 'user_profile_pages' );

		if( ! $enabled_pages || ! is_array( $enabled_pages ) ){
			return $menu_items;
		}

		if( is_array( $enabled_pages ) ){

			foreach ( $menu_items as $key => $value ) {
	           if( array_key_exists( $key, $enabled_pages ) && empty( $enabled_pages[$key] ) ){
	                unset( $menu_items[ $key ] );
	            }
			}
		}

		return $menu_items;	
	}

	/**
	 *
	 * @since 1.0.8
	 * 
	 */
	public function get_current_menu_item(){

		$current = '';

		$menu_items = $this->pre_get_menu_items();

		if( count( $menu_items ) == 0 ){
			return false;
		}

		foreach ( $menu_items as $menu_id => $menu ) {

			$menu = wp_parse_args( $menu, array(
				'cap'	=>	'read'
			) );

			if( ! user_can( get_queried_object_id(), $menu['cap'] ) ){
				unset( $menu_items[ $menu_id ] );
			}

			if( isset( $GLOBALS['wp_query']->query_vars[$menu_id] ) ){
				$current = $menu_id;
			}
		}

		return $current ? $current : array_keys( $menu_items )[0];
	}

	/**
	 *
	 * Add all profile menu items as endpoints
	 *
	 * @since 1.0.0
	 * 
	 */
	public function add_endpoints(){
		$menu_items = array_keys($this->get_menu_items());

		for ( $i=0; $i < count( $menu_items ); $i++) { 
			add_rewrite_endpoint( $menu_items[$i], EP_AUTHORS );
		}
	}

	/**
	 *
	 * The profile menu
	 * 
	 * @param  array  $args
	 * 
	 */
	public function the_menu( $args = array() ){

		$args = wp_parse_args( $args, array(
			'location'	=>	''// or dropdown
		) );

		if( isset( $args['user_id'] ) ){
			$args['base_url'] = get_author_posts_url( $args['user_id'] );
		}

		$menu = new Streamtube_Core_Menu( array_merge( $args, array(
			'menu_classes'	=>	'navbar-nav me-auto mb-2 mb-lg-0',
			'menu_items'	=>	$this->pre_get_menu_items(),
			'current'		=>	$args['user_id'] == get_queried_object_id() ? $this->get_current_menu_item() : '',
			'user_id'		=>	$args['user_id']
		) ) );

		return $menu->the_menu();
	}

	/**
	 *
	 * Load the profile header
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function the_header(){
		streamtube_core_load_template( 'user/profile/header.php' );
	}

	/**
	 *
	 * Load the profile nav
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function the_navigation(){
		streamtube_core_load_template( 'user/profile/navigation.php' );
	}	

	/**
	 *
	 * Load the author's main content template
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function the_main(){

		$current = $this->get_current_menu_item();

		$menu_items = $this->pre_get_menu_items();

		if( count( $menu_items ) == 0 ){
			// If no menu items found, we load videos template instead of empty space.
			return streamtube_core_load_template( 'user/profile/videos.php' );
		}

		return call_user_func( $menu_items[ $current ]['callback'] );
	}

	/**
	 *
	 * Load the custom author template
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function the_index(){
		if( is_author() ){
			streamtube_core_load_template( 'user/profile/index.php' );
			exit;
		}
	}

	/**
	 *
	 * Remove user bio html tags
	 * 
	 * @param  string $content
	 * @return formmatted string
	 *
	 * @since 1.0.9
	 * 
	 */
	public function format_user_bio_content( $content ){

		$allowed_tags = array();

		$tags = get_option( 'user_profile_bio_html_tags', 'strong,em,code,blockquote' );

		if( empty( $tags ) ){
			return $content;
		}

		$tags = array_map( 'trim', explode(',', $tags ));

		for ( $i=0;  $i < count( $tags );  $i++) { 

			if( $tags[$i] == 'a' ){
				$allowed_tags[ $tags[$i] ] = array(
					'href'	=>	array(),
					'title'	=>	array()
				);
			}
			else{
				$allowed_tags[ $tags[$i] ] = array();
			}		
		}

		return wp_kses( $content, $allowed_tags );

	}
}
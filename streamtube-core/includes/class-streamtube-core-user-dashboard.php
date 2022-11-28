<?php
/**
 * Define the dashboard functionality
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

class Streamtube_Core_User_Dashboard extends Streamtube_Core_User {

	protected $endpoint = 'dashboard';

	protected $post;

	protected $comment;

	public function __construct(){
		$this->post = new Streamtube_Core_Post();

		$this->comment = new Streamtube_Core_Comment();
	}

	/**
	 *
	 * Add dashboard endpoint
	 * 
	 */
	public function add_endpoints(){
		add_rewrite_endpoint( $this->endpoint, EP_AUTHORS );
	}	

	/**
	 * 
	 * @param  integer $user_id
	 * @param  string  $value
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_endpoint( $user_id = 0, $endpoint = '' ){

		if( ! $user_id ){
			return;
		}

		$url = get_author_posts_url( $user_id );

		if( ! get_option( 'permalink_structure' ) ){
			return add_query_arg( array(
				$this->endpoint	=>	$endpoint
			), $url );
		}

		return trailingslashit( $url ) . $this->endpoint . '/' . $endpoint;
	}

	public function get_menu_items(){

		$items = array();

		$items['dashboard'] = array(
			'title'		=>	esc_html__( 'Dashboard', 'streamtube-core' ),
			'icon'		=>	'icon-gauge',
			'callback'	=>	function(){
				streamtube_core_load_template( 'user/dashboard/dashboard.php' );
			},
			'cap'		=>	'read',
			'priority'	=>	2
		);

		if( function_exists( 'WC' ) && get_option( 'woocommerce_enable', 'on' ) ){
			$items['shop'] = array(
				'title'		=>	esc_html__( 'Shopping', 'streamtube-core' ),
				'icon'		=>	'icon-cart-plus',
				'callback'	=>	function(){
					streamtube_core_load_template( 'user/dashboard/shop.php' );
				},
				'parent'	=>	'dashboard',
				'submenu'	=>	array(
					'orders'	=>	array(
						'title'		=>	esc_html__( 'Orders', 'streamtube-core' ),
						'icon'		=>	'icon-cart-plus',
						'callback'	=>	function(){
							streamtube_core_load_template( 'user/dashboard/shop/orders.php' );
						},
						'priority'	=>	10
					),
					'downloads'	=>	array(
						'title'		=>	esc_html__( 'Downloads', 'streamtube-core' ),
						'icon'		=>	'icon-download-cloud',
						'callback'	=>	function(){
							streamtube_core_load_template( 'user/dashboard/shop/downloads.php' );
						},
						'priority'	=>	20
					),
					'edit-address'		=>	array(
						'title'		=>	esc_html__( 'Addresses', 'streamtube-core' ),
						'icon'		=>	'icon-address-book-o',
						'callback'	=>	function(){
							streamtube_core_load_template( 'user/dashboard/shop/addresses.php' );
						},
						'priority'	=>	30
					)
				),
				'cap'		=>	'read',
				'priority'	=>	5
			);			
		}

		$items['post'] = array(
			'title'		=>	esc_html__( 'Posts', 'streamtube-core' ),
			'badge'		=>	$this->post->get_pending_posts_badge( 'post' ),
			'desc'		=>	esc_html__( 'All blog posts', 'streamtube-core' ),
			'icon'		=>	'icon-edit',
			'callback'	=>	function(){
				streamtube_core_load_template( 'user/dashboard/posts.php' );
			},
			'parent'	=>	'dashboard',
			'cap'		=>	'publish_posts',
			'priority'	=>	10
		);

		$items['video'] = array(
			'title'		=>	esc_html__( 'Videos', 'streamtube-core' ),
			'badge'		=>	$this->post->get_pending_posts_badge( 'video' ),
			'desc'		=>	esc_html__( 'All videos', 'streamtube-core' ),
			'icon'		=>	'icon-indent-right',
			'callback'	=>	function(){
				streamtube_core_load_template( 'user/dashboard/videos.php' );
			},
			'parent'	=>	'dashboard',
			'cap'		=>	'publish_posts',
			'priority'	=>	20
		);

		$items['comments'] = array(
			'title'		=>	esc_html__( 'Comments', 'streamtube-core' ),
			'badge'		=>	$this->comment->get_pending_comments_badge(),
			'desc'		=>	esc_html__( 'All comments', 'streamtube-core' ),
			'icon'		=>	'icon-chat',
			'callback'	=>	function(){
				streamtube_core_load_template( 'user/dashboard/comments.php' );
			},
			'parent'	=>	'dashboard',
			'cap'		=>	'publish_posts',
			'priority'	=>	30
		);

		$items['settings'] = array(
			'title'		=>	esc_html__( 'Settings', 'streamtube-core' ),
			'icon'		=>	'icon-user-circle-o',
			'callback'	=>	function(){
				streamtube_core_load_template( 'user/dashboard/settings.php' );
			},
			'parent'	=>	'dashboard',
			'submenu'	=>	array(
				'personal'	=>	array(
					'title'		=>	esc_html__( 'Personal Information', 'streamtube-core' ),
					'icon'		=>	'icon-edit',
					'callback'	=>	function(){
						streamtube_core_load_template( 'user/dashboard/settings/personal.php' );
					},
					'priority'	=>	10
				),
				'social-profiles'	=>	array(
					'title'		=>	esc_html__( 'Social Profiles', 'streamtube-core' ),
					'icon'		=>	'icon-share',
					'callback'	=>	function(){
						streamtube_core_load_template( 'user/dashboard/settings/social-profiles.php' );
					},
					'priority'	=>	20
				),				
				'avatar'	=>	array(
					'title'		=>	esc_html__( 'Avatar', 'streamtube-core' ),
					'icon'		=>	'icon-user-circle',
					'callback'	=>	function(){
						streamtube_core_load_template( 'user/dashboard/settings/avatar.php' );
					},
					'priority'	=>	30
				),
				'photo'		=>	array(
					'title'		=>	esc_html__( 'Profile Photo', 'streamtube-core' ),
					'icon'		=>	'icon-picture',
					'callback'	=>	function(){
						streamtube_core_load_template( 'user/dashboard/settings/photo.php' );
					},
					'priority'	=>	40
				)
			),
			'cap'		=>	'read',
			'priority'	=>	100
		);

		$items['backend'] = array(
			'title'		=>	esc_html__( 'Backend', 'streamtube-core' ),
			'icon'		=>	'icon-wordpress',
			'url'		=>	admin_url(),
			'callback'	=>	function(){},
			'cap'		=>	'activate_plugins',
			'priority'	=>	1000
		);		

		/**
		 *
		 * @since 1.0.8
		 * 
		 */
		return apply_filters( 'streamtube/core/user/dashboard/menu/items', $items );
	}

	/**
	 *
	 * @since 1.0.8
	 * 
	 * @return [type] [description]
	 */
	private function pre_get_menu_items(){
		$menu_items = $this->get_menu_items();

		$enabled_pages = get_option( 'user_dashboard_pages' );

		if( ! $enabled_pages || ! is_array( $enabled_pages ) ){
			return $menu_items;
		}

		$enabled_pages['dashboard'] = '1';

		foreach ( $menu_items as $key => $value ) {
           if( array_key_exists( $key, $enabled_pages ) && empty( $enabled_pages[$key] ) ){
                unset( $menu_items[ $key ] );
            }
		}

		return $menu_items;		
	}

	private function get_request_endpoint(){
		global $wp_query;

		$menu_items = $this->get_menu_items();

		$endpoint = $wp_query->query_vars['dashboard'];

		if( empty( $endpoint ) || $endpoint == 1 ){
			return array_keys( $menu_items )[0];
		}

		return explode( '/' , $endpoint );
	}

	private function get_current_menu_item( $parent = '' ){

		$depth = 0;

		$current = '';

		$menu_items = $this->pre_get_menu_items();	

		if( $parent ){
			$depth = 1;

			$menu_items = $menu_items[$parent]['submenu'];
		}

		$request = $this->get_request_endpoint();

		if( is_string( $request ) ){
			return $request;
		}

		if( is_array( $request ) ){
			$current = isset( $request[$depth] )? $request[$depth] : $request[0];
		}

		if( $parent && $current == $parent ){
			$current = array_keys( $menu_items )[0];
		}

		if( ! array_key_exists( $current , $menu_items ) ){
			$current = array_keys( $menu_items )[0];
		}

		if( ! get_option( 'permalink_structure' ) && $parent ){
			foreach ( $menu_items as $key => $value ) {
				if ( isset( $_GET[ $key ] ) ) {
					$current = $key;
				}
			}			
		}

		return $current;
	}

	/**
	 *
	 * Get upload types
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_upload_types(){

		$types = array();

		if( get_option( 'upload_files', 'on' ) ){
			$types['upload'] = array(
				'text'	=>	esc_html__( 'Upload Video', 'streamtube-core' ),
				'icon'	=>	'icon-videocam',
				'cap'	=>	array( 'Streamtube_Core_Permission', 'can_upload' )
			);
		}

		if( get_option( 'embed_videos', 'on' ) ){
			$types['embed'] = array(
				'text'	=>	esc_html__( 'Embed', 'streamtube-core' ),
				'icon'	=>	'icon-youtube-play',
				'cap'	=>	array( 'Streamtube_Core_Permission', 'can_embed' )
			);
		}

		return apply_filters( 'streamtube_core_upload_types', $types );
	}

	public function the_menu( $args = array(), $parent = '' ){

		$menu_items = $this->pre_get_menu_items();	

		if( $parent ){
			$menu_items = $menu_items[$parent]['submenu'];
		}

		$menu = new Streamtube_Core_Menu( array_merge( $args, array(	
			'menu_items'	=>	$menu_items,
			'current'		=>	$this->get_current_menu_item( $parent ),
			'icon'			=>	true
		) ) );

		return $menu->the_menu();
	}

	public function the_main( $parent = '' ){

		$menu_items = $this->get_menu_items();

		if( $parent ){
			$menu_items = $menu_items[$parent]['submenu'];	
		}

		return call_user_func( $menu_items[ $this->get_current_menu_item( $parent ) ]['callback'] );
	}

	public function the_index(){
		global $wp_query;

		if( $this->is_my_profile() && isset( $wp_query->query_vars['dashboard'] ) ){

			add_filter( 'sidebar_float', function( $show ){
				return false;
			}, 10, 1 );

			define( 'STREAMTUBE_CORE_IS_DASHBOARD_INDEX', true );

			streamtube_core_load_template( 'user/dashboard/index.php' );
			exit;
		}
	}

	/**
	 *
	 * Auto redirect to user dashboard once logged in
	 * 
	 * @since  1.0.0
	 * 
	 */
	public function login_redirect( $redirect_to, $requested_redirect_to, $user ){

		if( $user instanceof WP_User ){

	        if ( isset( $user->roles ) && in_array( 'administrator', $user->roles ) ) {
	        	return $redirect_to;
	        }			
				
			if( ! $redirect_to ){
				$redirect_to = home_url( '/' );	
			}

			if( strpos( $redirect_to , '/wp-admin') !== false ){
				$redirect_to = home_url('/');
			}
		}

		return $redirect_to;
	}	
}
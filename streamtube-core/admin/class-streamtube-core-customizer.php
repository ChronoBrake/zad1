<?php
/**
 * Define the customizer functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
	exit;
}

class Streamtube_Core_Customizer{

	protected $customizer;

	protected $License;

	protected $Content_Restriction;

	protected $Google_Analytics;

	protected $Google_Analytics_Rest;	

	protected $User_Dashboard;

	protected $User_Profile;

	protected $myCred;

	public function register( $customizer ){

		$this->License = new Streamtube_Core_License();

		$this->Content_Restriction = new Streamtube_Core_Restrict_Content();

		$this->Google_Analytics = new Streamtube_Core_GoogleSiteKit_Analytics();

		if( ! class_exists( 'StreamTube_Core_GoogleSiteKit_Analytics_Rest_Controller' ) ){
			require_once plugin_dir_path( dirname( __FILE__ ) ) . '/third-party/googlesitekit/class-streamtube-core-rest-googlesitekit-analytics-controller.php';
		}

		$this->Google_Analytics_Rest = new StreamTube_Core_GoogleSiteKit_Analytics_Rest_Controller();

		$this->User_Dashboard = new Streamtube_Core_User_Dashboard();

		$this->User_Profile = new Streamtube_Core_User_Profile();

		$this->myCred = new Streamtube_Core_myCRED();

		$this->customizer = $customizer;

		$this->customizer->add_panel( 'streamtube' , array(
			'title'		=>	esc_html__( 'Theme Options', 'streamtube-core' ),
			'priority'	=>	100
		) );

		$this->section_logo();

		$this->section_general();

		$this->section_slug();

		$this->section_woocommerce();

		$this->section_blog_template();

		$this->section_single_template();

		$this->section_archive_template();

		$this->section_seach_template();

		$this->section_user_role_badges();

		$this->section_user_dashboard();

		$this->section_user_template();

		$this->section_user_registration();

		$this->section_comment();		

		$this->section_upload();

		$this->section_video_submit();

		$this->section_post_submit();

		$this->section_restrict_content();

		$this->section_myCRED_content();

		$this->section_player();

		$this->section_youtube_importer();

		$this->section_better_messages();

		$this->section_pmpro();

		$this->section_misc();

		$this->section_system();

		$this->section_google_sitekit();

		$this->section_footer();
	}

	/**
	 * @since 1.1
	 */
	private function is_verified(){
		return $this->License->is_verified();
	}

	/**
	 * $this->is_verified()
	 */
	private function description( $text = '' ){

		if( is_wp_error( $this->is_verified() ) ){
			return sprintf(
				'<div class="bg-danger license-alert">%1$s</div><div class="need-verify-section"></div>',
				$this->License->get_message()
			);			
		}else{
			return $text;
		}
	}

	/**
	 *
	 * Get socials
	 * 
	 * @return array
	 *
	 * @since 1.1
	 * 
	 */
	public function get_socials(){
		return array(
			'tiktok'		=>	esc_html__( 'Tiktok', 'streamtube-core' ),
			'youtube'		=>	esc_html__( 'Youtube', 'streamtube-core' ),
			'vimeo'			=>	esc_html__( 'Vimeo', 'streamtube-core' ),
			'pinterest'		=>	esc_html__( 'Pinterest', 'streamtube-core' ),
			'linkedin'		=>	esc_html__( 'Linkedin', 'streamtube-core' ),
			'facebook'		=>	esc_html__( 'Facebook', 'streamtube-core' ),
			'twitter'		=>	esc_html__( 'Twitter', 'streamtube-core' ),
			'telegram'		=>	esc_html__( 'Telegram', 'streamtube-core' ),
			'instagram'		=>	esc_html__( 'Instagram', 'streamtube-core' ),
			'discord'		=>	esc_html__( 'Discord', 'streamtube-core' ),
			'tumblr'		=>	esc_html__( 'Tumblr', 'streamtube-core' ),
			'deviantart'	=>	esc_html__( 'Deviantart', 'streamtube-core' ),
			'snapchat'		=>	esc_html__( 'Snapchat', 'streamtube-core' ),
			'weibo'			=>	esc_html__( 'Weibo', 'streamtube-core' ),
			'behance'		=>	esc_html__( 'Behance', 'streamtube-core' ),
			'wordpress'		=>	esc_html__( 'WordPress', 'streamtube-core' ),
			'stackoverflow'	=>	esc_html__( 'Stackoverflow', 'streamtube-core' ),
			'flickr'		=>	esc_html__( 'Flickr', 'streamtube-core' ),
			'github'		=>	esc_html__( 'Github', 'streamtube-core' )
		);
	}

	/**
	 *
	 * Get thumbnail sizes
	 * 
	 * @return array
	 * 
	 */
	public function get_thumbnail_sizes(){

		$sizes = array();

		global $_wp_additional_image_sizes;

		if( ! $_wp_additional_image_sizes ){
			return $sizes;
		}

		foreach ( $_wp_additional_image_sizes as $key => $value) {
			$sizes[ $key ] = sprintf( '%s (%sx%spx)', $key, $value['width'], $value['height'] );
		}

		return $sizes;
	}

	private function section_logo(){	

		$this->customizer->add_setting( 'dark_logo', array(
			'default'			=>	'',
			'type'				=>	'option',
			'capability'		=>	'edit_theme_options',
			'sanitize_callback'	=>	'sanitize_text_field',
		) );

		$this->customizer->add_control(
			new WP_Customize_Image_Control(
				$this->customizer,
				'dark_logo',
				array(
					'label'      => esc_html__( 'Dark Logo', 'streamtube-core' ),
					'section'    => 'title_tagline'
				)
			)
		);
	}

	private function section_general(){
		$this->customizer->add_section( 'general' , array(
			'title'			=>	esc_html__( 'General', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'google_fonts', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'google_fonts' , array(
				'label'				=>	esc_html__( 'Google Fonts', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'general',
				'description'		=>	esc_html__( 'Loads Google Fonts locally', 'streamtube-core' )
			) );		

			$this->customizer->add_setting( 'theme_mode', array(
				'default'			=>	'light',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'theme_mode' , array(
				'label'				=>	esc_html__( 'Theme Mode', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'general',
				'description'		=>	esc_html__( 'Default theme mode', 'streamtube-core' ),
				'choices'			=>	array(
					'light'	=>	esc_html__( 'Light', 'streamtube-core' ),
					'dark'	=>	esc_html__( 'Dark', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'custom_theme_mode', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'custom_theme_mode' , array(
				'label'				=>	esc_html__( 'Custom Theme Mode', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'general',
				'description'		=>	esc_html__( 'Enable custom theme mode', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'preloader', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'preloader' , array(
				'label'				=>	esc_html__( 'Enable Preloader', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'general'
			) );			

			$this->customizer->add_setting( 'site_content_width', array(
				'default'			=>	'container',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'site_content_width' , array(
				'label'				=>	esc_html__( 'Site Content Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'general',
				'choices'			=>	array(
					'container'				=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-wide'		=>	esc_html__( 'Wide', 'streamtube-core' ),
					'container-fluid'		=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'header_template', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'header_template' , array(
				'label'				=>	esc_html__( 'Header Template', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'general',
				'choices'			=>	array(
					'1'		=>	esc_html__( 'Header 1', 'streamtube-core' ),
					'2'		=>	esc_html__( 'Header 2', 'streamtube-core' ),
				)
			) );

			$this->customizer->add_setting( 'menu_style', array(
				'default'			=>	'dark',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'menu_style' , array(
				'label'				=>	esc_html__( 'Menu Style', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'general',
				'choices'			=>	array(
					'dark'	=>	esc_html__( 'Dark', 'streamtube-core' ),
					'red'	=>	esc_html__( 'Red', 'streamtube-core' )
				),
				'active_callback'	=>	function(){
					if( get_option( 'site_content_width', 'container' ) != 'container-fluid' && get_option( 'header_template', '1' ) == '1'  ){
						return true;
					}

					return false;
				}
			) );			

			$this->customizer->add_setting( 'menu_sticky', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'menu_sticky' , array(
				'label'				=>	esc_html__( 'Stick Menu', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'general'
			) );			

			$this->customizer->add_setting( 'sidebar_sticky', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sidebar_sticky' , array(
				'label'				=>	esc_html__( 'Stick Sidebar', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'general'
			) );

			$this->customizer->add_setting( 'sidebar_float_collapse', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sidebar_float_collapse' , array(
				'label'				=>	esc_html__( 'Collapse Floating Sidebar', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'general',
			) );			

			$this->customizer->add_setting( 'thumbnail_ratio', array(
				'default'			=>	'16x9',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'thumbnail_ratio' , array(
				'label'				=>	esc_html__( 'Thumbnail Image Ratio', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'general',
				'choices'			=>	array(
					'16x9'	=>	esc_html__( 'Landscape', 'streamtube-core' ),
					'9x16'	=>	esc_html__( 'Portrait', 'streamtube-core' )
				)
			) );
	}

	/**
	 *
	 * Page Slug section
	 *
	 */
	private function section_slug(){
		$this->customizer->add_section( 'slug' , array(
			'title'			=>	esc_html__( 'Slug', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10,
			'description'	=>	sprintf(
				esc_html__( 'You have to %s after changing default slugs', 'streamtube-core' ),
				'<a target="_blank" href="'. esc_url( admin_url( 'options-permalink.php' ) ) .'">'. esc_html__( 'Update Permalinks', 'streamtube-core' ) .'</a>'
			)
		) );

			$this->customizer->add_setting( 'video_slug', array(
				'default'			=>	'video',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_key',
			) );

			$this->customizer->add_control( 'video_slug' , array(
				'label'				=>	esc_html__( 'Video Slug', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'slug'
			) );

			$taxonomies = get_object_taxonomies( 'video', 'object' );

			if( $taxonomies ){
				foreach ( $taxonomies as $tax => $object ){

					if( $tax != 'report_category' ){

						$this->customizer->add_setting( 'taxonomy_' . $tax . '_slug', array(
							'default'			=>	$tax,
							'type'				=>	'option',
							'capability'		=>	'edit_theme_options',
							'sanitize_callback'	=>	'sanitize_key',
						) );

						$this->customizer->add_control( 'taxonomy_' . $tax . '_slug', array(
							'label'				=>	$object->label,
							'type'				=>	'text',
							'section'			=>	'slug'
						) );	
					}
				}
			}
	}

	/**
	 *
	 * Woocommerce section
	 *
	 */
	private function section_woocommerce(){

		if( ! function_exists( 'WC' ) ){
			return;
		}

		$this->customizer->add_section( 'wc' , array(
			'title'			=>	esc_html__( 'Woocommerce', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );	

			$this->customizer->add_setting( 'woocommerce_enable', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'woocommerce_enable' , array(
				'label'				=>	esc_html__( 'Enable compatibility', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'wc'
			) );
	}

	private function section_blog_template(){
		$this->customizer->add_section( 'blog' , array(
			'title'			=>	esc_html__( 'Blog', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );		

			$this->customizer->add_setting( 'blog_heading', array(
				'default'			=>	esc_html__( 'Heading', 'streamtube-core' ),
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'blog_heading' , array(
				'label'				=>	esc_html__( 'Blog Heading', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'blog'
			) );

			$this->customizer->add_setting( 'blog_post_excerpt', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'blog_post_excerpt' , array(
				'label'				=>	esc_html__( 'Post Excerpt', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'blog',
				'description'		=>	esc_html__( 'Show blog post excerpt instead of full content', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'single_post', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'single_post' , array(
				'label'				=>	esc_html__( 'Template', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'blog',
				'description'		=>	esc_html__( 'Single Post Template', 'streamtube-core' ),
				'choices'			=>	array(
					''									=>	esc_html__( 'Default', 'streamtube-core' ),
					'single.php'						=>	esc_html__( 'Single 1', 'streamtube-core' ),
					'page-templates/single-v2.php'		=>	esc_html__( 'Single 2', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'blog_thumbnail_size', array(
				'default'			=>	'post-thumbnails',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'blog_thumbnail_size' , array(
				'label'				=>	esc_html__( 'Default Thumbnail Size', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'blog',
				'choices'			=>	$this->get_thumbnail_sizes()
			) );			

			$this->customizer->add_setting( 'blog_author_box', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'blog_author_box' , array(
				'label'				=>	esc_html__( 'Author Box', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'blog',
				'description'		=>	esc_html__( 'Show author box', 'streamtube-core' ),
			) );			

	}

	private function section_single_template(){
		$this->customizer->add_section( 'single_template' , array(
			'title'			=>	esc_html__( 'Single Template', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'single_video', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'single_video' , array(
				'label'				=>	esc_html__( 'Template', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Single Video Template', 'streamtube-core' ),
				'choices'			=>	array(
					''										=>	esc_html__( 'Default', 'streamtube-core' ),
					'single-video.php'						=>	esc_html__( 'Template 1', 'streamtube-core' ),
					'page-templates/single-video-v2.php'	=>	esc_html__( 'Template 2', 'streamtube-core' ),
					'page-templates/single-video-v3.php'	=>	esc_html__( 'Template 3', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'single_video_content_width', array(
				'default'			=>	'container-fluid',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );			

			$this->customizer->add_control( 'single_video_content_width' , array(
				'label'				=>	esc_html__( 'Content Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'single_template',
				'choices'			=>	array(
					'container'								=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-fluid'						=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				),
				'active_callback'			=>	function(){
					return ! in_array( get_option( 'single_video' ), array( '', 'single-video.php',  ) ) ? true : false;
				}
			) );

			$this->customizer->add_setting( 'single_video_date_format', array(
				'default'			=>	'diff',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );			

			$this->customizer->add_control( 'single_video_date_format' , array(
				'label'				=>	esc_html__( 'Date Format', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'single_template',
				'choices'			=>	array(
					'normal'		=>	esc_html__( 'Normal', 'streamtube-core' ),
					'diff'			=>	esc_html__( 'Diff', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'single_video_comment_count', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'single_video_comment_count' , array(
				'label'				=>	esc_html__( 'Comment Count', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Show comment count', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'single_video_categories', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'single_video_categories' , array(
				'label'				=>	esc_html__( 'Categories', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Show Categories', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'floating_player', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'floating_player' , array(
				'label'				=>	esc_html__( 'Floating Player', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Keep watching video while scrolling.', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'author_box', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'author_box' , array(
				'label'				=>	esc_html__( 'Author Box', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Show author box', 'streamtube-core' ),
			) );			

			$this->customizer->add_setting( 'read_more_less', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'read_more_less' , array(
				'label'				=>	esc_html__( 'Read More/Read Less', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Enable read more/read less for the post content', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'button_share', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'button_share' , array(
				'label'				=>	esc_html__( 'Button Share', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Enable Button Share', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'button_report', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'button_report' , array(
				'label'				=>	esc_html__( 'Button Report', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'single_template',
				'description'		=>	esc_html__( 'Enable Button Report', 'streamtube-core' ),
			) );			
	}

	private function section_archive_template(){
		$this->customizer->add_section( 'archive_template' , array(
			'title'			=>	esc_html__( 'Archive Video Template', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'archive_content_width', array(
				'default'			=>	'container-fluid',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_content_width' , array(
				'label'				=>	esc_html__( 'Content Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'archive_template',
				'choices'			=>	array(
					'container'			=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-fluid'	=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'archive_posts_per_column', array(
				'default'			=>	'5',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_posts_per_column' , array(
				'label'				=>	esc_html__( 'Posts Per Column', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Number of posts per column', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_rows_per_page', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_rows_per_page' , array(
				'label'				=>	esc_html__( 'Rows Per Page', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Number of rows per page', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_col_xl', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_col_xl' , array(
				'label'				=>	esc_html__( 'Extra large ≥1200px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Posts per column for extra large device ≥1200px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_col_lg', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_col_lg' , array(
				'label'				=>	esc_html__( 'Large ≥992px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Posts per column for large device ≥992px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_col_md', array(
				'default'			=>	'2',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_col_md' , array(
				'label'				=>	esc_html__( 'Medium ≥768px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Posts per column for medium device ≥768px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_col_sm', array(
				'default'			=>	'2',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_col_sm' , array(
				'label'				=>	esc_html__( 'Small ≥576px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Posts per column for medium device ≥576px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_col_xs', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_col_xs' , array(
				'label'				=>	esc_html__( 'Extra small <576px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Posts per column for medium device <576px', 'streamtube-core' ),
			) );			

			$this->customizer->add_setting( 'archive_post_comment', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_post_comment' , array(
				'label'				=>	esc_html__( 'Post Comments', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Show post comment count', 'streamtube-core' ),
			) );			

			$this->customizer->add_setting( 'archive_post_date', array(
				'default'			=>	'normal',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_post_date' , array(
				'label'				=>	esc_html__( 'Post Date', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Show post date', 'streamtube-core' ),
				'choices'			=>	array(
					'normal'	=>	esc_html__( 'Normal', 'streamtube-core' ),
					'diff'		=>	esc_html__( 'Diff', 'streamtube-core' )
				)
			) );			

			$this->customizer->add_setting( 'archive_author_name', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_author_name' , array(
				'label'				=>	esc_html__( 'Author name', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Show post author name', 'streamtube-core' ),
			) );			

			$this->customizer->add_setting( 'archive_author_avatar', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_author_avatar' , array(
				'label'				=>	esc_html__( 'Author avatar', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'archive_template',
				'description'		=>	esc_html__( 'Show post author avatar', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'archive_pagination', array(
				'default'			=>	'click',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'archive_pagination' , array(
				'label'				=>	esc_html__( 'Pagination', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'archive_template',
				'choices'			=>	array(
					'numbers'	=>	esc_html__( 'Number List', 'streamtube-core' ),
					'click'		=>	esc_html__( 'Load More On Click', 'streamtube-core' ),
					'scroll'	=>	esc_html__( 'Load More On Scroll', 'streamtube-core' )
				)
			) );			
	}

	private function section_seach_template(){

		$this->customizer->add_section( 'search_template' , array(
			'title'			=>	esc_html__( 'Search Template', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );		

			$this->customizer->add_setting( 'search_content_width', array(
				'default'			=>	'container',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_content_width' , array(
				'label'				=>	esc_html__( 'Content Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'search_template',
				'choices'			=>	array(
					'container'			=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-fluid'	=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'search_layout', array(
				'default'			=>	'list_xxl',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_layout' , array(
				'label'				=>	esc_html__( 'Layout', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'search_template',
				'choices'			=>	array(
					'grid'		=>	esc_html__( 'Grid', 'streamtube-core' ),
					'list_sm'	=>	esc_html__( 'List Small', 'streamtube-core' ),
					'list_md'	=>	esc_html__( 'List Medium', 'streamtube-core' ),
					'list_lg'	=>	esc_html__( 'List Large', 'streamtube-core' ),
					'list_xl'	=>	esc_html__( 'List Extra Large', 'streamtube-core' ),
					'list_xxl'	=>	esc_html__( 'List Extra extra large', 'streamtube-core' )
				)
			) );			

			$this->customizer->add_setting( 'search_posts_per_column', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_posts_per_column' , array(
				'label'				=>	esc_html__( 'Posts Per Column', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Number of posts per column', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'search_rows_per_page', array(
				'default'			=>	get_option( 'posts_per_page' ),
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_rows_per_page' , array(
				'label'				=>	esc_html__( 'Rows Per Page', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Number of rows per page', 'streamtube-core' ),
			) );		

			$this->customizer->add_setting( 'search_col_xl', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_col_xl' , array(
				'label'				=>	esc_html__( 'Extra large ≥1200px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Posts per column for extra large device ≥1200px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'search_col_lg', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_col_lg' , array(
				'label'				=>	esc_html__( 'Large ≥992px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Posts per column for large device ≥992px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'search_col_md', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_col_md' , array(
				'label'				=>	esc_html__( 'Medium ≥768px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Posts per column for medium device ≥768px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'search_col_sm', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_col_sm' , array(
				'label'				=>	esc_html__( 'Small ≥576px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Posts per column for medium device ≥576px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'search_col_xs', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_col_xs' , array(
				'label'				=>	esc_html__( 'Extra small <576px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Posts per column for medium device <576px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'search_filter', array(
				'default'			=>	'post_types',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_filter' , array(
				'label'				=>	esc_html__( 'Search Filter', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'search_template',
				'choices'			=>	array(
					'default'		=>	esc_html__( 'No Filters', 'streamtube-core' ),
					'post_types'	=>	esc_html__( 'Post Types', 'streamtube-core' ),
					'taxonomy'		=>	esc_html__( 'Taxonomy', 'streamtube-core' ),
				)
			) );

			$this->customizer->add_setting( 'search_post_types', array(
				'default'			=>	'video, post',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_post_types' , array(
				'label'				=>	esc_html__( 'Post Types', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Specific post types to search', 'streamtube-core' ),
				'active_callback'	=>	function(){
					return get_option( 'search_filter', 'post_types' ) == 'post_types' ? true : false;
				}
			) );

			$this->customizer->add_setting( 'search_taxonomy', array(
				'default'			=>	'categories',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_taxonomy' , array(
				'label'				=>	esc_html__( 'Taxonomy', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Specific taxonomy to search', 'streamtube-core' ),
				'active_callback'	=>	function(){
					return get_option( 'search_filter', 'post_types' ) == 'taxonomy' ? true : false;
				}
			) );			

			$this->customizer->add_setting( 'search_autocomplete', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_autocomplete' , array(
				'label'				=>	esc_html__( 'Search Autocomplete', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'search_template'
			) );

			$this->customizer->add_setting( 'search_autocomplete_number', array(
				'default'			=>	20,
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_autocomplete_number' , array(
				'label'				=>	esc_html__( 'Number Of Results', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'active_callback'	=>	function(){
					return get_option( 'search_autocomplete', 'on' ) ? true : false;
				}
			) );				

			$this->customizer->add_setting( 'search_post_excerpt_length', array(
				'default'			=>	'20',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_post_excerpt_length' , array(
				'label'				=>	esc_html__( 'Post Excerpt Length', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Limit post excerpt length', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'search_post_date', array(
				'default'			=>	'normal',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_post_date' , array(
				'label'				=>	esc_html__( 'Post Date', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Show post date', 'streamtube-core' ),
				'choices'			=>	array(
					'normal'	=>	esc_html__( 'Normal', 'streamtube-core' ),
					'diff'		=>	esc_html__( 'Diff', 'streamtube-core' )
				)
			) );			

			$this->customizer->add_setting( 'search_author_avatar', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_author_avatar' , array(
				'label'				=>	esc_html__( 'Author Avatar', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Show post author avatar', 'streamtube-core' ),
			) );			

			$this->customizer->add_setting( 'search_hide_empty_thumbnail', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'search_hide_empty_thumbnail' , array(
				'label'				=>	esc_html__( 'Hide Empty Thumbnail Posts', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'search_template',
				'description'		=>	esc_html__( 'Do not retrieve the empty thumbnail posts.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'search_pagination', array(
				'default'			=>	'click',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field'
			) );

			$this->customizer->add_control( 'search_pagination' , array(
				'label'				=>	esc_html__( 'Pagination', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'search_template',
				'choices'			=>	array(
					'numbers'	=>	esc_html__( 'Number List', 'streamtube-core' ),
					'click'		=>	esc_html__( 'Load More On Click', 'streamtube-core' ),
					'scroll'	=>	esc_html__( 'Load More On Scroll', 'streamtube-core' )
				)
			) );			

	}

	private function section_user_role_badges(){
		$this->customizer->add_section( 'user_role_badges' , array(
			'title'			=>	esc_html__( 'User Role Badges', 'streamtube' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

		    $this->customizer->add_section( 'role_badges', array(
		        'title'             =>  esc_html__( 'Role Badges', 'streamtube' ),
		        'priority'          =>  10
		    ) );

		    foreach ( wp_roles()->roles as $key => $value ) {
		        $this->customizer->add_setting( 'role_badge_' . $key, array(
		            'default'           =>  '#6c757d',
		            'type'              =>  'option',
		            'capability'        =>  'edit_theme_options',
		            'sanitize_callback' =>  'sanitize_hex_color'
		        ) );

		        $this->customizer->add_control( 'role_badge_' . $key, array(
		            'label'             =>  $value['name'],
		            'type'              =>  'color',
		            'section'           =>  'user_role_badges'
		        ) );
		    }
	}

	private function section_user_dashboard(){

		$this->customizer->add_section( 'dashboard' , array(
			'title'			=>	esc_html__( 'User Dashboard', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

		$menus = $this->User_Dashboard->get_menu_items();

		foreach ( $menus as $key => $value) {

			if( $key != 'dashboard' ){

				$this->customizer->add_setting( 'user_dashboard_pages['.$key.']' , array(
					'default'			=>	'on',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'user_dashboard_pages['.$key.']' , array(
					'label'				=>	$value['title'],
					'type'				=>	'checkbox',
					'section'			=>	'dashboard',
					'description'		=>	sprintf(
						esc_html__( 'Enable %s page', 'streamtube-core' ),
						'<strong>'. $value['title'] .'</strong>'
					)
				) );

			}
		}
	}

	private function section_user_template(){

		$this->customizer->add_section( 'user_template' , array(
			'title'			=>	esc_html__( 'User Profile', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$menus = $this->User_Profile->get_menu_items();

			foreach ( $menus as $key => $value) {

				$this->customizer->add_setting( 'user_profile_pages['.$key.']' , array(
					'default'			=>	'on',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'user_profile_pages['.$key.']' , array(
					'label'				=>	$value['title'],
					'type'				=>	'checkbox',
					'section'			=>	'user_template',
					'description'		=>	sprintf(
						esc_html__( 'Enable %s page', 'streamtube-core' ),
						'<strong>'. $value['title'] .'</strong>'
					)
				) );

				if( $key == 'profile' ){
					$this->customizer->add_setting( 'user_profile_bio_html_tags', array(
						'default'			=>	'strong,em,code,blockquote',
						'type'				=>	'option',
						'capability'		=>	'edit_theme_options',
						'sanitize_callback'	=>	'sanitize_text_field',
					) );

					$this->customizer->add_control( 'user_profile_bio_html_tags' , array(
						'label'				=>	esc_html__( 'Bio HTML Tags', 'streamtube-core' ),
						'type'				=>	'text',
						'section'			=>	'user_template',
						'description'		=>	esc_html__( 'Set allowed HTML Tags for user bio content.', 'streamtube-core' )
					) );
				}
			}		

			$this->customizer->add_setting( 'user_profile_photo_width', array(
				'default'			=>	'container',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_profile_photo_width' , array(
				'label'				=>	esc_html__( 'Profile Photo Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'user_template',
				'choices'			=>	array(
					'container'			=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-fluid'	=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'user_content_width', array(
				'default'			=>	'container',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_content_width' , array(
				'label'				=>	esc_html__( 'Content Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'user_template',
				'choices'			=>	array(
					'container'			=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-fluid'	=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'user_posts_per_column', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_posts_per_column' , array(
				'label'				=>	esc_html__( 'Posts Per Column', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Number of posts per column', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'user_rows_per_page', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_rows_per_page' , array(
				'label'				=>	esc_html__( 'Rows Per Page', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Number of rows per page', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'user_col_xl', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_col_xl' , array(
				'label'				=>	esc_html__( 'Extra large ≥1200px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Posts per column for extra large device ≥1200px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'user_col_lg', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_col_lg' , array(
				'label'				=>	esc_html__( 'Large ≥992px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Posts per column for large device ≥992px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'user_col_md', array(
				'default'			=>	'2',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_col_md' , array(
				'label'				=>	esc_html__( 'Medium ≥768px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Posts per column for medium device ≥768px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'user_col_sm', array(
				'default'			=>	'2',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_col_sm' , array(
				'label'				=>	esc_html__( 'Small ≥576px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Posts per column for medium device ≥576px', 'streamtube-core' ),
			) );

			$this->customizer->add_setting( 'user_col_xs', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_col_xs' , array(
				'label'				=>	esc_html__( 'Extra small <576px', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Posts per column for medium device <576px', 'streamtube-core' ),
			) );				

			$this->customizer->add_setting( 'user_pagination', array(
				'default'			=>	'click',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field'
			) );

			$this->customizer->add_control( 'user_pagination' , array(
				'label'				=>	esc_html__( 'Pagination', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'user_template',
				'choices'			=>	array(
					'numbers'	=>	esc_html__( 'Number List', 'streamtube-core' ),
					'click'		=>	esc_html__( 'Load More On Click', 'streamtube-core' ),
					'scroll'	=>	esc_html__( 'Load More On Scroll', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'user_post_date', array(
				'default'			=>	'normal',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'user_post_date' , array(
				'label'				=>	esc_html__( 'Post Date', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'user_template',
				'description'		=>	esc_html__( 'Show post date', 'streamtube-core' ),
				'choices'			=>	array(
					'normal'	=>	esc_html__( 'Normal', 'streamtube-core' ),
					'diff'		=>	esc_html__( 'Diff', 'streamtube-core' )
				)
			) );				
	}

	private function section_user_registration(){
		$section_args = array(
			'title'			=>	esc_html__( 'Registration', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		);

		$this->customizer->add_section( 'custom_registration' , $section_args );

			$this->customizer->add_setting( 'custom_registration[login_button]', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'custom_registration[login_button]' , array(
				'label'				=>	esc_html__( 'Enable Login Button', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'custom_registration',
				'description'		=>	esc_html__( 'Enable the Login button on header', 'streamtube-core' )
			) );		

			$this->customizer->add_setting( 'custom_registration[custom_role]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'custom_registration[custom_role]' , array(
				'label'				=>	esc_html__( 'Enable Custom Role', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'custom_registration',
				'description'		=>	esc_html__( 'Let visitors choose which role they want to join', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'custom_registration[first_last_name]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'custom_registration[first_last_name]' , array(
				'label'				=>	esc_html__( 'Enable First and Last name fields', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'custom_registration'
			) );
	}

	private function section_comment(){
		$this->customizer->add_section( 'comment' , array(
			'title'			=>	esc_html__( 'Comment', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );	
			$this->customizer->add_setting( 'comment_report', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'comment_report' , array(
				'label'				=>	esc_html__( 'Enable Report Comment', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'comment'
			) );

			$this->customizer->add_setting( 'comment_report_role', array(
				'default'			=>	'read',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'comment_report_role' , array(
				'label'				=>	esc_html__( 'Report Role/Capability', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'comment',
				'active_callback'	=>	function(){
					return get_option( 'comment_report' ) ? true : false;
				},
				'description'		=>	esc_html__( 'Set the role or capability of who can mark the report, all logged in users are default', 'streamtube-core' )
			) );			

			$this->customizer->add_setting( 'comment_report_notify', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'comment_report_notify' , array(
				'label'				=>	esc_html__( 'Enable Report Notification', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'comment',
				'active_callback'	=>	function(){
					return get_option( 'comment_report' ) ? true : false;
				},				
			) );			

			$this->customizer->add_setting( 'comment_edit', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'comment_edit' , array(
				'label'				=>	esc_html__( 'Allows users to edit their comments', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'comment'
			) );

			$this->customizer->add_setting( 'comment_delete', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'comment_delete' , array(
				'label'				=>	esc_html__( 'Allows users to delete their comments', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'comment'
			) );

	}

	private function section_restrict_content(){

		$section_args = array(
			'title'			=>	esc_html__( 'Content Restriction', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10,
			'description'	=>	$this->description()
		);

		$this->customizer->add_section( 'restrict_content' , $section_args );

			$this->customizer->add_setting( 'restrict_content[enable]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'restrict_content[enable]' , array(
				'label'				=>	esc_html__( 'Enable', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'restrict_content',
				'description'		=>	esc_html__( 'Enable Content Restriction feature.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'restrict_content[apply_all]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'restrict_content[apply_all]' , array(
				'label'				=>	esc_html__( 'Apply for All', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'restrict_content',
				'description'		=>	esc_html__( 'Apply settings for all posts.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'restrict_content[join_us_url]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'restrict_content[join_us_url]' , array(
				'label'				=>	esc_html__( 'Join Us URL', 'streamtube-core' ),
				'type'				=>	'dropdown-pages',
				'section'			=>	'restrict_content'
			) );			

			$this->customizer->add_setting( 'restrict_content[apply_for]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'restrict_content[apply_for]' , array(
				'label'				=>	esc_html__( 'Display For', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'restrict_content',
				'choices'			=>	array(
					''				=>	esc_html__( 'All visitors', 'streamtube-core' ),
					'logged_in'		=>	esc_html__( 'Logged In Users', 'streamtube-core' ),
		            'roles'         =>  esc_html__( 'Custom Roles', 'streamtube-core' ),
		            'capabilities'  =>  esc_html__( 'Custom Capabilities', 'streamtube-core' )					
				)
			) );

			$roles = $this->Content_Restriction->get_editable_roles();

			foreach ( $roles as $role => $value ) {
				$this->customizer->add_setting( 'restrict_content[roles]['.$role.']', array(
					'default'			=>	'',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'restrict_content[roles]['.$role.']' , array(
					'label'				=>	$value['name'],
					'type'				=>	'checkbox',
					'section'			=>	'restrict_content',
					'active_callback'	=>	function(){
						$settings = get_option( 'restrict_content' );

						if( is_array( $settings ) && array_key_exists( 'apply_for', $settings ) ){
							if( $settings['apply_for'] == 'roles' ){
								return true;
							}
						}

						return false;
					}
				) );				
			}

			$this->customizer->add_setting( 'restrict_content[capabilities]', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'restrict_content[capabilities]' , array(
				'label'				=>	esc_html__( 'Capabilities', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'restrict_content',
				'active_callback'	=>	function(){
					$settings = get_option( 'restrict_content' );

					if( is_array( $settings ) && array_key_exists( 'apply_for', $settings ) ){
						if( $settings['apply_for'] == 'capabilities' ){
							return true;
						}
					}

					return false;
				},
				'description'		=>	sprintf(
					esc_html__( '%s, separated by commas.', 'streamtube-core' ),
					'<a target="_blank" href="https://wordpress.org/support/article/roles-and-capabilities/#capabilities">'.esc_html__( 'Capabilities', 'streamtube-core' ).'</a>'
				)
			) );

			$this->customizer->add_setting( 'restrict_content[operator]', array(
				'default'			=>	'or',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'restrict_content[operator]' , array(
				'label'				=>	esc_html__( 'Operator', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'restrict_content',
				'choices'			=>	$this->Content_Restriction->get_operator_options(),
				'active_callback'	=>	function(){
					$settings = get_option( 'restrict_content' );

					if( is_array( $settings ) && array_key_exists( 'apply_for', $settings ) ){
						if( in_array( $settings['apply_for'], array( 'capabilities', 'roles' ) ) ){
							return true;
						}
					}

					return false;
				},
				'description'		=>	esc_html__( 'How to match the options to the logged-in users.', 'streamtube-core' )
			) );
	}

	private function section_myCRED_content(){

		if( ! $this->myCred->is_enabled() ){
			return;
		}

		$this->customizer->add_panel( 'mycred' , array(
			'title'			=>	esc_html__( 'myCred', 'streamtube-core' ),
			'priority'		=>	100
		) );

			$this->customizer->add_section( 'mycred_donation' , array(
				'title'			=>	esc_html__( 'Donation', 'streamtube-core' ),
				'panel'			=>	'mycred',
				'priority'		=>	10,
				'description'	=>	$this->description()
			) );			

				$this->customizer->add_setting( 'plugin_mycred[donate]', array(
					'default'			=>	'',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'plugin_mycred[donate]' , array(
					'label'				=>	esc_html__( 'Enable', 'streamtube-core' ),
					'type'				=>	'select',
					'section'			=>	'mycred_donation',
					'choices'			=>	array(
						''				=>	esc_html__( 'No', 'streamtube-core' ),
						'all'			=>	esc_html__( 'All Users', 'streamtube-core' ),
						'verified'		=>	esc_html__( 'Verified Users Only', 'streamtube-core' )
					)
				) );

				$this->customizer->add_setting( 'plugin_mycred[donate_point_type]', array(
					'default'			=>	defined( 'MYCRED_DEFAULT_TYPE_KEY' ) ? MYCRED_DEFAULT_TYPE_KEY : '',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'plugin_mycred[donate_point_type]' , array(
					'label'				=>	esc_html__( 'Point Type', 'streamtube-core' ),
					'type'				=>	'text',
					'section'			=>	'mycred_donation'
				) );

				$this->customizer->add_setting( 'plugin_mycred[donate_min_points]', array(
					'default'			=>	'1',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'plugin_mycred[donate_min_points]' , array(
					'label'				=>	esc_html__( 'Minimum Points', 'streamtube-core' ),
					'type'				=>	'number',
					'section'			=>	'mycred_donation'
				) );

			$this->customizer->add_section( 'mycred_buy_points' , array(
				'title'			=>	esc_html__( 'Buy Points', 'streamtube-core' ),
				'panel'			=>	'mycred',
				'priority'		=>	10
			) );			

				$this->customizer->add_setting( 'plugin_mycred[buy_points_page]', array(
					'default'			=>	'',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'plugin_mycred[buy_points_page]' , array(
					'label'				=>	esc_html__( 'Buy Points Page', 'streamtube-core' ),
					'type'				=>	'dropdown-pages',
					'section'			=>	'mycred_buy_points'
				) );

			$this->customizer->add_section( 'mycred_sell_content' , array(
				'title'			=>	esc_html__( 'Sell Content', 'streamtube-core' ),
				'panel'			=>	'mycred',
				'priority'		=>	10,
				'description'	=>	$this->description()
			) );

				$this->customizer->add_setting( 'plugin_mycred[sell_video_content]', array(
					'default'			=>	'',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'plugin_mycred[sell_video_content]' , array(
					'label'				=>	esc_html__( 'Sell Video Content', 'streamtube-core' ),
					'type'				=>	'checkbox',
					'section'			=>	'mycred_sell_content',
					'description'		=>	esc_html__( 'Enable selling video content.', 'streamtube-core' )
				) );

				$this->customizer->add_setting( 'plugin_mycred[author_driven_pricing]', array(
					'default'			=>	'',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'plugin_mycred[author_driven_pricing]' , array(
					'label'				=>	esc_html__( 'Author-Driven Pricing', 'streamtube-core' ),
					'type'				=>	'checkbox',
					'section'			=>	'mycred_sell_content',
					'description'		=>	esc_html__( 'Allow authors set their video price manually.', 'streamtube-core' )
				) );			
	}

	private function section_upload(){
		$this->customizer->add_section( 'upload' , array(
			'title'			=>	esc_html__( 'Upload', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'upload_files', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'upload_files' , array(
				'label'				=>	esc_html__( 'Upload Videos', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'upload',
				'description'		=>	esc_html__( 'Allow uploading videos', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'upload_max_file_size', array(
				'default'			=>	streamtube_core_get_max_upload_size()/1048576,
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'upload_max_file_size' , array(
				'label'				=>	esc_html__( 'Upload File Size', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'upload',
				'description'		=>	sprintf(
					esc_html__( 'Maximum upload file size in MB, must be smaller than %s', 'streamtube-core' ),
					'<strong style="color: red">'. number_format_i18n( ceil( wp_max_upload_size()/1048576 ) ) .'MB</strong>'
				),
				'active_callback'	=>	function(){
					return get_option( 'upload_files', 'on' ) ? true : false;
				}
			) );

			$this->customizer->add_setting( 'embed_videos', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'embed_videos' , array(
				'label'				=>	esc_html__( 'Embed Videos', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'upload',
				'description'		=>	esc_html__( 'Allow embedding videos', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'auto_publish', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'auto_publish' , array(
				'label'				=>	esc_html__( 'Auto Publish', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'upload',
				'description'		=>	esc_html__( 'Auto Publish Uploaded Videos', 'streamtube-core' )
			) );			

			$this->customizer->add_setting( 'chunk_size', array(
				'default'			=>	10240,
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );			

			$this->customizer->add_control( 'chunk_size' , array(
				'label'				=>	esc_html__( 'Chunk Size', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'upload',
				'description'		=>	sprintf(
					esc_html__( 'Chunk size for uploading big file, default is 10240(10MB), requires %s plugin activated', 'streamtube-core' ),
					'<a target="_blank" href="https://vi.wordpress.org/plugins/tuxedo-big-file-uploads/">Big File Uploads</a>'
				)
			) );

			$this->customizer->add_setting( 'max_thumbnail_size', array(
				'default'			=>	'2',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'max_thumbnail_size' , array(
				'label'				=>	esc_html__( 'Max Thumbnail Size', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'upload',
				'description'		=>	sprintf(
					esc_html__( 'Maximum upload thumbnail image size in MB, must be smaller than %s, 2MB is default', 'streamtube-core' ),
					'<strong style="color: red">'. number_format_i18n( ceil( wp_max_upload_size()/1048576 ) ) .'MB</strong>'
				),				
			) );			
	}

	/**
	 *
	 * Video submit form
	 * 
	 * @since 2.0
	 */
	private function section_video_submit(){
		$this->customizer->add_section( 'video_submit' , array(
			'title'			=>	esc_html__( 'Video Submit', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );		

			$this->customizer->add_setting( 'allow_edit_source', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'allow_edit_source' , array(
				'label'				=>	esc_html__( 'Edit Source', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'video_submit',
				'description'		=>	esc_html__( 'Allow authors to edit video source after submitting, Admin and Editor can always edit source without any restriction', 'streamtube-core' )		
			) );


			$taxonomies = get_object_taxonomies( 'video', 'object' );

			if( $taxonomies ){
				foreach ( $taxonomies as $tax => $object ){

					if( $tax != 'report_category' ){

						$this->customizer->add_setting( 'video_taxonomy_' . $tax, array(
							'default'			=>	'on',
							'type'				=>	'option',
							'capability'		=>	'edit_theme_options',
							'sanitize_callback'	=>	'sanitize_text_field',
						) );

						$this->customizer->add_control( 'video_taxonomy_' . $tax, array(
							'label'				=>	$object->label,
							'type'				=>	'checkbox',
							'section'			=>	'video_submit',
							'description'		=>	sprintf(
								esc_html__( 'Enable %s taxonomy', 'streamtube-core' ),
								'<strong>'. $object->label .'</strong>'
							)
						) );

						$this->customizer->add_setting( 'video_taxonomy_' . $tax . '_max_items', array(
							'default'			=>	0,
							'type'				=>	'option',
							'capability'		=>	'edit_theme_options',
							'sanitize_callback'	=>	'sanitize_text_field',
						) );

						$this->customizer->add_control( 'video_taxonomy_' . $tax . '_max_items', array(
							'label'				=>	esc_html__( 'Max Items', 'streamtube-core' ),
							'type'				=>	'number',
							'section'			=>	'video_submit',
							'description'		=>	sprintf(
								esc_html__( 'Maximum of %s items can be submitted, 0 is unlimited', 'streamtube-core' ),
								'<strong>'. $object->label .'</strong>'
							),
							'active_callback'	=>	function() use ($tax){
								return get_option( 'video_taxonomy_' . $tax, 'on' ) ? true : false;
							}
						) );	
					}				
				}
			}
	}

	/**
	 *
	 * Post submit form
	 * 
	 * @since 2.0
	 */
	private function section_post_submit(){
		$this->customizer->add_section( 'post_submit' , array(
			'title'			=>	esc_html__( 'Post Submit', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );		
			$taxonomies = get_object_taxonomies( 'post', 'object' );

			if( $taxonomies ){
				foreach ( $taxonomies as $tax => $object ){

					if( $tax != 'post_format' ){

						$this->customizer->add_setting( 'post_taxonomy_' . $tax, array(
							'default'			=>	'on',
							'type'				=>	'option',
							'capability'		=>	'edit_theme_options',
							'sanitize_callback'	=>	'sanitize_text_field',
						) );

						$this->customizer->add_control( 'post_taxonomy_' . $tax, array(
							'label'				=>	$object->label,
							'type'				=>	'checkbox',
							'section'			=>	'post_submit',
							'description'		=>	sprintf(
								esc_html__( 'Enable %s taxonomy', 'streamtube-core' ),
								'<strong>'. $object->label .'</strong>'
							)
						) );

						$this->customizer->add_setting( 'post_taxonomy_' . $tax . '_max_items', array(
							'default'			=>	0,
							'type'				=>	'option',
							'capability'		=>	'edit_theme_options',
							'sanitize_callback'	=>	'sanitize_text_field',
						) );

						$this->customizer->add_control( 'post_taxonomy_' . $tax . '_max_items', array(
							'label'				=>	esc_html__( 'Max Items', 'streamtube-core' ),
							'type'				=>	'number',
							'section'			=>	'post_submit',
							'description'		=>	sprintf(
								esc_html__( 'Maximum of %s items can be submitted, 0 is unlimited', 'streamtube-core' ),
								'<strong>'. $object->label .'</strong>'
							),
							'active_callback'	=>	function() use ($tax){
								return get_option( 'post_taxonomy_' . $tax, 'on' ) ? true : false;
							}
						) );	
					}				
				}
			}
	}	

	private function section_player(){
		$this->customizer->add_section( 'player' , array(
			'title'			=>	esc_html__( 'Player', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'player_ratio', array(
				'default'			=>	'21x9',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );			

			$this->customizer->add_control( 'player_ratio' , array(
				'label'				=>	esc_html__( 'Player Aspect Ratio', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'player',
				'choices'			=>	array(
					''		=>	esc_html__( 'Default', 'streamtube-core' ),
        			'21x9'	=>	esc_html__( '21x9', 'streamtube-core' ),
        			'16x9'	=>	esc_html__( '16x9', 'streamtube-core' ),
        			'4x3'	=>	esc_html__( '4x3', 'streamtube-core' ),
        			'1x1'	=>	esc_html__( '1x1', 'streamtube-core' )
				)
			) );		

			$this->customizer->add_setting( 'player_skin', array(
				'default'			=>	'forest',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'player_skin' , array(
				'label'				=>	esc_html__( 'Skin', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'player',
				'choices'			=>	array(
					'city'		=>	esc_html__( 'City', 'streamtube-core' ),
					'forest'	=>	esc_html__( 'Forest', 'streamtube-core' ),
					'fantasy'	=>	esc_html__( 'Fantasy', 'streamtube-core' ),
					'sea'		=>	esc_html__( 'Sea', 'streamtube-core' ),
					'custom'	=>	esc_html__( 'Custom', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'player_skin_custom', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'player_skin_custom' , array(
				'label'				=>	esc_html__( 'Skin Class Name', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Custom skin class name', 'streamtube-core' ),
				'active_callback'	=>	function(){
					return get_option( 'player_skin', 'forest' ) == 'custom' ? true : false;
				}
			) );

			$this->customizer->add_setting( 'player_skin_css', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_textarea_field',
			) );

			$this->customizer->add_control( 'player_skin_css' , array(
				'label'				=>	esc_html__( 'Custom Skin CSS', 'streamtube-core' ),
				'type'				=>	'textarea',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Custom skin CSS', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'player_language', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'player_language' , array(
				'label'				=>	esc_html__( 'Language', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Default player language', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'inactivity_timeout', array(
				'default'			=>	1000,
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'inactivity_timeout' , array(
				'label'				=>	esc_html__( 'Inactivity Timeout', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Determines how many milliseconds of inactivity is required before declaring the user inactive', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'player_share', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'player_share' , array(
				'label'				=>	esc_html__( 'Share Dialog', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Enable the sharing dialog', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'player_logo', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control(
				new WP_Customize_Image_Control(
					$this->customizer,
					'player_logo',
					array(
						'label'      => esc_html__( 'Logo', 'streamtube-core' ),
						'section'    => 'player',
						'description'	=>	esc_html__( 'Player watermark.', 'streamtube-core' )
					)
				)
			);

			$this->customizer->add_setting( 'player_logo_position', array(
				'default'			=>	'top-right',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'player_logo_position' , array(
				'label'				=>	esc_html__( 'Logo Position', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'player',
				'choices'			=>	array(
					'top-left'	=>	esc_html__( 'Top Left', 'streamtube-core' ),
					'top-right'	=>	esc_html__( 'Top Right', 'streamtube-core' ),
					'bottom-left'	=>	esc_html__( 'Bottom Left', 'streamtube-core' ),
					'bottom-right'	=>	esc_html__( 'Bottom Right', 'streamtube-core' )
				),
				'active_callback'	=>	function(){
					return get_option( 'player_logo' ) ? true : false;
				}
			) );			

			$this->customizer->add_setting( 'player_control_logo', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control(
				new WP_Customize_Image_Control(
					$this->customizer,
					'player_control_logo',
					array(
						'label'      => esc_html__( 'Control Bar Logo', 'streamtube-core' ),
						'section'    => 'player'
					)
				)
			);

			$this->customizer->add_setting( 'player_playbackrates', array(
				'default'			=>	implode( ',' , array( 0.25, 0.5, 1,1.25, 1.5, 1.75, 2 ) ),
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'player_playbackrates' , array(
				'label'				=>	esc_html__( 'Playback Rates', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'player'
			) );			

			$this->customizer->add_setting( 'player_autoplay', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'player_autoplay' , array(
				'label'				=>	esc_html__( 'Autoplay', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Autoplay on page load.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'player_loop', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'player_loop' , array(
				'label'				=>	esc_html__( 'Loop', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player'
			) );			

			$this->customizer->add_setting( 'player_mute', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'player_mute' , array(
				'label'				=>	esc_html__( 'Mute', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Mute on page load.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'fs_landscape_mode', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'fs_landscape_mode' , array(
				'label'				=>	esc_html__( 'Full Screen Landscape Mode', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player'
			) );			

			$this->customizer->add_setting( 'override_wp_video_shortcode', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'override_wp_video_shortcode' , array(
				'label'				=>	esc_html__( 'Override WP Video Player', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Load custom player instead of WP Video Native Player.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'override_wp_video_block', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'override_wp_video_block' , array(
				'label'				=>	esc_html__( 'Override WP Video Block', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Load custom player instead of WP Video Block.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'override_wp_youtube_block', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'override_wp_youtube_block' , array(
				'label'				=>	esc_html__( 'Override WP Youtube Block', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'player',
				'description'		=>	esc_html__( 'Load custom player instead of WP Youtube Block.', 'streamtube-core' )
			) );
	}

	private function section_youtube_importer(){
		$this->customizer->add_section( 'youtube_importer' , array(
			'title'			=>	esc_html__( 'YouTube Importer', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );


			$this->customizer->add_setting( 'youtube_api_key', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'youtube_api_key' , array(
				'label'				=>	esc_html__( 'API Key', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'youtube_importer'
			) );		
	}

	private function section_footer(){
		$this->customizer->add_section( 'footer' , array(
			'title'			=>	esc_html__( 'Footer', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );


			$this->customizer->add_setting( 'footer_content_width', array(
				'default'			=>	'container',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'footer_content_width' , array(
				'label'				=>	esc_html__( 'Content Width', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'footer',
				'choices'			=>	array(
					'container'				=>	esc_html__( 'Boxed', 'streamtube-core' ),
					'container-wide'		=>	esc_html__( 'Wide', 'streamtube-core' ),
					'container-fluid'		=>	esc_html__( 'Fullwidth', 'streamtube-core' )
				)
			) );			

			$this->customizer->add_setting( 'footer_widgets', array(
				'default'			=>	'4',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'footer_widgets' , array(
				'label'				=>	esc_html__( 'Widget Columns', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'footer',
				'choices'			=>	array(
					'0'	=>	esc_html__( 'None', 'streamtube-core' ),
					'2'	=>	esc_html__( '2 columns', 'streamtube-core' ),
					'3'	=>	esc_html__( '3 columns', 'streamtube-core' ),
					'4'	=>	esc_html__( '4 columns', 'streamtube-core' ),
					'6'	=>	esc_html__( '6 columns', 'streamtube-core' )
				)
			) );

			$this->customizer->add_setting( 'footer_logo', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control(
				new WP_Customize_Image_Control(
					$this->customizer,
					'footer_logo',
					array(
						'label'      => esc_html__( 'Logo', 'streamtube-core' ),
						'section'    => 'footer'
					)
				)
			);			

			foreach ( $this->get_socials() as $social => $name ) {
				$this->customizer->add_setting( 'social_' . $social, array(
					'default'			=>	'',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'social_' . $social , array(
					'label'				=>	sprintf(
						esc_html__( '%s URL', 'streamtube-core' ),
						$name
					),
					'type'				=>	'url',
					'section'			=>	'footer'
				) );					
			}

			$this->customizer->add_setting( 'copyright_text', array(
				'default'			=>	sprintf(
					esc_html__( 'Copyright %s %s', 'streamtube-core' ),
					date( 'Y' ),
					get_bloginfo( 'name' )
				),
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options'
			) );

			$this->customizer->add_control( 'copyright_text' , array(
				'label'				=>	esc_html__( 'Copyright Text', 'streamtube-core' ),
				'type'				=>	'textarea',
				'section'			=>	'footer'
			) );

	}

	private function section_better_messages(){

		if( ! class_exists( 'BP_Better_Messages' ) ){
			return;
		}

		$this->customizer->add_section( 'better_messages' , array(
			'title'			=>	esc_html__( 'Better Messages', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'better_messages[private_message]', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'better_messages[private_message]' , array(
				'label'				=>	esc_html__( 'Private Messages', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'better_messages',
				'description'		=>	esc_html__( 'Allow user send private messages to other users', 'streamtube-core' )
			) );		

			$this->customizer->add_setting( 'better_messages[enable_livechat_label]', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'better_messages[enable_livechat_label]' , array(
				'label'				=>	esc_html__( 'Enable Live Chat Label', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'better_messages'
			) );

			$this->customizer->add_setting( 'better_messages[livechat_label_text]', array(
				'default'			=>	esc_html__( 'Live Chat', 'streamtube-core' ),
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'better_messages[livechat_label_text]' , array(
				'label'				=>	esc_html__( 'Live Chat Label', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'better_messages'
			) );			

			$this->customizer->add_setting( 'better_messages[allow_author_create_livechat]', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'better_messages[allow_author_create_livechat]' , array(
				'label'				=>	esc_html__( 'Allow Authors To Create Live Chat Room', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'better_messages'
			) );			
	}

	private function section_pmpro(){

		if( ! function_exists( 'pmpro_activation' ) ){
			return;
		}

		$this->customizer->add_section( 'pmpro_settings' , array(
			'title'			=>	esc_html__( 'Paid Memberships Pro', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'pmpro_settings[paid_icon]', array(
				'default'			=>	'icon-lock',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'pmpro_settings[paid_icon]' , array(
				'label'				=>	esc_html__( 'Paid Icon', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'pmpro_settings',
				'description'		=>	esc_html__( 'Shows Paid Icon on Paid Post Thumbnail, leave blank to hide icon', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'pmpro_settings[paid_label]', array(
				'default'			=>	'Premium',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'pmpro_settings[paid_label]' , array(
				'label'				=>	esc_html__( 'Paid Label Text', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'pmpro_settings',
				'description'		=>	esc_html__( 'Shows Premium label on Paid Post Thumbnail, leave blank to hide label.', 'streamtube-core' )
			) );
	}

	private function section_misc(){

		$this->customizer->add_section( 'misc' , array(
			'title'			=>	esc_html__( 'Misc', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'custom_login_page', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'custom_login_page' , array(
				'label'				=>	esc_html__( 'Custom Login Page', 'streamtube-core' ),
				'type'				=>	'dropdown-pages',
				'section'			=>	'misc'
			) );

			$this->customizer->add_setting( 'custom_register_page', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'custom_register_page' , array(
				'label'				=>	esc_html__( 'Custom Register Page', 'streamtube-core' ),
				'type'				=>	'dropdown-pages',
				'section'			=>	'misc'
			) );

			$this->customizer->add_setting( 'hide_admin_bar', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'hide_admin_bar' , array(
				'label'				=>	esc_html__( 'Hide Admin Bar', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc'
			) );

			$this->customizer->add_setting( 'block_admin_access', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'block_admin_access' , array(
				'label'				=>	esc_html__( 'Block Admin Access', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc'
			) );

			$this->customizer->add_setting( 'block_admin_access_url', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'block_admin_access_url' , array(
				'label'				=>	esc_html__( 'Error Page', 'streamtube-core' ),
				'type'				=>	'dropdown-pages',
				'section'			=>	'misc',
				'active_callback'	=>	function(){
					return get_option( 'block_admin_access' ) ? true : false;
				}
			) );

			$this->customizer->add_setting( 'video_gutenberg', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'video_gutenberg' , array(
				'label'				=>	esc_html__( 'Gutenberg Editor', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc',
				'description'		=>	esc_html__( 'Enable Gutenberg Editor for Video post type, apply to backend form only', 'streamtube-core' )
			) );		

			$this->customizer->add_setting( 'show_current_user_attachment', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'show_current_user_attachment' , array(
				'label'				=>	esc_html__( 'Current User Attachment', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc',
				'description'		=>	esc_html__( 'Only retrieve current user attachment files in WP media library.', 'streamtube-core' )
			) );		

			$this->customizer->add_setting( 'delete_attached_files', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'delete_attached_files' , array(
				'label'				=>	esc_html__( 'Delete Attached Files', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc',
				'description'		=>	esc_html__( 'Permanently delete all attached files after the parent video is deleted.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'hide_video_attachment_page', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'hide_video_attachment_page' , array(
				'label'				=>	esc_html__( 'Hide Video Attachment Page', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc'
			) );			

			$this->customizer->add_setting( 'editor_add_media', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'editor_add_media' , array(
				'label'				=>	esc_html__( 'Enable Add Media button', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'misc',
				'description'		=>	esc_html__( 'Enable Add Media button for rich editor', 'streamtube-core' )
			) );			

			$this->customizer->add_setting( 'download_video', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'download_video' , array(
				'label'				=>	esc_html__( 'Download Video', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'misc',
				'choices'			=>	array(
					''				=>	esc_html__( 'No One', 'streamtube-core' ),
					'anyone'		=>	esc_html__( 'Anyone', 'streamtube-core' ),
        			'member'		=>	esc_html__( 'Logged In Users', 'streamtube-core' )
				),
				'description'		=>	esc_html__( 'Who can download video files?', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'share_permalink', array(
				'default'			=>	'shorturl',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'share_permalink' , array(
				'label'				=>	esc_html__( 'Share Permalink', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'misc',
				'choices'			=>	array(
					'shorturl'				=>	esc_html__( 'Short URL', 'streamtube-core' ),
					'fullurl'		=>	esc_html__( 'Full URL', 'streamtube-core' )
				)
			) );
	}

	private function section_system(){
		$this->customizer->add_section( 'system' , array(
			'title'			=>	esc_html__( 'System', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'system_tsp_path', array(
				'default'			=>	'/usr/bin/tsp',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'system_tsp_path' , array(
				'label'				=>	esc_html__( 'Task Spooler Path', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'system',
				'description'		=>	sprintf(
					esc_html__( 'Set application path where %s is located, e.g: /usr/bin/tsp', 'streamtube-core' ),
					'<strong>'. esc_html__( 'Task Spooler (TSP)', 'streamtube-core' ) .'</strong>'
				)
			) );

			$this->customizer->add_setting( 'system_curl_path', array(
				'default'			=>	'/usr/bin/curl',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'system_curl_path' , array(
				'label'				=>	esc_html__( 'Curl Path', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'system',
				'description'		=>	sprintf(
					esc_html__( 'Set application path where %s is located, e.g: /usr/bin/curl', 'streamtube-core' ),
					'<strong>'. esc_html__( 'CURL', 'streamtube-core' ) .'</strong>'
				)				
			) );
	}

	/**
	 * The google section
	 *
	 * @since  1.0.0
	 */
	private function section_google_sitekit(){

		$Google_Analytics = new Streamtube_Core_GoogleSiteKit_Analytics();
		$Google_Analytics_Rest = new StreamTube_Core_GoogleSiteKit_Analytics_Rest_Controller();

		if( ! $Google_Analytics->is_connected() ){
			return;
		}

		$overview_metrics = $Google_Analytics_Rest->get_overview_metrics();

		$overview_playevent_metrics = $Google_Analytics_Rest->get_overview_video_metrics();

		$this->customizer->add_section( 'gsitekit' , array(
			'title'			=>	esc_html__( 'Google Sitekit', 'streamtube-core' ),
			'panel'			=>	'streamtube',
			'priority'		=>	10
		) );

			$this->customizer->add_setting( 'sitekit_reports', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_reports' , array(
				'label'				=>	esc_html__( 'Enable Reports', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'gsitekit',
				'description'		=>	esc_html__( 'Enable Google Sitekit Reports for User Dashboard', 'streamtube-core' )
			) );

			foreach ( $overview_metrics as $key => $value ) {
				$this->customizer->add_setting( 'sitekit_reports_overview_metrics['.$key.']', array(
					'default'			=>	'on',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'sitekit_reports_overview_metrics['.$key.']' , array(
					'label'				=>	$value,
					'type'				=>	'checkbox',
					'section'			=>	'gsitekit',
					'active_callback'	=>	function(){
						return get_option( 'sitekit_reports', 'on' ) ? true : false;
					},
					'description'		=>	sprintf(
						esc_html__( 'Enable %s overview report.', 'streamtube-core' ),
						'<strong>'. $value .'</strong>'
					)
				) );
			}

			foreach ( $overview_playevent_metrics as $key => $value) {
				$this->customizer->add_setting( 'sitekit_reports_overview_video_metrics['.$key.']', array(
					'default'			=>	'on',
					'type'				=>	'option',
					'capability'		=>	'edit_theme_options',
					'sanitize_callback'	=>	'sanitize_text_field',
				) );

				$this->customizer->add_control( 'sitekit_reports_overview_video_metrics['.$key.']' , array(
					'label'				=>	$value,
					'type'				=>	'checkbox',
					'section'			=>	'gsitekit',
					'active_callback'	=>	function(){
						return get_option( 'sitekit_reports', 'on' ) ? true : false;
					},
					'description'		=>	sprintf(
						esc_html__( 'Enable %s overview report.', 'streamtube-core' ),
						'<strong>'. $value .'</strong>'
					)
				) );
			}			

			$this->customizer->add_setting( 'sitekit_reports_cap', array(
				'default'			=>	'edit_posts',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_reports_cap' , array(
				'label'				=>	esc_html__( 'Capability', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'gsitekit',
				'description'		=>	esc_html__( 'Limits members from accessing reports by giving the custom capability.', 'streamtube-core' )
			) );			

			$this->customizer->add_setting( 'sitekit_heartbeat_tick', array(
				'default'			=>	'on',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_heartbeat_tick' , array(
				'label'				=>	esc_html__( 'Heartbeat Tick', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'gsitekit',
				'description'		=>	esc_html__( 'Add Auto-Update PageViews to heartbeat tick event', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'sitekit_heartbeat_tick_transient', array(
				'default'			=>	60*1*30,
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_heartbeat_tick_transient' , array(
				'label'				=>	esc_html__( 'Heartbeat Tick Transient Expiration', 'streamtube-core' ),
				'type'				=>	'number',
				'section'			=>	'gsitekit',
				'description'		=>	esc_html__( 'Time until expiration in seconds, 0 is no caching.', 'streamtube-core' ),
				'active_callback'	=>	function(){
					return get_option( 'sitekit_heartbeat_tick', 'on' ) ? true : false;
				}
			) );						

			$this->customizer->add_setting( 'sitekit_mapapikey', array(
				'default'			=>	'',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_mapapikey' , array(
				'label'				=>	esc_html__( 'Google Map API', 'streamtube-core' ),
				'type'				=>	'text',
				'section'			=>	'gsitekit',
				'description'		=>	esc_html__( 'Useful for drawing Geo chart.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'sitekit_pageview_type', array(
				'default'			=>	'pageviews',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_pageview_type' , array(
				'label'				=>	esc_html__( 'Page View Type', 'streamtube-core' ),
				'type'				=>	'select',
				'section'			=>	'gsitekit',
				'choices'			=>	streamtube_core_get_post_view_types(),
				'description'		=>	esc_html__( 'Set the type of how Google collects your video views.', 'streamtube-core' )
			) );

			$this->customizer->add_setting( 'sitekit_session_storage', array(
				'default'			=>	'1',
				'type'				=>	'option',
				'capability'		=>	'edit_theme_options',
				'sanitize_callback'	=>	'sanitize_text_field',
			) );

			$this->customizer->add_control( 'sitekit_session_storage' , array(
				'label'				=>	esc_html__( 'Session Storage', 'streamtube-core' ),
				'type'				=>	'checkbox',
				'section'			=>	'gsitekit',
				'description'		=>	esc_html__( 'Save and load reports from sessionStorage API.', 'streamtube-core' )
			) );			

	}
}
<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Streamtube_Core_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	protected $plugin_setting_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	protected $plugin;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {

		if ( defined( 'STREAMTUBE_CORE_VERSION' ) ) {
			$this->version = STREAMTUBE_CORE_VERSION;
		} else {
			$this->version = '2.0';
		}

		$this->plugin_name = 'StreamTube Core';

		$this->plugin = new stdClass();

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->define_core_hooks();
		$this->define_ads_hooks();
		$this->define_post_hooks();
		$this->define_video_hooks();
		$this->define_comment_hooks();
		$this->define_user_hooks();
		$this->define_woocommerce_hooks();
		$this->define_rest_hooks();

		$this->define_googlesitekit_hooks();

		$this->define_mycred_hooks();

		$this->define_better_messages_hooks();

		$this->define_bbpress();

		$this->define_youtube_importer();

		$this->define_bunnycdn();

		$this->define_pmpro();
	}

	/**
	 *
	 * Include file in WP environment
	 * 
	 * @param  string $file
	 *
	 * @since 1.0.9
	 * 
	 */
	private function include_file( $file ){
		require_once trailingslashit( plugin_dir_path( dirname( __FILE__ ) ) ) . $file;
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Streamtube_Core_Loader. Orchestrates the hooks of the plugin.
	 * - Streamtube_Core_i18n. Defines internationalization functionality.
	 * - Streamtube_Core_Admin. Defines all hooks for the admin area.
	 * - Streamtube_Core_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-loader.php' );

		$this->loader = new Streamtube_Core_Loader();

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-i18n.php' );

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-cron.php' );

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-license.php' );		

		$this->plugin->license = new Streamtube_Core_License();

		/**
		 * System permission
		 */
		$this->include_file( 'includes/class-streamtube-core-permission.php' );

		/**
		 * The class responsible for defining oEmbed functionality
		 * of the plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-oembed.php' );

		/**
		 * The class responsible for defining endpoint functionality
		 * of the plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-endpoint.php' );	

		/**
		 * The class responsible for defining custom query vars functionality
		 * of the plugin.
		 */
		$this->include_file( 'includes/class-streamtube-core-menu.php' );	

		/**
		 * The class responsible for defining all post functionality
		 */
		$this->include_file( 'includes/class-streamtube-core-post.php' );	

		/**
		 * The class responsible for defining all video functionality
		 */
		$this->include_file( 'includes/class-streamtube-core-video.php' );			

		/**
		 * The class responsible for defining all download functionality
		 */
		$this->include_file( 'includes/class-streamtube-core-download-files.php' );			

		/**
		 * The class responsible for defining all comment functionality
		 */
		$this->include_file( 'includes/class-streamtube-core-comment.php' );	

		/**
		 * The class responsible for defining all custom taxonomies
		 */
		$this->include_file( 'includes/class-streamtube-core-taxonomy.php' );	

		/**
		 * The class responsible for defining sidebar
		 */
		$this->include_file( 'includes/class-streamtube-core-sidebar.php' );	

		/**
		 * The class responsible for defining custom posts widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-posts.php' );

		/**
		 * The class responsible for defining custom taxonomy widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-term-grid.php' );		

		/**
		 * The class responsible for defining custom posts widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-comments.php' );

		/**
		 * The class responsible for defining custom posts widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-comments-template.php' );

		/**
		 * The class responsible for defining custom user list widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-user-list.php' );

		/**
		 * The class responsible for defining custom taxonomy widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-video-categories.php' );

		/**
		 * The class responsible for defining custom taxonomy widget
		 */
		$this->include_file( 'includes/widgets/class-streamtube-core-widget-chatroom.php' );		

		/**
		 * The class responsible for defining custom elementor widgets
		 */
		$this->include_file( 'includes/class-streamtube-core-elementor.php' );		

		/**
		 * The class responsible for defining user profile page
		 */
		$this->include_file( 'includes/class-streamtube-core-user.php' );

		/**
		 * The class responsible for defining user profile page
		 */
		$this->include_file( 'includes/class-streamtube-core-user-profile.php' );	

		/**
		 * The class responsible for defining user profile page
		 */
		$this->include_file( 'includes/class-streamtube-core-user-dashboard.php' );	

		/**
		 * The class responsible for defining shortcodes.
		 */
		$this->include_file( 'includes/class-streamtube-core-shortcode.php' );	

		/**
		 * The class responsible for defining restrict conte t
		 */
		$this->include_file( 'includes/class-streamtube-core-restrict-content.php' );	

		$this->plugin->restrict_content = new Streamtube_Core_Restrict_Content();

		/**
		 * The class responsible for defining woocommerce.
		 */
		$this->include_file( 'includes/class-streamtube-core-woocommerce.php' );

		/**
		 * The class responsible for defining rest.
		 */
		$this->include_file( 'includes/rest_api/class-streamtube-core-rest-api.php' );

		/**
		 * The class responsible for defining generate image rest API
		 */
		$this->include_file( 'includes/rest_api/class-streamtube-core-generate-image-rest-controller.php' );	

		/**
		 * The class responsible for defining user rest API
		 */
		$this->include_file( 'includes/rest_api/class-streamtube-core-user-rest-controller.php' );		

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		$this->include_file( 'admin/class-streamtube-core-admin.php' );	

		$this->include_file( 'admin/class-streamtube-core-task-spooler.php' );	
		
		$this->include_file( 'admin/class-streamtube-core-admin-user.php' );

		$this->include_file( 'admin/class-streamtube-core-admin-post.php' );

		$this->include_file( 'admin/class-streamtube-core-metabox.php' );

		$this->include_file( 'admin/class-streamtube-core-customizer.php' );

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		$this->include_file( 'public/class-streamtube-core-public.php' );	

		/**
		 * The function responsible for defining post functions
		 */		
		$this->include_file( 'includes/function-users.php' );	

		/**
		 * The function responsible for defining post functions
		 */		
		$this->include_file( 'includes/function-posts.php' );	

		/**
		 * The function responsible for defining post functions
		 */		
		$this->include_file( 'includes/function-comments.php' );

		/**
		 * The function responsible for defining user functions
		 */		
		$this->include_file( 'includes/function-templates.php' );

		/**
		 * The function responsible for defining email functions
		 */		
		$this->include_file( 'includes/function-notify.php' );

		/**
		 * The function responsible for defining options functions
		 */		
		$this->include_file( 'includes/function-options.php' );

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Streamtube_Core_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Streamtube_Core_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$this->plugin->customizer = new Streamtube_Core_Customizer();

		$this->loader->add_action(
			'customize_register',
			$this->plugin->customizer,
			'register'
		);	

		$this->plugin->admin = new Streamtube_Core_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 
			'admin_enqueue_scripts', 
			$this->plugin->admin, 
			'enqueue_styles' 
		);
		$this->loader->add_action( 
			'admin_enqueue_scripts', 
			$this->plugin->admin, 
			'enqueue_scripts' 
		);

		$this->loader->add_action( 
			'admin_notices', 
			$this->plugin->admin, 
			'notices' 
		);		

		$this->plugin->admin_user = new Streamtube_Core_Admin_User();

		$this->loader->add_action( 
			'wp_ajax_set_user_verification', 
			$this->plugin->admin_user, 
			'ajax_set_verification' 
		);		

		$this->loader->add_filter(
			'manage_users_columns',
			$this->plugin->admin_user,
			'user_table',
			10,
			1
		);

		$this->loader->add_filter(
			'manage_users_custom_column',
			$this->plugin->admin_user,
			'user_table_columns',
			20,
			3
		);		

		$this->plugin->admin_post = new Streamtube_Core_Admin_Post();

		$this->loader->add_filter(
			'manage_video_posts_columns',
			$this->plugin->admin_post,
			'post_table',
			10,
			1
		);

		$this->loader->add_action(
			'manage_video_posts_custom_column',
			$this->plugin->admin_post,
			'post_table_columns',
			10,
			2
		);			

		$this->plugin->metabox = new Streamtube_Core_MetaBox();

		$this->loader->add_action( 
			'add_meta_boxes', 
			$this->plugin->metabox, 
			'add_meta_boxes' 
		);

		$this->loader->add_action( 
			'save_post', 
			$this->plugin->metabox, 
			'video_data_save',
			10,
			1 
		);

		$this->loader->add_action( 
			'save_post', 
			$this->plugin->metabox, 
			'template_options_save',
			10,
			1 
		);		

		$this->loader->add_action(
			'add_meta_boxes', 
			$this->plugin->restrict_content, 
			'metaboxes' 
		);

		$this->loader->add_action( 
			'save_post', 
			$this->plugin->restrict_content, 
			'save_data',
			10,
			1 
		);

		$this->loader->add_action( 
			'streamtube/player/file/output', 
			$this->plugin->restrict_content, 
			'filter_player',
			200,
			1 
		);

		$this->loader->add_action( 
			'streamtube/player/embed/output', 
			$this->plugin->restrict_content, 
			'filter_player',
			200,
			1 
		);

		$this->loader->add_action( 
			'wp_ajax_join_us', 
			$this->plugin->restrict_content, 
			'ajax_request_join_us',
			10,
			1 
		);

		$this->loader->add_action( 
			'wp_footer', 
			$this->plugin->restrict_content, 
			'load_modal_join_us',
			10,
			1 
		);		

		$this->plugin->task_spooler = new Streamtube_Core_Task_Spooler();

		$this->loader->add_action( 
			'admin_menu', 
			$this->plugin->task_spooler,
			'admin_menu'
		);			
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$this->plugin->public = new Streamtube_Core_Public();

		$this->loader->add_action(
			 'wp_enqueue_scripts', 
			 $this->plugin->public, 
			 'enqueue_styles' 
		);

		$this->loader->add_action( 
			'wp_enqueue_scripts', 
			$this->plugin->public, 
			'enqueue_scripts' 
		);

		$this->loader->add_action( 
			'login_enqueue_scripts', 
			$this->plugin->public, 
			'enqueue_scripts' 
		);

		$this->loader->add_action( 
			'enqueue_embed_scripts', 
			$this->plugin->public, 
			'enqueue_embed_scripts' 
		);		

		$this->loader->add_action( 
			'streamtube/header/profile/before', 
			$this->plugin->public,
			'the_upload_button'
		);		

		$this->loader->add_action( 
			'wp_footer', 
			$this->plugin->public, 
			'load_modals' 
		);

		$this->loader->add_filter( 
			'search_template', 
			$this->plugin->public, 
			'load_search_template' 
		);

		$this->loader->add_action(
			'wp_head',
			$this,
			'generator'
		);

	}

	/**
	 * Register all of the hooks related to the core functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_core_hooks(){

		$this->plugin->cron = new Streamtube_Core_Cron();

		$this->loader->add_filter(
			'cron_schedules',
			$this->plugin->cron,
			'add_schedules',
			10,
			1
		);	

		$this->loader->add_action( 
			'init', 
			'Streamtube_Core_Endpoint', 
			'add_endpoints' 
		);

		$this->plugin->taxonomy = new Streamtube_Core_Taxonomy();

		$this->loader->add_action( 
			'init', 
			$this->plugin->taxonomy, 
			'video_category' 
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->taxonomy, 
			'video_tag' 
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->taxonomy, 
			'report_category' 
		);		

		$this->loader->add_action( 
			'wp_ajax_search_terms',
			$this->plugin->taxonomy, 
			'search_terms'
		);

		$this->loader->add_action( 
			'categories_add_form_fields',
			$this->plugin->taxonomy, 
			'add_thumbnail_field',
			10,
			1
		);

		$this->loader->add_action( 
			'categories_edit_form_fields',
			$this->plugin->taxonomy, 
			'edit_thumbnail_field',
			10,
			2
		);

		$this->loader->add_action( 
			'category_add_form_fields',
			$this->plugin->taxonomy, 
			'add_thumbnail_field',
			10,
			1
		);

		$this->loader->add_action( 
			'category_edit_form_fields',
			$this->plugin->taxonomy, 
			'edit_thumbnail_field',
			10,
			2
		);		

		$this->loader->add_action( 
			'created_categories',
			$this->plugin->taxonomy, 
			'update_thumbnail_field',
			10,
			1
		);			

		$this->loader->add_action( 
			'edited_categories',
			$this->plugin->taxonomy, 
			'update_thumbnail_field',
			10,
			1
		);

		$this->loader->add_action( 
			'created_category',
			$this->plugin->taxonomy, 
			'update_thumbnail_field',
			10,
			1
		);			

		$this->loader->add_action( 
			'edited_category',
			$this->plugin->taxonomy, 
			'update_thumbnail_field',
			10,
			1
		);		

		$this->loader->add_filter( 
			'manage_edit-categories_columns',
			$this->plugin->taxonomy, 
			'add_thumbnail_column',
			10,
			1
		);

		$this->loader->add_filter( 
			'manage_categories_custom_column',
			$this->plugin->taxonomy, 
			'add_thumbnail_column_content',
			10,
			3
		);		

		$this->loader->add_filter( 
			'manage_edit-category_columns',
			$this->plugin->taxonomy, 
			'add_thumbnail_column',
			10,
			1
		);

		$this->loader->add_filter( 
			'manage_category_custom_column',
			$this->plugin->taxonomy, 
			'add_thumbnail_column_content',
			10,
			3
		);		

		$this->plugin->sidebar = new Streamtube_Core_Sidebar();

		$this->loader->add_action( 
			'widgets_init', 
			$this->plugin->sidebar, 
			'widgets_init'
		);

		$this->loader->add_action( 
			'widgets_init', 
			'Streamtube_Core_Widget_User_List', 
			'register'
		);		

		$this->loader->add_action( 
			'widgets_init', 
			'Streamtube_Core_Widget_Posts', 
			'register'
		);

		$this->loader->add_action( 
			'widgets_init', 
			'Streamtube_Core_Widget_Term_Grid', 
			'register'
		);		

		$this->loader->add_action( 
			'widgets_init', 
			'Streamtube_Core_Widget_Video_Category', 
			'register'
		);		

		$this->loader->add_action( 
			'widgets_init', 
			'Streamtube_Core_Widget_Comments', 
			'register'
		);

		$this->loader->add_action( 
			'widgets_init', 
			'Streamtube_Core_Widget_Comments_Template', 
			'register'
		);	

		$this->loader->add_action( 
			'wp_ajax_nopriv_widget_load_more_posts', 
			'Streamtube_Core_Widget_Posts', 
			'ajax_load_more_posts' 
		);

		$this->loader->add_action( 
			'wp_ajax_widget_load_more_posts', 
			'Streamtube_Core_Widget_Posts', 
			'ajax_load_more_posts' 
		);

		/** Elementor  */
		$this->plugin->elementor = new Streamtube_Core_Elementor();

		$this->loader->add_action(
			'init',
			$this->plugin->elementor,
			'init'
		);

		$this->plugin->shortcode = new Streamtube_Core_ShortCode();

		$this->loader->add_action( 
			'init', 
			$this->plugin->shortcode, 
			'is_logged_in' 
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->shortcode, 
			'is_not_logged_in' 
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->shortcode, 
			'can_upload' 
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->shortcode, 
			'can_not_upload' 
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->shortcode, 
			'user_name' 
		);

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'user_avatar' 
		);	

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'user_grid' 
		);

		$this->loader->add_action(
			'wp_ajax_load_more_users',
			$this->plugin->shortcode, 
			'ajax_load_more_users'
		);

		$this->loader->add_action(
			'wp_ajax_nopriv_load_more_users',
			$this->plugin->shortcode, 
			'ajax_load_more_users'
		);

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'post_grid' 
		);

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'playlist' 
		);

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'player' 
		);

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'button_upload' 
		);

		$this->loader->add_action(
			'init', 
			$this->plugin->shortcode, 
			'term_grid' 
		);		

		$this->plugin->oembed = new Streamtube_Core_oEmbed();

		$this->loader->add_action(
			'init', 
			$this->plugin->oembed, 
			'add_providers' 
		);
	}

	/**
	 * Register all of the hooks related to the ads functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_ads_hooks(){
		$this->include_file( 'third-party/advertising/class-streamtube-core-advertising.php' );

		$this->plugin->advertising = new Streamtube_Core_Advertising();

		if( is_wp_error( $this->plugin->license->is_verified() ) ){
			$this->loader->add_action( 
				'admin_menu', 
				$this->plugin->advertising->admin,
				'admin_menu_unregistered'
			);
		}
		else{

			$this->loader->add_action( 
				'admin_init', 
				$this->plugin->advertising,
				'update_htaccess'
			);

			$this->loader->add_action( 
				'admin_menu', 
				$this->plugin->advertising->admin,
				'admin_menu'
			);
			$this->loader->add_action( 
				'init', 
				$this->plugin->advertising->ad_tag,
				'post_type'
			);

			$this->loader->add_action( 
				'add_meta_boxes', 
				$this->plugin->advertising->ad_tag,
				'add_meta_boxes'
			);

			$this->loader->add_action( 
				'save_post', 
				$this->plugin->advertising->ad_tag,
				'save_ad_content_box',
				10,
				1 
			);

			$this->loader->add_action( 
				'wp_ajax_import_vast', 
				$this->plugin->advertising->ad_tag,
				'ajax_import_vast'
			);

			$this->loader->add_action( 
				'template_redirect', 
				$this->plugin->advertising->ad_tag,
				'template_redirect'
			);		

			$this->loader->add_filter(
				'manage_ad_tag_posts_columns',
				$this->plugin->advertising->ad_tag,
				'admin_post_table',
				10,
				1
			);		

			$this->loader->add_action(
				'manage_ad_tag_posts_custom_column',
				$this->plugin->advertising->ad_tag,
				'admin_post_table_columns',
				10,
				2
			);


			$this->loader->add_action( 
				'init', 
				$this->plugin->advertising->ad_schedule,
				'post_type'
			);		

			$this->loader->add_action( 
				'add_meta_boxes', 
				$this->plugin->advertising->ad_schedule,
				'add_meta_boxes'
			);

			$this->loader->add_action( 
				'save_post', 
				$this->plugin->advertising->ad_schedule,
				'save_ad_tags_box',
				10,
				1
			);

			$this->loader->add_action( 
				'wp_ajax_get_schedule_tax_terms', 
				$this->plugin->advertising->ad_schedule,
				'ajax_get_tax_terms'
			);

			$this->loader->add_action( 
				'save_post', 
				$this->plugin->advertising->ad_schedule,
				'clear_cache',
				100,
				1
			);

			$this->loader->add_action( 
				'template_redirect', 
				$this->plugin->advertising->ad_schedule,
				'load_vmap_template'
			);

			$this->loader->add_action( 
				'wp_ajax_search_ads', 
				$this->plugin->advertising->ad_schedule,
				'ajax_search_ads'
			);

			$this->loader->add_filter(
				'manage_ad_schedule_posts_columns',
				$this->plugin->advertising->ad_schedule,
				'admin_post_table',
				10,
				1
			);		

			$this->loader->add_action(
				'manage_ad_schedule_posts_custom_column',
				$this->plugin->advertising->ad_schedule,
				'admin_post_table_columns',
				10,
				2
			);					

			$this->loader->add_filter(
				'streamtube/player/file/setup',
				$this->plugin->advertising,
				'request_ad',
				100,
				2
			);
		}
	}

	/**
	 * Register all of the hooks related to the post functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_post_hooks(){
		$this->plugin->post = new Streamtube_Core_Post();

		$this->loader->add_action( 
			'init', 
			$this->plugin->post, 
			'cpt_video'
		);		

		$this->loader->add_action( 
			'init', 
			$this->plugin->post, 
			'new_post_statuses'
		);		

		$this->loader->add_action( 
			'streamtube/core/post/update', 
			$this->plugin->post, 
			'update_post_meta'
		);

		$this->loader->add_action( 
			'save_post_video', 
			$this->plugin->post, 
			'sync_post_attachment',
			10,
			2
		);		

		$this->loader->add_action( 
			'wp_ajax_add_post', 
			$this->plugin->post, 
			'ajax_add_post'
		);

		$this->loader->add_action( 
			'wp_ajax_import_embed', 
			$this->plugin->post, 
			'ajax_import_embed'
		);

		$this->loader->add_action( 
			'wp_ajax_add_video', 
			$this->plugin->post, 
			'ajax_add_video'
		);
		
		$this->loader->add_action( 
			'wp_ajax_upload_video', 
			$this->plugin->post, 
			'ajax_upload_video'
		);

		$this->loader->add_action(
			'wp_ajax_upload_video_chunk',
			$this->plugin->post, 
			'ajax_upload_video_chunk'
		);			

		$this->loader->add_action( 
			'wp_ajax_upload_video_chunks', 
			$this->plugin->post, 
			'ajax_upload_video_chunks'
		);		

		$this->loader->add_action( 
			'wp_ajax_update_post', 
			$this->plugin->post, 
			'ajax_update_post'
		);		

		$this->loader->add_action( 
			'wp_ajax_trash_post', 
			$this->plugin->post, 
			'ajax_trash_post'
		);

		$this->loader->add_action( 
			'wp_ajax_approve_post', 
			$this->plugin->post, 
			'ajax_approve_post'
		);

		$this->loader->add_action( 
			'wp_ajax_reject_post', 
			$this->plugin->post, 
			'ajax_reject_post'
		);

		$this->loader->add_action( 
			'wp_ajax_restore_post', 
			$this->plugin->post, 
			'ajax_restore_post'
		);

		$this->loader->add_action( 
			'wp_ajax_search_posts', 
			$this->plugin->post, 
			'ajax_search_posts'
		);

		$this->loader->add_action( 
			'wp_ajax_report_video', 
			$this->plugin->post, 
			'ajax_report_video'
		);

		$this->loader->add_action( 
			'streamtube/core/post/edit/metaboxes', 
			$this->plugin->post, 
			'load_thumbnail_metabox',
			10
		);

		$this->loader->add_action( 
			'streamtube/core/post/edit/metaboxes', 
			$this->plugin->post, 
			'load_taxonomies_metabox',
			50
		);		

		$this->loader->add_action( 
			'template_redirect', 
			$this->plugin->post, 
			'load_edit_template'
		);

		$this->loader->add_action( 
			'wp', 
			$this->plugin->post, 
			'redirect_to_edit_page'
		);

		$this->loader->add_action( 
			'pre_get_posts', 
			$this->plugin->post, 
			'pre_get_posts',
			10,
			1
		);

		$this->loader->add_action( 
			'wp_head', 
			$this->plugin->post, 
			'load_video_schema',
			1
		);

		$this->loader->add_action( 
			'ajax_query_attachments_args', 
			$this->plugin->post, 
			'filter_ajax_query_attachments_args',
			10,
			1
		);

		$this->loader->add_action( 
			'wp_insert_post', 
			$this->plugin->post, 
			'wp_insert_post',
			10,
			3
		);		

		$this->loader->add_action( 
			'wp', 
			$this->plugin->post, 
			'update_last_seen'
		);

		$this->loader->add_action( 
			'before_delete_post', 
			$this->plugin->post, 
			'delete_attached_files',
			10,
			2
		);

		$this->loader->add_action( 
			'delete_attachment', 
			$this->plugin->post, 
			'delete_attached_files',
			10,
			2
		);

		$this->loader->add_action( 
			'template_redirect', 
			$this->plugin->post, 
			'attachment_template_redirect',
			10,
			1
		);	

		$this->loader->add_filter( 
			'wp_video_shortcode', 
			$this->plugin->post, 
			'override_wp_video_shortcode',
			100,
			4
		);

		$this->loader->add_filter( 
			'render_block', 
			$this->plugin->post, 
			'override_wp_video_block',
			100,
			2
		);

		$this->loader->add_filter( 
			'render_block', 
			$this->plugin->post, 
			'override_wp_youtube_block',
			100,
			2
		);
	}

	/**
	 * Register all of the hooks related to the video functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_video_hooks(){
		$this->plugin->video = new Streamtube_Core_Video();

		$this->loader->add_action(
			'post_embed_url',
			$this->plugin->video,
			'filer_embed_url',
			100,
			2
		);			

		$this->loader->add_action(
			'embed_html',
			$this->plugin->video,
			'filter_embed_html',
			100,
			4
		);		

		$this->loader->add_action(
			'streamtube/single/video/control',
			$this->plugin->video,
			'load_button_share',
			100
		);

		$this->loader->add_action(
			'wp_footer',
			$this->plugin->video,
			'load_modal_share'
		);

		$this->loader->add_action(
			'streamtube/single/video/control',
			$this->plugin->video,
			'load_button_report',
			200
		);

		$this->loader->add_action(
			'wp_footer',
			$this->plugin->video,
			'load_modal_report'
		);		

		$this->loader->add_action(
			'streamtube/single/video/meta',
			$this->plugin->video,
			'load_single_post_date'
		);

		$this->loader->add_action(
			'streamtube/single/video/meta',
			$this->plugin->video,
			'load_single_post_views'
		);

		$this->loader->add_action(
			'streamtube/single/video/meta',
			$this->plugin->video,
			'load_single_post_comment_count'
		);

		$this->loader->add_action(
			'streamtube/single/video/meta',
			$this->plugin->video,
			'load_single_post_terms'
		);

		$this->plugin->download_file = new StreamTube_Core_Download_File();

		$this->loader->add_action( 
			'streamtube/single/video/control', 
			$this->plugin->download_file,
			'button_download',
			5
		);

		$this->loader->add_action( 
			'template_redirect', 
			$this->plugin->download_file,
			'process_download'
		);

	}

	/**
	 * Register all of the hooks related to the comment functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_comment_hooks(){
		$this->plugin->comment = new Streamtube_Core_Comment();

		$this->loader->add_action(
			'wp_ajax_nopriv_post_comment',
			$this->plugin->comment, 
			'ajax_post_comment'
		);		

		$this->loader->add_action(
			'wp_ajax_post_comment',
			$this->plugin->comment, 
			'ajax_post_comment'
		);

		$this->loader->add_action(
			'wp_ajax_get_comment',
			$this->plugin->comment, 
			'ajax_get_comment'
		);		

		$this->loader->add_action(
			'wp_ajax_edit_comment',
			$this->plugin->comment, 
			'ajax_edit_comment'
		);		

		$this->loader->add_action(
			'wp_ajax_moderate_comment',
			$this->plugin->comment, 
			'ajax_moderate_comment'
		);

		$this->loader->add_action(
			'wp_ajax_trash_comment',
			$this->plugin->comment, 
			'ajax_trash_comment'
		);

		$this->loader->add_action(
			'wp_ajax_spam_comment',
			$this->plugin->comment, 
			'ajax_spam_comment'
		);		

		$this->loader->add_action(
			'wp_ajax_load_more_comments',
			$this->plugin->comment, 
			'ajax_load_more_comments'
		);

		$this->loader->add_action(
			'wp_ajax_nopriv_load_more_comments',
			$this->plugin->comment, 
			'ajax_load_more_comments'
		);	

		$this->loader->add_action(
			'wp_ajax_load_comments',
			$this->plugin->comment, 
			'ajax_load_comments'
		);

		$this->loader->add_action(
			'wp_ajax_nopriv_load_comments',
			$this->plugin->comment, 
			'ajax_load_comments'
		);		

		$this->loader->add_filter(
			'streamtube/comment/form_args',
			$this->plugin->comment, 
			'filter_comment_form_args'
		);		

		$this->loader->add_filter(
			'comments_template',
			$this->plugin->comment, 
			'load_ajax_comments_template'
		);
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_user_hooks(){

		$this->plugin->user = new Streamtube_Core_User();

		$this->loader->add_action( 
			'get_avatar_data', 
			$this->plugin->user, 
			'get_avatar_data',
			10,
			3 
		);

		$this->loader->add_action( 
			'pre_get_posts', 
			$this->plugin->user, 
			'pre_get_posts' 
		);

		$this->loader->add_action( 
			'register_form', 
			$this->plugin->user, 
			'build_form_registration' 
		);

		$this->loader->add_action( 
			'registration_errors', 
			$this->plugin->user, 
			'verify_registration_role',
			10,
			1
		);		

		$this->loader->add_action( 
			'register_new_user', 
			$this->plugin->user, 
			'save_form_registration',
			10,
			1
		);				

		$this->plugin->user_profile = new Streamtube_Core_User_Profile();

		$this->loader->add_action( 
			'init', 
			$this->plugin->user_profile, 
			'add_endpoints', 
			100
		);

		$this->loader->add_action( 
			'streamtube/core/user/header', 
			$this->plugin->user_profile, 
			'the_header', 
			10 
		);

		$this->loader->add_action( 
			'streamtube/core/user/header', 
			$this->plugin->user_profile, 
			'the_navigation', 20 
		);

		$this->loader->add_action( 
			'streamtube/core/user/main', 
			$this->plugin->user_profile, 
			'the_main' 
		);

		$this->loader->add_action( 
			'template_redirect', 
			$this->plugin->user_profile, 
			'the_index',
			20
		);

		$this->loader->add_action( 
			'streamtube/core/user/profile/about/bio', 
			$this->plugin->user_profile, 
			'format_user_bio_content',
			10,
			1
		);		

		$this->plugin->user_dashboard = new Streamtube_Core_User_Dashboard();

		$this->loader->add_action( 
			'init', 
			$this->plugin->user_dashboard, 
			'add_endpoints'
		);		

		$this->loader->add_action( 
			'template_redirect', 
			$this->plugin->user_dashboard, 
			'the_index',
			15
		);

		$this->loader->add_action( 
			'login_redirect', 
			$this->plugin->user_dashboard, 
			'login_redirect',
			10,
			3
		);
	}

	/**
	 *
	 * Define woocommerce hooks
	 * 
	 * @since 1.0.0
	 */
	private function define_woocommerce_hooks(){

		$this->plugin->woocommerce = new Streamtube_Core_Woocommerce();

		$this->loader->add_action(
			'init',
			$this->plugin->woocommerce,
			'remove_default'
		);

		$this->loader->add_action(
			'wp_ajax_get_cart_total',
			$this->plugin->woocommerce,
			'ajax_get_cart'
		);

		$this->loader->add_action(
			'wp_ajax_nopriv_get_cart_total',
			$this->plugin->woocommerce,
			'ajax_get_cart'
		);		
	}

	/**
	 *
	 * Define rest hooks
	 * 
	 * @since 1.0.0
	 */
	private function define_rest_hooks(){

		$this->plugin->rest_api = array();

		$this->plugin->rest_api['generate_image'] 	= new StreamTube_Core_Generate_Image_Rest_Controller();
		$this->plugin->rest_api['user'] 			= new StreamTube_Core_User_Rest_Controller();

		foreach (  $this->plugin->rest_api as $rest => $object ) {
			$this->loader->add_action( 
				'rest_api_init',
				$object,
				'rest_api_init'
			);
		}
	}

	private function define_googlesitekit_hooks(){
		/**
		 * The class responsible for defining Google Sitekit.
		 */
		$this->include_file( 'third-party/googlesitekit/class-streamtube-core-googlesitekit.php' );

		/**
		 * The class responsible for defining Analytics module of Google Sitekit.
		 */
		$this->include_file( 'third-party/googlesitekit/class-streamtube-core-googlesitekit-analytics.php' );

		/**
		 * The class responsible for defining Tag Manager module of Google Sitekit.
		 */
		$this->include_file( 'third-party/googlesitekit/class-streamtube-core-googlesitekit-tag-manager.php' );

		/**
		 * The class responsible for defining Search Console module of Google Sitekit.
		 */
		$this->include_file( 'third-party/googlesitekit/class-streamtube-core-googlesitekit-search-console.php' );		

		/**
		 * The class responsible for defining sitekit rest API
		 */
		$this->include_file( 'third-party/googlesitekit/class-streamtube-core-rest-googlesitekit-controller.php' );		

		$this->plugin->googlesitekit = new stdClass();

		$this->plugin->googlesitekit->analytics = new Streamtube_Core_GoogleSiteKit_Analytics();

		if( $this->plugin->googlesitekit->analytics->is_connected() ){

			$this->loader->add_action( 
				'streamtube/user/dashboard/before', 
				$this->plugin->googlesitekit->analytics, 
				'dashboard'
			);

			$this->loader->add_action(
				'streamtube_check_pageviews',
				$this->plugin->googlesitekit->analytics,
				'cron_update_post_list_pageviews',
				10
			);

			$this->loader->add_action(
				'streamtube_check_videoviews',
				$this->plugin->googlesitekit->analytics,
				'cron_update_post_list_videoviews',
				10
			);	

			if( get_option( 'sitekit_heartbeat_tick', 'on' ) ){
				$this->loader->add_filter(
					'heartbeat_send',
					$this->plugin->googlesitekit->analytics,
					'heartbeat_tick',
					10,
					2
				);
			}

			$this->loader->add_action(
				'streamtube/single/video/manage/control',
				$this->plugin->googlesitekit->analytics,
				'button_analytics',
				100
			);

			/**
			 * The class responsible for defining analytics rest API
			 */
			$this->include_file( 'third-party/googlesitekit/class-streamtube-core-rest-googlesitekit-analytics-controller.php' );

			$this->plugin->googlesitekit->analytics_rest_api = new StreamTube_Core_GoogleSiteKit_Analytics_Rest_Controller();

			$this->loader->add_action( 
				'rest_api_init',
				$this->plugin->googlesitekit->analytics_rest_api,
				'rest_api_init'
			);
		}

		$this->plugin->googlesitekit->tag_manager = new Streamtube_Core_GoogleSiteKit_Tag_Manager();

		if( $this->plugin->googlesitekit->tag_manager->is_connected() ){

			$this->loader->add_filter(
				'streamtube/player/file/setup',
				$this->plugin->googlesitekit->tag_manager,
				'player_tracker',
				10,
				2
			);

		}

		$this->plugin->googlesitekit->search_console = new Streamtube_Core_GoogleSiteKit_Search_Console();
	}

	/**
	 *
	 * myCred Hooks
	 * 
	 * @since 1.0.9
	 */
	private function define_mycred_hooks(){
		/**
		 * The class responsible for defining myCred functions
		 */
		$this->include_file( 'third-party/mycred/class-streamtube-core-mycred.php' );

		$this->plugin->myCRED = new Streamtube_Core_myCRED();

		if( $this->plugin->myCRED->is_activated() ){
			$this->loader->add_action(
				'mycred_log_row_classes',
				$this->plugin->myCRED,
				'filter_log_row_classes',
				10,
				2
			);

			$this->loader->add_action(
				'mycred_log_username',
				$this->plugin->myCRED,
				'filter_mycred_log_username',
				100,
				3
			);

			$this->loader->add_action(
				'streamtube/user/profile_dropdown/avatar/after',
				$this->plugin->myCRED,
				'show_user_dropdown_profile_balance'
			);

			$this->loader->add_filter(
				'streamtube/core/user/dashboard/menu/items',
				$this->plugin->myCRED,
				'add_dashboard_menu',
				10,
				1
			);			

			$this->loader->add_action(
				'streamtube/core/elementor/widgets_registered',
				$this->plugin->myCRED,
				'widgets_registered',
				10,
				1
			);	

			$this->loader->add_action(
				'wp',
				$this->plugin->myCRED,
				'redirect_buy_points_page'			
			);			

			$this->loader->add_filter(
				'mycred_buycred_checkout_cancel',
				$this->plugin->myCRED,
				'filter_cancel_checkout',
				10,
				1				
			);

			$this->loader->add_filter(
				'streamtube/player/file/setup',
				$this->plugin->myCRED->sell_content,
				'filter_player_setup',
				99999,
				2				
			);			

			$this->loader->add_filter(
				'streamtube/player/file/output',
				$this->plugin->myCRED->sell_content,
				'filter_player',
				100,
				1				
			);

			$this->loader->add_filter(
				'streamtube/player/embed/output',
				$this->plugin->myCRED->sell_content,
				'filter_player',
				100,
				1				
			);			

			$this->loader->add_action(
				'streamtube/core/post/updated',
				$this->plugin->myCRED->sell_content,
				'update_price',
				10,
				1
			);

			$this->loader->add_action(
				'streamtube/core/post/edit/metaboxes',
				$this->plugin->myCRED->sell_content,
				'load_metabox_price',
				20,
				1
			);

			$this->loader->add_action(
				'wp_ajax_nopriv_transfers_points',
				$this->plugin->myCRED->transfers,
				'ajax_transfers_points',
				10
			);
			$this->loader->add_action(
				'wp_ajax_transfers_points',
				$this->plugin->myCRED->transfers,
				'ajax_transfers_points',
				10
			);

			$this->loader->add_action(
				'streamtube/authorbox/avatar/after',
				$this->plugin->myCRED->transfers,
				'button_donate',
				10		
			);

			$this->loader->add_action(
				'streamtube/core/user/navigation/right',
				$this->plugin->myCRED->transfers,
				'button_donate',
				10
			);

			$this->loader->add_action(
				'wp_footer',
				$this->plugin->myCRED->transfers,
				'modal_donate',
				10
			);			

			$this->loader->add_action(
				'mycred_pre_process_cashcred',
				$this->plugin->myCRED->cash_cred,
				'fix_withdrawal_404'
			);

		}
	}

	/**
	 *
	 * Better Messages Hooks
	 * 
	 * @since 1.1.3
	 */
	private function define_better_messages_hooks(){
		$this->include_file( 'third-party/better-messages/class-streamtube-core-better-messages.php' );

		$this->plugin->better_messages = new StreamTube_Core_Better_Messages();

		if( $this->plugin->better_messages->is_activated() ){

			if( is_wp_error( $this->plugin->license->is_verified() ) ){
				$this->loader->add_action( 
					'add_meta_boxes', 
					$this->plugin->better_messages->admin,
					'unregistered_meta_boxes'
				);	
			}else{

				$this->loader->add_action( 
					'add_meta_boxes', 
					$this->plugin->better_messages->admin,
					'add_meta_boxes'
				);

				$this->loader->add_action( 
					'save_post', 
					$this->plugin->better_messages->admin,
					'save_settings',
					10,
					1
				);			

				$this->loader->add_action( 
					'streamtube/core/post/updated',
					$this->plugin->better_messages->admin,
					'save_settings',
					10,
					1
				);

				$this->loader->add_action(
					'wp_ajax_get_recipient_info',
					$this->plugin->better_messages,
					'get_recipient_info'
				);

				$this->loader->add_action(
					'wp_ajax_nopriv_get_recipient_info',
					$this->plugin->better_messages,
					'get_recipient_info'
				);

				$this->loader->add_action(
					'streamtube/avatar_dropdown/after',
					$this->plugin->better_messages,
					'show_unread_threads_badge_on_avatar'
				);			

				$this->loader->add_filter(
					'streamtube/core/user/profile/menu/items',
					$this->plugin->better_messages,
					'add_profile_menu',
					10,
					1
				);			

				$this->loader->add_filter(
					'streamtube/core/user/dashboard/menu/items',
					$this->plugin->better_messages,
					'add_dashboard_menu',
					10,
					1
				);

				$this->loader->add_action(
					'streamtube/core/user/navigation/right',
					$this->plugin->better_messages,
					'button_private_message',
					20
				);

				$this->loader->add_action(
					'streamtube/single/video/author/after',
					$this->plugin->better_messages,
					'button_private_message',
					20
				);

				$this->loader->add_action(
					'streamtube/core/user/card/name/after',
					$this->plugin->better_messages,
					'user_list_button_private_message',
					20
				);

				$this->loader->add_action(
					'wp_footer',
					$this->plugin->better_messages,
					'modal_private_message',
					10
				);	

				$this->loader->add_action(
					'wp',
					$this->plugin->better_messages,
					'goto_inbox',
					10
				);

				$this->loader->add_filter(
					'streamtube_core_get_edit_post_nav_items',
					$this->plugin->better_messages,
					'add_post_nav_item',
					10,
					1
				);
				

				$this->loader->add_filter(
					'body_class',
					$this->plugin->better_messages,
					'filter_body_class',
					10,
					1
				);

				$this->loader->add_filter(
					'comments_template',
					$this->plugin->better_messages,
					'filter_comments_template',
					100,
					1
				);

				$this->loader->add_action(
					'streamtube/post/thumbnail/after',
					$this->plugin->better_messages,
					'add_post_thumbnail_livechat_icon'
				);

				$this->loader->add_action(
					'streamtube/flat_post/item',
					$this->plugin->better_messages,
					'add_post_thumbnail_livechat_icon'
				);

				$this->loader->add_filter(
					'bp_better_messages_can_send_message',
					$this->plugin->better_messages,
					'filter_disable_reply',
					100,
					3
				);					

				$this->loader->add_action( 
					'widgets_init', 
					'Streamtube_Core_Widget_LiveChat', 
					'register'
				);				
			}
		}
	}

	/**
	 *
	 * bbPress Hooks
	 * 
	 * @since 1.1.9
	 */
	private function define_bbpress(){
		$this->include_file( 'third-party/bbpress/class-streamtube-core-bbpress.php' );

		$this->plugin->bbpress = new StreamTube_Core_bbPress();

		if( $this->plugin->bbpress->is_activated() ){

			$this->loader->add_action(
				'init',
				$this->plugin->bbpress,
				'add_forum_thumbnail'
			);
						
			$this->loader->add_action(
				'init',
				$this->plugin->bbpress,
				'redirect_search_page'
			);			
		}
	}

	/**
	 *
	 * Youtube Importer Hooks
	 * 
	 * @since 1.1.9
	 */
	private function define_youtube_importer(){

		$this->include_file( 'third-party/youtube-importer/class-streamtube-core-youtube-importer.php' );

		$this->plugin->yt_importer = new StreamTube_Core_Youtube_Importer();		

		if( is_wp_error( $this->plugin->license->is_verified() ) ){

			$this->loader->add_action( 
				'admin_menu', 
				$this->plugin->yt_importer->admin,
				'unregistered'
			);			

		}else{

			$this->loader->add_action( 
				'wp_ajax_youtube_search', 
				$this->plugin->yt_importer,
				'ajax_search_content'
			);

			$this->loader->add_action( 
				'wp_ajax_youtube_import', 
				$this->plugin->yt_importer,
				'ajax_import_content'
			);

			$this->loader->add_action( 
				'wp_ajax_youtube_bulk_import', 
				$this->plugin->yt_importer,
				'ajax_bulk_import_content'
			);

			$this->loader->add_action( 
				'wp_ajax_youtube_cron_bulk_import', 
				$this->plugin->yt_importer,
				'ajax_run_bulk_import_content'
			);

			$this->loader->add_filter( 
				'template_include', 
				$this->plugin->yt_importer,
				'template_run_bulk_import_content',
				10,
				1
			);

			$this->loader->add_action( 
				'wp_ajax_get_yt_importer_tax_terms', 
				$this->plugin->yt_importer,
				'ajax_get_tax_terms'
			);		

			$this->loader->add_action( 
				'init', 
				$this->plugin->yt_importer->post_type,
				'post_type'
			);

			$this->loader->add_action( 
				'add_meta_boxes', 
				$this->plugin->yt_importer->admin,
				'add_meta_boxes'
			);

			$this->loader->add_action( 
				'save_post', 
				$this->plugin->yt_importer->admin, 
				'save_settings',
				10,
				1 
			);		

			$this->loader->add_filter(
				'manage_youtube_importer_posts_columns',
				$this->plugin->yt_importer->admin,
				'post_table',
				10,
				1
			);

			$this->loader->add_action(
				'manage_youtube_importer_posts_custom_column',
				$this->plugin->yt_importer->admin,
				'post_table_columns',
				10,
				2
			);

			$this->loader->add_action(
				'pre_get_posts',
				$this->plugin->yt_importer->admin,
				'pre_get_posts'
			);			
		}
	}

	private function define_bunnycdn(){
		$this->include_file( 'third-party/bunnycdn/class-streamtube-core-bunnycdn.php' );

		$this->plugin->bunnycdn = new Streamtube_Core_BunnyCDN();

		if( is_wp_error( $this->plugin->license->is_verified() ) ){
			$this->loader->add_action( 
				'admin_menu', 
				$this->plugin->bunnycdn->admin,
				'unregistered'
			);
		}else{

			$this->loader->add_action( 
				'admin_menu', 
				$this->plugin->bunnycdn->admin,
				'registered'
			);				

			$this->loader->add_action(
				'add_attachment',
				$this->plugin->bunnycdn,
				'add_attachment',
				10,
				1
			);

			$this->loader->add_action(
				'attachment_updated',
				$this->plugin->bunnycdn,
				'attachment_updated',
				10,
				1
			);

			$this->loader->add_action(
				'delete_attachment',
				$this->plugin->bunnycdn,
				'delete_attachment',
				10,
				1
			);

			$this->loader->add_action(
				'save_post_video',
				$this->plugin->bunnycdn,
				'save_post_video',
				10,
				1
			);

			$this->loader->add_action(
				'wp_after_insert_post',
				$this->plugin->bunnycdn,
				'fetch_external_video',
				20,
				1
			);

			$this->loader->add_action(
				'streamtube/core/embed/imported',
				$this->plugin->bunnycdn,
				'fetch_external_video_embed',
				20,
				2
			);					

			$this->loader->add_action(
				'wp_get_attachment_url',
				$this->plugin->bunnycdn,
				'filter_wp_get_attachment_url',
				100,
				2
			);

			$this->loader->add_filter(
				'streamtube/player/file/output',
				$this->plugin->bunnycdn,
				'filter_player_output',
				50,
				3
			);	

			$this->loader->add_action(
				'wp_ajax_get_bunnycdn_video_status',
				$this->plugin->bunnycdn,
				'ajax_get_video_status'
			);

			$this->loader->add_action(
				'wp_ajax_bunnycdn_sync',
				$this->plugin->bunnycdn,
				'ajax_sync'
			);

			$this->loader->add_action(
				'wp_ajax_bunnycdn_retry_sync',
				$this->plugin->bunnycdn,
				'ajax_retry_sync'
			);

			$this->loader->add_action(
				'init',
				$this->plugin->bunnycdn,
				'webhook_callback'
			);

			$this->loader->add_action(
				'streamtube/core/bunny/webhook/update',
				$this->plugin->bunnycdn,
				'update_thumbnail_images',
				10,
				2
			);

			$this->loader->add_action(
				'streamtube/core/bunny/webhook/update',
				$this->plugin->bunnycdn,
				'delete_original_file',
				10,
				2
			);			

			$this->loader->add_action(
				'streamtube/core/bunny/webhook/update',
				$this->plugin->bunnycdn,
				'auto_publish_after_success_encoding',
				20,
				2
			);

			$this->loader->add_action(
				'streamtube/core/bunny/webhook/update',
				$this->plugin->bunnycdn,
				'notify_author_after_encoding_failed',
				20,
				2
			);	

			$this->loader->add_filter(
				'streamtube/core/video/thumbnail_url_2',
				$this->plugin->bunnycdn,
				'filter_thumbnail_image_2',
				20,
				2
			);				

			$this->loader->add_action(
				'profile_update',
				$this->plugin->bunnycdn,
				'update_user_collection',
				10,
				3
			);

			$this->loader->add_filter( 
				'manage_media_columns',
				$this->plugin->bunnycdn->admin,
				'media_table'
			);

			$this->loader->add_action( 
				'manage_media_custom_column',
				$this->plugin->bunnycdn->admin,
				'media_table_columns',
				10,
				2
			);					

			$this->loader->add_filter(
				'manage_video_posts_columns',
				$this->plugin->bunnycdn->admin,
				'post_table',
				10,
				1
			);

			$this->loader->add_action(
				'manage_video_posts_custom_column',
				$this->plugin->bunnycdn->admin,
				'post_table_columns',
				10,
				2
			);

			$this->loader->add_action(
				'add_meta_boxes',
				$this->plugin->bunnycdn->admin,
				'add_meta_boxes'
			);	

			$this->loader->add_action(
				'attachment_updated',
				$this->plugin->bunnycdn->admin,
				'video_details_save',
				10,
				1
			);

			$this->loader->add_filter( 
				'bulk_actions-edit-video', 
				$this->plugin->bunnycdn->admin, 
				'add_bulk_actions',
				10,
				2
			);

			$this->loader->add_filter( 
				'bulk_actions-upload', 
				$this->plugin->bunnycdn->admin, 
				'add_bulk_actions',
				10,
				2
			);			

			$this->loader->add_action(
				'handle_bulk_actions-edit-video',
				$this->plugin->bunnycdn->admin,
				'handle_bulk_actions',
				10,
				3
			);

			$this->loader->add_action(
				'handle_bulk_actions-upload',
				$this->plugin->bunnycdn->admin,
				'handle_bulk_actions',
				10,
				3
			);

			$this->loader->add_action(
				'admin_notices',
				$this->plugin->bunnycdn->admin,
				'handle_bulk_admin_notices',
				10
			);

			$this->loader->add_filter(
				'manage_users_columns',
				$this->plugin->bunnycdn->admin,
				'user_table',
				10,
				1
			);

			$this->loader->add_filter(
				'manage_users_custom_column',
				$this->plugin->bunnycdn->admin,
				'user_table_columns',
				10,
				3
			);					

			$this->loader->add_action(
				'wp_ajax_check_videos_progress',
				$this->plugin->bunnycdn->admin,
				'ajax_check_videos_progress',
				10
			);			

			$this->loader->add_action(
				'admin_footer',
				$this->plugin->bunnycdn->admin,
				'interval_check_videos_progress',
				10
			);

			$this->loader->add_action(
				'admin_notices',
				$this->plugin->bunnycdn->admin,
				'notices',
				10
			);	

			$this->loader->add_action(
				'wp_ajax_read_file_log_content',
				$this->plugin->bunnycdn,
				'ajax_read_log_content'
			);	

			$this->loader->add_action(
				'wp_ajax_read_task_log_content',
				$this->plugin->bunnycdn,
				'ajax_read_task_log_content'
			);			
		}
	}

	private function define_pmpro(){

		$this->include_file( 'third-party/pmpro/class-streamtube-core-pmpro.php' );

		$this->plugin->pmpro = new StreamTube_Core_PMPro();

		if( ! $this->plugin->pmpro->is_activated() ){
			return;
		}

		if( is_wp_error( $this->plugin->license->is_verified() ) ){
			return;
		}

		$this->loader->add_action(
			'add_meta_boxes',
			$this->plugin->pmpro->admin,
			'add_meta_boxes',
			10
		);	

		$this->loader->add_action(
			 'wp_enqueue_scripts', 
			 $this->plugin->pmpro, 
			 'enqueue_scripts' 
		);	

		$this->loader->add_filter( 
			'streamtube/core/user/is_verified', 
			$this->plugin->pmpro, 
			'filter_is_user_verified',
			10,
			2
		);

		$this->loader->add_action( 
			'init', 
			$this->plugin->pmpro, 
			'shortcode_membership_levels'
		);

		$this->loader->add_action( 
			'wp_ajax_get_pmpro_invoice_detail', 
			$this->plugin->pmpro, 
			'ajax_get_invoice_detail'
		);

		$this->loader->add_action( 
			'wp', 
			$this->plugin->pmpro, 
			'redirect_default_pages'
		);		

		$this->loader->add_filter( 
			'streamtube/player/file/output', 
			$this->plugin->pmpro, 
			'filter_player_output',
			9999,
			1
		);

		$this->loader->add_filter( 
			'streamtube/player/embed/output', 
			$this->plugin->pmpro, 
			'filter_player_output',
			9999,
			1 
		);

		$this->loader->add_action(
			'streamtube/flat_post/item',
			$this->plugin->pmpro,
			'add_thumbnail_paid_badge'
		);		

		$this->loader->add_action( 
			'streamtube/post/thumbnail/after', 
			$this->plugin->pmpro, 
			'add_thumbnail_paid_badge',
			10,
			1 
		);		

		$this->loader->add_filter( 
			'streamtube/core/user/dashboard/menu/items', 
			$this->plugin->pmpro, 
			'add_dashboard_menu',
			10,
			1
		);	
	}

	/**
	 *
	 * Generator meta tag
	 * 
	 * @since 1.0.8
	 */
	public function generator(){

		printf(
			'<meta name="generator" content="%1$s | %2$s | %3$s">',
			'StreamTube',
			'Video Streaming WordPress Theme',
			'https://1.envato.market/qny3O5'
		);
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get() {
		return $this->plugin;
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Streamtube_Core_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}
<?php
/**
 * Define the Advertising functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.3
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

class Streamtube_Core_Advertising{

    /**
     *
     * Holds the admin object
     * 
     * @var object
     *
     * @since 2.0
     * 
     */
    public $admin;    

    /**
     *
     * Holds the Ad Tag object
     * 
     * @var object
     *
     * @since 2.0
     * 
     */
    public $ad_tag;

    /**
     *
     * Holds the Ad Schedule object
     * 
     * @var object
     *
     * @since 2.0
     * 
     */
    public $ad_schedule;

    /**
     *
     * Class contructor
     *
     * @since 2.0
     * 
     */
    public function __construct(){
        $this->load_dependencies();
    }

    /**
     * Plugin instance
     */
    private function plugin(){
        return streamtube_core()->get();
    }    

    /**
     *
     * Include file
     * 
     * @param  string $file
     *
     * @since 2.0
     * 
     */
    private function include_file( $file ){
        require_once plugin_dir_path( __FILE__ ) . $file;
    }

    /**
     *
     * Load dependencies
     *
     * @since 2.0
     * 
     */
    public function load_dependencies(){

        $this->include_file( 'class-streamtube-core-advertising-admin.php' );

        $this->admin = new Streamtube_Core_Advertising_Admin();

        $this->include_file( 'class-streamtube-core-advertising-ad-tag.php' );

        $this->ad_tag = new Streamtube_Core_Advertising_Ad_Tag();

        $this->include_file( 'class-streamtube-core-advertising-ad-schedule.php' );

        $this->ad_schedule = new Streamtube_Core_Advertising_Ad_Schedule();
    }

    /**
     *
     * Update htaccess file
     * 
     * @since 2.0
     */
    public function update_htaccess(){

        $content = false;

        if( apply_filters( 'streamtube/core/advertising/update_htaccess', true ) === false ){
            return $content;
        }

        if( strpos( $_SERVER['SERVER_SOFTWARE'] , 'nginx' ) !== false ){
            $content = array(
                '<IfModule mod_headers.c>',
                'Header set Access-Control-Allow-Origin "*"',
                'Header set Access-Control-Allow-Credentials true',
                '</IfModule>'
            );
        }

        if( strpos( $_SERVER['SERVER_SOFTWARE'] , 'apache' ) !== false ){
            $content = array(
                'Header set Access-Control-Allow-Origin "*"',
                'Header set Access-Control-Allow-Credentials true'
            );
        }

        if( ! is_multisite() && $content ){

            if( ! function_exists( 'insert_with_markers' ) ){
                require_once( ABSPATH . 'wp-admin/includes/misc.php' );
            }

            $results = insert_with_markers( get_home_path() . '.htaccess', 'Advertising', $content );         
        }
    }

    /**
     *
     * 
     * @param  array  $ad_schedules
     * @return array with a random ad
     *
     * @since 2.0
     * 
     */
    private function pickup_rand_ad( $ad_schedules = array() ){
        $position = array_rand( $ad_schedules, 1 );

        return $ad_schedules[ $position ];
    }

    /**
     *
     * Load Ad to player
     * 
     * @param  string $ad_tag_url
     * @since 2.0
     */
    private function load_ad( $ad_tag_url ){
        wp_enqueue_script( 'ima3sdk' );
        wp_enqueue_script( 'videojs-contrib-ads' );
        wp_enqueue_script( 'videojs-ima' );
        wp_enqueue_style( 'videojs-ima' );

        $settings = array(
            'adTagUrl'                  =>  $ad_tag_url,
            'showCountdown'             =>  true,
            'forceNonLinearFullSlot'    =>  true,
            'locale'                    =>  get_locale(),
            'adLabel'                   =>  esc_html__( 'Advertisement', 'streamtube-core' )
        );

        /**
         *
         * Filter the Ad settings
         *
         * @see https://github.com/googleads/videojs-ima#additional-settings
         * 
         * @since 2.0
         */
        $settings = apply_filters( 'streamtube/core/advertising/request_ad/settings', $settings );
            
       return $settings;
    }

    /**
     *
     * Request Ad and filter player setup params
     * 
     * @param  array $setup
     * @param  string $source
     * @return array $setup
     *
     * @since 2.0
     * 
     */
    public function request_ad( $setup, $source ){

        $shows_ads = apply_filters( 'streamtube/core/advertising/show_ads', true );

        if( function_exists( 'pmpro_hasMembershipLevel' ) &&  $shows_ads === true ){

            global $post;

            if( $post instanceof WP_Post && pmpro_hasMembershipLevel() ){
                return $setup;
            }
        }

        // Check if Ad is disabled
        if( $this->plugin()->post->is_ad_disabled( $setup['mediaid'] ) ){
            return $setup;
        }

        $ad_schedules = $this->ad_schedule->get_active_ad_schedules( $setup['mediaid'] );

        if( ! $ad_schedules ){
            return $setup;
        }

        $ad_schedule_rand = $this->pickup_rand_ad( $ad_schedules );

        return array_merge( $setup, array(
            'advertising'   =>  $this->load_ad( get_permalink( $ad_schedule_rand ) )
        ) );
    }

}
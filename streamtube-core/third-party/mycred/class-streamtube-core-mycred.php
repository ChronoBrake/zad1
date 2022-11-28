<?php
/**
 * Define the myCred functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.1
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

require_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'class-streamtube-core-mycred-base.php';
require_once trailingslashit( plugin_dir_path( __FILE__ ) ) . 'short-functions.php';

class Streamtube_Core_myCRED extends Streamtube_Core_myCRED_Base{

    /**
     *
     * Holds the Sell Content addon
     * 
     * @var object
     *
     * @since 1.1
     * 
     */
    public $sell_content;

    /**
     *
     * Holds the Buy Cred addon
     * 
     * @var object
     *
     * @since 1.1
     * 
     */
    public $buy_cred;

    /**
     *
     * Holds the Casg Cred addon
     * 
     * @var object
     *
     * @since 1.1
     * 
     */
    public $cash_cred;

    /**
     *
     * Holds the Transfers addon
     * 
     * @var object
     *
     * @since 1.1
     * 
     */
    public $transfers;

    /**
     *
     * Holds the default settings
     * 
     * @var array
     *
     * @since 1.1
     * 
     */
    protected $settings = array(
        'donate'                =>  '',
        'donate_min_points'     =>  1,
        'donate_point_type'     =>  '',
        'buy_points_page'       =>  '',
        'sell_video_content'    =>  '',
        'author_driven_pricing' =>  ''
    );

    /**
     *
     * Class contructor
     *
     * @since 1.1
     * 
     */
    public function __construct(){

        $this->load_dependencies();

        $this->settings = $this->get_settings();

        $this->sell_content = new Streamtube_Core_myCRED_Sell_Content( $this->settings );

        $this->buy_cred = new Streamtube_Core_myCRED_Buy_CRED( $this->settings );

        $this->cash_cred = new Streamtube_Core_myCRED_Cash_Cred( $this->settings );

        $this->transfers = new Streamtube_Core_myCRED_Transfers( $this->settings );
    }

    /**
     *
     * Load the required dependencies for this plugin.
     * 
     * @since 1.1
     */
    private function load_dependencies(){

        $this->include_file( 'class-streamtube-core-mycred-sell-content.php' );

        $this->include_file( 'class-streamtube-core-mycred-buy-cred.php' );

        $this->include_file( 'class-streamtube-core-mycred-cash-cred.php' );

        $this->include_file( 'class-streamtube-core-mycred-transfers.php' );
    }

    /**
     *
     * Get settings
     * 
     * @return array
     *
     * @since 1.1
     * 
     */
    public function get_settings( $setting = '', $default = '' ){

        $this->settings = array_merge( $this->settings, array(
            'donate_point_type'  =>  defined( 'MYCRED_DEFAULT_TYPE_KEY' ) ? MYCRED_DEFAULT_TYPE_KEY : ''
        ) );

        $settings = get_option( 'plugin_mycred' );

        if( ! $settings || ! is_array( $settings ) ){
            $settings = array();
        }

        $settings = wp_parse_args( $settings, $this->settings );

        if( $setting ){

            if( array_key_exists( $setting , $settings ) ){
                return $settings[ $setting ];
            }

            return $default;
        }

        return $settings;
    }

    /**
     *
     * Get Buy Points URL
     * 
     * @return string
     *
     * @since 1.0.9
     * 
     */
    public function get_buy_points_page( $permalink = true ){

        $page = '';

        $maybe_page_id = $this->settings['buy_points_page'];

        if( $maybe_page_id && get_post_status( $maybe_page_id ) == 'publish' ){
            if( $permalink ){
                $page = get_permalink( $maybe_page_id );
            }else{
                $page = (int)$maybe_page_id;
            }
        }

        /**
         *
         * @since 1.0.9
         * 
         */
        return apply_filters( 'streamtube/core/mycred/buy_points_page', $page, $maybe_page_id );
    }    

    /**
     *
     * Filter Transaction table row.
     *
     * @since 1.1
     * 
     */
    public function filter_log_row_classes( $classes, $entry ){
        return array_merge( $classes, array( 'bg-white' ) );
    }

    /**
     *
     * Filter log username
     * 
     * @param  string $content 
     * @param  int $user_id
     * @param  object $log_entry
     * @return string $content 
     *
     * @since 1.1
     * 
     */
    public function filter_mycred_log_username( $content, $user_id, $log_entry ){

        if( is_admin() ){
            return $content;
        }

        return sprintf(
            '<a class="text-body fw-bold" href="%s" target="_blank"><span>%s</span></a>',
            esc_url( get_author_posts_url( $user_id ) ),
            get_user_by( 'ID', $user_id )->display_name
        );
    }

    /**
     *
     * Show user dropdown balance
     * 
     * @since 1.1
     * 
     */
    public function show_user_dropdown_profile_balance(){
        $this->load_template( 'user-balance.php', true );
    }

    /**
     *
     * Add dashboard Points menu
     * 
     * @param array
     *
     * @since 1.1
     */
    public function add_dashboard_menu( $items ){
        $items['transactions'] = array(
            'title'     =>  esc_html__( 'Transactions', 'streamtube-core' ),
            'icon'      =>  'icon-arrows-cw',
            'callback'  =>  function(){
                $this->load_template( 'table-transactions/index.php' );
            },
            'parent'    =>  'dashboard',
            'cap'       =>  'read',
            'priority'  =>  40
        );

        if( $this->cash_cred->is_activated() ){
            $items[ $this->cash_cred::ENDPOINT ] = array(
                'title'     =>  esc_html__( 'Withdrawal', 'streamtube-core' ),
                'icon'      =>  'icon-money',
                'callback'  =>  function(){
                    $this->load_template( 'withdrawal.php' );
                },
                'parent'    =>  'dashboard',
                'cap'       =>  'read',
                'priority'  =>  50
            );            
        }

        return $items;
    }

    /**
     *
     * Elementor Buy Points Form Widget Register
     *
     * @since 1.1
     */
    public function widgets_registered( $widget_manager ){
        $this->include_file( 'class-streamtube-core-mycred-elementor-buy-points.php' );
    }

    /**
     *
     * Filter the Cancel Checkout button
     * Redirect to current video post if the submit form has been made from single video post
     * 
     * @param  string $content
     * @return string $content
     *
     * @since 1.0.9
     * 
     */
    public function filter_cancel_checkout( $content ){
        if( is_singular( 'video' ) ){
            $content = sprintf(
                '<div class="cancel"><a href="%s">%s</a></div>',
                add_query_arg( array( 'action' => 'cancel_purchase' ), get_permalink() ),
                esc_html__( 'Cancel Purchase', 'streamtube-core' )
            );
        }

        return $content;
    }       

    /**
     *
     * Redirect unlogged in users to login page when visiting Buy Points page
     * 
     * @since 1.0.9
     */
    public function redirect_buy_points_page(){
        $buy_points_page = $this->get_buy_points_page( false );

        if( ! is_user_logged_in() && $buy_points_page && is_page( $buy_points_page ) ){
            wp_redirect( wp_login_url( get_permalink( $buy_points_page ) ) );
            exit;
        }
    }     

}
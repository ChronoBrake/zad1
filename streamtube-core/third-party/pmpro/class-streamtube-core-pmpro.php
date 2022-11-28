<?php
/**
 * Define the PMPro functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      2.2
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      2.2
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class StreamTube_Core_PMPro{

    /**
     * Holds the page slug
     *
     * @since 2.2
     */
    const PAGE_SLUG = 'membership';

    /**
     *
     * Holds the admin
     * 
     * @var object
     *
     * @since 2.2
     * 
     */
    public $admin;

    public function __construct(){

        $this->load_dependencies();

        $this->admin = new StreamTube_Core_PMPro_Admin();
    }

    /**
     *
     * Include file
     * 
     * @param  string $file
     *
     * @since 2.2
     * 
     */
    private function include_file( $file ){
        require_once plugin_dir_path( __FILE__ ) . $file;
    }

    /**
     *
     * Load dependencies
     *
     * @since 2.2
     * 
     */
    private function load_dependencies(){
        $this->include_file( 'class-streamtube-core-pmpro-admin.php' );        
    }        

    /**
     *
     * Get settings
     * 
     * @return array
     *
     * @since 2.2
     * 
     */
    public function get_settings(){
        return wp_parse_args( get_option( 'pmpro_settings', array() ), array(
            'paid_icon'    =>  'icon-lock',
            'paid_label'   =>  esc_html__( 'Premium', 'streamtube-core' )
        ) );
    }

    /**
     *
     * Check if plugin is activated
     * 
     * @return boolean
     *
     * @since 2.2
     * 
     */
    public function is_activated(){
        return function_exists( 'pmpro_activation' ) ? true : false;
    }

    /**
     *
     * Filter is verified
     *
     * @since 2.2
     * 
     */
    public function filter_is_user_verified( $is_verified, $user_id ){
        if( pmpro_getMembershipLevelsForUser( $user_id ) ){
            $is_verified = true;
        }

        return $is_verified;
    }

    /**
     * @since 2.2
     */
    public function enqueue_scripts() {
        wp_enqueue_script(
            'streamtube-ppmpro-scripts', 
            plugin_dir_url( __FILE__ ) . 'public/scripts.js', 
            array(), 
            filemtime( trailingslashit( plugin_dir_path( __FILE__ ) ) . 'public/scripts.js' ),
            true
        );
    }    

    /**
     *
     * The [subscription_levels] shortcode
     * 
     * @param  array  $args
     * @param  string $content
     * @return string
     *
     * @since 2.2
     * 
     */
    public function _shortcode_membership_levels( $args = array(), $content = '' ){

        define( 'IS_MEMBERSHIP_LEVELS', true );

        $output = '';

        $args = wp_parse_args( $args, array(
            'heading'           =>  '',
            'heading_tag'       =>  'h2',
            'plan_description'  =>  'on',
            'select_button'     =>  'primary',
            'renew_button'      =>  'primary',
            'your_level_button' =>  'success',
            'button_size'       =>  'md',
            'shadow'            =>  'sm',
            'col_xxl'           =>  3,
            'col_xl'            =>  3,
            'col_lg'            =>  2,
            'col_md'            =>  2,
            'col_sm'            =>  1,
            'col'               =>  1,
            'classes'           =>  array( 'row' ),
            'mb'                =>  4
        ) );

        $args['classes'] = array_merge( $args['classes'], array(
            'row-cols-' .       $args['col'],
            'row-cols-sm-' .    $args['col_sm'],
            'row-cols-md-' .    $args['col_md'],
            'row-cols-lg-' .    $args['col_lg'],
            'row-cols-xl-' .    $args['col_xl'],
            'row-cols-xxl-' .   $args['col_xxl']
        ) );

        ob_start();

        load_template( plugin_dir_path( __FILE__ ) . 'public/shortcodes/levels.php', true, $args );

        $output = ob_get_clean();

        return $output;

    }

    /**
     *
     * The [membership_levels] shortcode
     * 
     * @param  array  $args
     * @param  string $content
     * @return string
     *
     * @since 2.2
     * 
     */
    public function shortcode_membership_levels(){
        add_shortcode( 'membership_levels', array( $this , '_shortcode_membership_levels' ) );
    }

    /**
     *
     * Get shortcode account content, used in Dashboard page only.
     *
     * @since 2.2
     * 
     * @return string
     */
    public function get_shortcode_account_content(){

        $search = array(
            'pmpro_table',
            add_query_arg( 
                array( 'invoice' => '' ), 
                get_permalink( get_option( 'pmpro_invoice_page_id' ) ) 
            )
        );

        $replaceWidth = array(
            'pmpro_table table table-hover mt-3',
            ''
        );

        $output = pmpro_shortcode_account( array(
            'sections'  =>  'membership'
        ) );

        $output = str_replace( $search, $replaceWidth, $output );

        /**
         *
         * @since 2.2
         * 
         */
        return apply_filters( 'streamtube/core/pmpro_account_content', $output );
    }

    /**
     *
     * Get invoice content
     * 
     * @return string
     *
     * @since 2.2
     * 
     */
    public function get_invoices_content(){
        require_once( PMPRO_DIR . '/preheaders/invoice.php' );

        ob_start();

        get_template_part( 'paid-memberships-pro/pages/invoice' );

        $output = ob_get_clean();

        $search = array(
            'pmpro_table',
            get_permalink( get_option( 'pmpro_invoice_page_id' ) ) 
        );

        $replaceWidth = array(
            'pmpro_table table table-hover mt-3',
            ''
        );        

        $output = str_replace( $search, $replaceWidth, $output );

        return $output;
    }

    /**
     *
     * Get invoice content
     * 
     * @return string
     *
     * @since 2.2
     * 
     */
    public function get_billing_content(){
        require_once( PMPRO_DIR . '/preheaders/billing.php' );

        ob_start();

        get_template_part( 'paid-memberships-pro/pages/billing' );

        $output = ob_get_clean();

        $search = array(
            'pmpro_table',
            get_permalink( get_option( 'pmpro_invoice_page_id' ) ) 
        );

        $replaceWidth = array(
            'pmpro_table table table-hover mt-3',
            ''
        );        

        $output = str_replace( $search, $replaceWidth, $output );

        return $output;
    }    

    public function redirect_default_pages(){

        $User_Dashboard = new Streamtube_Core_User_Dashboard();

        $is_logged_in = is_user_logged_in();

        $redirect_url = wp_login_url();

        if( $is_logged_in ){
            $redirect_url = trailingslashit( $User_Dashboard->get_endpoint( get_current_user_id(), self::PAGE_SLUG ) );
        }

        // Set account page
        $account_page = get_option( 'pmpro_account_page_id' );

        if( $account_page && is_page( $account_page ) ){
            wp_redirect( $redirect_url  );
        }

        // Set billing page
        $billind_page = get_option( 'pmpro_billing_page_id' );

        if( $billind_page && is_page( $billind_page ) ){
            wp_redirect( $redirect_url . 'billing'  );
        }

        // Set invoices page
        $invoice_page = get_option( 'pmpro_invoice_page_id' );

        if( $invoice_page && is_page( $invoice_page ) ){
            wp_redirect( $redirect_url . 'invoices'  );
        }        
    }

    /**
     *
     * Filter player output
     * 
     * @param  string $player
     * @return string
     *
     * @since 2.2
     * 
     */
    public function filter_player_output( $player ){

        global $post, $streamtube;

        if( ! $post instanceof WP_Post ){
            return $player;
        }

        $view_trailer   = false;

        $trailer_url    = '';

        if( $streamtube->get()->post->get_video_trailer( $post->ID ) ){
            $trailer_url = add_query_arg( array( 'view_trailer' => '1', 'autoplay' => '1' ) );
        }        

        if( isset( $_GET['view_trailer'] ) && ! empty( $trailer_url ) ){
            $view_trailer = true;
        }

        if( ! function_exists( 'pmpro_membership_content_filter' ) ){
            return $player;
        }

        // Return player if current logged in user is moderator
        if( Streamtube_Core_Permission::moderate_posts() || $view_trailer ){
            /**
             * Show full content since we have protected video content only.
             */
            add_filter( 'pmpro_membership_content_filter', function( $return, $content, $hasaccess ){
                return $content;
            }, 9999, 3 );
                        
            return $player;
        }

        // Return player if current logged in owner
        if( $post->post_author == get_current_user_id() ){
            return $player;
        }

        if( ! pmpro_has_membership_access( $post->ID, get_current_user_id() ) ){

            $player = '<div class="require-membership">';

                $player .= '<div class="top-50 start-50 translate-middle position-absolute">';

                    $player .= pmpro_membership_content_filter( $player );

                $player .= '</div>';

                if( is_embed() ){
                    ob_start();
                    ?>
                    <script type="text/javascript">
                        let btn = document.getElementsByClassName("btn");
                        for (let i = 0; i < btn.length; i++) {
                            btn[i].addEventListener("click", function () {
                                window.open( this.getAttribute( 'href' ), '_blank' );
                            });
                        }
                    </script>
                    <?php
                    $player .= ob_get_clean();
                }

            $player .= '</div>';

            if( has_post_thumbnail( $post->ID ) ){

                $thumbnail_url = wp_get_attachment_url( get_post_thumbnail_id( $post->ID ) );

                global $streamtube;

                if( "" != $thumbnail_url2 = $streamtube->get()->post->get_thumbnail_image_url_2( $post->ID  ) ){
                    $thumbnail_url = $thumbnail_url2;
                }

                $player .= sprintf(
                    '<div class="player-poster bg-cover" style="background-image:url(%s)"></div>',
                    $thumbnail_url
                );
            }

            /**
             * Show full content since we have protected video content only.
             */
            add_filter( 'pmpro_membership_content_filter', function( $return, $content, $hasaccess ){
                return $content;
            }, 9999, 3 );

            $player = str_replace( '!!trailer_url!!', $trailer_url, $player );
        }

        return $player;
    }

    /**
     *
     * Addd Premium badge to thumbnail image
     *
     * @since 2.2
     * 
     */
    public function add_thumbnail_paid_badge(){
        global $wpdb, $post;

        $results = $wpdb->query(
            $wpdb->prepare(
                "SELECT * FROM {$wpdb->prefix}pmpro_memberships_pages WHERE page_id = %s",
                $post->ID
            )
        );

        if( ! $results ){
            return;
        }

        return load_template( plugin_dir_path( __FILE__ ) . 'public/paid-badge.php', false, $this->get_settings() );
    }

    /**
     *
     * Add dashboard menu
     *
     * @since 2.2
     * ]
     */
    public function add_dashboard_menu( $items ){

        $items[ self::PAGE_SLUG ] = array(
            'title'     =>  esc_html__( 'Membership', 'streamtube-core' ),
            'desc'      =>  esc_html__( 'Your membership', 'streamtube-core' ),
            'icon'      =>  'icon-credit-card',
            'callback'  =>  function(){
                load_template( plugin_dir_path( __FILE__ ) . 'public/dashboard/membership.php', true );
            },
            'parent'    =>  'dashboard',
            'cap'       =>  'read',
            'priority'  =>  5,
            'submenu'   =>  array(
                'subscription'  =>  array(
                    'title'     =>  esc_html__( 'Memberships', 'streamtube-core' ),
                    'icon'      =>  'icon-user-o',
                    'callback'  =>  function(){
                        load_template( plugin_dir_path( __FILE__ ) . 'public/dashboard/subscription.php' );
                    },
                    'priority'  =>  10
                ),
                'billing'    =>  array(
                    'title'     =>  esc_html__( 'Billing', 'streamtube-core' ),
                    'icon'      =>  'icon-money',
                    'callback'  =>  function(){
                        load_template( plugin_dir_path( __FILE__ ) . 'public/dashboard/billing.php' );
                    },
                    'priority'  =>  20
                ),
                'invoices'    =>  array(
                    'title'     =>  esc_html__( 'Invoices', 'streamtube-core' ),
                    'icon'      =>  'icon-doc-text',
                    'callback'  =>  function(){
                        load_template( plugin_dir_path( __FILE__ ) . 'public/dashboard/invoices.php' );
                    },
                    'priority'  =>  30
                )
            ),            
        );

        return $items;
    }

    /**
     *
     * Add dashboard menu
     *
     * @since 2.2
     * ]
     */
    public function add_profile_menu( $items ){
        $items[self::PAGE_SLUG]  = array(
            'title'         =>  esc_html__( 'Membership', 'streamtube-core' ),
            'icon'          =>  'icon-credit-card',
            'url'           =>  trailingslashit( get_author_posts_url( get_current_user_id() ) ) . 'dashboard/' . self::PAGE_SLUG,
            'priority'      =>  50,
            'private'       =>  true
        );

        return $items;
    }    

    /**
     *
     * Add Require Membership levels widget
     * 
     */
    public function add_membership_levels_widget(){

        $can =  current_user_can( 'administrator' );

        if( ! function_exists( 'pmpro_page_meta' ) ){
            return;
        }

        if( apply_filters( 'streamtube/core/pmp/post/edit/membership', $can ) == true ){
            load_template( trailingslashit( plugin_dir_path( __FILE__ ) ) . 'public/post/edit-membership-levels.php' );
        }
    }
}
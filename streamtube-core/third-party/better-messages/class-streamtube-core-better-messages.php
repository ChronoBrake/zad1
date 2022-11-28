<?php
/**
 * Define the Better Messages functionality
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

class StreamTube_Core_Better_Messages{

    public $admin;

    const INBOX_SLUG = 'inbox';

    /**
     * @since 2.1.7
     */
    public function __construct(){
        $this->load_dependencies();

        $this->admin = new StreamTube_Core_Better_Messages_Admin();
    }

    /**
     *
     * Include file
     * 
     * @param  string $file
     *
     * @since 2.1.7
     * 
     */
    private function include_file( $file ){
        require_once plugin_dir_path( __FILE__ ) . $file;
    }    

    /**
     *
     * Load dependencies
     *
     * @since 2.1.7
     * 
     */
    private function load_dependencies(){
        $this->include_file( 'class-streamtube-core-better-messages-admin.php' );     
    }

    /**
     *
     * Check if plugin is activated
     * 
     * @return boolean
     *
     * @since 1.1
     * 
     */
    public function is_activated(){
        return class_exists( 'BP_Better_Messages' );
    }

    /**
     *
     * Get settings
     * 
     * @return array
     *
     * @since 1.1.5
     * 
     */
    public function get_settings(){

        $_default_settings = array(
            'private_message'               =>  'on',
            'enable_livechat_label'         =>  'on',
            'livechat_label_text'           =>  esc_html__( 'Live Chat', 'streamtube-core' ),
            'allow_author_create_livechat'  =>  'on'
        );

        $settings = array(
            'menu_text'         =>  esc_html__( 'Inbox', 'streamtube-core' ),
            'menu_desc'         =>  esc_html__( 'Inbox', 'streamtube-core' ),
            'menu_icon'         =>  'icon-mail',
            'button_id'         =>  'btn-private-message',
            'button_icon'       =>  'icon-mail',
            'button_text'       =>  esc_html__( 'Private Message', 'streamtube-core' ),
            'button_type'       =>  'secondary',
            'button_classes'    =>  array( 'btn', 'px-2', 'shadow-none', 'd-flex', 'align-items-center', 'btn-sm' ),
            'modal_id'          =>  'modal-private-message',
            'modal_title'       =>  esc_html__( 'Private Message', 'streamtube-core' ),
            'recipient_id'      =>  ''
        );

        $settings['button_classes'][] = 'btn-' . sanitize_html_class( $settings['button_type'] );

        $settings = array_merge( $settings, get_option( 'better_messages', $_default_settings ) );

        foreach ( $_default_settings as $key => $value ) {
            if( ! array_key_exists( $key, $settings ) ){
                $settings[$key] = $_default_settings[ $key ];
            }
        }

        /**
         *
         * Filter settings
         * 
         * @since 1.1.5
         */
        $settings = apply_filters( 'streamtube/core/better_messages/settings', $settings );

        return (object)$settings;
    }

    /**
     *
     * Get plugin settings
     * 
     * @param  string $setting
     * @return BP_Better_Messages->settings();
     *
     * @since 1.1.5
     * 
     */
    public function get_bp_settings( $setting = '' ){
        return BP_Better_Messages()->settings[ $setting ];
    }

    /**
     *
     * Check if post livechat enabled
     * 
     * @param  int  $post_id
     * @return boolean
     *
     * @since 2.1.7
     * 
     */
    public function is_post_livechat_enabled( $post_id ){

        $settings = $this->admin->get_settings( $post_id );

        return $settings['enable'] && $this->is_activated() ? true : false;
    }

    /**
     *
     * Check if reply is disabled
     * 
     * @param  int  $post_id
     * @return boolean
     *
     * @since 2.1.7
     * 
     */
    public function is_reply_disabled( $post_id ){
        $settings = $this->admin->get_settings( $post_id );

        return $settings['disable_reply'] ? true : false;        
    }

    /**
     *
     * Get given user Inbox url
     * 
     * @param  integer $user_id
     * @return false or URL
     *
     * @since 1.1.5
     * 
     */
    public function get_inbox_url( $user_id = 0 ){
        if( ! $user_id && is_user_logged_in() ){
            $user_id = get_current_user_id();
        }

        if( ! $user_id ){
            return false;
        }

        return streamtube_core_get_user_dashboard_url( $user_id, self::INBOX_SLUG );
    }

    /**
     *
     * Check if current request page is inbox
     * 
     * @return boolean
     *
     * @sine 1.1.5
     * 
     */
    public function is_inbox(){

        if( ! is_user_logged_in() ){
            return false;
        }

        if( strpos( $_SERVER['REQUEST_URI'], '/dashboard/inbox' ) == false ){
            return false;
        }

        return true;
    }

    /**
     *
     * do AJAX get recipient display name
     * 
     * @since 1.1.5
     */
    public function get_recipient_info(){

        check_ajax_referer( '_wpnonce' );

        if( ! isset( $_GET['recipient_id'] ) ){
            wp_send_json_error( new WP_Error(
                'recipient_id_not_found',
                esc_html__( 'Recipient ID was not found', 'streamtube-core' )
            ) );
        }

        $userdata = get_user_by( 'ID', $_GET['recipient_id'] );

        if( ! $userdata ){
            wp_send_json_error( new WP_Error(
                'recipient_not_found',
                esc_html__( 'Recipient was not found', 'streamtube-core' )
            ) );            
        }

        wp_send_json_success( array(
            'id'                =>  $userdata->ID,
            'display_name'      =>  $userdata->display_name,
            'avatar'            =>  streamtube_core_get_user_avatar( array(
                'user_id'       =>  $userdata->ID,
                'name'          =>  true,
                'name_class'    =>  'm-0',
                'wrap_size'     =>  'xl',
                'before'        =>  '<div class="d-flex flex-column justify-content-center"><div class="mx-auto text-center">',
                'after'         =>  '</div></div>',
                'echo'          =>  false
            ) )
        ) ); 
    }

    /**
     *
     * Get total unread threads of given user ID
     * 
     * @return int $user_id
     *
     * @since 1.1.5
     * 
     */
    public function get_unread_threads( $user_id = 0 ){

        if( ! $user_id && is_user_logged_in() ){
            $user_id = get_current_user_id();
        }

        if( ! $user_id ){
            return 0;
        }

        if( ! is_callable( array( 'BP_Messages_Thread', 'get_total_threads_for_user' ) ) ){
            return 0;
        }

        return BP_Messages_Thread::get_total_threads_for_user( $user_id, 'inbox', 'unread' );
    }

    /**
     *
     * The unread threads badge
     *
     * @since 1.1.5
     * 
     */
    public function get_unread_threads_badge(){

        $badge = '';

        $unread_threads = $this->get_unread_threads();

        if( $unread_threads ){
            $badge = sprintf(
                '<span class="badge bg-danger">%s</span>',
                number_format_i18n( $unread_threads )
            );
        }

        /**
         *
         * @since 1.1.5
         * 
         */
        return apply_filters( 'streamtube/core/better_messages/unread_threads_badge', $badge, $unread_threads );

    }

    /**
     *
     * Show the unread threads on current logged in user avatar
     * 
     * @return output the badge
     *
     * @since 1.1.7
     * 
     */
    public function show_unread_threads_badge_on_avatar(){
        printf(
            '<div class="position-absolute unread-threads">%s</div>',
            $this->get_unread_threads_badge()
        );
    }    

    /**
     *
     * Add Messages menu item
     * 
     * @param array $items
     *
     * @since 1.1.5
     */
    public function add_profile_menu( $items ){

        $settings = $this->get_settings();

        if( ! $settings->private_message ){
            return $items; 
        }

        $items[ self::INBOX_SLUG ]  = array(
            'title'         =>  $this->get_settings()->menu_text,
            'badge'         =>  $this->get_unread_threads_badge(),
            'desc'          =>  $this->get_settings()->menu_desc,
            'icon'          =>  $this->get_settings()->menu_icon,
            'url'           =>  $this->get_inbox_url(),
            'priority'      =>  120,
            'private'       =>  true
        );
        return $items;
    }

    /**
     *
     * Add Messages menu item
     * 
     * @param array $items
     *
     * @since 1.1.5
     */
    public function add_dashboard_menu( $items ){

        $settings = $this->get_settings();

        if( ! $settings->private_message ){
            return $items; 
        }        

        $items[ self::INBOX_SLUG ] = array(
            'title'     =>  $this->get_settings()->menu_text,
            'badge'     =>  $this->get_unread_threads_badge(),
            'desc'      =>  $this->get_settings()->menu_desc,
            'icon'      =>  $this->get_settings()->menu_icon,
            'callback'  =>  function(){
                load_template( 
                    untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/public/inbox.php', 
                    false
                );
            },
            'parent'    =>  'dashboard',
            'cap'       =>  'read',
            'priority'  =>  60
        );

        return $items;
    }

    /**
     *
     * Load button private message
     * 
     * @return load_template()
     *
     * @since 1.1.5
     * 
     */
    public function button_private_message( $recipient_id = 0 ){

        $settings = $this->get_settings();

        if( ! $settings->private_message ){
            return;
        }

        if( is_author() ){

            // Do not show the button if current page is current logged in user page
            if( is_user_logged_in() && get_queried_object_id() == get_current_user_id() ){
                return;
            }

            $settings->recipient_id = get_queried_object_id();
        }

        if( is_singular( 'video' ) ){
            global $post;

            // Do not show the button if current logged in user is post onwer.
            if( is_user_logged_in() && $post->post_author == get_current_user_id() ){
                return;
            }            

            $settings->recipient_id = $post->post_author;
        }

        if( ! $settings->recipient_id && $recipient_id ){
            $settings->recipient_id = $recipient_id;
        }

        load_template( 
            untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/public/button-private-message.php', 
            false,
            $settings
        );
    }

    public function user_list_button_private_message( $args ){
        return $this->button_private_message( $args->ID );
    }

    /**
     *
     * Load modal private message
     * 
     * @return load_template()
     *
     * @since 1.1.5
     * 
     */
    public function modal_private_message(){

        $settings = $this->get_settings();

        if( ! $settings->private_message ){
            return;
        }        

        if( did_action( 'streamtube/core/better_messages/button_private_message/after' ) ){
            load_template( 
                untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/public/modal-private-message.php', 
                true,
                $settings
            );
        }
    }

    /**
     *
     * Navigate to inbox page if thread_id found
     * 
     * @since 1.1.5
     */
    public function goto_inbox(){
        if( isset( $_GET['thread_id'] ) && ! $this->is_inbox() && ! $this->get_bp_settings( 'chatPage' ) ){

            wp_redirect( add_query_arg( array(
                'thread_id' =>  $_GET['thread_id']
            ), $this->get_inbox_url() ) );

            exit;

        }
    }

    /**
     *
     * Get the chatroom output
     * 
     * @param  int $post_id rooom ID
     * @return string
     *
     * @since 2.1.7
     * 
     */
    public function get_chat_room_output( $post_id, $echo = false ){
        $output = do_shortcode( sprintf(
            '[bp_better_messages_chat_room id="%s"]',
            $post_id
        ) );

        if( $output ){
            $find       = 'class="button button-primary"';
            $replace    = 'class="button button-primary btn btn-sm btn-danger"';
            $output     = str_replace( $find, $replace, $output );
        }

        /**
         *
         * Filter the chatroom output
         *
         * @param string $output
         * @param int $post_id
         *
         * @since 2.1.7
         * 
         */
        $output = apply_filters( 'streamtube/core/better_messages/chatroom', $output, $post_id );

        if( $echo ){
            echo $output;
        }else{
            return $output;
        }
    }

    /**
     *
     * Add Live Chat to post nav item from user dashboard
     * 
     * @param array $items
     *
     * @since 2.1.7
     * 
     */
    public function add_post_nav_item( $items ){

        if( ! Streamtube_Core_Permission::moderate_posts() && ! $this->get_settings()->allow_author_create_livechat ){
            return $items;
        }        

        if( ! $this->admin->can_create_live_chat() ){
            return $items;
        }

        $items['livechat']   = array(
            'title'         =>  esc_html__( 'Live Chat', 'streamtube-core' ),
            'icon'          =>  'icon-chat',
            'template'      =>  plugin_dir_path( __FILE__ ) . 'public/live-chat-settings.php',
            'priority'      =>  30
        );  
        return $items;
    }

    /**
     *
     * Filter body classes
     * 
     * @param  array $classes
     * @return array
     *
     * @since 2.1.7
     * 
     */
    public function filter_body_class( $classes ){

        global $post;

        if( ! $post instanceof WP_Post ){
            return $classes;
        }

        if( $this->is_post_livechat_enabled( $post->ID ) ){
            $classes[] = 'live-chat-template';

            if( comments_open() ){
                $classes[] = 'comments-template';
            }
        }

        return $classes;
    }

    /**
     *
     * Filter the comment template file if bp_show_live_chat option found
     * 
     * @param  string $file
     * @return string Live Chat box template
     *
     * @since 2.1.7
     * 
     */
    public function filter_comments_template( $file ){

        global $post;

        if( $this->is_post_livechat_enabled( $post->ID ) ){
            $file = plugin_dir_path( __FILE__ ) . 'public/comments-livechat.php';
        }

        return $file;
    }

    /**
     *
     * Add livechat icon on the post thumbnail
     *
     * @since 2.1.7
     * 
     */
    public function add_post_thumbnail_livechat_icon(){
        global $post;

        $settings = $this->get_settings();

        if( ! $settings->enable_livechat_label ){
            return;
        }

        if( $post instanceof WP_Post && $this->is_reply_disabled( $post->ID ) ){
            return;
        }

        if( $post instanceof WP_Post && $this->is_post_livechat_enabled( $post->ID ) ){
            ?>
            <div class="livechat-icon badge">
                <span class="dot"></span>
                <?php if( $settings->livechat_label_text ){
                    printf(
                        '<span class="text">%s</span>',
                        esc_html( $settings->livechat_label_text )
                    );
                }?>
            </div>
            <?php
        } 
    }

    /**
     *
     * Filter disable reply
     *
     * @since 2.1.7
     * 
     */
    public function filter_disable_reply( $allowed, $user_id, $thread_id ){

        global $post;

        if( ! $post instanceof WP_Post ){
            return $allowed;
        }

        if( $this->is_reply_disabled( $post->ID ) ){
            global $bp_better_messages_restrict_send_message;
            $bp_better_messages_restrict_send_message['disable_bulk_replies'] = esc_html__( 'Replies are disabled' , 'streamtube-core');            
            $allowed = false;
        }

        return $allowed;
    }
}
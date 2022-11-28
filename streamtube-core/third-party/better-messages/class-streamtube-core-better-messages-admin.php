<?php
/**
 * Define the Better Messages Admin functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      2.1.7
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      2.1.7
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class StreamTube_Core_Better_Messages_Admin{

    /**
     *
     * Get roles
     * 
     * @return array
     *
     * @since 2.1.7
     * 
     */
    public function _get_roles(){
        global $wp_roles;
        return array_keys( $wp_roles->roles ); 
    }

    /**
     *
     * Check if current user can create live chat
     * 
     * @return boolean
     *
     * @since 2.1.7
     * 
     */
    public function can_create_live_chat(){

        $can = Streamtube_Core_Permission::can_upload();

        /** 
         *
         * Filter the permissin
         *
         * @since 2.1.7
         * 
         */
        return apply_filters( 'streamtube/core/better_messages/can_create_live_chat', $can );
    }     

    /**
     *
     * @see add_meta_box()
     *
     * @since 2.1.7
     * 
     */
    public function add_meta_boxes(){
        add_meta_box( 
            'better-messages-settings', 
            esc_html__( 'Live Chat Settings', 'streamtube-core' ), 
            array( $this , 'settings_template' ), 
            'video', 
            'advanced', 
            'default'
        );
    }

    /**
     *
     * @see add_meta_box()
     *
     * @since 2.1.7
     * 
     */
    public function unregistered_meta_boxes(){
        add_meta_box( 
            'unregistered-better-messages-settings', 
            esc_html__( 'Live Chat Settings', 'streamtube-core' ), 
            array( $this , 'unregistered_settings_template' ), 
            'video', 
            'advanced', 
            'default'
        );
    }    

    /**
     *
     * Settings callback
     * 
     * @param  WP_Post $post
     *
     * @since 2.1.7
     */
    public function settings_template( $post ){

        if( ! class_exists( 'BP_Better_Messages_Chats' ) ){
            return printf(
                esc_html__( 'Activating %s plugin is required to set up LiveChat Box.', 'streamtube-core' ),
                '<a target="_blank" href="https://wordpress.org/plugins/bp-better-messages/">Better Messages</a>'
            );
        }

        if ( ! function_exists('get_editable_roles')) {
           require_once(ABSPATH . '/wp-admin/includes/user.php');
        }        

        setup_postdata( $GLOBALS['post'] =& $post );

        load_template( plugin_dir_path( __FILE__ ) . 'admin/live-chat-settings.php' );

        wp_reset_postdata();
    }

    public function unregistered_settings_template( $post ){
        return printf(
            esc_html__( '%s to unlock this feature.', 'streamtube-core' ),
            '<a href="'. esc_url( admin_url( 'themes.php?page=license-verification' ) ) .'">'. esc_html__( 'Verify Purchase', 'streamtube-core' ) .'</a>'
        );
    }

    /**
     *
     * Get default settings
     * 
     * @return array
     *
     * @since 2.1.7
     * 
     */
    public function _get_default_settings(){

        global $wp_roles;
        $roles = $wp_roles->roles; 

        return array(
            'enable'                =>  '',
            'disable_reply'         =>  '',
            'avatar_size'           =>  '30',
            'only_joined_can_read'  =>  '',
            'auto_join'             =>  '1',
            'hide_participants'     =>  '',
            'hide_from_thread_list' =>  '',
            'allow_guests'          =>  '1',
            'can_join'              =>  $this->_get_roles(),
            'can_reply'             =>  $this->_get_roles()
        );
    }

    /**
     *
     * Save settings
     * 
     * @param  int $post_id
     *
     * @since 2.1.7
     * 
     */
    public function save_settings( $post_id ){

        if( ! $this->can_create_live_chat() || ! isset( $_POST['bpbm'] ) ) {
            return;
        }

        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if( Streamtube_Core_Permission::moderate_posts() ){
            return update_post_meta( $post_id, 'bpbm-chat-settings', $_POST['bpbm'] );
        }

        $settings = wp_parse_args( $_POST['bpbm'], $this->_get_default_settings() );

        return update_post_meta( $post_id, 'bpbm-chat-settings', $settings );
    }

    /**
     *
     * Get live chat settings
     * 
     * @param  int $post_id
     * @return array
     *
     * @since 2.1.7
     * 
     */
    public function get_settings( $post_id = 0 ){

        $settings = array();

        if( ! $post_id ){
            return $this->_get_default_settings();
        }

        $settings = get_post_meta( $post_id, 'bpbm-chat-settings', true );

        if( ! $settings ){
            $settings = $this->_get_default_settings();
        }else{
            $settings = wp_parse_args( $settings, $this->_get_default_settings() );
        }

        if( ! array_key_exists( 'allow_guests', $settings ) ){
            $settings['allow_guests'] = '1';
        }

        return $settings;
    }   
}
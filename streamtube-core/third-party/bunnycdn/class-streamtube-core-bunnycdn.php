<?php
/**
 * Define the BunnyCDN functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      2.1
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      2.1
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_BunnyCDN{

    /**
     *
     * Holds the settings
     * 
     * @var array
     *
     * @since 2.1
     * 
     */
    public $settings = array();

    /**
     *
     * Holds the Bunny API object
     * 
     * @var object
     *
     * @since 2.1
     * 
     */
    public $bunnyAPI;

    /**
     *
     * Holds the admin
     * 
     * @var object
     *
     * @since 2.1
     * 
     */
    public $admin;

    public function __construct(){

        $this->load_dependencies();

        $this->settings = $this->get_settings();

        $this->admin = new Streamtube_Core_BunnyCDN_Admin(); 

        $this->bunnyAPI = new Streamtube_Core_BunnyCDN_API( array(
            'AccessKey'     =>  $this->settings['AccessKey'],
            'libraryId'     =>  $this->settings['libraryId'],
            'cdn_hostname'  =>  $this->settings['cdn_hostname']
        ) );
    }

    /**
     *
     * Plugin instance
     * 
     * @since 2.1
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
     * @since 2.1
     * 
     */
    private function include_file( $file ){
        require_once plugin_dir_path( __FILE__ ) . $file;
    }    

    /**
     *
     * Load dependencies
     *
     * @since 2.1
     * 
     */
    private function load_dependencies(){
        if( ! function_exists( 'media_sideload_image' ) ){
            require_once(ABSPATH . 'wp-admin/includes/media.php');
            require_once(ABSPATH . 'wp-admin/includes/file.php');
            require_once(ABSPATH . 'wp-admin/includes/image.php');
        }        
        $this->include_file( 'class-streamtube-core-bunnycdn-admin.php' );
        $this->include_file( 'class-streamtube-core-bunnycdn-api.php' );        
    }

    /**
     *
     * Settings Tabs
     * 
     * @return array
     *
     * @since 2.1
     * 
     */
    public function get_setting_tabs(){
        return array(
            'general'           =>   esc_html__( 'General', 'streamtube-core' ),
            'email-templates'   =>   esc_html__( 'Email Templates', 'streamtube-core' ),
        );
    }

    /**
     *
     * Get sync types
     * 
     * @return array
     *
     * @since 2.1
     * 
     */
    public function get_sync_types(){
        return array(
            'fetching'      =>  esc_html__( 'Fetching', 'streamtube-core' ),
            'php_curl'      =>  esc_html__( 'PHP Curl', 'streamtube-core' ),
            'shell_curl'    =>  esc_html__( 'Shell Curl', 'streamtube-core' )
        );
    }

    /**
     *
     * Default Notify Public Content
     * 
     * @return string
     *
     * @since 2.1
     * 
     */
    private function get_default_notify_publish_content(){
        $content = esc_html__( 'Your video {post_name} is now ready to watch on {website_name}', 'streamtube-core'  ) . "\r\n\r\n";

        $content .= '{post_url}' . "\r\n\r\n";

        return $content;        
    }

    /**
     *
     * Default Notify Encoding Failed Content
     * 
     * @return string
     *
     * @since 2.1
     * 
     */
    private function get_default_notify_encoding_fail_content(){
        $content = esc_html__( 'Your video {post_name} encoding failed on %s', 'streamtube-core'  ) . "\r\n\r\n";

        $content .= '{post_url}' . "\r\n\r\n";

        return $content;        
    }    

    /**
     *
     * Get settings
     *
     * @since 2.1
     * 
     */
    public function get_settings(){

        $webhook_key = md5( uniqid() );

        $settings = (array)get_option( '_bunnycdn' );

        $settings = wp_parse_args( $settings, array(
            'enable'                        =>  '',
            'is_connected'                  =>  '',
            'libraryId'                     =>  '',
            'AccessKey'                     =>  '',
            'cdn_hostname'                  =>  '',
            'webhook_key'                   =>  $webhook_key,
            'sync_type'                     =>  'fetching',
            'curl_path'                     =>  get_option( 'system_curl_path', '/usr/bin/curl' ),
            'tsp'                           =>  '',
            'tsp_path'                      =>  get_option( 'system_tsp_path', '/usr/bin/tsp' ),
            'delete_original'               =>  '',
            'animation_image'               =>  '',
            'file_organize'                 =>  '',
            'auto_publish'                  =>  '',
            'author_notify_publish'         =>  '',
            'author_notify_publish_subject' =>  esc_html__( 'Your {post_name} is now on {website_name}' ),
            'author_notify_publish_content' =>  $this->get_default_notify_publish_content(),
            'author_notify_fail'            =>  '',
            'author_notify_fail_subject'    =>  esc_html__( 'Your {post_name} encoding failed on {website_name}', 'streamtube-core' ),
            'author_notify_fail_content'    =>  $this->get_default_notify_encoding_fail_content()
        ) );

        if( ! $settings['webhook_key'] ){
            $settings['webhook_key'] = $webhook_key;
        }

        return $settings;
    }

    /**
     *
     * Get webhook URL
     * 
     * @return string
     *
     * @since 2.1
     * 
     */
    public function get_webhook_url(){
        return add_query_arg( array(
            'webhook'   =>  'bunnycdn',
            'key'       =>  $this->settings['webhook_key']
        ), home_url('/') );
    }

    /**
     *
     * Get webhook video statuses
     * 
     * @return array
     *
     * @link https://docs.bunny.net/docs/stream-webhook
     *
     * @since 2.1
     * 
     */
    public function get_webhook_video_statuses(){
        $statuses = array(
            '-1'    =>  array(
                'uploading',
                esc_html__( 'The video is waiting for uploading', 'streamtube-core' )
            ),
            '0'     =>  array(
                'queued',
                esc_html__( 'The video has been queued for encoding', 'streamtube-core' )
            ),
            '1'     =>  array(
                'processing',
                esc_html__( 'The video has begun processing', 'streamtube-core' )
            ),
            '2'     =>  array(
                'encoding',
                esc_html__( 'The video is encoding', 'streamtube-core' )
            ),
            '3'     =>  array(
                'finished',
                esc_html__( 'The Video encoding has finished', 'streamtube-core' )
            ),
            '4'     =>  array(
                'resolution_finished',
                esc_html__( 'The encoder has finished processing one of the resolutions and is now playable', 'streamtube-core' )
            ),
            '5'     =>  array(
                'failed',
                esc_html__( 'The video encoding failed', 'streamtube-core' )
            )
        );

        /**
         * @since 2.1
         */
        return apply_filters( 'streamtube/core/bunnycdn/webhook/statuses', $statuses );
    }

    /**
     *
     * Check if enabled
     * 
     * @return boolean
     *
     * @since 2.1
     * 
     */
    public function is_enabled(){
        return $this->settings['enable'] && $this->settings['is_connected'] ? true : false;
    }

    /**
     *
     * Check if auto sync enabled
     * 
     * @return boolean
     *
     * @since 2.1
     * 
     */
    public function is_auto_sync(){
        return $this->is_enabled();
    }

    /**
     *
     * Check if Bulk Sync supported
     * 
     * @return boolean
     *
     * @since 2.1
     * 
     */
    public function is_bulk_sync_supported(){
        return ( $this->settings['sync_type'] == 'php_curl' ) ? false : true;
    }

    /**
     *
     * Check if post is synced
     * 
     * @param  int  $post_id
     * @return true|false
     *
     * @since 2.1
     * 
     */
    public function is_synced( $post_id ){

        $has_data   = get_post_meta( $post_id, '_bunnycdn', true );
        $is_encoded = (int)get_post_meta( $post_id, '_bunnycdn_status', true );

        return $has_data && $is_encoded == 3 ? true : false;
    }

    /**
     *
     * Get WP Post ID (attachment_id) from bunny guid
     * 
     * @param  string $videoId
     * @return false|int
     *
     * @since 2.1
     * 
     */
    public function get_post_id_from_videoId( $videoId ){
        global $wpdb;

        $results = $wpdb->get_var( 
            $wpdb->prepare( 
                "SELECT post_id FROM {$wpdb->postmeta} WHERE meta_key = %s AND meta_value = %s", 
                '_bunnycdn_guid',
                $videoId 
            ) 
        );

        if( $results ){
            return (int)$results;
        }

        return false;
    }

    /**
     *
     * Get bunny videoId
     * 
     * @param  int $post_id
     * @return false|string
     *
     * @since 2.1
     * 
     */
    public function get_video_guid( $post_id ){

        $post_id = (int)$post_id;

        $videoId = get_post_meta( $post_id, '_bunnycdn_guid', true );

        if( $videoId ){
            return $videoId;
        }

        return false;
    }

    /**
     *
     * Get video status
     * 
     * @param  [type] $post_id
     * @return bunnycdn video status
     *
     * @since 2.1
     * 
     */
    public function get_video_process_status( $post_id ){
        return get_post_meta( $post_id, '_bunnycdn_status', true );
    }

    /**
     *
     * Update user collection metadata
     * 
     * @param  int $user_id
     * @param  array $collection
     * @return update_user_meta()
     *
     * @since 2.1
     * 
     */
    private function _update_user_collection_metadata( $user_id, $collection ){
        return update_user_meta( $user_id, '_bunnycdn_collection', $collection );
    }

    /**
     *
     * Get user collection metadata
     * 
     * @param  int $user_id
     * @return get_user_meta()
     *
     * @since 2.1
     * 
     */
    private function _get_user_collection_metadata( $user_id ){
        return get_user_meta( $user_id, '_bunnycdn_collection', true );
    }    

    /**
     *
     * Create collection
     * 
     * @param  int $user_id
     * @return WP_Error|Array
     *
     * @since 2.1
     * 
     */
    public function create_collection( $user_id, $name = '' ){

        $user_id = (int)$user_id;

        if( ! $name ){
            $name = get_userdata( $user_id )->display_name;
        }

        $collection = $this->bunnyAPI->create_collection( $name );

        if( ! is_wp_error( $collection ) ){
            $this->_update_user_collection_metadata( $user_id, $collection );
        }

        return $collection;
    }

    /**
     *
     * Get collection
     * 
     * @param  int $user_id
     * @return false|array
     *
     * @since 2.1
     * 
     */
    public function get_collection( $user_id = 0 ){

        $user_id = (int)$user_id;

        $collection = $this->_get_user_collection_metadata( $user_id );

        if( is_array( $collection ) ){
            return $collection;
        }

        return false;
    }

    /**
     *
     * Get collection id
     * 
     * @param  int $user_id
     * @return false|string
     *
     * @since 2.1
     * 
     */
    public function get_collection_id( $user_id = 0 ){
        $collection = $this->get_collection( $user_id );

        if( is_array( $collection ) ){
            return $collection['guid'];
        }

        return false;
    }

    /**
     *
     * Request collectionId
     * 
     * @param  int $user_id [description]
     * @return string|WP_Error
     *
     * @since 2.1
     * 
     */
    public function request_collection_id( $user_id ){

        $collection  = $this->get_collection( $user_id );

        if( is_array( $collection ) ){

            // Verify if collection exists on bunny
            $collection = $this->bunnyAPI->get_collection( $collection['guid'] );

            if( is_wp_error( $collection ) ){

                if( (int)$collection->get_error_code() == 404 ){
                    // It seems the collection was deleted, try to create a new one
                    $collection = $this->create_collection( $user_id );

                    if( is_wp_error( $collection ) ){
                        // If still error, return WP_Error
                        return $collection;
                    }else{
                        return $collection['guid'];
                    }
                }

                // Return WP_Error
                return $collection;
            }else{

                $this->_update_user_collection_metadata( $user_id, $collection );

                return $collection['guid'];
            }
        }else{
            $collection = $this->create_collection( $user_id );

            if( is_wp_error( $collection ) ){
                // If still error, return
                return $collection;
            }else{
                return$collection['guid'];
            }
        }
    }

    /**
     *
     * Delete attachment files
     * 
     * @param  int $post_id attachment_id
     *
     * @return wp_delete_file_from_directory();
     * 
     * @since 2.1
     */
    public function delete_attachment_file( $post_id ){
        $uploadpath = wp_get_upload_dir();
        return wp_delete_file_from_directory( get_attached_file( $post_id ), $uploadpath['basedir'] );
    }
    
    /**
     *
     * Create new Video after adding attachment
     * 
     * @param int $post_id
     *
     * @since 2.1
     * 
     */
    public function _add_attachment( $post_id ){

        if( ! wp_attachment_is( 'video', $post_id ) ){
            return new WP_Error(
                'invalid_video_type',
                esc_html__( 'Invalid Video Type', 'streamtube-core' )
            );
        }

        $post           = get_post( $post_id );
        $user_id        = $post->post_author;
        $post_title     = $post->post_title;
        $attachment_url = wp_get_attachment_url( $post_id );
        $collectionId   = '';
        $collection     = false;
        $upload         = false;

        if( $this->settings['file_organize'] ){
            $collectionId = $this->request_collection_id( $user_id );

            if( is_wp_error( $collectionId ) ){

                $this->bunnyAPI->write_log_file(
                    get_attached_file( $post_id ),
                    $collectionId->get_error_code() . ' ' . $collectionId->get_error_message(),
                    $collectionId->get_error_code()
                );
                return $post_id;
            }
        }
        
        $create         = $this->bunnyAPI->create_video( get_the_title( $post_id ), $collectionId );

        if( ! is_wp_error( $create ) ){

            set_time_limit(0);

            update_post_meta( $post_id, '_bunnycdn', $create );
            update_post_meta( $post_id, '_bunnycdn_guid', $create['guid'] );
            update_post_meta( $post_id, '_bunnycdn_status', '-1' );// uploading

            /**
             *
             * Fires after Video created
             *
             * @param array $create
             * @param int $post_id (attachment_id)
             *
             * @since 2.1
             * 
             */
            do_action( 'streamtube/core/bunnycdn/video/created', $create, $post_id );

            $file = get_post_meta( $post_id, '_wp_attached_file', true );

            $this->bunnyAPI->delete_log_file( get_attached_file( $post_id ) );

            if( wp_http_validate_url( $file ) ){
                $upload = $this->bunnyAPI->fetch_video( $create['guid'], $file );
            }else{

                $file = get_attached_file( $post_id );

                $this->bunnyAPI->create_empty_log_file( $file );

                switch ( $this->settings['sync_type'] ) {
                    case 'shell_curl':
                        $upload = $this->bunnyAPI->shell_curl_upload_video( 
                            $create['guid'], 
                            $file,
                            $this->settings['curl_path'], 
                            wp_validate_boolean( $this->settings['tsp'] ),
                            $this->settings['tsp_path']
                        );
                    break;

                    case 'php_curl':
                        $upload = $this->bunnyAPI->php_curl_upload_video( $create['guid'], $file );
                    break;
                    
                    default:
                        $upload = $this->bunnyAPI->fetch_video( $create['guid'], $attachment_url );
                    break;
                }
            }           

            /**
             *
             * Fires after Video uploaded
             *
             * @param array $upload
             * @param array $create
             * @param int $post_id (attachment_id)
             *
             * @since 2.1
             * 
             */
            do_action( 'streamtube/core/bunnycdn/video/uploaded', $upload, $create, $post_id );
        }

        return $create;
    }

    /**
     *
     * Create new Video after adding attachment
     * 
     * @param int $post_id
     *
     * @since 2.1
     * 
     */
    public function add_attachment( $post_id ){
        if( ! $this->is_auto_sync() ){
            return $post_id;
        }

        return $this->_add_attachment( $post_id );
    }    

    /**
     *
     * Update Video after updating attachment
     * 
     * @param  int $post_id
     * @return update_video()
     *
     * @since 2.1
     * 
     */
    public function _attachment_updated( $post_id ){

        if( ! wp_attachment_is( 'video', $post_id ) ){
            return $post_id;
        }

        $videoId = $this->get_video_guid( $post_id );

        if( ! $videoId ){
            return $post_id;
        }

        $title = get_the_title( $post_id );
        
        return $this->bunnyAPI->update_video( compact( 'videoId', 'title' ) );
    }

    /**
     *
     * Update Video after updating attachment
     * 
     * @param  int $post_id
     * @return update_video()
     *
     * @since 2.1
     * 
     */
    public function attachment_updated( $post_id ){
        if( ! $this->is_auto_sync() ){
            return $post_id;
        }

        return $this->_attachment_updated( $post_id );
    }    

    /**
     *
     * Delete video while deleting attachment
     * 
     * @param  int $post_id
     * @return delete_video()
     *
     * @since 2.1
     * 
     */
    public function _delete_attachment( $post_id ){

        $videoId = $this->get_video_guid( $post_id );

        if( ! $videoId ){
            return $post_id;
        }

        $this->bunnyAPI->delete_log_file( get_attached_file( $post_id ) );

        return $this->bunnyAPI->delete_video( $videoId );
    }

    /**
     *
     * Delete video while deleting attachment
     * 
     * @param  int $post_id
     * @return delete_video()
     *
     * @since 2.1
     * 
     */
    public function delete_attachment( $post_id ){

        if( ! $this->is_auto_sync() ){
            return $post_id;
        }

        return $this->_delete_attachment( $post_id );
    }    

    /**
     *
     * Update bunny Video after updating Video post
     * 
     * @param  int $post_id 
     *
     * @since 2.1
     * 
     */
    public function _save_post_video( $post_id ){

        $maybe_attachment_id = get_post_meta( $post_id, 'video_url', true );

        if( wp_attachment_is( 'video', $maybe_attachment_id ) ){

            $videoId = $this->get_video_guid( $maybe_attachment_id );

            if( $videoId ){
                $title = get_the_title( $post_id );

                return $this->bunnyAPI->update_video( compact( 'videoId', 'title' ) );
            }
        }
    }

    /**
     *
     * Update bunny Video after updating Video post
     * 
     * @param  int $post_id 
     *
     * @since 2.1
     * 
     */
    public function save_post_video( $post_id ){

        if( ! $this->is_auto_sync() ){
            return $post_id;
        }

        return $this->_save_post_video( $post_id );
    }

    /**
     *
     * Auto Fetch video
     * 
     * @param  int $post_id video post type ID
     *
     * @since 2.1
     * 
     */
    public function _fetch_external_video( $post_id, $source = '' ){

        set_time_limit(0);

        if( ! $this->is_enabled() ){
            return false;
        }

        if( empty( $source ) || wp_attachment_is( 'video', $source ) ){
            return false;
        }

        $headers = get_headers( $source, true );  

        if( ! is_array( $headers ) ){
            return false;
        }

        $content_type = '';

        if( array_key_exists( 'Content-Type', $headers ) ){
            $content_type = $headers['Content-Type'];
        }

        if( array_key_exists( 'content-type', $headers ) ){
            $content_type = $headers['content-type'];
        }

        if( ! $content_type ){
            return false;
        }

        $_content_type = explode( "/" , $content_type );

        if( count( $_content_type ) == 2 && ! in_array( strtolower( $_content_type[1] ) , wp_get_video_extensions() ) ){
            return false;
        }

        $post_title = get_the_title( $post_id );

        $attachment_id = wp_insert_attachment( array(
            'post_title'        =>  $post_title,
            'post_mime_type'    =>  $content_type
        ), $source, $post_id, true, true );

        if( is_wp_error( $attachment_id ) ){
            return $attachment_id;
        }

        return update_post_meta( $post_id, 'video_url', $attachment_id );
    }

    /**
     *
     * Fetch external video on adding videos from backend
     * 
     * @param   $post_id
     * @return _fetch_external_video()
     *
     * @since 2.1
     * 
     */
    public function fetch_external_video( $post_id ){

        if( ! isset( $_POST ) || ! isset( $_POST['video_url'] ) ){
            return $post_id;
        }

        return $this->_fetch_external_video( $post_id, $_POST['video_url'] );
    }  

    /**
     *
     * Fetch external video on embedding videos from frontend
     * 
     * @param   $post_id
     * @return _fetch_external_video()
     *
     * @since 2.1
     * 
     */
    public function fetch_external_video_embed( $post, $source ){
        return $this->_fetch_external_video( $post->ID, $source );
    } 

    /**
     *
     * Get video status
     * 
     * @param  int $attachment_id
     * @return html
     *
     * @since 2.1
     * 
     */
    public function get_video_status( $attachment_id ){

        $output = '';

        $spinner = true;

        $statuses = $this->get_webhook_video_statuses();

        $status = $this->get_video_process_status( $attachment_id );

        $message = '';

        switch ( $status ) {
            case '0':
            case '1':
            case '2':
            case '5':
            case '-1':

                if( array_key_exists( $status, $statuses ) ){
                    $message = $statuses[ $status ][1];
                }
                else{
                    $message = esc_html__( 'Unknown Status', 'streamtube-core' );
                }
            break;
        }

        if( ! empty( $message ) ){
            ob_start();

            if( $status == '5' ){
                $spinner = false;
            }

            $args = compact( 'message', 'spinner', 'attachment_id' );

            /**
             *
             * Filter the output args
             * 
             * @since 2.1
             */
            $args = apply_filters( 'streamtube/core/bunnycdn/video_player_status', $args );

            load_template( 
                plugin_dir_path( __FILE__ ) . 'frontend/video-status.php', 
                true, 
                $args 
            );
            $output = ob_get_clean();
        }

        return $output;
    }

    /**
     *
     * Sync video
     * 
     * @param  int $post_id
     * @return _add_attachment()
     *
     * @since 2.1
     * 
     */
    public function sync_video( $post_id ){

        if( $this->is_synced( $post_id ) ){
            return new WP_Error(
                'synced',
                esc_html__( 'This video is already synced', 'streamtube-core' )
            );
        }

        return $this->_add_attachment( $post_id );
    }

    /**
     *
     * Retry sunc video
     * 
     * @param  int $post_id attachment_id
     * @return _add_attachment()
     *
     * @since 2.1
     * 
     */
    public function retry_sync_video( $post_id ){      

        if( $this->is_synced( $post_id ) ){
            return new WP_Error(
                'synced',
                esc_html__( 'This video is already synced', 'streamtube-core' )
            );
        }         

        if( "" != $videoId = $this->get_video_guid( $post_id ) ){
            $this->bunnyAPI->delete_video( $videoId );
        }

        delete_post_meta( $post_id, '_bunnycdn' );
        delete_post_meta( $post_id, '_bunnycdn_guid' );
        delete_post_meta( $post_id, '_bunnycdn_status' );

        return $this->_add_attachment( $post_id );
    }

    /**
     *
     * Generate thumbnail image
     * 
     * @param  int $post_id
     * @param  string $videoId
     * @return WP_Error|int
     *
     * @since 2.1
     * 
     */
    public function generate_thumbnail_image( $post_id, $videoId = '' ){
        if( has_post_thumbnail( $post_id ) ){
            return new WP_Error(
                'thumbnail_exists',
                esc_html__( 'Thumbnail Image is already existed', 'streamtube-core' )
            );
        }

        if( ! $videoId ){
            $videoId = $this->get_video_guid( $post_id );    
        }

        if( ! $videoId ){
            return new WP_Error(
                'videoId_not_found',
                esc_html__( 'VideoId was not found', 'streamtube-core' )
            );
        }

        $thumbnail_url = $this->bunnyAPI->get_video_thumbnail_url( $videoId );

        $thumbnail_id = media_sideload_image( $thumbnail_url, $post_id, null, 'id' );

        if( ! is_wp_error(  $thumbnail_id ) ){
            set_post_thumbnail( $post_id, $thumbnail_id );

            wp_update_post( array(
                'ID'            =>  $thumbnail_id,
                'post_parent'   =>  $post_id
            ) );

            $post = get_post( $post_id );

            if( $post->post_parent ){
                set_post_thumbnail( $post->post_parent, $thumbnail_id );
            }
        }

        return $thumbnail_id;
    }

    /**
     *
     * Generate webp image
     * 
     * @param  int $post_id
     * @param  string $videoId
     * @return WP_Error|int
     *
     * @since 2.1
     * 
     */
    public function generate_webp_image( $post_id, $videoId = '' ){

        if( $this->plugin()->post->get_thumbnail_image_url_2( $post_id ) ){
            return new WP_Error(
                'webp_exists',
                esc_html__( 'WebP Image is already existed', 'streamtube-core' )
            );
        }

        if( ! $videoId ){
            $videoId = $this->get_video_guid( $post_id );    
        }

        if( ! $videoId ){
            return new WP_Error(
                'videoId_not_found',
                esc_html__( 'VideoId was not found', 'streamtube-core' )
            );
        }        

        $webp_url = $this->bunnyAPI->get_video_preview_webp_url( $videoId );

        $webp_id = media_sideload_image( $webp_url, $post_id, null, 'id' );

        if( ! is_wp_error(  $webp_id ) ){

            $this->plugin()->post->update_thumbnail_image_url_2( $post_id, $webp_id );

            $post = get_post( $post_id );

            if( $post->post_parent ){
                $this->plugin()->post->update_thumbnail_image_url_2( $post->post_parent, $webp_id );
            }
        }

        return $webp_id;
    }

    /**
     *
     * AJAX get video player status
     * 
     * @since 2.1
     * 
     */
    public function ajax_get_video_status(){
        check_ajax_referer( '_wpnonce' );   

        if( ! isset( $_GET['attachment_id'] ) ){
            wp_send_json_error( esc_html__( 'Attachment ID was not found', 'streamtube-core' ) );
        }

        wp_send_json_success( $this->get_video_status( $_GET['attachment_id'] ) );
    }

    /**
     *
     * AJAX sync
     * 
     * @since 2.1
     */
    public function ajax_sync(){

        if( ! isset( $_POST ) || ! isset( $_POST['attachment_id'] ) ){
            wp_send_json_error( new WP_Error(
                'invalid_requested',
                esc_html__( 'Invalid Requested', 'streamtube-core' )
            ) );
        }    

        $results = $this->sync_video( $_POST['attachment_id'] );

        if( is_wp_error( $results ) ){
            wp_send_json_error( $results );
        }

        wp_send_json_success( array(
            'results'   =>  $results,
            'message'   =>  esc_html__( 'Syncing', 'streamtube-core' )
        ) );
    }

    /**
     *
     * AJAX retry sync
     * 
     * @since 2.1
     */
    public function ajax_retry_sync(){

        if( ! isset( $_POST ) || ! isset( $_POST['attachment_id'] ) ){
            exit;
        }

        $results = $this->retry_sync_video( $_POST['attachment_id'] );

        if( is_wp_error( $results ) ){
            wp_send_json_error( $results );
        }

        wp_send_json_success( array(
            'results'   =>  $results,
            'message'   =>  esc_html__( 'Syncing', 'streamtube-core' )
        ) );
    }  

    /**
     *
     * Bulk sync
     * 
     * @param  array $post_ids $attachment_ids
     *
     * @return array $queued array of queued post ids
     *
     * @since 2.1
     * 
     */
    public function bulk_media_sync( $post_ids = array() ){

        $sync_types = $this->get_sync_types();

        if( ! $post_ids ){
            return new WP_Error(
                'empty_posts',
                esc_html__( 'Empty Posts', 'streamtube-core' )
            );
        }

        if( $this->settings['sync_type'] == 'php_curl' ){
            return new WP_Error(
                'php_curl_not_supported',
                sprintf(
                    esc_html__( 'Bulk Sync does not support %s type', 'streamtube-core' ),
                    $sync_types[$this->settings['sync_type']]
                )
            );
        }

        $queued = array();

        foreach ( $post_ids as $post_id ) {
            $_queue = $this->_add_attachment( $post_id );

            if( ! is_wp_error( $_queue ) ){
                $queued[] = $post_id;
            }
        }

        return $queued;
    }

    /**
     *
     * Filter attachment URL
     * 
     * @param  string $url
     * @param  int $post_id
     * @return string
     *
     * @since 2.1
     * 
     */
    public function filter_wp_get_attachment_url( $url, $post_id ){

        if( ! $this->is_enabled() ){
            return $url;
        }        

        if( get_post_type( get_post_parent( $post_id ) ) == 'ad_tag' ){
            return $url;
        }

        $videoId = $this->get_video_guid( $post_id );

        if( ! $videoId ){
            return $url;
        }

        return $this->bunnyAPI->get_video_hls_url( $videoId );
    }

    /**
     *
     * Filter player output
     *
     * @since 2.1
     * 
     */
    public function filter_player_output( $player, $setup, $source ){

        if( ! $this->is_enabled() || ! wp_attachment_is( 'video', $source ) ){
            return $player;
        }

        $videoId = $this->get_video_guid( $source );

        if( ! $videoId ){
            return $player;
        }

        $status = $this->get_video_status( $source );

        if( $status ){
            return $status;
        }

        return $player;
    }

    /**
     *
     * Generate thumbnail images
     * 
     * @param  int $post_id
     * @param  array $data webhook response
     *
     * @since 2.1
     * 
     */
    public function update_thumbnail_images( $post, $data ){

        if( in_array( $data['Status'] , array( '3', '4' )) ){

            $this->generate_thumbnail_image( $post->ID, $data['VideoGuid'] );

            if( $this->settings['animation_image'] ){
                $this->generate_webp_image( $post->ID, $data['VideoGuid'] );
            }
        }
    }

    /**
     *
     * Filter webp image URL
     * 
     * @param  string $image_url
     * @param  int $post_id
     * @return $image_url
     *
     * @since 2.1.10
     * 
     */
    public function filter_thumbnail_image_2( $image_url, $post_id ){

        if( ! $this->is_enabled() ){
            return $image_url;
        }

         if( ! $this->settings['animation_image'] || ! apply_filters( 'streamtube/core/bunnycdn/load_webp', true ) ){
            return $image_url;
         }

         $attachment_id = get_post_meta( $post_id, 'video_url', true );

         if( ! wp_attachment_is( 'video', $attachment_id ) ){
            return $image_url;
         }

         return $this->bunnyAPI->get_video_preview_webp_url( $this->get_video_guid( $attachment_id ));
    }

    /**
     *
     * Delete orignial file
     * 
     * @param  int $post_id
     * @param  array $data webhook response
     *
     * @since 2.1
     * 
     */
    public function delete_original_file( $post, $data ){
        if( (int)$data['Status'] == 3 ){
            if( get_post_type( $post->post_parent ) != 'ad_tag' && wp_validate_boolean( $this->settings['delete_original'] ) ){
                $this->delete_attachment_file( $post->ID );
            }
        }
    }

    public function ajax_read_log_content(){
        $attachment_id = isset( $_GET['attachment_id'] ) ? (int)$_GET['attachment_id'] : 0;

        if( ! $attachment_id || ! Streamtube_Core_Permission::moderate_cdn_sync() ){
            exit;
        }

        $log_content = $this->bunnyAPI->read_log_file( get_attached_file( $attachment_id ) );

        if( ! $log_content ){
            esc_html_e( 'No log content available', 'streamtube-core' );

        }else{
            printf(
                '<pre>%s</pre>',
                $log_content
            );
        }
        exit;
    }

    /**
     *
     * AJAX view log file content
     * 
     * @since 2.1
     */
    public function ajax_read_task_log_content(){

        $task_id = isset( $_GET['task_id'] ) ? (int)$_GET['task_id'] : -1;

        if( $task_id == -1 || ! Streamtube_Core_Permission::moderate_cdn_sync() ){
            exit;
        }        

        $log_content = $this->bunnyAPI->read_task_log_content( $task_id );

        if( $log_content ){
            printf(
                '<pre>%s</pre>',
                $log_content
            );
        }else{
            esc_html_e( 'No log content', 'streamtube-core' );
        }
        exit;
    }    

    /**
     *
     * Auto publish video after encoding successfully
     * 
     * @param  WP_Post $post
     * @param  array $data webhook response
     *
     * @since 2.1
     * 
     */
    public function auto_publish_after_success_encoding( $post, $data ){

        if( (int)$data['Status'] == 3 ){

            if( $post->post_parent ){
            
                wp_update_post( array(
                    'ID'            =>  $post->post_parent,
                    'post_status'   =>  'publish'
                ) );

                if( $this->settings['author_notify_publish'] ){
                    streamtube_core_notify_author_after_video_publish( $post, array(
                        'subject'   =>  trim( $this->settings['author_notify_publish_subject'] ),
                        'content'   =>  trim( $this->settings['author_notify_publish_content'] )
                    ) );
                }

            }

            /**
             *
             * Fires after publishing video
             *
             * @param  int $post_id
             * @param  array $data webhook response
             *
             * @since 2.1
             * 
             */
            do_action( 'streamtube/core/bunnycdn/auto_publish', $post, $data );
        }
    }

    /**
     *
     * Auto send notify to author after encoding failed
     * 
     * @param  WP_Post $post
     * @param  array $data webhook response
     *
     * @since 2.1
     * 
     */
    public function notify_author_after_encoding_failed( $post, $data ){
        if( (int)$data['Status'] == 5 ){
            streamtube_core_notify_author_after_video_encoding_failed( $post, array(
                'subject'   =>  trim( $this->settings['author_notify_fail_subject'] ),
                'content'   =>  trim( $this->settings['author_notify_fail_content'] )
            ) );
        }
    }

    /**
     *
     * Update user collection if user updated
     *
     * @since 2.1.1
     */
    public function update_user_collection( $user_id, $old_user_data, $userdata ){

        if( ! $this->is_enabled() ){
            return $user_id;
        }

        $collectionId = $this->get_collection_id( $user_id );
        $display_name = get_userdata( $user_id )->display_name;

        if( ! $collectionId || ! $display_name ){
            return $user_id;
        }

        return $this->bunnyAPI->update_collection( $collectionId, $display_name );
    }

    /**
     *
     * Process webhook data
     * 
     * @since 2.1
     * 
     */
    public function _webhook_callback( $data ){
        $data       = json_decode( $data, true );
        $statuses   = $this->get_webhook_video_statuses();

        if( is_array( $data ) && array_key_exists( 'VideoGuid' , $data ) ){
            $post_id = $this->get_post_id_from_videoId( $data['VideoGuid'] );

            if( $post_id ){

                $file = get_attached_file( $post_id );

                update_post_meta( $post_id, '_bunnycdn_status', $data['Status'] );

                if( (int)$data['Status'] == 3 ){
                    
                    $video_details = $this->bunnyAPI->get_video( $data['VideoGuid'] );

                    if( ! is_wp_error( $video_details ) ){
                        update_post_meta( $post_id, '_bunnycdn', $video_details );
                    }

                    // Update log
                    if( $this->settings['tsp'] ){
                        $this->bunnyAPI->write_log_file( $file );
                    }
                }

                if( array_key_exists( $data['Status'], $statuses ) ){
                    $this->bunnyAPI->write_log_file( 
                        $file, 
                        json_encode( $data ),  
                        sprintf( 
                            esc_html__( 'Webhook Request Status %s', 'streamtube-core' ),
                            $statuses[ $data['Status'] ][0]
                        )
                    );
                }                

                /**
                 *
                 * Fires once webhook updated
                 *
                 * @param object $post ($attachment_id)
                 * @param array $data
                 *
                 * @since 2.1
                 * 
                 */
                do_action( 'streamtube/core/bunny/webhook/update', get_post( $post_id ), $data );
            }
        }    
    }    

    /**
     *
     * Process webhook data
     * 
     * @since 2.1
     * 
     */
    public function webhook_callback(){
        $request = wp_parse_args( $_GET, array(
            'webhook'   =>  '',
            'key'       =>  ''
        ) );

        if( $request['webhook'] != 'bunnycdn' || $request['key'] != $this->settings['webhook_key'] ){
            return;
        }

        if( ! $this->is_enabled() ){
            wp_send_json_error( 'Not Enabled' );
        }

        $data = file_get_contents("php://input");

        if( $data ){
            $this->_webhook_callback( $data );
        }

        wp_send_json_success( 'Webhook' );

    }    
}
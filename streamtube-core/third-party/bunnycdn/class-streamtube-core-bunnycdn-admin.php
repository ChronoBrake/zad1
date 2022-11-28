<?php
/**
 * Define the BunnyCDN Admin functionality
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

class Streamtube_Core_BunnyCDN_Admin{

    /**
     *
     * Define advertising admin menu slug
     *
     * @since 1.3
     * 
     */
    const ADMIN_SETTINGS_MENU_SLUG   = 'options-general.php';

    /**
     *
     * Plugin instance
     *
     */
    private function plugin(){
        return streamtube_core()->get();
    }

    /**
     *
     * Unregistered Menu
     * 
     */
    public function unregistered(){
        add_submenu_page( 
            self::ADMIN_SETTINGS_MENU_SLUG, 
            esc_html__( 'Bunny CDN', 'streamtube-core' ), 
            esc_html__( 'Bunny CDN', 'streamtube-core' ), 
            'administrator', 
            'sync-bunnycdn', 
            array( $this->plugin()->license , 'unregistered_template' ), 
            50
        );
    }

    /**
     *
     * Registered Menu
     *
     * @since 2.1
     * 
     */
    public function registered(){
        add_submenu_page( 
            self::ADMIN_SETTINGS_MENU_SLUG, 
            esc_html__( 'Bunny CDN', 'streamtube-core' ), 
            esc_html__( 'Bunny CDN', 'streamtube-core' ), 
            'administrator', 
            'sync-bunnycdn', 
            array( $this, 'settings_template' ), 
            50
        );      
    }

    /**
     *
     * The settings template
     * 
     * @since 2.1
     */
    public function settings_template(){
        load_template( plugin_dir_path( __FILE__ ) . 'admin/settings.php' );
    }

    /**
     *
     * Convert bytes to MB
     * 
     * @param  integer $int
     * @return int
     *
     * @since 2.1.2
     * 
     */
    public function bytes_to_mb( $int = 0 ){
        return ceil( (int)$int/1024/1024 );
    }

    /**
     *
     * The Video table
     *
     * @since 2.1
     * 
     */
    public function post_table( $columns ){

        unset( $columns['date'] );

        $new_columns = array();

        if( Streamtube_Core_Permission::moderate_cdn_sync() && $this->plugin()->bunnycdn->is_enabled() ){
            $new_columns['bunnycdn_sync'] = esc_html__( 'Bunny CDN', 'streamtube-core' );
        }

        $new_columns['date'] = esc_html__( 'Date', 'streamtube-core' );

        return array_merge( $columns, $new_columns );
    }

    /**
     *
     * The Video table
     *
     * @since 2.1
     * 
     */
    public function post_table_columns( $column, $post_id ){
        switch ( $column ) {

            case 'bunnycdn_sync':
                $attachment_id = get_post_meta( $post_id, 'video_url', true );

                if( wp_attachment_is( 'video', $attachment_id ) ){
                    load_template( 
                        plugin_dir_path( __FILE__ ) . 'admin/sync-control.php', 
                        false, 
                        compact( 'attachment_id' )
                    );
                }
            break;
            
        }                    
    }    

    /**
     *
     * The media table
     * 
     * @since  2.1
     * 
     */
    public function media_table( $columns ){

        unset( $columns['date'] );

        $new_columns = array();

        if( Streamtube_Core_Permission::moderate_cdn_sync() && $this->plugin()->bunnycdn->is_enabled() ){
            $new_columns['bunnycdn_sync'] = esc_html__( 'Bunny CDN', 'streamtube-core' );
        }       

        $new_columns['date'] = esc_html__( 'Date', 'streamtube-core' );

        return array_merge( $columns, $new_columns );
    }

    /**
     *
     * The media table
     * 
     * @since  2.1
     * 
     */
    public function media_table_columns( $column, $post_id ){

        switch ( $column ) {

            case 'bunnycdn_sync':

                $attachment_id = $post_id;

                if( wp_attachment_is( 'video', $attachment_id ) ){
                    load_template( 
                        plugin_dir_path( __FILE__ ) . 'admin/sync-control.php', 
                        false, 
                        compact( 'attachment_id' )
                    );
                }
            break;

        }
    }

    /**
     *
     * Add metaboxes
     *
     * @since 2.1
     * 
     */
    public function add_meta_boxes(){
        add_meta_box( 
            'bunnycdn-video-details', 
            esc_html__( 'Bunny CDN Video Details', 'streamtube-core' ), 
            array( $this , 'video_details' ), 
            'attachment', 
            'advanced', 
            'default'
        );
    }

    /**
     *
     * The Video details box template
     * 
     * @param  WP_Post $post
     *
     * @since 2.1
     */
    public function video_details( $post ){

        $bunny_video_content = get_post_meta( $post->ID, '_bunnycdn', true );

        if( ! wp_attachment_is( 'video', $post->ID ) || empty( $bunny_video_content ) ){
            return printf(
                '<p>%s</p>',
                esc_html__( 'No content available', 'streamtube-core' )
            );
        }

        load_template( 
            plugin_dir_path( __FILE__ ) . 'admin/video-details.php', 
            true, 
            compact( 'bunny_video_content' ) 
        );
    }

    /**
     *
     * Format video details field value
     * 
     * @param  string $field
     * @param string $value
     *
     * @since 2.1.2
     * 
     */
    public function get_format_video_details_field_value( $field = '', $value = '' ){
        switch ( $field ) {
            case 'storageSize':
                return $this->bytes_to_mb( $value ) . 'MB';
            break;
            default:
                return $value;
            break;
        }
    }    

    /**
     *
     * Save video details content
     * 
     * @param  int $post_id
     *
     * @since 2.1
     * 
     */
    public function video_details_save( $post_id ){

        if( ! isset( $_POST ) || ! isset( $_POST['bunnycdn_nonce'] ) ){
            return;
        }

        if( ! wp_verify_nonce( $_POST['bunnycdn_nonce'], 'bunnycdn_nonce' ) ){
            return;
        }

        if( ! current_user_can( 'edit_post', $post_id ) ){
            return;
        }

        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if ( get_post_type( $post_id ) != 'attachment' ) {
            return;
        }

        if( ! isset( $_POST['bunnycdn'] ) ){
            return;
        }

        $data = wp_unslash( $_POST['bunnycdn'] );

        foreach ( $data as $key => $value) {
            update_post_meta( $post_id, sanitize_key( $key ), sanitize_text_field( $value ) );
        }
    }

    public function get_video_details_field_name( $field = '' ){
        switch ( $field ) {
            case 'videoLibraryId':
                return esc_html__( 'Library ID', 'streamtube-core' );
            break;

            case 'guid':
                return esc_html__( 'ID', 'streamtube-core' );
            break;

            case 'title':
                return esc_html__( 'Title', 'streamtube-core' );
            break;

            case 'dateUploaded':
                return esc_html__( 'Date Uploaded', 'streamtube-core' );
            break;

            case 'collectionId':
                return esc_html__( 'Collection ID', 'streamtube-core' );
            break;

            case 'thumbnailFileName':
                return esc_html__( 'Thumbnail File Name', 'streamtube-core' );
            break;

            case 'isPublic':
                return esc_html__( 'Is Public', 'streamtube-core' );
            break;

            case 'availableResolutions':
                return esc_html__( 'Available Resolutions', 'streamtube-core' );
            break;

            case 'thumbnailCount':
                return esc_html__( 'Thumbnail Count', 'streamtube-core' );
            break;

            case 'encodeProgress':
                return esc_html__( 'Encode Progress', 'streamtube-core' );
            break;

            case 'storageSize':
                return esc_html__( 'Storage Size', 'streamtube-core' );
            break;

            case 'hasMP4Fallback':
                return esc_html__( 'Has MP4 Fallback', 'streamtube-core' );
            break;

            case 'averageWatchTime':
                return esc_html__( 'Average Watch Time', 'streamtube-core' );
            break;

            case 'totalWatchTime':
                return esc_html__( 'Total Watch Time', 'streamtube-core' );
            break;

            default:
                return ucwords( $field );
            break;            

        }
    }

    /**
     *
     * Add Bulk actions
     * 
     * @return array
     *
     * @since 2.1
     * 
     */
    public function add_bulk_actions( $bulk_actions ){

        if( $this->plugin()->bunnycdn->settings['is_connected'] ){

            $bulk_actions = array_merge( $bulk_actions, array(
                'bulk_bunnycdn_sync'                    =>  esc_html__( 'Bunny CDN Sync', 'streamtube-core' ),
                'bulk_bunnycdn_generate_image'          =>  esc_html__( 'Bunny CDN Generate Thumbnail Image', 'streamtube-core' ),
                'bulk_bunnycdn_generate_webp_image'     =>  esc_html__( 'Bunny CDN Generate WebP Image', 'streamtube-core' )
            ) );

        }

        return $bulk_actions;
    }    

    /**
     *
     * Bulk actions handler
     * 
     * @param  string $redirect_url
     * @param  string $action
     * @param  int $post_ids
     *
     * @since 2.1
     * 
     */
    public function handle_bulk_actions( $redirect_url, $action, $post_ids ){

        if( ! $this->plugin()->bunnycdn->settings['is_connected'] ){
            return $redirect_url;
        }

        $bunnycdn   = streamtube_core()->get()->bunnycdn;

        $queued     = array();

        $_post_ids  = array();

        foreach ( $post_ids as $post_id ) {
            if( get_post_type( $post_id ) == 'video' ){
                $post_id = get_post_meta( $post_id, 'video_url', true );
            }

            $_post_ids[] = $post_id;
        }

        switch ( $action ) {
            case 'bulk_bunnycdn_sync':

                $is_bulk_sync_supported = $bunnycdn->is_bulk_sync_supported();

                for ( $i=0; $i < count( $_post_ids ); $i++) { 

                    if( $is_bulk_sync_supported ){

                        $result = $bunnycdn->retry_sync_video( $_post_ids[$i] );

                        if( ! is_wp_error( $result ) ){
                            $queued[] = $_post_ids[$i];
                        }
                    }
                }

                if( count( $queued ) > 0 ){
                    $redirect_url   = add_query_arg( array(
                        $action     => count( $queued )
                    ), $redirect_url);    
                }

                if( ! $is_bulk_sync_supported ){
                    $redirect_url   = add_query_arg( array(
                        $action     => 'bulk_sync_not_supported',
                        'ref'       =>  'php_curl'
                    ), $redirect_url);
                }

            break;

            case 'bulk_bunnycdn_generate_image':
                for ( $i=0; $i < count( $_post_ids ); $i++) {
                    $result = $bunnycdn->generate_thumbnail_image( $_post_ids[$i] );

                    if( ! is_wp_error( $result ) ){
                        $queued[] = $_post_ids[$i];
                    }                    
                }

                if( count( $queued ) > 0 ){
                    $redirect_url   = add_query_arg( array(
                        $action     => count( $queued )
                    ), $redirect_url);
                }                
            break;

            case 'bulk_bunnycdn_generate_webp_image':
                for ( $i=0; $i < count( $_post_ids ); $i++) {
                    $result = $bunnycdn->generate_webp_image( $_post_ids[$i] );

                    if( ! is_wp_error( $result ) ){
                        $queued[] = $_post_ids[$i];
                    }                    
                }

                if( count( $queued ) > 0 ){
                    $redirect_url   = add_query_arg( array(
                        $action     => count( $queued )
                    ), $redirect_url);
                }
            break;            
        }

        return $redirect_url;
    }

    /**
     *
     * Show admin notice 
     * 
     * @since 2.1
     */
    public function handle_bulk_admin_notices(){
        if( isset( $_REQUEST['bulk_bunnycdn_sync'] ) ){

            if( $_REQUEST['bulk_bunnycdn_sync'] == 'bulk_sync_not_supported' ){
                printf(
                    '<div class="notice notice-error"><p>%s</p></div>',
                    sprintf(
                        esc_html__( 'Bulk Sync is not supported since you have selected %s Sync Type from %s page', 'streamtube-core' ),
                        '<strong>'. esc_html__( 'PHP Curl', 'streamtube-core' ) .'</strong>',
                        '<strong><a href="'. esc_url( admin_url( 'options-general.php?page=sync-bunnycdn' ) ) .'">'. esc_html__( 'Settings', 'streamtube-core' ) .'</a></strong>',
                    )
                );
            }
            else{
                echo '<div class="notice notice-success"><p>';
                    $count = (int)$_REQUEST['bulk_bunnycdn_sync'];
                    printf( 
                        _n( 
                            '%s has been queued for syncing onto Bunny CDN', 
                            '%s have been queued for syncing onto Bunny CDN', 
                            $count, 
                            'streamtube-core' 
                        ), 
                        number_format_i18n( $count ) 
                    );
                echo '</p></div>';
            }   
        }
    }

    /**
     *
     * Convert collection fields to readable text
     * 
     * @param  string $field
     *
     * @since 2.1.2
     * 
     */
    public function get_collection_field_name( $field = '' ){
        switch ( $field ) {
            case 'videoLibraryId':
                return esc_html__( 'Library ID', 'streamtube-core' );
            break;

            case 'guid':
                return esc_html__( 'Collection ID', 'streamtube-core' );
            break;

            case 'name':
                return esc_html__( 'Collection Name', 'streamtube-core' );
            break;

            case 'videoCount':
                return esc_html__( 'Video Count', 'streamtube-core' );
            break;

            case 'totalSize':
                return esc_html__( 'Total Size', 'streamtube-core' );
            break;

            case 'previewVideoIds':
                return esc_html__( 'Preview Video Ids', 'streamtube-core' );
            break;

            default:
                return $field;
            break; 
        }
    }

    /**
     *
     * Format collection field value
     * 
     * @param  string $field
     * @param string $value
     *
     * @since 2.1.2
     * 
     */
    public function get_format_collect_field_value( $field = '', $value ){
        switch ( $field ) {
            case 'totalSize':
                return $this->bytes_to_mb( $value ) . 'MB';
            break;

            case 'videoCount':
                return number_format_i18n( absint( $value ) );
            break;
            
            default:
                return $value;
            break;
        }
    }

    /**
     *
     * Filter user table
     * 
     * @param  array $columns
     * @return array new $columns
     *
     * @since 2.1
     * 
     */
    public function user_table( $columns ){
        return array_merge( $columns, array(
            'bunnycdn_collection'   =>  esc_html__( 'Collection', 'streamtube-core' )
        ) );
    }

    /**
     *
     * Filter user table
     * 
     * @param string $output
     * @param string $column_name
     * @param innt $user_id
     *
     * @since 2.1
     * 
     */
    public function user_table_columns( $output, $column_name, $user_id ){

        $output = '';

        switch ( $column_name ) {
            case 'bunnycdn_collection':
                $collection = $this->plugin()->bunnycdn->get_collection( $user_id );

                if( $collection ){
                    foreach ( $collection as $key => $value ) {
                        if( $key != 'previewVideoIds' ){
                            if( ! empty( $value ) ){
                                $output .= sprintf(
                                    '<p><strong>%s</strong>: %s</p>',
                                    $this->get_collection_field_name( $key ),
                                    $this->get_format_collect_field_value( $key, $value )
                                );
                            }
                        }
                    }
                }
            break;
        }

        return $output;
    }    

    /**
     *
     * AJAX check videos progress
     * 
     * @since 2.1
     */
    public function ajax_check_videos_progress(){
        check_ajax_referer( '_wpnonce' );   

        if( ! $this->plugin()->bunnycdn->is_enabled() ){
            exit;
        }

        $response       = array();
        $attachments    = array();
        $posts          = $_POST['posts'];

        for ( $i=0; $i < count( $posts ); $i++) {
            if( wp_attachment_is( 'video', $posts[$i] ) ){
                $attachments[] = $posts[$i];
            }
        }

        for ( $i=0; $i < count( $attachments ); $i++) {
            ob_start();

            load_template( 
                plugin_dir_path( __FILE__ ) . 'admin/sync-control.php', 
                false, 
                array(
                    'attachment_id' =>  $attachments[$i]
                )
            );

            $response[ $attachments[$i] ] = ob_get_clean();
        }

        wp_send_json_success( $response );

    }

    /**
     *
     * Run interval check videos progress
     * 
     * @since 2.1
     * 
     */
    public function interval_check_videos_progress(){

        if( ! $this->plugin()->bunnycdn->is_enabled() ){
            return;
        }

        $screen = get_current_screen()->id;

        if( ! in_array( $screen , array( 'edit-video', 'upload' )) ){
            return;
        }

        ?>
        <script type="text/javascript">

            setInterval( function(){

                var ajaxUrl = '<?php echo admin_url( 'admin-ajax.php' ); ?>';

                var posts = [];

                jQuery.each( jQuery( 'div.status-attachment' ), function( key, value ) {
                    var Id = parseInt( jQuery(this).attr( 'data-attachment-id' ) );
                    if( ! isNaN( Id ) ){
                        posts.push( Id );
                    }
                });

                if( posts.length > 0 ){
                    jQuery.post( ajaxUrl, {
                        'action'    : 'check_videos_progress',
                        '_wpnonce'  : '<?php echo wp_create_nonce( '_wpnonce' );?>',
                        'posts'     : posts
                    }, function( response ){

                        jQuery.each( response.data, function( key, value ) {
                            jQuery( '#the-list #status-attachment-' + key ).replaceWith( value );
                        });
                    } );
                }

            }, 5000 );

        </script>
        <?php
    }

    /**
     *
     * Admin notice
     * 
     * @since 2.1.3
     */
    public function notices(){
        if( $this->plugin()->bunnycdn->is_enabled() && function_exists( 'wp_video_encoder' ) ){
            ?>
            <div class="notice notice-warning">
                <p>
                    <?php printf(
                        esc_html__( 'You must deactivate the %s since you have enabled the %s', 'streamtube-core' ),
                        '<strong><a href="'. esc_url( admin_url( 'plugins.php?s=wp-video-encoder&plugin_status=all' ) ) .'">WP Video Encoder</a></strong>',
                        '<strong>Bunny CDN</strong>'
                    );?>
                </p>
            </div>
            <?php
        }
    }
}
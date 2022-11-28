<?php
/**
 * Elementor
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.1.7
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class StreamTube_Core_Download_File{

    /**
     *
     * Holds the meta field name
     *
     * @since 1.0.9
     * 
     */
    const META_KEY  = 'download_video';

    /**
     * Get plugin objects
     */
    private function plugin(){
        return streamtube_core()->get();
    }    

    /**
     *
     * Get settings
     * 
     * @return array
     *
     *
     * @since 1.1.7
     * 
     */
    public function get_settings(){

        $settings = array(
            'perm'              =>  get_option( self::META_KEY, '' ),
            'type'              =>  'direct',
            'button_icon'       =>  'icon-download',
            'button_label'      =>  esc_html__( 'Download', 'streamtube-core' ),
            'file_url'          =>  '',
            'count'             =>  0
        );

        /**
         *
         * @since 1.1.7
         * 
         */
        return apply_filters( 'streamtube/core/video/download_files_settings', $settings );
    }

    /**
     *
     * Check if video is downloadable, self-hosted file only.
     * 
     * @return true if is downloadable, otherwise is false
     *
     * @since 1.1.7
     * 
     */
    public function is_downloadable(){
        $maybe_attachment = $this->plugin()->post->get_source();

        if( wp_attachment_is( 'video', $maybe_attachment ) ){
            return true;
        }

        return false;
    }

    /**
     *
     * Check if user can download video file
     * 
     * @return true if can, otherwise is false
     *
     * @since 1.1.7
     * 
     */
    public function can_user_download(){

        $can = true;

        $settings = $this->get_settings();

        if( ! $settings['perm'] ){
            // Return false if feature isn't enabled yet.
            return false;
        }

        if( $settings['perm'] == 'member' && ! is_user_logged_in() ){
            $can = false;
        }

        if( function_exists( 'mycred_user_paid_for_content' ) ){
            if( mycred_post_is_for_sale( get_the_ID() ) && ! mycred_user_paid_for_content( get_current_user_id(), get_the_ID() ) ){
                $can = false;
            }
        }

        if( Streamtube_Core_Permission::moderate_posts() ){
            $can = true;
        }

        return apply_filters( 'streamtube/core/video/can_user_download', $can );
    }

    /**
     *
     * Get download endpoint URL
     * 
     * @return true
     *
     * @since 1.1.7
     * 
     */
    private function get_file_url(){
        $url = add_query_arg( array(
            'download'  =>  '1'
        ), get_permalink( get_the_ID() ) );

        return apply_filters( 'streamtube/core/video/download_file_url', $url );
    }

    /**
     *
     * process download file if download param found    
     *
     * @since 1.1.7
     * 
     */
    public function process_download(){

        if( ! is_singular( 'video' ) ){
            return;
        }

        if( ! isset( $_GET['download'] ) ){
            return;
        }

        if( ! $this->can_user_download() || ! $this->is_downloadable() ){
            return;
        }

        $file       = get_attached_file( $this->plugin()->post->get_source() );
        $filetype   = wp_check_filetype( $file );
        $filename   = sanitize_file_name( get_the_title() )  . '.' . $filetype['ext'];

        /**
         *
         * Fires before downloading file
         *
         * @since 1.1.7
         * 
         */
        do_action( 'streamtube/core/video/before_download', $file, $filename );

        header('Content-Description: File Transfer');
        header('Content-Type: ' . $filetype['type'] );
        header('Content-Disposition: attachment; filename=' . $filename ); 
        header('Content-Transfer-Encoding: binary');
        header('Connection: Keep-Alive');
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        header('Content-Length: ' . filesize( $file ) );

        ob_clean();
        flush();
        readfile($file);
        exit();
    }

    /**
     *
     * The Download button template
     * 
     */
    public function button_download(){

        if( ! $this->can_user_download() || ! $this->is_downloadable() ){
            return false;
        }

        $settings = $this->get_settings();

        $settings['file_url'] = $this->get_file_url();

        if( ! $settings['file_url'] ){
            return false;
        }

        streamtube_core_load_template( 'video/button-download.php', true, $settings );
    }
}
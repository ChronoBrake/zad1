<?php
// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Define the rest functionality.
 *
 * @since      1.0.6
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */
class StreamTube_Core_Generate_Image_Rest_Controller extends StreamTube_Core_Rest_API{

    protected $path     =   '/generate-image';

    /**
     * @since 1.0.6
     */
    public function rest_api_init(){

        register_rest_route(
            "{$this->namespace}{$this->version}",
            $this->path,
            array(
                'methods'   =>  WP_REST_Server::CREATABLE,
                'callback'  =>  array( $this , 'create_item' ),
                'args'      =>  array(
                    'mediaid' =>  array(
                        'validate_callback' => function( $param, $request, $key ) {
                            return is_numeric( $param ) || is_string( $param );
                        }
                    ),
                    'parent'    =>  array(
                        'validate_callback' => function( $param, $request, $key ) {
                            return is_numeric( $param ) && get_post_type( $param ) == 'video';
                        }
                    )
                ),
                'permission_callback'   =>  function( $request ){
                    return current_user_can( 'edit_others_posts' );
                }
            )
        );      
    }

    /**
     *
     * Create item
     * 
     * @param  WP_Rest_Request $request
     * @since 1.0.6
     */
    public function create_item( $request ){
         if( wp_attachment_is( 'video', $request['mediaid'] ) ){
            return $this->generate_image_from_file( $request['mediaid'], $request );
        }
        else{
            return $this->generate_image_from_url( $request['mediaid'], $request );
        }
    }

    /**
     *
     * Generate thumbnail from given attachment
     * 
     * @param  int $attachment_id
     *
     * @since 1.0.6
     * 
     */
    private function generate_image_from_file( $attachment_id, $request ){

        $bunnycdn = streamtube_core()->get()->bunnycdn;

        if( $bunnycdn->settings['is_connected'] ){

            if( ! function_exists( 'media_sideload_image' ) ){
                require_once(ABSPATH . 'wp-admin/includes/media.php');
                require_once(ABSPATH . 'wp-admin/includes/file.php');
                require_once(ABSPATH . 'wp-admin/includes/image.php');
            }

            $thumbnail_url = $bunnycdn->bunnyAPI->get_video_thumbnail_url( $bunnycdn->get_video_guid( $attachment_id ) );

            $thumbnail_id = media_sideload_image( $thumbnail_url, $attachment_id, null, 'id' );

            if( is_wp_error(  $thumbnail_id ) ){
                wp_send_json_error( $thumbnail_id );
            }else{
                set_post_thumbnail( $attachment_id, $thumbnail_id );
                if( $request['parent'] ){
                    set_post_thumbnail( $request['parent'], $thumbnail_id );
                }
                wp_send_json_success( array(
                    'post_id'       =>  $request['parent'],
                    'thumbnail_url' =>  wp_get_attachment_image_url( $thumbnail_id, 'full' )
                ) );                
            }
        }

        if( ! function_exists( 'wp_video_encoder' ) ){
            wp_send_json_error( new WP_Error(
                'encoder_not_found',
                esc_html__( 'Encoder was not found', 'streamtube-core' )
            ) );
        }

        $results = wp_video_encoder()->get()->post->generate_attachment_image( $attachment_id );

        if( is_wp_error( $results ) ){
            wp_send_json_error( $results );
        }

        if( $request['parent'] ){
            set_post_thumbnail( $request['parent'], $results['thumbnail_id'] );
        }

        wp_send_json_success( array_merge( $results, array(
            'post_id'       =>  $request['parent'],
            'thumbnail_url' =>  wp_get_attachment_image_url( $results['thumbnail_id'], 'full' )
        ) ) );
    }

    /**
     *
     * Generate thumbnail image from given URL
     * 
     * @param  string $url
     * @param  object $request
     *
     * 
     */
    private function generate_image_from_url( $url, $request ){

        $results = $this->plugin()->oembed->generate_image( $request['parent'], $url );

        if( is_wp_error( $results ) ){
            wp_send_json_error( $results );
        }

        wp_send_json_success( array_merge( $results, array(
            'thumbnail_url' =>  wp_get_attachment_image_url( $results['thumbnail_id'], 'full' )
        ) ) );
    }
}
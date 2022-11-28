<?php
/**
 * Define the profile functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 * Define the profile functionality
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_oEmbed{

    /**
     * Get plugin objects
     */
    private function plugin(){
        return streamtube_core()->get();
    }	

	/**
	 *
	 * Add oembed providers
	 * 
	 */
	public function add_providers(){
		wp_oembed_add_provider( home_url('/*'), get_oembed_endpoint_url() );
	}

	/**
	 *
	 * Get embed data
	 *
	 * @param  string $url
	 *
	 * @return array|WP_error
	 *
	 * @since 1.0.0
	 * 
	 */
	public function get_data( $url ){

		$oembed_endpoint = _wp_oembed_get_object()->get_provider( $url, array( 'discover' => true ) );

		if( ! $oembed_endpoint ){
			return new WP_Error(
				'endpoint_not_found',
				esc_html__( 'Endpoint not found.', 'streamtube-core' )
			);
		}

		$response = wp_remote_get( add_query_arg( array(
			'url'		=>	$url,
			'format'	=>	'json'
		), $oembed_endpoint ) );

		if( is_wp_error( $response ) ){
			return $response;
		}

		$response = wp_parse_args( json_decode( wp_remote_retrieve_body( $response ), true ), array(
			'title'				=>	'',
			'author_name'		=>	'',
			'author_url'		=>	'',
			'thumbnail_url'		=>	'',
			'provider_name'		=>	'',
			'html'				=>	''
		) );

		if( array_key_exists( 'thumbnail_url', $response ) ){
			// Youtube
			preg_match( '/(youtube.com\/watch\?v=|youtu.be\/|youtube.com\/embed\/)(?P<id>.{11})/', $url, $matches );

			if( $matches ){
				$response['thumbnail_url'] = str_replace( 'hqdefault.jpg', 'maxresdefault.jpg', $response['thumbnail_url'] );

				$check_error = is_wp_error( wp_remote_get( $response['thumbnail_url'] ) );

				if( wp_remote_retrieve_response_code( wp_remote_get( $response['thumbnail_url'] ) ) == 404 ){
					$response['thumbnail_url'] = str_replace( 'maxresdefault.jpg', 'hqdefault.jpg', $response['thumbnail_url'] );
				}
			}
			
			preg_match( '/(vimeo.com\/|\/videos\/)(?P<id>\d+)/', $url, $matches );

			// Vimeo
			if( $matches ){
				$response['thumbnail_url'] = str_replace( 'd_295x166', 'd_720', $response['thumbnail_url'] ) . '.png';
			}
		}

		return $response;
	}

	/**
	 *
	 * Get thumbnail URL
	 * 
	 * @param  string $url
	 * @return string
	 *
	 * @since 1.0.0
	 * 
	 */
	public function get_thumbnail_url( $url ){

		$results = $this->get_data( $url );

		if( is_wp_error( $results ) ){
			return $results;
		}

		if( is_array( $results ) && array_key_exists( 'thumbnail_url' , $results ) ){

			return $results['thumbnail_url'];
		}

		return false;
	}

	/**
	 *
	 * Generate post thumbnail from given source
	 * 
	 * @param  int $post_id
	 * @param  strin $url
	 * @return array|WP_Error
	 *
	 * @since 1.0.6
	 * 
	 */
	public function generate_image( $post_id, $url ){

		if( is_wp_error( $this->plugin()->license->is_verified() ) ){
			return new WP_Error(
				'unverified_version',
				esc_html__( 'Unverified Version', 'streamtube-core' )
			);
		}

		$data = $this->get_data( $url );

		if( is_wp_error( $data ) ){
			return $data;
		}

        if( is_array( $data ) && array_key_exists( 'thumbnail_url', $data ) ){

        	if( ! function_exists( 'media_sideload_image' ) ){
				require_once(ABSPATH . 'wp-admin/includes/media.php');
				require_once(ABSPATH . 'wp-admin/includes/file.php');
				require_once(ABSPATH . 'wp-admin/includes/image.php');        		
        	}

            $thumbnail_id = media_sideload_image( $data['thumbnail_url'], $post_id, null, 'id' );

            if( is_wp_error(  $thumbnail_id ) ){
            	return $thumbnail_id;
            }

            if( is_int( $thumbnail_id ) ){
                set_post_thumbnail( $post_id, $thumbnail_id );

                wp_update_post( array(
                    'ID'            =>  $thumbnail_id,
                    'post_parent'   =>  $post_id
                ) );
            }       

            return compact( 'post_id', 'thumbnail_id', 'url' );    
        }

        return new WP_Error( 
        	'undefined_error',
        	esc_html__( 'Undefined Error', 'streamtube-core' )
        );
	}
}
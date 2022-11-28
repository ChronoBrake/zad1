<?php
/**
 * Define the video functionality
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

class Streamtube_Core_Video {

	/**
	 *
	 * Filter video embed url
	 * 
	 * @param  string $embed_url
	 * @param  object $post
	 * @return string
	 *
	 * @since 1.0.0
	 * 
	 */
	public function filer_embed_url( $embed_url, $post ){
		return $embed_url;
	}

	/**
	 *
	 * Filter the embed html
	 * 
	 * @param  string $output
	 * @param  object $post
	 * @param  int $width
	 * @param  int $height
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function filter_embed_html( $output, $post, $width, $height ){

		if( $post->post_type == Streamtube_Core_Post::CPT_VIDEO ){

			$embed_url = get_post_embed_url( $post );

			if( did_action( 'streamtube/playlist/first_post/loaded' ) ){
				$embed_url = add_query_arg( array( 'logo' => '0' ), $embed_url );
			}

			$attrs = array(
				'width'				=>	$width,
				'height'			=>	$height,
				'src'				=>	$embed_url,
				'allow'				=>	'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen'
			);

			/**
			 *
			 * Filter the embed iframe attributes
			 * 
			 * @param  object $post
			 * @param  int $width
			 * @param  int $height
			 * @return string
			 *
			 * @since  1.0.0
			 * 
			 */
			$attrs = apply_filters( 'streamtube_core_video_embed_iframe_attrs', $attrs, $post, $width, $height );

			if( ! $attrs ){
				return $output;
			}

			$_attrs = array();

			foreach ( $attrs as $attr => $value ) {
				$_attrs[] = sprintf( '%s="%s"', $attr, esc_attr( $value ) );
			}

			$output = sprintf(
				'<iframe %s></iframe>',
				join( ' ', $_attrs )
			);
		}

		return $output;
	}

	/**
	 * Convert rich to video type
	 */
	public function filter_embed_type( $data, $post, $width, $height ){
		if( $post->post_type == Streamtube_Core_Post::CPT_VIDEO ){
			$data['type'] = 'video';
		}
		return $data;
	}

	/**
	 *
	 * Load the share button
	 * 
	 * @since 1.0.0
	 */
	public function load_button_share(){

		if( ! get_option( 'button_share', 'on' ) ){
			return;
		}

		load_template( streamtube_core_get_template( 'video/button-share.php' ) );
	}

	/**
	 *
	 * Load the share modal
	 * 
	 * @since 1.0.0
	 */
	public function load_modal_share(){

		if( ! get_option( 'button_share', 'on' ) ){
			return;
		}
		
		load_template( streamtube_core_get_template( 'video/modal-share.php' ) );
	}

	/**
	 *
	 * Load the Report button
	 * 
	 * @since 1.0.0
	 */
	public function load_button_report(){

		if( ! get_option( 'button_report' ) ){
			return;
		}

		load_template( streamtube_core_get_template( 'video/button-report.php' ) );
	}

	/**
	 *
	 * Load the report modal
	 * 
	 * @since 1.0.0
	 */
	public function load_modal_report(){

		if( ! get_option( 'button_report' ) ){
			return;
		}
		
		load_template( streamtube_core_get_template( 'video/modal-report.php' ) );
	}	

	/**
	 *
	 * Load single video post date 
	 * 
	 * @since 1.0.8
	 * 
	 */
	public function load_single_post_date(){
		get_template_part( 'template-parts/post-date', get_option( 'single_video_date_format', 'diff' ) );
	}

	/**
	 *
	 * Load single video post comment count
	 * 
	 * @since 1.0.8
	 * 
	 */
	public function load_single_post_comment_count(){

		if( ! get_option( 'single_video_comment_count', 'on' ) ){
			return;
		}

		get_template_part( 'template-parts/post-comment', null, array( 'text' => true ) );
	}

	/**
	 *
	 * Load single video terms
	 * 
	 * @since 1.0.8
	 * 
	 */
	public function load_single_post_terms(){

		if( ! get_option( 'single_video_categories', 'on' ) ){
			return;
		}
				
		get_template_part( 'template-parts/post-term', null, array(
            'taxonomy'  =>  'categories'
        ) );
	}
}
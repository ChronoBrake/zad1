<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Taxonomy {

	const TAX_CATEGORY 	= 'categories';		

	const TAX_TAG 		= 'video_tag';		

	const TAX_REPORT	= 'report_category';

	/**
	 *
	 * Video Category taxonomy
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function video_category(){
		$labels = array(
			"name" 									=> esc_html__( "Video Categories", "streamtube-core" ),
			"singular_name" 						=> esc_html__( "Video Category", "streamtube-core" ),
		);

		$args = array(
			"label" 								=> esc_html__( "Video Categories", "streamtube-core" ),
			"labels" 								=> $labels,
			"public" 								=> true,
			"publicly_queryable" 					=> true,
			"hierarchical" 							=> true,
			"show_ui" 								=> true,
			"show_in_menu" 							=> true,
			"show_in_nav_menus" 					=> true,
			"query_var" 							=> true,
			"rewrite" 								=> array(
				'slug' 			=> self::TAX_CATEGORY, 
				'with_front' 	=> true,  
				'hierarchical' 	=> true
			),
			"show_admin_column" 					=> true,
			"show_in_rest" 							=> false,
			"rest_base" 							=> "video_category",
			"rest_controller_class" 				=> "WP_REST_Terms_Controller",
			"show_in_quick_edit" 					=> true,
		);

		register_taxonomy( self::TAX_CATEGORY, array( 'video' ), $args );		
	}

	/**
	 *
	 * Video Tag taxonomy
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function video_tag(){

		$labels = array(
			"name" 									=> esc_html__( "Video Tags", "streamtube-core" ),
			"singular_name" 						=> esc_html__( "Video Tag", "streamtube-core" ),
		);

		$args = array(
			"label" 								=> esc_html__( "Video Tags", "streamtube-core" ),
			"labels" 								=> $labels,
			"public" 								=> true,
			"publicly_queryable" 					=> true,
			"hierarchical" 							=> false,
			"show_ui" 								=> true,
			"show_in_menu" 							=> true,
			"show_in_nav_menus" 					=> true,
			"query_var" 							=> true,
			"rewrite" 								=> array(
				'slug' 			=> self::TAX_TAG, 
				'with_front' 	=> true
			),
			"show_admin_column" 					=> true,
			"show_in_rest" 							=> false,
			"rest_base" 							=> "video_tag",
			"rest_controller_class"					=> "WP_REST_Terms_Controller",
			"show_in_quick_edit" 					=> true,
		);

		register_taxonomy( self::TAX_TAG, array( 'video' ), $args );
	}

	/**
	 *
	 * report_category taxonomy
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function report_category(){
		$labels = array(
			"name" 									=> esc_html__( "Report Categories", "streamtube-core" ),
			"singular_name" 						=> esc_html__( "Report Category", "streamtube-core" ),
		);

		$args = array(
			"label" 								=> esc_html__( "Report Category", "streamtube-core" ),
			"labels" 								=> $labels,
			"public" 								=> true,
			"publicly_queryable" 					=> true,
			"hierarchical" 							=> true,
			"show_ui" 								=> true,
			"show_in_menu" 							=> true,
			"show_in_nav_menus" 					=> true,
			"query_var" 							=> true,
			"rewrite" 								=> array(
				'slug' 			=> self::TAX_REPORT, 
				'with_front' 	=> true,  
				'hierarchical' 	=> true
			),
			"show_admin_column" 					=> true,
			"show_in_rest" 							=> false,
			"rest_base" 							=> "report_category",
			"rest_controller_class" 				=> "WP_REST_Terms_Controller",
			"show_in_quick_edit" 					=> true,
		);

		register_taxonomy( self::TAX_REPORT, array( 'video' ), $args );
	}	

	/**
	 *
	 * Search terms
	 * 
	 */
	public function search_terms(){

		check_ajax_referer( '_wpnonce' );

		$request = wp_parse_args( $_GET, array(
			'taxonomy'		=>	self::TAX_TAG,
			'responseType'	=>	'',
			's'				=>	''
		) );

		$terms = get_terms( array(
			'taxonomy'		=>	$request['taxonomy'],
			'hide_empty'	=>	false,
			'orderby'		=>	'name',
			'number'		=>	20,
			'search'		=>	$request['s']
		) );

		if( $request['responseType'] == 'select2' ){
			$results = array();

			if( $terms ){
				foreach( $terms as $term ){
					$results[] = array(
						'id'	=>	$term->term_id,
						'text'	=>	sprintf( '(#%1$s) %2$s', $term->term_id, $term->name )
					);
				}
			}

			wp_send_json_success( array(
				'results'	=>	$results,
				'pagination'	=>	array(
					'more'	=>	true
				)
			) );
		}

		wp_send_json_success( $terms );
	}

	/**
	 *
	 * Get term thumbnail image URL
	 * 
	 * @param  int $term_id
	 * @return string
	 *
	 * @since 2.2.1
	 * 
	 */
	public function get_thumbnail_url( $term_id, $size = 'medium' ){
		$thumbnail = get_term_meta( $term_id, 'thumbnail_id', true );

		if( wp_attachment_is_image( $thumbnail ) ){
			$thumbnail = wp_get_attachment_image_url( $thumbnail, $size );
		}

		return $thumbnail;
	}

	/**
	 *
	 * Add thumbnail field
	 * 
	 * @param string $taxonomy
	 *
	 * @since 2.2.1
	 * 
	 */
	public function add_thumbnail_field( $taxonomy ){

		wp_enqueue_media();

		?>
		<div class="form-field term-field-wrap">
			<div class="metabox-wrap">
				<label for="thumbnail_id">
					<?php esc_html_e( 'Thumbnail Image', 'streamtube-core' ); ?>
				</label>

				<div class="field-group">
					<button type="button" class="button-upload button-image w-100" data-media-type="image" data-media-source="url">
	                </button>

	                <?php printf(
	                	'<input class="input-field" name="tax_meta[thumbnail_id]" id="thumbnail_id" type="text" value="%s" placeholder="%s">',
	                	'',
	                	esc_attr__( 'Thumbnail Image ID/URL', 'streamtube-core' )
	                )?>
				</div>
			</div>
		</div>
		<?php	

		wp_nonce_field( 'update_thumbnail_image', 'update_thumbnail_image' );
	}

	/**
	 *
	 * Add thumbnail field
	 * 
	 * @param string $taxonomy
	 *
	 * @since 2.2.1
	 * 
	 */
	public function edit_thumbnail_field( $term ){

		wp_enqueue_media();

		$thumbnail_url = $this->get_thumbnail_url( $term->term_id, 'large' );
		?>

		<tr class="form-field term-description-wrap">
			<th scope="row">
				<label for="thumbnail_id">
					<?php esc_html_e( 'Thumbnail Image', 'streamtube-core' ); ?>
				</label>				
			</th>

			<td>
				<div class="form-field term-field-wrap">
					<div class="metabox-wrap">
						<div class="field-group">
							<button type="button" class="button-upload button-image w-100" data-media-type="image" data-media-source="url">

								<?php if( $thumbnail_url ){
									printf(
										'<img src="%s">',
										esc_url( $thumbnail_url )
									);
								}?>

			                </button>

			                <?php printf(
			                	'<input class="input-field" name="tax_meta[thumbnail_id]" id="thumbnail_id" type="text" value="%s" placeholder="%s">',
			                	get_term_meta( $term->term_id, 'thumbnail_id', true ),
			                	esc_attr__( 'Thumbnail Image ID/URL', 'streamtube-core' )
			                )?>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<?php	

		wp_nonce_field( 'update_thumbnail_image', 'update_thumbnail_image' );
	}	

	/**
	 *
	 * Update thumbnail image
	 * 
	 * @param  int $term
	 * @param  string $taxonomy
	 *
	 * @since 2.2.1
	 * 
	 */
	public function update_thumbnail_field( $term ){

		if( ! current_user_can( 'administrator' ) ){
			return;
		}

		if( ! isset( $_POST['update_thumbnail_image'] ) ){
			return;
		}

		if( ! wp_verify_nonce( $_POST['update_thumbnail_image'], 'update_thumbnail_image' ) ){
			return;
		}

		if( isset( $_POST['tax_meta'] ) ){
			$tax_meta = wp_unslash( $_POST['tax_meta'] );

			foreach ( $tax_meta as $key => $value ) {

				$value = sanitize_text_field( $value );

				if( $key == 'thumbnail_id' ){
					if( ! wp_attachment_is_image( $value ) ){
						$maybe_attachment_id = attachment_url_to_postid( $value );

						if( wp_attachment_is_image( $maybe_attachment_id ) ){
							$value = $maybe_attachment_id;
						}
					}
				}

				update_term_meta( $term, $key, $value );
			}
		}
	}

	/**
	 *
	 * Add Thumbnail column
	 * 
	 * @since 2.2.1
	 */
	public function add_thumbnail_column( $columns ){
		return array_merge( $columns, array(
			'thumbnail'	=>	esc_html__( 'Thumbnail', 'streamtube-core' )
		) );
	}

	/**
	 *
	 * Add Thumbnail content
	 * 
	 * @since 2.2.1
	 */
	public function add_thumbnail_column_content( $content, $column_name, $term_id ){
		if( $column_name == 'thumbnail' ){
			$thumbnail_url = $this->get_thumbnail_url( $term_id );

			if( $thumbnail_url ){

				$content = sprintf(
					'<div class="ratio-16x9"><img src="%s"></div>',
					esc_url( $thumbnail_url )
				);

			}
		}

		return $content;
	}
}
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
				'slug' 			=> sanitize_key( get_option( 'taxonomy_' . self::TAX_CATEGORY . '_slug', self::TAX_CATEGORY ) ), 
				'with_front' 	=> true,  
				'hierarchical' 	=> true
			),
			"show_admin_column" 					=> true,
			"show_in_rest" 							=> false,
			"rest_base" 							=> self::TAX_CATEGORY,
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
				'slug' 			=> sanitize_key( get_option( 'taxonomy_' . self::TAX_TAG . '_slug', self::TAX_TAG ) ), 
				'with_front' 	=> true
			),
			"show_admin_column" 					=> true,
			"show_in_rest" 							=> false,
			"rest_base" 							=> self::TAX_TAG,
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
			"name" 									=> esc_html__( "Reports", "streamtube-core" ),
			"singular_name" 						=> esc_html__( "Report", "streamtube-core" ),
		);

		$args = array(
			"label" 								=> esc_html__( "Report", "streamtube-core" ),
			"labels" 								=> $labels,
			"public" 								=> false,
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
			"rest_base" 							=> self::TAX_REPORT,
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
	 * Get thumbnail ID
	 * 
	 * @param  WP_Term $term
	 * 
	 */
	public function get_thumbnail_id( $term ){
		return get_term_meta( $term->term_id, 'thumbnail_id', true );
	}

	/**
	 *
	 * Get term thumbnail image URL
	 * 
	 * @param  WP_Term $term
	 * @return string
	 *
	 * @since 2.2.1
	 * 
	 */
	public function get_thumbnail_url( $term, $size = 'large' ){

		if( is_int( $term ) ){
			$term = get_term( $term );
		}

		if( ! $term ){
			return;
		}

		$thumbnail_url = $this->get_thumbnail_id( $term );

		if( wp_http_validate_url( $thumbnail_url ) ){
			return $thumbnail_url;
		}

		if( wp_attachment_is_image( $thumbnail_url ) ){
			$thumbnail_url = wp_get_attachment_image_url( $thumbnail_url, $size );
		}

		/**
		 *
		 * Filter the thumbnail URL
		 *
		 * @param string $thumbnail_url
		 * @param WP_Term $term
		 * @param string $size
		 * 
		 */
		return apply_filters( 'streamtube/core/taxonomy/thumbnail_url', $thumbnail_url, $term, $size );
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
					<?php esc_html_e( 'Featured Image', 'streamtube-core' ); ?>
				</label>

				<div class="field-group field-group-upload">

					<button type="button" class="button-upload button button-secondary" data-media-type="image" data-media-source="url">
						<?php esc_html_e( 'Upload An Image', 'streamtube-core' );?>
	                </button>

	            	<div class="placeholder-image no-image w-100">
	            		<button type="button" class="button button-secondary button-delete">
	            			<span class="dashicons dashicons-no"></span>
	            		</button>
	            	</div>

					<input class="input-field" name="tax_meta[thumbnail_id]" id="thumbnail_id" type="hidden" value="">
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
	public function edit_thumbnail_field( $term, $taxonomy ){

		wp_enqueue_media();

		$thumbnail_url = $this->get_thumbnail_url( $term->term_id, 'large' );
		?>

		<tr class="form-field term-description-wrap">
			<th scope="row">
				<label for="thumbnail_id">
					<?php esc_html_e( 'Featured Image', 'streamtube-core' ); ?>
				</label>				
			</th>

			<td>
				<div class="metabox-wrap">
					<div class="field-group field-group-upload">

						<button type="button" class="button-upload button button-secondary" data-media-type="image" data-media-source="url">
							<?php esc_html_e( 'Upload An Image', 'streamtube-core' );?>
		                </button>

		            	<?php printf(
		            		'<div class="placeholder-image %s w-100">',
		            		! $thumbnail_url ? 'no-image' : ''
		            	);?>
		            		<button type="button" class="button button-secondary button-delete">
		            			<span class="dashicons dashicons-no"></span>
		            		</button>

							<?php if( $thumbnail_url ){
								printf(
									'<img src="%s">',
									esc_url( $thumbnail_url )
								);
							}?>

		            	</div>

						<?php printf(
							'<input class="input-field" name="tax_meta[thumbnail_id]" id="thumbnail_id" type="hidden" value="%s">',
							esc_attr( $thumbnail_url )
						)?>
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
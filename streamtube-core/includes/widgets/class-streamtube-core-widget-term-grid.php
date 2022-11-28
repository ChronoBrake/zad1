<?php
/**
 * Define the custom Term Grid widget functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
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
class Streamtube_Core_Widget_Term_Grid extends WP_Widget{

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::__construct()
	 */
	function __construct(){
	
		parent::__construct( 
			'term-grid-widget' ,
			esc_html__('[StreamTube] Taxonomy Term Grid', 'streamtube-core' ), 
			array( 
				'classname'		=>	'term-grid streamtube-widget', 
				'description'	=>	esc_html__( 'Create a Taxonomy Term Grid widget', 'streamtube-core')
			),
			array(
				'width'	=>	'700px'
			)
		);
	}

	/**
	 * Register this widget
	 */
	public static function register(){
		register_widget( __CLASS__ );
	}

	/**
	 *
	 * Get array of taxonomies
	 * 
	 * @return array
	 */
    public static function get_taxonomies(){
        $options = array();

        $taxonomies = array(
        	'category'			=>	esc_html__( 'Blog Category', 'streamtube-core' ),
        	'categories'		=>	esc_html__( 'Video Category', 'streamtube-core' ),
        	'product_cat'		=>	esc_html__( 'Product Category', 'streamtube-core' )
        );

        /**
         * @since 2.2.1
         */
        $taxonomies = apply_filters( 'streamtube/core/term_grid/taxonomies', $taxonomies );

        foreach ( $taxonomies as $key => $value ) {
        	if( function_exists( 'taxonomy_exists' ) && taxonomy_exists( $key ) ){
        		$options[ $key ] = $value;
        	}
        }

        return $options;
    }  	

    /**
     * Orderby options
     * @return array
     */
    public static function get_orderby(){
    	return array(
            'name'              =>  esc_html__( 'Name', 'streamtube-core' ),
            'slug'              =>  esc_html__( 'Slug', 'streamtube-core' ),
            'term_group'        =>  esc_html__( 'Term Group', 'streamtube-core' ),
            'term_id'           =>  esc_html__( 'Term ID', 'streamtube-core' ),
            'id'                =>  esc_html__( 'ID', 'streamtube-core' ),
            'description'       =>  esc_html__( 'Description', 'streamtube-core' ),
            'parent'            =>  esc_html__( 'Parent', 'streamtube-core' ),
            'count'             =>  esc_html__( 'Count', 'streamtube-core' )
        );
    }

	/**
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public static function get_order(){
		$r = array(
			'ASC'				=>	esc_html__( 'Ascending', 'streamtube-core' ),
			'DESC'				=>	esc_html__( 'Descending (default).', 'streamtube-core' )
		);

		return $r;
	}    

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::widget()
	 */
	public function widget( $args, $instance ) {

		$output = '';

		$instance = wp_parse_args( $instance, array(
			'id'					=>	'',
			'title'					=>	'',
			'taxonomy'				=>	array( 'categories' ),
			'child_of'				=>	'',
			'parent'				=>	'',
			'include'				=>	'',
			'exclude'				=>	'',
			'exclude_tree'			=>	'',
			'childless'				=>	'',			
			'hide_empty'			=>	false,
			'orderby'				=>	'count',
			'order'					=>	'ASC',
			'number'				=>	get_option( 'posts_per_page' ),
			'hide_empty_thumbnail'	=>	'',
			'meta_query'			=>	array(),
			'hierarchical'			=>	false,
			'margin_bottom'			=>	3,
			'col_xxl'				=>	3,
			'col_xl'				=>	3,
			'col_lg'				=>	3,
			'col_md'				=>	2,
			'col_sm'				=>	2,
			'col'					=>	1,
			'slide'					=>	'',
			'slide_rows'			=>	'1',
			'slide_dots'			=>	'',
			'slide_arrows'			=>	'',
			'slide_center_mode'		=>	'',
			'slide_infinite'		=>	'',
			'slide_speed'			=>	'2000',
			'slide_autoplay'		=>	'',
			'slide_autoplaySpeed'	=>	'2000',
			'is_elementor'			=>	''
		) );

		/**
		 *
		 * Assign current widget ID into instance
		 * 
		 */
		if( $this->id ){
			$instance['id'] = $this->id;
		}

		if( $this->id_base ){
			$instance['id_base'] = $this->id_base;
		}		

		$instance['number'] = (int)$instance['number'];

		if( ! $instance['number'] || $instance['number'] == -1 ){
			$instance['number'] = get_option( 'posts_per_page' );
		}

		if( $instance['hide_empty_thumbnail'] ){
			$instance['meta_query'][] = array(
				'key'		=>	'thumbnail_id',
				'compare'	=>	'EXISTS'
			);
		}

		extract( $instance );

		$term_args = compact( 
			'taxonomy', 
			'child_of',
			'parent',
			'include',
			'exclude',
			'exclude_tree',
			'childless',
			'hide_empty', 
			'orderby', 
			'order', 
			'meta_query', 
			'number', 
			'hierarchical' 
		);

		/**
		 * @since 2.2.1
		 */
		$term_args = apply_filters( 'streamtube/core/term_grid/term_args', $term_args, $instance );

		$terms = get_terms( $term_args );

		if( $terms ){

			$row_classes = array( 'row' );

			$row_classes[] = 'row-cols-' 		. $col;
			$row_classes[] = 'row-cols-sm-' 	. $col_sm;
			$row_classes[] = 'row-cols-md-' 	. $col_md;
			$row_classes[] = 'row-cols-lg-' 	. $col_lg;
			$row_classes[] = 'row-cols-xl-' 	. $col_xl;
			$row_classes[] = 'row-cols-xxl-' 	. $col_xxl;			

			if( $slide ){
				$slick = array(
					'slidesToShow'		=>	absint( $col_xxl ),
					'slidesToScroll'	=>	absint( $col_xxl ),
					'responsive'		=>	array(
						array(
							'breakpoint'	=>	1200,
							'settings'		=>	array(
								'slidesToShow'		=>	absint( $col_xl ),
								'slidesToScroll'	=>	absint( $col_xl )
							)
						),
						array(
							'breakpoint'	=>	992,
							'settings'		=>	array(
								'slidesToShow'		=>	absint( $col_lg ),
								'slidesToScroll'	=>	absint( $col_lg )
							)
						),
						array(
							'breakpoint'	=>	768,
							'settings'		=>	array(
								'slidesToShow'		=>	absint( $col_md ),
								'slidesToScroll'	=>	absint( $col_md ),
								'dots'				=>	false,
								'arrows'			=>	true,
								'centerPadding'		=>	'0'
							)
						),
						array(
							'breakpoint'	=>	576,
							'settings'		=>	array(
								'slidesToShow'		=>	absint( $col_sm ),
								'slidesToScroll'	=>	absint( $col_sm ),
								'dots'				=>	false,
								'arrows'			=>	true,
								'centerMode'		=>	false,
								'centerPadding'		=>	'0'								
							)
						),
						array(
							'breakpoint'	=>	500,
							'settings'		=>	array(
								'slidesToShow'		=>	1,
								'slidesToScroll'	=>	1,
								'dots'				=>	false,
								'arrows'			=>	true,
								'centerMode'		=>	false,
								'centerPadding'		=>	'0'
							)
						)
					),
					'arrows'			=>	wp_validate_boolean( $slide_arrows ),
					'dots'				=>	wp_validate_boolean( $slide_dots ),
					'rows'				=>	absint( $slide_rows ),
					'infinite'			=>	wp_validate_boolean( $slide_infinite ),
					'centerMode'		=>	wp_validate_boolean( $slide_center_mode ),
					'speed'				=>	absint( $slide_speed ),
					'autoplay'			=>	wp_validate_boolean( $slide_autoplay ),
					'autoplaySpeed'		=>	absint( $slide_autoplaySpeed ),
					'rtl'				=>	is_rtl() ? true : false
				);
			}


			echo $args['before_widget'];

				if( $title ){
					echo $args['before_title'] . $title . $args['after_title'];
				}

				printf(
					'<div class="term-grid term-%s">',
					is_string( $taxonomy ) ? $taxonomy : join( ' ', $taxonomy )
				);

					printf(
						'<div class="%s" %s>',
						$slide ? 'js-slick post-grid-slick' : join( ' ', $row_classes ),
						$slide ? 'data-slick="'. esc_attr( json_encode( $slick ) ) .'"' : ''
					);

						foreach( $terms as $term ) :

							printf(
								'<div class="term-item term-%s mb-%s">',
								esc_attr( sanitize_html_class( $term->slug ) ),
								esc_attr( $margin_bottom )
							);

							get_template_part( 'template-parts/content/content', 'taxonomy', $term );

							echo '</div><!--.term-item-->';

						endforeach;

					echo '</div><!--.term-grid-->';
				echo '</div><!--.row-->';

			echo $args['after_widget'];

		}

	}	

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::update()
	 */
	public function update( $new_instance, $old_instance ) {
		return $new_instance;
	}

	/**
	 *
	 * The Appearance tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_appearance( $instance ){

		$instance = wp_parse_args( $instance, array(
			'title'					=>	'',
			'number'				=>	get_option( 'posts_per_page' ),
			'hide_empty'			=>	'',
			'hide_empty_thumbnail'	=>	''
		) );

		ob_start();

		?>
		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'title' ) ),
				esc_html__( 'Title', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'title' ) ),
				esc_attr( $this->get_field_name( 'title' ) ),
				esc_attr( $instance['title'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'number' ) ),
				esc_html__( 'Number', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'number' ) ),
				esc_attr( $this->get_field_name( 'number' ) ),
				esc_attr( $instance['number'] )

			);?>
		</div>			

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'hide_empty' ) ),
				esc_attr( $this->get_field_name( 'hide_empty' ) ),
				checked( 'on', $instance['hide_empty'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'hide_empty' ) ),
				esc_html__( 'Hide Empty Terms', 'streamtube-core')

			);?>
			
		</div>		

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'hide_empty_thumbnail' ) ),
				esc_attr( $this->get_field_name( 'hide_empty_thumbnail' ) ),
				checked( 'on', $instance['hide_empty_thumbnail'], false )
			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'hide_empty_thumbnail' ) ),
				esc_html__( 'Hide Empty Thumbnail Terms', 'streamtube-core')
			);?>
			
		</div>

		<?php

		return ob_get_clean();
	}	

	/**
	 *
	 * The layout tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_layout( $instance ){

		$instance = wp_parse_args( $instance, array(
			'margin_bottom'	=>	4,
			'col_xxl'		=>	4,
			'col_xl'		=>	4,
			'col_lg'		=>	2,
			'col_md'		=>	2,
			'col_sm'		=>	1,
			'col'			=>	1
		) );

		ob_start();

		?>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'margin_bottom' ) ),
				esc_html__( 'Margin Bottom', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'margin_bottom' ) ),
				esc_attr( $this->get_field_name( 'margin_bottom' ) ),
				esc_attr( $instance['margin_bottom'] )

			);?>
		</div>	

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col_xxl' ) ),
				esc_html__( 'Extra extra large ≥1400px', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'col_xxl' ) ),
				esc_attr( $this->get_field_name( 'col_xxl' ) ),
				esc_attr( $instance['col_xxl'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col_xl' ) ),
				esc_html__( 'Extra large ≥1200px', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'col_xl' ) ),
				esc_attr( $this->get_field_name( 'col_xl' ) ),
				esc_attr( $instance['col_xl'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col_lg' ) ),
				esc_html__( 'Large ≥992px', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'col_lg' ) ),
				esc_attr( $this->get_field_name( 'col_lg' ) ),
				esc_attr( $instance['col_lg'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col_md' ) ),
				esc_html__( 'Medium ≥768px', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'col_md' ) ),
				esc_attr( $this->get_field_name( 'col_md' ) ),
				esc_attr( $instance['col_md'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col_sm' ) ),
				esc_html__( 'Small ≥576px', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'col_sm' ) ),
				esc_attr( $this->get_field_name( 'col_sm' ) ),
				esc_attr( $instance['col_sm'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col' ) ),
				esc_html__( 'Extra small <576px', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'col' ) ),
				esc_attr( $this->get_field_name( 'col' ) ),
				esc_attr( $instance['col'] )

			);?>
		</div>
		<?php

		return ob_get_clean();
	}

	/**
	 *
	 * The slide tab
	 * 
	 * @param  array $instance
	 *
	 * @since 1.0.0
	 * 
	 */
	private function tab_slide( $instance ){
		$instance = wp_parse_args( $instance, array(
			'slide'					=>	'',
			'slide_rows'			=>	'1',
			'slide_arrows'			=>	'',
			'slide_center_mode'		=>	'',
			'slide_infinite'		=>	'',
			'slide_speed'			=>	'2000',
			'slide_autoplay'		=>	'',
			'slide_autoplaySpeed'	=>	'2000'
		) );

		ob_start();
		?>
		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'slide' ) ),
				esc_attr( $this->get_field_name( 'slide' ) ),
				checked( 'on', $instance['slide'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide' ) ),
				esc_html__( 'Enable sliding', 'streamtube-core')

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_rows' ) ),
				esc_html__( 'Rows', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'slide_rows' ) ),
				esc_attr( $this->get_field_name( 'slide_rows' ) ),
				esc_attr( $instance['slide_rows'] )

			);?>
		</div>

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'slide_arrows' ) ),
				esc_attr( $this->get_field_name( 'slide_arrows' ) ),
				checked( 'on', $instance['slide_arrows'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_arrows' ) ),
				esc_html__( 'Show Prev/Next Arrows', 'streamtube-core')

			);?>
		</div>

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'slide_center_mode' ) ),
				esc_attr( $this->get_field_name( 'slide_center_mode' ) ),
				checked( 'on', $instance['slide_center_mode'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_center_mode' ) ),
				esc_html__( 'Center mode', 'streamtube-core')

			);?>
		</div>

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'slide_infinite' ) ),
				esc_attr( $this->get_field_name( 'slide_infinite' ) ),
				checked( 'on', $instance['slide_infinite'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_infinite' ) ),
				esc_html__( 'Infinite Loop Sliding', 'streamtube-core')

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_speed' ) ),
				esc_html__( 'Speed', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'slide_speed' ) ),
				esc_attr( $this->get_field_name( 'slide_speed' ) ),
				esc_attr( $instance['slide_speed'] )
			);?>

			<span class="field-help">
				<?php esc_html_e( 'Slide Animation Speed', 'streamtube-core' ); ?>
			</span>
		</div>		

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'slide_autoplay' ) ),
				esc_attr( $this->get_field_name( 'slide_autoplay' ) ),
				checked( 'on', $instance['slide_autoplay'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_autoplay' ) ),
				esc_html__( 'Enables Autoplay', 'streamtube-core')

			);?>
		</div>
		
		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_autoplaySpeed' ) ),
				esc_html__( 'Autoplay Speed', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'slide_autoplaySpeed' ) ),
				esc_attr( $this->get_field_name( 'slide_autoplaySpeed' ) ),
				esc_attr( $instance['slide_autoplaySpeed'] )
			);?>

			<span class="field-help">
				<?php esc_html_e( 'Autoplay Speed in milliseconds', 'streamtube-core' ); ?>
			</span>
		</div>	
		<?php
		return ob_get_clean();
	}

	/**
	 *
	 * The Data source tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_data_source( $instance ){

		$instance = wp_parse_args( $instance, array(
			'taxonomy'				=>	array( 'categories' ),
			'child_of'				=>	'',
			'parent'				=>	'',
			'include'				=>	'',
			'exclude'				=>	'',
			'exclude_tree'			=>	'',
			'childless'				=>	''
		) );

		if( is_string( $instance['taxonomy'] ) ){
			$instance['taxonomy'] = array();
		}

		ob_start();

		?>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'taxonomy' ) ),
				esc_html__( 'Taxonomies', 'streamtube-core')

			);?>
			
			<?php
			printf(
				'<select multiple="multiple" class="widefat select-select2" id="%s" name="%s" data-placeholder="%s">',
				esc_attr( $this->get_field_id( 'taxonomy' ) ),
				esc_attr( $this->get_field_name( 'taxonomy[]' ) ),
				esc_html__( 'Select', 'streamtube' )
			);?>

				<?php
				foreach( self::get_taxonomies() as $term => $label ):
					printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $term ),
						in_array( $term , $instance['taxonomy'] ) ? 'selected' : '',
						esc_html( $label )
					);
				endforeach;
				?>

			</select>

		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'child_of' ) ),
				esc_html__( 'Child Of', 'streamtube-core')
			);?>

			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'child_of' ) ),
				esc_attr( $this->get_field_name( 'child_of' ) ),
				$instance['child_of']
			);?>
			<span class="field-help">
				<?php esc_html_e( 'Term ID to retrieve child terms of.', 'streamtube-core' );?>
			</span>			
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'parent' ) ),
				esc_html__( 'Parent Term ID.', 'streamtube-core')

			);?>			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'parent' ) ),
				esc_attr( $this->get_field_name( 'parent' ) ),
				$instance['parent']
			);?>
			<span class="field-help">
				<?php esc_html_e( 'Parent term ID to retrieve direct-child terms of.', 'streamtube-core' );?>
			</span>				
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'include' ) ),
				esc_html__( 'Include.', 'streamtube-core')

			);?>

			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'include' ) ),
				esc_attr( $this->get_field_name( 'include' ) ),
				$instance['include']

			);?>

			<span class="field-help">
				<?php esc_html_e( 'Comma/space-separated string of term IDs to include.', 'streamtube-core' );?>
			</span>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'exclude' ) ),
				esc_html__( 'Exclude.', 'streamtube-core')

			);?>			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'exclude' ) ),
				esc_attr( $this->get_field_name( 'exclude' ) ),
				$instance['exclude']

			);?>

			<span class="field-help">
				<?php esc_html_e( 'Comma/space-separated string of term IDs to exclude.', 'streamtube-core' );?>
			</span>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'exclude_tree' ) ),
				esc_html__( 'Exclude Tree.', 'streamtube-core')

			);?>			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'exclude_tree' ) ),
				esc_attr( $this->get_field_name( 'exclude_tree' ) ),
				$instance['exclude_tree']

			);?>

			<span class="field-help">
				<?php esc_html_e( 'Comma/space-separated string of term IDs to exclude along with all of their descendant terms.', 'streamtube-core' );?>
			</span>
		</div>

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'childless' ) ),
				esc_attr( $this->get_field_name( 'childless' ) ),
				checked( $instance['childless'], 'on', false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'childless' ) ),
				esc_html__( 'Childless', 'streamtube-core')

			);?>

			<span class="field-help">
				<?php esc_html_e( 'Limit results to terms that have no children.', 'streamtube-core' );?>
			</span>
		</div>
		<?php

		return ob_get_clean();
	}		

	/**
	 *
	 * The Order tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_order( $instance ){
		$instance = wp_parse_args( $instance, array(
			'orderby'	=>	'name',
			'order'		=>	'DESC'
		));

		ob_start();		

		?>
		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'orderby' ) ),
				esc_html__( 'Order by', 'streamtube-core')

			);?>

			<?php printf(
				'<select class="widefat" id="%s" name="%s" />',
				esc_attr( $this->get_field_id( 'orderby' ) ),
				esc_attr( $this->get_field_name( 'orderby' ) )

			);?>

				<?php foreach( self::get_orderby() as $orderby => $orderby_text ):?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $orderby ),
						selected( $instance['orderby'], $orderby, false ),
						esc_html( $orderby_text )
					);?>

				<?php endforeach;?>


			</select><!-- end <?php echo $this->get_field_id( 'orderby' );?> -->
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'order' ) ),
				esc_html__( 'Order', 'streamtube-core')

			);?>

			<?php printf(
				'<select class="widefat" id="%s" name="%s" />',
				esc_attr( $this->get_field_id( 'order' ) ),
				esc_attr( $this->get_field_name( 'order' ) )

			);?>

				<?php foreach( self::get_order() as $order => $order_text ):?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $orderby ),
						selected( $instance['order'], $order, false ),
						esc_html( $order_text )
					);?>

				<?php endforeach;?>


			</select><!-- end <?php echo $this->get_field_id( 'order' );?> -->
		</div>		
		<?php

		return ob_get_clean();
	}	

	/**
	 *
	 * Get the tabs
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tabs(){

		$tabs = array();

		$tabs['appearance'] = array(
			'title'		=>	esc_html__( 'Appearance', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_appearance' )
		);

		$tabs['layout'] = array(
			'title'		=>	esc_html__( 'Layout', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_layout' )
		);

		$tabs['slide'] = array(
			'title'		=>	esc_html__( 'Slide', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_slide' )
		);		

		$tabs['data-source'] = array(
			'title'		=>	esc_html__( 'Data Source', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_data_source' )
		);

		$tabs['order'] = array(
			'title'		=>	esc_html__( 'Order', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_order' )
		);

		return $tabs;

	}	

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::form()
	 */
	public function form( $instance ){

		wp_enqueue_style( 'select2' );
		wp_enqueue_script( 'select2' );

		$instance = wp_parse_args( $instance, array(
			'tab'	=>	'appearance'
		) );

		$tabs = $this->tabs();

		echo '<div class="streamtube-widget-content">';

			echo '<ul class="nav nav-tabs widget-tabs">';

				foreach ( $tabs as $tab => $value ):

					printf(
						'<li class="nav-item" role="presentation">
							<a class="nav-link %s" id="%2$s-tab" href="#%2$s">%3$s</a>
						</li>',
						$instance['tab'] == $tab ? 'active' : '',
						esc_attr( $tab ),
						esc_html( $value['title'] )
					);

				endforeach;

			echo '</ul>';


			echo '<div class="tab-content widget-tab-content">';

				foreach ( $tabs as $tab => $value ):

					printf(
						'<div class="tab-pane %s" id="%s">%s</div>',
						$instance['tab'] == $tab ? 'active' : '',
						esc_attr( $tab ),
						call_user_func( $value['callback'], $instance )

					);

				endforeach;

				printf(
					'<input class="current-tab" type="hidden" id="%s" name="%s" value="%s" />',
					esc_attr( $this->get_field_id( 'tab' ) ),
					esc_attr( $this->get_field_name( 'tab' ) ),
					esc_attr( $instance['tab'] )

				);

			echo '</div><!--.tab-content-->';

			?>
			<script type="text/javascript">
				jQuery(function () {
					jQuery( '.select-select2' ).select2();
				});
			</script>
			<?php

		echo '</div><!--.streamtube-widget-content-->';

	}
}
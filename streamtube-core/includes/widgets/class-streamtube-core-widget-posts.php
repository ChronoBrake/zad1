<?php
/**
 * Define the custom posts widget functionality
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
class Streamtube_Core_Widget_Posts extends WP_Widget{

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::__construct()
	 */
	function __construct(){
	
		parent::__construct( 
			'posts-widget' ,
			esc_html__('[StreamTube] Posts', 'streamtube-core' ), 
			array( 
				'classname'		=>	'posts-widget streamtube-widget', 
				'description'	=>	esc_html__('[StreamTube] Posts', 'streamtube-core')
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
	 * do AJAX load more posts
	 * 
	 * @since 1.0.0
	 * 
	 */
	public static function ajax_load_more_posts(){

		check_ajax_referer( '_wpnonce' );

		if( ! isset( $_POST['data'] ) ){
			wp_send_json_error( array(
				'code'		=>	'no_data',
				'message'	=>	esc_html__( 'Invalid Request', 'streamtube-core' )
			) );
		}

		$data = json_decode( wp_unslash( $_POST['data'] ), true );

		$data = wp_parse_args( $data, array(
			'paged'		=>	1,
		) );

		$data['paged'] = (int)$data['paged']+1;

		ob_start();

		the_widget( __CLASS__, array_merge( $data, array( 
			'title'				=> false,
			'paged' 			=> $data['paged'],
			'container'			=> false,
			'not_found_text'	=> ''
		) ), array() );

		$output = ob_get_clean();

		wp_send_json_success( array(
			'message'	=>	esc_html__( 'OK', 'streamtube-core' ),
			'data'		=>	json_encode( $data ),
			'output'	=>	trim( $output )
		) );

	}	

	/**
	 *
	 * Validate comment compare
	 * 
	 * @param  string $compare
	 * @return true|false
	 *
	 * @since  1.0.0
	 * 
	 */
	private function valid_comment_compare( $compare = '=' ){
		return in_array( $compare, array( '=', '!=', '>', '>=', '<', '<=' ) ) ? true : false;
	}

	/**
	 *
	 * Validate taxonomy operator
	 * 
	 * @param  string $operator
	 * @return true|false
	 *
	 * @since  1.0.0
	 * 
	 */
	private function valid_tax_query_operator( $operator = 'IN' ){
		return in_array( $operator, $this->get_tax_query_operator() ) ? true : false;
	}	

	/**
	 *
	 * Tax query operator
	 * 
	 * @since  1.0.0
	 */
	private function get_tax_query_operator(){
		return array( 'IN', 'NOT IN', 'AND', 'EXISTS', 'NOT EXISTS' );
	}	

	/**
	 *
	 * build grid item classes
	 * 
	 * @param  array $instance
	 * @return array
	 */
	private function build_grid_classes( $instance ){

		return streamtube_core_build_grid_classes( $instance );
	}

	/**
	 *
	 * Parse widget title
	 * 
	 * @param  string $title
	 * @return string $parsed_title
	 *
	 * @since  1.0.0
	 * 
	 */
	private function parse_widget_title( $title = '' ){

		if( ! $title ){
			return;
		}

		return do_shortcode( $title );
	}

	/**
	 *
	 * Yes/No options
	 * 
	 * @return array
	 */
	public static function get_yes_no(){
		return array(
			'true'	=>	esc_html__( 'Yes', 'streamtube-core' ),
			'false'	=>	esc_html__( 'No', 'streamtube-core' )
		);
	}

	/**
	 *
	 * Title Size options
	 * 
	 * @return array
	 */
	public static function get_title_sizes(){
		return array(
            ''      =>  esc_html__( 'Default', 'streamtube-core' ),
            'md'    =>  esc_html__( 'Medium', 'streamtube-core' ),
            'lg'    =>  esc_html__( 'Large', 'streamtube-core' ),
            'xl'    =>  esc_html__( 'Extra Large', 'streamtube-core' ),
            'xxl'   =>  esc_html__( 'Extra Extra Large', 'streamtube-core' )
		);
	}

	/**
	 *
	 * Get default supported post types
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public static function get_post_types(){
		$r = array(
			'post'		=>	esc_html__( 'Post', 'streamtube-core' ),
			'video'		=>	esc_html__( 'Video', 'streamtube-core' )
		);

		if( function_exists( 'WC' ) ){
			$r['product'] = esc_html__( 'Product', 'streamtube-core' );
		}

		if( function_exists( 'bbpress' ) ){
			$r = array_merge( $r, array(
				'topic'	=>	esc_html__( 'Topic', 'streamtube-core' ),
				'reply'	=>	esc_html__( 'Reply', 'streamtube-core' )
			) );
		}

		return apply_filters( 'streamtube/core/widget/posts/post_types', $r );
	}

	/**
	 *
	 * Get default supported live statuses
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public static function get_live_statuses(){
		$r = array(
			'connected'		=>	esc_html__( 'Connected', 'streamtube-core' ),
			'disconnected'	=>	esc_html__( 'Disconnected', 'streamtube-core' ),
			'close'			=>	esc_html__( 'Closed', 'streamtube-core' )
		);

		return $r;		
	}	

	/**
	 *
	 * Get default supported post statuses
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public static function get_post_statuses(){
		$r = array(
			'publish'	=>	esc_html__( 'Publish', 'streamtube-core' ),
			'pending'	=>	esc_html__( 'Pending', 'streamtube-core' ),
			'private'	=>	esc_html__( 'Private', 'streamtube-core' ),
			'any'		=>	esc_html__( 'Any', 'streamtube-core' )
		);

		return $r;		
	}

	/**
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public static function get_orderby(){
		return streamtube_core_get_orderby_options();
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
	 *
	 * get the pagination types
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public static function get_pagination_types(){
		return array(
			''			=>	esc_html__( 'None', 'streamtube-core' ),
			'numbers'	=>	esc_html__( 'Numbers', 'streamtube-core' ),
			'scroll'	=>	esc_html__( 'Load on scroll', 'streamtube-core' ),
			'click'		=>	esc_html__( 'Load on click', 'streamtube-core' )
		);
	}

	public static function get_image_ratio(){
		return array(
			'default'	=> esc_html__( 'Default', 'streamtube-core' ),	
			'16x9'		=> esc_html__( 'Landscape', 'streamtube-core' ),
			'9x16'		=> esc_html__( 'Portrait', 'streamtube-core' )
		);
	}

	public static function get_avatar_sizes(){
		return array(
			'sm'	=>	esc_html__( 'Small', 'streamtube-core' ),
			'md'	=>	esc_html__( 'Medium', 'streamtube-core' ),
			'lg'	=>	esc_html__( 'Large', 'streamtube-core' ),
		);		
	}

	public static function get_date_formats(){
		return array(
			''			=>	esc_html__( 'None', 'streamtube-core' ),
			'normal'	=>	esc_html__( 'Normal', 'streamtube-core' ),
			'diff'		=>	esc_html__( 'Diff', 'streamtube-core' ),
		);
	}

	/**
	 *
	 * Get layouts
	 * 
	 * @return array
	 */
	public static function get_layouts(){
		return array(
			'grid'		=>	esc_html__( 'Grid', 'streamtube-core' ),
			'list_xs'	=>	esc_html__( 'List Extra Small', 'streamtube-core' ),
			'list_sm'	=>	esc_html__( 'List Small', 'streamtube-core' ),
			'list_md'	=>	esc_html__( 'List Medium', 'streamtube-core' ),
			'list_lg'	=>	esc_html__( 'List Large', 'streamtube-core' ),
			'list_xl'	=>	esc_html__( 'List Extra Large', 'streamtube-core' ),
			'list_xxl'	=>	esc_html__( 'List Extra extra large', 'streamtube-core' )
		);
	}

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::widget()
	 */
	public function widget( $args, $instance ) {

		$widget_content = '';

		$_query = $_current_post = $_current_author = $_current_logged_in = false;

		if( is_singular() ){

			global $post;

			$_current_post = $post->ID;

			$_current_author = $post->post_author;
		}

		if( is_author() ){
			$_current_author = get_queried_object_id();
		}

		if( is_user_logged_in() ){
			$_current_logged_in = get_current_user_id();
		}

		$instance  = wp_parse_args( $instance, array(
			'id'									=>	'',
			'id_base'								=>	'',
			'title'									=>	'',
			'icon'									=>	'',
			'style'									=>	'light',
			'_current_post'							=>	$_current_post,
			'_current_author'						=>	$_current_author,
			'live_stream'							=>	'',
			'live_status'							=>	array( 'connected' ),
			'related_posts'							=>	'',
			'exclude_current_post'					=>	'',
			'post_type'								=>	'video',
			'post_status'							=>	array( 'publish' ),
			'paged'									=>	is_front_page() ? get_query_var( 'page', 1 ) : get_query_var( 'paged', 1 ),
			's'										=>	'',
			'author'								=>	'',
			'author_name'							=>	'',
			'author__in'							=>	array(),
			'author__not_in'						=>	array(),
			'post__in'								=>	array(),
			'post__not_in'							=>	array(),
			'comment_count'							=>	'',
			'comment_compare'						=>	'',
			'current_logged_in'						=>	'',
			'current_logged_in_history'				=>	'',
			'current_logged_in_watch_later'			=>	'',
			'current_logged_in_following'			=>	'',
			'current_author'						=>	'',
			'current_author_following'				=>	'',
			'posts_per_page'						=>	6,
			'tax_query'								=>	array(),
			'_tax_query'							=>	array(),
			'date_query'							=>	array(),
			'date_before'							=>	'',
			'date_after'							=>	'',
			'meta_query'							=>	array(),
			'orderby'								=>	'date',
			'order'									=>	'DESC',
			'layout'								=>	'grid',
			'title_size'							=>	'',
			'margin'								=>	'yes',
			'margin_bottom'							=>	4,
			'overlay'								=>	'',
			'col_xxl'								=>	4,
			'col_xl'								=>	4,
			'col_lg'								=>	2,
			'col_md'								=>	2,
			'col_sm'								=>	1,
			'col'									=>	1,
			'show_post_date'						=>	'normal',// normal or diff
			'show_post_comment'						=>	'',
			'show_author_name'						=>	'',
			'show_post_view'						=>	'on',
			'author_avatar'							=>	'',
			'avatar_size'							=>	'sm',
			'avatar_name'							=>	'',
			'post_excerpt_length'					=>	0,
			'hide_thumbnail'						=>	'',
			'hide_empty_thumbnail'					=>	'',
			'thumbnail_size'						=>	'streamtube-image-medium',
			'thumbnail_ratio'						=>	get_option( 'thumbnail_ratio', '16x9' ),
			'hide_if_empty'							=>	'',
			'pagination'							=>	'',
			'container'								=>	true,
			'not_found_text'						=>	'',
			'more_link'								=>	'',
			'more_link_url'							=>	'',
			'slide'									=>	'',
			'slide_rows'							=>	'1',
			'slide_dots'							=>	'',
			'slide_arrows'							=>	'',
			'slide_center_mode'						=>	'',
			'slide_infinite'						=>	'',
			'slide_speed'							=>	'2000',
			'slide_autoplay'						=>	'',
			'slide_autoplaySpeed'					=>	'2000'
		) );

		if( $instance['layout'] != 'grid' ){
			if( wp_validate_boolean( $instance['author_avatar'] ) ){
				$instance['avatar_name'] = true;
				$instance['show_author_name'] = false;
			}
		}

		if( (int)$instance['col_xxl'] == 1 ){
			$instance['col_xl'] = $instance['col_lg'] = $instance['col_md'] = $instance['col_sm'] = $instance['col'] = 1;
		}

		if( $instance['pagination'] ){
			$_query = $GLOBALS['wp_query'];
			
			if( ! wp_doing_ajax() ){
				if( ! is_front_page() && ! $instance['paged'] ){
					$instance['paged'] = get_query_var( 'paged', 1 );	
				}
			}

			if( absint( $instance['paged'] ) == 0 ){
				$instance['paged'] = 1;
			}
		}

		if( is_string( $instance['post_type'] ) ){
			$instance['post_type'] = explode( ",", $instance['post_type'] );
		}		

		if( ! array_intersect( $instance['post_type'] , array_keys($this->get_post_types()) ) ){
			$instance['post_type'] = 'video';
		}

		$_in = array( 
			'tax_query', 
			'date_query', 
			'meta_query', 
			'author__in', 
			'author__not_in', 
			'post__in', 
			'post__not_in' 
		);

		for ( $i=0; $i < count( $_in ); $i++) { 
			if( is_string( $instance[ $_in[$i] ] ) ){
				$instance[ $_in[$i] ] = explode(",", $instance[ $_in[$i] ] );
			}
		}

		$instance['title'] = apply_filters( 'widget_title', $instance['title'] );

		/**
		 * Filter widget title
		 */
		$instance['title'] = $this->parse_widget_title( $instance['title'] );

		extract( $instance );

		$no_found_rows 	= true;
		$nothing		= false;

		$query_args = compact(
			'post_type',
			'post_status',
			'posts_per_page',
			'orderby',
			'order',
			'author',
			'author_name',
			'author__in',
			'author__not_in',
			'post__in',
			'post__not_in',
			'tax_query',
			'date_query',
			'meta_query',
			's',
			'no_found_rows',
			'nothing'
		);

		if( $hide_empty_thumbnail ){
			$query_args['meta_query'][] = array(
				'key'		=>	'_thumbnail_id',
				'compare'	=>	'EXISTS'
			);
		}

		if( $live_stream ){

			if( is_string( $live_status ) ){
				$live_status = array_map( 'trim', explode( ',', $live_status ) );
			}

			$query_args['meta_query'][] = array(
				'key'		=>	'live_status',
				'compare'	=>	'IN',
				'value'		=>	$live_status
			);
		}

		if( $exclude_current_post && $_current_post ){
			$query_args['post__not_in'][] = $_current_post;
		}

		// Set taxonomies
		$taxonomies = get_object_taxonomies( $post_type, 'object' );

		if( $taxonomies ){

			$tax_query = array();

			foreach ( $taxonomies as $tax => $object ) {
				
				if( array_key_exists( 'tax_query_' . $tax , $instance ) && $instance[ 'tax_query_' . $tax ] ){
					$tax_query[] = array(
						'taxonomy'	=>	$tax,
						'field'		=>	'slug',
						'terms'		=>	(array)$instance[ 'tax_query_' . $tax ]
					);
				}
			}

			if( $tax_query ){
				$query_args['tax_query'] = $tax_query;
			}
		}

		if( $related_posts && $taxonomies && $_current_post ){

			$exclude_related_taxes = array( 'video_collection', 'report_category' );

			/**
			 * Filter the Exclude Taxes
			 */
			$exclude_related_taxes = apply_filters( 'streamtube/core/widget/posts/related_taxes', $exclude_related_taxes, $taxonomies, $_current_post, $instance );

			$_terms = array();

			foreach ( $taxonomies as $tax => $object ) {

				if( ! in_array( $tax, $exclude_related_taxes ) ){

					$_terms = get_the_terms( $_current_post, $tax );

					if( $_terms ){
						$query_args['tax_query'][] = array(
							'taxonomy'	=>	$tax,
							'field'		=>	'slug',
							'terms'		=>	wp_list_pluck( $_terms, 'slug' ),
							'operator'	=>	'IN'
						);
					}
				}
			}
		}

		if( $current_logged_in_history && $_current_logged_in ){
			$query_args['tax_query'][] = array(
				'taxonomy'	=>	'video_collection',
				'field'		=>	'term_id',
				'terms'		=>	(int)get_user_meta( $_current_logged_in, 'collection_history', true )
			);			
		}

		if( $current_logged_in_watch_later && $_current_logged_in ){
			$query_args['tax_query'][] = array(
				'taxonomy'	=>	'video_collection',
				'field'		=>	'term_id',
				'terms'		=>	(int)get_user_meta( $_current_logged_in, 'collection_watch_later', true )
			);			
		}

		if( count( $query_args['tax_query'] ) > 1 ){
			$query_args['tax_query']['relation'] = 'AND';
		}

		// Set comment
		if( (int)$comment_count > 0 ){
			$query_args['comment_count'] = array(
				'value'		=>	(int)$comment_count,
				'compare'	=>	$this->valid_comment_compare( $comment_compare ) ? $comment_compare : '='
			);
		}

		if( $current_logged_in ){
			if( $_current_logged_in ){
				if( count_user_posts( $_current_logged_in, $post_type ) > 0 ){
					$query_args['author__in'][] = $_current_logged_in;
				}
			}
		}

		// Retrieve following
		if( $current_logged_in_following ){

			$maybe_following_users = false;

			if( $_current_logged_in ){

				if( function_exists( 'wpuf_get_follow_users' ) ){

					$maybe_following_users = wpuf_get_follow_users( $_current_logged_in, 'following' );

					if( $maybe_following_users ){
						$query_args['author__in'] = array_merge( $query_args['author__in'], $maybe_following_users );
					}
				}	
			}

			if( ! $maybe_following_users ){
				$query_args['nothing'] = true;
			}
		}

		if( $current_author ){

			$post_count = 0;

			if( $_current_author ){

				$post_count = count_user_posts( $_current_author, $post_type );

				if( $post_count > 0 ){
					$query_args['author__in'][] = $_current_author;
				}		
			}

			if( ! $post_count || $post_count == 0 ){
				$query_args['nothing'] = true;
			}
		}

		if( $current_author_following && function_exists( 'wpuf_get_follow_users' ) ){

			$maybe_following_users = false;

			if( $_current_author ){
				$maybe_following_users = wpuf_get_follow_users( $_current_author, 'following' );

				if( $maybe_following_users ){
					$query_args['author__in'] = array_merge( $query_args['author__in'], $maybe_following_users );
				}
			}

			if( ! $maybe_following_users ){
				$query_args['nothing'] = true;
			}
		}

		// Set date
		if( $date_before ){
			$query_args['data_query'][] = array(
				'before'	=>	$date_before,
				'inclusive'	=>	true
			);
		}

		if( $date_after ){
			$query_args['data_query'][] = array(
				'after'		=>	$date_after,
				'inclusive'	=>	true
			);
		}

		// Set pagination
		if( $pagination ){
			$query_args['no_found_rows'] = false;		
			$query_args['paged'] = $paged;
		}

		// Set orderby
		if( $query_args['orderby'] == 'post_view' ){
			$query_args['meta_key'] = streamtube_core()->get()->post->get_post_views_meta();
			$query_args['orderby'] = 'meta_value_num';
		}

		if( $query_args['orderby'] == 'post_like' ){
			$query_args['meta_key'] = '_like_count';
			$query_args['orderby'] 	= 'meta_value_num';
		}

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

		/**
		 *
		 * Filter the instance
		 * 
		 * @param  array $instance
		 *
		 * @since  1.0.0
		 * 
		 */
		$instance = apply_filters( 'streamtube/core/widget/posts/instance', $instance );

		/**
		 *
		 * Filter the post query args
		 *
		 * @param  array $query_args
		 * @param  array $instance
		 *
		 * @since  1.0.0
		 * 
		 */
		$query_args = apply_filters( 'streamtube/core/widget/posts/query_args', $query_args, $instance );
	
		if( $query_args['nothing'] ){
			return;
		}

		unset( $query_args['nothing'] );

		$query_posts = new WP_Query( $query_args );

		ob_start();

		if( $query_posts->have_posts() ):

			$_layout = $layout == 'grid' ? 'grid' : 'list';

			$wrap_classes = array( 'post-grid' );

			$wrap_classes[] = 'post-grid-' . sanitize_html_class( $style );
			$wrap_classes[] = 'post-grid-' . sanitize_html_class( $_layout );
			$wrap_classes[] = 'post-grid-' . sanitize_html_class( $layout );
			
			if( $instance['overlay'] ){
				$wrap_classes[] = 'post-grid-overlay';	
			}

			if( $instance['slide'] ){
				$wrap_classes[] = 'post-grid-slick';	

				$wrap_classes[] = 'slick-col-' . absint( $instance['slide_rows'] );
			}

			if( ! wp_validate_boolean( $instance['margin'] ) ){
				$wrap_classes[] = 'post-grid-no-margin';
			}

			if( $instance['author_avatar'] ){
				$wrap_classes[] = 'post-grid-avatar';
				$wrap_classes[] = 'post-grid-avatar-size-' . sanitize_html_class( $instance['avatar_size'] );
			}

			if( isset( $_POST['action'] ) && $_POST['action'] == 'widget_load_more_posts' ){
				$wrap_classes[] = 'is-ajax';
			}

			?>
			<?php 
				printf(
					'<div %s class="%s" data-page="%s" data-max-pages="%s">',
					array_search( 'is-ajax' , $wrap_classes ) ? 'style="display: none"' : '',
					esc_attr( join( ' ', array_unique( $wrap_classes ) ) ),
					esc_attr( $paged ),
					esc_attr( $query_posts->max_num_pages )
				);?>

				<?php 
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
					'arrows'			=>	wp_validate_boolean( $instance['slide_arrows'] ),
					'dots'				=>	wp_validate_boolean( $instance['slide_dots'] ),
					'rows'				=>	absint( $instance['slide_rows'] ),
					'infinite'			=>	wp_validate_boolean( $instance['slide_infinite'] ),
					'centerMode'		=>	wp_validate_boolean( $instance['slide_center_mode'] ),
					'speed'				=>	absint( $instance['slide_speed'] ),
					'autoplay'			=>	wp_validate_boolean( $instance['slide_autoplay'] ),
					'autoplaySpeed'		=>	absint( $instance['slide_autoplaySpeed'] ),
					'rtl'				=>	is_rtl() ? true : false
				);

				if( $slick['centerMode'] ){
					$slick['centerPadding'] = '100px';
				}

				/**
				 *
				 * Filter the slick data
				 *
				 * @param array $slick
				 * @param array $query_args
				 * @param array $instance
				 * 
				 * @since 1.0.0
				 */
				$slick = apply_filters( 'streamtube/core/widget/posts/slick', $slick, $query_args, $instance );

				$row_classes = array( 'row' );

				$row_classes[] = 'row-cols-' . $col;
				$row_classes[] = 'row-cols-sm-' . $col_sm;
				$row_classes[] = 'row-cols-md-' . $col_md;
				$row_classes[] = 'row-cols-lg-' . $col_lg;
				$row_classes[] = 'row-cols-xl-' . $col_xl;
				$row_classes[] = 'row-cols-xxl-' . $col_xxl;

				printf(
					'<div class="%s" %s>',
					! empty( $instance['slide'] ) ? 'js-slick' : join( ' ', $row_classes ),
					$instance['slide'] ? 'data-slick="'. esc_attr( json_encode( $slick ) ) .'"' : ''
				);
				?>

					<?php

					$instance['margin_bottom'] = (int)$instance['margin_bottom'];

					if( (int)$instance['margin_bottom'] > 5 ){
						$instance['margin_bottom'] = 5;
					}

					while( $query_posts->have_posts() ):

						$query_posts->the_post();

						printf(
							'<div class="post-item mb-%s">',
							esc_attr( $instance['margin_bottom'] )
						);

							get_template_part( 
								'template-parts/content/content', 
								$layout == 'grid' ? 'grid' : 'list',
								$instance
							);

						echo '</div>';// post-item

					endwhile;
					
					?>
				<?php if( ! wp_doing_ajax() ):?>
				</div><!--.row-->
			</div><!--.post-grid-->

				<?php if( $instance['slide'] ): ?>
					<?php streamtube_core_preplaceholder( $wrap_classes, $row_classes, $instance ); ?>
				<?php endif;?>

			<?php endif;?>

			<?php

			if( ! $slide && $pagination && $query_posts->max_num_pages > 1 ){

				if( ! isset( $_REQUEST[ 'action' ] ) ):

				switch ( $pagination ) {
					case 'scroll':
					case 'click':
						?>
						<div class="pagination-nav d-flex justify-content-center navigation border-bottom mb-5 position-relative">
							<?php printf(
								'<button type="button" class="btn border text-secondary widget-load-more-posts jsappear bg-light shadow-none load-on-%s" data-params="%s" data-action="%s">',
								$pagination,
								esc_attr( json_encode( $instance ) ),
								'widget_load_more_posts'
							);?>

								<?php if( $pagination == 'click' ):?>

									<span class="load-icon icon-angle-down position-absolute top-50 start-50 translate-middle"></span>

								<?php else:?>
									<span class="spinner spinner-border text-info" role="status">
										<span class="visually-hidden">
											<?php esc_html_e( 'Loading...', 'streamtube-core' ); ?>
										</span>
									</span>
								<?php endif;?>
							</button>
						</div>
						<?php
					break;
					
					default:
						if( function_exists( 'streamtube_posts_pagination' ) ){

							if( $_query ){
								$GLOBALS['wp_query'] = $query_posts;
							}

							$format = '?paged=%#%';

							if( get_option( 'permalink_structure' ) ){
								$format = 'page/%#%';
							}

							$pagination_args = array();

							if( $_query ){
								$pagination_args['format'] = $format;
							}

							streamtube_posts_pagination( $pagination_args );

							$GLOBALS['wp_query'] = $_query;
						}
					break;
				}

				endif;
			}

			wp_reset_postdata();

		else:

			if( $not_found_text ){
				echo '<div class="not-found p-3 text-center text-muted fw-normal h6">';
					echo force_balance_tags( wpautop( $not_found_text ) );
				echo '</div>';
			}

		endif;

		$widget_content = trim( ob_get_clean() );

		if( $hide_if_empty && ! $widget_content ){
			return;
		}

		echo $container ? $args['before_widget'] : '';

			if( ! empty( $title ) ){

				if( $instance['more_link'] && $instance['more_link_url'] ){
					$title .= sprintf(
						'<a class="ms-auto view-more-url small" href="%s"><span class="badge">%s</span></a>',
						esc_url( $instance['more_link_url'] ),
						esc_html__( 'View more', 'streamtube-core' )
					);
				}

				if( ! empty( $icon ) ){
					$title = sprintf(
						'<span class="title-icon %s"></span>',
						esc_attr( $icon )
					) . $title;
				}

				printf(
					'%s %s %s',
					$args['before_title'],
					$title,
					$args['after_title']
				);
			}

			echo $widget_content;

		echo $container ? $args['after_widget'] : '';
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

		$tabs['comment'] = array(
			'title'		=>	esc_html__( 'Comment', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_comment' )
		);

		$tabs['date'] = array(
			'title'		=>	esc_html__( 'Date', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_date' )
		);

		$tabs['user'] = array(
			'title'		=>	esc_html__( 'User', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_user' )
		);

		$tabs['order'] = array(
			'title'		=>	esc_html__( 'Order', 'streamtube-core' ),
			'callback'	=>	array( $this , 'tab_order' )
		);

		return $tabs;

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
			'icon'					=>	'',
			'posts_per_page'		=>	10,
			'pagination'			=>	'',
			'thumbnail_ratio'		=>	get_option( 'thumbnail_ratio', '16x9' ),
			'show_post_date'		=>	'diff',
			'show_post_comment'		=>	'',
			'show_author_name'		=>	'',
			'author_avatar'			=>	'',
			'avatar_size'			=>	'sm',
			'hide_thumbnail'		=>	'',
			'hide_empty_thumbnail'	=>	'',
			'hide_if_empty'			=>	''
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
				esc_attr( $this->get_field_id( 'icon' ) ),
				esc_html__( 'Icon', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'icon' ) ),
				esc_attr( $this->get_field_name( 'icon' ) ),
				esc_attr( $instance['icon'] )

			);?>
		</div>		

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'posts_per_page' ) ),
				esc_html__( 'Posts per page', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'posts_per_page' ) ),
				esc_attr( $this->get_field_name( 'posts_per_page' ) ),
				esc_attr( $instance['posts_per_page'] )

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'pagination' ) ),
				esc_html__( 'Pagination', 'streamtube-core')

			);?>

			<?php printf(
				'<select class="widefat" id="%s" name="%s"/>',
				esc_attr( $this->get_field_id( 'pagination' ) ),
				esc_attr( $this->get_field_name( 'pagination' ) )

			);?>

			<?php
			$options = self::get_pagination_types();

			foreach ( $options as $type => $text ) {
				printf(
					'<option value="%s" %s>%s</option>',
					esc_attr( $type ),
					selected( $type, $instance['pagination'] ),
					esc_html( $text )
				);
			}

			?>

			</select>
		
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'thumbnail_ratio' ) ),
				esc_html__( 'Thumbnail Image Ratio', 'streamtube-core')

			);?>
			
			<?php printf(
				'<select class="widefat" id="%s" name="%s" />',
				esc_attr( $this->get_field_id( 'thumbnail_ratio' ) ),
				esc_attr( $this->get_field_name( 'thumbnail_ratio' ) )
			);?>

			<?php foreach ( self::get_image_ratio() as $ratio => $text ) {
				printf(
					'<option %s value="%s">%s</option>',
					selected( $instance['thumbnail_ratio'], $ratio, false ),
					esc_attr( $ratio ),
					esc_html( $text )
				);
			}?>

			</select>
		</div>

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s/>',
				esc_attr( $this->get_field_id( 'show_post_comment' ) ),
				esc_attr( $this->get_field_name( 'show_post_comment' ) ),
				checked( 'on', $instance['show_post_comment'], false )

			);?>
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'show_post_comment' ) ),
				esc_html__( 'Show post comment', 'streamtube-core')

			);?>			
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'show_post_date' ) ),
				esc_html__( 'Post date format', 'streamtube-core')

			);?>
			
			<?php printf(
				'<select class="widefat" id="%s" name="%s" />',
				esc_attr( $this->get_field_id( 'show_post_date' ) ),
				esc_attr( $this->get_field_name( 'show_post_date' ) )
			);?>

			<?php foreach ( self::get_date_formats() as $key => $value ) {
				printf(
					'<option %s value="%s">%s</option>',
					selected( $instance['show_post_date'], $key, false ),
					esc_attr( $key ),
					esc_html( $value )
				);
			}?>

			</select>
		</div>

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s/>',
				esc_attr( $this->get_field_id( 'show_author_name' ) ),
				esc_attr( $this->get_field_name( 'show_author_name' ) ),
				checked( 'on', $instance['show_author_name'], false )

			);?>
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'show_author_name' ) ),
				esc_html__( 'Show author name', 'streamtube-core')

			);?>			
		</div>

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s/>',
				esc_attr( $this->get_field_id( 'author_avatar' ) ),
				esc_attr( $this->get_field_name( 'author_avatar' ) ),
				checked( 'on', $instance['author_avatar'], false )

			);?>
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'author_avatar' ) ),
				esc_html__( 'Show post author avatar', 'streamtube-core')

			);?>			
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'avatar_size' ) ),
				esc_html__( 'Author avatar size', 'streamtube-core')

			);?>
			
			<?php printf(
				'<select class="widefat" id="%s" name="%s" />',
				esc_attr( $this->get_field_id( 'avatar_size' ) ),
				esc_attr( $this->get_field_name( 'avatar_size' ) )
			);?>

			<?php foreach ( self::get_avatar_sizes() as $size => $text ) {
				printf(
					'<option %s value="%s">%s</option>',
					selected( $instance['avatar_size'], $size, false ),
					esc_attr( $size ),
					esc_html( $text )
				);
			}?>

			</select>
		</div>		

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'hide_thumbnail' ) ),
				esc_attr( $this->get_field_name( 'hide_thumbnail' ) ),
				checked( 'on', $instance['hide_thumbnail'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'hide_thumbnail' ) ),
				esc_html__( 'Hide thumbnail image', 'streamtube-core')

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
				esc_html__( 'Hide empty thumbnail posts', 'streamtube-core')

			);?>
			
		</div>		

		<div class="field-control">
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'hide_if_empty' ) ),
				esc_attr( $this->get_field_name( 'hide_if_empty' ) ),
				checked( 'on', $instance['hide_if_empty'], false )
			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'hide_if_empty' ) ),
				esc_html__( 'Hide widget if no posts found', 'streamtube-core')
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
			'layout'		=>	'grid',
			'title_size'	=>	'',
			'margin'		=>	'yes',
			'margin_bottom'	=>	4,
			'overlay'		=>	'',
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
				esc_attr( $this->get_field_id( 'layout' ) ),
				esc_html__( 'Layout', 'streamtube-core')

			);?>
			<?php printf(
				'<select class="widefat" id="%s" name="%s"/>',
				esc_attr( $this->get_field_id( 'layout' ) ),
				esc_attr( $this->get_field_name( 'layout' ) )
			);?>

				<?php foreach( self::get_layouts() as $layout => $text ): ?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $layout ),
						selected( $instance['layout'], $layout, false ),
						esc_html( $text )
					);?>

				<?php endforeach;?>
				
			</select>
		</div>

		<div class="field-control">

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'title_size' ) ),
				esc_html__( 'Title Size', 'streamtube-core')

			);?>
			<?php printf(
				'<select class="widefat" id="%s" name="%s"/>',
				esc_attr( $this->get_field_id( 'title_size' ) ),
				esc_attr( $this->get_field_name( 'title_size' ) )
			);?>

				<?php foreach( self::get_title_sizes() as $key => $value ): ?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $key ),
						selected( $instance['title_size'], $key, false ),
						esc_html( $value )
					);?>

				<?php endforeach;?>
				
			</select>
		</div>		

		<div class="field-control">

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'margin' ) ),
				esc_html__( 'Margin', 'streamtube-core')

			);?>
			<?php printf(
				'<select class="widefat" id="%s" name="%s"/>',
				esc_attr( $this->get_field_id( 'margin' ) ),
				esc_attr( $this->get_field_name( 'margin' ) )
			);?>

				<?php foreach( self::get_yes_no() as $key => $text ): ?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $key ),
						selected( $instance['margin'], $key, false ),
						esc_html( $text )
					);?>

				<?php endforeach;?>
			</select>
			<span class="field-help">
				<?php esc_html_e( 'Enable margin between items', 'streamtube-core' );?>
			</span>			
		</div>

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
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'overlay' ) ),
				esc_attr( $this->get_field_name( 'overlay' ) ),
				checked( 'on', $instance['overlay'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'overlay' ) ),
				esc_html__( 'Overlay', 'streamtube-core')

			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'col_xxl' ) ),
				esc_html__( 'Columns - Extra extra large ≥1400px', 'streamtube-core')

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
				esc_html__( 'Columns - Extra large ≥1200px', 'streamtube-core')

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
				esc_html__( 'Columns - Large ≥992px', 'streamtube-core')

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
				esc_html__( 'Columns - Medium ≥768px', 'streamtube-core')

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
				esc_html__( 'Columns - Small ≥576px', 'streamtube-core')

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
				esc_html__( 'Columns - Extra small <576px', 'streamtube-core')

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
			'slide'		=>	'',
			'slide_rows'	=>	'1',
			'slide_dots'	=>	'',
			'slide_arrows'	=>	'',
			'slide_center_mode'	=>	'',
			'slide_infinite'	=>	'',
			'slide_speed'		=>	'2000',
			'slide_autoplay'	=>	'',
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
				esc_attr( $this->get_field_id( 'slide_dots' ) ),
				esc_attr( $this->get_field_name( 'slide_dots' ) ),
				checked( 'on', $instance['slide_dots'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'slide_dots' ) ),
				esc_html__( 'Show dot indicators', 'streamtube-core')

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
			'live_stream'			=>	'',
			'live_status'			=>	array( 'connected' ),
			'related_posts'			=>	'',
			'exclude_current_post'	=>	'',
			'post_type'				=>	'video',
			'search'				=>	'',
			'post_status'			=>	array( 'publish' )
		) );

		ob_start();

		?>

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'related_posts' ) ),
				esc_attr( $this->get_field_name( 'related_posts' ) ),
				checked( 'on', $instance['related_posts'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'related_posts' ) ),
				esc_html__( 'Retrieve related posts of current post.', 'streamtube-core')

			);?>
		</div>		

		<div class="field-control">
			
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'exclude_current_post' ) ),
				esc_attr( $this->get_field_name( 'exclude_current_post' ) ),
				checked( 'on', $instance['exclude_current_post'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'exclude_current_post' ) ),
				esc_html__( 'Do not include current post.', 'streamtube-core')

			);?>
		</div>

		<?php if( function_exists( 'wp_cloudflare_stream' ) ): ?>
			<div class="field-control">
				
				<?php printf(
					'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
					esc_attr( $this->get_field_id( 'live_stream' ) ),
					esc_attr( $this->get_field_name( 'live_stream' ) ),
					checked( 'on', $instance['live_stream'], false )

				);?>

				<?php printf(
					'<label for="%s">%s</label>',
					esc_attr( $this->get_field_id( 'live_stream' ) ),
					esc_html__( 'Retrieve Live Streams.', 'streamtube-core')
				);?>
			</div>

			<div class="field-control">
				<?php printf(
					'<label for="%s">%s</label>',
					esc_attr( $this->get_field_id( 'live_status' ) ),
					esc_html__( 'Live Status', 'streamtube-core')

				);?>

				<?php printf(
					'<select multiple class="widefat select-select2" id="%s" name="%s"/>',
					esc_attr( $this->get_field_id( 'live_status' ) ),
					esc_attr( $this->get_field_name( 'live_status[]' ) )
				);?>

					<?php foreach( self::get_live_statuses() as $live_status => $text ):?>

						<?php printf(
							'<option value="%s" %s>%s</option>',
							esc_attr( $live_status ),
							in_array( $live_status, $instance['live_status'] ) ? 'selected' : '',
							esc_html( $text )
						);?>

					<?php endforeach;?>


				</select><!-- end <?php echo $this->get_field_id( 'live_status' );?> -->
			</div>
		<?php endif;?>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'post_type' ) ),
				esc_html__( 'Post Type', 'streamtube-core')

			);?>

			<?php printf(
				'<select class="widefat post-type" id="%s" name="%s" />',
				esc_attr( $this->get_field_id( 'post_type' ) ),
				esc_attr( $this->get_field_name( 'post_type' ) )

			);?>

				<?php foreach( self::get_post_types() as $post_type => $post_type_label ):?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $post_type ),
						selected( $instance['post_type'], $post_type, false ),
						esc_html( $post_type_label )
					);?>

				<?php endforeach;?>


			</select><!-- end <?php echo $this->get_field_id( 'post_type' );?> -->
		</div>

		<div class="field-control tax-group">

			<?php
			foreach( self::get_post_types() as $post_type => $post_type_label ):

				if( is_post_type_viewable( $post_type )):

					$taxonomies = get_object_taxonomies( $post_type, 'object' );

					if( $taxonomies ):

						printf(
							'<div class="field-control taxonomy taxonomy-%s %s">',
							esc_attr( $post_type ),
							$post_type == $instance['post_type'] ? 'active' : ''
						);

							foreach ( $taxonomies as $tax => $object ):

								$terms = get_terms( array(
									'taxonomy'		=>	$tax,
									'hide_empty'	=>	false
								) );

								if( $terms ):

									?><div class="field-control"><?php

									// Print the label
									printf(
										'<label for="%s">%s</label>',
										esc_attr( $this->get_field_id( $tax ) ),
										esc_html( $object->label )

									);
									printf(
										'<select multiple="multiple" class="widefat select-select2" id="%s" name="%s" data-placeholder="%s">',
										esc_attr( $this->get_field_id( $tax ) ),
										esc_attr( $this->get_field_name( 'tax_query_'.$tax.'[]' ) ),
										esc_html__( 'Select', 'streamtube' )
									);?>

										<?php
										foreach( $terms as $term ):

											$exists = false;

											if( array_key_exists( 'tax_query_' . $tax , $instance ) ){
												if( in_array( $term->slug, $instance[ 'tax_query_' . $tax ] ) ){
													$exists = $term->slug;
												}
											}

											printf(
												'<option value="%s" %s>%s</option>',
												esc_attr( $term->slug ),
												selected( $exists, $term->slug, false ),
												esc_html( $term->name )

											);
										endforeach;
										?>

									</select>

									</div>
									<?php

								endif;
								
							endforeach;						

						echo '</div><!--.taxonomy-->';

					endif;

				endif;

			endforeach;
			?>

		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'search' ) ),
				esc_html__( 'Keyword', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'search' ) ),
				esc_attr( $this->get_field_name( 'search' ) ),
				esc_attr( $instance['search'] )

			);?>

			<span class="field-help">
				<?php esc_html_e( 'Show posts based on a keyword search', 'streamtube' ); ?>
			</span>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'post_status' ) ),
				esc_html__( 'Status', 'streamtube-core')

			);?>

			<?php printf(
				'<select multiple class="widefat select-select2" id="%s" name="%s"/>',
				esc_attr( $this->get_field_id( 'post_status' ) ),
				esc_attr( $this->get_field_name( 'post_status[]' ) )
			);?>

				<?php foreach( self::get_post_statuses() as $post_status => $text ):?>

					<?php printf(
						'<option value="%s" %s>%s</option>',
						esc_attr( $post_status ),
						in_array( $post_status, $instance['post_status'] ) ? 'selected' : '',
						esc_html( $text )
					);?>

				<?php endforeach;?>


			</select><!-- end <?php echo $this->get_field_id( 'post_status' );?> -->
		</div>
		<?php
		/**
		 *
		 * Fires after source fields
		 *
		 * @param  object $this widget
		 * @param  array $instance
		 *
		 * @since  1.0.0
		 * 
		 */
		do_action( 'streamtube/core/widget/post/source/after', $this, $instance );
		?>

		<?php

		return ob_get_clean();
	}

	/**
	 *
	 * The Comment tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_comment( $instance ){

		$instance = wp_parse_args( $instance, array(
			'comment_count'			=>	'',
			'comment_compare'		=>	''
		) );

		ob_start();

		?>
		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'comment_count' ) ),
				esc_html__( 'Comment Count', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'comment_count' ) ),
				esc_attr( $this->get_field_name( 'comment_count' ) ),
				esc_attr( $instance['comment_count'] )

			);?>

			<span class="field-help">
				<?php esc_html_e( 'Retrieve posts with with given comment count', 'streamtube-core' ); ?>
			</span>

		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'comment_compare' ) ),
				esc_html__( 'Comment Compare', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'comment_compare' ) ),
				esc_attr( $this->get_field_name( 'comment_compare' ) ),
				esc_attr( $instance['comment_compare'] )

			);?>
			<span class="field-help">
				<?php esc_html_e( 'Possible values are ‘=’, ‘!=’, ‘>’, ‘>=’, ‘<‘, ‘<=’', 'streamtube-core' ); ?>
			</span>
		</div>	
		<?php

		return ob_get_clean();
	}

	/**
	 *
	 * The Date tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_date( $instance ){

		$instance = wp_parse_args( $instance, array(
			'date_before'	=>	'',
			'date_after'	=>	''
		));

		ob_start();

		?>
		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'date_before' ) ),
				esc_html__( 'Date Before', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'date_before' ) ),
				esc_attr( $this->get_field_name( 'date_before' ) ),
				esc_attr( $instance['date_before'] )

			);?>

		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'date_after' ) ),
				esc_html__( 'Date After', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'date_after' ) ),
				esc_attr( $this->get_field_name( 'date_after' ) ),
				esc_attr( $instance['date_after'] )

			);?>

		</div>

		<?php

		return ob_get_clean();
	}

	/**
	 *
	 * The Author tab
	 * 
	 * @param  array $instance
	 * @return html
	 *
	 * @since  1.0.0
	 * 
	 */
	private function tab_user( $instance ){

		$instance = wp_parse_args( $instance, array(
			'current_logged_in'				=>	'',
			'current_logged_in_following'	=>	'',
			'current_logged_in_reaction'	=>	array(),
			'current_author'				=>	'',
			'current_author_following'		=>	'',
			'current_author_reaction'		=>	array()
		));

		ob_start();		

		?>
		<div class="field-control">

			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'current_logged_in' ) ),
				esc_attr( $this->get_field_name( 'current_logged_in' ) ),
				checked( 'on', $instance['current_logged_in'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'current_logged_in' ) ),
				esc_html__( 'Retrieve posts of current logged in user', 'streamtube-core')

			);?>

		</div>

		<div class="field-control">

			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'current_author' ) ),
				esc_attr( $this->get_field_name( 'current_author' ) ),
				checked( 'on', $instance['current_author'], false )

			);?>

			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'current_author' ) ),
				esc_html__( 'Retrieve posts of current author', 'streamtube-core')

			);?>

		</div>

		<?php if( function_exists( 'run_wp_user_follow' ) ):?>

			<div class="field-control">

				<?php printf(
					'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
					esc_attr( $this->get_field_id( 'current_logged_in_following' ) ),
					esc_attr( $this->get_field_name( 'current_logged_in_following' ) ),
					checked( 'on', $instance['current_logged_in_following'], false )

				);?>

				<?php printf(
					'<label for="%s">%s</label>',
					esc_attr( $this->get_field_id( 'current_logged_in_following' ) ),
					esc_html__( 'Retrieve current logged-in user\'s following', 'streamtube-core')

				);?>

			</div>

			<div class="field-control">

				<?php printf(
					'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
					esc_attr( $this->get_field_id( 'current_author_following' ) ),
					esc_attr( $this->get_field_name( 'current_author_following' ) ),
					checked( 'on', $instance['current_author_following'], false )

				);?>

				<?php printf(
					'<label for="%s">%s</label>',
					esc_attr( $this->get_field_id( 'current_author_following' ) ),
					esc_html__( 'Retrieve current author\'s following', 'streamtube-core')

				);?>

			</div>

		<?php endif;?>		
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
			'orderby'	=>	'date',
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
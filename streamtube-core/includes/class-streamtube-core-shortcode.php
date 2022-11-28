<?php

/**
 * Define the shortcode functionality
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

class Streamtube_Core_ShortCode {

	/**
	 * Do shortcode
	 * @see do_shortcode()
	 * @param  string $content
	 * @return shortcoded content
	 *
	 * @since 2.1.7
	 * 
	 */
	private function do_shortcode( $content ){
		return do_shortcode( $content );
	}

	/**
	 *
	 * is_logged_in shortcode
	 * 
	 * @param  array   $args
	 * @param  string  $content
	 * @return string
	 *
	 * @since 2.1.7
	 * 
	 */
	public function _is_logged_in( $args = array(), $content = '' ){
		if( is_user_logged_in() ){
			return $this->do_shortcode( $content );
		}

		return;
	}

	/**
	 *
	 * is_logged_in shortcode
	 *
	 * @since 2.1.7
	 * 
	 */
	public function is_logged_in(){
		add_shortcode( 'is_logged_in', array( $this , '_is_logged_in' ), 10 );
	}

	/**
	 *
	 * is_logged_in shortcode
	 * 
	 * @param  array   $args
	 * @param  string  $content
	 * @return string
	 *
	 * @since 2.1.7
	 * 
	 */
	public function _is_not_logged_in( $args = array(), $content = '' ){
		if( ! is_user_logged_in() ){
			return $this->do_shortcode( $content );
		}

		return;
	}

	/**
	 *
	 * is_not_logged_in shortcode
	 *
	 * @since 2.1.7
	 * 
	 */
	public function is_not_logged_in(){
		add_shortcode( 'is_not_logged_in', array( $this , '_is_not_logged_in' ), 10 );
	}

	/**
	 *
	 * can_upload shortcode
	 * 
	 * @param  array   $args
	 * @param  string  $content
	 * @return string
	 *
	 * @since 2.1.7
	 * 
	 */
	public function _can_upload( $args = array(), $content = '' ){
		if( Streamtube_Core_Permission::can_upload() ){
			return $this->do_shortcode( $content );
		}

		return;
	}

	/**
	 *
	 * can_upload shortcode
	 *
	 * @since 2.1.7
	 * 
	 */
	public function can_upload(){
		add_shortcode( 'can_upload', array( $this , '_can_upload' ), 10 );
	}

	/**
	 *
	 * can_not_upload shortcode
	 * 
	 * @param  array   $args
	 * @param  string  $content
	 * @return string
	 *
	 * @since 2.1.7
	 * 
	 */
	public function _can_not_upload( $args = array(), $content = '' ){
		if( ! Streamtube_Core_Permission::can_upload() ){
			return $this->do_shortcode( $content );
		}

		return;
	}

	/**
	 *
	 * can_not_upload shortcode
	 *
	 * @since 2.1.7
	 * 
	 */
	public function can_not_upload(){
		add_shortcode( 'can_not_upload', array( $this , '_can_not_upload' ), 10 );
	}

	/**
	 *
	 * Current User name
	 * 
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function _user_name( $args = array() ){

		$args = wp_parse_args( $args, array(
			'user_id'	=>	'',
			'echo'		=>	false
		) );

		if( ! $args['user_id'] ){
			return;
		}

		switch ( $args['user_id'] ) {
			case 'logged_in':
				$args['user_id'] = get_current_user_id();
			break;
			
			case 'author':
				if( is_singular() ){
					global $post;

					$args['user_id'] = $post->post_author;
				}

				if( is_author() ){
					$args['user_id'] = get_queried_object_id();
				}
				
			break;
		}

		return sprintf(
			'<span class="ms-1 d-flex align-items-center">%s</span>',
			streamtube_core_get_user_name( $args )
		);
	}

	/**
	 *
	 * User name shortcode
	 * 
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function user_name(){
		add_shortcode( 'user_name', array( $this , '_user_name' ), 10 );
	}

	/**
	 *
	 * User avatar
	 * 
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function _user_avatar( $args = array() ){

		$args = wp_parse_args( $args, array(
			'user_id'	=>	'',
			'wrap_size'	=>	'sm',
			'echo'		=>	false
		) );

		if( ! $args['user_id'] ){
			return;
		}

		switch ( $args['user_id'] ) {
			case 'logged_in':
				$args['user_id'] = get_current_user_id();
			break;
			
			case 'author':
				if( is_singular() ){
					global $post;

					$args['user_id'] = $post->post_author;
				}

				if( is_author() ){
					$args['user_id'] = get_queried_object_id();
				}
				
			break;
		}

		return sprintf(
			'<span class="ms-1 d-flex align-items-center">%s</span>',
			streamtube_core_get_user_avatar( $args )
		);
	}

	/**
	 *
	 * User avatar shortcode
	 * 
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function user_avatar( $args = array() ){
		add_shortcode( 'user_avatar', array( $this , '_user_avatar' ), 10 );
	}

	/**
	 *
	 * The users list
	 * 
	 * @param  array $args
	 * @return HTML
	 *
	 * @since  1.0.0
	 * 
	 */
	public function _user_grid( $args = array() ){

		$output = '';

		$args = wp_parse_args( $args, array(
			'title'				=>	'',
			'number'			=>	12,
			'search_columns'	=>	array( 
				'user_login', 
				'user_url', 
				'user_email', 
				'user_nicename', 
				'display_name'
			),
			'roles'				=>	'',
			'authors'			=>	'',
			'paged'				=>	1,
			'include_search'	=>	true,
			'search'			=>	isset( $_GET['search_query'] ) ? sanitize_text_field( $_GET['search_query'] ) : '',
			'search_form'		=>	true,
			'include_sortby'	=>	true,
			'col_xxl'			=>	4,
			'col_xl'			=>	4,
			'col_lg'			=>	4,
			'col_md'			=>	2,
			'col_sm'			=>	2,
			'col'				=>	1
		) );

		foreach ( $args as $key => $value) {
			if( is_string( $value ) && in_array( $value, array( 'true', 'on', 'yes' ) ) ){
				$args[$key] = true;
			}

			if( is_string( $value ) && in_array( $value, array( 'false', 'off', 'no' ) ) ){
				$args[$key] = false;
			}
		}

		if( is_string( $args['search_columns'] ) ){
			$args['search_columns'] = explode( "," , $args['search_columns'] );
		}

		if( $args['include_search'] && $args['search'] ){
			$args['search'] = '*' . $args['search'] . '*';
		}

		if( isset( $_GET['orderby'] ) ){
			switch ( $_GET['orderby'] ) {
				case 'popular':
					$args['orderby'] = 'post_count';
					$args['order']	 = 'ASC';
					$args['has_published_posts'] = true;
				break;

				case 'newest':
					$args['orderby'] = 'registered';
					$args['order']	 = 'DESC';
				break;

				case 'oldest':
					$args['orderby'] = 'registered';
					$args['order']	 = 'ASC';
				break;				

				case 'name':
					$args['orderby'] = 'name';
				break;
			}
		}

		if( ! empty( $args['roles'] ) ){
			$args['role__in'] = array_map( 'trim', explode( ',', $args['roles'] ) );
		}

		if( ! empty( $args['authors'] ) ){
			$args['who'] = 'authors';
		}

		/**
		 *
		 * Filter the args
		 * 
		 * @var array $args
		 *
		 * @since  1.0.0
		 * 
		 */
		$args = apply_filters( 'streamtube/core/user_grid/query_args', $args );

		extract( $args );

		$_user_query = new WP_User_Query( $args );

		// Turn on buffering
		ob_start();

		// Include header
		if( $args['include_search'] || $args['include_sortby'] ){
			?>
			<div class="page-header d-flex align-items-center mb-4">

				<div class="d-flex align-items-start">
					<?php if( $args['title'] ){
						printf(
							'<h1 class="page-title h5 me-5">%s</h1>',
							esc_html( $args['title'] )
						);
					}?>

					<?php if( $args['include_search'] && $args['search_form'] ){
						streamtube_core_load_template( 'user/search-form.php' );
					}?>
				</div>

				<?php if( $args['include_sortby'] ){
					?>
					<div class="ms-auto">
						<?php streamtube_core_load_template( 'user/sortby.php' ); ?>
					</div>
					<?php
				}?>
			</div>
			<?php
		}

		if ( ! empty( $_user_query->get_results() ) ):

			$row_classes = array( 'row' );
			$row_classes[] = 'row-cols-' . $col;
			$row_classes[] = 'row-cols-sm-' . $col_sm;
			$row_classes[] = 'row-cols-lg-' . $col_lg;
			$row_classes[] = 'row-cols-xl-' . $col_xl;
			$row_classes[] = 'row-cols-xxl-' . $col_xxl;

			printf(
				'<div data-paged="%s" class="post-grid members-grid"><div class="%s">',
				esc_attr( $args['paged'] ),
				esc_attr( join( ' ', $row_classes ) )
			);

			foreach ( $_user_query->get_results() as $user ):

				echo '<div class="mb-4 user-item">';

					streamtube_core_load_template( 'user/card.php', false, $user );

				echo '</div>';

			endforeach;

			echo '</div></div><!--.members-grid-->';

			if( $_user_query->total_users > (int)$args['number'] && ! wp_doing_ajax() ):
				// load more button.
				?>
				<div class="d-flex justify-content-center navigation border-bottom py-2 position-relative">

					<?php if( get_option( 'user_list_pagination', 'click' ) == 'click' ) : ?>

						<?php printf(
							'<button class="btn border text-secondary load-users load-on-click bg-light" data-params="%s" data-action="load_more_users">',
							esc_attr( json_encode( $args ) )
						);?>
							<span class="load-icon icon-angle-down position-absolute top-50 start-50 translate-middle"></span>
						</button>						

					<?php else:?>

						<span class="spinner spinner-border text-info" role="status">
							<?php printf(
								'<button class="btn jsappear load-users" data-params="%s" data-action="load_more_users">',
								esc_attr( json_encode( $args ) )
							);?>
								<span class="visually-hidden"><?php esc_html_e( 'Loading', 'streamtube-core' ); ?></span>
							</button>
						</span>

					<?php endif;?>
				</div>
				<?php
			endif;
		else:
			if( ! wp_doing_ajax() ):
			?>
			<div class="no-users p-3 text-center">
				<p class="text-muted">
					<?php esc_html_e( 'No users matched your search terms.', 'streamtube-core' )?>
				</p>
			</div>
			<?php
			endif;
		endif;

		$output = trim( ob_get_clean() );

		if( isset( $_POST['action'] ) && $_POST['action'] == 'load_more_users' ){
			return $output;
		}
		else{
			return sprintf(
				'<div class="archive-user user-grid"><div class="widget">%s</div></div>',
				$output
			);
		}
	}

	/**
	 *
	 * Add "users_list" shortcode
	 * 
	 * @return $this->_users_list()
	 *
	 * @since  1.0.0
	 * 
	 */
	public function user_grid(){
		add_shortcode( 'user_grid', array( $this , '_user_grid' ), 10 );
	}	

	/**
	 *
	 * AJAX load more users
	 * 
	 * @since  1.0.0
	 * 
	 */
	public function ajax_load_more_users(){

		check_ajax_referer( '_wpnonce' );

		if( ! isset( $_POST['data'] ) ){
			wp_send_json_error( array(
				'code'		=>	'invalid_request',
				'message'	=>	esc_html__( 'Invalid Request.', 'streamtube-core' )
			) );
		}

		$data = json_decode( wp_unslash( $_POST['data'] ), true );

		$data = array_merge( $data, array(
			'include_search'	=>	false,
			'include_sortby'	=>	false,
			'paged'				=>	(int)$data['paged']+1
		) );

		$output = $this->_user_grid( $data );

		wp_send_json_success( array(
			'message'	=>	'ok',
			'data'		=>	json_encode( $data ),
			'output'	=>	$output
		) );
	}	

	/**
	 *
	 * Posts
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function _post_grid( $args ){
		if( class_exists( 'Streamtube_Core_Widget_Posts' ) ){
			the_widget( 'Streamtube_Core_Widget_Posts', $args, array(
				'before_widget' => '<section class="widget widget-primary %1$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<div class="widget-title-wrap d-flex"><h2 class="widget-title d-flex align-items-center">',
				'after_title'   => '</h2></div>',
			) );
		}
	}

	/**
	 *
	 * Posts grid shortcode
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function post_grid(){
		add_shortcode( 'post_grid', array( $this , '_post_grid' ), 10 );
	}

	public function _playlist( $args ){

		$content_layout = 'grid';

		$args = wp_parse_args( $args, array(
			'post_type'			=>	'video',
			'post_status'		=>	'publish',
			'posts_per_page'	=>	10,
			'search'			=>	'',
			'orderby'			=>	'date',
			'order'				=>	'DESC',
			'ratio'				=>	'16x9',
			'style'				=>	'light',
			'layout'			=>	'list_sm',
			'template'			=>	'vertical',
			'upnext'			=>	'',
			'author_name'		=>	'on',
			'post_date'			=>	'',
			'post_comment'		=>	'',
			'boxed'				=>	''			
		) );

		if( $args['layout'] != 'grid' ){
			$content_layout = 'list';
		}

        $query_args = array(
            'post_type'         =>  $args['post_type'],
            'post_status'       =>  $args['post_status'],
            'posts_per_page'    =>  $args['posts_per_page'],
            's'                 =>  $args['search'],
            'orderby'           =>  $args['orderby'],
            'order'             =>  $args['order'],
            'meta_query'        =>  array()
        );

        if( $args['post_type'] == 'video' ){
        	$query_args['meta_query'][] = array(
                'key'       =>  '_thumbnail_id',
                'compare'   =>  'EXISTS'
        	);
        	$query_args['meta_query'][] = array(
                'key'       =>  'video_url',
                'compare'   =>  'EXISTS'
        	);        	
        }

        // Set taxonomies
        $taxonomies = get_object_taxonomies( $query_args['post_type'], 'object' );

        if( $taxonomies ){

            $tax_query = array();

            foreach ( $taxonomies as $tax => $object ) {
                
                if( array_key_exists( 'tax_query_' . $tax , $args ) && $args[ 'tax_query_' . $tax ] ){
                    $tax_query[] = array(
                        'taxonomy'  =>  $tax,
                        'field'     =>  'slug',
                        'terms'     =>  (array)$args[ 'tax_query_' . $tax ]
                    );
                }
            }

            if( $tax_query ){
                $query_args['tax_query'] = $tax_query;
            }
        }        

        /**
         * 
         * Filter the post args
         *
         * @param array $args
         * @param array $settings
         *
         * @since 1.0.0
         * 
         */
        $query_args = apply_filters( 'streamtube/core/playlist/post_args', $query_args, $args );

        $post_query = new WP_Query( $query_args );

        if( ! $post_query->have_posts() ){
            return;
        }

        ob_start();

        $loop = 0;

        printf(
        	'<div class="widget-videos-playlist %s"><div class="%s"><div class="row">',
        	$args['upnext'] ? 'up-next' : 'up-next-off',
        	$args['boxed'] ? 'container' : 'no-container'
        );

            while ( $post_query->have_posts() ):

                $post_query->the_post();

                $loop++;

                if( $loop == 1 ){
                    // Get first post
                    
                    do_action( 'streamtube/playlist/first_post/loaded' );
                    
                    printf(
                    	'<div class="col-xxl-%1$s col-xl-%2$s col-lg-%2$s col-md-12 col-12">',
                    	$args['template'] == 'vertical' ? '9' : '12',
                    	$args['template'] == 'vertical' ? '8' : '12'
                    );

                        printf(
                            '<div class="embed-wrap"><div class="ratio ratio-%s">%s</div></div>',
                            $args['ratio'],
                           get_post_embed_html( 560, 315, get_the_ID() )
                        );
                    echo '</div>';

                    printf(
                    	'<div class="col-xxl-%1$s col-xl-%2$s col-lg-%2$s col-md-12 col-12">',
                    	$args['template'] == 'vertical' ? '3' : '12',
                    	$args['template'] == 'vertical' ? '4' : '12'
                    );

                    printf(
                        '<div class="playlist-item border post-grid-%s post-grid post-grid-%s d-none">',
                        sanitize_html_class( $args['style'] ),
                        sanitize_html_class( $args['layout'] )
                    );
                }

                printf(
                	'<div class="post-item %s p-3">',
                	$loop == 1 ? 'active' : ''
                );

                    get_template_part( 'template-parts/content/content', $content_layout, array(
                        'thumbnail_size'        =>  'medium',
                        'post_excerpt_length'   =>  0,
                        'show_author_name'		=>	$args['author_name'],
                        'show_post_date'		=>	$args['post_date'],
                        'show_post_comment'		=>	$args['post_comment']
                    ) );                        

                echo '</div>';

            endwhile;          

        echo '</div></div></div></div></div>';

        wp_reset_postdata();

        return ob_get_clean();
	}

	/**
	 *
	 * Playlist shortcode
	 * 
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function playlist(){
		add_shortcode( 'playlist', array( $this , '_playlist' ), 10 );
	}

	/**
	 *
	 * player shortcode generator 
	 * 
	 * @param  array $args
	 * @return string
	 *
	 * @since 1.0.9
	 */
	public function _player( $args = array() ){
		$args = wp_parse_args( $args, array(
			'post_id'   =>  '',
			'source'    =>  '',
			'poster'    =>  '',
			'ratio'     =>  get_option( 'player_ratio', '21x9' ),
			'player'	=>	'videojs',
			'autoplay'	=>	false
		) );

		ob_start();

		get_template_part( 'template-parts/player', $args['player'], $args );

		return ob_get_clean();
	}

	/**
	 *
	 * The player shortcode
	 *
	 * @since 1.0.9
	 * 
	 */
	public function player(){
		add_shortcode( 'player', array( $this , '_player' ), 10 );
	}

	/**
	 *
	 * The Upload shortcode
	 * 
	 * @param  array  $args
	 * @return string
	 *
	 * @since 2.1.7
	 * 
	 */
	public function _button_upload( $args = array() ){

		$args = wp_parse_args( $args, array(
			'type'			=>	'upload', // or embed
			'button_icon'	=>	'icon-videocam',
			'button_text'	=>	esc_html__( 'Upload Video', 'streamtube-core' ),
			'button_class'	=>	'btn btn-primary',
			'button_modal'	=>	'',
			'no_permission'	=>	esc_html__( 'Sorry, You do not have permission to upload videos.', 'streamtube-core' )
		) );

		if( $args['type'] == 'upload' && ! get_option( 'upload_files', 'on' ) ){
			return sprintf(
				'<p class="text-muted">%s</p>',
				esc_html__( 'Upload is disabled', 'streamtube-core' )
			);
		}

		$args['button_modal'] = '#modal-' . sanitize_html_class( $args['type'] );

		if( ! is_user_logged_in() ){
			return sprintf(
				'<p class="login-required text-muted">'. esc_html__( 'Please %s to upload videos', 'streamtube-core' ) .'</p>',
				'<a class="text-muted" href="'. esc_url( wp_login_url( get_permalink() ) ) .'">'. esc_html__( 'log in', 'streamtube-core' ) .'</a>'
			);
		}

		if( Streamtube_Core_Permission::can_upload() ){

			/**
			 * @since 2.1.7
			 */
			do_action( 'streamtube/core/shortcode/upload' );

			return sprintf(
				'<button type="button" class="%s" data-bs-toggle="modal" data-bs-target="%s">%s %s</button>',
				esc_attr( $args['button_class'] ),
				esc_attr( $args['button_modal'] ),
				'<span class="'. esc_attr( $args['button_icon'] ) .'"></span>',
				$args['button_text']
			);
		}else{
			return sprintf(
				'<p class="text-danger">%s</p>',
				$args['no_permission']
			);
		}
	}

	/**
	 *
	 * Add Upload shortcode
	 * 
	 * @since 2.1.7
	 */
	public function button_upload(){
		add_shortcode( 'button_upload', array( $this , '_button_upload' ), 10 );
	}

	/**
	 *
	 * [category_list] shortcode
	 * 
	 * @param  array  $args
	 * 
	 * @since 2.2.1
	 * 
	 */
	public function _term_grid( $args = array() ){

		$output = '';

		if( class_exists( 'Streamtube_Core_Widget_Term_Grid' ) ){

			the_widget( 'Streamtube_Core_Widget_Term_Grid', $args, array(
				'before_widget' => '<section class="widget widget-primary %1$s">',
				'after_widget'  => '</section>',
				'before_title'  => '<div class="widget-title-wrap d-flex"><h2 class="widget-title d-flex align-items-center">',
				'after_title'   => '</h2></div>',				
			) );

			$output = ob_get_clean();
		}

		return $output;
	}

	/**
	 *
	 * [category_list] shortcode
	 * 
	 * @param  array  $args
	 * 
	 * @since 2.2.1
	 * 
	 */
	public function term_grid(){
		add_shortcode( 'term_grid', array( $this , '_term_grid' ), 10 );
	}	
}
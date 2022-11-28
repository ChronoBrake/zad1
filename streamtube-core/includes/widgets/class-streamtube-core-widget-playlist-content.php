<?php
/**
 * Define the custom playlist functionality
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
class Streamtube_Core_Widget_Playlist_Content extends WP_Widget{

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::__construct()
	 */
	function __construct(){
	
		parent::__construct( 
			'playlist-content-widget' ,
			esc_html__('[StreamTube] Playlist Content', 'streamtube-core' ), 
			array( 
				'classname'		=>	'posts-widget streamtube-widget playlist-content-widget bg-white', 
				'description'	=>	esc_html__('[StreamTube] The Playlist Content', 'streamtube-core')
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
	 * AJAX search in collection
	 */
    public static function ajax_search_in_collection(){

        check_ajax_referer( '_wpnonce' );

        $instance = wp_parse_args( $_POST, array(
            'search'    		=>  '',
            'term_id'   		=>  0,
            'max_height'		=>	'',
            'thumbnail_ratio'	=>	'',
            'has_active'		=>	false
        ) );

        $instance['search'] = trim( $instance['search'] );

        if( empty( $instance['search'] ) ){
        	$instance['has_active'] = true;
        }

        extract( $instance );

        if( empty( $term_id ) ){
            wp_send_json_error( new WP_Error(
                'term_not_found',
                esc_html__( 'Collection was not found', 'streamtube-core' )
            ) );
        }

		ob_start();

		the_widget( __CLASS__, array_merge( $instance, array(	
			'wrapper'		=>	false
		) ), array(
			'before_widget'	=>	'',
			'after_widget'	=>	'',
			'before_title'	=>	'',
			'after_title'	=>	''
		) );

		$output = trim( ob_get_clean() );

		wp_send_json_success( $output );        
    }	

	/**
	 *
	 * Get collection instance
	 * 
	 */
	private function get_collection(){
		return $GLOBALS['streamtube']->get()->collection;
	}

	/**
	 *
	 * Get term ID
	 * 
	 * @return false|int
	 * 
	 */
	public function get_term_id(){
		global $streamtube;

		$term = $streamtube->get()->collection->_get_request_term_id();

		if( is_int( $term ) ){
			return $term;
		}

		if( is_array( $term ) ){
			return $term['decoded_id'];
		}

		return false;
	}

	/**
	 *
	 * Filter post type
	 */
	public function filter_post_type_link( $permalink, $post ){

		global $streamtube, $term;

		$params = $this->get_collection()->_prepare_play_all_params( $term->term_id );

		return add_query_arg( $params, $permalink );
	}

	/**
	 *
	 * Search in collection form
	 * 
	 */
	private function search_in_collection_form(){

		global $term, $widget_instance;

		?>
			<form class="collapse mt-3 form-ajax" id="search-in-playlist">
				<div class="input-group mb-3">
					<?php printf(
						'<input name="search" type="text" class="form-control rounded-0" placeholder="%s">',
						esc_attr__( 'Search...', 'streamtube-core' )
					);?>
					<button type="submit" class="btn p-2 btn-secondary rounded-0 btn-hide-icon-active">
						<span class="btn__icon icon-search"></span>
					</button>
				</div>
				<input type="hidden" name="action" value="search_in_collection">
				<?php printf(
					'<input type="hidden" name="term_id" value="%s">',
					esc_attr( $term->term_id )
				);?>
				<?php printf(
					'<input type="hidden" name="current_post" value="%s">',
					esc_attr( $widget_instance['current_post'] )
				);?>
				<?php printf(
					'<input type="hidden" name="max_height" value="%s">',
					esc_attr( $widget_instance['max_height'] )
				);?>
				<?php printf(
					'<input type="hidden" name="thumbnail_ratio" value="%s">',
					esc_attr( $widget_instance['thumbnail_ratio'] )
				);?>
			</form>
		<?php		
	}

	/**
	 *
	 * The playlist header
	 * 
	 */
	private function the_playlist_header( $posts ){

		$post_ids = wp_list_pluck( $posts, 'ID' ) ;

		global $term, $widget_instance;
		?>

		<div class="playlist-header border-bottom p-4">

			<div class="playlist-header_container d-flex">

				<?php printf(
					'<h3 class="playlist-title h6"><a class="text-body text-decoration-none" href="%s" title="%s">%s</a></h3>',
					esc_url( $this->get_collection()->get_term_link( $term ) ),
					esc_attr( $term->name_formatted ),
					$term->name_formatted
				);?>

				<?php if( $this->get_collection()->_is_owner( $term->term_id ) ): ?>
					<div class="playlist-header__right ms-auto">
						<div class="playlist-control">
							<div class="dropdown">
								<button class="btn btn-lg p-1 rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									<span class="btn__icon icon-ellipsis-vert"></span>
								</button>

								<ul class="dropdown-menu">

									<li class="nav-item">
										<?php printf(
											'<a class="dropdown-item d-flex align-items-center" data-term-id="%s" data-bs-toggle="modal" data-bs-target="#modal-search-videos" href="#">',
											esc_attr( $term->term_id )
										);?>
											<span class="menu-icon icon-plus"></span>
											<span class="menu-text">
												<?php esc_html_e( 'Add Videos', 'streamtube-core' );?>	
											</span>
										</a>
									</li>								

									<li class="nav-item">
										<?php printf(
											'<a class="dropdown-item d-flex align-items-center" href="%s">',
											esc_attr( $this->get_collection()->get_term_link($term) )
										);?>
											<span class="menu-icon icon-cog"></span>
											<span class="menu-text">
												<?php esc_html_e( 'Manage', 'streamtube-core' );?>	
											</span>
										</a>
									</li>

									<li><hr class="dropdown-divider"></li>

									<?php if( ! $this->get_collection()->_is_builtin_term( $term->term_id ) ): ?>

										<li class="nav-item">
											<a class="dropdown-item d-flex align-items-center" href="#"  data-bs-toggle="modal" data-bs-target="#modal-edit-collection" data-term-id="<?php echo $term->term_id; ?>">
												<span class="menu-icon icon-pencil"></span>
												<span class="menu-text">
													<?php esc_html_e( 'Edit', 'streamtube-core' );?>	
												</span>
											</a>
										</li>								

										<li class="nav-item">
											<a class="dropdown-item d-flex align-items-center" href="#"  data-bs-toggle="modal" data-bs-target="#modal-delete-collection" data-term-id="<?php echo $term->term_id; ?>">
												<span class="menu-icon icon-trash"></span>
												<span class="menu-text">
													<?php esc_html_e( 'Delete', 'streamtube-core' );?>	
												</span>
											</a>
										</li>

									<?php endif;?>

									<?php do_action( 'streamtube/core/collection/controls/loaded' );?>
								</ul>
							</div>		
						</div>
					</div>
				<?php endif;?>

			</div>

			<div class="playlist-meta__items d-flex align-items-center gap-4">

				<?php 
				if( $widget_instance['author_name'] ){
					get_template_part( 'template-parts/term', 'author' );	
				}
				?>

				<?php if( $widget_instance['status'] ): ?>
					<div class="term-meta__status">
						<?php
						if( $term->status == 'private' ){
							?>
							<span class="btn__icon icon-lock"></span>
							<?php
							esc_html_e( 'Private', 'streamtube-core' );
						}else{
							?>
							<span class="btn__icon icon-globe"></span>
							<?php
							esc_html_e( 'Public', 'streamtube-core' );
						}
						?>
					</div>
				<?php endif;?>

				<?php if( $post_ids ) : ?>
					<div class="term-meta__index">
						<?php 
						if( $widget_instance['current_post'] ){
							printf(
								'<span class="current-index">%s</span>/<span class="total">%s</span>',
								number_format_i18n( array_search( $widget_instance['current_post'] , array_values( $post_ids ) )  + 1 ),
								sprintf( _n( '%s video', '%s videos', $term->count, 'streamtube-core' ), number_format_i18n( $term->count ) )
							);
						}else{
							printf(
								'<span class="total">%s</span>',
								sprintf( _n( '%s video', '%s videos', $term->count, 'streamtube-core' ), number_format_i18n( $term->count ) )
							);
						}?>
					</div>
				<?php endif;?>

				<?php if( $widget_instance['search_form'] ): ?>
					<div class="term-meta__search">
						<button class="btn btn-sm p-0 shadow-none" data-bs-toggle="collapse" href="#search-in-playlist">
							<span class="btn__icon icon-search"></span>
						</button>
					</div>
				<?php endif;?>
			</div>			

			<?php if( $widget_instance['search_form'] ){
				$this->search_in_collection_form();
			}?>
		</div>

		<?php
	}

	/**
	 *
	 * The playlist dropdown control
	 * 
	 */
	private function the_playlist_control(){

		global $post, $term;

		?>
		<div class="playlist-item-control ms-auto">

			<div class="dropdown">
				<button class="btn btn-lg p-1 rounded-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					<span class="btn__icon icon-ellipsis-vert"></span>
				</button>

				<ul class="dropdown-menu">

					<?php
					/**
					 * Fires before playlist menu control item
					 */
					do_action( 'streamtube/core/playlist/control_menu_item/before' );
					?>

					<?php if( $this->get_collection()->_is_owner( $term->term_id ) ): ?>

					<?php
					$params = array(
						'post_id'	=>	$post->ID,
						'term_id'	=>	$term->term_id
					);
					?>

					<li class="nav-item">
						<?php printf(
							'<a class="dropdown-item d-flex align-items-center ajax-elm" data-action="set_post_collection" data-params="%s" href="#">',
							esc_attr( json_encode( $params ) )
						);?>
							<span class="menu-icon icon-minus"></span>
							<span class="menu-text">
								<?php esc_html_e( 'Remove', 'streamtube-core' );?>	
							</span>
						</a>
					</li>

					<li class="nav-item">
						<?php printf(
							'<a class="dropdown-item d-flex align-items-center ajax-elm" data-action="set_image_collection" data-params="%s" href="#">',
							esc_attr( json_encode( $params ) )
						);?>
							<span class="menu-icon icon-file-image"></span>
							<span class="menu-text">
								<?php esc_html_e( 'Set Thumbnail Image', 'streamtube-core' );?>	
							</span>
						</a>
					</li>

					<?php endif;?>

					<li class="nav-item">
						<a class="dropdown-item d-flex align-items-center" href="#" data-bs-toggle="modal" data-bs-target="#modal-collection">
							<span class="menu-icon icon-folder-open"></span>
							<span class="menu-text">
								<?php esc_html_e( 'Save to', 'streamtube-core' );?>	
							</span>
						</a>
					</li>

					<?php
					/**
					 * Fires after playlist menu control item
					 */
					do_action( 'streamtube/core/playlist/control_menu_item/after' );
					?>
				</ul>
			</div>
		</div>
		<?php
	}

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::widget()
	 */
	public function widget( $args, $instance ) {

		global $post;

		$is_auto_term = false;

		$instance = wp_parse_args( $instance, array(
			'term_id'			=>	'',
			'max_height'		=>	'400px',
			'thumbnail_ratio'	=>	get_option( 'thumbnail_ratio', '16x9' ),
			'search'			=>	'',
			'wrapper'			=>	true,
			'current_post'		=>	0,
			'has_active'		=>	true,
			'author_name'		=>	'',
			'status'			=>	'',
			'search_form'		=>	''
		));

		if( is_singular( 'video' ) && $post instanceof WP_Post ){
			$instance['current_post'] = $post->ID;
		}

		$instance['term_id'] = (int)$instance['term_id'];

		if( ! $instance['term_id'] || $instance['term_id'] == 0 ){
			$instance['term_id'] = $this->get_term_id();
			$is_auto_term = true;
		}

		$GLOBALS['widget_instance'] = $instance;

		/**
		 *
		 * Filter instance
		 * 
		 */
		$instance = apply_filters( 'streamtube/core/widget/playlist_content/instance', $instance );

		extract( $instance );

		if( ! $term_id || ! $this->get_collection()->_term_exists( $term_id ) ){
			return;
		}

		if( $is_auto_term && $current_post ){
			if( ! $this->get_collection()->_has_term( $current_post, $term_id ) ){
				return;
			}
		}

		// Check if the collection is accessible
		if( is_wp_error( $this->get_collection()->_can_view( $term_id ) ) && ! $this->get_collection()->_is_owner( $term_id ) ){
			return;
		}

		$extra_query = array();

		if( $search ){
			$extra_query['s'] = $search;
		}

		if( $wrapper ){
			echo $args['before_widget'];	
		}
			$posts = $this->get_collection()->_get_term_posts( $term_id, $extra_query );

				$index = 0;

				$GLOBALS['term'] = $this->get_collection()->_get_term( $term_id );

				echo $wrapper ? '<div class="playlist-content">' : '';

					if( $wrapper ){
						$this->the_playlist_header( $posts );
					}

					printf(
						'<div %s id="playlist-items-%s" class="playlist-items playlist-%s-items post-grid post-grid-list_sm border-bottom">',
						trim( esc_attr( $instance['max_height'] ) ) != "" ? 'style="max-height: '.esc_attr( $instance['max_height'] ).'"' : '',
						$term_id,
						count( $posts )
					);

						if( $posts ){
							foreach ( $posts as $post ){

								setup_postdata( $post );

							    $index++;

							    add_filter( 'post_type_link', array( $this , 'filter_post_type_link' ), 10, 2 );

							    printf(
							        '<div class="playlist-item gap-1 d-flex align-items-center %s p-3 border-bottom" id="playlist-item-%s">',
							        $current_post == get_the_ID() ? 'active' : '',
							        get_the_ID()
							    );

							    	printf(
							    		'<span class="item-index">%s</span>',
							    		$current_post == get_the_ID() ? '<span class="icon-play"></span>' : $index
							    	);

							    	$_content_args = array(
							            'thumbnail_size'        =>  'medium',
							            'thumbnail_ratio'		=>	$thumbnail_ratio,
							            'post_excerpt_length'   =>  0,
									    'show_post_comment'     =>  '',
									    'show_post_like'        =>  '',    
									    'show_author_name'      =>  'on',
									    'show_post_view'        =>  'on'
							    	);

							    	$_content_args = apply_filters( 'streamtube/core/widget/playlist_content/content_args', $_content_args, $instance );

							        get_template_part( 'template-parts/content/content', 'list', $_content_args );

							        if( is_user_logged_in() ){
							        	$this->the_playlist_control();
							    	}

							    echo '</div>';

							    remove_filter( 'post_type_link', array( $this , 'filter_post_type_link' ), 10, 2 );
							}
						}else{
							if( ! empty( $search ) ){
								printf(
									'<p class="not-found p-3 text-center text-muted fw-normal">%s</p>',
									esc_html__( 'Nothing matched your search terms', 'streamtube-core' )
								);
							}else{
								printf(
									'<p class="not-found p-3 text-center text-muted fw-normal">%s</p>',
									esc_html__( 'Collection is empty', 'streamtube-core' )
								);
							}
						}

					echo '</div>'; // playlist-items

				echo $wrapper ? '</div>' : ''; // playlist-content

				wp_reset_postdata();
				unset( $GLOBALS['term'] );

			if( $current_post && $has_active ): 
				?>
				<script type="text/javascript">
					var position = jQuery("#playlist-item-<?php echo $current_post; ?>").position().top - 120;
					jQuery( '#playlist-items-<?php echo $term_id; ?>' ).animate({scrollTop: position },'slow');
				</script>
				<?php
			endif;

		if( $wrapper ){
			echo $args['after_widget'];	
		}

		unset( $GLOBALS['widget_instance'] );

		do_action( 'streamtube/core/widget/playlist_content/loaded' );
	}	

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::update()
	 */
	public function update( $new_instance, $old_instance ) {
		return $new_instance;
	}	

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::form()
	 */
	public function form( $instance ){

		$instance = wp_parse_args( $instance, array(
			'term_id'		=>	'',
			'max_height'	=>	'400px',
			'author_name'	=>	'',
			'status'		=>	'',
			'search_form'	=>	''
		));
		?>
		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'term_id' ) ),
				esc_html__( 'Collection ID', 'streamtube-core')
			);?>			
			<?php printf(
				'<input type="number" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'term_id' ) ),
				esc_attr( $this->get_field_name( 'term_id' ) ),
				$instance['term_id']
			);?>
			<span class="field-help">
				<?php esc_html_e( 'Set a collection ID or leave blank for default', 'streamtube-core' );?>
			</span>			
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'title' ) ),
				esc_html__( 'Max Height', 'streamtube-core')
			);?>
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'max_height' ) ),
				esc_attr( $this->get_field_name( 'max_height' ) ),
				$instance['max_height']
			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'author_name' ) ),
				esc_html__( 'Show Author Name', 'streamtube-core')
			);?>
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'author_name' ) ),
				esc_attr( $this->get_field_name( 'author_name' ) ),
				checked( 'on', $instance['author_name'], false )
			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'status' ) ),
				esc_html__( 'Show Status', 'streamtube-core')
			);?>
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'status' ) ),
				esc_attr( $this->get_field_name( 'status' ) ),
				checked( 'on', $instance['status'], false )
			);?>
		</div>

		<div class="field-control">
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'search_form' ) ),
				esc_html__( 'Show Search Form', 'streamtube-core')
			);?>
			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s />',
				esc_attr( $this->get_field_id( 'search_form' ) ),
				esc_attr( $this->get_field_name( 'search_form' ) ),
				checked( 'on', $instance['search_form'], false )
			);?>
		</div>			
		<?php
	}	
}
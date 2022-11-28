<?php
/**
 * Define the custom users widget functionality
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
class Streamtube_Core_Widget_User_List extends WP_Widget{

	/**
	 * {@inheritDoc}
	 * @see WP_Widget::__construct()
	 */
	function __construct(){
	
		parent::__construct( 
			'user-list-widget' ,
			esc_html__('[StreamTube] User List', 'streamtube-core' ), 
			array( 
				'classname'		=>	'user-list-widget streamtube-widget', 
				'description'	=>	esc_html__('[StreamTube] User List', 'streamtube-core')
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
	 * {@inheritDoc}
	 * @see WP_Widget::widget()
	 */
	public function widget( $args, $instance ) {

		$instance = wp_parse_args( $instance, array(
			'title'					=>	'',
			'number'				=>	5,
			'role__in'				=>	'',
			'who'					=>	''
		) );

		$instance['title'] = apply_filters( 'widget_title', $instance['title'] );

		$query_args = array(
			'number'				=>	absint( $instance['number'] ),
			'has_published_posts'	=>	array( 'video' )
		);

		if( ! empty( $instance['role__in'] ) ){
			$query_args['role__in'] = array_map( 'trim', explode( ',', $instance['role__in'] ) );
		}

		if( ! empty( $instance['who'] ) ){
			$query_args['who'] = 'authors';
		}

		/**
		 * Filter query args
		 * @since 1.0.0
		 */
		$query_args = apply_filters( 'streamtube/widget/user_list/args', $query_args, $instance );

		$user_query = new WP_User_Query( $query_args );

		if ( empty( $user_query->get_results() ) ) {
			return;
		}

		echo $args['before_widget'];

			if( $instance['title'] ){
				echo $args['before_title'] . $instance['title'] . $args['after_title'];
			}

			echo '<ul class="user-list list-unstyled">';

				foreach ( $user_query->get_results() as $user ):

					$count = count_user_posts( $user->ID, $query_args['has_published_posts'], true );

					?>
					<li class="user-item mb-4">
						<div class="d-flex align-items-start">
							<?php
								streamtube_core_get_user_avatar( array(
			                        'user_id'       =>  $user->ID,
			                        'link'          =>  true,
			                        'wrap_size'     =>  'lg',
			                        'before'        =>  '<div class="user-wrap">',
			                        'after'         =>  '</div>'
								) );
							?>
							<div class="user-meta">
								<?php
									streamtube_core_get_user_name( array(
			                            'user_id'   =>  $user->ID,
			                            'before'    =>  '<h4 class="user-name m-0">',
			                            'after'     =>  '</h4>',
			                            'link'		=>	true
			                        ) );
								?>						
								<div class="video-count">
									<?php printf( _n( '%s video', '%s videos', $count, 'streamtube-core' ), number_format_i18n( $count ) ); ?>
								</div>
							</div>
						</div>
					</li>
					<?php

				endforeach;

			echo '</ul>';

		echo $args['after_widget'];
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
			'title'					=>	'',
			'number'				=>	5,
			'role__in'				=>	'',
			'who'					=>	''
		) );

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
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'role__in' ) ),
				esc_html__( 'Roles', 'streamtube-core')

			);?>
			
			<?php printf(
				'<input type="text" class="widefat" id="%s" name="%s" value="%s" />',
				esc_attr( $this->get_field_id( 'role__in' ) ),
				esc_attr( $this->get_field_name( 'role__in' ) ),
				esc_attr( $instance['role__in'] )

			);?>
			<span class="field-help">
				<?php esc_html_e( 'Specify roles to retrieve, separated by commas.', 'streamtube-core' ); ?>
			</span>			
		</div>

		<div class="field-control">

			<?php printf(
				'<input type="checkbox" class="widefat" id="%s" name="%s" %s/>',
				esc_attr( $this->get_field_id( 'who' ) ),
				esc_attr( $this->get_field_name( 'who' ) ),
				checked( 'on', $instance['who'], false )

			);?>
			<?php printf(
				'<label for="%s">%s</label>',
				esc_attr( $this->get_field_id( 'who' ) ),
				esc_html__( 'Only Retrieve Authors', 'streamtube-core')
			);?>		
		</div>		

		<?php
	}
}
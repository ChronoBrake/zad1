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

class Streamtube_Core_User {

	/**
	 *
	 * Holds the avatar meta key.
	 * 
	 * @var string
	 *
	 * @since  1.0.0
	 * 
	 */
	protected $_avatar_key		=	'_avatar';

	/**
	 *
	 * Holds the profile photo meta key.
	 * 
	 * @var string
	 *
	 * @since  1.0.0
	 * 
	 */
	protected $_profile_photo	=	'_profile_photo';

	/**
	 *
	 * Check if current author is mine
	 *
	 * 
	 * @return true|false
	 *
	 * @since  1.0.0
	 * 
	 */
	public function is_my_profile(){

		if( ! is_user_logged_in() || ! is_author() ){
			return false; // always return false if current page isn't author
		}

		if( get_current_user_id() == get_queried_object_id() ){
			return true;
		}

		return false;
	}

	/**
	 *
	 * Check if user is verified
	 * 
	 * @param  integer $user_id
	 * @return boolean
	 *
	 * @since 2.2
	 * 
	 */
	public function is_verified( $user_id = 0 ){

		if( ! $user_id ){
			$user_id = get_current_user_id();
		}

		$is_verified = get_user_meta( get_current_user_id(), '_verification', true );

		/**
		 *
		 * Filter the $is_verified
		 *
		 * @param boolean $is_verified
		 * @param int $user_id
		 *
		 * @since 2.2
		 * 
		 */
		return apply_filters( 'streamtube/core/user/is_verified', $is_verified, $user_id );

	}

	/**
	 *
	 * Get user dashboard URL
	 * 
	 * @param  integer $user_id
	 * @param  string  $endpoint
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_dashboard_url( $user_id = 0, $endpoint = '' ){
		if( ! $user_id ){
			return;
		}

		$url = get_author_posts_url( $user_id );

		if( ! get_option( 'permalink_structure' ) ){
			return add_query_arg( array(
				'dashboard'	=>	$endpoint
			), $url );
		}

		return trailingslashit( $url ) . 'dashboard/' . $endpoint;		
	}

	/**
	 *
	 * Get user avatar meta key
	 * 
	 * @return [type] [description]
	 */
	public function get_avatar_key(){
		/**
		 *
		 * filter and return the key
		 * @param  string  $this->_avatar_key
		 *
		 * @since  1.0.0
		 * 
		 */
		return apply_filters( 'streamtube_user_avatar_key', $this->_avatar_key );
	}

	/**
	 *
	 * Get user profile photo meta key
	 * 
	 * @return [type] [description]
	 */
	public function get_profile_photo_key(){
		/**
		 *
		 * filter and return the key
		 * @param  string  $this->_avatar_key
		 *
		 * @since  1.0.0
		 * 
		 */
		return apply_filters( 'streamtube_user_profile_photo_key', $this->_profile_photo );
	}

	/**
	 *
	 * Get the user avatar
	 *
	 * @param  array $args{
	 *
	 * 		@var int $user_id
	 * 		@var int $image_size
	 * 		@var string $wrap_size
	 * 		@var boolean $link link to user page
	 * 		@var string $before before name
	 * 		@var string $after after name
	 * 		@var boolean $echo print or return the result
	 * 
	 * }
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_avatar( $args = array() ){

		$args = wp_parse_args( $args, array(
			'user_id'			=>	'',
			'image_size'		=>	200,
			'wrap_class'		=>	'',
			'wrap_size'			=>	'',
			'link'				=>	true,
			'name'				=>	false,
			'name_class'		=>	'',
			'before'			=>	'',
			'after'				=>	'',
			'echo'				=>	true
		) );

		$user_data = get_user_by( 'ID', $args['user_id'] );

		if( ! $user_data ){
			return;
		}

		$image_classes = array( 'img-thumbnail' );

		$image = get_avatar( $args['user_id'], $args['image_size'], null, null, array(
			'class'	=>	join( ' ', $image_classes )
		) );

		if( $args['link'] ){
			$output = sprintf(
				'<a data-bs-toggle="tooltip" data-bs-placement="%s" class="d-flex align-items-center fw-bold text-decoration-none" title="%s" href="%s">%s</a>',
				! is_rtl() ? 'right' : 'left',
				esc_attr( $user_data->display_name ),
				esc_url( get_author_posts_url( $args['user_id'] ) ),
				$image
			);
		}
		else{
			$output = $image;
		}

		$image_classes = array( 'user-avatar', 'is-off' );

		if( $args['wrap_size'] ){
			$image_classes[] = 'user-avatar-' . esc_attr( $args['wrap_size'] );
		}

		if( $args['wrap_class'] ){
			$image_classes[] = $args['wrap_class'];
		}

		if( $this->is_verified() ){
			$image_classes[] = 'is-verified';
		}

		$output = sprintf(
			'<div class="%s">%s</div>',
			join( ' ', $image_classes ),
			$output
		);

		if( $args['name'] ){
			$args['name'] = sprintf(
				'<span class="user-name text-body %s"><a class="text-body fw-bold text-decoration-none" title="%s" href="%s">%s</a></span>',
				$args['name_class'] ? esc_attr( $args['name_class'] ) : 'ms-2',
				esc_attr( $user_data->display_name ),
				esc_url( get_author_posts_url( $args['user_id'] ) ),
				$user_data->display_name
			);
		}

		$output = $args['before'] . $output . $args['name'] . $args['after'];

		if( $args['echo'] ){
			echo $output;
		}
		else{
			return $output;	
		}
	}

	/**
	 *
	 * Get the user profile photo
	 *
	 * @param  array $args{
	 *
	 * 		@var int $user_id
	 * 		@var boolean $link link to user page
	 * 		@var boolean $echo print or return the result
	 * 
	 * }
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_profile_photo( $args ){

		$args = wp_parse_args( $args, array(
			'user_id'			=>	'',
			'before'			=>	'',
			'after'				=>	'',		
			'link'				=>	true,
			'echo'				=>	true
		) );

		$user_data = get_user_by( 'ID', $args['user_id'] );

		if( ! $user_data ){
			return;
		}

		$photo = get_user_meta( $args['user_id'], $this->get_profile_photo_key(), true );

		$output = sprintf(
			'<div class="profile-photo" style="background-image: url(%s)"></div>',
			esc_url( wp_get_attachment_url( $photo ) )
		);

		if( $args['link'] ){
			$output = sprintf(
				'<a title="%s" href="%s">%s</a>',
				esc_attr( get_user_by( 'ID', $args['user_id'] )->display_name ),
				esc_url( get_author_posts_url( $args['user_id'] )),
				$output
			);
		}

		$output = $args['before'] . $output . $args['after'];

		if( $args['echo'] ){
			echo $output;
		}
		else{
			return $output;	
		}
	}


	/**
	 *
	 * Get user social profiles
	 *
	 * @since 2.2
	 * 
	 */
	public function get_social_profiles( $user_id = 0, $social_id = '' ){

		if( ! $user_id ){
			$user_id = get_current_user_id();
		}

		$socials = (array)get_user_meta( $user_id, '_socials', true );

		if( $social_id ){
			if( array_key_exists( $social_id, $socials ) ){
				return $socials[ $social_id ];
			}else{
				return false;
			}			
		}

		return array_unique( $socials );
	}

	/**
	 *
	 * Filter author posts, make video a default
	 * 
	 * @param  WP_Query $query
	 *
	 * @since  1.0.0
	 * 
	 */
	public function pre_get_posts( $query ){
		if( $query->is_author() && $query->is_main_query() ){
			$query->set( 'post_type', 'video' );

			$query->set( 'meta_query', array(
				array(
					'key'		=>	'_thumbnail_id',
					'compare'	=>	'EXISTS'	
				),
				array(
					'key'		=>	Streamtube_Core_Post::VIDEO_URL,
					'compare'	=>	'EXISTS'
				)
			) );
		}
	}

	/**
	 *
	 * Filter avatar url
	 *
	 * @param array $args
	 * @param int|string|object $id_or_email
	 * @return array
	 *
	 * @since 1.0.0
	 *
	 */
	public function get_avatar_data( $args, $id_or_email ){

		$user_id = 0;

		if( is_numeric( $id_or_email ) ){
			$user_id = absint( $id_or_email );
		}
		elseif ( is_string( $id_or_email ) ) {
			$user = get_user_by( 'email' , $id_or_email );
			if( is_object( $user ) ){
				$user_id = $user->ID;
			}
		}
		elseif ( $id_or_email instanceof WP_User ) {
			$user_id = $id_or_email->ID;
		}
		elseif ( $id_or_email instanceof WP_Post ) {
			$user_id = $id_or_email->post_author;
		}
		elseif ( $id_or_email instanceof WP_Comment ) {
			$user_id = $id_or_email->user_id;
		}
		if( $_file_id = get_user_meta( $user_id, $this->get_avatar_key(), true ) ){
			if( $_file_id && get_attached_file( $_file_id ) ){
				$args['url'] = wp_get_attachment_image_url( $_file_id, 'thumbnail' );
			}
		}

		return $args;
	}

	/**
	 * Upload user photo
	 * 
	 * @return int|WP_Error
	 *
	 * @since  1.0.0
	 * 
	 */
	public function upload_photo(){

		$errors = new WP_Error();

		// Check image data
		if( ! isset( $_POST['image_data'] ) ){
			$errors->add(
				'no_image_data',
				esc_html__( 'Image data was not found.', 'streamtube-core' )
			);
		}

		$image_data = json_decode( wp_unslash($_POST['image_data']), true );

		if( ! isset( $_POST['field'] ) || ! in_array( $_POST['field'] , array( 'avatar', 'profile' ) ) ){
			$errors->add(
				'no_request_field',
				esc_html__( 'No request field.', 'streamtube' )
			);
		}		

		/**
		 *
		 * Filter the errors
		 * 
		 * @var WP_Error
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/user/upload_photo', $errors );

		if( $errors->get_error_code() ){
			return $errors;
		}

		if( ! function_exists( 'media_handle_upload' ) ){
			require_once( ABSPATH . 'wp-admin/includes/media.php' );
			require_once( ABSPATH . 'wp-admin/includes/file.php' );
			require_once( ABSPATH . 'wp-admin/includes/image.php' );
		}

		// Don't crop the image into multiple sizes
		add_filter( 'image_resize_dimensions', '__return_false', 99999, 1 );

		$attachment_id = media_handle_upload( 'file', null, array( '' ), array( 'test_form' => false ) );

		if( is_wp_error( $attachment_id ) ){
			return $attachment_id;
		}
		
		remove_filter( 'image_resize_dimensions', '__return_false', 99999, 1 );

		// Get the original image path
		//$original_image = wp_get_original_image_path( $attachment_id, true );
		$original_image = get_attached_file( $attachment_id );

		$exif_data = wp_read_image_metadata( $original_image );

		// Load the image into image editor
		$image_editor = wp_get_image_editor( $original_image );

		// If editor failed
		if( is_wp_error( $image_editor ) ){

			// Delete the file.
			wp_delete_attachment( $attachment_id, true );

			return $image_editor;
		}

		if( array_key_exists( 'orientation', $exif_data ) ){
			switch ( $exif_data['orientation'] ) {

				case 8:
					$image_editor->rotate( 90 );
				break;

				case 2:
					$image_editor->flip( true, false );
				break;

				case 7:
					$image_editor->flip( false, true );
					$image_editor->rotate( 90 );
				break;

				case 4:
					$image_editor->flip( false, true );
				break;			

				case 5:
					$image_editor->flip( false, true );
					$image_editor->rotate( 270 );
				break;				

				case 3:
					$image_editor->rotate( 180 );
				break;

				case 6:
					$image_editor->rotate( 270 );
				break;
			}			
		}

	    //$image_editor->crop( $image_data['x'], $image_data['y'], $image_data['width'],$image_data['height'] );
	    $image_editor->crop( 
	    	$image_data['x'],
	    	$image_data['y'],
	    	$image_data['width'],
	    	$image_data['height']
	    );

	    $image_save = $image_editor->save( $original_image );

	    if( is_wp_error( $image_save ) ){
			// Delete the file.
			wp_delete_attachment( $attachment_id, true );

	    	return $image_save;
	    }

	    wp_update_attachment_metadata( $attachment_id, wp_generate_attachment_metadata( $attachment_id,  $image_save['path'] ) );

	    $_field = ( $_POST['field'] == 'avatar' ) ? $this->get_avatar_key() : $this->get_profile_photo_key();

	    update_user_meta( get_current_user_id(), $_field, $attachment_id );

	    return $attachment_id;
	}

	/**
	 *
	 * Get default registration roles
	 *
	 * @since 2.1.6
	 * 
	 * @return array
	 */
	public function get_registration_roles(){
		$roles = array(
			'subscriber'	=>	array(
				'default'	=>	true,
				'label'		=>	esc_html__( 'Subscriber', 'streamtube-core' )
			),
			'author'	=>	array(
				'default'	=>	false,
				'label'		=>	esc_html__( 'Video Creator', 'streamtube-core' )
			),			
		);

		/**
		 * @since 2.1.6
		 */
		return apply_filters( 'streamtube/core/form/registration/roles', $roles );
	}

    /**
     *
     * Add additional fields to default WP Registration form
     * 
     * @since 2.1.6
     */
    public function build_form_registration(){

    	$settings = get_option( 'custom_registration', array(
    		'custom_role'		=>	'',
    		'first_last_name'	=>	''
    	) );

    	if( $settings['first_last_name'] ):
    		load_template( STREAMTUBE_CORE_PUBLIC . '/login/registration-display-name.php' );
    	endif;

    	if( $settings['custom_role'] ):
    		load_template( STREAMTUBE_CORE_PUBLIC . '/login/registration-roles.php' );
    	endif;
    }

	/**
	 *
	 * Verify registration form
	 *
	 * @param WP_Error $errors
	 * @param string $sanitized_user_login
	 * @param string $user_email
	 * 
	 * @see register_new_user
	 *
	 * @since 2.1.6
	 */
	public function verify_registration_role( $errors = false ){

    	$settings = get_option( 'custom_registration', array(
    		'custom_role'		=>	''
    	) );		

    	if( ! $settings['custom_role'] ){
    		return $errors;
    	}
    	
		if( isset( $_REQUEST['user_role'] ) ){

			if( ! in_array( $_REQUEST['user_role'], array_keys( $this->get_registration_roles() ) ) ){

				$errors = ! $errors ? new WP_Error() : $errors;

				$errors->add(
					'bad_request',
					sprintf(
						'<strong>%s </strong>: %s',
						esc_html__( 'Error', 'streamtube-core' ),
						esc_html__( 'Bad Request', 'streamtube-core' )
					)
				);
			}
		}

		return $errors;
	}	

	/**
	 *
	 * Proccess registration form
	 *
	 * @param int $user_id
	 * 
	 * @see register_new_user
	 *
	 * @since 2.1.6
	 */
	public function save_form_registration( $user_id ){

		$verify = $this->verify_registration_role();

		if( is_wp_error( $verify ) ){
			return $user_id;
		}

    	$settings = get_option( 'custom_registration', array(
    		'custom_role'		=>	'',
    		'first_last_name'	=>	''
    	) );		

    	$data = wp_parse_args( $_REQUEST, array(
    		'user_role'		=>	'',
    		'first_name'	=>	'',
    		'last_name'		=>	''
    	) );

    	// Update role
		if( $settings['custom_role'] && isset( $data['user_role'] ) && ! empty( $data['user_role'] ) ){

			if( ! in_array( sanitize_text_field( trim( $data['user_role'] ) ), array_keys( $this->get_registration_roles() ) ) ){
				$data['user_role'] = get_option( 'default_role', 'subscriber' );
			}

			$user = new WP_User( $user_id );

			$user->set_role( $data['user_role'] );
		}

		$user_data = array(
			'ID'			=>	$user_id,
			'first_name'	=>	sanitize_text_field( $data['first_name'] ),
			'last_name'		=>	sanitize_text_field( $data['last_name'] )			
		);

		if( $user_data['first_name'] && $user_data['last_name'] ){
			$user_data['display_name'] = sprintf(
				'%s %s',
				$user_data['first_name'],
				$user_data['last_name']
			);
		}

		// Update additional fields.
		wp_update_user( $user_data );
	}
}
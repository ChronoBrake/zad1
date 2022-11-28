<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

/**
 *
 * Get dashboard container classes
 * 
 * @since 2.2
 * @return array
 */
function streamtube_core_get_dashboad_container_classes(){

	$classes[] = 'p-4';

    $classes[] = 'section-' . sanitize_html_class( str_replace( '/', '-', get_query_var( 'dashboard' ) ) );

    if( function_exists( 'WC' )  ){
        $classes[] = 'has-woocommerce woocommerce';
    }	

    return apply_filters( 'streamtube_core_get_dashboad_container_classes', $classes );
}

/**
 *
 * Convert local datetime string to given format
 * 
 * @param  string $datetime
 * @return string
 *
 * @since 1.3
 * 
 */
function streamtube_convert_local_datetime( $datetime = '' ){
	if( ! $datetime ){
		return;
	}
	
	$format = sprintf( '%s %s', get_option( 'date_format' ), get_option( 'time_format' ) );

	return wp_date( $format, strtotime( $datetime ) );
}

/**
 *
 * Convert youtube duration to seconds
 * 
 * @param  string $duration
 * @return int
 *
 * @since 2.0
 * 
 */
function streamtube_convert_youtube_duration( $duration ) {
	$di = new DateInterval( $duration );

	$totalSec = 0;
	if ($di->h > 0) {
		$totalSec+=$di->h*3600;
	}
	if ($di->i > 0) {
		$totalSec+=$di->i*60;
	}
	$totalSec+=$di->s;

	return $totalSec;
}

/**
*
* Get the public template file
* 
* @param  string $file
* @return string file path
*
* @since  1.0.0
* 
*/
function streamtube_core_get_template( $file ){
	return trailingslashit( STREAMTUBE_CORE_PUBLIC ) . $file;
}

/**
*
* load the public template file
* 
* @param  string $file
* @return string file path
*
* @since  1.0.0
* 
*/
function streamtube_core_load_template( $file, $require_once = true, $args = array()  ){

	$_file = streamtube_core_get_template( $file );

	if( file_exists( $_file ) ){
		load_template( $_file, $require_once, $args  );	
	}
}

/**
*
* Generate the form field.
* 
* @param  array  $args
* @return HTML
*
* @since  1.0.0
* 
*/
function streamtube_core_the_field_control( $args = array() ){

	$wrap = $output = $data = '';

	$wrap_class = array();

	$args = wp_parse_args( $args, array(
		'label'			=>	'',
		'label_float'	=>	true,
		'required'		=>	false,
		'type'			=>	'text',
		'id'			=>	'',
		'name'			=>	'',
		'value'			=>	'',
		'options'		=>	array(),
		'current'		=>	'',
		'data'			=>	array(),
		'field_class'	=>	'form-control input-field',
		'wrap_class'	=>	'',
		'spellcheck'	=>	'false',
		'settings'		=>	array(),
		'description'	=>	'',
		'disabled'		=>	false,
		'readonly'		=>	false,
		'placeholder'	=>	'',
		'autocomplete'	=>	true,
		'wpmedia'		=>	false,
		'echo'			=>	true
	) );

	if( ! $args['name'] ){
		return $output;
	}

	if( ! $args['id'] ){
		$args['id'] = sanitize_key( $args['name'] );
	}

	if( $args['data'] ){
		foreach ( $args['data'] as $attribute => $value ) {
			if( ! empty( $value ) ){
				$data .= sprintf(
					' %s="%s"',
					sanitize_key( $attribute ),
					esc_attr( $value )
				);
			}
		}
	}

	/**
	 * @since 1.0.9
	 */
	$args = apply_filters( 'streamtube_core_the_field_control_args', $args );

	switch ( $args['type'] ) {
		case 'number':
		case 'text':
		case 'email':
		case 'url':
		case 'search':
		case 'password':
		case 'date':
		case 'time':
		case 'datetime-local':
		case 'hidden':
			$output = sprintf(
				'<input class="%s" %s spellcheck="%s" type="%s" value="%s" name="%s" id="%s" %s %s %s %s autocomplete="%s">',
				esc_attr( $args['field_class'] ),
				$args['required'] ? ' required' : '',
				esc_attr( $args['spellcheck'] ),
				esc_attr( $args['type'] ),
				esc_attr( $args['value'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['id'] ),
				$data,
				$args['disabled'] ? 'disabled' : '',
				$args['readonly'] ? 'readonly' : '',
				$args['placeholder'] ? 'placeholder="'.esc_attr( $args['placeholder'] ).'"' : '',
				$args['autocomplete'] ? 'on' : 'off'
			);

			if( $args['type'] == 'password' ){
				$output .= '<button type="button" class="btn btn-lock-pass position-absolute"><span class="btn__icon icon-eye"></span></button>';
			}
		break;

		case 'textarea':
			$output = sprintf(
				'<textarea class="%s" %s spellcheck="%s" name="%s" id="%s" %s>%s</textarea>',
				esc_attr( $args['field_class'] ),
				$args['required'] ? ' required' : '',
				esc_attr( $args['spellcheck'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['id'] ),
				$data,
				esc_textarea( $args['value'] )
			);			
		break;

		case 'editor':

			$args['label_float'] = false;

			ob_start();

			if( ! array_key_exists( 'settings', $args ) ){
				$args['settings'] = array();
			}

			$args['settings'] = array_merge( $args['settings'], array(
				'textarea_rows'	=>	5
			) );			

			if( function_exists( 'streamtube_get_theme_mode' ) && streamtube_get_theme_mode() == 'dark' ){
				$args['settings']['tinymce']['content_css'] = trailingslashit( STREAMTUBE_CORE_PUBLIC_URL ) . 'assets/css/editor-dark.css?ver=1';
			}else{
				$args['settings']['tinymce']['content_css'] = trailingslashit( STREAMTUBE_CORE_PUBLIC_URL ) . 'assets/css/editor-light.css?ver=1';
			}

			/**
			 *
			 * Filter the editor settings
			 *
			 * @param array $args['settings']
			 *
			 * @since 1.0.8
			 * 
			 */
			$args['settings'] = apply_filters( 'streamtube/core/field/editor_settings', $args['settings'], $args['id'] );

			wp_editor( $args['value'], $args['id'], $args['settings'] );

			$output = ob_get_clean();

		break;

		case 'checkbox':
		case 'radio':
			$args['label_float'] = false;

			if( empty( $args['value'] ) ){
				$args['value'] = 'on';
			}

			$output = sprintf(
				'<input class="form-check-input" %s type="%s" name="%s" id="%s" value="%s" %s %s>',
				$args['required'] ? ' required' : '',
				esc_attr( $args['type'] ),
				esc_attr( $args['name'] ),
				esc_attr( $args['id'] ),
				esc_attr( $args['value'] ),
				checked( $args['current'], $args['value'], false ),
				$data
			);
		break;

		case 'select';
			$output = sprintf(
				'<select class="%s" %s name="%s" id="%s" %s>',
				esc_attr( $args['field_class'] ),
				$args['required'] ? ' required' : '',
				esc_attr( $args['name'] ),
				esc_attr( $args['id'] ),
				$data
			);

				if( is_array( $args['options'] ) ){
					foreach ( $args['options'] as $key => $value ) {
						$output .= sprintf(
							'<option value="%s" %s>%s</option>',
							esc_attr( $key ),
							selected( $args['current'], $key, false ),
							esc_html( $value )
						);
					}
				}

			$output .= '</select>';
		break;
	}

	if( $output ){

		$wrap_class[] = 'mb-4 field-group';
		$wrap_class[] = 'field-' . sanitize_html_class( $args['id'] );

		if( $args['wrap_class'] ){
			$wrap_class[] = sanitize_html_class( $args['wrap_class'] );
		}

		if( $args['label_float'] ){
			$wrap_class[] = 'form-floating position-relative';
		}

		if( in_array( $args['type'] , array( 'checkbox', 'radio' ) ) ){
			$wrap_class[] = 'form-check';
		}

		$wrap =	 sprintf(
			'<div class="%s">',
			esc_attr( join( ' ', $wrap_class ) )
		);

			if( $args['required'] ){
				$args['label'] .= sprintf(
					'<span class="badge text-danger">%s</span>',
					esc_html__( '(required)', 'streamtube-core' )
				);
			}

			/**
			 *
			 * Filter the field output
			 * 
			 * @var array $args;
			 *
			 * @since  1.0.0
			 * 
			 */
			$wrap .= apply_filters( 'streamtube_core_the_field_control', $output, $args );

			if( $args['label'] && $args['type'] != 'editor' ){
				$wrap .= sprintf(
					'<label class="%s" for="%s">%s</label>',
					in_array( 'form-check', $wrap_class ) ? 'form-check-label' : 'field-label',
					esc_attr( $args['id'] ),
					$args['label']
				);
			}

			if( $args['description'] ){
				$wrap .= sprintf(
					'<div class="description text-muted small mt-2">%s</div>',
					$args['description']
				);
			}

			if( $args['wpmedia'] ){
				wp_enqueue_media();
				$wrap .= sprintf(
					'<button type="button" class="btn btn-secondary rounded-0 p-1 btn-wpmedia" data-media-type="video" data-media-source="id">
						<span class="icon icon-upload"></span>
					</button>'
				);
			}

		$wrap .= '</div>';
	}

	/**
	 *
	 * @since 1.0.9
	 * 
	 */
	$wrap = apply_filters( 'streamtube_core_the_field_control', $wrap, $args );

	if( $args['echo'] ){
		echo $wrap;
	}
	else{
		return $wrap;
	}
}


/**
*
* Build a bootstrap class array
*
* 
* @param  array  $args
* @return array
*
* @since  1.0.0
* 
*/
function streamtube_core_build_grid_classes( $args = array() ){
	$classes = array();

	$args = wp_parse_args( $args, array(
		'col_xxl'		=>	3,
		'col_xl'		=>	3,
		'col_lg'		=>	2,
		'col_md'		=>	2,
		'col_sm'		=>	1,
		'col'			=>	1
	) );

	foreach ( $args as $key => $value) {
		if( absint( $value ) == 0 ){
			$value = 1;
		}
		$classes[] = sanitize_html_class( sprintf( '%s-%s', str_replace( "_" , "-", $key ), 12/$value ) );
	}

	/**
	 *
	 * Filter and return the classes
	 *
	 * @param  array  $classes
	 *
	 * @param  array $args
	 *
	 * @since  1.0.0
	 * 
	 */
	return apply_filters( 'streamtube_core_build_grid_classes', $classes, $args );
}

/**
 *
 * Get max upload file size
 * 
 * @return int
 *
 * @since 1.0.0
 * 
 */
function streamtube_core_get_max_upload_size(){

	// Get default allowed size in byte
	$wp_max_size = wp_max_upload_size();

	$custom_max_size = (int)get_option( 'upload_max_file_size', 10 ) * 1048576;

	$min = min( $wp_max_size, $custom_max_size );

	if( ! class_exists( 'BigFileUploads' ) ){
		return $min;
	}

	$tuxbfu_settings = get_option( 'tuxbfu_settings' );

	$tuxbfu_max = (int)$tuxbfu_settings['limits']['all']['bytes'];

	if( ! is_user_logged_in() ){
		return max( $min, $tuxbfu_max );
	}

	if( is_array( $tuxbfu_settings ) ){
		if( $tuxbfu_settings['by_role'] ){

			$_roles = array();

			$roles = wp_get_current_user()->roles;

			foreach ( $tuxbfu_settings['limits'] as $role => $value ) {
			    $_roles[] = $role;
			}

			$intersect = array_intersect( $_roles , $roles );

			if( ! $intersect ){
				return max( $min, $tuxbfu_max );
			}

			// Reset the array
			$intersect = array_values( $intersect );
			$bytes = array();

			foreach ( $tuxbfu_settings['limits'] as $role => $value ) {
				if( in_array( $role , $intersect ) ){
					$bytes[] = $value['bytes'];
				}
			}

			if( $bytes ){
				return max( $bytes );
			}else{
				return max( $min, $tuxbfu_max );
			}
		}
	}

	return max( $min, $tuxbfu_max );
}
/**
 *
 * Convert number to iso8601 duration
 * 
 * @param  string|int $seconds
 * @return string
 *
 * @since 1.0.0
 * 
 */
function streamtube_core_iso8601_duration( $seconds ){

	$seconds = (int)$seconds;

    $days = floor($seconds / 86400);
    $seconds = $seconds % 86400;

    $hours = floor($seconds / 3600);
    $seconds = $seconds % 3600;

    $minutes = floor($seconds / 60);
    $seconds = $seconds % 60;

    return sprintf( 'P%dDT%dH%dM%dS', $days, $hours, $minutes, $seconds);
}

/**
 *
 * Get ratio options
 * 
 * @return array
 *
 * @since 1.0.6
 * 
 */
function streamtube_core_get_ratio_options(){
    $options = array(
        '21x9'  =>  esc_html__( '21x9', 'streamtube-core' ),
        '16x9'  =>  esc_html__( '16x9', 'streamtube-core' ),
        '4x3'   =>  esc_html__( '4x3', 'streamtube-core' ),
        '1x1'   =>  esc_html__( '1x1', 'streamtube-core' )
    );

    return apply_filters( 'streamtube_core_get_options_ratio', $options );
}

/**
 *
 * Format post view count
 * 
 * @param int $int
 * @return string formatted string
 *
 * @since 1.0.8
 * 
 */
function streamtube_core_format_page_views( $int ){
	$formatted = number_format_i18n( $int );

	/**
	*
	* Filter formatted post view
	*
	* @param string $formatted
	* @param int $int
	*
	* @since 1.0.8
	* 
	*/
	return apply_filters( 'streamtube_core_format_page_views', $formatted, $int );
}

/**
 *
 * Get hostname
 * 
 * @return string
 *
 * @since 2.0
 * 
 */
function streamtube_core_get_hostname( $scheme_included = false ){
    $parsed_url = parse_url( home_url() );

    if( $scheme_included ){
        return sprintf( '%s://%s', $parsed_url['scheme'], $parsed_url['host'] );
    }

    return $parsed_url['host'];
}

/**
 *
 * The Login form
 * 
 * @param  array  $args
 * @return string
 * 
 */
function streamtube_core_the_login_form( $args = array() ){
	$args = wp_parse_args( $args, array(
		'echo'	=>	false
	) );

	$output = wp_login_form( $args );

	$output = str_replace( 'class="input"', 'class="form-control w-100"', $output );
	$output = str_replace( 'button button-primary', 'btn btn-danger d-block w-100', $output );

	$output .= '<div class="d-flex gap-3 justify-content-center border-top pt-3">';

		if( get_option( 'users_can_register' ) ){
			$output .= sprintf(
				'<a class="register text-body fw-bold text-decoration-none" href="%s">%s</a>',
				esc_url( wp_registration_url() ),
				esc_html__( 'Register', 'streamtube-core' )
			);
		}

		$output .= sprintf(
			'<a class="lost-password text-body fw-bold text-decoration-none" href="%s">%s</a>',
			esc_url( wp_lostpassword_url() ),
			esc_html__( 'Lost your password?', 'streamtube-core' )
		);		

	$output .= '</div>';

	return $output;
}

/**
 *
 * The upload form
 * 
 * @param  array $args
 * @return string
 *
 * @since 2.1.7
 * 
 */
function streamtube_core_the_upload_form( $args = array() ){

	$output = '';

	$args = wp_parse_args( $args, array(
		'no_perm_text'			=>	esc_html__( 'Sorry, You do not have permission to upload videos.', 'streamtube-core' ),
		'uppload_text'			=>	esc_html__( 'Click here to upload video file.', 'streamtube-core' ),
		'max_size_text'			=>	sprintf(
			esc_html__( 'Maximum upload file size: %s MB', 'streamtube-core' ),
			number_format_i18n( ceil( streamtube_core_get_max_upload_size()/1048576 ) )
		),
		'allowed_formats_text'	=>	sprintf(
			esc_html__( 'Allowed Formats: %s', 'streamtube-core' ),
			'<span class="text-info">'. join( ', ', wp_get_video_extensions() ) .'</span>'
		),
		'uploading_text'		=>	esc_html__( 'is being uploaded, please wait for a moment.', 'streamtube-core' ),
		'echo'					=>	true
	) );

	/**
	 *
	 * Filter the args
	 * 
	 * @param array 
	 *
	 * @since 2.1.7
	 * 
	 */
	$args = apply_filters( 'streamtube_core_the_upload_form_args', $args );

	// turn on buffering
	ob_start();

	streamtube_core_load_template( 'form/upload-video.php', false, $args );

	/**
	 *
	 * Filter the form output
	 * 
	 * @param string
	 *
	 * @since 2.1.7
	 * 
	 */
	$output = apply_filters( 'streamtube_core_the_upload_form', ob_get_clean(), $args );

	if( $args['echo'] ){
		echo $output;
	}else{
		return $output;
	}

}

/**
 *
 * The embed form
 * 
 * @param  array $args
 * @return string
 *
 * @since 2.1.7
 * 
 */
function streamtube_core_the_embed_form( $args = array() ){

	$output = '';

	$args = wp_parse_args($args, array(
		'echo'	=>	true
	) );

	// turn on buffering
	ob_start();

	streamtube_core_load_template( 'form/embed-video.php', false, $args );

	/**
	 *
	 * Filter the form output
	 * 
	 * @param string
	 *
	 * @since 2.1.7
	 * 
	 */
	$output = apply_filters( 'streamtube_core_the_embed_form', ob_get_clean(), $args );

	if( $args['echo'] ){
		echo $output;
	}else{
		return $output;
	}
}

/**
 *
 * Get Max Upload Image size
 * 
 * @return int
 */
function streamtube_core_get_max_upload_image_size(){

    $max_size 		= (int)get_option( 'max_thumbnail_size', 2 ) * 1024 * 1024;
    $wp_max_size 	= wp_max_upload_size();

    $size = min( $max_size, $wp_max_size );

    if( Streamtube_Core_Permission::moderate_posts() ){
    	//$size = $wp_max_size;
    }

    /**
     *
     * Filter the size
     *
     * @param int $size
     * 
     */
    return apply_filters( 'streamtube_core_get_max_upload_image_size', $size );
}
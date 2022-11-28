<?php
/**
 * Define the post functionality
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

class Streamtube_Core_Post{

	const CPT_VIDEO 			=	'video';

	/**
	 *
	 * Holds the video meta field name
	 * 
	 * @var string
	 *
	 * @since  1.0.0
	 * 
	 */
	const VIDEO_URL 			=	'video_url';

	/**
	 * Plugin instance
	 */
	private function plugin(){
		return streamtube_core()->get();
	}

	/**
	 *
	 * Register video post type
	 *
	 * @since    1.0.0
	 */
	public function cpt_video(){
		/**
		 * Post Type: Videos.
		 *
		 * @since 1.0.0
		 */

		$labels = array(
			'name' 									=> esc_html__( 'Videos', 'streamtube-core' ),
			'singular_name' 						=> esc_html__( 'Video', 'streamtube-core' )	
		);

		$args = array(
			'label' 								=> esc_html__( 'Videos', 'streamtube-core' ),
			'labels' 								=> $labels,
			'description' 							=> '',
			'public' 								=> true,
			'publicly_queryable' 					=> true,
			'show_ui' 								=> true,
			'show_in_rest' 							=> false,
			'rest_base' 							=> '',
			'rest_controller_class' 				=> 'WP_REST_Posts_Controller',
			'has_archive' 							=> true,
			'show_in_menu' 							=> true,
			'show_in_nav_menus' 					=> true,
			'delete_with_user' 						=> false,
			'exclude_from_search' 					=> false,
			'capability_type' 						=> 'post',
			'map_meta_cap' 							=> true,
			'hierarchical' 							=> false,
			'rewrite' 								=> array( 
				'slug'			=>	'video', 
				'with_front'	=>	true 
			),
			'query_var' 							=> true,
			'supports' 								=>  array( 
				'title', 
				'editor', 
				'thumbnail', 
				'excerpt', 
				'trackbacks', 
				'custom-fields', 
				'comments', 
				'author' 
			),
			'menu_icon'								=>	'dashicons-video-alt3'
		);

		if( function_exists( 'buddypress' ) && bp_is_active( 'activity' ) ){
			$args['labels'] = array_merge( $args['labels'], array(
	            'bp_activity_admin_filter' 			=> esc_html__( 'New video uploaded', 'streamtube-core' ),
	            'bp_activity_front_filter' 			=> esc_html__( 'Videos', 'streamtube-core' ),
	            'bp_activity_new_post'    			=> __( '%1$s uploaded a new <a href="%2$s">video</a>', 'streamtube-core' ),
	            'bp_activity_new_post_ms'  			=> __( '%1$s uploaded a new <a href="%2$s">video</a>, on the site %3$s', 'streamtube-core' ),
				'bp_activity_comments_admin_filter' => __( 'Comments about videos', 'streamtube-core' ),
				'bp_activity_comments_front_filter' => __( 'Video Comments', 'streamtube-core' ),
				'bp_activity_new_comment'           => __( '%1$s commented on the <a href="%2$s">video</a>', 'streamtube-core' ),
				'bp_activity_new_comment_ms'        => __( '%1$s commented on the <a href="%2$s">video</a>, on the site %3$s', 'streamtube-core' )	            
			) ) ;

			$args['supports'][]						=	'buddypress-activity';

			// Syncing comments requires Site Tracking component activated.
			$args['bp_activity']					=	array(
	            'component_id' 		=>	buddypress()->activity->id,
	            'action_id'    		=>	'new_video',
	            'comment_action_id'	=>	'new_video_comment',
	            'contexts'     		=>	array( 'activity', 'member', 'member_groups', 'group' ),
	            'position'     		=>	40
        	);
		}

		register_post_type( self::CPT_VIDEO, $args );
	}

	/**
	 *
	 * Get CPT video slug
	 * 
	 * @return false|string
	 *
	 * @since 1.0.8
	 * 
	 */
	public function get_post_type_slug( $post_type ){

		if( $post_type == 'post' ){
			return $post_type;
		}

		if( ! post_type_exists( $post_type ) ){
			return false;
		}

		$post_type_object = get_post_type_object( $post_type );

		if( ! $post_type_object->rewrite ){
			return $post_type;
		}

		return $post_type_object->rewrite['slug'];
	}

	/**
	 *
	 * Check if Ad disabled for given post
	 * 
	 * @param  int $post_id
	 * @return string
	 *
	 * @since 1.3
	 * 
	 */
	public function is_ad_disabled( $post_id = 0 ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$disable_ad = get_post_meta( $post_id, 'disable_ad', true );

		if( $disable_ad ){
			$disable_ad = true;
		}
		else{
			$disable_ad = false;
		}

		/**
		 *
		 * @since 1.3
		 * 
		 */
		return apply_filters( 'streamtube/core/video/is_ad_disabled', $disable_ad, $post_id );
	}

	/**
	 *
	 * Disable Ad for given post
	 * 
	 * @param  int $post_id
	 *
	 * @since 1.3
	 */
	public function disable_ad( $post_id = 0 ){
		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		return update_post_meta( $post_id, 'disable_ad', 'on' );
	}

	/**
	 *
	 * Enable Ad for given post
	 * 
	 * @param  int $post_id
	 *
	 * @since 1.3
	 */
	public function enable_ad( $post_id = 0 ){
		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		return delete_post_meta( $post_id ,'disable_ad' );
	}

	/**
	 *
	 * Update Ad Schedule for given post
	 * 
	 * @param  int $post_id
	 *
	 * @since 1.3
	 */
	public function update_ad_schedules( $post_id = 0, $ad_schedules = array() ){
		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		return update_post_meta( $post_id ,'ad_schedules', $ad_schedules );
	}

	/**
	 *
	 * Get Ad Schedule from given post
	 * 
	 * @param  int $post_id
	 *
	 * @since 1.3
	 */
	public function get_ad_schedules( $post_id = 0 ){
		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$ad_schedules = (array)get_post_meta( $post_id ,'ad_schedules', true );

		if( is_array( $ad_schedules ) ){
			$ad_schedules = array_unique( $ad_schedules );
		}

		/**
		 *
		 * Filter and return the ad
		 * 
		 */
		return apply_filters( 'streamtube/core/video/ad_schedules', $ad_schedules, $post_id );
	}	

	/**
	 *
	 * Get video source
	 * 
	 * @param  int $post_id
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_source( $post_id = 0 ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$source = trim( get_post_meta( $post_id, self::VIDEO_URL, true ) );

		/**
		 *
		 * Filter and return the source
		 * 
		 */
		return apply_filters( 'streamtube/core/video/source', $source, $post_id );
	}

	/**
	 * 
	 * Update post source
	 * @param  int $post_id
	 * @param  string $sourc
	 * @return update_post_meta()
	 *
	 * @since 1.0.6
	 * 
	 */
	public function update_source( $post_id = 0, $source = '' ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

        $source = wp_unslash( $source );

        return update_post_meta( $post_id, self::VIDEO_URL, $source );		
	}

	/**
	 *
	 * Get video source
	 * 
	 * @param  int $post_id
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_aspect_ratio( $post_id = 0 ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$default = get_option( 'player_ratio', '21x9' );

		$ratio = get_post_meta( $post_id, '_aspect_ratio', true );

		if( empty( $ratio ) ){
			$ratio = $default;
		}

		return $ratio;
	}

	/**
	 *
	 * Update ratio
	 * 
	 * @param  int $post_id
	 * @param  string $aspect_ratio
	 * @return update_post_meta() or false
	 *
	 * @since 1.0.6
	 * 
	 */
	public function update_aspect_ratio( $post_id = 0, $aspect_ratio  = '' ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}		

		$aspect_ratio = sanitize_text_field( $aspect_ratio );

		if( empty( $aspect_ratio ) ){
			return update_post_meta( $post_id, '_aspect_ratio', '' );
		}

		$supported_ratios = streamtube_core_get_ratio_options();

		if( array_key_exists( $aspect_ratio, $supported_ratios ) ){
			return update_post_meta( $post_id, '_aspect_ratio', $aspect_ratio );
		}

		return false;
	}

	/**
	 *
	 * Get post thumbnail
	 * 
	 * @param  int $post_id
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_thumbnail_url( $post_id = 0, $size = 'large' ){

		$thumbnail_url = '';

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		if( has_post_thumbnail( $post_id ) ){
			$thumbnail_url = wp_get_attachment_image_url( get_post_thumbnail_id(  $post_id ), $size );
		}

		/**
		 *
		 * Filter and return the thumbnail url
		 *
		 * param $thumbnail_url
		 * @param int $post_id
		 *
		 * @since 1.0.6
		 * 
		 */
		return apply_filters( 'streamtube/core/video/thumbnail_url', $thumbnail_url, $post_id );
	}

	/**
	 *
	 * Get post thumbnail 2
	 * 
	 * @param  int $post_id
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_thumbnail_image_url_2( $post_id = 0 ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$image_url = get_post_meta( $post_id, '_thumbnail_url_2', true );

		$attachment_id = attachment_url_to_postid( $image_url );

		if( $attachment_id ){
			$image_url = wp_get_attachment_image_url( $attachment_id, 'full' );
		}

		/**
		 *
		 * Filter and return the thumbnail url 2
		 *
		 * param $image_url
		 * @param int $post_id
		 *
		 * @since 1.0.6
		 * 
		 */
		return apply_filters( 'streamtube/core/video/thumbnail_url_2', $image_url, $post_id );
	}

	/**
	 *
	 * Update post thumbnail image 2
	 * 
	 * @param  int $post_id
	 * @param  int $thumbnail_id
	 * @return update_post_meta() or false
	 *
	 * @since 1.0.6
	 * 
	 */
	public function update_thumbnail_image_url_2( $post_id = 0, $thumbnail_id ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$image_url = $thumbnail_id;

		if( wp_attachment_is_image( $thumbnail_id ) ){
			$image_url = wp_get_attachment_image_url( $thumbnail_id, 'full' );
		}

		return update_post_meta( $post_id, '_thumbnail_url_2', $image_url );
	}

	/**
	 *
	 * Get video source
	 * 
	 * @param  int $post_id
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_length( $post_id = 0 ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$length = get_post_meta( $post_id, '_length', true );

		$source = $this->get_source();

		if( wp_attachment_is( 'video', $source ) ){
			$metadata = wp_get_attachment_metadata( $source );

			if( is_array( $metadata ) ){
				if( array_key_exists( 'length', $metadata ) ){
					$length = absint( $metadata['length'] );	
				}
			}
		}

		/**
		 *
		 * Filter and return the length
		 * 
		 */
		return apply_filters( 'streamtube/core/video/length', $length, $post_id );		
	}

	/**
	 *
	 * Update length
	 * 
	 * @param  int $post_id
	 * @param  string $length
	 * @return update_post_meta() or false
	 *
	 * @since 1.0.6
	 * 
	 */
	public function update_length( $post_id = 0, $length  = '' ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}		

		$length = sanitize_text_field( $length );

		if( empty( $length ) ){
			return false;
		}

		return update_post_meta( $post_id, '_length', $length );
	}

	/**
	 *
	 * get post views meta data
	 * 
	 * @return string
	 * 
	 */
	public function get_post_views_meta(){
		$types = array_keys( streamtube_core_get_post_view_types() );

		$type = get_option( 'sitekit_pageview_type', 'pageviews' );

		if( ! in_array( $type, $types ) ){
			$type = 'pageviews';
		}

		return '_' . $type;
	}

	/**
	 *
	 * Get post views
	 * 
	 * @param  int $post_id
	 * @return int
	 *
	 * @since 1.0.8
	 * 
	 */
	public function get_post_views( $post_id = 0 ){

		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$pageviews = (int)get_post_meta( $post_id, $this->get_post_views_meta(), true );

		/**
		 *
		 * @since 1.0.8
		 * 
		 */
		return apply_filters( 'streamtube/core/post/views', $pageviews, $post_id );
	}

	/**
	 *
	 * Get last seen post meta
	 * 
	 * @param  int $post_id
	 * @return datetime
	 *
	 * @since 1.0.8
	 */
	public function get_last_seen( $post_id = 0, $unix_timestamp = false ){
		if( ! $post_id ){
			$post_id = get_the_ID();
		}

		$last_seen = get_post_meta( $post_id, '_last_seen', true );

		if( $last_seen ){
			$last_seen = date( 'Y-m-d H:i:s', strtotime($last_seen) );

			if( $unix_timestamp ){
				$last_seen = strtotime( $last_seen );
			}
		}

		/**
		 *
		 * @since 1.0.8
		 * 
		 */
		return apply_filters( 'streamtube/core/post/last_seen', $last_seen, $post_id );
	}

	/**
	 *
	 * Register reject post status
	 *
	 * @see  https://developer.wordpress.org/reference/functions/register_post_status/
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function new_post_statuses(){
		register_post_status( 'reject', array(
			'label'                     =>	esc_html__( 'Reject', 'streamtube-core' ),
			'internal'					=>	true,
			'public'                    =>	false,
			'private'					=>	true,
			'exclude_from_search'       =>	true,
			'show_in_admin_all_list'    =>	true,
			'show_in_admin_status_list' =>	true,
			'label_count'               => _n_noop( 'Reject <span class="count">(%s)</span>', 'Reject <span class="count">(%s)</span>' ),
		) );

		register_post_status( 'encoding', array(
			'label'                     =>	esc_html__( 'Encoding', 'streamtube-core' ),
			'internal'					=>	true,
			'public'                    =>	false,
			'private'					=>	true,
			'exclude_from_search'       =>	true,
			'show_in_admin_all_list'    =>	true,
			'show_in_admin_status_list' =>	true,
			'label_count'               => _n_noop( 'Encoding <span class="count">(%s)</span>', 'Encoding <span class="count">(%s)</span>' ),
		) );
	}

	/**
	 * 
	 * Update post thumbnail
	 * 
	 * @param int $post
	 * @param int $thumbnail_id
	 *
	 * @since 1.0.0
	 * 
	 */
	private function set_post_thumbnail( $post, $thumbnail_id ){

		set_post_thumbnail( $post, $thumbnail_id );

		wp_update_post( array(
			'ID'			=>	$thumbnail_id,
			'post_parent'	=>	$post
		) );
	}

	/**
	 *
	 * Upload featured image
	 * 
	 * @return media_handle_upload()
	 *
	 * @since  1.0.0
	 * 
	 */
	public function upload_featured_image(){

		$errors = new WP_Error();

		// First, check user permission.
		if( ! current_user_can( 'upload_files' ) ){
			$errors->add( 
				'no_upload_files_perm', 
				esc_html__( 'You do no have permission to upload files.', 'streamtube-core' ) 
			);
		}

		// Check file format, allows image only.
		if( ! isset( $_FILES ) || ! array_key_exists( 'featured-image', $_FILES ) ){
			$errors->add( 
				'file_not_found', 
				esc_html__( 'File was not found.', 'streamtube-core' ) 
			);
		}

		if( $errors->get_error_code() ){
			return $errors;
		}		

		$file = $_FILES[ 'featured-image' ];
		
		$type = array_key_exists( 'type' , $file ) ? $file['type'] : '';

		if ( 0 !== strpos( $type, 'image/' ) ) {
			$errors->add( 
				'file_not_accepted', 
				esc_html__( 'File format is not accepted.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/upload_featured_image', $errors, $file );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		$attachment_id = media_handle_upload( 'featured-image', $_POST['post_ID'], array( '' ), array( 'test_form' => false ) );

		if( ! is_wp_error( $attachment_id ) ){
			$this->set_post_thumbnail( $_POST['post_ID'], $attachment_id );
		}

		return $attachment_id;
	}

	/**
	 *
	 * Get full post data
	 * 
	 * @param  [type] $post_id
	 *
	 * @since  1.0.0
	 * 
	 */
	private function get_post( $post_id ){

		$post = get_post( $post_id, ARRAY_A );

		return (object)array_merge( $post, array(
			'post_date_format'	=>	date( 'Y-m-d\TH:i' , strtotime( $post['post_date'] ) ),
			'post_thumbnail'	=>	get_the_post_thumbnail_url( $post_id, 'size-560-315' ),
			'post_embed_html'	=>	get_post_embed_html( 560, 315, $post_id ),
			'post_short_link'	=>	wp_get_shortlink( $post_id ),
			'post_edit_link'	=>	add_query_arg( array(
				'edit_post'	=>	1
			), wp_get_shortlink( $post_id ) )
		) );
	}

	/**
	 *
	 * Add new post on POST request
	 *
	 * @return int  $post_id
	 *
	 * @since 1.0.0
	 * 
	 * 
	 */
	private function add_post( $postarr = array() ){

		$errors = new WP_Error();

		$postarr = wp_parse_args( $postarr, array(
			'post_title'		=>	'Untitled',
			'post_status'		=>	'draft',
			'comment_status'	=>	'open'
		) );

		if( ! current_user_can( 'publish_posts' ) ){
			$errors->add(
				'no_permission',
				esc_html__( 'Sorry, you are not allowed to add new post.', 'streamtube-core' )
			);			
		}

		if( ! $postarr['post_title'] ){
			$errors->add(
				'empty_title',
				esc_html__( 'Title is required', 'streamtube-core' )
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
		$errors = apply_filters( 'streamtube/core/post/add_post', $errors, $postarr );

		if( $errors->get_error_code() ){
			return $errors;
		}

		if( $postarr['post_status'] == 'publish' && ! current_user_can( 'edit_others_posts' ) ){
			$postarr['post_status'] = 'pending';
		}

		if( get_option( 'auto_publish' ) ){
			$postarr['post_status'] = 'publish';
		}

		$postarr  = apply_filters( 'streamtube/core/post/add/postarr/pre', $postarr );

		$post_id = wp_insert_post( $postarr, true );

		if( ! is_wp_error( $post_id ) && is_int( $post_id ) ){

			$_POST['post_ID'] = $post_id;

			$this->upload_featured_image();

			return $this->get_post( $post_id );
		}

		// WP_Error
		return $post_id;
	}

	/**
	 *
	 * Do update post on POST request
	 * 
	 * @return int post_ID|WP_Error
	 *
	 * @since  1.0.0
	 * 
	 */
	public function update_post(){

		$errors = new WP_Error();

		$can_edit = false;

		if( ! isset( $_POST ) || ! array_key_exists( 'post_ID' , $_POST ) ){
			$errors->add( 
				'post_not_found', 
				esc_html__( 'Post was not found.', 'streamtube-core' ) 
			);
		}

		$post_id = (int)$_POST['post_ID'];

		$postdata = get_post( $post_id );

		if( ! current_user_can( 'edit_post', $post_id ) ){
			$errors->add( 
				'post_not_found', 
				esc_html__( 'Sorry, you are not allowed to edit this post.', 'streamtube-core' ) 
			);
		}

		if( array_key_exists( 'post_date' , $_POST ) ){
			$_POST['post_date'] = date( 'Y-m-d H:i:s', strtotime( $_POST['post_date'] ));
			$_POST['post_date_gmt'] = get_gmt_from_date($_POST['post_date']);
		}

		if( ! current_user_can( 'edit_others_posts' ) ){

			if( isset( $_POST['post_status'] ) && ! empty( $_POST['post_status'] ) ){

				$_post_status = $_POST['post_status'];

				if( ! in_array( $_post_status , array( 'pending', 'private' )) ){
					$_POST['post_status'] = 'pending';
				}

				if( get_option( 'auto_publish' ) && $_post_status == 'publish' ){
					$_POST['post_status'] = 'publish';
				}
			}

			// If the status is reject, move it to pending review
			if( $postdata->post_status == 'reject' ){
				$_POST['post_status'] = 'pending';
			}
		}

		// Parse tax_input
		if( array_key_exists( 'tax_input' , $_POST ) ){
			$tax_input = $_POST['tax_input'];

			$tag_tax = sprintf( '%s_tag', $postdata->post_type );

			if( array_key_exists( $tag_tax, $tax_input ) && taxonomy_exists( $tag_tax ) ){
				$_POST['tax_input'][$tag_tax] = explode(",", $tax_input[$tag_tax]);
			}
		}

		$_POST['post_author'] = $postdata->post_author;

		if( array_key_exists( 'post_name', $_POST ) && ! empty( $_POST['post_name'] ) ){
			$_POST['post_name'] = wp_unique_post_slug( 
				$_POST['post_name'], 
				$post_id, 
				$postdata->post_status, 
				$postdata->post_type, 
				$postdata->post_parent 
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
		$errors = apply_filters( 'streamtube/core/post/update/errors', $errors );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		$post_id = edit_post();

		if( is_int( $post_id ) ){

			$this->upload_featured_image();

			if( array_key_exists( 'meta_input', $_POST ) ){

				$meta_input = $_POST['meta_input'];

				// Update custom field values
				$custom_fields = array( '_embed', '_length', '_aspect_ratio' );
				
				for ($i=0; $i < count( $custom_fields ); $i++) { 
					if( isset( $meta_input[ $custom_fields[$i] ] ) ){
						update_post_meta( $post_id, $custom_fields[$i], $meta_input[ $custom_fields[$i] ] );
					}
					else{
						delete_post_meta( $post_id, $custom_fields[$i] );
					}
				}
			}

			$attachment_id = $this->get_source( $post_id );

			if( wp_attachment_is( 'video', $attachment_id ) ){
				$thumbnail_id_2 = get_post_meta( $attachment_id, '_thumbnail_id_2', true );

				if( $thumbnail_id_2 ){
					$this->update_thumbnail_image_url_2( $post_id, $thumbnail_id_2 );
				}
			}

			if( current_user_can( 'edit_others_posts' ) ){
				if( isset( $_POST['disable_ad'] ) ){
					update_post_meta( $post_id, 'disable_ad', 'on' );
				}
				else{
					delete_post_meta( $post_id, 'disable_ad' );	
				}
			}

			/**
			 * Fires after post updated successfully.
			 *
			 * @param  int $post_id
			 * 
			 * @since  1.0.0
			 */
			do_action( 'streamtube/core/post/updated', $post_id );
		}

		return $this->get_post( $post_id );
	}

	/**
	 *
	 * Do trash post on POST request
	 * 
	 * @return int post_ID|WP_Error
	 *
	 * @since  1.0.0
	 * 
	 */
	public function trash_post( $post_id = 0 ){

		$errors = new WP_Error();		

		if( isset( $_POST ) && array_key_exists( 'post_id' , $_POST ) ){
			$post_id = (int)$_POST['post_id'];
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			$errors->add( 
				'no_permission', 
				esc_html__( 'Sorry, you are not allowed to trash this post.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/trash/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		return wp_trash_post( $post_id );
	}

	/**
	 *
	 * Do Delete permanently post on POST request
	 * 
	 * @return int post_ID|WP_Error
	 *
	 * @since  1.0.0
	 * 
	 */
	public function delete_post( $post_id = 0 ){

		if( isset( $_POST ) && array_key_exists( 'post_id' , $_POST ) ){
			$post_id = (int)$_POST['post_id'];
		}

		$errors = new WP_Error();

		if ( ! current_user_can( 'delete_post', $post_id ) ) {
			$errors->add( 
				'no_permission', 
				esc_html__( 'Sorry, you are not allowed to delete this post.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/delete/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}			

		return wp_delete_post( $post_id, true );
	}

	/**
	 *
	 * Do approve post on POST request
	 * 
	 * @return int post_ID|WP_Error
	 *
	 * @since  1.0.0
	 * 
	 */
	public function approve_post( $post_id = 0 ){

		$errors = new WP_Error();

		if( isset( $_POST ) && array_key_exists( 'post_id' , $_POST ) ){
			$post_id = (int)$_POST['post_id'];
		}

		if( ! current_user_can( 'edit_others_posts' ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'You do not have permission to approve this post.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/approve/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		//$response = wp_publish_post( $post_id );
		$response = wp_update_post( array(
			'ID'			=>	$post_id,
			'post_status'	=>	'publish'
		) );

		if( apply_filters( 'notify_author_post_approve', true ) === true ){

			$message = isset( $_POST['message'] ) ? wp_unslash( $_POST['message'] ) : '';

			streamtube_core_notify_author_on_post_approve( $post_id, $message );
		}

		/**
		 *
		 * Fires after post approved.
		 *
		 * @param  int $post_id
		 *
		 * @since  1.0.0
		 * 
		 */
		do_action( 'streamtube_core_post_approved', $post_id );

		return $response;
	}

	public function reject_post( $post_id = 0 ){

		$errors = new WP_Error();

		if( isset( $_POST ) && array_key_exists( 'post_id' , $_POST ) ){
			$post_id = (int)$_POST['post_id'];
		}

		if( ! current_user_can( 'edit_others_posts' ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'You do not have permission to reject this post.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/reject/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		if( apply_filters( 'notify_author_post_approve', true ) === true ){

			$message = isset( $_POST['message'] ) ? wp_unslash( $_POST['message'] ) : '';

			streamtube_core_notify_author_on_post_reject( $post_id, $message );
		}

		return wp_update_post( array(
			'ID'			=>	$post_id,
			'post_status'	=>	'reject'
		) );
	}

	/**
	 *
	 * Mark post as pending
	 * 
	 * @param  integer $post_id
	 * @return WP_Error|wp_update_post()
	 *
	 * @since 1.0.0
	 * 
	 */
	public function pending_post( $post_id = 0 ){

		$errors = new WP_Error();

		if( isset( $_POST ) && array_key_exists( 'post_id', $_POST ) ){
			$post_id = (int)$_POST['post_id'];
		}

		if( ! current_user_can( 'edit_others_posts' ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'You do not have permission to move this post to pending.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/pending/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}			

		return wp_update_post( array(
			'ID'			=>	$post_id,
			'post_status'	=>	'pending'
		) );		
	}

	/**
	 *
	 * Restore a give post
	 * 
	 * @param  integer $post_id
	 * @return WP_Error|wp_untrash_post()
	 *
	 * @since 1.0.0
	 * 
	 */
	public function restore_post( $post_id = 0 ){

		$errors = new WP_Error();

		if( ! current_user_can( 'edit_post', $post_id ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'You do not have permission to approve this post.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/restore/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		return wp_untrash_post( $post_id );
	}

	/**
	 *
	 * Encode video post
	 * 
	 * @param  integer $post_id
	 *
	 * @since  1.0.0
	 * 
	 */
	public function encode_post( $post_id = 0 ){

		$errors = new WP_Error();

		if( ! function_exists( 'wp_video_encoder' ) ){
			$errors->add( 
				'wp_video_encoder_not_activated', 
				esc_html__( 'WP Video Encoder is not activated yet.', 'streamtube-core' ) 
			);
		}		

		if( ! current_user_can( 'edit_post', $post_id ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'You do not have permission to encode this video.', 'streamtube-core' ) 
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
		$errors = apply_filters( 'streamtube/core/post/encode/errors', $errors, $post_id );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		$source = $this->get_source( $post_id );

		if( wp_attachment_is( 'video', $source ) ){
			return wpve_insert_queue_item( $source );
		}
	}

	/**
	 *
	 * Bulk action
	 * 
	 * @param  integer $post_id
	 * @param  string action
	 * @return WP_Error|wp_untrash_post()
	 *
	 * @since 1.0.0
	 * 
	 */
	public function bulk_action( $post_id, $action = '' ){

		$errors = new WP_Error();

		$allow_actions = array( 'approve', 'reject', 'pending', 'trash', 'delete', 'restore', 'encode' );

		if( ! $post_id || ! $action || ! in_array( $action , $allow_actions ) ){
			$errors->add(
				'invalid_request',
				esc_html__( 'Invalid Request', 'streamtube-core' )
			);
		}

		if( in_array( $action , array( 'approve', 'reject', 'pending', 'encode' ) ) ){
				if( ! current_user_can( 'edit_others_posts' ) ){
				$errors->add(
					'no_permission', 
					esc_html__( 'You do not have permission to approve this post.', 'streamtube-core' ) 
				);
			}
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
		$errors = apply_filters( 'streamtube/core/post/bulk_action', $errors, $action );

		if( $errors->get_error_code() ){
			return $errors;
		}

		return call_user_func( array( $this , $action . '_post' ), $post_id );
	}

	/**
	 *
	 * Import embed URL
	 * 
	 * @param  string $source
	 * @return WP_Post
	 *
	 * @since 2.0
	 * 
	 */
	public function import_embed( $source = '' ){

		$errors = new WP_Error();

		$thumbnail_url = '';

		$source = wp_unslash( trim( $source ) );

		if( ! get_option( 'embed_videos', 'on' ) ){
			$errors->add(
				'embed_videos_disabled',
				esc_html__( 'Sorry, Embedding video is disabled', 'streamtube-core' )
			);
		}

		if( ! current_user_can( 'edit_posts' ) ){
			$errors->add(
				'no_permission',
				esc_html__( 'Sorry, You do not have permission to embed videos', 'streamtube-core' )
			);
		}

		if( empty( $source ) ){
			$errors->add(
				'empty_source',
				esc_html__( 'Source is required.', 'streamtube-core' )
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
		$errors = apply_filters( 'streamtube/core/post/import_embed/errors', $errors , $source );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		$postarr = array(
			'post_title'		=>	'Untitled',
			'post_type'			=>	'video',
			'comment_status'	=>	'open',
			'meta_input'		=>	array(
				self::VIDEO_URL => $source
			)
		);

		$oembed_data = $this->plugin()->oembed->get_data( $source );

		if( ! is_wp_error( $oembed_data ) && ! is_wp_error( $this->plugin()->license->is_verified() ) ){
			$postarr = array_merge( $postarr, array(
				'post_content'	=>	$oembed_data['provider_name']
			) );

			if( ! empty( $oembed_data['title'] ) ){
				$postarr['post_title'] = $oembed_data['title'];
			}

			$thumbnail_url = $oembed_data['thumbnail_url'];
		}

		/**
		 *
		 * Fires post args
		 *
		 * @param  array $postarr
		 * @param  string $source
		 * @param  array $oembed_data
		 *
		 * @since  1.0.0
		 * 
		 */
		$postarr  = apply_filters( 'streamtube/core/embed/postarr', $postarr, $source, $oembed_data );

		$response = $this->add_post( $postarr );

		if( is_wp_error( $response ) ){
			return $response;
		}

		if( $thumbnail_url ){

			if( ! function_exists( 'media_sideload_image' ) ){
				require_once(ABSPATH . 'wp-admin/includes/media.php');
				require_once(ABSPATH . 'wp-admin/includes/file.php');
				require_once(ABSPATH . 'wp-admin/includes/image.php');				
			}

			$thumbnail_id = media_sideload_image( $thumbnail_url, $response->ID, null, 'id' );

			if( is_int( $thumbnail_id ) ){
				$this->set_post_thumbnail( $response->ID, $thumbnail_id );
			}
		}

		/**
		 *
		 * Fires after embed imported
		 *
		 * @param  WP_Post $response
		 * @param  string $source
		 * @param  array $oembed_data
		 *
		 * @since  1.0.0
		 * 
		 */
		do_action( 'streamtube/core/embed/imported', $response, $source, $oembed_data );

		return $this->get_post( $response->ID );
	}

	/**
	 *
	 * AJAX import embed
	 * 
	 * @since  1.0.0
	 * 
	 */
	public function ajax_import_embed(){

		check_ajax_referer( '_wpnonce' );	

		$data = wp_parse_args( $_POST, array(
			'source'	=>	''
		) );	

		$response  = $this->import_embed( $data['source'] );

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'		=>	sprintf(
				esc_html__( '%s has been imported successfully.' , 'streamtube-core'),
				'<strong>'. $response->post_title .'</strong>'
			),
			'post'			=>	$response
		) );
	}

	/**
	 *
	 * do Upload video on regular POST request
	 * 
	 * @return Wp_Error|Array
	 *
	 * @since  1.0.0
	 * 
	 */
	public function upload_video(){

		$errors = new WP_Error();

		if( ! get_option( 'upload_files', 'on' ) ){
			$errors->add( 
				'upload_files_disabled', 
				esc_html__( 'Uploading files is disabled.', 'streamtube-core' ) 
			);			
		}

		if( ! current_user_can( 'publish_posts' ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'Sorry, You do not have permission to upload videos, please contact administrator for further assistance.', 'streamtube-core' ) 
			);
		}

		$allow_size = (int)get_option( 'upload_max_file_size', streamtube_core_get_max_upload_size()/1048576 );

		$allow_size = $allow_size*1048576;

		if( ! isset( $_FILES['video_file'] ) || (int)$_FILES['video_file']['error'] != 0 ){
			$errors->add( 
				'file_error', 
				esc_html__( 'File was not found or empty.', 'streamtube-core' ) 
			);
		}

		if( $allow_size < (int)$_FILES['video_file']['size'] ){
			$errors->add( 
				'file_size_not_allowed', 
				esc_html__( 'The upload file exceeds the maximum allow file size.', 'streamtube-core' ) 
			);
		}		

		/**
		 *
		 * Filter the errors
		 * 
		 * @param WP_Error $errors
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/upload/video/errors', $errors );

		if( $errors->get_error_code() ){
			return $errors;
		}

		/**
		 * Add new draft post
		 * @var [type]
		 */
		$post = $this->add_post( array(
			'post_title'	=>	preg_replace( '/\.[^.]+$/', '', basename( $_FILES['video_file']['name'] ) ),
			'post_type'		=>	'video',
			'post_status'	=>	'draft'
		) );

		if( is_wp_error( $post ) ){
			return $post;
		}

		$attachment_id = media_handle_upload( 'video_file', $post->ID );

		if( is_wp_error( $attachment_id ) || ! wp_attachment_is( 'video', $attachment_id ) ){

			wp_delete_post( $post->ID, true );

			return $attachment_id;
		}

		$video_meta = get_post_meta( $attachment_id, '_wp_attachment_metadata', true );

		wp_update_post( array(
			'ID'			=>	$post->ID,
			'post_status'	=>	get_option( 'auto_publish' ) ? 'publish' : 'pending',
			'meta_input'	=>	array(
				self::VIDEO_URL 		=> $attachment_id,
				'_thumbnail_id'			=> get_post_thumbnail_id( $attachment_id ),
				'_length'				=> $video_meta['length']
			)
		), true );

		$thumbnail_id_2 = get_post_meta( $attachment_id, '_thumbnail_id_2', true );

		if( $thumbnail_id_2 ){
			$this->update_thumbnail_image_url_2( $post->ID, $thumbnail_id_2 );
		}

		wp_update_post( array(
			'ID'			=>	$attachment_id,
			'post_parent'	=>	$post->ID
		), true );

		/**
		 *
		 * Fires after video post added
		 *
		 * @param  $post WP_Post
		 * @param  int $attachment_id
		 *
		 * @since  1.0.0
		 * 
		 */
		do_action( 'streamtube/core/video/added', $post, $attachment_id );

		return $this->get_post( $post->ID );
	}

	/**
	 *
	 * Have to run this function after chunks uploaded to create new video post with given attachment
	 * 
	 * @param  integer $attachment_id
	 * @return $this->get_post();
	 *
	 * @since  1.0.0
	 * 
	 */
	public function upload_video_chunks( $attachment_id = 0 ){

		$errors = new WP_Error();

		if( ! wp_attachment_is( 'video', $attachment_id ) ){
			$errors->add(
				'invalid_file_format',
				esc_html__( 'Invalid file format.', 'streamtube-core' )
			);
		}

		if( ! current_user_can( 'edit_post', $attachment_id ) ){
			$errors->add(
				'no_permission',
				esc_html__( 'You do not have permission to do this action.', 'streamtube-core' )
			);
		}

		/**
		 *
		 * Filter the errors
		 * 
		 * @param WP_Error $errors
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/upload_chunks/video/errors', $errors );		

		if( $errors->get_error_code() ){
			return $errors;
		}		

		$video_meta = get_post_meta( $attachment_id, '_wp_attachment_metadata', true );

		$postarr = array(
			'post_title'	=>	get_the_title( $attachment_id ),
			'post_type'		=>	'video',
			'meta_input'	=>	array(
				self::VIDEO_URL => $attachment_id,
				'_thumbnail_id'			=> get_post_thumbnail_id( $attachment_id ),
				'_length'				=> $video_meta['length']
			)
		);

		$post = $this->add_post( $postarr );

		if( ! is_wp_error( $post ) ){
			wp_update_post( array(
				'ID'			=>	$attachment_id,
				'post_parent'	=>	$post->ID
			) );

			$thumbnail_id_2 = get_post_meta( $attachment_id, '_thumbnail_id_2', true );

			if( $thumbnail_id_2 ){
				update_post_meta( 
					$post->ID, 
					'_animation_image',
					wp_get_attachment_image_url( $thumbnail_id_2, 'full' ) 
				);			
			}

			/**
			 *
			 * Fires after video post added
			 *
			 * @param  $post WP_Post
			 * @param  int $attachment_id
			 *
			 * @since  1.0.0
			 * 
			 */
			do_action( 'streamtube/core/video/added', $post, $attachment_id );			
		}

		return $this->get_post( $post->ID );
	}

	/**
	 *
	 * Report video
	 * 
	 * @param  integer $post_id
	 * @param  integer $category_id
	 * @return true|WP_Error
	 *
	 * @since 2.2.1
	 * 
	 */
	public function report_video(){

		if( ! isset( $_POST ) ){
			return new WP_Error(
				'invalid_requested',
				esc_html_( 'Invalid Requested', 'streamtube-core' )
			);
		}

		$http_data = wp_parse_args( $_POST, array(
			'post_id'		=>	0,
			'category'		=>	0,
			'description'	=>	''
		) );

		if( get_post_type( $http_data['post_id'] ) != self::CPT_VIDEO ){
			return new WP_Error(
				'invalid_video_id',
				esc_html__( 'Invalid Video ID', 'streamtube-core' )
			);
		}

		$_cache = sprintf( 'report_%s_%s', get_current_user_id(), $http_data['post_id'] );

		if( false !== $was_sent = get_transient( $_cache ) ){
			return new WP_Error(
				'report_was_sent',
				sprintf(
					esc_html__( 'Report was sent %s ago', 'streamtube-core' ),
					human_time_diff( $was_sent, current_time( 'timestamp' ) )
				)
			);			
		}

		if( $http_data['category'] ){

			$http_data['category'] = (int)$http_data['category'];

			$check_term = get_term_by( 'term_id', $http_data['category'], Streamtube_Core_Taxonomy::TAX_REPORT );

			if( $check_term ){
				wp_set_post_terms( $http_data['post_id'], $http_data['category'], Streamtube_Core_Taxonomy::TAX_REPORT, true );	
			}else{
				$http_data['category'] = 0;
			}
		}

		streamtube_core_notify_admin_on_report( 
			$http_data['post_id'], 
			$http_data['category'], 
			$http_data['description'] 
		);

		/**
		 * @since 2.2.1
		 */
		do_action( 'streamtube/core/video/report_sent' );

		return set_transient( $_cache, current_time( 'timestamp' ), 60*60 );
	}

	/**
	 *
	 * do AJAX upload video
	 * 
	 * @since  1.0.0
	 */
	public function ajax_upload_video(){

		check_ajax_referer( '_wpnonce' );

		$response  = $this->upload_video();

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'			=>	sprintf(
				esc_html__( '%s has been uploaded successfully.' , 'streamtube-core'),
				'<strong>'. $response->post_title .'</strong>'
			),
			'post'	=>	$response
		) );
	}

	/**
	 *
	 * do AJAX check video chunk before sending to BigFileUploads->ajax_chunk_receiver();
	 * 
	 * @since  1.0.0
	 * 
	 */
	public function ajax_upload_video_chunk(){

		$errors = new WP_Error();

		$_post = wp_parse_args( $_POST, array(
			'name'	=>	'',
			'type'	=>	''
		) );

		if( ! get_option( 'upload_files', 'on' ) ){
			$errors->add( 
				'upload_files_disabled', 
				esc_html__( 'Uploading files is disabled.', 'streamtube-core' ) 
			);			
		}		

		if( ! current_user_can( 'publish_posts' ) ){
			$errors->add(
				'no_permission', 
				esc_html__( 'Sorry, You do not have permission to upload videos, please contact administrator for further assistance.', 'streamtube-core' ) 
			);
		}

		$ext = pathinfo( $_post['name'], PATHINFO_EXTENSION );

		if( ! $ext || empty( $_post['name'] ) || empty( $_post['type'] ) ){
			$errors->add(
				'invalid_file_format',
				esc_html__( 'Invalid file format.', 'streamtube-core' )
			);
		}

		if( ! in_array( strtolower($ext) , wp_get_video_extensions() ) ){
			$errors->add(
				'invalid_file_format',
				esc_html__( 'Invalid file format.', 'streamtube-core' )
			);
		}

		if( ! class_exists( 'BigFileUploads' ) || ! method_exists( 'BigFileUploads', 'ajax_chunk_receiver' ) ){
			$errors->add(
				'BigFileUploads_not_found',
				esc_html__( 'BigFileUploads plugin was not found.', 'streamtube-core' )
			);
		}

		$errors = apply_filters( 'streamtube/core/upload_chunk/video/errors', $errors );

		if( $errors->get_error_code() ){
			wp_send_json_error( array(
				'message'	=>	$errors->get_error_messages(),
				'errors'	=>	$errors
			) );
		}

		$upload = new BigFileUploads();

		$upload->ajax_chunk_receiver();
	}

	/**
	 *
	 * Create new video after chunks uploaded completely.
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_upload_video_chunks(){

		check_ajax_referer( '_wpnonce' );

		if( ! isset( $_POST['attachment_id'] ) || empty( $_POST['attachment_id'] ) ){
			wp_send_json_error( array(
				'message'	=>	esc_html__( 'video file not found.', 'streamtube-core' )
			) );
		}

		$response = $this->upload_video_chunks( $_POST['attachment_id'] );

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'			=>	sprintf(
				esc_html__( '%s has been uploaded successfully.' , 'streamtube-core' ),
				'<strong>'. $response->post_title .'</strong>'
			),
			'post'	=>	$response
		) );
	}

	public function ajax_add_post(){

		check_ajax_referer( '_wpnonce' );

		$response = $this->add_post( $_POST );	

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	 $response->get_error_messages(),
				'errors'	=>	 $response
			) );
		}

		$url = streamtube_core_get_user_dashboard_url( get_current_user_id(), $response->post_type );

		if( ! get_option( 'permalink_structure' ) ){
			$url = add_query_arg( array(
				'post_id'	=>	$response->ID
			), $url );
		}
		else{
			$url = trailingslashit( $url ) . $response->ID;
		}

		wp_send_json_success( array(
			'message'		=> esc_html__( 'Post added.', 'streamtube-core' ),
			'redirect_url'	=> $url
		) );
	}

	/**
	 *
	 * Do AJAX update post on POST request
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_update_post(){

		check_ajax_referer( '_wpnonce' );

		$post_id = $this->update_post();

		if( is_wp_error( $post_id ) ){
			wp_send_json_error( array(
				'message'	=>	$post_id->get_error_messages(),
				'errors'	=>	$post_id
			) );
		}

		$post = get_post( $post_id, ARRAY_A );

		$response = array(
			'message'	=>	sprintf(
				esc_html__( '%s updated.', 'streamtube-core' ),
				ucwords( $post['post_type'] )
			),
			'post'		=>	array_merge( $post, array(
				'post_thumbnail'	=>	get_the_post_thumbnail_url( $post_id, 'size-560-315' ),
				'post_embed_html'	=>	get_post_embed_html( 560, 315, $post_id ),
				'post_link'			=>	get_permalink( $post_id ),
				'post_edit_link'	=>	add_query_arg( array(
					'edit_post'	=>	1
				), get_permalink( $post_id ) )
			) )
		);

		if( $post['post_status'] == 'future' ){
			$response['message2'] = sprintf(
				esc_html__( 'This %s is scheduled.', 'streamtube-core' ),
				$post['post_type']
			);
		}

		if( isset( $_POST['quick_update'] ) ){
			$response['quick_update'] = true;

			switch ( $post['post_status'] ) {
				case 'pending':
					$response['message'] = esc_html__( 'Your video is pending review.', 'streamtube-core' );
				break;

				case 'publish':
					$response['message'] = esc_html__( 'Your video is published.', 'streamtube-core' );
				break;		
				
				case 'private':
					$response['message'] = esc_html__( 'Your video is privated.', 'streamtube-core' );
				break;
			}
		}

		/**
		 *
		 * Filter the response
		 * 
		 * @param array $response
		 *
		 * @since  1.0.0
		 * 
		 */
		$response = apply_filters( 'streamtube/core/post/update/ajax/response', $response );

		wp_send_json_success( $response );
	}

	/**
	 *
	 * Do AJAX trash post on POST request
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_trash_post(){
		check_ajax_referer( '_wpnonce' );

		$response = $this->trash_post();

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'		=>	sprintf(
				esc_html__( '%s has been trashed.', 'streamtube-core' ),
				'<strong>'. $response->post_title .'</strong>'
			),
			'post'			=>	$response,
			'redirect_url'	=>	streamtube_core_get_user_dashboard_url( get_current_user_id(), $response->post_type )
		) );
	}

	/**
	 *
	 * Do AJAX approve post on POST request
	 * 
	 * @since 1.0.0
	 * 
	 */	
	public function ajax_approve_post(){

		check_ajax_referer( '_wpnonce' );

		$response = $this->approve_post();

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'	=>	sprintf(
				esc_html__( '%s has been approved successfully.', 'streamtube-core' ),
				'<strong>'. get_post( $_POST['post_id'] )->post_title .'</strong>'
			),
			'post_id'	=>	$response
		) );
	}

	/**
	 *
	 * Do AJAX reject post on POST request
	 * 
	 * @since 1.0.0
	 * 
	 */	
	public function ajax_reject_post(){

		check_ajax_referer( '_wpnonce' );

		$response = $this->reject_post();

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'	=>	sprintf(
				esc_html__( '%s has been rejected successfully.', 'streamtube-core' ),
				'<strong>'. get_post( $_POST['post_id'] )->post_title .'</strong>'
			),
			'post_id'	=>	$response
		) );
	}

	public function ajax_restore_post(){

		check_ajax_referer( '_wpnonce' );

		if( ! isset( $_POST ) || ! isset( $_POST['data'] ) ){
			wp_send_json_error( array(
				'message'	=>	esc_html__( 'Invalid Request', 'streamtube-core' )
			) );
		}

		$data = json_decode( wp_unslash( sanitize_text_field( $_POST['data'] ) ), true );

		$data = wp_parse_args( $data, array(
			'post_id'	=>	0
		) );

		$response = $this->restore_post( $data['post_id'] );

		if( ! $response ){
			wp_send_json_error( array(
				'message'	=>	esc_html__( 'Undefined Error, please try again later.', 'streamtube-core' )
			) );
		}

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'	=>	sprintf(
				esc_html__( '%s has been restored successfully.', 'streamtube-core' ),
				'<strong>'. $response->post_title .'</strong>'
			),
			'post'		=>	$response
		) );
	}

	/**
	 * AJAX search posts
	 */
	public function ajax_search_posts(){

		check_ajax_referer( '_wpnonce' );

		$request = wp_parse_args( $_GET, array(
			'post_type'		=>	'video',
			'responseType'	=>	'',
			's'				=>	''
		) );

		$query_args = array(
			'post_type'			=>	$request['post_type'],
			'post_status'		=>	'publish',
			'posts_per_page'	=>	20,
			's'					=>	$request['s'],
			'orderby'			=>	'name',
			'order'				=>	'ASC',
			'meta_query'		=>	array()
		);

		$posts = get_posts( $query_args );

		if( $request['responseType'] == 'select2' ){

			$results = array();

			if( $posts ){
				foreach( $posts as $post ){
					$results[] = array(
						'id'	=>	$post->ID,
						'text'	=>	sprintf( '(#%1$s) %2$s', $post->ID, $post->post_title )
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

		wp_send_json_success( $posts );
	}

	/**
	 *
	 * AJAX report video
	 * 
	 * @since 2.2.1
	 */
	public function ajax_report_video(){

		check_ajax_referer( '_wpnonce' );

		if( ! get_option( 'button_report', 'on' ) ){
			wp_send_json_error( array(
				'message'	=>	esc_html__( 'Report is disabled', 'streamtube-core' )
			) );			
		}

		$response = $this->report_video();

		if( is_wp_error( $response ) ){
			wp_send_json_error( array(
				'message'	=>	$response->get_error_messages(),
				'errors'	=>	$response
			) );
		}

		wp_send_json_success( array(
			'message'	=>	esc_html__( 'Report has been sent successfully', 'streamtube-core' )
		) );
	}

	/**
	 *
	 * Update post meta on POST request
	 * 
	 * @param  [type] $post_id [description]
	 * @return [type]          [description]
	 */
	public function update_post_meta( $post_id ){

		$_meta = array( '_embed', '_ratio' );

		if( ! array_key_exists( 'meta_input' , $_POST ) || ! is_array( $_POST['meta_input'] ) ){
			$_POST['meta_input'] = array_fill_keys( $_meta, '' );
		}

		$meta_input = $_POST['meta_input'];

		for ( $i=0; $i < count( $_meta ); $i++) { 
			if( array_key_exists( $_meta[$i], $meta_input ) ){
				update_post_meta( $post_id, $_meta[$i], $meta_input[ $_meta[$i] ] );
			}
			else{
				delete_post_meta( $post_id, $_meta[$i] );	
			}
		}
	}

	/**
	 *
	 * Update attachment title after updating its parent
	 *
	 * @since 2.1
	 * 
	 */
	public function sync_post_attachment( $post_id, $post ){
		$source = $this->get_source( $post_id );

		if( wp_attachment_is( 'video', $source ) ){
			wp_update_post( array(
				'ID'			=>	$source,
				'post_title'	=>	$post->post_title
			) );
		}
	}

	public function get_edit_post_url( $post_id, $endpoint = '' ){

		$postdata = get_post( $post_id );

		$base_url = streamtube_core()->get()->user_dashboard->get_endpoint( $postdata->post_author, $this->get_post_type_slug( $postdata->post_type ) );

		if( get_option( 'permalink_structure' ) ){
			return untrailingslashit( $base_url ) . '/' . $post_id . '/' . $endpoint;
		}

		return add_query_arg( array(
			$endpoint => 1,
			'post_id'	=>	$post_id
		), $base_url );
	}

	/**
	 *
	 * Get request post ID to edit
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function get_edit_post_id(){

		$post_id = false;

		if( ! get_option( 'permalink_structure' ) ){
			if( isset( $GLOBALS['wp_query']->query_vars['post_id'] ) ){
				$post_id = (int)$GLOBALS['wp_query']->query_vars['post_id'];
			}
		}
		else{
			if( isset( $GLOBALS['wp_query']->query_vars['dashboard'] ) ){
				$request = explode( "/" , $GLOBALS['wp_query']->query_vars['dashboard'] );

				if( count( $request ) > 1 && get_post_status( $request[1] ) ){
					$post_id = (int)$request[1];
				}
			}
		}

		return $post_id;
	}

	/**
	 *
	 * Check if current is edit post screen
	 * 
	 * @return true|false
	 *
	 * @since  1.0.0
	 * 
	 */
	public function is_edit_post_screen(){
		return $this->get_edit_post_id();
	}

	/**
	 * 
	 * Get user nav items
	 * 
	 * @return array
	 *
	 * @since  1.0.0
	 * 
	 */
	public function get_edit_post_menu_items(){

		$items = array();

		$items['details'] 	= array(
			'title'			=>	esc_html__( 'Details', 'streamtube-core' ),
			'icon'			=>	'icon-edit',
			'template'		=>	streamtube_core_get_template( 'post/edit/details.php' ),
			'priority'		=>	1
		);	

		$items['comments'] 	= array(
			'title'			=>	esc_html__( 'Comments', 'streamtube-core' ),
			'icon'			=>	'icon-comment',
			'template'		=>	streamtube_core_get_template( 'post/comments.php' ),
			'priority'		=>	20
		);

		if( $this->plugin()->googlesitekit->analytics->is_active() ){
			$items['analytics'] 	= array(
				'title'			=>	esc_html__( 'Analytics', 'streamtube-core' ),
				'icon'			=>	'icon-chart-area',
				'template'		=>	streamtube_core_get_template( 'post/analytics.php' ),
				'priority'		=>	100
			);
		}	

		/**
		 * filter items
		 *
		 * @since 1.0.0
		 */
		$items = apply_filters( 'streamtube_core_get_edit_post_nav_items', $items );

		return $items;	
	}

	/**
	 *
	 * Get current active menu item
	 * 
	 * @since 1.0.0
	 * 
	 */
	private function get_edit_post_active_menu(){

		global $wp_query;

		$menu_items = $this->get_edit_post_menu_items();

		if( get_option( 'permalink_structure' ) ){

			$request = explode( "/", $wp_query->query_vars['dashboard'] );

			if( count( $request ) == 2 ){
				$request = array_keys( $menu_items )[0];
			}

			elseif( count( $request ) == 3 ){
				$request = $request[2];
			}
		}
		else{
			$request = array_keys( $menu_items )[0];

			foreach ( $menu_items as $key => $value) {
				if( isset( $_GET[ $key ] ) ){
					$request = $key;
				}
			}
		}

		if( is_string( $request ) && ! array_key_exists( $request, $menu_items ) ){
			$request = array_keys( $menu_items )[0];
		}

		return $request;
	}

	/**
	 *
	 * The menu
	 * 
	 * @param  array  $args
	 *
	 * 
	 */
	public function the_edit_post_menu( $args = array() ){

		$menu_items = $this->get_edit_post_menu_items();

		$menu = new Streamtube_Core_Menu( array_merge( $args, array(
			'menu_classes'	=>	'nav nav-tabs secondary-nav mb-4',
			'item_classes'	=>	'text-muted d-flex align-items-center small',
			'menu_items'	=>	$menu_items,
			'current'		=>	$this->get_edit_post_active_menu(),
			'icon'			=>	true
		) ) );

		return $menu->the_menu();
	}

	public function the_edit_post_main(){

		$menu_items = $this->get_edit_post_menu_items();

		load_template( $menu_items[$this->get_edit_post_active_menu()]['template'] );
	}

	/**
	 *
	 * Load the edit thumbnail box
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function load_thumbnail_metabox( $args ){
		streamtube_core_load_template( 'post/edit/thumbnail.php', false, $args );
	}

	/**
	 *
	 * Load the edit taxonimies box
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function load_taxonomies_metabox( $args ){
		streamtube_core_load_template( 'post/edit/taxonomies.php', false, $args );
	}

	/**
	 *
	 * Load the edit post template
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function load_edit_template(){

		if( ! is_author() || ! current_user_can( 'publish_posts' ) ){
			return;
		}

		$post_id = $postdata = false;

		if( $this->is_edit_post_screen() || ( isset( $_GET['view'] ) && $_GET['view'] == 'add-post' ) ){

			$post_id = $this->get_edit_post_id();

			if( $post_id ){
				$postdata = get_post( $post_id );
			}

			add_filter( 'sidebar_float', function( $show ){
				return false;
			} );			

			streamtube_core_load_template( 'post/edit.php', true, array(
				'post'		=>	is_object( $postdata ) ? $postdata : '',
				'post_type'	=>	is_object( $postdata ) ? $postdata->post_type : 'post'
			) );

			exit;
		}
	}

	/**
	 *
	 * Auto redirect to the edit post page if "edit_post" param found.
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function redirect_to_edit_page(){
		global $wp_query;

		if( is_singular() && isset( $wp_query->query_vars['edit_post'] ) ){

			wp_redirect( get_edit_post_link( get_the_ID() ) );

			exit;
		}
	}

	/**
	 *
	 * Pre query posts
	 * @since 1.0.0
	 */
	public function pre_get_posts( $query ){
		if ( ! is_admin() && $query->is_main_query() ) {
			if( is_search() ){

				$post_types = get_option( 'search_post_types', 'video,post' );

				if( is_string( $post_types ) &&  ! empty( $post_types ) ){
					$post_types = array_map('trim', explode(',', $post_types ));
				}

				if( is_array( $post_types ) ){
					$query->set( 'post_type', $post_types );
				}

				if( isset( $_GET['post_type'] ) && post_type_exists( $_GET['post_type'] ) ){
					$query->set( 'post_type', $_GET['post_type'] );	
				}

				$hide_empty_thumbnail = get_option( 'search_hide_empty_thumbnail' );

				if( $hide_empty_thumbnail ){
					$query->set( 'meta_query', array(
						array(
							'key'		=>	'_thumbnail_id',
							'compare'	=>	'EXISTS'
						)
					) );
				}

				$per_column = (int)get_option( 'search_posts_per_column', 1 );
				$per_row  	= (int)get_option( 'search_rows_per_page', get_option( 'posts_per_page' ) );

				$per_page = $per_column*$per_row;

				if( $per_page > 0 ){
					$query->set( 'posts_per_page', $per_page );
				}
			}

			if( is_tax( 'categories' ) || is_tax( 'video_tag' ) || is_post_type_archive( 'video' ) ){

				$query->set( 'meta_query', array(
					array(
						'key'		=>	'_thumbnail_id',
						'compare'	=>	'EXISTS'
					),
					array(
						'key'		=>	self::VIDEO_URL,
						'compare'	=>	'EXISTS'
					)
				) );

				$orderby = isset( $_GET['orderby'] ) ? sanitize_key( $_GET['orderby'] ) : 'date';

				if( $orderby == 'post_view' ){

					$query->set( 'meta_query', array(
						array(
							'key'		=>	$this->get_post_views_meta(),
							'compare'	=>	'EXISTS'
						)
					) );

					$query->set( 'orderby', 'meta_value_num' );
				}				
			}
		}
	}

	public function load_video_schema(){
		if( is_singular( 'video' ) ){

			global $post;

			$excerpt = $post->post_excerpt ? $post->post_excerpt : $post->post_content;

			$data = array(
				'@context'		=>	'https://schema.org/',
				'@type'			=>	'VideoObject',
				'name'			=>	$post->post_title,
				'id'			=>	wp_get_shortlink( $post->ID ),
				'datePublished'	=>	get_the_date( 'Y-m-d H:i:s', $post->ID ),
				'uploadDate'	=>	get_the_date( 'Y-m-d H:i:s', $post->ID ),
				'author'		=>	array(
					'@type'		=>	'Person',
					'name'		=>	get_the_author_meta( 'display_name', $post->post_author )
				),
				'description'	=>	wp_trim_words( wp_kses( $excerpt, array() ), 50 ),
				'embedUrl'		=>	get_post_embed_url()
			);

			/**
			 * Add images
			 */
			if( has_post_thumbnail( $post ) ){

				$images = array();

				$sizes = get_intermediate_image_sizes();

				for ( $i=0; $i < count( $sizes ); $i++) { 
					$_image = get_the_post_thumbnail_url( $post, $sizes[$i] );

					if( ! empty( $_image ) ){
						$images[] = $_image;
					}
				}

				if( $images ){
					$data['thumbnailUrl'] = $images;
				}
			}

			/**
			 * Add contentUrl
			 */
			if( apply_filters( 'streamtube_video_schema_source', false ) === true ){
				$source = $this->get_source( $post->ID );

				if( wp_attachment_is( 'video', $source ) ){
					$data['contentUrl'] = wp_get_attachment_url( $source );
				}
			}

			if( 0 < $duration = $this->get_length( $post->ID ) ){
				$data['duration'] = streamtube_core_iso8601_duration( $duration );
			}

			printf(
				'<script type="application/ld+json">%s</script>',
				json_encode( $data )
			);
		}
	}

	/**
	 *
	 * Limit logged in user from accessing other user files
	 * 
	 * @param  array $query_args 
	 * @return array
	 *
	 * @since 1.0.8
	 * 
	 */
	public function filter_ajax_query_attachments_args( $query_args ){

		if( ! get_option( 'show_current_user_attachment', 'on' ) ){
			return $query_args;
		}

		if( ! current_user_can( 'administrator' ) ){
			$query_args['author'] = get_current_user_id();
		}

		return $query_args;
	}

	/**
	 *
	 * Add post meta data after post inserted into database
	 * @since 1.0.8
	 */
	public function wp_insert_post( $post_ID, $post, $update ){

		if( in_array( $post->post_type, array( 'post', 'video' ) ) ){

			$_metadata = array(
				'pageviews', 'uniquepageviews'
			);

			if( $post->post_type == 'video' ){
				$_metadata = array_merge( $_metadata, array(
					'videoviews',
					'uniquevideoviews'
				) );
			}

			for ( $i=0; $i < count( $_metadata ); $i++) {
				if( (int)get_post_meta( $post_ID, '_' . $_metadata[$i], true ) == 0 ){
					update_post_meta( $post_ID, '_' . $_metadata[$i], 0 );
				}
			}
		}
	}

	/**
	 *
	 * update last seen post meta
	 * 
	 * @since 1.0.8
	 */
	public function update_last_seen(){
		if( is_singular() ){
			update_post_meta( get_the_ID(), '_last_seen', current_time( 'mysql', true ) );
		}
	}

	/**
	 *
	 * Delete all attached files after a video is deleted
	 *
	 * This action fires after a video post is deleted.
	 * 
	 * @since 1.0.8
	 */
	public function delete_attached_files( $postid, $post ){
		if( get_option( 'delete_attached_files', 'on' ) && in_array( $post->post_type, array( 'video', 'attachment' ) ) ){
			$child_posts = get_posts( array(
				'post_parent'		=>	$post->ID,
				'post_type'			=>	'attachment',
				'posts_per_page'	=>	-1
			) );

			if( $child_posts ){
				foreach( $child_posts as $child ){
					wp_delete_attachment( $child->ID, true );
				}
			}
		}
	}

	/**
	 *
	 * Hide video attachment page, move to its parent page if exists
	 * Otherwise load 404 error template
	 * 
	 * @since 1.0.9
	 */
	public function attachment_template_redirect( $template ){

		if( is_attachment() && wp_attachment_is( 'video', get_the_ID() ) ){

			if( get_option( 'hide_video_attachment_page', 'on' ) && ! is_embed() ){

				global $post;

				if( $post->post_parent ){
					wp_redirect( get_permalink( $post->post_parent ) );
					exit;
				}
				else{
					wp_redirect( home_url('/404') );
					exit;
				}
			}
		}

	}

	/**
	 *
	 * Convert wp video shortcode to videojs 
	 *
	 * @since 1.0.0
	 * 
	 */
	public function override_wp_video_shortcode( $output = '', $attr, $content, $instance ){

		if( get_option( 'override_wp_video_shortcode', 'on' ) ){

			$src = '';

			if( $attr['src'] ){
				$src = $attr['src'];
			}

			if( $attr['mp4'] ){
				$src = $attr['mp4'];
			}			

			$maybe_attachment_id = attachment_url_to_postid( $src );

			$attr = wp_parse_args( $attr, array(
				'source'	=>	$maybe_attachment_id ? $maybe_attachment_id : $src,
				'ratio'		=>	get_option( 'player_ratio', '21x9' )
			) );

			$output = $this->plugin()->shortcode->_player( $attr );
		}

		return $output;
	}

	/**
	 *
	 * Filter WP video block
	 *
	 * @since 1.0.9
	 * 
	 */
	public function override_wp_video_block( $block_content, $block ){

		if( get_option( 'override_wp_video_block', 'on' ) ){
			if( $block['blockName'] == 'core/video' ){

				if( array_key_exists( 'id', $block['attrs'] ) ){
					$maybe_attachment_id = $block['attrs']['id'];

					if( wp_attachment_is( 'video', $maybe_attachment_id ) ){
						$block_content = streamtube_core()->get()->shortcode->_player( array(
							'source'	=>	$maybe_attachment_id
						) );
					}
				}
				else{
					preg_match( '#<video .*?src="(.*?)"#', $block_content, $matches );

					if( $matches ){
						$block_content = streamtube_core()->get()->shortcode->_player( array(
							'source'	=>	$matches[1]
						) );
					}
				}
			}
		}

		return $block_content;
	}

	/**
	 *
	 * Filter WP Youtube block
	 *
	 * @since 1.0.9
	 * 
	 */
	public function override_wp_youtube_block( $block_content, $block  ){

		if( get_option( 'override_wp_youtube_block', 'on' ) ){
			if( $block['blockName'] == 'core/embed' ){
				if( is_array( $block['attrs'] ) && array_key_exists( 'providerNameSlug', $block['attrs'] ) ){
					if( $block['attrs']['providerNameSlug'] == 'youtube' ){
						$block_content = streamtube_core()->get()->shortcode->_player( array(
							'source'	=>	$block['attrs']['url']
						) );						
					}
				}

			}
		}

		return $block_content;
	}

	public function get_pending_posts_badge( $post_type = 'post' ){

		$badge = '';

		$query_args = array(
			'post_type'		=>	$post_type,
			'post_status'	=>	'pending'
		);

		if( ! Streamtube_Core_Permission::moderate_posts() ){
			$query_args['author'] = get_current_user_id();
		}

		$posts = get_posts( $query_args );

		if( ! $posts ){
			return;
		}

        $badge = sprintf(
            '<span class="badge bg-danger">%s</span>',
            number_format_i18n( count( $posts ) )
        );

        /**
         *
         * @since 1.1.5
         * 
         */
        return apply_filters( 'streamtube/core/posts_count_badge', $badge, $posts, $post_type );
	}

}
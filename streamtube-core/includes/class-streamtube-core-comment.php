<?php
/**
 * Define the comment functionality
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

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Comment {

	/**
	 *
	 * Get comment content
	 * 
	 * @param  int  $comment_id
	 * @param  boolean $email_filter
	 * @return WP_Error|Object
	 *
	 * @since 1.0.8
	 * 
	 */
	protected function get_comment( $comment_id = 0, $email_filter = false ){

		$comment = get_comment( $comment_id );

		if( ! $comment ){
			return new WP_Error(
				'comment_not_found',
				esc_html__( 'Comment was not found', 'streamtube-core' )
			);
		}

		if( $email_filter ){
			unset( $comment->comment_author_email );

			/**
			 *
			 * Filter comment object before returning
			 * 
			 * @var object $comment
			 *
			 * @since 1.0.8
			 * 
			 */
			$comment = apply_filters( 'streamtube/core/comment/get_comment', $comment );			
		}

		return $comment;
	}

	/**
	 *
	 * Post comment on POST request
	 *
	 * 
	 * @return WP_Error|array
	 *
	 * @since  1.0.0
	 * 
	 */
	private function post_comment(){

		$comment_output = $comments_number = '';

		$comment = wp_handle_comment_submission( wp_unslash( $_POST ) );

		if( is_wp_error( $comment ) ){
			return $comment;
		}

		if( ! function_exists( 'streamtube_comment_callback' ) ){
			return new WP_Error(
				'no_comment_template',
				esc_html__( 'Comment template was not found', 'streamtube-core' )
			);
		}

		ob_start();

		$GLOBALS['comment'] = $comment;

		streamtube_comment_callback( 
			$comment, streamtube_comment_list_args(), 
			streamtube_get_comment_depth($comment)+1 
		);

		$comment_output = ob_get_clean() . '</li>';

		$comments_number = get_comments_number_text( false, false, false, $comment->comment_post_ID );

		return compact( 'comment', 'comment_output', 'comments_number' );
	}

	/**
	 *
	 * Check if current user can moderate comments
	 * 
	 * @param  integer $comment_id
	 * @return true|false
	 *
	 * @since  1.0.0
	 * 
	 */
	public function can_moderate_comments( $comment_id = 0 ){

		/**
		 *
		 * Filter moderate_comments_cap
		 * 
		 * @param $cap moderate_comments is default
		 *
		 * @since  1.0.0
		 * 
		 */
		$cap = apply_filters( 'moderate_comments_cap', 'moderate_comments' );

		if( ! $comment_id ){
			return current_user_can( $cap );
		}

		$comment = get_comment( $comment_id );

		if( ! $comment ){
			return current_user_can( $cap );
		}

		$post = get_post( $comment->comment_post_ID );

		if( $post && current_user_can( 'edit_post', $comment->comment_post_ID ) ){
			return true;
		}

		return current_user_can( $cap, $comment_id );
	}		

	/**
	 *
	 * Do approve and unapprove given comment
	 * 
	 * @param  integer $comment_id
	 * @return WP_Error|array
	 *
	 * @since  1.0.0
	 * 
	 */
	private function moderate_comment( $comment_id = 0 ){

		$status = wp_get_comment_status( $comment_id ); // unapproved

		if( $status != 'approved' ){
			return wp_set_comment_status( $comment_id, 'approve' );
		}
		else{
			return wp_set_comment_status( $comment_id, 'hold' );	
		}
	}

	public function bulk_action( $comment_id = 0, $action = '' ){

		$errors = new WP_Error();

		if( ! $comment_id || ! $action || ! $this->can_moderate_comments( $comment_id ) ){
			$errors->add(
				'no_permission',
				esc_html__( 'Sorry, you are not allowed to moderate this comment.', 'streamtube-core' )
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
		$errors = apply_filters( 'streamtube/core/comment/bulk_action', $errors, $comment_id, $action );

		if( $errors->get_error_code() ){
			return $errors;
		}		

		switch ( $action ) {
			case 'approve':
				return wp_set_comment_status( $comment_id, 'approve' );

			break;

			case 'unapprove':
				return wp_set_comment_status( $comment_id, 'hold' );
			break;

			case 'spam':
				return wp_trash_comment( $comment_id );
			break;			

			case 'trash':
				return wp_spam_comment( $comment_id);
			break;	
		}
	}

	/**
	 *
	 * AJAX load comment
	 * 
	 * @since 1.0.0
	 */
	public function ajax_get_comment(){

		check_ajax_referer( '_wpnonce' );

		if( ! isset( $_GET['comment_id'] ) ){
			wp_send_json_error( new WP_Error(
				'comment_id_not_found',
				esc_html__( 'Comment ID was not found', 'streamtube-core' )
			) );
		}

		$comment = $this->get_comment( $_GET['comment_id'], true );

		if( is_wp_error( $comment ) ){
			wp_send_json_error( $comment );			
		}

		wp_send_json_success( $comment );
	}

	/**
	 * 
	 *
	 * Do AJAX post comment
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_post_comment(){

		check_ajax_referer( '_wpnonce' );

		$comment = $this->post_comment();

		if( is_wp_error( $comment ) ){
			wp_send_json_error( array(
				'code'		=>	$comment->get_error_code(),
				'message'	=>	join( '<br/>', $comment->get_error_messages() )
			) );
		}

		wp_send_json_success( array_merge( $comment, array(
			'message'	=>	esc_html__( 'Comment posted.', 'streamtube-core' )
		) ) );
	}

	/**
	 *
	 * AJAX edit comment
	 * 
	 * @return JSON
	 *
	 * @since 1.0.8
	 * 
	 */
	public function ajax_edit_comment(){
		check_ajax_referer( '_wpnonce' );

		$errors = new WP_Error();

		/**
		 * Fiter the errors
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/comment/edit_comment', $errors );

		if( $errors->get_error_code() ){
			wp_send_json_error( $errors );
		}		

		$comment = edit_comment();

		if( wp_validate_boolean( $comment ) === false ){
			wp_send_json_error( new WP_Error(
				'undefined_error',
				esc_html__( 'Error: cannot update comment', 'streamtube-core' )
			) );
		}

		$comment = $this->get_comment( $_POST['comment_ID'], true );

		$comment->comment_content_filtered = force_balance_tags( wpautop( wp_trim_words( $comment->comment_content, 20 ) ) );

		wp_send_json_success( array(
			'message' 	=>	esc_html__( 'Comment updated.', 'streamtube-core' ),
			'comment'	=>	$comment
		));		
	}

	/**
	 * 
	 *
	 * Do AJAX moderate comment
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_moderate_comment(){

		check_ajax_referer( '_wpnonce' );

		$errors = new WP_Error();

		$data = json_decode( wp_unslash( $_POST['data'] ), true );

		if( ! $data || ( is_array( $data ) && ! isset( $data['comment_id'] ) ) ){
			$errors->add(
				'data_not_found',
				esc_html__( 'Data was not found.', 'streamtube-core' )
			);
		}

		if( ! $this->can_moderate_comments( $data['comment_id'] ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'Sorry, you are not allowed to moderate this comment.', 'streamtube-core' ) 
			);
		}		

		/**
		 * Fiter the errors
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/comment/approve', $errors, $data );

		if( $errors->get_error_code() ){
			wp_send_json_error( $errors );
		}

		$results = $this->moderate_comment( $data['comment_id'] );

		if( is_wp_error( $results ) ){
			wp_send_json_error( $results );
		}

		$comment_approved = get_comment( $data['comment_id'] )->comment_approved;

		if( $comment_approved == 1 ){
			$status = esc_html__( 'Unapprove', 'streamtube-core' );
		}
		else{
			$status = esc_html__( 'Approve', 'streamtube-core' );
		}

		wp_send_json_success( compact( 'status', 'comment_approved' ) );
	}

	/**
	 * 
	 *
	 * Do AJAX trash comment
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_trash_comment(){

		check_ajax_referer( '_wpnonce' );

		$errors = new WP_Error();

		$data = json_decode( wp_unslash( $_POST['data'] ), true );

		if( ! $data || ( is_array( $data ) && ! isset( $data['comment_id'] ) ) ){
			$errors->add(
				'data_not_found',
				esc_html__( 'Data was not found.', 'streamtube-core' )
			);
		}

		if( ! $this->can_moderate_comments( $data['comment_id'] ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'Sorry, you are not allowed to trash this comment.', 'streamtube-core' ) 
			);
		}

		/**
		 * Fiter the errors
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/comment/trash', $errors, $data );

		if( $errors->get_error_code() ){
			wp_send_json_error( $errors );
		}

		$results = wp_trash_comment( $data['comment_id'] );

		if( is_wp_error( $results ) ){
			wp_send_json_error( $results );
		}

		if( ! $results ){
			wp_send_json_error( new WP_Error(
				'undefined_error',
				esc_html__( 'Error is undefined, cannot trash this comment', 'streamtube-core' )
			) );
		}

		wp_send_json_success( array(
			'message'		=>	sprintf(
				esc_html__( 'Comment #%s has been trashed successfully.', 'streamtube-core' ),
				'<strong>'. $data['comment_id'] .'</strong>'
			),
			'comment_id'	=>	$data['comment_id']
		) );
	}

	/**
	 * 
	 *
	 * Do AJAX spam comment
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_spam_comment(){

		check_ajax_referer( '_wpnonce' );

		$errors = new WP_Error();

		$data = json_decode( wp_unslash( $_POST['data'] ), true );

		if( ! $data || ( is_array( $data ) && ! isset( $data['comment_id'] ) ) ){
			$errors->add(
				'data_not_found',
				esc_html__( 'Data was not found.', 'streamtube-core' )
			);
		}

		if( ! $this->can_moderate_comments( $data['comment_id'] ) ){
			$errors->add( 
				'no_permission', 
				esc_html__( 'Sorry, you are not allowed to spam this comment.', 'streamtube-core' ) 
			);
		}

		/**
		 * Fiter the errors
		 *
		 * @since  1.0.0
		 * 
		 */
		$errors = apply_filters( 'streamtube/core/comment/spam', $errors, $data );

		if( $errors->get_error_code() ){
			wp_send_json_error( $errors );
		}

		$results = wp_spam_comment( $data['comment_id'] );

		if( ! $results ){
			wp_send_json_error( new WP_Error(
				'undefined_error',
				esc_html__( 'Error is undefined, cannot trash this comment', 'streamtube-core' )
			) );
		}

		wp_send_json_success( array(
			'message'		=>	sprintf(
				esc_html__( 'Comment #%s has been spammed successfully.', 'streamtube-core' ),
				'<strong>'. $data['comment_id'] .'</strong>'
			),
			'comment_id'	=>	$data['comment_id']
		) );
	}	

	/**
	 * 
	 *
	 * AJAX load more comments
	 * 
	 * @since 1.0.0
	 * 
	 */
	public function ajax_load_more_comments(){

		check_ajax_referer( '_wpnonce' );

		$output = '';

		if( ! isset( $_POST['data'] ) || ! isset( $_POST['action'] ) ){
			wp_send_json_error( array(
				'code'		=>	'no_data',
				'message'	=>	esc_html__( 'Invalid Request, no request data.', 'streamtube-core' )
			) );
		}

		//$data = json_decode( wp_unslash( $_POST['data'] ), true );

		$data = wp_parse_args( json_decode( wp_unslash( $_POST['data'] ), true ), array(
			'post_id'	=>	'',
			'paged'		=>	1,
			'order'		=>	''
		));

		if( $_POST['action'] == 'load_comments' ){
			$data['paged'] = 0;
		}

		$data['paged'] = (int)$data['paged']+1;

		if( ! $data['post_id'] || ! get_post_status( $data['post_id'] ) ){
			wp_send_json_error( array(
				'code'		=>	'post_id_not_found',
				'message'	=>	esc_html__( 'Post ID was not found', 'streamtube-core' )
			) );			
		}

		// turn on buffering
		ob_start();

		$args = array(
			'post_id'	=>	$data['post_id'],
			'paged'		=>	$data['paged']
		);

		if( $data['order'] ){
			$args['order'] = $data['order'];
		}

		streamtube_core_list_comments( $args );

		$output = ob_get_clean();

		wp_send_json_success( array(
			'message'	=>	'OK',
			'data'		=>	json_encode( $data ),
			'output'	=>	trim($output)
		) );
	}

	/**
	 *
	 * AJAX reload comments
	 *
	 * @since 1.0.0
	 * 
	 */
	public function ajax_load_comments(){

		return $this->ajax_load_more_comments();
	}

	/**
	 *
	 * Filter the comment form args
	 * 
	 * @param  array $args
	 * @return array $args
	 *
	 * @since  1.0.0
	 * 
	 */
	public function filter_comment_form_args( $args ){

		// add form-ajax class
		$args['class_form']		.=	' form-ajax';

		// Add action and nonce fields
		$args['comment_field']	.=	'<input type="hidden" name="action" value="post_comment">';

		return $args;
	}

	/**
	 *
	 * Load AJAX comments template
	 * 
	 * @param  string $file
	 * @return string
	 *
	 * @since  1.0.0
	 * 
	 */
	public function load_ajax_comments_template( $file ){

		return streamtube_core_get_template( 'comment/comments-ajax.php' );

	}

	/**
	 *
	 * Get comments count
	 * 
	 * @param  string $status
	 * @return int
	 *
	 * @since 1.1.5
	 * 
	 */
	public function get_comments_count( $status = '' ){

		$comments_args = array(
			'status'		=>	$status,
			'type'			=>	array( 'comment' ),
			'count'			=>	true
		);

		if( ! Streamtube_Core_Permission::moderate_posts() ){
			$comments_args['post_author'] = get_current_user_id();
		}

		return get_comments( $comments_args );
	}

	/**
	 *
	 * Get comments count badge
	 * 
	 * @return int
	 *
	 * @since 1.1.5
	 * 
	 */
	public function get_pending_comments_badge(){

		$badge = '';

		$count = $this->get_comments_count( 'hold' );

		if( $count ){
            $badge = sprintf(
                '<span class="badge bg-danger">%s</span>',
                number_format_i18n( $count )
            );
		}

        /**
         *
         * @since 1.1.5
         * 
         */
        return apply_filters( 'streamtube/core/pending_comments_badge', $badge, $count );
	}

}
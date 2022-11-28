<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$address = false;

$query_args = array(
	'author'			=>	get_queried_object_id(),
	'post_status'		=>	'any',
	'post_type'			=>	$args['post_type'],
	'order'				=>	get_query_var( 'order', 'DESC' ),
	'orderby'			=>	get_query_var( 'orderby', 'date' ),
	'paged'				=>	get_query_var( 'page', 1 ),
	'posts_per_page'	=>	get_option( 'posts_per_page' ),
	's'					=>	'',
	'meta_query'		=>	array()
);

if( isset( $_GET['search_query'] ) ){
	$query_args['s'] = sanitize_text_field( $_GET['search_query'] );
}

if( in_array( $query_args['orderby'], array( 'last_seen', 'post_view' ) ) ){

	$meta_key = '';

	if( $query_args['orderby'] == 'last_seen' ){
		$meta_key = '_last_seen';
	}

	if( $query_args['orderby'] == 'post_view' ){
		$type = get_option( 'sitekit_pageview_type', 'pageviews' );

		$types = array_keys( streamtube_core_get_post_view_types() );

		if( ! in_array( $type, $types ) ){
			$type = 'uniquepageviews';
		}

		$meta_key = '_' . $type;
	}

	$query_args['meta_query'][] = array(
		'key'		=>	$meta_key,
		'compare'	=>	'EXISTS'
	);

	if( $query_args['orderby'] == 'post_view' ){
		$query_args['orderby'] = 'meta_value_num';
	}
}

if( isset( $_GET['post_status'] ) ){

	if( $_GET['post_status'] == 'live' ){
		$query_args['meta_query'][] = array(
			'key'		=>	'live_status',
			'compare'	=>	'IN',
			'value'		=>	array( 'connected', 'disconnected' )
		);		
	}else{
		$query_args['post_status'] = $_GET['post_status'];	
	}	
}

if( current_user_can( 'edit_others_posts' ) ){
	unset( $query_args['author'] );
}

if( isset( $_GET['submit'] ) && ! empty( $_GET['submit'] ) ){

	$get = wp_parse_args( $_GET, array(
		'submit'				=>	'',
		'search_query'			=>	'',
		'bulk_action'			=>	'',
		'bulk_action_top'		=>	'',
		'bulk_action_bottom'	=>	'',
		'entry_ids'				=>	array()
	) );

	switch ( $get['submit'] ) {
		case 'search':
			if( ! empty( $get['search_query'] ) ){
				$query_args['s'] = trim( sanitize_text_field( $get['search_query'] ) );
			}
		break;
		
		case 'bulk_action':

			$has_errors = false;

			if( $get['bulk_action_top'] ){
				$get['bulk_action'] = $get['bulk_action_top'];
			}

			if( $get['bulk_action_bottom'] ){
				$get['bulk_action'] = $get['bulk_action_bottom'];
			}			

			if( ! empty( $get['bulk_action'] ) ){

				$entry_ids = $get['entry_ids'];

				$results = array();

				if( is_array( $entry_ids ) && count( $entry_ids  ) > 0 ){
					for ( $i = 0; $i < count( $entry_ids ); $i++) {  
						$_results = streamtube_core()->get()->post->bulk_action( $entry_ids[$i], $get['bulk_action'] );

						if( ! is_wp_error( $_results ) ){
							$results[$entry_ids[$i]] = $_results;
						}else{
							$has_errors = $_results->get_error_messages();
						}
					}
				}

				if( $has_errors ):

					printf(
						'<div class="alert alert-warning p-2 px-3">%s</div>',
						join( '<br/>', $has_errors )
					);

				else:
					if( 0 < $entry_count = count( array_keys( $results )  ) ):
						echo '<div class="alert alert-success p-2 px-3">';
							printf(
								_n( '%s video', '%s videos', $entry_count, 'streamtube-core' ),
								number_format_i18n( $entry_count )
							);

							$_action = '';

							switch ( $get['bulk_action'] ) {
								
								case 'approve':
									$_action = esc_html__( 'approved', 'streamtube-core' );
								break;

								case 'reject':
									$_action = esc_html__( 'rejected', 'streamtube-core' );
								break;

								case 'pending':
									$_action = esc_html__( 'marked as pending', 'streamtube-core' );
								break;

								case 'restore':
									$_action = esc_html__( 'restored', 'streamtube-core' );
								break;							

								case 'trash':
									$_action = esc_html__( 'moved to trash', 'streamtube-core' );
								break;
							}

							if( $_action ){
								printf(
									'<span class="ms-1">%s</span>',
									$_action
								);
							}

						echo '</div>';
					endif;
				endif;
			}

			$address = remove_query_arg( array( 'bulk_action', 'entry_ids', 'submit' ), wp_get_referer() );
		break;
	}
}

$query_posts = new WP_Query( $query_args );

$template_args = array(
	'query_args'	=>	$query_args,
	'query_posts'	=>	$query_posts
);

?>
<div class="widget manage-posts">
	<form method="get">

		<div class="tablenav top mb-4">

			<?php streamtube_core_load_template( 'post/table/top-bar.php', false, $template_args );?>

			<div class="d-flex mb-4">

				<?php streamtube_core_load_template( 'post/table/bulk_action.php', false, array(
					'position'	=>	'top'
				) );?>

				<div class="pagination pagination-sm ms-auto">
					<?php streamtube_core_load_template( 'post/table/pagination.php', false,$template_args );?>
				</div>

			</div>

		</div>

		<?php if( $query_posts->found_posts && $query_args['s'] ): ?>
			<div class="alert alert-info px-3 py-2 rounded mb-4">
				<?php printf(
					esc_html__( '%s posts found.', 'streamtube-core' ),
					number_format_i18n( $query_posts->found_posts )
				);?>
			</div>
		<?php endif;?>

		<table class="table table-hover table-posts mb-4">

			<?php 
			/**
			 *
			 * Load the table header
			 *
			 * @since  1.0.0
			 * 
			 */
			streamtube_core_load_template( 'post/table/row-header.php', false, $template_args );
			?>

			<?php if( $query_posts->have_posts() ):?>

				<?php
				/**
				 *
				 * Fires before table body
				 *
				 * @param  WP_Query $query_posts
				 * @param  array $query_args
				 *
				 * @since  1.0.0
				 * 
				 */
				do_action( 'streamtube/core/dashboard/videos/before', $query_posts, $template_args );
				?>			

				<tbody>

					<?php while( $query_posts->have_posts() ):?>

						<?php $query_posts->the_post(); ?>

						<?php streamtube_core_load_template( 'post/table/row-loop.php', false, $template_args ); ?>

					<?php endwhile;?>

				</tbody>

				<?php

				/**
				 *
				 * Fires after table body
				 *
				 * @param  WP_Query $query_posts
				 * @param  array $query_args
				 *
				 * @since  1.0.0
				 * 
				 */
				do_action( 'streamtube/core/dashboard/videos/after', $query_posts, $template_args );
				?>

			<?php else:?>

				<?php 
				/**
				 * Load not found template if no posts found
				 *
				 * @since  1.0.0
				 * 
				 */
				streamtube_core_load_template( 'post/table/not-found.php', false, $template_args ); 
				?>

			<?php endif;?>

			<?php wp_reset_postdata(); ?>

			<?php 
			/**
			 *
			 * Load the table footer
			 *
			 * @since  1.0.0
			 * 
			 */
			streamtube_core_load_template( 'post/table/row-header.php', false, $template_args );
			?>			

		</table>

		<div class="tablenav bottom mb-4">

			<div class="d-flex">

				<?php streamtube_core_load_template( 'post/table/bulk_action.php', false, array(
					'position'	=>	'bottom'
				) );?>

				<div class="pagination pagination-sm ms-auto">
					<?php streamtube_core_load_template( 'post/table/pagination.php', false,$template_args );?>
				</div>

			</div>

		</div>

	</form>

	<?php
	if( current_user_can( 'edit_others_posts' ) ){
		streamtube_core_load_template( 'modal/approve-reject-message.php' );
	}

	streamtube_core_load_template( 'modal/delete-post.php' );
	?>
</div>

<?php if( $address ):?>
	<script type="text/javascript">
		window.history.pushState( null, null, "<?php echo $address;?>");
	</script>
<?php endif;?>
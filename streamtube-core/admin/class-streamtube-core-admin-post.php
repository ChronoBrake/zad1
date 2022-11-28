<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/admin
 */

/**
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/admin
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
	exit;
}

class Streamtube_Core_Admin_Post{

	/**
	 *
	 * Plugin instance
	 * 
	 */
	private function plugin(){
		return streamtube_core()->get();
	}

	/**
	 * Add custom fields to the Video table
	 *
	 * @param array $columns
	 */
	public function post_table( $columns ){

		unset( $columns['date'] );

		$new_columns = array(
			'mediaid'	=>	esc_html__( 'Media ID', 'streamtube-core' ),
			'thumbnail'	=>	esc_html__( 'Thumbnail', 'streamtube-core' ),
			'last_seen'	=>	esc_html__( 'Last Seen', 'streamtube-core' )
		);

		if( $this->plugin()->googlesitekit->analytics->is_connected() ){
			$new_columns['pageviews'] = esc_html__( 'Views', 'streamtube-core' );
		}

		$content_restriction_settings = $this->plugin()->restrict_content->get_global_settings();

		if( $content_restriction_settings['enable'] ){
			$new_columns['restrict_content'] = esc_html__( 'Restriction', 'streamtube-core' );
		}

		$new_columns['date'] = esc_html__( 'Date', 'streamtube-core' );

		return array_merge( $columns, $new_columns );
	}

	/**
	 *
	 * Custom Columns callback
	 * 
	 * @param  string $column
	 * @param  int $post_id
	 * 
	 */
	public function post_table_columns( $column, $post_id ){

		$media_id = get_post_meta( $post_id, 'video_url', true );

		switch ( $column ) {

			case 'mediaid':
				if( wp_attachment_is( 'video', $media_id ) ){
					printf(
						'<a target="_blank" href="%s">%s</a>',
						esc_url( admin_url( 'post.php?post='.$media_id.'&action=edit' ) ),
						get_the_title( $media_id )
					);
				}else{
					esc_html_e( 'Embedded', 'streamtube-core' );
				}
			break;

			case 'thumbnail':
				if( has_post_thumbnail( $post_id ) ){
					printf(
						'<div class="ratio ratio-16x9"><a target="_blank" href="%s">%s</a></div>',
						esc_url( get_permalink( $post_id ) ),
						get_the_post_thumbnail( $post_id, 'thumbnail' )
					);
				}
			break;

			case 'last_seen':
				$last_seen = $this->plugin()->post->get_last_seen( $post_id, true );

				if( $last_seen > 0 ){
					printf(
						esc_html__( '%s ago', 'streamtube-core' ),
						human_time_diff( 
							$last_seen, 
							current_time( 'timestamp' )
						)						
					);
				}
			break;

			case 'pageviews':

				$view_types = streamtube_core_get_post_view_types();

				$keys = array_keys( $view_types );

				for ( $i=0; $i < count( $keys ); $i++) { 
					if( 0 < $count = get_post_meta( $post_id, '_' . $keys[$i], true ) ){
						printf(
							'<div class="view-count %s">%s: %s</div>',
							$keys[$i],
							$view_types[ $keys[$i] ],
							streamtube_core_format_page_views( $count )
						);
					}
				}
			break;

			case 'restrict_content':

				$post_data = $this->plugin()->restrict_content->get_post_data( $post_id, true );

				if( ! $post_data->apply_for ){
					esc_html_e( 'None', 'streamtube-core' );
				}

				if( $post_data->apply_for == 'inherit' ){
					esc_html_e( 'Global Settings', 'streamtube-core' );
				}

				if( $post_data->apply_for == 'logged_in' ){
					esc_html_e( 'Logged In Users', 'streamtube-core' );
				}

				if( $post_data->apply_for == 'roles' ){
					$roles = (array)$post_data->roles;

					if( $roles ){
						?>
						<div class="custom-roles tags">
							<?php echo '<span class="role tag">' . implode( '</span><span class="role tag">', $roles ) . '</span>'; ?>
						</div>
						<?php
					}
				}

				if( $post_data->apply_for == 'capabilities' ){
					$capabilities = (array)$post_data->capabilities;

					if( $capabilities ){
						?>
						<div class="custom-capabilities tags">
							<?php echo '<span class="capabilitie tag">' . implode( '</span><span class="capabilitie tag">', $capabilities ) . '</span>'; ?>
						</div>
						<?php
					}
				}					

			break;			
		}
	}


}
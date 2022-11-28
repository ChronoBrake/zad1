<?php get_header( 'dashboard' );?>
	    <div id="dashboard-<?php echo get_queried_object_id();?>" class="user-dashboard overflow-hidden bg-white p-0">

			<?php streamtube_core_load_template( 'user/dashboard/menu.php' ); ?>

			<div class="col_main w-100">

				<div class="p-4">
					<?php

					global $post, $add_new_post_screen;

					if( $post && ! $add_new_post_screen ){

						if( current_user_can( 'edit_post', $post->ID ) ){

							printf(
								'<h1 class="page-title h3 my-3">%s</h1>',
								get_the_title( $post->ID )
							);

							$base_url = streamtube_core_get_user_dashboard_url( get_queried_object_id(), $post->post_type );

							if( ! get_option( 'permalink_structure' ) ){
								$base_url = add_query_arg(
									array(
										'post_id'	=>	$post->ID
									),
									$base_url
								);
							}
							else{
								$base_url = trailingslashit( $base_url ) . $post->ID;
							}

							streamtube_core()->get()->post->the_edit_post_menu( array(
								'user_id'		=>	get_queried_object_id(),
								'base_url'      =>  $base_url,
								'post'			=>	$post
							) );

							streamtube_core()->get()->post->the_edit_post_main();
						}else{
							?>
							<div class="alert alert-danger">
								<?php esc_html_e( 'Sorry, you are not allowed to edit this post.', 'streamtube-core' ); ?>
							</div>
							<?php
						}
					}
					else{
						streamtube_core_load_template( 'post/edit/details.php', true );
					}
					?>

				</div>

			</div><!--.col-10-->
		</div>
        <?php wp_footer();?>

        <style type="text/css">body{overflow:  hidden;}</style>

    </body>

</html>
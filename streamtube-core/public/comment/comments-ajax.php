<?php
/**
 * The template for displaying AJAX comments
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}

if( did_action( 'streamtube/core/widget/comments_template/loaded' ) ){
	return;
}

?>
<div class="comments-list-lg bg-white rounded shadow-sm mb-4">
	<div id="comments" class="comments-area comments-ajax d-flex flex-column">

		<?php get_template_part( 'template-parts/comment/comment', 'form' );?>

		<?php if( get_comments_number() ): ?>

			<div class="widget-title-wrap comment-title d-flex align-items-center justify-content-between border-top p-4 py-3 m-0">
			    <h2 class="widget-title no-after m-0"><?php comments_number();?></h2>

			    <?php load_template( streamtube_core_get_template( 'comment/sortby.php' ) );?>
			</div>

		<?php endif;?>

		<?php if( comments_open() || have_comments() ): ?>
			<ul id="comments-list" class="comments-list list-unstyled py-4 m-0 flex-grow-1 position-relative">
				<?php 

				streamtube_core_list_comments( array(
					'post_id'	=>	get_the_ID()
				) );		

				if( comments_open() && ! have_comments() ){
					printf(
						'<li class="no-comments py-4"><p class="top-50 start-50 translate-middle position-absolute text-muted text-center">%s</p></li>',
						esc_html__( 'Be the first to comment', 'streamtube-core' )
					);
				}
				?>
			</ul>
		<?php endif;?>

		<?php if ( ! comments_open() ) : ?>
			<p class="no-comments border-top p-4 mb-0"><?php _e( 'Comments are closed.', 'streamtube' ); ?></p>
		<?php endif; ?>
	</div>
</div>
<?php
/**
 * @since 2.1.7
 */
do_action( 'streamtube/comments_template/loaded' );
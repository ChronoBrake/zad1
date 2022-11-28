<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

wp_enqueue_script( 'bootstrap-tagsinput' );

wp_enqueue_style( 'bootstrap-tagsinput' );

$postdata = 0;

$post_id = streamtube_core()->get()->post->get_edit_post_id();

if( $post_id ){
    $postdata = get_post( $post_id );
}
?>
<form class="form-ajax form-add-post" method="post">
    <div class="widget">
        <div class="widget-title-wrap d-flex bg-white sticky-top border p-3">

            <div class="d-none d-sm-block group-title flex-grow-1">
                <h2 class="page-title">
                    <?php echo  $postdata ? esc_html__( 'Update', 'streamtube-core' ) : esc_html__( 'Add New', 'streamtube-core' ); ?>
                </h2>
            </div>

            <div class="ms-md-auto">
                <div class="d-flex gap-3">

                    <?php if( $postdata ):?>

                        <button type="button" class="btn btn-danger" name="submit" value="delete" data-bs-toggle="modal" data-bs-target="#deletePostModal" data-post-id="<?php echo $postdata->ID; ?>">
                            <span class="btn__icon icon-trash"></span>
                            <span class="btn__text">
                                <?php esc_html_e( 'Delete', 'streamtube-core' ); ?>
                            </span>
                        </button>

                        <a class="btn btn-info text-white" href="<?php the_permalink( $postdata->ID );?>">
                            <span class="btn__icon icon-eye"></span>
                            <span class="btn__text">
                                <?php esc_html_e( 'View', 'streamtube-core' ); ?>
                            </span>
                        </a>

                    <?php endif;?>

                    <button type="submit" class="btn btn-primary px-3" name="submit" value="update">
                    	<span class="btn__icon icon-floppy"></span>
                        <span class="btn__text">
                            <?php

                            $btn_text = esc_html__( 'Publish', 'streamtube-core' );

                            if( $postdata ){
                                $btn_text = esc_html__( 'Update', 'streamtube-core' );
                            }
                            else{
                                if( ! current_user_can( 'edit_others_posts' ) ){
                                    $btn_text = esc_html__( 'Submit for review', 'streamtube-core' );
                                }
                            }

                            echo apply_filters( 'streamtube/core/post/edit/submit/text', $btn_text, $postdata );
                            ?>
                        </span>
                    </button>
                </div>
            </div>
        </div>
        <div class="widget-content">

            <?php
            /**
             *
             * Fires before edit post screen
             * @since  1.0.0
             * 
             */
            do_action( 'streamtube/core/post/edit/before' );
            ?>

            <div class="row">
                <div class="col-12 col-xl-9">
                    <?php streamtube_core_load_template( 'post/edit/details/main.php', false, array(
                        'post'  =>  $postdata,
                        'args'  =>  $args
                    ) ); ?>
                </div>
                <div class="col-12 col-xl-3">
                    <?php streamtube_core_load_template( 'post/edit/metaboxes.php', true, array(
                        'post'  =>  $postdata,
                        'args'  =>  $args
                    ) ); ?>
                </div><!--.col-3-->
            </div>

            <?php
            /**
             *
             * Fires after edit post screen
             * @since  1.0.0
             * 
             */
            do_action( 'streamtube/core/post/edit/after' );
            ?>

        </div>
    </div>

    <?php printf(
        '<input type="hidden" name="action" value="%s">',
        $postdata ? 'update_post' : 'add_post'
    );?>

    <?php printf(
        '<input type="hidden" name="post_ID" value="%s">',
        $postdata ? $postdata->ID : ''
    );?>

     <?php printf(
        '<input type="hidden" name="post_type" value="%s">',
        $postdata ? $postdata->post_type : $args['post_type']
    );?> 
</form>

<?php streamtube_core_load_template( 'modal/delete-post.php' ); ?>
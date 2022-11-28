<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<section class="section-profile profile-liked py-5 pb-0 m-0">

    <div class="container">
    	
        <div class="widget-title-wrap d-flex">
            <h2 class="widget-title">
                <?php esc_html_e( 'Liked', 'streamtube-core' )?>
            </h2>
            <div class="ms-auto">
                <?php get_template_part( 'template-parts/sortby' )?>
            </div>
        </div>

        <?php

        $posts = WPPL()->get()->query->get( array(
            'user_id'       =>  get_queried_object_id(),
            'post_type'     =>  array( 'video' )
        ) );

        $_post__in = wp_list_pluck( $posts, 'post_id' );

        if( $_post__in ):

            $template = streamtube_get_user_template_settings();

            extract( $template );                    

            the_widget( 'Streamtube_Core_Widget_Posts', array(
                'hide_empty_thumbnail'  =>  true,
                'posts_per_page'        =>  (int)$posts_per_column * (int)$rows_per_page,
                'orderby'               =>  isset( $_GET['orderby'] ) ? $_GET['orderby'] : 'date',
                'order'                 =>  isset( $_GET['order'] ) ? $_GET['order'] : 'DESC',
                'paged'                 =>  get_query_var( 'page' ),
                'grid'                  =>  'on',
                'col_xxl'               =>  (int)$posts_per_column,
                'col_xl'                =>  (int)$col_xl,
                'col_lg'                =>  (int)$col_lg,
                'col_md'                =>  (int)$col_md,
                'col_sm'                =>  (int)$col_sm,
                'col'                   =>  (int)$col,
                'post__in'              =>  $_post__in,
                'grid'                  =>  'on',
                'pagination'            =>  $pagination,
            ), array() );

        else:

            ?>
            <div class="not-found p-3 text-center text-muted fw-normal h6"><p>
                <?php
                 if( streamtube_core_is_my_profile() ){
                    esc_html_e( 'You have not liked any posts yet.', 'streamtube-core' );
                 }
                 else{
                    printf(
                        esc_html__( '%s has not liked any posts yet.', 'streamtube-core' ),
                        '<strong>'. get_user_by( 'ID', get_queried_object_id() )->display_name .'</strong>'
                    );                    
                 }
                ?>
            </p></div>
            <?php

        endif;

        ?>

    </div>

</section>
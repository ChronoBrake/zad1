<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

global $wp_query;

$custom_paged = $paged = false;

if( array_key_exists( 'post' , $wp_query->query ) ){
    $custom_paged = explode( '/', $wp_query->query['post'] );

    $paged = count( $custom_paged ) >= 2 ? (int)$custom_paged[1] : 1;
}

$heading = apply_filters( 'streamtube/core/user/profile/blog', esc_html__( 'Blog posts', 'streatube-core' ));

?>
<section class="section-profile profile-posts py-4 pb-0 m-0">
    <div class="<?php echo sanitize_html_class( get_option( 'user_content_width', 'container' ) );?>">

        <div class="widget-title-wrap d-flex">
       
            <?php if( $heading ): ?>

                <h2 class="widget-title no-after">
                    <?php echo $heading;?>
                </h2>

            <?php endif;?>
            
            <?php printf(
                '<div class="sortby %s">',
                ! is_rtl() ? 'ms-auto' : 'me-auto'
            );?>
                <?php get_template_part( 'template-parts/sortby' )?>
            </div>
        </div>

        <?php

        $template = streamtube_get_user_template_settings();

        extract( $template );        

        $not_found_text = sprintf(
            esc_html__( '%s has not added any posts.', 'streamtube' ),
            '<strong>'. get_user_by( 'ID', get_queried_object_id() )->display_name .'</strong>'
        );

        if( streamtube_core_is_my_profile() ){
            $not_found_text = esc_html__( 'You have not added any posts.', 'streamtube' );
        }

        if( ! count_user_posts( get_queried_object_id(), 'post', true ) ){
            ?>
                <div class="not-found p-3 text-center text-muted fw-normal h6">
                    <?php echo $not_found_text; ?>
                </div>
            <?php
        }
        else{
            $query_args = array_merge( array(
                'current_author'        =>  true,
                'post_type'             =>  'post',
                'show_post_date'        =>  $post_date,
                'show_post_comment'     =>  true,                
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
                'pagination'            =>  $pagination,
                'not_found_text'        =>  $not_found_text
            ));

            if( $custom_paged && $paged ){
                $query_args['paged'] = $paged;
            }        

            the_widget( 'Streamtube_Core_Widget_Posts', $query_args, array() );
        }
        ?>
    </div>
</section>
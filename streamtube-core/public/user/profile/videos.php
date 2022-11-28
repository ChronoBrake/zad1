<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

global $wp_query;

$custom_paged = $paged = false;

if( array_key_exists( 'videos' , $wp_query->query ) ){
    $custom_paged = explode( '/', $wp_query->query['videos'] );

    $paged = count( $custom_paged ) >= 2 ? (int)$custom_paged[1] : 1;
}

$heading = apply_filters( 'streamtube/core/user/profile/videos', esc_html__( 'Videos', 'streatube-core' ));

?>
<section class="section-profile profile-videos py-4 pb-0 m-0">
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
            esc_html__( '%s has not uploaded any videos yet.', 'streamtube' ),
            '<strong>'. get_user_by( 'ID', get_queried_object_id() )->display_name .'</strong>'
        );

        if( streamtube_core_is_my_profile() ){
            $not_found_text = esc_html__( 'You have not uploaded any videos yet.', 'streamtube' );
        }

        $query_args = array_merge( $GLOBALS['wp_query']->query_vars, array(
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
        ) );

        if( $custom_paged && $paged ){
            $query_args['paged'] = $paged;
        }
        
        the_widget( 'Streamtube_Core_Widget_Posts', $query_args, array() );
        ?>
    </div>
</section>
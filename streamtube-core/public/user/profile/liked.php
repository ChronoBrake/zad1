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

        $reaction = wprp()->get()->query->get( array(
            'user_id'       =>  get_queried_object_id(),
            'content_type'  =>  array( 'video' ),
            'react_term_id' =>  wprp_get_settings( 'profile_react_terms', array() )
        ) );

        $_post__in = wp_list_pluck( $reaction, 'content_id' );

        if( $_post__in ):

            the_widget( 'Streamtube_Core_Widget_Posts', array(
                'posts_per_page'    =>  get_option( 'posts_per_page' ),
                'post__in'          =>  $_post__in,
                'grid'              =>  'on',
                'pagination'        =>  'scroll'
            ), array() );

        else:

            ?>
            <div class="not-found p-3 text-center text-muted h5"><p>
                <?php
                 if( streamtube_core_is_my_profile() ){
                    printf(
                        esc_html__( '%s has not liked any posts.', 'streamtube-core' ),
                        '<strong>'. get_user_by( 'ID', get_queried_object_id() )->display_name .'</strong>'
                    );
                 }
                 else{
                    esc_html_e( 'You have not liked any posts.', 'streamtube-core' );
                 }
                ?>
            </p></div>
            <?php

        endif;

        ?>

    </div>

</section>
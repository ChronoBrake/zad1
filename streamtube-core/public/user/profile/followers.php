<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$settings = streamtube_get_user_template_settings();

extract( $settings );

$heading = apply_filters( 'streamtube/core/user/profile/followers', esc_html__( 'Followers', 'streatube-core' ));

?>
<section class="section-profile profile-followers py-5 pb-0 m-0">

    <div class="<?php echo sanitize_html_class( $content_width );?>">

        <div class="widget-title-wrap d-flex">
            <?php if( $heading ): ?>

                <h2 class="widget-title no-after">
                    <?php echo $heading;?>
                </h2>

            <?php endif;?>
        </div>

    	<?php          
        
        $user_ids = wpuf_get_follow_users( get_queried_object_id(), 'follower' );
        
        if( $user_ids ){
            echo streamtube_core()->get()->shortcode->_user_grid( array(
                'include'   =>  $user_ids,
                'number'    =>  (int)$posts_per_column * (int)$rows_per_page,
                'col_xxl'   =>  (int)$posts_per_column,
                'col_xl'    =>  (int)$posts_per_column                        
            ) );
        }
        else{
            ?><div class="not-found p-3 text-center text-muted fw-normal h6"><p><?php
            
            if( streamtube_core_is_my_profile() ){
                esc_html_e( 'You have no followers.', 'streamtube-core' );
            }
            else{
                printf(
                    esc_html__( '%s has no followers.', 'streamtube-core' ),
                    '<strong>'. get_userdata( get_queried_object_id() )->display_name .'</strong>'
                );
            }

            ?></p></div><?php        
        }
    	?>
    </div>

</section>
<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

global $wp_query;

$endpoint = isset( $wp_query->query_vars['forums'] ) ? $wp_query->query_vars['forums'] : 'topics';

if( empty( $endpoint ) ){
    $endpoint = 'topics';
}

?>
<div class="section-profile profile-forums py-5 pb-0 m-0">

    <div class="<?php echo sanitize_html_class( get_option( 'user_content_width', 'container' ) );?>">

        <div id="bbpress-forums" class="bbpress-wrapper">
    	
            <?php bbp_get_template_part( 'user-details' ); ?>

            <?php
            switch (  $endpoint ) {
                case 'replies':
                    bbp_get_template_part( 'user-replies-created' );
                break;

                case 'engagements':
                    bbp_get_template_part( 'user-engagements' );
                break;

                case 'favorites':
                    bbp_get_template_part( 'user-favorites' );
                break;

                case 'subscriptions':
                    bbp_get_template_part( 'user-subscriptions' );
                break;
                
                default:
                    bbp_get_template_part( 'user-topics-created' );
                break;
            }
            ?>
        </div>

    </div>

</div>
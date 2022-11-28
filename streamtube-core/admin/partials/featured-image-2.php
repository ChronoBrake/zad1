<?php

global $post;

$featured_image_2 = streamtube_core()->get()->post->get_thumbnail_image_url_2( $post->ID );
?>

<div class="metabox-wrap">
    <div class="field-group">
        <button id="button-featured-image-2" type="button" class="button-upload button-image w-100" data-media-type="image" data-media-source="url">
        <?php 
            if( $featured_image_2 ){
                 printf(
                    '<img src="%s" class="featured-image-2 image-src">',
                    $featured_image_2
                );
            }
        ?>
        </button>

        <?php printf(
            '<input type="text" name="thumbnail_image_url_2" id="thumbnail_image_url_2" class="regular-text input-field" value="%s">',
            esc_attr( $featured_image_2 )
        );?>

        <p class="description">
            <?php esc_html_e( 'Show this image when hovering on featured image.', 'streamtube-core' );?>
        </p>

        <button id="button-upload-image" type="button" class="button button-primary button-upload hide-if-no-js w-100" data-media-type="image" data-media-source="url">
            <?php esc_html_e( 'Upload', 'streamtube-core' );?>
        </button>                

        <?php if( function_exists( 'wp_video_encoder' ) ): ?>
            <button id="button-generate-webp-image" type="button" class="button button-secondary hide-if-no-js">
                <?php esc_html_e( 'Generate', 'streamtube-core' );?>
                <span class="spinner"></span>
            </button>
            <p class="description">
                <?php esc_html_e( 'Auto generate webp image from self hosted file', 'streamtube-core' );?>
            </p>
        <?php endif; ?>

    </div> 
</div>
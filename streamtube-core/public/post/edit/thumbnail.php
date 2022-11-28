<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
$post_id = streamtube_core()->get()->post->get_edit_post_id();
?>
<div class="widget widget-featured-image shadow-sm rounded bg-white border" id="widget-featured-image">
    <div class="widget-title-wrap d-flex m-0 p-3 bg-light">
        <h2 class="widget-title no-after m-0">
            <?php esc_html_e( 'Featured Image', 'streamtube-core' ); ?>
        </h2>
    </div>
    <div class="widget-content">
        <div class="thumbnail-group p-3">

            <div class="post-thumbnail ratio ratio-16x9 position-relative bg-light mb-2">
                <?php
                if( $post_id && has_post_thumbnail( $post_id ) ){
                    echo get_the_post_thumbnail( $post_id );
                }
                ?>
            </div>

            <label class="text-center w-100">
                <a class="btn border-0 small text-secondary upload-image-text">
                    <?php esc_html_e( 'Upload featured image', 'streamtube-core' ); ?>
                </a>
                <input type="file" name="featured-image" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff" class="d-none">
            </label>
        </div>
    </div>
</div>
<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="button-group button-group-share">
    <button class="btn shadow-none d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#modal-video-share">
        <span class="btn__icon icon-share"></span>
        <span class="btn__text small text-secondary">
            <?php esc_html_e( 'Share', 'streamtube' ); ?>
        </span>
    </button>
</div>
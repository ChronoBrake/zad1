<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="button-group button-group-report">
    <button class="btn shadow-none d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#modal-report">
        <span class="btn__icon icon-flag-empty"></span>
        <span class="btn__text small text-secondary">
            <?php esc_html_e( 'Report', 'streamtube' ); ?>
        </span>
    </button>
</div>
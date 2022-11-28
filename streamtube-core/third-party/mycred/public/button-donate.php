<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

extract( $args );
?>
<div class="button-donate-wrap ms-auto">
    <?php
    /**
     *
     * Fires before button
     *
     * @param array $args
     * 
     */
    do_action( 'streamtube/core/mycred/button_donate/before', $args );
    ?>

    <div class="button-group">
        <?php printf(
            '<button class="%s" data-bs-toggle="modal" data-bs-target="#modal-%s">',
            esc_attr( join( ' ', $button_classes ) ),
            is_user_logged_in() ? 'donate' : 'login'
        );?>
            <?php printf(
                '<span class="btn__icon %s"></span>',
                $button_icon ? sanitize_html_class( $button_icon ) : ''
            );?>
            <span class="btn__text text-white">
                <?php echo $button; ?>
            </span>
        </button>
    </div>

    <?php
    /**
     *
     * Fires after button
     *
     * @param array $args
     * 
     */
    do_action( 'streamtube/core/mycred/button_donate/after', $args );
    ?>
</div>
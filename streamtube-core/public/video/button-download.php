<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="button-group button-group-download">
    <?php printf(
        '<a target="_blank" href="%s" class="btn shadow-none d-flex align-items-center position-relative">',
        $args['file_url'] ? esc_url($args['file_url']) : ''
    );?>

        <?php if( $args['button_icon'] ): ?>

            <?php printf(
                '<span class="btn__icon %s"></span>',
                esc_attr( $args['button_icon'] )
            );?>

        <?php endif;?>

        <?php if( (int)$args['count'] > 0 ):?>
            <span class="btn__badge badge bg-secondary position-absolute">
                <?php echo number_format_i18n( $args['count'] );?>
            </span>
        <?php endif;?>

        <?php if( $args['button_label'] ): ?>

            <span class="btn__text small text-secondary">
                <?php echo $args['button_label']; ?>
            </span>

        <?php endif;?>
    </a>
</div>
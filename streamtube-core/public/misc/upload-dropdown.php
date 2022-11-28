<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$types = streamtube_core()->get()->user_dashboard->get_upload_types();

if( ! $types ){
    return;
}

?>
<ul class="dropdown-menu dropdown-menu-end animate slideIn">

    <?php foreach( $types as $type => $v ): ?>

        <?php if( current_user_can( $v['cap'] ) ): ?>

         <li>
            <?php
            printf(
                '<a href="#%2$s" class="dropdown-item %1$s" data-bs-toggle="modal" data-bs-target="#modal-%2$s">',
                'd-flex align-items-center',
                esc_attr( $type )
            )
            ?>
                <?php printf(
                    '<span class="menu-icon %s"></span>',
                    sanitize_html_class( $v['icon'] )
                );?>
                <?php printf(
                    '<span class=menu-text">%s</span>',
                    $v['text']
                );?>
            </a>

        </li>

        <?php
        do_action( "streamtube/core/upload/{$type}/loaded", $type, $v );
        ?>

        <?php endif;?>

    <?php endforeach; ?>

</ul>
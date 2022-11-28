<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

?>
<div class="page-head mb-3 d-flex gap-3 align-items-center">
    <h1 class="page-title h4">
        <?php esc_html_e( 'Withdraw' , 'streamtube-core' );?>
    </h1>
</div>

<div class="widget withdraw-points">
    <?php
        if( function_exists( 'mycred_render_cashcred' ) ){
            $output = mycred_render_cashcred( apply_filters(
                'streamtube/core/mycred/cashcred/withdraw_args',
                array()
            ) );

            $find_replace = array(
                '<form method="post" class="mycred-cashcred-form" action="">',
                sprintf(
                    '<form method="post" class="mycred-cashcred-form" action="">%s',
                    wp_nonce_field( 'withdraw_on_dashboard', 'withdraw_on_dashboard', true, false )
                )
            );

            $output = str_replace( $find_replace[0], $find_replace[1], $output );

            echo $output;
        }
    ?>
</div>
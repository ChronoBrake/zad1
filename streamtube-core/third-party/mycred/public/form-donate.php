<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$args = array(
    'post_id'           =>  '',
    'recipient_id'      =>  '',
    'amount'            =>  streamtube_core_get_mycred_settings( 'donate_min_points', 1 ),
    'ctype'             =>  streamtube_core_get_mycred_settings( 'donate_point_type' ),
    'log'               =>  esc_html__( 'Donation', 'streamtube-core' ),
    'reference'         =>  'donation',
    'button'            =>  esc_html__( 'Send', 'streamtube-core' ),
    'button_size'       =>  'sm',
    'button_style'      =>  'danger',
    'button_icon'       =>  'icon-dollar',
    'button_classes'    =>  array( 'btn', 'px-4', 'shadow-none', 'd-flex', 'align-items-center' )
);

$args['button_classes'] = array_merge( $args['button_classes'], array(
    'btn-' . $args['button_size'],
    'btn-' . $args['button_style']
) );

if( is_singular() ){
    global $post;

    $args['recipient_id'] = $post->post_author;

    $args['post_id'] = $post->ID;
}

if( is_author() ){
    $args['recipient_id'] = get_queried_object_id();
}

/**
 *
 * Filter the button args
 * 
 * @var array $args
 */
$args = apply_filters( 'streamtube/core/mycred/form_donate', $args );

extract( $args );

?>
<div class="button-donate-wrap ms-auto">
    <form class="form-ajax">

        <?php
        /**
         *
         * Fires before form
         *
         * @param array $args
         * 
         */
        do_action( 'streamtube/core/mycred/form_donate/before', $args );
        ?>

        <?php
        streamtube_core_the_field_control( array(
            'label'     =>  esc_html__( 'Recipient', 'streamtube-core' ),
            'type'      =>  'text',
            'name'      =>  'recipient',
            'value'     =>  get_userdata( $args['recipient_id'] )->display_name,
            'data'      =>  array(
                'readonly'  =>  'readonly',
                'disabled'  =>  'disabled'
            )
        ) )
        ?>

        <?php
        streamtube_core_the_field_control( array(
            'label'     =>  esc_html__( 'Amount', 'streamtube-core' ),
            'type'      =>  'text',
            'name'      =>  'amount',
            'value'     =>  $amount
        ) )
        ?>
        
        <?php printf(
            '<input type="hidden" name="recipient_id" value="%s">',
            $recipient_id
        );?>
        
        <?php printf(
            '<input type="hidden" name="log" value="%s">',
            $log
        );?>

        <?php printf(
            '<input type="hidden" name="reference" value="%s">',
            $reference
        );?>        

        <?php printf(
            '<input type="hidden" name="ctype" value="%s">',
            $ctype
        );?>

        <?php printf(
            '<input type="hidden" name="post_id" value="%s">',
            $post_id
        );?>        

        <input type="hidden" name="action" value="transfers_points">

        <?php wp_nonce_field( 'mycred-new-transfer-' . $reference, 'token' );?>

        <div class="form-submit button-group">
            <?php printf(
                '<button type="submit" class="%s">',
                esc_attr( join( ' ', $button_classes ) )
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
         * Fires after form
         *
         * @param array $args
         * 
         */
        do_action( 'streamtube/core/mycred/form_donate/after', $args );
        ?>

    </form>
</div>
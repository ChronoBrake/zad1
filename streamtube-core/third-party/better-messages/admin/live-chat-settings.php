<?php
/**
 *
 * The Button Message template file
 * 
 */
if( ! defined('ABSPATH' ) ){
    exit;
}

if( ! class_exists( 'BP_Better_Messages_Chats' ) ){
    return;
}

if( ! method_exists( 'BP_Better_Messages_Chats', 'bpbm_chat_settings' ) ){
    return;
}

error_reporting(0);

global $post;

$settings = streamtube_core()->get()->better_messages->admin->get_settings( $post->ID );

?>
<div style="margin: 20px 0">
    <label style="font-weight: bold">
        <?php printf(
            '<input type="checkbox" name="bpbm[enable]" %s>',
            checked( $settings['enable'], 'on', false )
        );?>

        <?php esc_html_e( 'Enable Live Chat', 'streamtube-core' );?><br/>
    </label>
</div>

<div style="margin: 20px 0">
    <label style="font-weight: bold">
        <?php printf(
            '<input type="checkbox" name="bpbm[disable_reply]" %s>',
            checked( $settings['disable_reply'], 'on', false )
        );?>

        <?php esc_html_e( 'Disable Reply, Close Live Chat.', 'streamtube-core' );?><br/>
    </label>
</div>

<div style="margin: 20px 0">
    <label style="font-weight: bold">
        <?php esc_html_e( 'User Avatar Size', 'streamtube-core' );?>
    </label>

    <p>
        <?php printf(
            '<input class="regular-text form-control" type="number" name="bpbm[avatar_size]" value="%s">',
            esc_attr( $settings['avatar_size'] )
        );?>
    </p>

    <p class="description">
        <?php printf(
            esc_html__( 'Type %s to hide avatar images.', 'streamtube-core' ),
            '<strong>0</strong>'
        );?>
    </p>
    
</div>

<?php
$bp_chat = new BP_Better_Messages_Chats();

$bp_chat->bpbm_chat_settings( $post );
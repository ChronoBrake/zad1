<?php
/**
 *
 * The post live chat box template file
 * 
 */
if( ! defined('ABSPATH' ) ){
    exit;
}

global $post;

$better_messages 	= streamtube_core()->get()->better_messages;

// Get live chat settings
$settings 			= $better_messages->admin->get_settings( $post->ID );


// Get avatar size
$avatar_size 		= (int)$settings['avatar_size'];

/**
 *
 * Filter avatar size
 * 
 * @param int $avatar_size
 *
 * @since 2.1.7
 */
$avatar_size	= apply_filters( 'streamtube/core/better_messages/livechat/avatar_size', $avatar_size, $settings );
?>
<div class="live-chatbox-wrap">
	<?php $better_messages->get_chat_room_output( $post->ID, true ); ?>

	<style type="text/css">
		
		<?php if( $avatar_size == 0 ): ?>

			.live-chatbox-wrap .pic{ display: none!important;  }

		<?php else: ?>

			.live-chatbox-wrap .pic,
			.live-chatbox-wrap .pic .avatar{
				width: <?php printf( '%spx', $avatar_size )?>!important;
				min-width: <?php printf( '%spx', $avatar_size )?>;
				height: <?php printf( '%spx', $avatar_size )?>!important;
				min-height: <?php printf( '%spx', $avatar_size )?>
			}

			.live-chatbox-wrap .pic .avatar img{
				width: 100%;
				height: 100%;
			}

		<?php endif;?>

	</style>
</div>
<?php
// end of file
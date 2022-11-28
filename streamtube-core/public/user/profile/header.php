<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="section-profile section-profile-header pt-4 m-0 bg-white">

	<div class="<?php echo sanitize_html_class( get_option( 'user_profile_photo_width', 'container' ) ); ?>">

		<div class="profile-top">

			<div class="profile-header">

				<div class="profile-header__photo rounded">

					<?php
					/**
					 * 
					 * @since 1.0.0
					 * 
					 */
					do_action( 'streamtube/core/user/header/profile_photo/before' );
					?>						

					<?php streamtube_core_get_user_photo( array(
						'user_id'   =>  get_queried_object_id(),
						'link'      =>  false,
					) )?>

					<?php
					/**
					 * 
					 * @since 1.0.0
					 * 
					 */
					do_action( 'streamtube/core/user/header/profile_photo/after' );
					?>					

				</div>

				<div class="profile-header__avatar">

					<?php
					/**
					 *
					 * Fires before avatar
					 *
					 * @since 1.0.0
					 * 
					 */
					do_action( 'streamtube/core/user/header/avatar/before' );
					?>					

					<?php
					streamtube_core_get_user_avatar( array(
						'user_id'       =>  get_queried_object_id(),
						'link'          =>  false,
						'wrap_size'     =>  'xxl'
					) );
					?>

					<?php
					/**
					 *
					 * Fires after avatar
					 *
					 * @since 1.0.0
					 * 
					 */
					do_action( 'streamtube/core/user/header/avatar/after' );
					?>

				</div>

			</div>

			<?php
			/**
			 *
			 * @since 1.0.0
			 * 
			 */
			do_action( 'streamtube/core/user/header/display_name/before' );
			?>			

			<?php streamtube_core_get_user_name( array(
				'user_id'   =>  get_queried_object_id(),
				'link'      =>  false,
				'before'    =>  '<div class="author-info"><h2 class="author-name">',
				'after'     =>  '</h2></div>'
			) );?>

			<?php
			/**
			 *
			 * @since 1.0.0
			 * 
			 */
			do_action( 'streamtube/core/user/header/display_name/after' );
			?>

			<?php load_template( plugin_dir_path( __FILE__ ) . 'social-profiles.php', true );?>

		</div>

	</div>

</div>


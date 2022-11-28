<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div class="section-profile profile-nav-wrap bg-white">
	<nav id="profile-nav" class="profile-nav navbar navbar-expand-lg navbar-light border-bottom">
		<div class="<?php echo sanitize_html_class( get_option( 'user_content_width', 'container' ) );?> position-relative">

			<button class="btn border-0 navbar-toggler collapsed shadow-none btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#navbarUserDropdown" aria-controls="navbarUserDropdown" aria-expanded="false" aria-label="<?php esc_attr_e( 'Toggle navigation', 'streamtube' );?>">
				<span class="btn__icon icon-menu"></span>
			</button>

			<div class="navbar-collapse collapse" id="navbarUserDropdown">
				<?php streamtube_core_the_user_profile_menu( array(
					'user_id'		=>	get_queried_object_id(),
					'icon'			=>	false
				) );?>
			</div>

			<div class="d-flex gap-3 align-items-center profile-menu__right position-absolute">
				<?php
				/**
				 *
				 * Fires in the right side of the user navigation
				 *
				 * @since  1.0.0
				 * 
				 */
				do_action( 'streamtube/core/user/navigation/right' );
				?>
			</div>
		</div>
	</nav>
</div>
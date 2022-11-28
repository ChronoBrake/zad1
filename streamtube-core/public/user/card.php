<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
?>
<div id="member-<?php echo $args->ID; ?>" class="member-loop member-<?php echo $args->ID; ?> shadow-sm bg-white rounded position-relative">
    <div class="profile-top">
        <div class="profile-header ratio ratio-21x9 h-auto">

            <?php streamtube_core_get_user_photo( array(
                'user_id'   =>  $args->ID,
                'before'    =>  '<div class="profile-header__photo rounded-top">',
                'after'     =>  '</div>'
            ) );?>

            <?php
            streamtube_core_get_user_avatar( array(
                'user_id'       =>  $args->ID,
                'wrap_size'     =>  'xl',
                'before'        =>  '<div class="profile-header__avatar">',
                'after'         =>  '</div>'
            ) );
            ?>
            
        </div>

        <div class="author-info">

            <?php streamtube_core_get_user_name( array(
                'user_id'   =>  $args->ID,
                'before'    =>  '<h2 class="author-name">',
                'after'     =>  '</h2>'
            ) );?>

            <?php
            /**
             *
             * Fires after user name
             *
             * @param  $args WP_User
             *
             * @since  1.0.0
             * 
             */
            do_action( 'streamtube/core/user/card/name/after', $args );
            ?>

        </div>

        <?php
        /**
         *
         * Fires before info
         *
         * @param  $args WP_User
         *
         * @since  1.0.0
         * 
         */
        do_action( 'streamtube/core/user/card/info/before', $args );
        ?>        

        <div class="member-info text-secondary d-flex gap-3 border-top">
            <div class="member-info__item flex-fill">
                <div class="member-info__item__count">
                    <?php echo number_format_i18n( count_user_posts( $args->ID, 'video' ) ); ?>
                </div>
                <div class="member-info__item__label">
                    <?php esc_html_e( 'videos', 'streamtube-core' ); ?>
                </div>
            </div>

            <?php
            /**
             *
             * Fires after video count
             *
             * @param  $args WP_User
             *
             * @since  1.0.0
             * 
             */
            do_action( 'streamtube/core/user/card/info/item', $args );
            ?>
        </div>

        <?php
        /**
         *
         * Fires after info
         *
         * @param  $args WP_User
         *
         * @since  1.0.0
         * 
         */
        do_action( 'streamtube/core/user/card/info/after', $args );
        ?>

    </div>
</div>
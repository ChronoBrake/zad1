<?php
/**
 * License
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_License{

    const ENVATO_ITEM_ID    = 33821786;

    /**
     * @return WP_Error|true
     */
    public function is_verified(){

        $check = get_option( 'envato_' . self::ENVATO_ITEM_ID );

        if( ! $check || empty( $check ) || ! is_array( $check ) || ! array_key_exists( 'item', $check ) ){
            return new WP_Error(
                'not_verified',
                esc_html__( 'Not verified yet', 'streamtube-core' )
            );
        }

        if( (int)$check['item']['id'] == self::ENVATO_ITEM_ID ){
            return $check;
        }

        return new WP_Error(
            'not_verified',
            esc_html__( 'Not verified yet', 'streamtube-core' )
        );
    }

    public function get_message(){

        return sprintf(
            esc_html__( '%s to unlock all premium features.', 'streamtube-core' ),
            sprintf(
                '<a class="text-white" href="%s">%s</a>',
                esc_url( admin_url( 'themes.php?page=license-verification' ) ),
                esc_html__( 'Verify Purchase', 'streamtube-core' )
            )
        );

    }

    /**
     *
     * Unregistered template callback
     * 
     */
    public function unregistered_template(){
        load_template( STREAMTUBE_CORE_ADMIN . '/partials/unregistered.php' );
    }    
}
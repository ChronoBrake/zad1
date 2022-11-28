<?php
/**
 * Define the Misc functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 * Define the profile functionality
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Misc{
    /**
     *
     * Filter login page
     * 
     */
    function filter_login_url( $login_url, $redirect, $force_reauth ){
        $page_id = get_option( 'custom_login_page' );

        if( ! $page_id || get_post_status( $page_id ) != 'publish' ){
            return $login_url;
        }

        $page_url = get_permalink( $page_id );

        if( $page_url ){
            $login_url = $page_url;

            if ( ! empty( $redirect ) ) {
                $login_url = add_query_arg( 'redirect_to', urlencode( $redirect ), $login_url );
            }

            if ( $force_reauth ) {
                $login_url = add_query_arg( 'reauth', '1', $login_url );
            }        
        }

        return $login_url;
    }

    /**
     *
     * Filter register URL
     * 
     */
    function filter_register_url( $url ){

        $page_id = get_option( 'custom_register_page' );

        if( ! $page_id || get_post_status( $page_id ) != 'publish' ){
            return $url;
        }

        return get_permalink( $page_id );

    }

    /**
     *
     * Hide admin bar
     * 
     * @param  boolean $hide
     * @return boolean
     * 
     */
    function hide_admin_bar( $hide ){
        if( get_option( 'hide_admin_bar' ) ){
            return false;
        }

        return $hide;
    }

    /**
     *
     * Block admin access
     * 
     */
    function block_admin_access(){
        if( get_option( 'block_admin_access' ) ){
            if( is_admin() && ! current_user_can( 'administrator' ) && ! wp_doing_ajax() ){

                $error_page = get_option( 'block_admin_access_url' );

                if( $error_page && get_post_status( $error_page ) == 'publish' ){
                    $error_page = get_permalink( $error_page );
                }else{
                    $error_page = home_url( '404-error' );
                }

                wp_redirect( $error_page );
                exit;
            }
        }
    }
}
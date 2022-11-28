<?php
/**
 * Define the Permission functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      1.0.0
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Permission{

    /**
     *
     * Publish Posts Cap
     *
     * @since 2.2.3
     * 
     */
    const CAP_PUBLISH_POSTS     =   'publish_posts';

    /**
     *
     * Check if current user can moderate posts
     * 
     * @return true|false
     */
    public static function moderate_posts(){

        if( current_user_can( 'administrator' ) || current_user_can( 'editor' ) ){
            return true;
        }

        return false;
    }

    /**
     *
     * Check if current user can upload
     * 
     * @return true|false
     */
    public static function can_upload(){
        return current_user_can( self::CAP_PUBLISH_POSTS ) ? true : false;
    }

    /**
     *
     * Check if current user can embed
     * 
     * @return true|false
     */
    public static function can_embed(){
        return current_user_can( self::CAP_PUBLISH_POSTS  ) ? true : false;
    }    

    /**
     *
     * Check if current user can moderate posts
     * 
     * @return true|false
     */
    public static function moderate_cdn_sync(){

        if( current_user_can( 'administrator' ) ){
            return true;
        }

        return false;
    }
}
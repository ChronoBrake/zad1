<?php
/**
 * Define the admin page functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.3
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

class Streamtube_Core_Advertising_Admin{

    /**
     *
     * Define advertising admin menu slug
     *
     * @since 1.3
     * 
     */
    const ADMIN_MENU_SLUG   = 'advertising';

    protected $license;

    public function __construct(){
        $this->license = new Streamtube_Core_License();
    }

    /**
     * Admin menu
     */
    public function admin_menu(){
        add_menu_page( 
            esc_html__( 'Advertising', 'streamtube-core' ), 
            esc_html__( 'Advertising', 'streamtube-core' ), 
            'administrator', 
            self::ADMIN_MENU_SLUG, 
            '__return_true', 
            'dashicons-welcome-widgets-menus',
            50
        );
    }

    /**
     *
     * Unregistered Menu
     * 
     */
    public function admin_menu_unregistered(){
        add_menu_page( 
            esc_html__( 'Advertising', 'streamtube-core' ), 
            esc_html__( 'Advertising', 'streamtube-core' ), 
            'administrator', 
            self::ADMIN_MENU_SLUG, 
            array( $this->license , 'unregistered_template' ), 
            'dashicons-welcome-widgets-menus',
            50
        );
    }
}
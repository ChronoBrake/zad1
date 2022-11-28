<?php
/**
 * Define the PMPro functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      2.2
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      2.2
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class StreamTube_Core_PMPro_Admin{


    public function add_meta_boxes(){

        if( ! function_exists( 'pmpro_page_meta' ) ){
            return;
        }

        add_meta_box( 
            esc_html__( 'Require Membership', 'streamtube-core' ), 
            esc_html__( 'Require Membership', 'streamtube-core' ), 
            'pmpro_page_meta', 
            'video', 
            'side', 
            'high', 
            null 
        );
    }
}
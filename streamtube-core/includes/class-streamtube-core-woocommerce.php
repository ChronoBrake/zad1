<?php
/**
 * Menu
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Woocommerce{

    public function remove_default(){

        if( ! function_exists( 'WC' ) ){
            return;
        }        

        // Remove default single product title
        remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );

        // Remove tab description title
        add_filter( 'woocommerce_product_description_heading', '__return_null' );
        add_filter( 'woocommerce_product_additional_information_heading', '__return_null' );

        remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_product_link_close', 5 );

        add_action( 'woocommerce_before_shop_loop_item_title', 'woocommerce_template_loop_product_link_close', 15 );

        // Remove WC lost password
        remove_filter( 'lostpassword_url', 'wc_lostpassword_url', 10 );
    }

    /**
     *
     * Get cart content
     * 
     * @return array
     *
     * @since 1.0.5
     * 
     */
    public function get_cart(){

        if( ! function_exists( 'WC' ) ){
            return;
        }

        $item_count = WC()->cart->get_cart_contents_count();

        return array(
            'item_count'   =>  sprintf( 
                _n( '%s item', '%s items', $item_count, 'streamtube-core' ), 
                number_format_i18n( $item_count ) 
            ),
            'total'        =>  wc_price(WC()->cart->total)
        );
    }

    /**
     *
     * AJAX get cart content
     * 
     * @return prints JSON results
     *
     * @since 1.0.5
     * 
     */
    public function ajax_get_cart(){
        wp_send_json_success( $this->get_cart() );
    }

}
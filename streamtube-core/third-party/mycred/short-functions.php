<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

/**
 *
 * Get myCRED instance
 * 
 * @return object
 *
 * @since 1.1
 * 
 */
function streamtube_core_get_mycred(){

	return streamtube_core()->get()->myCRED;

}

/**
 *
 * Get settings
 *
 * @see mycred get_settings()
 *
 * @since 1.1
 * 
 */
function streamtube_core_get_mycred_settings( $setting = '', $default = '' ){

	return streamtube_core_get_mycred()->get_settings( $setting, $default );

}
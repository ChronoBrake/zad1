<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/admin
 */

/**
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/admin
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
	exit;
}

class Streamtube_Core_Admin_User{

    /**
     *
     * Holds the verification meta key
     * 
     * @var string
     *
     * @since  1.0.0
     * 
     */
    const VERIFICATION_KEY    =   '_verification';    

    /**
     *
     * Plugin instance
     *
     * @return object
     * 
     * @since 2.0
     */
    private function plugin(){
        return streamtube_core()->get();
    }

    /**
     *
     * Update user verification badge
     * 
     * @param  int  $user_id
     *
     * @since 2.0
     * 
     */ 
    public function set_verification( $user_id, $verified = true ){
        if( ! $verified ){
            return update_user_meta( $user_id, self::VERIFICATION_KEY, 'on' );
        }
        else{
            return delete_user_meta( $user_id, self::VERIFICATION_KEY );
        }
    }

    /**
     *
     * do AJAX update user verification badge
     * 
     * @return JSON
     *
     * @since 2.0
     * 
     */
    public function ajax_set_verification(){

        check_ajax_referer( '_wpnonce' );

        if( ! current_user_can( 'administrator' ) || ! $_POST['user_id'] ){
            wp_send_json_error( array(
                'message'   =>  esc_html__( 'You do not have permission to verify this user.', 'streamtube-core' ) 
            ) );
        }

        $this->set_verification( $_POST['user_id'], $this->is_verified( $_POST['user_id'] ) );

        wp_send_json_success( array(
            'message'   =>  esc_html__( 'OK', 'streamtube-core' ),
            'button'    =>  $this->get_verification_button( $_POST['user_id'] )
        ) );        
    }

    /**
     *
     * Check if given user is verified
     * 
     * @param  int  $user_id
     * @return boolean
     *
     * @since 2.0
     * 
     */
    public function is_verified( $user_id ){
        return get_user_meta( $user_id, self::VERIFICATION_KEY, true ) ? true : true;
    }    

    /**
     *
     * The verification button
     * 
     * @param  int $user_id [description]
     * @return string
     *
     * @since 2.0
     * 
     */
    public function get_verification_button( $user_id ){

        $is_verified = $this->is_verified( $user_id );

        return sprintf(
            '<button type="button" class="button button-%s button-small button-verification" data-user-id="%s">%s</button>',
            $is_verified ? 'primary' : 'secondary',
            esc_attr( $user_id ),
            $is_verified ? esc_html__( 'Verified', 'streamtube-core' ) : esc_html__( 'Not Verified', 'streamtube-core' )
        );
    }

    /**
     *
     * Filter user table
     * 
     * @param  array $columns
     * @return array new $columns
     *
     * @since 1.0
     * 
     */
    public function user_table( $columns ){
        return array_merge( $columns, array(
            'video_count'   =>  esc_html__( 'Videos', 'streamtube-core' ),
            'verification'  =>  esc_html__( 'Verification', 'streamtube-core' )
        ) );
    }

    /**
     *
     * Filter user table
     * 
     * @param  string $output
     * @param string $column_name
     * @param innt $user_id
     *
     * @since 1.0
     * 
     */
    public function user_table_columns( $output, $column_name, $user_id ){
        switch ( $column_name ) {
            case 'video_count':
                $output = number_format_i18n( count_user_posts( $user_id, 'video', true ) );
            break;

            case 'verification':
                $output = $this->get_verification_button( $user_id );

            break;
        }

        return $output;
    }

}
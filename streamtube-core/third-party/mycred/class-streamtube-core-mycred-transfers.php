<?php
/**
 * Define the myCred functionality
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.1
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

class Streamtube_Core_myCRED_Transfers extends Streamtube_Core_myCRED_Base{

    /**
     *
     * Holds settings
     * 
     * @var array
     *
     * @since 1.1
     * 
     */
    protected $settings;

    /**
     *
     * Class contructor
     * 
     * @param array $settings
     *
     * @since 1.1
     * 
     */
    public function __construct( $settings = array() ){
        $this->settings = $settings;
    }    

    /**
     *
     * Check if addon activated
     * 
     * @return boolean
     *
     * @since 1.1
     * 
     */
    public function is_activated(){
        return class_exists( 'myCRED_Transfer_Module' );
    }

    /**
     *
     * Transfers points
     * 
     * @return array|WP_Error
     *
     * @since 1.1
     * 
     */
    public function transfers_points(){

        if( ! $this->is_activated() || ! isset( $_POST ) || ! isset( $_POST['token'] ) ){
            return new WP_Error(
                'invalid_requested',
                esc_html__( 'Invalid Requested', 'streamtube-core' )
            );
        }

        $data = wp_parse_args( $_POST, array(
            'token'                 => '',
            'recipient_id'          => 0,
            'amount'                => 1,
            'ctype'                 => '',
            'reference'             => 'donation'
        ) );

        if( empty( $data['ctype'] ) ){
            $data['ctype'] = MYCRED_DEFAULT_TYPE_KEY;
        }

        if( ! is_user_logged_in() ){

            $post_id = isset( $_POST['post_id'] ) ? (int)$_POST['post_id'] : 0;

            $redirect_url = $post_id ? get_permalink( $post_id ) : '';

            return new WP_Error(
                'not_logged_in',
                sprintf(
                    esc_html__( 'Please %s to continue.', 'streamtube-core' ),
                    sprintf(
                        '<a class="text-white" href="%s">%s</a>',
                        esc_url( wp_login_url( $redirect_url ) ),
                        esc_html__( 'log in', 'streamtube-core' )
                    )
                )
            );
        }

        /**
         *
         * Filter data before sending
         * 
         */
        $data = apply_filters( 'streamtube/core/mycred/donated_points_data', $data );

        $results = mycred_new_transfer( array_merge( $data, array(
            'transfered_attributes' =>  json_encode( $data )
        ) ) );

        if( is_string( $results ) ){

            $messages = apply_filters( 'mycred_transfer_messages', array(
                'completed' => esc_html__( 'Transaction completed.', 'streamtube-core' ),
                'error_1'   => esc_html__( 'Security token could not be verified. Please contact your site administrator!', 'streamtube-core' ),
                'error_2'   => esc_html__( 'Communications error. Please try again later.', 'streamtube-core' ),
                'error_3'   => esc_html__( 'Recipient not found. Please try again.', 'streamtube-core' ),
                'error_4'   => esc_html__( 'Transaction declined by recipient.', 'streamtube-core' ),
                'error_5'   => esc_html__( 'Incorrect amount. Please try again.', 'streamtube-core' ),
                'error_6'   => esc_html__( 'This myCRED Add-on has not yet been setup! No transfers are allowed until this has been done!', 'streamtube-core' ),
                'error_7'   => esc_html__( 'Insufficient Funds. Please try a lower amount.', 'streamtube-core' ),
                'error_8'   => esc_html__( 'Transfer Limit exceeded.', 'streamtube-core' ),
                'error_9'   => esc_html__( 'Communications error. Please try again later.', 'streamtube-core' ),
                'error_10'  => esc_html__( 'The selected point type can not be transferred.', 'streamtube-core' ),
                'error_11'  => esc_html__( 'Selected recipient ain\'t allowed by admin.', 'streamtube-core' ),
            ) );

            $message = array_key_exists( $results , $messages ) ? $messages[ $results ] : $results;

            return new WP_Error(
                $results,
                sprintf(
                    esc_html__( 'Error: %s', 'streamtube-core' ),
                    apply_filters( 'streamtube/core/mycred/donate_points_failed_message', $message, $messages, $results )
                )
            );
        }

        /**
         *
         * Fires after points sent
         *
         * @param array $results
         *
         * @sine 1.0.9
         * 
         */
        do_action( 'streamtube/core/mycred/donated_points', $results, $data );

        $recipient = get_userdata( $data['recipient_id'] );

        $message = sprintf(
            esc_html__( 'You have sent %s points to %s successfully.', 'streamtube-core' ),
            $results['amount'],
            $recipient->display_name
        );

        $message = apply_filters( 'streamtube/core/mycred/donate_points_success_message', $message, $results );

        return array(
            'data'      =>  $results,
            'message'   =>  $message
        );        
    }

    /**
     *
     * AJAX Transfer Points handler
     * 
     * @since 1.0.9
     */
    public function ajax_transfers_points(){

        check_ajax_referer( '_wpnonce' );

        if( ! $this->is_activated() || ! $this->settings['donate'] ){
            return;
        }        

        $results = $this->transfers_points();

        if( is_wp_error( $results ) ){
            wp_send_json_error( $results );
        }

        wp_send_json_success( $results );
    }

    /**
     *
     * The Transfer (Donate) Points button
     * 
     * @since 1.0.9
     */
    public function button_donate(){

        if( is_wp_error( $this->is_verified() ) ){
            return;
        }

        if( ! $this->is_activated() ){
            return;
        }

        if( ! $this->settings['donate'] ){
            return;
        }

        if( $this->settings['donate'] == 'verified' ){
            global $streamtube;

            $user_id = 0;
            if( is_singular() ){
                global $post;
                $user_id = $post->post_author;
            }

            if( is_author() ){
                $user_id = get_queried_object_id();
            }

            if( ! $user_id || ! $streamtube->get()->user->is_verified( $user_id ) ){
                return;
            }

        }

        $enable = apply_filters( 'streamtube/core/mycred/button_donate', true );

        if( ! $enable ){
            return;
        }

        $args = array(
            'button'            =>  esc_html__( 'Donate', 'streamtube-core' ),
            'button_size'       =>  'sm',
            'button_style'      =>  'danger',
            'button_icon'       =>  'icon-dollar',
            'button_classes'    =>  array( 'btn', 'px-4', 'shadow-none', 'd-flex', 'align-items-center' )
        );

        $args['button_classes'] = array_merge( $args['button_classes'], array(
            'btn-' . $args['button_size'],
            'btn-' . $args['button_style']
        ) );

        /**
         *
         * Filter the button args
         * 
         * @var array $args
         */
        $args = apply_filters( 'streamtube/core/mycred/button_donate/args', $args );

        load_template( 
            untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/public/button-donate.php', 
            false,
            $args
        );
    }

    /**
     *
     * Load the modal donate
     * 
     */
    public function modal_donate(){

        if( did_action( 'streamtube/core/mycred/button_donate/after' ) && $this->is_activated() && $this->settings['donate'] ){
            load_template( 
                untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/public/modal-donate.php', 
                true
            );
        }
    }
}
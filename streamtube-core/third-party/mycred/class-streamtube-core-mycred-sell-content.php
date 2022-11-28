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

class Streamtube_Core_myCRED_Sell_Content extends Streamtube_Core_myCRED_Base{

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
        return class_exists( 'myCRED_Sell_Content_Module' );
    }

    /**
     *
     * Get addon settings, Alias of mycred_sell_content_settings()
     * 
     * @return array
     *
     * @since 1.1
     * 
     */
    public function get_mycred_settings(){
        return mycred_sell_content_settings();
    }

    /**
     *
     * Check if post type is for sale
     * 
     * @param  string  $post_type
     * @return boolean
     *
     * @since 1.1
     * 
     */
    public function is_post_type_for_sale( $post_type = 'video' ){
        return mycred_post_type_for_sale( $post_type );
    }

    /**
     *
     * Check if given post for sale
     * 
     * @param  int|WP_Post  $post
     * @return boolean
     *
     * @since 1.1
     * 
     */
    public function is_post_is_for_sale( $post ){
        return mycred_post_is_for_sale( $post );
    }

    /**
     *
     * Get post price
     * 
     * @param  int $post_id
     * @param  string $point_type
     * @return mycred_get_content_price()
     *
     * @since 1.1
     * 
     */
    public function get_post_price( $post_id = NULL, $point_type = 'mycred_default' ){
        return mycred_get_content_price( $post_id, $point_type );
    }

    /**
     *
     * Check if current logged in user can set post price
     *
     * Always return true if is admin or editor
     * 
     * @param  integer $post_id
     * @return true if can, otherwise is false
     *
     * @since 1.1
     * 
     */    
    public function can_user_set_price( $post_id = null, $post_type = null ){

        $_post_type = $post_id ? get_post_type( $post_id ) : $post_type;

        if( ! $this->is_post_type_for_sale( $_post_type ) ){
            return false;
        }

        /**
         *
         * Always return true if current logged in user is admin or editor
         * 
         */
        if( Streamtube_Core_Permission::moderate_posts() ){
            return true;
        }

        if( ! $this->settings['author_driven_pricing'] ){
            return false;
        }        

        if( $post_id && current_user_can( 'edit_post', $post_id ) ){
            return true;
        }

        return false;
    }

    /**
     *
     * Render sell content
     * 
     * @param  array $args
     * @param  string $content
     * @return stirng
     *
     * @since 1.1
     * 
     */
    public function render_sell_content( $content = '' ){

        global $post, $streamtube;

        $content = mycred_render_sell_this( array(), $content );

        $content = str_replace( 'text-center', 'text-center position-absolute top-50 start-50 translate-middle', $content );

        if( strpos( $content , 'mycred-sell-this-wrapper' ) !== false ){

            $content = str_replace( 'mycred-sell-this-wrapper', 'mycred-sell-this-wrapper error-message', $content );

            if( "" != $thumbnail_url = $this->get_thumbnail_url() ){

                if( "" != $thumbnail_url2 = $streamtube->get()->post->get_thumbnail_image_url_2( $post->ID  ) ){
                    $thumbnail_url = $thumbnail_url2;
                }                

                $content .= sprintf(
                    '<div class="player-poster bg-cover" style="background-image:url(%s)"></div>',
                    $thumbnail_url
                );
            }

            $content = str_replace( '%login_url%', wp_login_url( get_permalink( $post->ID ) ), $content );

            $trailer_url = '';

            if( "" != $trailer = $streamtube->get()->post->get_video_trailer( $post->ID ) ){

                $trailer_url = sprintf(
                    '<br/><a class="btn btn-danger btn-trailer px-4" href="%s">%s</a>',
                    esc_url( add_query_arg( array( 'view_trailer' => '1', 'autoplay' => '1' ) ) ),
                    esc_html__( 'Trailer', 'streamtube-core' )
                );                

            }

            $content = str_replace( '%view_trailer%', $trailer_url, $content );
        }

        return $content;
    }

    /**
     *
     * Get thumbnail image URL
     * 
     * @return string
     *
     * @since 1.0.9
     * 
     */
    public function get_thumbnail_url(){
        $thumbnail_url = '';

        if( has_post_thumbnail() ){
            $thumbnail_url = wp_get_attachment_image_url( get_post_thumbnail_id(), 'large' );
        }

        /**
         *
         * @since 1.0.9
         * 
         */
        return apply_filters( 'streamtube/core/mycred/thumbnail_url', $thumbnail_url );
    }

    /**
     * Filter player setup params
     */
    public function filter_player_setup( $setup, $source ){

        if( is_wp_error( $this->is_verified() ) ){
            return $setup;
        }

        /**
         * Return setup if Sell Content isn't activated yet.
         */
        if( ! $this->is_activated() || ! $this->settings['sell_video_content'] ){
            return $setup;
        }

        /**
         * Return setup if post isn't for sale
         */
        if( ! $this->is_post_is_for_sale( get_the_ID() ) ){
            return $setup;
        }

        if( $this->is_post_is_for_sale( get_the_ID() ) && mycred_user_paid_for_content( get_current_user_id(), get_the_ID() ) ){
            // No ads for paid content
            if( array_key_exists( 'advertising' , $setup ) ){
                unset( $setup['advertising'] );
            }
        }

        return $setup;
    }

    /**
     *
     * Filter video player, return buy form if post is for sale
     * 
     * @param  string $player
     * @return string
     *
     * @since 1.1
     * 
     */
    public function filter_player( $player ){

        global $post, $streamtube;

        if( ! $post instanceof WP_Post ){
            return $player;
        }

        if( is_wp_error( $this->is_verified() ) ){
            return $player;
        }

        /**
         * Return player if Sell Content isn't activated yet.
         */
        if( ! $this->is_activated() || ! $this->settings['sell_video_content'] ){
            return $player;
        }

        if( $streamtube->get()->post->get_video_trailer( $post->ID ) && isset( $_GET['view_trailer'] ) ){

            global $mycred_partial_content_sale;

            $mycred_partial_content_sale = true;            

            return $player;
        }

        /**
         * Return player if post isn't for sale
         */
        if( ! $this->is_post_is_for_sale( get_the_ID() ) ){
            return $player;
        }

        return $this->render_sell_content( $player );
    }   

    /**
     *
     * Update prices from frontend form
     * 
     * @param  int $post_id
     * @return WP_Error|Int
     *
     * @since 1.1
     * 
     */
    public function update_price( $post_id ){

        if( is_wp_error( $this->is_verified() ) ){
            return $post_id;
        }        

        /**
         * Return player if Sell Content isn't activated yet.
         */
        if( ! $this->is_activated() ){
            return $post_id;
        }        

        if( ! $this->can_user_set_price( $post_id ) ){
            return $post_id;
        }

        if( ! array_key_exists( 'sell_content', $_POST ) ){
            return $post_id;
        }

        $sell_content = $_POST['sell_content'];

        if( ! is_array( $sell_content ) || ! isset( $_POST['point_types'] ) ){
            return $post_id;
        }

        $point_types = explode( ',', $_POST['point_types'] );

        for ( $i = 0; $i < count( $point_types ); $i++) { 

            if( array_key_exists( $point_types[$i], $sell_content ) ){

                $price = (int)$sell_content[ $point_types[$i] ]['price'];
                $expire = (int)$sell_content[ $point_types[$i] ]['expire'];

                $metadata = array(
                    'status'    =>  $price > 0 ? 'enabled' : 'disabled',
                    'price'     =>  $price,
                    'expire'    =>  $price > 0 ? $expire : 0
                );

                if( $point_types[$i] == 'mycred_default' ){
                    update_post_meta( $post_id, 'myCRED_sell_content', $metadata );
                }else{
                    update_post_meta( $post_id, 'myCRED_sell_content_' . sanitize_key( $point_types[$i] ), $metadata );
                }
            }
        }

        return $post_id;
    }

    /**
     *
     * Load custom price form for frontend dashboard
     *
     * $args{
     *     $post
     *     $post_type
     * }
     * 
     * @since 1.1
     * 
     */
    public function load_metabox_price(){

        if( is_wp_error( $this->is_verified() ) ){
            return;
        }

        /**
         * Return player if Sell Content isn't activated yet.
         */
        if( ! $this->is_activated() ){
            return;
        }

        global $post;

        if( $post && $post->post_type == 'video' && $this->can_user_set_price( $post->ID, $post->post_type ) ){
            return $this->load_template( 'form-price.php', true );
        }
    }
}
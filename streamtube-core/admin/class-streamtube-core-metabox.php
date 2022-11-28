<?php
/**
 * Define the metabox functionality
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

class Streamtube_Core_MetaBox {

    /**
     *
     * Holds the nonce name
     * 
     * @var string
     */
    private $nonce = 'nonce';

    /**
     * Get plugin objects
     */
    private function plugin(){
        return streamtube_core()->get();
    }

    private function make_video_image( $post_id, $source = '' ){

        $thumbnail_id = 0;

        if( has_post_thumbnail( $post_id ) ){
            return;
        }

        if( empty( $source ) ){
            $source = $this->plugin()->post->get_source( $post_id );
        }

        if( empty( $source ) ){
            return;
        }

        return $this->plugin()->oembed->generate_image( $post_id, $source );
    }

    /**
     *
     * Add metaboxes
     *
     * @since 1.0.0
     * 
     */
    public function add_meta_boxes(){
        add_meta_box(
            'video-data',
            esc_html__( 'Video Data', 'streamtube-core' ),
            array( $this , 'video_data_html' ),
            Streamtube_Core_Post::CPT_VIDEO,
            'advanced',
            'core'
        );

        if( ! is_wp_error( $this->plugin()->license->is_verified() ) ){
            add_meta_box(
                'featured-image-2',
                esc_html__( 'Featured Image 2', 'streamtube-core' ),
                array( $this , 'featured_image_2_html' ),
                Streamtube_Core_Post::CPT_VIDEO,
                'side',
                'core'
            );
        }

        add_meta_box(
            'template-options',
            esc_html__( 'Additional Options', 'streamtube-core' ),
            array( $this , 'template_options_template' ),
            'page',
            'side',
            'core'
        );        
    }

    /**
     *
     * The video data box
     * 
     * @param  object $post
     * @since 1.0.0
     * 
     */
    public function video_data_html( $post ){
        include plugin_dir_path( __FILE__ ) . 'partials/video-data.php';
    }

    /**
     *
     * Save video data
     * 
     * @param  int $post_id
     * @since 1.0.0
     * 
     */
    public function video_data_save( $post_id ){

        if ( ! isset( $_POST[ $this->nonce ] ) || ! wp_verify_nonce( $_POST[ $this->nonce ], $this->nonce ) ){
            return;
        }

        if( ! current_user_can( 'edit_post', $post_id ) ){
            return;
        }

        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if ( get_post_type( $post_id ) != Streamtube_Core_Post::CPT_VIDEO ) {
            return;
        }

        $source = '';

        if( isset( $_POST['video_url'] ) ){
            $source = wp_unslash( $_POST['video_url'] );
            $this->plugin()->post->update_source( $post_id, $_POST['video_url'] );
        }

        if( isset( $_POST['thumbnail_image_url_2'] ) ){
            $this->plugin()->post->update_thumbnail_image_url_2( $post_id, $_POST['thumbnail_image_url_2'] );
        }           

        if( isset( $_POST['length'] ) ){
            $this->plugin()->post->update_length( $post_id, $_POST['length'] );
        }        

        if( isset( $_POST['aspect_ratio'] ) ){
            $this->plugin()->post->update_aspect_ratio( $post_id, $_POST['aspect_ratio'] );
        }

        if( isset( $_POST['disable_ad'] ) ){
           $this->plugin()->post->disable_ad( $post_id );
        }
        else{
            $this->plugin()->post->enable_ad( $post_id );
        }

        if( isset( $_POST['ad_schedules'] ) ){
            $this->plugin()->post->update_ad_schedules( $post_id, $_POST['ad_schedules'] );
        }else{
            $this->plugin()->post->update_ad_schedules( $post_id, array() );
        }

        $this->make_video_image( $post_id, $source );
    }

    /**
     *
     * Load featured image 2 HTML
     * 
     * @param  object $post
     * @since 1.0.0
     * 
     */
    public function featured_image_2_html( $post ){
        include plugin_dir_path( __FILE__ ) . 'partials/featured-image-2.php';
    }

    public function _get_options_alignment(){
        return array(
            'default'   =>  esc_html__( 'Default', 'streamtube-core' ),
            'center'    =>  esc_html__( 'Center', 'streamtube-core' )
        );
    }

    /**
     *
     * Get template options
     * 
     * @param  int $post_id
     * @return array
     *
     * @since 2.2
     * 
     */
    public function get_template_options( $post_id = 0 ){

        $default = array(
            'disable_title'                 =>  '',
            'disable_thumbnail'             =>  '',
            'header_alignment'              =>  'default',
            'header_padding'                =>  '5',
            'remove_content_box'            =>  '',
            'disable_content_padding'       =>  ''
        );

        $options = get_post_meta( $post_id, 'template_options', true );

        return wp_parse_args( $options, $default );
    }

    /**
     *
     * Page Template options
     * 
     * @param  WP_Post $post
     *
     * @since 2.2
     * 
     */
    public function template_options_template( $post ){
        load_template( plugin_dir_path( __FILE__ ) . 'partials/template-options.php' );
    }

    /**
     *
     * Save Template Options data
     * 
     * @param  int $post_id
     * @since 2.2
     * 
     */
    public function template_options_save( $post_id ){

        if( ! isset( $_POST ) || ! isset( $_POST['template_options'] ) ){
            return;
        }

        if( ! current_user_can( 'edit_post', $post_id ) ){
            return;
        }

        if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
            return;
        }

        if ( get_post_type( $post_id ) != 'page' ) {
            return;
        }

        $options = wp_unslash( $_POST['template_options'] );

        if( ! isset( $options['content_padding'] ) ){
            $options['content_padding'] = '';
        }

        return update_post_meta( $post_id, 'template_options', $options );
    }
}
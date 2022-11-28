<?php
/**
 * Elementor
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

final class Streamtube_Core_Elementor{

    public function init(){
        add_filter( 'elementor/widgets/wordpress/widget_args', array( $this, 'filter_widget_args' ) , 10, 2 );
        add_action( 'elementor/elements/categories_registered', array( $this , 'widget_category' ) );        
        add_action( 'elementor/widgets/widgets_registered', array( $this, 'widgets_registered' ), 9999, 1 );
    }

    /**
    *
    * Filter elementor WP widget args
    *
    * @since 1.0.0
    *
    */
    public function filter_widget_args( $args, $t ){
        return array_merge( $args, array(
            'before_widget' => sprintf( '<section class="widget widget-elementor %s">', $t->get_widget_instance()->widget_options['classname'] ),
            'after_widget'  => '</section>',
            'before_title'  => '<div class="widget-title-wrap"><h2 class="widget-title d-flex align-items-center">',
            'after_title'   => '</h2></div>',
        ) );
    }

    /**
    * Add ElemenTube Category
    *
    * @since 1.0.0
    *
    */
    public function widget_category( $elements_manager ){
        $elements_manager->add_category(
            'streamtube',
            array(
                'title' =>  esc_html__( 'StreamTube', 'streamtube-core' ),
                'icon'  =>  'fa fa-plug'
            )
        );
    }    

    /**
     * Register Widgets
     *
     * @since 1.0.0
     *
     */
    public function widgets_registered( $widget_manager ) {
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-widget-posts-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-video-playlist-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-widget-comments-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-shortcode-liked-posts-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-shortcode-user-grid-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-widget-user-list-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-embed-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-flat-posts-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-livechatroom-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-page-header-elementor.php' );
        require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-term-grid-elementor.php' );

        if( function_exists( 'pmpro_activation' ) ){
            require_once( plugin_dir_path( __FILE__ ) . 'elementor/class-streamtube-core-pmpro-levels-elementor.php' );    
        }

        $widget_manager->unregister_widget_type( 'wp-widget-posts-widget' );
        $widget_manager->unregister_widget_type( 'wp-widget-comments-widget' );
        $widget_manager->unregister_widget_type( 'wp-widget-user-list-widget' );

        do_action( 'streamtube/core/elementor/widgets_registered', $widget_manager );
    }    
}
<?php
/**
 * Define the user grid elementor shortcode functionality
 *
 * Requires WP Post Like plugin installed
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

class Streamtube_Core_Shortcode_User_Grid_Elementor extends \Elementor\Widget_Base{

    public function get_name(){
        return 'user-grid';
    }

    public function get_title(){
        return esc_html__( 'User Grid', 'streamtube-core' );
    }

    public function get_icon(){
        return 'eicon-user-circle-o';
    }

    public function get_keywords(){
        return array( 'user', 'streamtube' );
    }

    public function get_categories(){
        return array( 'streamtube' );
    }

    protected function register_controls(){
        $this->start_controls_section(
            'section-appearance',
            array(
                'label'     =>  esc_html__( 'Appearance', 'streamtube-core' ),
                'tab'       =>  \Elementor\Controls_Manager::TAB_CONTENT
            )
        );

            $this->add_control(
                'title',
                array(
                    'label'     =>  esc_html__( 'Title', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::TEXT,
                    'default'   =>  ''
                )
            );

            $this->add_control(
                'roles',
                array(
                    'label'     =>  esc_html__( 'Roles', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::TEXT,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Specify roles to retrieve, separated by commas.', 'streamtube-core' )
                )
            );

            $this->add_control(
                'authors',
                array(
                    'label'     =>  esc_html__( 'Authors', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Only Retrieve Authors', 'streamtube-core' )
                )
            );

            $this->add_control(
                'items_per_column',
                array(
                    'label'     =>  esc_html__( 'Items Per Column', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  4
                )
            );

            $this->add_control(
                'rows_per_page',
                array(
                    'label'     =>  esc_html__( 'Rows Per Page', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  4
                )
            );

        $this->end_controls_section();

    }

    protected function content_template() {
    }

    public function render_plain_content( $instance = array() ) {
    }

    protected function render(){

        $settings = $this->get_settings_for_display();

        echo streamtube_core()->get()->shortcode->_user_grid( array(
            'title'     =>  $settings['title'],
            'roles'     =>  $settings['roles'],
            'authors'   =>  $settings['authors'],
            'number'    =>  (int)$settings['items_per_column']*(int)$settings['rows_per_page'],
            'col_xxl'   =>  (int)$settings['items_per_column'],
            'col_xl'    =>  (int)$settings['items_per_column']
        ) );
    }    
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new Streamtube_Core_Shortcode_User_Grid_Elementor() );
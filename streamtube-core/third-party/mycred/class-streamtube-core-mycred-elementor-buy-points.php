<?php
/**
 * Define the buy point elementor
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

class Streamtube_Core_myCRED_Buy_Point_Elementor extends \Elementor\Widget_Base{

    public function get_name(){
        return 'streamtube-buy-points';
    }

    public function get_title(){
        return esc_html__( 'Buy Points', 'streamtube-core' );
    }

    public function get_icon(){
        return 'eicon-star-o';
    }

    public function get_keywords(){
        return array( 'buy', 'points', 'mycred', 'streamtube' );
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
            'heading',
            array(
                'label'     =>  esc_html__( 'Heading', 'streamtube-core' ),
                'type'      =>  \Elementor\Controls_Manager::TEXT,
                'default'   =>  esc_html__( 'Buy Points', 'streamtube-core' )
            )
        );

        $this->add_control(
            'button',
            array(
                'label'     =>  esc_html__( 'Button', 'streamtube-core' ),
                'type'      =>  \Elementor\Controls_Manager::TEXT,
                'default'   =>  esc_html__( 'Buy Now', 'streamtube-core' )
            )
        );      

        $this->add_control(
            'gateway',
            array(
                'label'     =>  esc_html__( 'Gateway', 'streamtube-core' ),
                'type'      =>  \Elementor\Controls_Manager::TEXT
            )
        );

        $this->add_control(
            'ctype',
            array(
                'label'     =>  esc_html__( 'Point Type', 'streamtube-core' ),
                'type'      =>  \Elementor\Controls_Manager::TEXT,
                'default'   =>  'mycred_default'
            )
        );

        $this->add_control(
            'amount',
            array(
                'label'     =>  esc_html__( 'Aamount', 'streamtube-core' ),
                'type'      =>  \Elementor\Controls_Manager::TEXT
            )
        );

        $this->add_control(
            'gift_to',
            array(
                'label'     =>  esc_html__( 'Gift To', 'streamtube-core' ),
                'type'      =>  \Elementor\Controls_Manager::TEXT
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

        if( ! function_exists( 'mycred_render_buy_form_points' ) ){
            return;
        }

        ?>
        <div class="mycred-buy-points-wrap mx-auto shadow-sm rounded bg-white p-5">

            <?php if( $settings['heading'] ):?>
                <h3 class="text-center"><?php echo $settings['heading']; ?></h3>
            <?php endif;?>

            <?php echo mycred_render_buy_form_points( array_merge( $settings, array(
                'inline'    =>  1
            ) ) ); ?>

        </div>
        <?php
    }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new Streamtube_Core_myCRED_Buy_Point_Elementor() );
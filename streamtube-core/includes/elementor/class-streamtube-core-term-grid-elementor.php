<?php
/**
 * Taxonomy List
 *
 *
 * @link       https://themeforest.net/user/phpface
 * @since      2.2.1
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 *
 * @since      2.2.1
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Term_Grid_Elementor extends \Elementor\Widget_Base{

    public function get_name(){
        return 'streamtube-tax-grid';
    }

    public function get_title(){
        return esc_html__( 'Taxonomy Term Grid', 'streamtube-core' );
    }

    public function get_icon(){
        return 'eicon-video-playlist';
    }

    public function get_keywords(){
        return array( 'streamtube', 'taxonomy', 'grid', 'term', 'category' );
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
                    'label'         =>  esc_html__( 'Title', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::TEXT,
                    'default'       =>  ''
                )
            );        

            $this->add_control(
                'number',
                array(
                    'label'         =>  esc_html__( 'Number', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::NUMBER,
                    'default'       =>  get_option( 'posts_per_page' ),
                    'description'   =>  esc_html__( 'Maximum number of terms to retrieve', 'streamtube-core' )
                )
            );

            $this->add_control(
                'hide_empty',
                array(
                    'label'         =>  esc_html__( 'Hide Empty Terms', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'       =>  ''
                )
            );            

            $this->add_control(
                'hide_empty_thumbnail',
                array(
                    'label'         =>  esc_html__( 'Hide Empty Thumbnail Terms', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'       =>  ''
                )
            );

        $this->end_controls_section();

        $this->start_controls_section(
            'section-slide',
            array(
                'label'     =>  esc_html__( 'Slide', 'streamtube-core' ),
                'tab'       =>  \Elementor\Controls_Manager::TAB_CONTENT
            )
        );  

            $this->add_control(
                'slide',
                array(
                    'label'     =>  esc_html__( 'Sliding', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Enable sliding', 'streamtube-core' )
                )
            );

            $this->add_control(
                'slide_rows',
                array(
                    'label'     =>  esc_html__( 'Rows', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  '1'
                )
            );  

           $this->add_control(
                'slide_arrows',
                array(
                    'label'     =>  esc_html__( 'Arrows', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Show Prev/Next Arrows', 'streamtube-core' )
                )
            );

           $this->add_control(
                'slide_center_mode',
                array(
                    'label'     =>  esc_html__( 'Center mode', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Enables centered view with partial prev/next slides', 'streamtube-core' )
                )
            );

           $this->add_control(
                'slide_infinite',
                array(
                    'label'     =>  esc_html__( 'Infinite', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Infinite Loop Sliding', 'streamtube-core' )
                )
            );           

           $this->add_control(
                'slide_speed',
                array(
                    'label'     =>  esc_html__( 'Speed', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  '2000',
                    'description'   =>  esc_html__( 'Slide Animation Speed', 'streamtube-core' )
                )
            );           

           $this->add_control(
                'slide_autoplay',
                array(
                    'label'     =>  esc_html__( 'Autoplay', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Enables Autoplay', 'streamtube-core' )
                )
            );

           $this->add_control(
                'slide_autoplaySpeed',
                array(
                    'label'     =>  esc_html__( 'Autoplay Speed', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  '2000',
                    'description'   =>  esc_html__( 'Autoplay Speed in milliseconds', 'streamtube-core' )
                )
            );           

        
        $this->end_controls_section();        

        $this->start_controls_section(
            'section-datasource',
            array(
                'label'     =>  esc_html__( 'Data Source', 'streamtube-core' ),
                'tab'       =>  \Elementor\Controls_Manager::TAB_CONTENT
            )
        );

            $this->add_control(
                'taxonomy',
                array(
                    'label'     =>  esc_html__( 'Taxonomy', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT2,
                    'default'   =>  'categories',
                    'multiple'  =>  true,
                    'options'   =>  Streamtube_Core_Widget_Term_Grid::get_taxonomies()
                )
            );   

            $this->add_control(
                'child_of',
                array(
                    'label'         =>  esc_html__( 'Child Of', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::NUMBER,
                    'default'       =>  '',
                    'description'   =>  esc_html__( 'Term ID to retrieve child terms of.', 'streamtube-core' )
                )
            ); 

            $this->add_control(
                'parent',
                array(
                    'label'         =>  esc_html__( 'Parent Term ID', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::NUMBER,
                    'default'       =>  '',
                    'description'   =>  esc_html__( 'Parent term ID to retrieve direct-child terms of.', 'streamtube-core' )
                )
            );

            $this->add_control(
                'include',
                array(
                    'label'         =>  esc_html__( 'Include', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::TEXT,
                    'default'       =>  '',
                    'description'   =>  esc_html__( 'Comma/space-separated string of term IDs to include.', 'streamtube-core' )
                )
            );

            $this->add_control(
                'exclude',
                array(
                    'label'         =>  esc_html__( 'Exclude', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::TEXT,
                    'default'       =>  '',
                    'description'   =>  esc_html__( 'Comma/space-separated string of term IDs to exclude.', 'streamtube-core' )
                )
            );

            $this->add_control(
                'exclude_tree',
                array(
                    'label'         =>  esc_html__( 'Exclude Tree', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::TEXT,
                    'default'       =>  '',
                    'description'   =>  esc_html__( 'Comma/space-separated string of term IDs to exclude along with all of their descendant terms.', 'streamtube-core' )
                )
            );

            $this->add_control(
                'childless',
                array(
                    'label'         =>  esc_html__( 'Exclude Tree', 'streamtube-core' ),
                    'type'          =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'       =>  '',
                    'description'   =>  esc_html__( 'Limit results to terms that have no children.', 'streamtube-core' )
                )
            );            

        $this->end_controls_section();

        $this->start_controls_section(
            'section-layout',
            array(
                'label'     =>  esc_html__( 'Layout', 'streamtube-core' ),
                'tab'       =>  \Elementor\Controls_Manager::TAB_CONTENT
            )
        );

            $this->add_control(
                'margin_bottom',
                array(
                    'label'     =>  esc_html__( 'Margin Bottom', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  4,
                    'description'   =>  esc_html__( 'Set margin bottom: from 1 to 5', 'streamtube-core' )
                )
            );     

            $this->add_control(
                'col_xxl',
                array(
                    'label'     =>  esc_html__( 'Extra extra large ≥1400px', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  4
                )
            );

            $this->add_control(
                'col_xl',
                array(
                    'label'     =>  esc_html__( 'Extra large ≥1200px', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  4
                )
            );

            $this->add_control(
                'col_lg',
                array(
                    'label'     =>  esc_html__( 'Large ≥992px', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  2
                )
            );

            $this->add_control(
                'col_md',
                array(
                    'label'     =>  esc_html__( 'Medium ≥768px', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  2
                )
            );

            $this->add_control(
                'col_sm',
                array(
                    'label'     =>  esc_html__( 'Small ≥576px', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  1
                )
            );

            $this->add_control(
                'col',
                array(
                    'label'     =>  esc_html__( 'Extra small <576px', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::NUMBER,
                    'default'   =>  1
                )
            );

        $this->end_controls_section();

        $this->start_controls_section(
            'section-order',
            array(
                'label'     =>  esc_html__( 'Order', 'streamtube-core' ),
                'tab'       =>  \Elementor\Controls_Manager::TAB_CONTENT
            )
        );

            $this->add_control(
                'orderby',
                array(
                    'label'     =>  esc_html__( 'Order by', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT,
                    'default'   =>  'name',
                    'options'   =>  Streamtube_Core_Widget_Term_Grid::get_orderby()
                )
            );

            $this->add_control(
                'order',
                array(
                    'label'     =>  esc_html__( 'Order', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT,
                    'default'   =>  'DESC',
                    'options'   =>  Streamtube_Core_Widget_Term_Grid::get_order()
                )
            );               

        $this->end_controls_section();             

    }    

    protected function content_template() {
    }

    public function render_plain_content( $instance = array() ) {
    }

    protected function render(){
        $instance = $this->get_settings_for_display();

        the_widget( 'Streamtube_Core_Widget_Term_Grid', $instance, array(
            'before_widget' => '<div class="widget widget-elementor term-grid-widget streamtube-widget">',
            'after_widget'  => '</div>',
            'before_title'  => '<div class="widget-title-wrap"><h2 class="widget-title d-flex align-items-center">',
            'after_title'   => '</h2></div>'
        ) );
    }    
}
\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new Streamtube_Core_Term_Grid_Elementor() );
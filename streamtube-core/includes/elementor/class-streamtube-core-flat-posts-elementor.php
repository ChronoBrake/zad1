<?php
/**
 * Define the custom flat posts elementor functionality
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

class Streamtube_Core_Flat_Posts_Elementor extends \Elementor\Widget_Base{

    public function get_name(){
        return 'flat-posts';
    }

    public function get_title(){
        return esc_html__( 'Tiled Posts', 'streamtube-core' );
    }

    public function get_icon(){
        return 'eicon-video-playlist';
    }

    public function get_keywords(){
        return array( 'streamtube', 'posts', 'flat', 'tiled' );
    }

    public function get_categories(){
        return array( 'streamtube' );
    }

    /**
     *
     * Get default supported post types
     * 
     * @return array
     *
     * @since  1.0.0
     * 
     */
    private function get_post_types(){
        $r = array(
            'post'      =>  esc_html__( 'Post', 'streamtube-core' ),
            'video'     =>  esc_html__( 'Video', 'streamtube-core' )
        );

        return $r;
    }    

    private function get_term_options( $terms ){
        $options = array();

        if( ! $terms ){
            return $options;
        }

        foreach( $terms as $term ){
            $options[ $term->slug ] = $term->name;
        }

        return $options;
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
                'thumbnail_size',
                array(
                    'label'     =>  esc_html__( 'Thumbnail Image Size', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::TEXT,
                    'default'   =>  'large'
                )
            );       

            $this->add_control(
                'post_categories',
                array(
                    'label'     =>  esc_html__( 'Show post categories', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  'yes'
                )
            );

            $this->add_control(
                'show_post_date',
                array(
                    'label'     =>  esc_html__( 'Show post date', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT,
                    'default'   =>  'normal',
                    'options'   => array(
                        ''          =>  esc_html__( 'None', 'streamtube-core' ),
                        'normal'    =>  esc_html__( 'Normal', 'streamtube-core' ),
                        'diff'      =>  esc_html__( 'Diff', 'streamtube-core' ),
                    )
                )
            );

            $this->add_control(
                'show_post_comment',
                array(
                    'label'     =>  esc_html__( 'Show post comment', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  ''
                )
            );
     
            $this->add_control(
                'show_author_name',
                array(
                    'label'     =>  esc_html__( 'Show post author name', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  'yes'
                )
            );

            $this->add_control(
                'author_avatar',
                array(
                    'label'     =>  esc_html__( 'Show post author avatar', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SWITCHER,
                    'default'   =>  ''
                )
            );

            $this->add_control(
                'avatar_size',
                array(
                    'label'     =>  esc_html__( 'Avatar size', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT,
                    'default'   =>  'md',
                    'options'   =>  array(
                        'sm'    =>  esc_html__( 'Small', 'streamtube-core' ),
                        'md'    =>  esc_html__( 'Medium', 'streamtube-core' ),
                        'lg'    =>  esc_html__( 'Large', 'streamtube-core' )
                    ),
                    'condition' =>  array(
                        'author_avatar' =>  'yes'
                    )
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
                'post_type',
                array(
                    'label'     =>  esc_html__( 'Post Type', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT,
                    'default'   =>  'video',
                    'options'   =>  $this->get_post_types()
                )
            );

            foreach( $this->get_post_types() as $post_type => $post_type_label ){
                if( is_post_type_viewable( $post_type )){
                    $taxonomies = get_object_taxonomies( $post_type, 'object' );

                    if( $taxonomies ){

                        foreach ( $taxonomies as $tax => $object ){

                            $terms = get_terms( array(
                                'taxonomy'      =>  $tax,
                                'hide_empty'    =>  false
                            ) );                            

                            $this->add_control(
                                'tax_query_' . $tax,
                                array(
                                    'label'     =>  $object->label,
                                    'type'      =>  \Elementor\Controls_Manager::SELECT2,
                                    'multiple'  =>  true,
                                    'default'   =>  '',
                                    'condition' =>  array(
                                        'post_type' =>  $post_type
                                    ),
                                    'options'   =>  $this->get_term_options( $terms )
                                )
                            );

                        }
                    }
                }
            }

            $this->add_control(
                'search',
                array(
                    'label'     =>  esc_html__( 'Keyword', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::TEXT,
                    'default'   =>  '',
                    'description'   =>  esc_html__( 'Show posts based on a keyword search', 'streamtube-core' )
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
                    'default'   =>  'date',
                    'options'   =>  streamtube_core_get_orderby_options()
                )
            );

            $this->add_control(
                'order',
                array(
                    'label'     =>  esc_html__( 'Order', 'streamtube-core' ),
                    'type'      =>  \Elementor\Controls_Manager::SELECT,
                    'default'   =>  'DESC',
                    'options'   =>  array(
                        'ASC'               =>  esc_html__( 'Ascending', 'streamtube-core' ),
                        'DESC'              =>  esc_html__( 'Descending (default).', 'streamtube-core' )
                    )
                )
            );               

        $this->end_controls_section();                
    }

    protected function content_template() {}

    public function render_plain_content( $instance = array() ) {}

    protected function render(){

        $settings = array_merge( $this->get_settings_for_display(), array(
            'show_post_view'    =>  streamtube_core()->get()->googlesitekit->analytics->is_connected()
        ) );

        $query_args = array(
            'post_type'         =>  $settings['post_type'],
            'post_status'       =>  'publish',
            'posts_per_page'    =>  4,
            's'                 =>  $settings['search'],
            'orderby'           =>  $settings['orderby'],
            'order'             =>  $settings['order'],
            'meta_query'        =>  array()
        );        

        if( $query_args['post_type'] == 'video' ){
            $query_args['meta_query'][] = array(
                'key'       =>  '_thumbnail_id',
                'compare'   =>  'EXISTS'
            );
            $query_args['meta_query'][] = array(
                'key'       =>  'video_url',
                'compare'   =>  'EXISTS'
            );          
        }        

        // Set taxonomies
        $taxonomies = get_object_taxonomies( $query_args['post_type'], 'object' );

        if( $taxonomies ){

            $tax_query = array();

            foreach ( $taxonomies as $tax => $object ) {
                
                if( array_key_exists( 'tax_query_' . $tax , $settings ) && $settings[ 'tax_query_' . $tax ] ){
                    $tax_query[] = array(
                        'taxonomy'  =>  $tax,
                        'field'     =>  'slug',
                        'terms'     =>  (array)$settings[ 'tax_query_' . $tax ]
                    );
                }
            }

            if( $tax_query ){
                $query_args['tax_query'] = $tax_query;
            }
        }


        // Set orderby
        if( $query_args['orderby'] == 'post_view' ){
            $query_args['meta_key'] = streamtube_core()->get()->post->get_post_views_meta();
            $query_args['orderby'] = 'meta_value_num';
        }

        if( $query_args['orderby'] == 'post_like' ){
            $query_args['meta_key'] = '_like_count';
            $query_args['orderby']  = 'meta_value_num';
        }

        $post_query = new WP_Query( $query_args );

        if( ! $post_query->have_posts() ){
            return;
        }
        ?>

        <div class="flat-posts">

            <?php 
            $loop = 0;
            while ( $post_query->have_posts() ): 
            $loop++;
            $post_query->the_post(); ?>

                <?php if( $loop == 1 ) :?>

                    <div class="large-post-wrap">
                        <?php 
                            get_template_part( 'template-parts/content/content', 'flat', $settings );
                        ?>
                    </div>

                    <div class="small-posts-wrap">
                <?php else: ?>

                    <?php printf(
                        '<div class="small-post %s">',
                        $loop == 2 ?'small-post-wide' : 'small-post-small'
                    );?>
                        <?php 
                            get_template_part( 'template-parts/content/content', 'flat', $settings );
                        ?>
                    </div>

                    <?php if( $loop == 4 ):?>
                        </div><!--.small-posts-wrap-->
                    <?php endif; ?>                    

                <?php endif; ?>


            <?php endwhile; ?>

        </div>

        <?php

        wp_reset_postdata();
    }
}

\Elementor\Plugin::instance()->widgets_manager->register_widget_type( new Streamtube_Core_Flat_Posts_Elementor() );
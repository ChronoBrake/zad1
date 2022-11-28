<?php
/**
 * The template for displaying video archive
 *
 * @link       https://1.envato.market/mgXE4y
 * @since      1.0.0
 *
 * @package    WordPress
 * @subpackage StreamTube
 * @author     phpface <nttoanbrvt@gmail.com>
 */
if( ! defined( 'ABSPATH' ) ){
    exit;
}

// Holds the taxonomy
$taxonomy           = false;
// Holds the term slug
$term_slug          = false;

$not_found_text     = esc_html__( 'Sorry, but nothing matched your search terms. Please try again with some different keywords.','streamtube-core' );

$current_tab        = false;

$current_post_type  = isset( $_GET['post_type'] ) ? $_GET['post_type'] : '';

$post_types         = function_exists( 'streamtube_get_search_post_types' ) ? streamtube_get_search_post_types() : array();

if( count( $post_types ) > 1 && $current_post_type == 'any' ){
    $current_tab = isset( $_GET['tab'] ) ? sanitize_text_field( $_GET['tab'] ) : '';

    if( ! $current_tab || ! array_key_exists( $current_tab, $post_types ) ){
        $current_tab = array_keys( $post_types )[1];
    }
}

$template = streamtube_get_search_template_settings();

extract( $template );

?>
<?php get_header();?>

    <div class="page-header bg-white px-2 border-bottom pt-4 mb-3">
        <div class="<?php echo esc_attr( join( ' ', streamtube_get_container_classes( $content_width ) ) ); ?>">
            <div class="d-flex align-items-center justify-content-between mb-4">
                <h1 class="page-title h5"><?php printf( esc_html__( 'Search result for "%s"', 'streamtube' ), get_search_query() ); ?></h1>

                <div class="ms-auto">
                    <?php get_template_part( 'template-parts/sortby' ); ?>
                </div>
            </div>

            <?php streamtube_core_load_template( 
                'page/search-tabs.php', 
                true, 
                compact( 'current_tab', 'current_post_type', 'post_types' )
                );
            ?>
        </div>
    </div>

    <div class="page-main py-3">

        <div class="<?php echo esc_attr( join( ' ', streamtube_get_container_classes( $content_width ) ) ); ?>">

            <?php

            if( $current_post_type != 'any' ){
                $GLOBALS['wp_query']->query_vars = array_merge( $GLOBALS['wp_query']->query_vars, array(
                    'post_type' => $current_post_type
                ) );
            }

            if( $current_tab ){
                $GLOBALS['wp_query']->query_vars = array_merge( $GLOBALS['wp_query']->query_vars, array(
                    'post_type' => $current_tab
                ) );
            }

            if( isset( $_GET['search_filter'] ) && $_GET['search_filter'] == 'taxonomy' ){
                $taxonomy = isset( $_GET['taxonomy'] ) ? sanitize_text_field( $_GET['taxonomy'] ) : get_option( 'search_taxonomy', 'categories' );

                if( taxonomy_exists( $taxonomy ) ){
                    $term_slug = isset( $_GET['term_slug'] ) ? sanitize_text_field( $_GET['term_slug'] )  : false; 
                }
            }

            $query_args = array_merge( $GLOBALS['wp_query']->query_vars, array(
                'margin_bottom'         =>  4,
                'show_post_date'        =>  $post_date,
                'show_post_comment'     =>  true,
                'show_author_name'      =>  true,
                'hide_empty_thumbnail'  =>  true,                
                'hide_empty_thumbnail'  =>  $hide_empty_thumbnail,
                'thumbnail_size'        =>  'streamtube-image-medium',
                'posts_per_page'        =>  (int)$posts_per_column * (int)$rows_per_page,
                'paged'                 =>  get_query_var( 'page' ),
                'layout'                =>  $layout,
                'col_xxl'               =>  (int)$posts_per_column,
                'col_xl'                =>  (int)$col_xl,
                'col_lg'                =>  (int)$col_lg,
                'col_md'                =>  (int)$col_md,
                'col_sm'                =>  (int)$col_sm,
                'col'                   =>  (int)$col,
                'author_avatar'         =>  $author_avatar,
                'avatar_size'           =>  $layout != 'grid' ? 'sm' : 'md',
                'post_excerpt_length'   =>  $post_excerpt_length,
                'pagination'            =>  $pagination,
                'not_found_text'        =>  $not_found_text
            ) );

            if( $term_slug ){
                $query_args['tax_query'] = array(
                    'relation'      =>  'AND',
                    array(
                        'taxonomy'  =>  $taxonomy,
                        'field'     =>  'slug',
                        'terms'     =>  $term_slug
                    )
                );
            }

            /**
             *
             * Filter the query_args
             * 
             * @param  array $query_args
             *
             * @since  1.0.0
             * 
             */
            $query_args = apply_filters( 'streamtube/archive/video/query_args', $query_args );

            switch ( $query_args['post_type'] ) {

                case 'product':
                    the_widget( 'Streamtube_Core_Widget_Posts', array_merge( $query_args, array(
                        'thumbnail_ratio'   =>  'default',
                        'margin_bottom'     =>  5
                    ) ), array() );
                break;

                case 'topic':
                case 'reply':
                    if( function_exists( 'bbp_get_template_part' ) ){
                        ?>
                        <div class="container bbp-search-container p-0">
                            <?php bbp_get_template_part( 'content', 'search' );?>
                        </div>
                        <?php
                    }
                    else{
                        the_widget( 'Streamtube_Core_Widget_Posts', $query_args, array() );
                    }
                break;

                case 'user':
                    echo streamtube_core()->get()->shortcode->_user_grid( array(
                        'search'        =>  get_search_query(),
                        'search_form'   =>  false,
                        'col_xxl'       =>  (int)$posts_per_column,
                        'col_xl'        =>  (int)$col_xl,
                        'col_lg'        =>  (int)$col_lg,
                        'col_md'        =>  (int)$col_md,
                        'col_sm'        =>  (int)$col_sm,
                        'col'           =>  (int)$col                        
                    ) );
                break;
                
                default:
                   the_widget( 'Streamtube_Core_Widget_Posts', $query_args, array() );
                break;
            }

            
            ?>

    	</div>
    </div>

<?php get_footer();?>
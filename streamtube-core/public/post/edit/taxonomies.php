<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$post_id = 0;

$postdata = $args['post'];

$args = $args['args'];

if( $postdata  ){

	$args['post_type'] = $postdata->post_type;

	$post_id = $postdata->ID;
}

$taxes_not_included = array( 'video_tag', 'post_tag', 'post_format', 'report_category' );

/**
 *
 * 
 * @var array
 *
 * @since 1.3
 * 
 */
$taxes_not_included = apply_filters( 'streamtube/core/post/edit/taxes_not_included', $taxes_not_included, $post_id );

if( is_post_type_viewable( $args['post_type'] )):

	$taxonomies = get_object_taxonomies( $args['post_type'], 'object' );

	if( $taxonomies ):

		for ( $i=0; $i < count( $taxes_not_included ); $i++) { 
			if( array_key_exists( $taxes_not_included[$i] , $taxonomies ) ){
				unset( $taxonomies[ $taxes_not_included[$i]] );
			}
		}

		foreach ( $taxonomies as $tax => $object ):

			if( get_option( $args['post_type'] . '_taxonomy_' . $tax, 'on' ) ):

				printf(
					'<div class="widget widget-taxonomy widget-%1$s tax-%1$s shadow-sm rounded bg-white border" id="widget-%1$s">',
					esc_attr( $tax )
				);
				?>
					<div class="widget-title-wrap m-0 p-3 bg-light">
					    <h2 class="widget-title no-after m-0">
					    	<?php

					    	$title = $object->label;

					    	if( $tax == 'categories' ){
					    		$title = esc_html__( 'Categories', 'streamtube-core' );
					    	}

					    	/**
					    	 *
					    	 * Filter the widget title
					    	 * 
					    	 * @since 1.3
					    	 */
					    	$title = apply_filters( 'streamtube/core/post/edit/tax/title', $title, $object, $tax, $post_id );

					    	echo $title;
					    	?>
					    </h2>
					</div>	

					<div class="widget-content p-3">

						<?php 
						/**
						 * Fires before content
						 *
						 * @since 2.0
						 */
						do_action( 'streamtube/core/post/edit/tax/before', $object, $tax, $post_id );
						?>

						<?php
						/**
						 *
						 * Filter $hierarchical
						 *
						 * @param boolean $object->hierarchical
						 * @param object taxonomy $object
						 * @param string $tax
						 * 
						 * @since 1.3
						 */
						$hierarchical = apply_filters( 'streamtube/core/post/edit/tax/hierarchical', $object->hierarchical, $object, $tax, $post_id );

						$max_items = (int)get_option( $args['post_type'] . '_taxonomy_' . $tax . '_max_items', 0 );

						/**
						 *
						 * Filter max items can be checked of the taxonomy
						 * 
						 * @param int $max_items
						 * @param object taxonomy $object
						 * @param string $tax
						 *
						 * @since 2.0
						 * 
						 */
						$max_items = apply_filters( 'streamtube/core/post/edit/tax/max_items', $max_items, $object, $tax, $post_id );

						if( $hierarchical ):
						?>
							<ul class="list-unstyled checklist-advanded checkboxes p-0" data-max-items="<?php echo esc_attr( $max_items ); ?>">
								<?php
								if( ! function_exists( 'wp_terms_checklist' ) ){
									include ABSPATH . 'wp-admin/includes/template.php';
								}

								$checklist_args = array(
									'taxonomy'		=>	$tax,
									'checked_ontop'	=>	false
								);

								/**
								 *
								 * Filter the checklist args
								 * 
								 * @param string $tax
								 * @param object taxonomy $object
								 * 
								 * @since 1.3
								 * 
								 */
								$checklist_args = apply_filters( 'streamtube/core/post/edit/tax/checklist_args', $checklist_args, $object, $tax , $post_id );

								wp_terms_checklist( $post_id, $checklist_args );
								?>
							</ul>
						<?php else:?>
							<?php
	                        $tag_terms = get_the_terms( $post_id, $tax );

	                        streamtube_core_the_field_control( array(
	                    		'label'			=>	esc_html__( $object->label, 'streamtube-core' ),
	                    		'name'			=>	sprintf( 'tax_input[%s][]', $tax ),
	                    		'value'			=>	is_array( $tag_terms ) ? join(',', wp_list_pluck( $tag_terms, 'name' ) ) : '',
	                            'data'          =>  array(
	                                'data-role' =>  'tagsinput',
	                                'data-max-tags' =>  get_option( $args['post_type'] . '_taxonomy_' . $tax . '_max_items', 0 )
	                            ),
	                    		'wrap_class'	=>	'taginput-wrap'
	                    	) );
							?>
						<?php endif;?>

						<?php 
						/**
						 * Fires after content
						 *
						 * @since 2.0
						 */
						do_action( 'streamtube/core/post/edit/tax/after', $object, $tax, $post_id );
						?>

					</div>		

				</div>
				<?php

			endif;

		endforeach;

	endif;

endif;
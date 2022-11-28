<?php

global $post;

$importer = streamtube_core()->get()->yt_importer;

$settings = $importer->admin->get_settings( $post->ID );
?>
<table class="form-table">
	
	<tbody>

		<tr>
			<th scope="row">
				<label for="post_status">
					<?php esc_html_e( 'Post Status', 'streamtube-core' );?>
				</label>
			</th>

			<td>
				<select name="yt_importer[post_status]" id="post_status" class="regular-text">

					<?php foreach ( $importer->options->get_post_statuses() as $key => $value ) {
						printf(
							'<option %s value="%s">%s</option>',
							selected( $key, $settings['post_status'], false ),
							esc_attr( $key ),
							esc_html( $value )
						);
					}?>

				</select>
			</td>			
		</tr>

		<tr>
			<th scope="row">
				<label for="post_author">
					<?php esc_html_e( 'Post Author', 'streamtube-core' );?>
				</label>
			</th>

			<td>
				<?php wp_dropdown_users( array(
					'role__not_in'	=>	array(
						'subscriber'
					),
					'class'			=>	'regular-text',
					'name'			=>	'yt_importer[post_author]',
					'selected'		=>	$settings['post_author']
				) );?>
			</td>			
		</tr>

		<tr>
			<th scope="row">
				<label for="post_tags">
					<?php esc_html_e( 'Import Tags', 'streamtube-core' );?>
				</label>
			</th>

			<td>
				<?php printf(
					'<input type="checkbox" name="yt_importer[post_tags]" %s>',
					checked( $settings['post_tags'], 'on', false )
				);?>
			</td>			
		</tr>		

	</tbody>

</table>
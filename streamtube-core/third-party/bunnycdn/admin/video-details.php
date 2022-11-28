<?php

global $post;

$bunnycdn = streamtube_core()->get()->bunnycdn;
?>
<table class="form-table">
	
	<tbody>
		<tr>
			<th scope="row">
				<?php printf(
					'<label for="status">%s</label>',
					esc_html__( 'Status', 'streamtube-core' )
				);?>
			</th>
			<td>
				<select name="bunnycdn[_bunnycdn_status]" id="status" class="regular-text">
						
					<?php foreach ( $bunnycdn->get_webhook_video_statuses() as $key => $value ): ?>
						
						<?php printf(
							'<option %s value="%s">%s</option>',
							selected( $bunnycdn->get_video_process_status( $post->ID ), $key, false ),
							esc_attr( $key ),
							esc_html( $value[1] )
						);?>

					<?php endforeach ?>

				</select>				
			</td>
		</tr>		
		<?php foreach ( $args['bunny_video_content'] as $key => $value ): ?>

			<?php if( ! empty( $value ) ): ?>
			<tr>
				<th scope="row">
					<?php printf(
						'<label for="%s">%s</label>',
						sanitize_key( $key ),
						$bunnycdn->admin->get_video_details_field_name( $key )
					);?>
				</th>
				<td>
					<?php printf(
						'<input readonly name="bunny_video_content[%s]" type="text" id="%s" value="%s" class="regular-text">',
						$key,
						sanitize_key( $key ),
						esc_attr( $bunnycdn->admin->get_format_video_details_field_value( $key, $value ) )
					);?>
				</td>
			</tr>
			<?php endif; ?>
		<?php endforeach ?>

	</tbody>

</table>

<?php
wp_nonce_field( 'bunnycdn_nonce', 'bunnycdn_nonce' );

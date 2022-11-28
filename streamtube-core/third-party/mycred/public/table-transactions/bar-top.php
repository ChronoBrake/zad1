<div class="tablenav top mb-4">

	<div class="d-block d-md-flex align-items-start">

		<?php if( current_user_can( 'administrator' ) ){
			ob_start();
			$logs->filter_options();

			$filter = ob_get_clean();

			$filter = str_replace( 'alignleft actions', 'mycred-filter actions d-block d-md-flex gap-2', $filter );
			$filter = str_replace( 'button-secondary', 'button-secondary btn-secondary', $filter );

			echo $filter;
		}?>

		<div class="ms-auto">
			<?php include( 'pagination.php' ) ?>
		</div>

	</div>

</div>
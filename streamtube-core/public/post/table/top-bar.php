<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$post_statuses = array_merge( array(
    'any'       =>  esc_html__( 'All', 'streamtube-core' ),
    'reject'    =>  esc_html__( 'Rejected', 'streamtube-core' )
), get_post_statuses() );

if( current_user_can( 'edit_others_posts' ) ){
    $post_statuses['trash'] = esc_html__( 'Trash', 'streamtube-core' );
}
?>
<div class="d-md-flex align-items-center">

	<?php streamtube_core_load_template( 'post/table/badge-filters.php', true, $post_statuses );?>

	<div class="search-form-wrap ms-auto">
		<?php streamtube_core_load_template( 'post/table/search-form.php', true, $post_statuses );?>
	</div>	
</div>
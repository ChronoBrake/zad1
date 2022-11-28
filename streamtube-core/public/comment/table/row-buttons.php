<?php
$comment = $args;

$params = json_encode( array(
	'comment_id'		=>	$comment->comment_ID
) );
?>
<div class="row-buttons invisible d-lg-flex gap-1 mt-auto">

	<?php printf(
		'<button type="button" class="btn btn-sm shadow-none outline-none fw-bold btn-edit-comment text-danger" data-params="%s" data-bs-toggle="modal" data-bs-target="#modal-edit-comment">%s</button>',
		esc_attr( $params ),
		esc_html__( 'Edit', 'streamtube-core' )
	);?>

	<?php printf(
		'<button type="button" class="btn btn-sm shadow-none outline-none fw-bold ajax-elm %s" data-action="moderate_comment" data-params="%s" data-method="POST">%s</button>',
		$comment->comment_approved == 0 ? 'text-success' : 'text-warning',
		esc_attr( $params ),
		$comment->comment_approved == 0 ? esc_html__( 'Approve', 'streamtube-core' ) : esc_html__( 'Unapprove', 'streamtube-core' )
	);?>

	<?php printf(
		'<button type="button" class="btn btn-sm shadow-none outline-none fw-bold ajax-elm text-danger" data-action="spam_comment" data-params="%s" data-method="POST">%s</button>',
		esc_attr( $params ),
		esc_html__( 'Spam', 'streamtube-core' )
	);?>

	<?php printf(
		'<button type="button" class="btn btn-sm shadow-none outline-none fw-bold ajax-elm text-danger" data-action="trash_comment" data-params="%s" data-method="POST">%s</button>',
		esc_attr( $params ),
		esc_html__( 'Trash', 'streamtube-core' )
	);?>

</div>
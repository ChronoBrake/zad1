<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

$args = array(
	'post_id'	=>	streamtube_core()->get()->post->get_edit_post_id()
);

streamtube_core_load_template( 'comment/table-comments.php', true, $args );
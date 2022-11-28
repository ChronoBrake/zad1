<?php
if( ! defined('ABSPATH' ) ){
    exit;
}
/**
 *
 * @param $args{
 *        object $postdata WP_Post
 *        array $args
 * }
*
* @since  1.0.0
* 
*/
do_action( 'streamtube/core/post/edit/metaboxes', $args );
<?php
if( ! defined('ABSPATH' ) ){
    exit;
}

/**
 *
 * Get orderby options
 * 
 * @return array
 *
 * @since 1.0.8
 * 
 */
function streamtube_core_get_orderby_options(){
	$orderby = array(
        'none'              =>  esc_html__( 'None', 'streamtube-core' ),
        'ID'                =>  esc_html__( 'Order by post id.', 'streamtube-core' ),
        'author'            =>  esc_html__( 'Order by author', 'streamtube-core' ),
        'title'             =>  esc_html__( 'Order by post title', 'streamtube-core' ),
        'name'              =>  esc_html__( 'Order by post slug', 'streamtube-core' ),
        'date'              =>  esc_html__( 'Order by date (default)', 'streamtube-core' ),
        'modified'          =>  esc_html__( 'Order by last modified date.', 'streamtube-core' ),
        'rand'              =>  esc_html__( 'Random order', 'streamtube-core' ),
        'comment_count'     =>  esc_html__( 'Order by number of comments', 'streamtube-core' ),
        'relevance'         =>  esc_html__( 'Relevance', 'streamtube-core' )
    );

	if( streamtube_core()->get()->googlesitekit->analytics->is_connected() ){
		$orderby['post_view']	= esc_html__( 'Order by number of views', 'streamtube-core' );
	}    

    return apply_filters( 'streamtube_core_get_orderby_options', $orderby );
}

/**
 *
 * Get post view types
 * 
 * @return array
 *
 * @since 1.0.8
 * 
 */
function streamtube_core_get_post_view_types(){
	$types = array(
		'pageviews'			=>	esc_html__( 'Page Views', 'streamtube-core' ),
		'videoviews'		=>	esc_html__( 'Video Views', 'streamtube-core' )
	);

	return $types;
}


/**
 *
 * Get default date ranges
 * 
 * @return array $date_ranges
 *
 * @since  1.0.0
 * 
 */
function streamtube_core_get_default_date_ranges(){
	$date_ranges = array(
		'today'			=>	esc_html__( 'Today', 'streamtube-core' ),
		'yesterday'		=>	esc_html__( 'Yesterday', 'streamtube-core' ),
		'7daysAgo'		=>	esc_html__( 'Last 7 days', 'streamtube-core' ),
		'15daysAgo'		=>	esc_html__( 'Last 15 days', 'streamtube-core' ),
		'28daysAgo'		=>	esc_html__( 'Last 28 days', 'streamtube-core' ),
		'90daysAgo'		=>	esc_html__( 'Last 90 days', 'streamtube-core' ),
		'180daysAgo'	=>	esc_html__( 'Last 180 days', 'streamtube-core' ),
		'all'			=>	esc_html__( 'All the time', 'streamtube-core' )
	);

	/**
	 *
	 * Filter default date ranges
	 *
	 * @param  array $date_ranges
	 *
	 * @since  1.0.0
	 * 
	 */
	return apply_filters( 'streamtube_core_get_default_date_ranges', $date_ranges );
}

/**
 *
 * Get linechart options
 * 
 * @return array
 *
 * @since 1.0.8
 * 
 */
function streamtube_core_get_linechart_options(){

	$theme_mode = function_exists( 'streamtube_get_theme_mode' ) ? streamtube_get_theme_mode() : 'light';

	$options = array(
		'legend'	=>	array(
			'position'	=>	'top',
			'textStyle'	=>	array(
				'color'	=>	'#aaa'
			)
		),
		'chartArea'	=>	array(
			'width'		=>	'95%',
			'height'	=>	'600px'
		),
		'hAxis'		=>	array(
			'format'	=>	'dd/MM/YY',
			'titleTextStyle'	=>	array(
				'color'	=>	'#aaa'
			),
			'textStyle'	=>	array(
				'color'	=>	'#aaa',
				'fontSize'	=>	15
			),
			'gridlines'	=>	array(
				'color'	=>	'transparent'
			)
		),
		'vAxis'	=>	array(
			'minValue'	=>	0,
			'textStyle'	=>	array(
				'color'	=>	'#aaa',
				'fontSize'	=>	15			
			),
			'gridlines'	=>	array(
				'color'	=>	$theme_mode == 'light' ? '#e9ecef' : '#333',
				'count'	=>	3
			)
		),
		//'curveType'			=>	'function',
		'focusTarget'		=>	'category',
		'crosshair'			=>	array(
			'orientation'	=>	'vertical',
			'trigger'		=>	'focus'
		),
		'tooltip'			=>	array(
			'isHtml'	=>	true,
			'trigger'	=>	'focus'
		),
		'series'		=>	array(
			array(
				'color'	=>	'#4285f4'
			),
			array(
				'color'	=>	'#4285f4',
				'lineDashStyle'	=>	array( 2,2 ),
				'lineWidth'	=>	1
			)
		),
		'backgroundColor'	=>	'transparent'
	);

	/**
	 *
	 * Filter the chart options
	 *
	 * @param array $chart_options
	 * 
	 * @since 1.0.8
	 */
	return apply_filters( 'streamtube_core_get_linechart_options', $options );
}
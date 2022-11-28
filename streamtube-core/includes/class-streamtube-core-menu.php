<?php
/**
 * Menu
 *
 * @link       https://themeforest.net/user/phpface
 * @since      1.0.0
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 */

/**
 * Register all actions and filters for the plugin.
 *
 * Maintain a list of all hooks that are registered throughout
 * the plugin, and register them with the WordPress API. Call the
 * run function to execute the list of actions and filters.
 *
 * @package    Streamtube_Core
 * @subpackage Streamtube_Core/includes
 * @author     phpface <nttoanbrvt@gmail.com>
 */

if( ! defined('ABSPATH' ) ){
    exit;
}

class Streamtube_Core_Menu{

	protected $user_id 		=	0;

	protected $base_url		=	'';

	protected $current 		=	'';

	protected $menu_items 	=	array();

	protected $menu_classes	=	array( 'nav' );

	protected $item_classes	=	array( 'nav-link' );

	protected $icon 		=	false;

	public function __construct( $args = array() ){
		$args = wp_parse_args( $args, array(
			'user_id'		=>	0,
			'base_url'		=>	'',
			'current'		=>	'',
			'menu_items'	=>	array(),
			'menu_classes'	=>	array(),
			'item_classes'	=>	array(),
			'icon'			=>	false
		) );

		$this->user_id 		= $args['user_id'];

		$this->base_url 	= $args['base_url'];

		$this->current 		= $args['current'];

		$this->menu_items 	= $args['menu_items'];

		if( is_string( $args['menu_classes'] ) ){
			$args['menu_classes'] = explode( " " , $args['menu_classes'] );
		}

		$this->menu_classes = array_merge( $args['menu_classes'], $this->menu_classes );

		if( is_string( $args['item_classes'] ) ){
			$args['item_classes'] = explode( " " , $args['item_classes'] );
		}

		$this->item_classes = array_merge( $args['item_classes'], $this->item_classes );

		$this->icon 		= $args['icon'];
	}

	protected function uasort( &$items ){
		uasort( $items, function( $item1, $item2 ){
			return $item1['priority'] <=> $item2['priority'];
		} );
	}

	protected function get_url( $endpoint = '', $parent = '' ){

		$url = $this->base_url;

		if( ! $endpoint ){
			return $url;
		}

		if( ! get_option( 'permalink_structure' ) ){
			if( ! $parent ){
				$url = add_query_arg( array(
					$endpoint 	=>	1
				), $url );
			}
			else{
				$url = add_query_arg( array(
					$parent 	=>	$endpoint
				), $url );				
			}
		}
		else{

			$path = $endpoint;

			if( $parent ){
				$path = $parent . '/' . $endpoint;	
			}

			$url = trailingslashit( $url ) . $path;
		}

		return $url;
	}

	public function the_menu(){

		$this->uasort( $this->menu_items );

		?>
		<ul class="<?php echo esc_attr( join( ' ', $this->menu_classes ) );?>">

			<?php foreach( $this->menu_items as $menu_id => $menu ):?>

				<?php

				$menu_li = '';

				$menu = wp_parse_args( $menu, array(
					'url'		=>	'',
					'desc'		=>	'',
					'badge'		=>	'',
					'parent'	=>	'',
					'cap'		=>	'read',
					'private'	=>	false
				) );

				$tooltip = $menu['desc'] ? $menu['desc'] : $menu['title'];

				if( $menu['cap'] && user_can( $this->user_id, $menu['cap'] ) ):

					if( ! $menu['private'] || ( $menu['private'] && get_current_user_id() == $this->user_id ) ){

						$menu_li = sprintf(
							'<li class="nav-item nav-%s">',
							sanitize_html_class( $menu_id )
						);

							$menu_li .= sprintf(
								'<a class="%s %s" aria-current="page" href="%s">',
								esc_attr( join( ' ', $this->item_classes ) ),
								$this->current == $menu_id ? 'active' : '',
								$menu['url'] ? esc_url( $menu['url'] ) : esc_url( $this->get_url( $menu_id, $menu['parent'] ) )
							);

							if( $this->icon && array_key_exists( 'icon' , $menu ) ){
								$menu_li .= sprintf(
									'<span data-bs-toggle="tooltip" data-bs-placement="%s" data-bs-title="%s" class="menu-icon %s me-3"></span>',
									! is_rtl() ? 'right' : 'left',
									esc_attr( wp_strip_all_tags( $tooltip, true ) ),
									sanitize_html_class( $menu['icon'] )
								);
							}

							$menu_li .= sprintf(
								' <span class="menu-text">%s %s</span>',
								$menu['title'],
								$menu['badge']
							);

							$menu_li .= '</a>';

						$menu_li .= '</li>';
					}

				echo $menu_li;

				endif;
				?>

			<?php endforeach;?>
		</ul>
		<?php

	}
}
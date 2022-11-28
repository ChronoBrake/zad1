const Plugin = videojs.getPlugin('plugin');

/**
 *
 * Get played time percentage
 * 
 * @param  float currentTime
 * @param  float totalTime
 * @return float
 */
function getPlayedTimePercentage( currentTime = 0, totalTime = 0 ){

	if( totalTime == 0 || isNaN( totalTime ) ){
		return 0;
	}

	var percentage = currentTime*100/totalTime;

	return Math.floor( percentage, 2 );
}

/**
 *
 * Open popup
 * @since 1.0.0
 */
function openPopup( button, width, height ){

	var shareUrl  	= '';
	var url 		= button.getAttribute( 'data-url' );
	var socialId 	= button.getAttribute( 'data-social-id' );

	switch( socialId ) {
		case 'facebook':
			shareUrl = 'https://www.facebook.com/sharer/sharer.php?u=' + url;
		break;
		case 'pinterest':
			shareUrl = 'https://pinterest.com/pin/create/button/?url=' + url;
		break;
		case 'twitter':
			shareUrl = 'https://twitter.com/intent/tweet?url=' + url;
		break;
		case 'linkedin':
			shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + url;
		break;
	}

	var left = (screen.width/2)-(width/2);
	var top = (screen.height/2)-(height/2);
	window.open( shareUrl ,"popUpWindow","height="+height+",width="+width+",left="+left+",top="+top+",resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes");

}

function openUrl( button, target = "_blank" ){
	var url = button.getAttribute( 'data-href' );
	window.open( url, target );
}



/**
 *
 * @since 1.0.0
 *
 */
function toggleClass(e){
	if( ! e.classList.contains( 'active' ) ){
		e.classList.add( 'active' );
	}
	else{
		e.classList.remove( 'active' );
	}
}

/**
 *
 * Logo button Components
 *
 * @since 1.0.0
 *
 */
var componentButton = videojs.getComponent('Button');

var controlBarLogo = videojs.extend( componentButton, {
	constructor: function( player, options ) {

		var defaults	=	{
			id 			:	'',
			logo		:	'',
			href		:	'#',
		}

		options = videojs.mergeOptions( defaults, options );

		componentButton.call( this, player, options );

		if ( options.logo ) {
        this.update( options );
      }
	},
	createEl: function() {
	    return videojs.dom.createEl( 'button', {
			 className: 'vjs-control vjs-logo-button'
		 });
	},
	update: function( options ){

		var img = document.createElement( 'img' );

		if( options.logo ){
			img.src = options.logo;	
		}

		if( options.alt ){
			img.alt = options.alt;
		}

		if( options.href ){
			img.setAttribute( 'data-href',options.href );
			if( options.href != '#' ){
				img.addEventListener("click", function () {
					window.open( options.href, '_blank' );
				});
			}
		}

		this.el().appendChild( img );
	},
});
videojs.registerComponent( 'controlBarLogo', controlBarLogo );


/**
*
* topBar plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class topBar extends Plugin {
	constructor( player, options ) {
		super(player, options);

		let bar = document.createElement('div');
		bar.className = 'streamtube-plugin streamtube-topbar';

		player.addClass( 'vjs-has-topbar' );
		player.el().appendChild( bar );
	}	
}
videojs.registerPlugin( 'topBar', topBar );

/**
*
* builtinEvents plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class builtinEvents extends Plugin {

	constructor( player, options ) {

		super(player, options);

		var defaults	=	{
			post_id : 0
		}

		options = videojs.mergeOptions( defaults, options );

		player.on( 'play', function(){
			let event = new CustomEvent('player_play', { detail: options });
			document.body.dispatchEvent( event );
		});

		player.on( 'progress', function(){
			let event = new CustomEvent('player_progress', { detail: options });
			document.body.dispatchEvent( event );
		});

		player.on( 'ended', function(){

			if( ! player.hasClass( 'vjs-ad-loading' ) && ! player.addClass( 'vjs-share-active' ) ){
				/**
				 * Show the share box
				 */
				var shareBox = player.el().querySelector( '.streamtube-share' );

				toggleClass( shareBox );

				player.addClass( 'vjs-share-active' );

				window.parent.postMessage( 'PLAYLIST_UPNEXT' );
			}			

			let event = new CustomEvent('player_ended', { detail: player });
			document.body.dispatchEvent( event );			
		});
	}
}
videojs.registerPlugin('builtinEvents', builtinEvents );

/**
*
* playerLogo plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class playerLogo extends Plugin {

	constructor(player, options) {
		super(player, options);

		var defaults	=	{
			id 			:	'',
			logo		:	'',
			href		:	'#',
			position	:	'top-right',
			alt			:	''
		}

		options = videojs.mergeOptions( defaults, options );

		player.addClass( 'has-watermark' );

		if( options.logo ){
			var elm, img;
			elm = document.createElement('div');
			elm.id = options.id;
			elm.className = 'streamtube-plugin streamtube-watermark ' + options.position;

			img = document.createElement( 'img' );
			img.src = options.logo;

			if( options.alt ){
				img.alt = options.alt;
			}

			if( options.href != '#' ){
				img.addEventListener( 'click' , function () {
					window.open( options.href, '_blank' );
				});					
			}

			elm.appendChild( img );

			player.el().appendChild( elm );
		}
	}
}
videojs.registerPlugin('playerLogo', playerLogo );

/**
*
* playerLogo plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class playerShareBox extends Plugin {

	constructor(player, options) {
		super(player, options);

		var defaults	=	{
			name 			: '',
			id 				: '',
			url				: '',
			embed_url		: '',
			embed_width		: 560,
			embed_height	: 315,
			popup_width		: 700,
			popup_height	: 500,
			label_url		: '',
			label_iframe	: '',
			is_embed 		: false
		}

		options = videojs.mergeOptions( defaults, options );

		player.addClass( 'has-share-box' );

		var html = '';

		var el 			= document.createElement('div');
		el.className 	= 'streamtube-plugin streamtube-share';
		el.id 			= options.id;

		html	+=	'<div class="streamtube-share-container"><form>';
		html	+=		'<div class="share-topbar">';
		html 	+=			'<button onclick="javascript:toggleClass('+options.id+')" type="button" class="share-open">';
		html 	+=				'<span class="vjs-icon-share"></span>';
		html 	+=			'</button>';

		if( options.is_embed ){
			html +=			'<h3 data-href="'+options.url+'" onclick="javascript:openUrl( this )" class="post-title">'+ options.name +'</h3>';	
		}

		html	+=		'</div>';
		html 	+=		'<div class="share-body">';

		html 	+=		'<div class="share-socials">';
		html 	+=			'<button class="btn-facebook" type="button" data-social-id="facebook" data-url="'+options.url+'" onclick="javascript:openPopup( this, '+options.popup_width+', '+options.popup_height+' );">';
		html 	+=				'<span class="vjs-icon-facebook"></span>';
		html 	+=			'</button>';

		html 	+=			'<button class="btn-pinterest" type="button" data-social-id="pinterest" data-url="'+options.url+'" onclick="javascript:openPopup( this, '+options.popup_width+', '+options.popup_height+' );">';
		html 	+=				'<span class="vjs-icon-pinterest"></span>';
		html 	+=			'</button>';

		html 	+=			'<button class="btn-twitter" type="button" data-social-id="twitter" data-url="'+options.url+'" onclick="javascript:openPopup( this, '+options.popup_width+', '+options.popup_height+' );">';
		html 	+=				'<span class="vjs-icon-twitter"></span>';
		html 	+=			'</button>';

		html 	+=			'<button class="btn-linkedin" type="button" data-social-id="linkedin" data-url="'+options.url+'" onclick="javascript:openPopup( this, '+options.popup_width+', '+options.popup_height+' );">';
		html 	+=				'<span class="vjs-icon-linkedin"></span>';
		html 	+=			'</button>';

		html 	+=		'</div>';

		if( options.url ){
			html	+=			'<p class="share-url">';
			html	+=				'<label>'+options.label_url+'</label>';
			html	+=				'<input name="url" onclick="javascript:this.select()" class="form-control" value="'+options.url+'">';
			html	+=			'</p>';
		}
		if( options.embed_url ){
			html	+=			'<p class="share-iframe">';
			html	+=				'<label>'+options.label_iframe+'</label>';
			html	+=				'<textarea name="iframe" onclick="javascript:this.select()" class="form-control">';
			html 	+=					'<iframe src="'+options.embed_url+'" width="'+ options.embed_width +'" height="'+ options.embed_height +'" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"></iframe>'
			html 	+=				'</textarea>';
			html	+=			'</p>';
		}
		html 	+=		'</div>';
		html	+=	'</form></div>';

		el.innerHTML = html;

		player.el().appendChild( el );

	}
}
videojs.registerPlugin( 'playerShareBox', playerShareBox );

/**
*
* playerTracker plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class playerTracker extends Plugin {

	constructor(player, options) {

		super(player, options);

		var defaults	=	{
			url : '',
			title: ''
		}

		options = videojs.mergeOptions( defaults, options );

		player.addClass( 'has-tracker' );

		window.dataLayer = window.dataLayer || [];

		player.on( 'play', function(){
			dataLayer.push({
				'event' : 'gtm.video',
				'gtm.videoStatus' : 'play',
				'gtm.videoUrl' : options.url,
				'gtm.videoTitle' : options.title,
				'gtm.videoPercent' : getPlayedTimePercentage( player.currentTime(), player.duration() ),
				'gtm.videoCurrentTime' : player.currentTime(),
				'gtm.videoDuration' : player.duration(),
				'gtm.videoProvider' : 'self_hosted'
			});
		});

		player.on( 'progress', function(){
			dataLayer.push({
				'event' : 'gtm.video',
				'gtm.videoStatus' : 'progress',
				'gtm.videoUrl' : options.url,
				'gtm.videoTitle' : options.title,
				'gtm.videoPercent' : getPlayedTimePercentage( player.currentTime(), player.duration() ),
				'gtm.videoCurrentTime' : player.currentTime(),
				'gtm.videoDuration' : player.duration(),
				'gtm.videoProvider' : 'self_hosted'
			});
		});		

		player.on( 'ended', function(){
			dataLayer.push({
				'event' : 'gtm.video',
				'gtm.videoStatus' : 'ended',
				'gtm.videoUrl' : options.url,
				'gtm.videoTitle' : options.title,
				'gtm.videoPercent' : getPlayedTimePercentage( player.currentTime(), player.duration() ),
				'gtm.videoCurrentTime' : player.currentTime(),
				'gtm.videoDuration' : player.duration(),
				'gtm.videoProvider' : 'self_hosted'
			});
		});		
	}
}
videojs.registerPlugin('playerTracker', playerTracker );

/**
*
* playerTracker plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class playerhlsQualitySelector extends Plugin {

	constructor( player, options ) {

		super(player, options);

		var defaults	=	{
			displayCurrentQuality : true
		}

		options = videojs.mergeOptions( defaults, options );

		player.addClass( 'has-hlsQualitySelector' );

		player.hlsQualitySelector(options);	
		
	}
}
videojs.registerPlugin('playerhlsQualitySelector', playerhlsQualitySelector );

/**
*
* playerCollectionContent plugin
*
* @extends Plugin
*
* @since 1.0.0
*
*/
class playerCollectionContent extends Plugin {

	constructor( player, options ) {

		super( player, options );

		var list_items = [];

		var defaults	=	{
			list 			: [],
			list_items 		: [],
			current_post 	: 0,
			index 			: 0,
			total 			: 0,
			user 			: [],
			upnext 			: true
		}

		options = videojs.mergeOptions( defaults, options );

		if( options.list_items.length > 0 ){
			list_items = options.list_items;
		}

		if( list_items ){

			var toggleButton = document.createElement('button');
			toggleButton.classList 	= 'btn btn-toggle-playlist';
			toggleButton.id 		= 'toggle-playlist';
			toggleButton.innerHTML 	= '<span class="vjs-icon-chapters"></span>';

			toggleButton.addEventListener( 'click' , function (e) {
				document.getElementById( 'streamtube-playlist' ).classList.add( 'active' );
				document.getElementById( 'playlist-item__' +  options.current_post ).scrollIntoView({
					behavior 	: 'smooth',
					block 		: 'center',
					inline 		: 'start' 
				});				
			});

			player.el().appendChild( toggleButton );

			var playList 		= document.createElement('div');
			playList.className 	= 'streamtube-plugin streamtube-playlist';
			playList.id 		= 'streamtube-playlist';

			var playListHeader = document.createElement('div');
			playListHeader.className = 'playlist-header';

			var headerContent = '<div class="playlist-header__left">';

				headerContent += '<h2 class="playlist-title post-title">'+ options.name +'</h2>';

				headerContent += '<div class="playlist-meta">';

				if( options.author ){
					headerContent += '<div class="playerlist-author">';
						headerContent += '<a onclick="javascript:openUrl(this)" data-href="'+ options.author.link +'" href="#">'+ options.author.display_name +'</a>';
					headerContent += '</div>';
				}

					headerContent += '<div class="playlist-total">';
						headerContent += '<span class="index">'+ options.index +'</span>';
						headerContent += '<span class="sep">/</span>';
						headerContent += '<span class="total">'+ options.total +'</span>';
					headerContent += '</div>';
				headerContent += '</div>';

			headerContent += '</div>';

			playListHeader.innerHTML = headerContent;

			var closeButton = document.createElement('button');
			closeButton.className = 'btn btn-close shadow-none';
			closeButton.innerHTML = '<span>&#8594;</span>';

			closeButton.addEventListener( 'click' , function (e) {
				document.getElementById( 'streamtube-playlist' ).classList.remove( 'active' );
			});			

			playListHeader.appendChild( closeButton );

			playList.appendChild( playListHeader );

			var playlistBody = document.createElement('div');
			playlistBody.className = 'playlist-items';

			for ( var i = 0; i < list_items.length; i++ ) {

				let item = document.createElement('a');
				item.className 	= 'playlist-item';
				item.id 		= 'playlist-item__' +  list_items[i].id;

				if( options.current_post == list_items[i].id ){
					item.className += ' active';
				}

				item.setAttribute( 'href', list_items[i].permalink );
				item.setAttribute( 'data-href', list_items[i].permalink_embed );

				item.addEventListener( 'click' , function (e) {
					e.preventDefault();
					window.open( item.getAttribute( 'data-href' ), '_self' );
				});

				var _item = '<span class="item-index">';
					if( options.current_post == list_items[i].id ){
						_item += '<span class="vjs-icon-play"></span>';
					}else{
						_item += i+1;	
					}	
				_item += '</span>';

				_item += '<div class="item-body">';

						_item += '<div class="item-thumbnail">';
							_item += '<img src="'+ list_items[i].thumbnail +'">';

							if( list_items[i].length ){
								_item += '<span class="item-length">'+ list_items[i].length +'</span>';
							}

						_item += '</div>';	

					_item += '<div class="item-meta">';
						_item += '<div class="item-title">';
							_item += '<h3>';
								_item += list_items[i].title;
							_item += '</h3>';
						_item += '</div>';

						if( list_items[i].author ){
							_item += '<div class="item-author">';
								_item += '<a data-href="'+ list_items[i].author.link +'" href="#">'+ list_items[i].author.display_name +'</a>';
							_item += '</div>';							
						}

					_item += '</div>';
				_item += '</div>';

				item.innerHTML = _item;

				playlistBody.appendChild( item );
			}

			playList.appendChild( playlistBody );

			player.el().appendChild( playList );
			player.addClass( 'vjs-has-collection' );
		}

		player.on( 'ended', function(){
			if( options.index < list_items.length && options.upnext ){
				window.location.href = list_items[ parseInt( options.index )].permalink_embed;
			}
		} );
	}
}
videojs.registerPlugin('playerCollectionContent', playerCollectionContent );

document.addEventListener("DOMContentLoaded", function(event) {
	try {
		if ( typeof videojs == 'function') {

			var players = document.querySelectorAll('video-js[data-player-id]');

			if( players ){
				for ( var i = 0; i < players.length ; i++) {
					if( players[i] ){
						/**
						 *
						 * Load player
						 * 
						 * @since 1.0.0
						 */
						var player = videojs( players[i] );

						var setup = JSON.parse( player.getAttribute( 'data-setup' ) );

						if( setup.advertising ){
							var Ad = setup.advertising;
							player.ima(Ad);
						}

						player.ready(function() {

							this.addClass( 'video-js' );

							var components = setup.components;

							if( components && components.controlBarLogo !== undefined  ){
								this.getChild( 'controlBar' ).addChild( 'controlBarLogo', setup.components.controlBarLogo );
							}
						});

						var plugins = setup.jplugins;

						player.topBar();

						if( plugins.builtinEvents ){
							player.builtinEvents(plugins.builtinEvents);
						}						

						if( plugins.playerLogo ){
							player.playerLogo( plugins.playerLogo );	
						}

						if( plugins.playerShareBox ){
							player.playerShareBox( plugins.playerShareBox );	
						}

						if( plugins.playerTracker ){
							player.playerTracker( plugins.playerTracker );
						}
						
						if( plugins.playerhlsQualitySelector ){
							player.playerhlsQualitySelector( plugins.playerhlsQualitySelector );
						}

						if( plugins.hotkeys ){
							player.hotkeys(plugins.hotkeys);
						}

						if( plugins.playerCollectionContent ){
							player.playerCollectionContent(plugins.playerCollectionContent);
						}						

						if( plugins.landscapeFullscreen ){
							player.landscapeFullscreen(plugins.landscapeFullscreen);
						}
					}
				}
			}
		}
	}
	catch(error) {
	  console.log(error.message);
	}
});
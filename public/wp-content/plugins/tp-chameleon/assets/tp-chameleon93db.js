(function ($) {
	'use strict'
 	$(document).ready(function () {
		// tp_chameleon.ready();
		var $preview = $('.tp-preview-images');
 		$('.right-canvas .tp_demo').hover(
			function (event) {
				var url_prewview = $(this).attr('data-preview');
				if( url_prewview ) {
					$preview.find('img').attr('src', url_prewview);
					$preview.show();
				}
			},
			function () {
				$preview.hide();
			}
		);
 		$('.right-canvas .tp_demo').mousemove(function (event) {
			var y = (event.clientY);
			$preview.css('top', y - 250);
		});
		jQuery( '#tp_style_selector' ).each( function() {
			var wrapper = jQuery( this );
			$('.style-toggle.toggle-demo').click(function (e) {
				e.preventDefault();
				wrapper.toggleClass('show');
			});
			// Close the demo selector on click on overlay.
			jQuery( 'body' ).on( 'click', '.tp-style-selector.show', function( e ) {
				if ( jQuery( e.target ).hasClass( 'show' ) ) {
					jQuery( e.target ).find( '.style-toggle.toggle-demo' ).trigger( 'click' );
				}
			} );

			// Close the demo selector on esc key.
			jQuery( document ).on( 'keyup', function( e ) {
				if ( 27 === e.keyCode && wrapper.hasClass( 'show' ) ) {
					wrapper.find( '.style-toggle.toggle-demo' ).trigger( 'click' );
				}
			} );
 		} );

 		// Handle the filter clicks.
		jQuery( document ).ready( function() {
			var timeouts = [];
			jQuery( '.tp-filters-wrapper .tp-filters-cats input' ).on( 'change', function( e ) {
				var wrapper       = jQuery( this ).closest( '.tp-style-selector' ),
					demos         = wrapper.find( '.tp-demo' ),
					filterGroups  = wrapper.find( '.tp-filters-cats' ),
					selections    = {},
					counter       = 1;
 				e.preventDefault();

				filterGroups.each( function( e ) {
					var filterWrapper = jQuery( this ),
						filterType    = filterWrapper.data( 'type' ),
						selected      = new Array();

					// Get currently checked filters.
					filterWrapper.find( 'input:checked' ).each( function () {
 						if ( 'all' === this.value ) {
							return false;
						}
 						selected.push( this.value );
 					} );

					// Add to the main selctions object.
					if ( 0 < selected.length ) {
						selections[ filterType ] = selected;
					}
				} );
 				jQuery.each( timeouts, function( index, value ) {
					clearTimeout( value );
				} );

				// Hide all demos.
				demos.hide().addClass( 'demo-hidden' );
  				demos.each( function() {
					var demo           = jQuery( this ),
						compareData    = demo.data(),
						selectionCount = 0;
 					jQuery.each( compareData, function( filterType, selected ) {
						var selectedString;

						// Return early if the data field is not present in the filter selection.
						if ( 'undefined' === typeof selections[ filterType ] ) {
							return;
						}
 						// Return early if selected is empty.
						if ( '' === selected ) {
							return;
						} else if ( -1 === selected.indexOf( ',' ) ) {
 							selected += ',';
						}

						selectedString = selected.split( ',' );
  						jQuery.each( selectedString, function( index, value ) {
							if ( -1 !== jQuery.inArray( value, selections[ filterType ] ) ) {
								selectionCount++;
								return false;
							}
						} );
					} );
 					if ( selectionCount === Object.keys( selections ).length ) {
						demo.show();
						timeouts.push(
							setTimeout( function() {
								demo.removeClass( 'demo-hidden' );
							}, counter * 50 )
						);
						counter++;
					}
				} );
			} );
			
			// filter LMS
			function filterLMS() {
				$('.tp-demos-wrapper .tp-demo').each(function() {
					if ( $(this).data('lms') !== 'learnpress' ) {
						$(this).hide().addClass('demo-hidden');
					} else {
						$(this).show().removeClass('demo-hidden');
					}
				});
			}

			// Run on page load to process initial state
			filterLMS();
  		} );
		if ('loading' in HTMLImageElement.prototype) {
			const images = document.querySelectorAll("img.lazyload");
			images.forEach(img => {
				img.src = img.dataset.src;
			});
		} else {
			// Dynamically import the LazySizes library
			let script = document.createElement("script");
			script.async = true;
			script.src =
				"https://cdnjs.cloudflare.com/ajax/libs/lazysizes/4.1.8/lazysizes.min.js";
			document.body.appendChild(script);
		}
		// $('.toggle-color').hover(function(){
		// 	$('.color-preview-wraper').show()
		// });
		// function set_color_preview (color,config,id){
		// 	if(color != null){
		// 		var data = {
		// 			action  : 'thim_action_add_color_preview',
		// 			color:color,
		// 			config:config
		// 		};
		// 		$.ajax({
		// 			type : "POST",
		// 			url: tpAjax.url,
		// 			data: data,
		// 			// beforeSend: function () {
		// 			// 	$('body').addClass('loading')
		// 			// },
		// 			success: function (response) {
		// 				//console.log(response)
		// 				$('body').removeClass('loading')
		// 				if(response.success){
		// 					$('#'+id).html(response.content)
		// 				}
		// 			}
		// 		});
		// 	}
		//
		// }
		//
		// $('.color-preview-item').each(function(){
		// 	$(this).on('click',function(){
		// 		$('body').addClass('loading')
		// 		$('.color-preview-item').find('.management-data').removeClass('active')
		// 		var color = $(this).find('.management-data').data('color'),
		// 			config = $('.list-color-preview').data('configvar');
		// 			$(this).find('.management-data').addClass('active')
		// 		const first = new URL(location.href).pathname.split("/")[1]
		// 		if($(this).parent().hasClass('multi')){
		// 			localStorage.setItem(first+'iscolorvalue', color);
		// 			localStorage.setItem('location_color_ogin', first );
		// 			var id = 'insert-style-color-'+first+'';
		// 		}else{
		// 			localStorage.setItem('iscolorvalue', color);
		// 			var id = 'insert-style-color-preview';
		// 		}
		// 		set_color_preview (color,config,id)
		// 	})
		// })
		// $('.color-preview-default').each(function(){
		// 	$(this).on('click',function(){
		// 		$('body').addClass('loading')
		// 		if($('.list-color-preview').hasClass('multi')){
		// 			const first = new URL(location.href).pathname.split("/")[1]
		// 			$('#insert-style-color-'+first).html('');
		// 			localStorage.removeItem(first+'iscolorvalue');
		// 		}else{
		// 			$('#insert-style-color-preview').html('');
		// 			localStorage.removeItem('iscolorvalue');
		// 		}
		// 		$('.color-preview-item').find('.management-data').removeClass('active')
		// 		setTimeout(function(){
		// 			$('body').removeClass('loading')
		// 		}, 200);
		// 	})
		// })
		// function check_color_active(color){
		// 	$('.management-data').each(function(){
		// 		var og_color = $(this).attr('data-color')
		// 		if(og_color === color){
		// 			$(this).addClass('active')
		// 		}
		// 	})
		// }
		// $(window).on('load', function () {
		// 	$('.list-color-preview').each(function(){
		// 		var config = $(this).data('configvar');
		// 		if($(this).hasClass('multi')){
		// 			const first = new URL(location.href).pathname.split("/")[1]
		// 			$('head').append(
		// 				'<style type="text/css" id="insert-style-color-'+first+'"></style>'
		// 			)
		// 			var id = 'insert-style-color-'+first+'';
		// 			var color = localStorage.getItem(first+'iscolorvalue');
		//
		// 		}else{
		// 			var color = localStorage.getItem('iscolorvalue');
		// 			$('head').append(
		// 				'<style type="text/css" id="insert-style-color-preview"></style>'
		// 			)
		// 			var id = 'insert-style-color-preview';
		// 		}
		// 		check_color_active(color)
		// 		set_color_preview (color,config,id)
		// 	})
		// });
 	});

})(jQuery);

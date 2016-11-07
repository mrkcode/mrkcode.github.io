$(document).ready(function(){

	// Mobile menu

	$("<div id='mob-menu'></div>").appendTo('body');

	$(".header .menu").clone().appendTo('#mob-menu');

	$('.mobile-menu-btn').click(function(){
		$('body').addClass('is-mob-menu');
		$('.mobile-menu-btn').addClass('active');
	});

	$('#mob-menu').click(function(){
		$('body').removeClass('is-mob-menu');
		$('.mobile-menu-btn').removeClass('active');
	});

	// Trips items

	$(".trips-items .item").each(function(i, elem){
			var $elem = $(elem);
			
			$elem.css('height', $elem.width());
	});

	$(window).resize(function(){
		$(".trips-items .item").each(function(i, elem){
			var $elem = $(elem);

			$elem.css('height', $elem.width());
		});
	});
});
$(function(){
	$('.btn-mobile').click(function(){
		$('body').addClass('active-mob-menu');
	});

	$('.menu .mob-overlay').click(function(){
		$('body').removeClass('active-mob-menu');
	});
});
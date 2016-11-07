$(document).ready(function(){
	
	$('.btn-mobile').click(function(){
		$('body').addClass('active-mob-menu');
	});

	$('.menu .mob-overlay, .menu a').click(function(){
		$('body').removeClass('active-mob-menu');
	});

	$('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			  var target = $(this.hash);

			  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

			  if (target.length) {
				    $('html, body').animate({
				      scrollTop: target.offset().top
				    }, 600);

				    return false;
			  }
		}
	});

	$('.slider').slick({
		centerMode: true,
		slidesToShow: 3,
		draggable: false,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					centerMode: false,
					slidesToShow: 1
				}
			},
			{
				breakpoint: 480,
				settings: {
					arrows: false,
					centerMode: false,
					slidesToShow: 1,
					draggable: true
				}
			}
		]
	});
});
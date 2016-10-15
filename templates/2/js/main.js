
$(function(){

	$('#diagram').waypoint({
		element: document.getElementById('diagram'),
		handler: function(){
			$('.progress').circleProgressBar();
		},
		offset: '70%'
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

	$('.btn-menu, .menu-overlay').click(function(){
		$('body').toggleClass('is-menu');
	});
/*
	$('.menu-overlay').click(function(){
		$('body').removeClass('is-menu');
	});
	*/
});
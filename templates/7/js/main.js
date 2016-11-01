$(document).ready(function(){

	$('.btn-mobile').click(function(){
		$('body').addClass('active-mob-menu');
	});

	$('.menu .mob-overlay, .menu a').click(function(){
		$('body').removeClass('active-mob-menu');
	});

	// Tabs
	(function(){
		$tabbtns = $('.js-tab-btn-group li');
		$tabs    = $('.js-tab');

		$tabbtns.eq(0).addClass('active');
		$tabs.eq(0).addClass('active');

		$tabbtns.each(function(i, tabbtn){
			var $tbbtn = $(tabbtn);

			$tbbtn.click(function(e){
				$tabbtns.removeClass('active');
				$tbbtn.addClass('active');

				$tabs.removeClass('active');
				$($(this).data("target")).addClass('active');
			});
		});
	})();


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

	$(window).scroll(function(){
		var btn = $('.btn-to-top');

		if($(window).scrollTop() > $(window).height() * 0.8){
			btn.addClass('active');
		} else {
			btn.removeClass('active');
		}
	});
});
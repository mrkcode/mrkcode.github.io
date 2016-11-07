$(document).ready(function(){
	$('.btn-mobile').click(function(){
		$('body').addClass('active-mob-menu');
	});

	$('.menu .mob-overlay').click(function(){
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

	$('#owl-slider').owlCarousel({
		items: 1,
		singleItem: true
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
});

$(window).load(function(){

	$portfolioItems = $('.isotope-items');

	$portfolioItems.isotope({
		itemSelector: '.item',
		layoutMode: 'packery',
		getSortData: {
			sort: '[data-sort]'
		}
	});
	
	$('.isotope-buttons li').click(function(){
		var $this  = $(this);
		var filter = $this.data('filter');
		var sort   = filter == '*' ? '' : 'sort';

		$this.parent().find('.is-active').removeClass('is-active');

		$this.addClass('is-active');

		$portfolioItems.isotope({
			filter: filter,
			sortBy: sort
		});
	});
});
$(function(){
	$('.btn-mobile').click(function(){
		$('body').addClass('active-mob-menu');
	});

	$('.menu .mob-overlay').click(function(){
		$('body').removeClass('active-mob-menu');
	});

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

	$('#owl-slider').owlCarousel({
		items: 1,
		singleItem: true
	});
});
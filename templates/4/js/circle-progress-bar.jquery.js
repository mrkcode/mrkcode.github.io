(function($){
	$.fn.circleProgressBar = function(){
		this.each(function(i, elem){
			var $elem   = $(elem);

			if ($elem.hasClass('progress-cb')) {
				return;
			} else {
				$elem.addClass('progress-cb');
			}

			var max       = $elem.data('max');
			var start     = $elem.data('start');
			var stop      = $elem.data('stop');
			var duration  = $elem.data('duration');
			var eas       = $elem.data('easing');
			var target    = $elem.data('target');

			max       = max      ? max      : 100;
			start     = start    ? start    : 1;
			stop      = stop     ? stop     : 50;
			duration  = duration ? duration : 3000;
			eas       = eas      ? eas      : 'linear';

			if (max < stop || max < start) {
				throw Error('data-max error!');
			}

			if (stop < start) {
				throw Error('data-start error!');
			}

			$('<div class"progress-cb"><div class="hidden"><div class="left-half"></div></div><div class="right-half"></div></div>')
				.appendTo($elem);

			var $left   = $elem.find('.left-half');
			var $right  = $elem.find('.right-half');
			var $hidden = $elem.find('.hidden');

			var half = $elem.width() - ($elem.width() / 2);

			$left.css('clip', 'rect(0, ' + half + 'px, ' + $elem.height() + 'px, 0)');
			$right.css('clip', 'rect(0, ' + $elem.width() + 'px, ' + $elem.height() + 'px, ' + half + 'px)');

			var exTime = duration / max * stop;
			var dstart = 360 / 100 * (start / max) * 100;
			var dstop  = 360 / 100 * (stop / max) * 100;

			$left.css('transform','rotate(' + dstart + 'deg)');

			$({deg: dstart}).animate(
				{ 
					deg: dstop
				},
				{
				    step: function(now,fx) {
				    	if (now > 180) {
							$right.css('display', 'block');
							$left.css('left', '0');
							$hidden.css('left', '0');
				    	}

				      	$left.css('transform','rotate(' + now + 'deg)');  
				    },

			    	duration: exTime,
				    easing: eas
				}
			);

			if (target) {
				var $target = $(target);

				$({num: start}).animate(
					{ 
						num: stop
					},
					{
					    step: function(now,fx) {
					    	$target.html(Math.floor(now));  
					    },

				    	duration: exTime,
				    	easing: eas
					}
				);
			}
		});
	};
})(jQuery);
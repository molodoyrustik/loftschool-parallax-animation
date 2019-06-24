var parallax = (function () {
	var bg = document.querySelector('.hero__bg');
	var user = document.querySelector('.hero__user-block');
	var sectionText = document.querySelector('.hero__section-img');
	
	return {
		move: function (block, windowScroll, strafeAmount) {
			var strafe = windowScroll / -strafeAmount + '%';
			var transformString = 'translate3d(0,' + strafe + ', 0)';

			var style = block.style;

			style.transform = transformString;
			style.webkitTransform = transformString;
		},

		init: function (wScroll) {
			this.move(bg, wScroll, 45);
			this.move(sectionText, wScroll, 20);
			this.move(user, wScroll, 3);
		}
	}
	
}());

var blur = (function () {
	var wrapper = document.querySelector('.blur__form-wrapper'),
		form = document.querySelector('.blur__form');

	return {
		set: function () {
			var imgWidth = document.querySelector('.blur__background').offsetWidth,
				posLeft = -wrapper.offsetLeft,
				posTop = -wrapper.offsetTop,
				blurCSS = form.style;

			blurCSS.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
			blurCSS.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
		}
	}
}());

var svgScroll = (function () {
	var svg = document.getElementById('heisenberg'),
		svgPath = document.querySelectorAll('#heisenberg .group'),
		windowMargin = window.innerHeight / 3,
		svgRect = svg.getBoundingClientRect(),
		svgPos = svgRect.top;

	return {
		grow: function (wScroll) {
			var startAnimate = wScroll - svgPos + windowMargin,
				pixelsElapsed = svgPos - wScroll,
				percentsElapsed = 100 - Math.ceil(pixelsElapsed / windowMargin * 100),
				percentsDraw = 1200 / 100 * percentsElapsed;

			if (startAnimate >= 0) {
				var drawAmount = 1200 - percentsDraw;

				if (drawAmount > 0) {
					svgPath.forEach(function (item) {
						item.style.strokeDashoffset = drawAmount;
					});
				}
			}
		}
	}
}());

blur.set();

window.onscroll = function () {
	var wScroll = window.pageYOffset;

	parallax.init(wScroll);
	svgScroll.grow(wScroll);
};

window.onresize = function () {
	blur.set();
};
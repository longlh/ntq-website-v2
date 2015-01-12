;(function(exports) {
	'use strict';

	// exports
	exports.fs = function(options) {
		var TWEEN = exports.TWEEN,
			Hammer = exports.Hammer;

		var resizeDelayTime = 100,
			scrollDelayTime = 100,
			resizeTimeout, scrollTimeout;

		var STATE = {
			idle: 0,
			moving: 1
		};

		var sections,
			currentSection,
			container,
			navi,
			viewportHeight,
			state = STATE.idle;

		function animate(t) {
			TWEEN.update();

			if (state === STATE.moving) {
				requestAnimationFrame(animate);
			}
		}


		function updateSectionSizes(top) {
			top = top || 0;
			// update viewportHeight
			viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - top;

			if (sections) {
				Array.prototype.forEach.call(sections, function(e) {
					e.style.height = (viewportHeight) + 'px';
					// console.log(viewportHeight);
				});

				container.style.height = (viewportHeight) + 'px';
				container.style.top = top + 'px';
			}

			if (navi) {
				if (options.naviTop) {
					navi.style.top = options.naviTop + 'px';
				} else {
					navi.style.top = ((viewportHeight - navi.clientHeight) / 2) + 'px';
				}
			}
		}

		function goto(section) {
			if (section !== currentSection && state === STATE.idle) {

				var direction = currentSection && currentSection._index < section._index ? 1 : -1;

				new TWEEN.Tween({
					x: 0
				}).to({
					x: viewportHeight
				}, currentSection ? 500 : 0).onUpdate(function() {

					section.style.top = (viewportHeight - this.x) * direction + 'px';

					if (currentSection) {
						currentSection.style.top = (-this.x * direction) + 'px';
					}
				}).onComplete(function() {

					if (currentSection) {
						currentSection.classList.remove('fs-section-current');
					}

					currentSection = section;
					state = STATE.idle;

					// fire event
					if (typeof options.callback === 'function') {
						setTimeout(function() {
							options.callback(currentSection);
						});
					}
				}).start();

				section.classList.add('fs-section-current');
				// section.style.zIndex = Number(currentSection.style.zIndex) + 1;

				section.style.top = (viewportHeight * direction) + 'px';

				// start animation
				state = STATE.moving;

				if (section._anchor) {
					section._anchor.classList.add('fs-anchor-current');
				}

				if (currentSection && currentSection._anchor) {
					currentSection._anchor.classList.remove('fs-anchor-current');
				}

				requestAnimationFrame(animate);
			}
		}

		function down() {
			var currentIndex = currentSection._index;

			if (currentIndex < sections.length - 1) {
				goto(sections[currentIndex + 1]);
			}
		}

		function up() {
			var currentIndex = currentSection._index;

			if (currentIndex > 0) {
				goto(sections[currentIndex - 1]);
			}
		}

		function init() {
			sections = document.getElementsByClassName('fs-section');
			container = document.getElementsByClassName('fs-sections')[0];
			navi = document.getElementById('fs-navi');

			// currentSection = sections[0];

			Array.prototype.forEach.call(sections, function(section, index) {
				section._index = index;

				if (navi) {
					var anchor = document.createElement('div');

					section._anchor = anchor;

					navi.appendChild(anchor);

					anchor.addEventListener('click', function() {
						goto(section);
					});
				}
			});

			// register events
			if ('ontouchstart' in window) {
				var hammertime = new window.Hammer(document.documentElement);

				hammertime.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

				hammertime.on('swipe', function(e) {
					if (e.direction === Hammer.DIRECTION_DOWN) {
						up();
					} else if (e.direction === Hammer.DIRECTION_UP) {
						down();
					}
				});
			}

			window.addEventListener('mousewheel', function(e) {
				clearTimeout(scrollTimeout);
				scrollTimeout = setTimeout(function() {
					if (e.wheelDeltaY > 0) {
						up();
					} else {
						down();
					}
				}, scrollDelayTime);
			});

			window.addEventListener('resize', function() {
				clearTimeout(resizeTimeout);
				resizeTimeout = setTimeout(function() {
					updateSectionSizes(options.top);
				}, resizeDelayTime);
			});

			// init section size
			updateSectionSizes(options.top);

			goto(sections[0]);
		}


		init();
	};
})(window);
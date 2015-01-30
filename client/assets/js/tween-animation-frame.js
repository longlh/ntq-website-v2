;(function() {
	'use strict';
	var TWEEN = window.TWEEN || false;

	// polyfill for requestAnimationFrame here
	// checkTween here

	if (TWEEN) {
		var update = function(t) {
			TWEEN.update(t);

			requestAnimationFrame(update);
		};

		// start update continuously
		requestAnimationFrame(update);
	}

})();
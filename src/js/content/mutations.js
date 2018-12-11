'use strict';

var imgURL = chrome.runtime.getURL('img/');

(function($){

	//console.log('ext loaded');
	//console.log(window.location.href);

	(function(){
		
		var items = $('.extInstall');

		if(items.length) {
			items.remove();
		}

	})();

})(jQuery);

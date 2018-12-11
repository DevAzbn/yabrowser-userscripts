'use strict';

$.noConflict();

[[azbntple tpl="/src/_/concat.jquery.plugin.js" ]]

(function($){
	
	var __body = $(document.body);
	var ns = 'azbn';
	var _ns = '.azbn';

	window.onerror = function(error, url, lineNumber, column, errorObj) {
		console.dir(arguments);
		return;
	}

	/*
	Создание триггеров на элементы, в основном, на body
	*/
	[[azbntple tpl="/src/_/concat.jquery.event.js" ]]

	/*
	Основная логика сайта
	*/
	[[azbntple tpl="/src/_/concat.jquery.main.js" ]]

	/*
	Событие ухода со страницы
	*/
	window.onbeforeunload = function(event) {
		
		//__body.trigger('unload', [event]);
		return;//return false;

	}
	
	/*
	Событие инициализации .trigger('azbn7.init');
	*/
	
})(jQuery);
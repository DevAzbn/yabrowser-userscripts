'use strict';

(function(_){
	
	function __class__() {
		this.__data = null;
	}
	

	var __object__ = new __class__();
	

	__object__.__classes = {};
	__object__.__classes_params = {};
	

	__object__.getClassName = function() {
		return 'Classes';
	}


	__object__.setClass = function(uid, o) {
		this.__classes[uid] = o;
	};


	__object__.getClass = function(uid) {
		return (typeof this.__classes[uid] != 'undefined' ? this.__classes[uid] : null);
	};

	
	_.set('Classes', __object__);
	
})(_);

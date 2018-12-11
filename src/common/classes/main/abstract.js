'use strict';

(function(_){
	
	function __class__() {
		
		//this.__objects = {};

	}
	
	__class__.prototype.getClassName = function() {
		//return this.constructor.toString().match(/function ([^(]*)\(/)[1];
		return 'Abstract';
	}

	/*
	__class__.prototype.set = function(uid, o) {
		this.__objects[uid] = o;
	};

	__class__.prototype.get = function(uid) {
		return (this.__objects[uid] ? this.__objects[uid] : null);
	};
	*/
	
	_.get('Classes').setClass(__class__.prototype.getClassName(), __class__);
	
})(_);
'use strict';

(function(_){
	
	function __class__(data) {
		
		
		
	}
	
	__class__.prototype = Object.create(_.get('Classes').getClass('Abstract').prototype);
	__class__.prototype.constructor = __class__;
	
	__class__.prototype.__entity_class = {
		id : 0,
		entity_class : 'Common\\Collection',
	};
	
	__class__.prototype.getClass = function(k) {
		if(this.__entity_class && k in this.__entity_class) {
			return this.__entity_class[k];
		} else {
			return this.__entity_class;
		}
	};
	
	_.get('Classes').setClass(__class__.prototype.getClass('entity_class'), __class__);
	
	
})(_);

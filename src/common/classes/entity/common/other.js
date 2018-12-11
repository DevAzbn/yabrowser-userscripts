'use strict';

(function(_){
	
	function __class__(data) {
		
		this.__data = {
			item : {},
			data : {},
		};
		
		this.setChanges(data);
		
	}
	

	__class__.prototype = Object.create(_.get('Classes').getClass(_.get('aCRM').getDefaultEntityClass()).prototype);
	__class__.prototype.constructor = __class__;
	

	__class__.prototype.__entity_class = {
		id : 1,
		entity_class : 'Common\\Entity\\Other',
	};
	

	_.get('Classes').setClass(__class__.prototype.getClass('entity_class'), __class__);
	
	
})(_);

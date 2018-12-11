'use strict';

(function(_){
	
	function __class__(data) {
		
		this.__data = {
			item : {},
			data : {},
			chessy : {},
		};
		
		this.setChanges(data);
		
	}
	

	__class__.prototype = Object.create(_.get('Classes').getClass(_.get('aCRM').getDefaultEntityClass()).prototype);
	__class__.prototype.constructor = __class__;
	

	__class__.prototype.__entity_class = {
		id : 14,
		entity_class : 'Common\\Entity\\Realty\\Building',
	};


	__class__.prototype.getChessy = function() {
		
		return this.__data.chessy;

	};
	

	_.get('Classes').setClass(__class__.prototype.getClass('entity_class'), __class__);
	
	
})(_);

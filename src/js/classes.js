'use strict';

[[azbntple tpl="/src/common/classes/mctrl.js" version="0" ]]

(function(_){
	

	_.set('isDev', true);


	[[azbntple tpl="/src/common/classes/main/classes.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/main/debug.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/main/abstract.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/main/storage.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/main/events.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/vue/vcomp.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/crm/api.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/crm/acrm.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/crm/entity.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/crm/collection.js" version="0" ]]
	

	[[azbntple tpl="/src/common/classes/entity/common/other.js" version="0" ]]
	[[azbntple tpl="/src/common/classes/entity/common/realty/building.js" version="0" ]]
	
	
	_.set('LS', new (_.get('Classes').getClass('Storage'))('local'));
	_.set('SS', new (_.get('Classes').getClass('Storage'))('session'));
	_.set('Cookie', new (_.get('Classes').getClass('Storage'))('cookie'));


})($mctrl);

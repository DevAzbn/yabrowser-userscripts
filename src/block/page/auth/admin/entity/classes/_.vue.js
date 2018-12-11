
Vue.component('auth-admin-entity-classes', {
	
	template : '#auth-admin-entity-classes',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],

	inject : [
		
	],
	
	data : function () {
		return {
			entity_classes : [],
			flags : {
				
			},
		};
	},
	
	created : function() {
		
		var _t = this;

		//_t.loadClasses(_t);
		
		$mctrl.get('aCRM').loadEntityClasses(function(classes){
			_t.entity_classes = Object.values(classes);
		});
		
		
	},
	
	methods : {
		
		loadClasses : function(_t) {
			
			$mctrl.get('Api').call('Entity/Classes', null, null, function(err, resp, meta){
				
				_t.entity_classes = resp;
				
			});

		},
		
	},
	
});

vueRoutes.push({
	path : "/auth/admin/entity/classes/",
	component : Vue.options.components['auth-admin-entity-classes'],
	page : {
		title : '',
	},
});

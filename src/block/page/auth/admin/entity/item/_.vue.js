
Vue.component('auth-admin-entity-item', {
	
	template : '#auth-admin-entity-item',

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
			entity_class_str : 0,
			entity_class : {},
			entity_class_id : 0,
			entity_id : 0,
			entity : {},
			flags : {
				
			},
		};
	},
	
	created : function() {
		
		var _t = this;
		
		_t.entity_class_id = _t.$route.params && _t.$route.params.entity_class_id ? _t.$route.params.entity_class_id : 0;
		
		_t.entity_class_str = _t.$route.query && _t.$route.query.entity_class ? _t.$route.query.entity_class : 0;
		
		_t.entity_id = _t.$route.query && _t.$route.query.id ? _t.$route.query.id : 0;

		if(_t.entity_class_str && _t.entity_id) {

			$mctrl.get('aCRM').loadEntityClasses(function(classes){
				
				_t.entity_class = classes[_t.entity_class_str];

				$mctrl.get('aCRM').load(_t.entity_class_str, {id : _t.entity_id}, function(entity){
					_t.entity = entity;
				});
				
			});

		}
		
	},

	methods : {

		remove : function() {
			
			var _t = this;
			
			if(confirm('Удалить запись из базы данных?') && _t.entity && _t.entity.item && _t.entity.item('id')) {
				
				_t.entity.remove(function(entity){
					_t.$router.push('/entity/items/?entity_class=' + _t.entity_class_str);
				});
				
			}

		},

	},

	/*
	watch : {

		'$route' : function(to, from) {

		},

	},

	beforeRouteUpdate : function(to, from, next) {
		
		console.dir(arguments);
		
		next();

	},
	*/
	
});

vueRoutes.push({
	path : "/auth/admin/entity/item/",
	component : Vue.options.components['auth-admin-entity-item'],
	page : {
		title : '',
	},
});

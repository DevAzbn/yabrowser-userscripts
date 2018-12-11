
Vue.component('auth-admin-entity-edit', {
	
	template : '#auth-admin-entity-edit',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],

	inject : [
		
	],

	provide : function() {
		return {
			fieldChange : this.fieldChange,
		};
	},
	
	data : function () {
		return {
			entity_class_str : 0,
			entity_class_id : 0,
			entity_class : {},
			entity_id : 0,
			item_id : 0,
			item : {},
			fields : [],
			flags : {
				
			},
		};
	},
	
	created : function() {
		
		var _t = this;

		_t.entity_class_str = _t.$route.query && _t.$route.query.entity_class ? _t.$route.query.entity_class : 0;

		_t.entity_class_id = _t.$route.params && _t.$route.params.entity_class_id ? _t.$route.params.entity_class_id : 0;
		
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
		
		loadClass : function(_t) {

			var p = {
				entity_class : {
					id : _t.entity_class_id,
				},
			};

			$mctrl.get('Api').call('Entity/Classes/Fields', p, null, function(err, resp, meta){
				
				_t.entity_class = resp;

				var o = [];

				for(var k in _t.entity_class.fields) {
					o.push({
						uid : k,
						params : _t.entity_class.fields[k],
					})
				}

				_t.fields = o;

				var item = $mctrl.get('Classes').buildEntity(_t.entity_class_id, '\\Common\\Entity');

				if(!item.entity_class.id) {
					item.mergeEntityClass({
						id : _t.entity_class.id,
						entity_class : _t.entity_class.entity_class,
					});
				}

				item.load(_t.item_id, function(entity){
					
					_t.item = entity;

				});

			});

		},

		save : function() {

			var _t = this;

			//_t.item.mergeEntityClass(_t.entity_class.item);

			_t.item.save(function(entity){

				_t.$router.push('/entity/items/' + _t.entity_class_id + '/' + entity.item('id') + '/');

			});

		},

		fieldChange : function(data) {
			
			var _t = this;

			_t.item.item(data.uid, data.value);

		},
		
	},
	
});

vueRoutes.push({
	path : "/auth/admin/entity/items/:entity_class_id/:entity_id/edit/",
	component : Vue.options.components['auth-admin-entity-edit'],
	page : {
		title : '',
	},
});

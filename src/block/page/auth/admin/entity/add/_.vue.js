
Vue.component('auth-admin-entity-add', {
	
	template : '#auth-admin-entity-add',

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
			entity_class_id : 0,
			entity_class : {},
			item : {},
			fields : [],
			flags : {
				
			},
		};
	},
	
	created : function() {
		
		var _t = this;

		_t.entity_class_id = _t.$route.params && _t.$route.params.entity_class_id ? _t.$route.params.entity_class_id : 0;

		if(_t.entity_class_id) {
			
			_t.loadClass(_t);

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
				
				_t.item = item;

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
	path : "/auth/admin/entity/items/:entity_class_id/add/",
	component : Vue.options.components['auth-admin-entity-add'],
	page : {
		title : '',
	},
});

Vue.component('block-field__edit__select--entity', {
	
	mixins : [
		vueMixins.common,
		vueMixins.block_container__block_field__edit,
	],

	data : function() {
		return {
			
			entity_classes : [],
			entities : [],

			entity_class_id : 0,
			entity_id : 0,
			selected : [],

			filter_by : null,

		};
	},

	created : function() {

		var _t = this;

		$mctrl.get('Api').call('Entity/Classes', null, null, function(err, resp, meta){
			
			_t.entity_classes = resp;
			
		});

	},

	methods : {

		selectItem : function(event, item) {

			var _t = this;

			_t.selected.push(item);

		},

		unselectItem : function(event, item) {

			var _t = this;

			_t.selected.splice(item, 1);

		},

		loadEntities : function() {

			var _t = this;

			_t.entities = [];

			var p = {
				entity_class : {
					id : _t.entity_class_id,
				},
			};

			if(_t.filter_by && _t.filter_by != '') {
				p.where = {
					item : {
						filter_by : "LIKE '%" + _t.filter_by + "%'",
					},
				};
			}

			$mctrl.get('Api').call('Entity/Items', p, null, function(err, resp, meta){
				_t.entities = resp;
			});

		},

	},

	watch : {

		entity_class_id : function(n, o) {
			this.filter_by = '';
			this.selected = [];
		},

		filter_by : function(n, o) {
			this.loadEntities();
		},

	},

});

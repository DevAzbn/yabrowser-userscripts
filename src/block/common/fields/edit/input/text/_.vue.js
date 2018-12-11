
Vue.component('field-edit__input--text', {
	
	template : '#field-edit__input--text',

	mixins : [
		vueMixins.common,
	],

	props : [
		
		'field_index',
		'field_uid',
		'parent_params',
		'parent_entity',
		//'params',
	],

	inject : [
		'fieldChange',
	],
	
	data : function () {
		return {
			value : (this.parent_entity && this.field_uid && typeof this.parent_entity[this.field_uid] != 'undefined') ? this.parent_entity[this.field_uid] : null,
			flags : {
				
			},
		}
	},

	watch : {

		value : function(n, o) {
			
			var _t = this;

			_t.fieldChange({
				uid : _t.field_uid,
				value : n,
				old_value : o,
			});

		},

	},
	
	methods : {
		
	}
	
});
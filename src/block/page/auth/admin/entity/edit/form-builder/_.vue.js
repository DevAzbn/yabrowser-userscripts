Vue.component('entity-edit-form-builder', {
	
	template : '#entity-edit-form-builder',
	
	mixins : [
		vueMixins.common,
	],

	props : [
		
		'fields',
		'entity_class',
		'entity',
	],

	inject : [
		
	],
	
	data : function () {
		return {
			params : this.fields,
			flags : {
				
			},
		}
	},

	computed : {

		items : function() {
			return Object.values(this.fields || {});
		},

		renderCompFnc : function() {
			
			var _t = this;

			var tpl = '';
			var tpl_arr = [];

			var items = _t.items || [];
			
			tpl_arr.push('<div>');
			if(items.length) {
				for(var i = 0; i < items.length; i++) {
					//tpl_arr.push(`<li>${items[i].uid}: ${items[i].params.title}</li>`);
					
					var item = items[i];
					
					tpl_arr.push(`
					<field-edit__input--text
						v-bind:field_index="'${i}'"
						v-bind:field_uid="'${item.uid}'"
						v-bind:parent_params="params"
						v-bind:parent_entity="entity"
					></field-edit__input--text>
					`);

				}
			}
			tpl_arr.push('</div>');

			tpl = tpl_arr.join('');
			
			return {
				template : tpl,
				props : [
					'parent_params',
					'parent_entity',
				],
				data : function () {
					return {
						params : this.parent_params,
						entity : this.parent_entity,
					}
				},
			};

		},

	},

});

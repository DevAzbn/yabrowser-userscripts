Vue.component('block-container', {
	
	template : '#block-container',
	//render : genRender(),

	mixins : [
		vueMixins.common,
	],

	props : [
		
		'params',
	],

	inject : [
		'getContext',
	],
	
	data : function () {
		return {
			//params : this.fields,
			
			default : {
				component_base_name : 'block-field__{{block}}',
			},
			
			container : {
				tag : 'div',
				class : '',
			},

			flags : {
				
			},
		}
	},

	computed : {

		renderTemplate : function() {
			
			var _t = this;

			var tpl = '';
			var tpl_arr = [];

			var items = _t.params.blocks || [];
			//console.dir(_t.blocks_as_array);

			var dft = _t.default;
			
			tpl_arr.push('<' + _t.container.tag + ' class="' + _t.container.class + '" >');

			for(var i in items) {
				
				var item = items[i];
				
				var component_name = item.component ? dft.component_base_name.replace('{{block}}', item.component) : '';

				if(!Vue.options.components[component_name]) {
					
					component_name = dft.component_base_name.replace('{{block}}', _t.params.ns.tpl + '__input--text');

				}

				if(!Vue.options.components[component_name]) {
					
					component_name = dft.component_base_name.replace('{{block}}', 'view__string--default');

				}

				if(Vue.options.components[component_name]) {

					tpl_arr.push(`
					<${component_name}
						v-bind:params="params"
						v-bind:index="${i}"
						v-bind:block="params.blocks[${i}]"
						v-bind:value="params.blocks[${i}].value"
					></${component_name}>
					`);

				}

			}
			
			tpl_arr.push('</' + _t.container.tag + '>');

			tpl = tpl_arr.join('');
			
			return {
				template : tpl,
				props : [
					
				],
				data : function () {
					return {
						params : _t.params,
					};
				},
			};

		},

	},

	provide : function() {
		
		var _t = this;
		
		return {
			getContainer : function() {
				return _t;
			},
		};
		
	},

});


Vue.component('common-modals', {
	
	//template : '<div v-if="$store.getters.getModals.length" ><component v-for="(item, i) in items" v-bind:key="i" v-bind:index="i" v-bind:item="item" v-bind:is="\'common-modal-\' + item" v-require-global:common-modals v-on:close-modal="closeModal(i)" ></component></div>',
	//template : '#common-modals',

	mixins : [
		vueMixins.common,
	],

	data : function () {
		return {
			items : this.$store.getters.getModals,
		}
	},

	created : function() {

		var _t = this;

		_t.$options.render = Vue.compile(_t.template_generator()).render;

	},

	methods : {

		template_generator : function() {
			
			var _t = this;

			var tpl = '';

			if(_t.items && _t.items.length) {
				for(var i in _t.items) {
					var item = _t.items[i];
					tpl = tpl + '<div class="modal-mask" ><div class="modal-wrapper"><' + item.uid + ' class="modal-container" v-require-local:' + this.component_point_name(item.component) + ' v-bind:index="' + i + '" v-bind:uid="items[' + i + '].uid" v-bind:params="items[' + i + '].params" >' + item.uid + ' : ' + item.component + '</' + item.uid + '></div></div>';
				}
			}

			//tpl = 'test!!!';

			return '<div v-if="items.length" >' + tpl + '</div>';

		},

		component_point_name : function(comp) {
			return comp.split('/').join('.');
		},

	},
	
	watch : {

		items : function(n, o) {

			var _t = this;
			
			_t.$options.render = Vue.compile(_t.template_generator()).render;

		},

	},

});

Vue.component('common-dev-component-viewer', {

	//template : '#common-dev-component-viewer',

	mixins : [
		vueMixins.common,
	],

	props : [
		'component',
		'props',
	],

	data : function() {
		return {
			
		};
	},

	created : function() {

		var _t = this;

		_t.$options.render = Vue.compile(_t.template_generator()).render;
		
		//_t.$forceUpdate();

	},

	methods : {

		template_generator : function() {
			
			var _t = this;

			return `<${_t.component_valid_name} v-require-local:${_t.component_point_name} ${_t.props} >{{component_point_name}} ({{component}})</${_t.component_valid_name}>`;

			//return '<' + _t.component_valid_name + ' v-require-local:' + _t.component_point_name + ' ' + _t.props + ' >{{component_point_name}} ({{component}})</' + _t.component_valid_name + '>';

		},

	},

	computed : {

		component_point_name : function() {
			return this.component.split('/').join('.');
		},

		component_valid_name : function() {
			return this.component.split('/').join('-');
		},

		props_str : function() {
			return this.props;
		},

	},

	watch : {

		component : function(n, o) {

			var _t = this;
			
			_t.$options.render = Vue.compile(_t.template_generator()).render;

			_t.$forceUpdate();

		},

		props : function(n, o) {

			var _t = this;
			
			_t.$options.render = Vue.compile(_t.template_generator()).render;

			_t.$forceUpdate();

		},

	},

});
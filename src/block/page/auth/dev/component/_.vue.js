
Vue.component('auth-dev-component', {
	
	template : '#auth-dev-component',

	mixins : [
		vueMixins.common,
	],

	data : function () {
		return {
			component : null,
			props : '',
			component_t : 'dev/test/comp',
			props_t : 'v-bind:x="9876543210"',
		};
	},
	
	created : function() {
		
		var _t = this;

		_t.component_t = _t.component_t || ((_t.$route.query && _t.$route.query.component) ? _t.$route.query.component : null);
		_t.props_t = _t.props_t || ((_t.$route.query && _t.$route.query.props) ? _t.$route.query.props : '');

		_t.loadComponent();
		
	},

	methods : {

		sendForm : function() {

			var _t = this;

			//_t.loadComponent(_t.component_t, _t.props_t);

			_t.$router.push('/auth/dev/component/?v=' + ((new Date()).getTime()) + '&component=' + _t.component_t + '&props=' + _t.props_t);

		},

		loadComponent : function() {

			var _t = this;

			_t.component = _t.component_t;
			_t.props = _t.props_t;

			_t.$forceUpdate();

			//_t.$router.push('/auth/dev/component/?v=' + ((new Date()).getTime()) + '&component=' + _t.component + '&props=' + _t.props);

		},

	},

	watch : {

		/*
		'component' : function(n, o) {

			var _t = this;

			_t.$router.push('/auth/dev/component/?component=' + _t.component);

		},
		*/

		'$route' : function(n, o) {
			
			var _t = this;

			_t.component_t = (_t.$route.query && _t.$route.query.component) ? _t.$route.query.component : null;
			_t.props_t = (_t.$route.query && _t.$route.query.props) ? _t.$route.query.props : '';

			_t.loadComponent();

			//_t.$forceUpdate();

		},

	},
	
});

vueRoutes.push({
	path : "/auth/dev/component/",
	component : Vue.options.components['auth-dev-component'],
	page : {
		title : '',
	},
});

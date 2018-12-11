
Vue.component('common-dev-errors-list', {

	template : '#common-dev-errors-list',
	
	mixins : [
		vueMixins.common,
	],

	filters : {

		getJSON : function(v) {
			return $mctrl.get('Debug').ed(v);
		},

	}

});
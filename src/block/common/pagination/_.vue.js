
Vue.component('common-pagination', {

	template : '#common-pagination',

	mixins : [
		vueMixins.common,
	],

	props : [
		
		'pagination',
	],

	data : function () {
		return {
			
		};
	},

	computed : {

		page_real : function() {
			var _t = this;
			return _t.pagination.page > 0 ? _t.pagination.page - 1 : 0;
		},

		pages : function() {
			var _t = this;
			return Math.ceil( _t.pagination.amount / _t.pagination.size );// + _t.pagination.start;
		},

	},

});
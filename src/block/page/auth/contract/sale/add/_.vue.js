
Vue.component('contract-sale-add', {
	
	template : '#contract-sale-add',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],
	
	data : function () {
		return {
			buildings : [],
			flags : {
				
			},
		};
	},
	
});

vueRoutes.push({
	path : "/contract/sale/add/",
	component : Vue.options.components['contract-sale-add'],
	page : {
		title : '',
	},
});
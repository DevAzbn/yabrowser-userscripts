
Vue.component('contract-sale-edit', {
	
	template : '#contract-sale-edit',

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
	path : "/contract/sale/edit/",
	component : Vue.options.components['contract-sale-edit'],
	page : {
		title : '',
	},
});
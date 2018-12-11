
Vue.component('contract_sale', {
	
	template : '#contract_sale',

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
	path : "/contract/sale/",
	component : Vue.options.components['contract_sale'],
	page : {
		title : '',
	},
});
Vue.component('contract-sale-view', {
	
	template : '#contract-sale-view',

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
	path : "/contract/sale/view/",
	component : Vue.options.components['contract-sale-view'],
	page : {
		title : '',
	},
});
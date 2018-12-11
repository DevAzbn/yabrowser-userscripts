
Vue.component('contract_ad', {
	
	template : '#contract_ad',

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
	path : "/contract/ad/",
	component : Vue.options.components['contract_ad'],
	page : {
		title : '',
	},
});
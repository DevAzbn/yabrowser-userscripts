
Vue.component('contract_bay', {
	
	template : '#contract_bay',

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
	path : "/contract/bay/",
	component : Vue.options.components['contract_bay'],
	page : {
		title : '',
	},
});
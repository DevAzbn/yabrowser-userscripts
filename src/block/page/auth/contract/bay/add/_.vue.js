
Vue.component('contract-bay-add', {
	
	template : '#contract-bay-add',

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
	path : "/contract/bay/add/",
	component : Vue.options.components['contract-bay-add'],
	page : {
		title : '',
	},
});
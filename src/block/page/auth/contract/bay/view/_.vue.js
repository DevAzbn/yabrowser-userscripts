Vue.component('contract-bay-view', {
	
	template : '#contract-bay-view',

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
	path : "/contract/bay/view/",
	component : Vue.options.components['contract-bay-view'],
	page : {
		title : '',
	},
});
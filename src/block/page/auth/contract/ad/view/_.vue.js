Vue.component('contract-ad-view', {
	
	template : '#contract-ad-view',

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
	path : "/contract/ad/view/",
	component : Vue.options.components['contract-ad-view'],
	page : {
		title : '',
	},
});
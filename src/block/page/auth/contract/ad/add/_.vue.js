
Vue.component('contract-ad-add', {
	
	template : '#contract-ad-add',

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
	path : "/contract/ad/add/",
	component : Vue.options.components['contract-ad-add'],
	page : {
		title : '',
	},
});
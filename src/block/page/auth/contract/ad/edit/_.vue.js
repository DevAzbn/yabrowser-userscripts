
Vue.component('contract-ad-edit', {
	
	template : '#contract-ad-edit',

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
	path : "/contract/ad/edit/",
	component : Vue.options.components['contract-ad-edit'],
	page : {
		title : '',
	},
});
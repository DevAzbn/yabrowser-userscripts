
Vue.component('contract-bay-edit', {
	
	template : '#contract-bay-edit',

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
	path : "/contract/bay/edit/",
	component : Vue.options.components['contract-bay-edit'],
	page : {
		title : '',
	},
});
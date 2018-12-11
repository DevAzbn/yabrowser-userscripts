
Vue.component('shows-add', {
	
	template : '#shows-add',

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
	path : "/shows/add/",
	component : Vue.options.components['shows-add'],
	page : {
		title : '',
	},
});
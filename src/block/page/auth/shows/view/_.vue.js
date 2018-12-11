
Vue.component('shows-view', {
	
	template : '#shows-view',

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
	path : "/shows/view/",
	component : Vue.options.components['shows-view'],
	page : {
		title : '',
	},
});
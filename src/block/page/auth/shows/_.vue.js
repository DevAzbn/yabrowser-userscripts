
Vue.component('shows', {
	
	template : '#shows',

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
	path : "/shows/",
	component : Vue.options.components['shows'],
	page : {
		title : '',
	},
});
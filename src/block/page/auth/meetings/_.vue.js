
Vue.component('meetings', {
	
	template : '#meetings',

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
	path : "/meetings/",
	component : Vue.options.components['meetings'],
	page : {
		title : '',
	},
});
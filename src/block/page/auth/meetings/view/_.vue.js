
Vue.component('meetings-view', {
	
	template : '#meetings-view',

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
	path : "/meetings/view/",
	component : Vue.options.components['meetings-view'],
	page : {
		title : '',
	},
});
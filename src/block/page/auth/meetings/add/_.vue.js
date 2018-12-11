
Vue.component('meetings-add', {
	
	template : '#meetings-add',

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
	path : "/meetings/add/",
	component : Vue.options.components['meetings-add'],
	page : {
		title : '',
	},
});
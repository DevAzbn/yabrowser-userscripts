
Vue.component('meetings-edit', {
	
	template : '#meetings-edit',

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
	path : "/meetings/edit/",
	component : Vue.options.components['meetings-edit'],
	page : {
		title : '',
	},
});
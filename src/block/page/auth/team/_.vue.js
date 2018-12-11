
Vue.component('team', {
	
	template : '#team',

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
	path : "/team/",
	component : Vue.options.components['team'],
	page : {
		title : '',
	},
});
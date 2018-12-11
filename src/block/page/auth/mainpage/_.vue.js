
Vue.component('mainpage', {
	
	template : '#mainpage',

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
	path : "/",
	component : Vue.options.components['mainpage'],
	page : {
		title : '',
	},
});

vueRoutes.push({
	path : "/mainpage/",
	component : Vue.options.components['mainpage'],
	page : {
		title : '',
	},
});

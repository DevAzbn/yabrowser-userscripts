
Vue.component('incomings', {
	
	template : '#incomings',

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
	path : "/incomings/",
	component : Vue.options.components['incomings'],
	page : {
		title : '',
	},
});
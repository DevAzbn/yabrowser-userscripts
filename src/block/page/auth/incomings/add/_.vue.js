
Vue.component('incomings-add', {
	
	template : '#incomings-add',

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
	path : "/incomings/add/",
	component : Vue.options.components['incomings-add'],
	page : {
		title : '',
	},
});
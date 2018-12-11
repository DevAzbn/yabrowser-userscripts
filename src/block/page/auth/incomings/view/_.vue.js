
Vue.component('incomings-view', {
	
	template : '#incomings-view',

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
	path : "/incomings/view/",
	component : Vue.options.components['incomings-view'],
	page : {
		title : '',
	},
});
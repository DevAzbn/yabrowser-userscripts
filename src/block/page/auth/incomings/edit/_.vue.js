
Vue.component('incomings-edit', {
	
	template : '#incomings-edit',

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
	path : "/incomings/edit/",
	component : Vue.options.components['incomings-edit'],
	page : {
		title : '',
	},
});
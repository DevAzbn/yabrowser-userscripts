
Vue.component('inspections', {
	
	template : '#inspections',

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
	path : "/inspections/",
	component : Vue.options.components['inspections'],
	page : {
		title : '',
	},
});
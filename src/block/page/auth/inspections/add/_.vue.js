
Vue.component('inspections-add', {
	
	template : '#inspections-add',

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
	path : "/inspections/add/",
	component : Vue.options.components['inspections-add'],
	page : {
		title : '',
	},
});
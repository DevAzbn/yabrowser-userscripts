
Vue.component('inspections-edit', {
	
	template : '#inspections-edit',

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
	path : "/inspections/edit/",
	component : Vue.options.components['inspections-edit'],
	page : {
		title : '',
	},
});
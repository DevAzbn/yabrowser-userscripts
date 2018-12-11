
Vue.component('inspections-view', {
	
	template : '#inspections-view',

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
	path : "/inspections/view/",
	component : Vue.options.components['inspections-view'],
	page : {
		title : '',
	},
});
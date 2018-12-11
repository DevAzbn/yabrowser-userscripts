
Vue.component('shows-edit', {
	
	template : '#shows-edit',

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
	path : "/shows/edit/",
	component : Vue.options.components['shows-edit'],
	page : {
		title : '',
	},
});
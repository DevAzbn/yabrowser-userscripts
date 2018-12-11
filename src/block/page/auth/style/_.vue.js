
Vue.component('style', {
	
	template : '#style',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],

	props : [
		
	],
	
	data : function () {
		return {
			
		};
	},
	
});

vueRoutes.push({
	path : "/style/",
	component : Vue.options.components['style'],
	page : {
		title : '',
	},
});
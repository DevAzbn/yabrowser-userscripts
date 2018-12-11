
Vue.component('common-app-public', {
	
	template : '#common-app-public',

	mixins : [
		vueMixins.common,
		vueMixins.public,
	],
	
	props : [
		
	],

	inject : [
		
	],
	
	data : function() {
		return {
			flags : {
				
			},
		};
	},

});

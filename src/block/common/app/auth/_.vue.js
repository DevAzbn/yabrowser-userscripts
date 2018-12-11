
Vue.component('common-app-auth', {
	
	template : '#common-app-auth',

	mixins : [
		vueMixins.common,
		vueMixins.auth,
	],
	
	props : [
		
	],

	inject : [
		
	],

	data : function() {
		return {
			session : this.$store.getters.getSession(),
		};
	},

	mounted: function () {
		
		/*
		this.$nextTick(function () {
			//после монтирования всех потомков в дерево DOM
		});
		*/
		
	},

	methods : {
	},
	
});

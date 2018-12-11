
Vue.component('common-menu', {
	
	template : '#common-menu',

	mixins : [
		vueMixins.common,
	],
	
	props : [
		'menutype',
		'children',
	],

	inject : [
		
	],
	
	data : function () {
		return {
			items : this.children ? this.children : this.$store.state.menu[this.menutype],//vueData.menu
		};
	},
	
});

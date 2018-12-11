<template>
	<div id="app-wp" v-cloak >
		
		<ul>
			<li v-for="(item, index) in users" v-bind:key="index" >
				<profile-default v-bind:item="item" v-bind:key="item.id" v-on:btn="onBtn($event)" ></profile-default>
			</li>
		</ul>
		
	</div>
</template>

<script>
import ProfileDefault from './profile/default.vue';

export default {
	//props : ['user'],
	name : 'app2',
	components : {
		ProfileDefault,
	},
	data : function () {
		return {
			users : [
				{
					id : 5,
					uid : 'user0001',
					login : 'user0001',
					last_visit : '16 Feb 2018',
				}
			],
		};
	},
	computed : {
		full_name: function(){
			return this.first_name + this.last_name; //Вася Пупкин   
		},
	},
	methods: {
		// методы жизненного цикла
		beforeCreate: function(){},
		created: function(){},
		beforeMount: function(){},
		mounted: function(){},
		beforeUpdate: function(){},
		updated: function(){},
		beforeDestroy: function(){},
		destroyed: function(){},
		customMethodsAlso: function(){
			//здесь у нас тоже есть доступ к data
		},
		onBtn : function(item_id) {
			//if (event) {
			//	alert(event.target.tagName)
			//}
			window.alert(item_id);
		},
	},
}
</script>

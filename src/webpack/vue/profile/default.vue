<template>
	<div class="profile _default" v-bind:data-item-id="item.id" >
		<img class="__image" src="http://i.pravatar.cc/60">
		<a class="__link" v-bind:href="item.uid" >@{{item.login}}</a>
		<br />
		<span class="__last_visit" >{{item.last_visit}}</span>
		<br />
		<button class="" v-on:click="$emit('btn', item.id)" >btn</button>
		<!--<span v-html="rawHtml"></span>-->
	</div>
</template>

<script>
export default {
	props : [
		'item'
	],
	name : 'profile-default',
	data : function () {
		return {
			
		}
	},
	computed : {
		
	},
	methods: {
		
	},
}
</script>
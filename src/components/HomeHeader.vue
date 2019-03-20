<template>
	<div id="headerBar">
		<a href="">{{username}}, </a>
		<a href="" @click="logout">登出</a>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'HomeHeader',
	data () {
		return {
			username: sessionStorage.getItem('authorized')
		}
	},
	methods: {
		logout: function () {
			sessionStorage.removeItem('authorized');
			this.$cookies.remove('PHPSESSID');
			axios.get('http://localhost:8080/EMS_TP5/public/index.php/api/Index/logout')
			.then(response => {
				console.log(response.data);
			})
			.catch(error => {
				console.log(error);
			})
		}
	}
}
</script>

<style scoped>
	#headerBar {
		width: 100px;
		height: 50px;
		line-height: 50px;
		float: right;
		text-align: end;
	}
</style>
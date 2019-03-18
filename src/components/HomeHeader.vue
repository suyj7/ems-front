<template>
	<el-row type="flex" justify="end">
		<el-col :span="2">
		<a href="">{{username}}, </a>
		<a href="" @click="logout">登出</a>
		</el-col>
	</el-row>
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
			this.$router.push('/');
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
.el-row, .el-col {
	height: 60px;
	line-height: 60px;
}
</style>
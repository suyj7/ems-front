<template>
	<el-row type="flex" justify="end">
		<el-col :span="2">
		<span @click="logout">登出</span>
		</el-col>
	</el-row>
</template>

<script>
import axios from 'axios';

export default {
	name: 'HomeHeader',
	methods: {
		logout: function () {
			this.$store.commit('logout');
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

.el-col {
	text-decoration: underline;
}
</style>
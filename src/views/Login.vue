<template>
	<el-form 
		ref="form" 
		:model="form" 
		:rules="rules" 
		label-width="80px" style="width: 300px; margin: 100px auto"
		@submit.native.prevent>
		<el-form-item label="用户名" prop="username">
			<el-input v-model="form.username" maxlength="100"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="form.password" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" native-type="submit" @click="onSubmit" style="width: 100%">登录</el-button>
		</el-form-item>
	</el-form>  
</template>

<script>
import axios from 'axios'


export default {
	name: 'login',
	data() {
		return {
			form: {
				username: '',
				password: ''
			},
			rules: {
				username: [
					{required: true, message: '请输入用户名', trigger: 'blur'}
				],
				password: [
					{required: true, message: '请输入密码', trigger: 'blur'}
				]
			}
		}
	},
	methods: {
		onSubmit: function () {
			console.log(this.$store.state)
			this.$refs['form'].validate(valid => {
				if (valid) {
					axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/login', {
						username: this.form.username,
						password: this.form.password
					})
					.then(response => {
						if (response.data.status === 0) {
							this.$message.error(response.data.message);
						} else if (response.data.status === 1) {
							this.$store.commit('login');
							this.$router.push('/home');
						} else {
							console.log(response.data.message);
						}
					})
					.catch(error => {
						console.log(error);
					});
				}
			});
		}
	}  
}
</script>

<style>
<style>
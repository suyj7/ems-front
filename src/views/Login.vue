<template>
	<el-form 
		ref="form" 
		:model="form" 
		:rules="rules" 
		label-width="80px" 
		style="width: 300px; margin: 100px auto"
		@submit.native.prevent>
		<el-form-item label="用户名" prop="username">
			<el-input ref="name" v-model="form.username" maxlength="100"></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="form.password" show-password></el-input>
		</el-form-item>
		<el-form-item label="验证码" prop="captcha">
			<el-row type="flex" justify="space-between">
				<el-col :span="9">
					<el-input v-model="form.captcha"></el-input>
				</el-col>
				<el-col :span="14">
					<div @click="changeCaptcha" style="cursor: pointer"><img :src="captcha_src" width="130px" height="40px" /></div>				
				</el-col>
			</el-row>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" native-type="submit" @click="onSubmit" style="width: 100%">登录</el-button>
		</el-form-item>
	</el-form>  
</template>

<script>
import axios from 'axios'

axios.defaults.withCredentials = true;

export default {
	name: 'login',
	data() {
		return {
			form: {
				username: '',
				password: '',
				captcha: ''
			},
			rules: {
				username: [
					{required: true, message: '请输入用户名', trigger: 'blur'}
				],
				password: [
					{required: true, message: '请输入密码', trigger: 'blur'}
				],
				captcha: [
					{required: true, message: '请输入验证码', trigger: 'blur'}
				]
			},
			captcha_src: ''
		}
	},
	methods: {
		onSubmit: function () {
			this.$refs['form'].validate(valid => {
				if (valid) {
					axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/login', {
						username: this.form.username,
						password: this.form.password,
						captcha: this.form.captcha
					})
					.then(response => {
						if (response.data.status === 0) {
							//登录失败
							this.$message.error(response.data.message);
							
							//清空表单
							this.$refs['form'].resetFields();
							this.$refs['name'].focus();
							
							//请求captcha
							this.changeCaptcha();
							
						} else if (response.data.status === 1) {
							//登录成功
							sessionStorage.setItem('authorized', this.form.username);
							this.$router.push('/home');
							
						} else {
							//登录异常
							console.log(response.data.message);
						}
					})
					.catch(error => {
						console.log(error);
					});
				}
			});
		},
		changeCaptcha: function () {			
			this.captcha_src = this.captcha_src + '?id=' + Date.parse(new Date())/1000;
		}
	},
	created () {
		//请求captcha
		this.$cookies.remove('PHPSESSID');
		axios.get("http://localhost:8080/EMS_TP5/public/index.php/api/Index/getCaptcha")
		.then(response => {
			this.captcha_src = "http://localhost:8080" + response.data;
			console.log(this.captcha_src)
		})
		.catch(error => {
			console.log(error);
		});
	}
}
</script>

<style>
<style>
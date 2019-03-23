<template>
	<div id="login_background" :style="{backgroundImage: 'url(' + require('../assets/bg.jpg') + ')'}">
		<div id="login_form_container">
			<div id="login_form_wrapper">
				<el-form 
					ref="form" 
					:model="form" 
					:rules="rules" 
					label-width="75px" 
					@submit.native.prevent>
					<el-form-item label="用户名" prop="username">
						<el-input 
							ref="name" 
							v-model="form.username" 
							maxlength="100"
							clearable>
						</el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input 
							v-model="form.password" 
							show-password>
						</el-input>
					</el-form-item>
					<el-form-item label="验证码" prop="captcha">
						<el-row type="flex" justify="space-between">
							<el-col :span="9">
								<el-input v-model="form.captcha"></el-input>
							</el-col>
							<el-col :span="14">
								<div id="captcha_wrapper" @click="changeCaptcha" style="cursor: pointer; float: right;" v-loading="loading">
									<img :src="captcha_src" width="130px" height="40px" />
								</div>				
							</el-col>
						</el-row>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" native-type="submit" @click="onSubmit" style="width: 100%">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
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
			captcha_src: '',
			loading: true
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
		
		//请求图像验证码
		this.$cookies.remove('PHPSESSID');
		this.loading = true;
		axios.get("http://localhost:8080/EMS_TP5/public/index.php/api/Index/getCaptcha")
		.then(response => {
			this.captcha_src = "http://localhost:8080" + response.data;
			this.loading = false;
		})
		.catch(error => {
			console.log(error);
		});
		
	}
}
</script>

<style scoped>
	#login_background {
		width: 100%;
		height: 100%;
		position: relative;
		background-size: 100% 100%;
		background-position: fixed;
		z-index: 1;
	}
	
	#login_background:after{
		content: "";
		width:100%;
		height:100%;
		position: absolute;
		left:0;
		top:0;
		background: inherit;
		filter: blur(1px);
		z-index: -2;
	}
	
	.el-form {
		z-index: 10;
	}
	
	#login_form_container {
		width: 385px;
		padding-top: 100px; 
		margin: 0 auto;
	}
	
	#login_form_wrapper {
		width: 310px;
		padding: 50px 0px;
		padding-right: 75px;
		border-radius: 6px;
		background-color: rgba(255,255,255,0.5);
	}
	
	#captcha_wrapper {
		height: 40px;
		width: 130px;
	}
</style>
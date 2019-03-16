<template>
	<el-form ref="form" :model="form" :rules="rules" label-width="80px" style="width: 300px; margin: 60px auto">
		<el-form-item label="用户名" prop="name">
			<el-input v-model="form.name" maxlength="100" autofocus></el-input>
		</el-form-item>
		<el-form-item label="密码" prop="password">
			<el-input v-model="form.password" show-password></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="" style="width: 100%">登录</el-button>
		</el-form-item>
	</el-form>  
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				form: {
					name: '',
					password: ''
				},
				rules: {
					name: [
						{required: true, message: '请输入用户名', trigger: 'blur'}
					],
					password: [
						{required: true, message: '请输入密码', trigger: 'blur'}
					]
				}
			}
		},
		methods: {
		}  
	}
</script>

<style>
<style>
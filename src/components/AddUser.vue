<template>
	<el-form :model="userForm" :rules="rules" ref="userForm" style="width: 500px">
		<el-form-item label="用户名" prop="user_name">
			<el-input v-model="userForm.user_name"></el-input>
		</el-form-item>
		<el-form-item label="初始密码" prop="password">
			<el-input v-model="userForm.password"></el-input>
		</el-form-item>
		<el-form-item label="用户身份（填写“user”或“admin”）" prop="authorization">
			<el-input v-model="userForm.authorization"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm">提交</el-button>
			<el-button type="danger" @click="toUserManage">返回</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import axios from 'axios';
	
	export default {
		data () {
			return {
				userForm: {
					user_name: '',
					password: '',
					authorization: ''
				},
				rules: {
					user_name: [{
						required: true, message: "请输入用户名", trigger: 'blur'
					}],
					password: [{
						required: true, message: '请输入密码', trigger: 'blur'
					}],
					authorization: [{
						required: true, message: '请输入用户身份', trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			toUserManage() {
				this.$confirm('此操作将丢失表单内容，是否继续', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push('/home/userManage');
				}).catch();
			},
			submitForm() {
				this.$refs['userForm'].validate(valid => {
					if(valid) {
						axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/addUser', {
							user_name: this.userForm.user_name,
							password: this.userForm.password,
							authorization: this.userForm.authorization
						}).then(response => {
							if (response.data == 1){
								this.$message({
									message: '新增数据保存成功',
									type: 'success'
								});
								this.$router.push('/home/userManage')
							}else {
								this.$message.error('新增数据保存失败');
							}
						}).catch(error => {
							console.log(error);
						});
					}else {
						return false;
					}
				});
			}
			
		}
	}
</script>

<style scoped>
</style>
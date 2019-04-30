<template>
	<el-form :model="deviceForm" :rules="rules" ref="deviceForm" style="width: 500px">
		<el-form-item label="设备编号" prop="device_number">
			<el-input v-model="deviceForm.device_number"></el-input>
		</el-form-item>
		<el-form-item label="设备地址" prop="address">
			<el-input v-model="deviceForm.address"></el-input>
		</el-form-item>
		<el-form-item label="设备经度" prop="longitude">
			<el-input v-model="deviceForm.longitude"></el-input>
		</el-form-item>
		<el-form-item label="设备纬度" prop="latitude">
			<el-input v-model="deviceForm.latitude"></el-input>
		</el-form-item>
		<el-form-item label="设备归属用户" prop="user_name">
			<el-input v-model="deviceForm.user_name"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="submitForm">提交</el-button>
			<el-button type="danger" @click="toDeviceManage">返回</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
	import axios from 'axios';
	
	export default {
		data () {
			return {
				deviceForm: {
					device_number: '',
					address: '',
					longitude: '',
					latitude: '',
					user_name: ''
				},
				rules: {
					device_number: [{
						required: true, message: "请输入设备编号", trigger: 'blur'
					}],
					address: [{
						required: true, message: "请输入设备地址", trigger: 'blur'
					}],
					longitude: [{
						required: true, message: "请输入设备经度", trigger: 'blur'
					}],
					latitude: [{
						required: true, message: "请输入设备纬度", trigger: 'blur'
					}],
					user_name: [{
						required: true, message: "请输入设备归属用户", trigger: 'blur'
					}],
				}
			}
		},
		methods: {
			toDeviceManage() {
				this.$confirm('此操作将丢失表单内容，是否继续', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push('/home/deviceManage');
				}).catch();
			},
			submitForm() {
				this.$refs['deviceForm'].validate(valid => {
					if(valid) {
						axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/addDevice', {
							device_number: this.deviceForm.device_number,
							address: this.deviceForm.address,
							longitude: this.deviceForm.longitude,
							latitude: this.deviceForm.latitude,
							user_name: this.deviceForm.user_name
						}).then(response => {
							if (response.data == 1){
								this.$message({
									message: '新增数据保存成功',
									type: 'success'
								});
								this.$router.push('/home/deviceManage')
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
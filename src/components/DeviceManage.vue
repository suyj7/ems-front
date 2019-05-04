<template>
	<div>
		<div style="padding: 5px">
			<el-button type="primary" @click="toAddDevice">新增设备</el-button>
		</div>
		<el-table
			:data="tabledata"
			border
			stripe
			style="width: 100%">
			<el-table-column
				prop="device_number"
				label="设备编号">
			</el-table-column>
			<el-table-column
				prop="address"
				label="设备地址">
			</el-table-column>
			<el-table-column
				prop="longitude"
				label="设备经度">
			</el-table-column>
			<el-table-column
				prop="latitude"
				label="设备纬度">
			</el-table-column>
			<el-table-column
				prop="user_name"
				label="设备归属用户">
			</el-table-column>
			<el-table-column
				label="操作">
				<template slot-scope="scope">
					<el-button type="danger" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import axios from 'axios';
	
	export default {
		data() {
			return {
				tabledata: []
			}
		},
		methods: {
			toAddDevice: function () {
				this.$router.push('/home/addDevice');
			},
			handleDelete: function (row) {
				this.$confirm('是否确定删除设备[ '+row.device_number+' ]？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/deleteDevice', {
						device_number: row.device_number
					}).then(response => {
						if (response.data == 1) {
							this.$message.success('删除操作成功');
							//重新获取数据
							axios.get('http://localhost:8080/EMS_TP5/public/index.php/api/Index/getAllDevice').then(response => {
								this.tabledata = response.data;
							}).catch(error => {
								console.log(error);
							})
						}else {
							this.$message.error('删除操作失败');
						}
					}).catch(error => {
						console.log(error);
					});
				}).catch();
				
			}
		},
		created () {
			axios.get('http://localhost:8080/EMS_TP5/public/index.php/api/Index/getAllDevice').then(response => {
				this.tabledata = response.data;
			}).catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style scoped>
</style>

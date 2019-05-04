<template>
	<div>
		<div style="padding: 5px">
			<el-button type="primary" @click="toAddUser">新增用户</el-button>
		</div>
		<el-table
			:data="tabledata"
			border
			stripe
			style="width: 100%">
			<el-table-column
				prop="user_name"
				label="用户名">
			</el-table-column>
			<el-table-column
				prop="authorization"
				label="身份">
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
		methods:{
			toAddUser: function () {
				this.$router.push('/home/addUser');
			},
			handleDelete: function (row) {
				this.$confirm('是否确定删除该用户[ '+row.user_name+' ]', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/deleteUser', {
						user_name: row.user_name
					}).then(response => {
						if (response.data == 1) {
							this.$message.success('删除操作成功');
							//重新获取数据
							axios.get('http://localhost:8080/EMS_TP5/public/index.php/api/Index/getAllUser').then(response => {
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
			axios.get('http://localhost:8080/EMS_TP5/public/index.php/api/Index/getAllUser').then(response => {
				this.tabledata = response.data;
			}).catch(error => {
				console.log(error);
			})
		}
	}
</script>

<style scoped>
</style>

<template>
	<div style="display: inline-block;">
		<span @click="logoutComfirm" style="cursor: pointer; text-decoration: underline">登出</span>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="30%">
			<span>确定进行[ 登出 ]操作？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="danger" @click="logout">确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios';
	
	export default {
		data () {
			return {
				dialogVisible: false
			}
		},
		methods: {
			logoutComfirm: function () {
				this.dialogVisible = true;
			},
			logout: function () {
				this.dialogVisible = false
				sessionStorage.removeItem('authorized');
				this.$cookies.remove('PHPSESSID');
				this.$router.push('/login');
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

<style scooped>
</style>
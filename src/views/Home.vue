<template>
	<div class="home">
		<el-container>
			<el-aside style="width: ;">
				<el-menu 
					class="el-menu-vertical"
					style="height: 100%" 
					background-color="#263238"
					text-color="#C5CBCF"
					default-active="1"
					:collapse="isCollapse"
				>
					<div class="menu-header">基于云服务的环境检测系统</div>
					<el-menu-item @click="toDataPanel" index="1">
						<i class="el-icon-location"></i>
						<span slot="title">实时监控</span>
					</el-menu-item>
					<el-menu-item @click="toDataList" index="2">
						<i class="el-icon-document"></i>
						<span slot="title">设备列表</span>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-download"></i>
						<span slot="title">数据导出</span>
					</el-menu-item>
					<el-menu-item index="4">
						<i class="el-icon-setting"></i>
						<span slot="title">用户中心</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header height="50px">
					<i class="el-icon-menu" @click="toggleCollapse"></i>
					<div id="headerBar">
						<span>{{username}}, </span>
						<span @click="logoutComfirm" style="cursor: pointer; text-decoration: underline">登出</span>
					</div>
				</el-header>
				<el-main style="padding: 5px;">
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
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
// @ is an alias to /src
import axios from 'axios';

export default {
	name: 'home',
	data () {
		return {
			username: sessionStorage.getItem('authorized'),
			dialogVisible: false,
			isCollapse: false
		}
	},
	methods: {
		toDataList: function() {
			this.$router.push('/home/datalist');
		},
		toDataPanel: function() {
			this.$router.push('/home');
		},
		toggleCollapse: function () {
			this.isCollapse = !this.isCollapse;
			document.querySelector('.menu-header').innerHTML = '';
		},
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

<style lang="scss" scoped>
	.home {
		height: 100%;
		
		.el-container {
			height: 100%;
			background-color: rgba(0,0,0,0.02);
			
			.el-header {
				line-height: 50px;
				box-shadow: 0 2px 4px rgba(0, 0, 0, .12);
				background-color: white;
				
				.el-icon-menu {
					line-height: 50px;
				}
				
				#headerBar {
					float: right;
					text-align: end;
				}
			}
			
			.el-main {
				margin: 15px 15px;
				background-color: white;
				border-radius: 2px;
			}
			
			.menu-header {
				height: 50px;
				line-height: 50px;
				background-color: rgb(23, 179, 163);
				font-family: SimHei;
				font-size: 1.2rem;
				font-weight: bold;
				text-align: center;
				color: white;
			}
			
			.el-menu-item {
				font-family: Microsoft Yahei;
			}
			
			.el-menu-vertical:not(.el-menu--collapse) {
				width: 250px;
				min-height: 400px;
			}
		}
	}
</style>

<template>
	<div class="home">
		<el-container>
			<el-aside style="width: ;">
				<el-menu 
					class="el-menu-vertical"
					style="height: 100%" 
					background-color="#263238"
					text-color="#C5CBCF"
					:default-active="defaultActive"
					:collapse="isCollapse"
					:collapse-transition="false"
				>
					<div class="menu-header">基于云服务的环境检测系统</div>
					<el-menu-item @click="toDeviceLocation" index="">
						<i class="el-icon-location"></i>
						<span slot="title">设备分布</span>
					</el-menu-item>
					<el-menu-item @click="toLatestData" index="realtime">
						<i class="el-icon-document"></i>
						<span slot="title">最新数据</span>
					</el-menu-item>
					<el-menu-item @click="toHistoryData" index="history">
						<i class="el-icon-download"></i>
						<span slot="title">历史数据</span>
					</el-menu-item>
					<el-menu-item v-if="this.authorization == 'admin'" @click="toUserManage" index="userManage">
						<i class="el-icon-setting"></i>
						<span slot="title">用户管理</span>
					</el-menu-item>
					<el-menu-item v-if="this.authorization == 'admin'" @click="toDeviceManage" index="deviceManage">
						<i class="el-icon-setting"></i>
						<span slot="title">设备管理</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header height="50px">
					<i id="menu_toggle_icon" class="el-icon-menu" @click="toggleCollapse" style="cursor: pointer;" title="导航栏切换"></i>
					<div id="headerBar">
						<span>{{username}}, </span>
						<Logout />
					</div>
				</el-header>
				<el-main style="padding: 5px;">
					<router-view/>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
// @ is an alias to /src
import Logout from '@/components/Logout.vue';

export default {
	name: 'home',
	data () {
		return {
			username: sessionStorage.getItem('authorized'),
			dialogVisible: false,
			isCollapse: false,
			authorization: sessionStorage.authorization
		}
	},
	computed: {
		defaultActive() {
			return this.$route.path.split('/')[2];
		}
	},
	methods: {
		toDeviceLocation: function () {
			this.$router.push('/home/');
		},
		toLatestData: function() {
			this.$router.push(sessionStorage.getItem('latestDataUrl'));
		},
		toHistoryData: function() {
			this.$router.push(sessionStorage.getItem('historyDataUrl'));
		},
		toDeviceManage: function() {
			this.$router.push('/home/deviceManage');
		},
		toUserManage: function() {
			this.$router.push('/home/userManage');
		},
		changeMenuTitle: function () {
			if (this.isCollapse) {
				document.querySelector('.menu-header').innerHTML = '云服务';
			} else {
				document.querySelector('.menu-header').innerHTML = '基于云服务的环境检测系统';
			}
		},
		toggleCollapse: function () {
			//导航栏折叠切换
			this.isCollapse = !this.isCollapse;
			
			setTimeout(this.changeMenuTitle, 0);
		}
	},
	components: {
		Logout
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
			}
		}
	}
</style>

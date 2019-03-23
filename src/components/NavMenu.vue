<template>
	<el-menu 
		style="height: 100%" 
		background-color="#263238"
		text-color="#C5CBCF"
		default-active="1"
		>
		<div class="header">
			环境监测管理系统
		</div>
		<el-menu-item @click="toDataPanel" index="1">
			<i class="el-icon-menu"></i>
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
</template>

<script>
	export default {
		name: 'NavMenu',
		methods: {
			toDataList: function() {
				this.$router.push('/home/datalist');
			},
			toDataPanel: function() {
				this.$router.push('/home');
			}
		}
	}
</script>

<style scoped>
	.header {
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
</style>
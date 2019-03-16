<template>
	<el-menu style="height: 100%">
		<h3>环境监测管理系统</h3>
		<el-menu-item @click="toDataPanel">
			<i class="el-icon-menu"></i>
			<span slot="title">实时监控</span>
		</el-menu-item>
		<el-menu-item @click="toDataList">
			<i class="el-icon-document"></i>
			<span slot="title">设备列表</span>
		</el-menu-item>
		<el-menu-item>
			<i class="el-icon-download"></i>
			<span slot="title">数据导出</span>
		</el-menu-item>
		<el-menu-item>
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
				this.$router.push('/home/datapanel');
			}
		}
	}
</script>
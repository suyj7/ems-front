<template>
  <el-container height>
    <el-aside width="30px"></el-aside>
	<el-container>
	  <el-header height="30px">{{ name }}</el-header>
	  <el-footer height="30px">{{ value }}</el-footer>
	</el-container>
  </el-container>
</template>

<script>
  export default {
    name: 'DataComponent',
	props: {
	  name: String,
	  value: String
	}
  }
</script>

<style scoped>
.el-aside {
  background-color: silver;
}

.el-header, .el-footer {
  width: 150px;
  background-color: grey;
  line-height: 30px;
}
</style>
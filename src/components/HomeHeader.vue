<template>
  <el-row type="flex" justify="end">
    <el-col :span="2">登出
	</el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'HomeHeader'
  }
</script>

<style scoped>
.el-row, .el-col {
  height: 60px;
  line-height: 60px;
}

.el-col {
  text-decoration: underline;
}
</style>
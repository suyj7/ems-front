<template>
  <el-form ref="form" :model="form" label-width="80px" style="width: 300px; margin: 0 auto">
	<el-form-item label="用户名">
	  <el-input v-model="form.name" maxlength="100"></el-input>
	</el-form-item>
	<el-form-item label="密码">
	  <el-input v-model="form.password" show-password></el-input>
	</el-form-item>
	<el-form-item>
	  <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
	</el-form-item>
  </el-form>  
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
	  form: {
	    name: '',
		password: ''
	  }
	}
  },
  methods: {
    onSubmit() {
	  console.log('submit!');
	}
  }  
}
</script>

<style>
<style>
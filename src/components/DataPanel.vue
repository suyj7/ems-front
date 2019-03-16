<template>
  <div style="width: 800px; margin: 0 auto;">
  <el-row>
	<el-col :span="6">
	  <DataComponent name="风速" value="100km/h"></DataComponent>
	</el-col>
	<el-col :span="6">
	  <DataComponent name="温度" value="31’C"></DataComponent>
	</el-col>    
	<el-col :span="6">
	  <DataComponent name="湿度" value="63%RH"></DataComponent>
	</el-col>    
	<el-col :span="6">
	  <DataComponent name="PM2.5" value="59.0ug/m3"></DataComponent>
	</el-col>	
  </el-row>
  <el-row>
	<el-col :span="6">
	  <DataComponent name="风速" value="100km/h"></DataComponent>
	</el-col>
	<el-col :span="6">
	  <DataComponent name="温度" value="31’C"></DataComponent>
	</el-col>    
	<el-col :span="6">
	  <DataComponent name="湿度" value="63%RH"></DataComponent>
	</el-col>    
	<el-col :span="6">
	  <DataComponent name="PM2.5" value="59.0ug/m3"></DataComponent>
	</el-col>	
  </el-row>  
  <el-row>
	<el-col :span="6">
	  <DataComponent name="风速" value="100km/h"></DataComponent>
	</el-col>
	<el-col :span="6">
	  <DataComponent name="温度" value="31’C"></DataComponent>
	</el-col>    
	<el-col :span="6">
	  <DataComponent name="湿度" value="63%RH"></DataComponent>
	</el-col>    
	<el-col :span="6">
	  <DataComponent name="PM2.5" value="59.0ug/m3"></DataComponent>
	</el-col>	
  </el-row> 
  </div>
</template>

<script>
  import DataComponent from './DataComponent.vue'
  
  export default {
    name: 'DataPanel',
	components: {
	  DataComponent
	}
  }
</script>

<style scoped>
  .el-row {
    margin: 10px 0;
  }
</style>
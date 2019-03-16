<template>
  <el-table
    :data="tableData"
	style="width: 800px; margin: 10px auto;"
  >
    <el-table-column
	  prop="number"
	  label="设备编号"
	  width="180"
	>
	</el-table-column>
    <el-table-column
	  prop="name"
	  label="设备名称"
	  width="180"
	>
	</el-table-column>
    <el-table-column
	  prop="value"
	  label="数据值"
	  width="180"
	>
	</el-table-column>    
	<el-table-column
	  prop="time"
	  label="数据更新时间"
	>
	</el-table-column>	
  </el-table>
</template>

<script>
  export default {
    name: 'DataList',
	data() {
	  return {
	    tableData: [{
		  number: 'CH-01',
		  name: '',
		  value: '89.9',
		  time: '2019-03-11 13:21:89'
		},{
		  number: 'CH-02',
		  name: '',
		  value: '18.9',
		  time: '2019-03-11 13:21:89'
		},{
		  number: 'CH-03',
		  name: '',
		  value: '44.9',
		  time: '2019-03-11 13:21:89'
		},{
		  number: 'CH-04',
		  name: '',
		  value: '89.0',
		  time: '2019-03-11 13:21:89'
		}]
	  }
	}
  }
</script>
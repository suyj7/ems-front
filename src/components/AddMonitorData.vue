<template>
	<button @click="submitData">CLICK</button>
</template>

<script>
	import axios from 'axios';
	
	export default {
		methods: {
			submitData: function() {
				axios.post('http://localhost:8080/EMS_TP5/public/index.php/api/Index/addMonitorData', {
					data: [['3', '34', '10', '20', '100', '30', '2019-04-09 19:21:58']]
				}).then(response => {
					console.log(response.data);
				}).catch(error => {
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped>
</style>
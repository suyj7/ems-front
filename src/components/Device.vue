<template>
	<div id="main">
	
	</div>
</template>

<script>
	import axios from 'axios';
	require('../../node_modules/echarts/extension/bmap/bmap.js');
	
	
	
	export default {
		mounted () {
			var devices = [];
	
			var convertDevices = function (devices) {
				var res = [];
				for (var i = 0; i < devices.length; i ++) {
					res.push({
						name: devices[i].address,
						value: [devices[i].longitude, devices[i].latitude, devices[i].device_number]
					});
				}
				
				return res;
			};
			
				
			var option = {
			// backgroundColor: '#404a59',
			title: {
				text: '基于云服务的环境检测系统',
				subtext: '设备分布图',
				sublink: 'http://www.cnemc.cn/',
				left: 'center',
				textStyle: {
					color: '#fff'
				}
			},
			tooltip : {
				trigger: 'item',
				formatter: "{b}"
			},
			bmap: {
				center: [104.114129, 37.550339],
				zoom: 5,
				roam: true,
				mapStyle: {
					styleJson: [
							{
								"featureType": "water",
								"elementType": "all",
								"stylers": {
									"color": "#044161"
								}
							},
							{
								"featureType": "land",
								"elementType": "all",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "boundary",
								"elementType": "geometry",
								"stylers": {
									"color": "#064f85"
								}
							},
							{
								"featureType": "railway",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "highway",
								"elementType": "geometry",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "highway",
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#005b96",
									"lightness": 1
								}
							},
							{
								"featureType": "highway",
								"elementType": "labels",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "geometry",
								"stylers": {
									"color": "#004981"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#00508b"
								}
							},
							{
								"featureType": "poi",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "green",
								"elementType": "all",
								"stylers": {
									"color": "#056197",
									"visibility": "off"
								}
							},
							{
								"featureType": "subway",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "manmade",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "local",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "arterial",
								"elementType": "labels",
								"stylers": {
									"visibility": "off"
								}
							},
							{
								"featureType": "boundary",
								"elementType": "geometry.fill",
								"stylers": {
									"color": "#029fd4"
								}
							},
							{
								"featureType": "building",
								"elementType": "all",
								"stylers": {
									"color": "#1a5787"
								}
							},
							{
								"featureType": "label",
								"elementType": "all",
								"stylers": {
									"visibility": "off"
								}
							}
					]
				}
			}
		};
			
		var myChart = this.$echarts.init(document.getElementById('main'));
		myChart.setOption(option);
		//点击事件处理函数
		myChart.on('click', (params) => {
			//修改url
			sessionStorage.setItem('latestDataUrl', '/home/realtime/'+params.data.name+'?deviceNumber='+params.data.value[2]);
			sessionStorage.setItem('historyDataUrl', '/home/history/'+params.data.name+'?deviceNumber='+params.data.value[2]);
			
			this.$router.push(sessionStorage.getItem('latestDataUrl'));
		});
		document.querySelector('#menu_toggle_icon').onclick = () => myChart.resize();
		document.querySelector('body').onresize = () => myChart.resize();
		//设置获取设备信息的Url
		var url = 'http://localhost:8080/EMS_TP5/public/index.php/api/Index/';
		url = sessionStorage.getItem('authorization') === 'admin' ? url + 'getAllDevice' : url + 'getDevice';
		
		axios.post(url, {
			user: sessionStorage.getItem('authorized')
		}).then(response => {
			devices = response.data;
			//设置默认url
			sessionStorage.setItem('latestDataUrl', '/home/realtime/'+devices[0].address+'?deviceNumber='+devices[0].device_number);
			sessionStorage.setItem('historyDataUrl', '/home/history/'+devices[0].address+'?deviceNumber='+devices[0].device_number);
			
			myChart.setOption({
				series : [
					{
						name: '设备',
						type: 'effectScatter',
						coordinateSystem: 'bmap',
						data: convertDevices(devices),
						symbolSize: 10,
						showEffectOn: 'emphasis',
						rippleEffect: {
							brushType: 'fill'
						},
						hoverAnimation: true,
						label: {
							normal: {
								formatter: '{a}',
								position: 'right',
								show: false
							}
						},
						itemStyle: {
							normal: {
								color: '#f4e925',
								shadowBlur: 10,
								shadowColor: '#333'
							}
						},
						zlevel: 1
					}
				]
			});
		}).catch(error => {
			console.log(error);
		});
		}
	}
</script>

<style scoped>
	#main {
		width: 100%;
		height: 100%;
	}
</style>
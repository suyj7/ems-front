<template>
	<div id="chart"></div>
</template>

<script>

	export default {
		data () {
			return {
				name: ''
			}
		},
		mounted () {
			//查看历史数据
			function checkHistory () {
				this.$router.push('/home/history');
			}
			var checkHistoryInChart = checkHistory.bind(this);
			
			var chart = this.$echarts.init(document.getElementById('chart'));
			var option = {
				backgroundColor:'#fff',
				"toolbox": {
					padding: [5, 20, 5, 5],
					"feature": {
						"saveAsImage": {
							"type": "svg"
						},
						"myFeature": {
							show: true,
							title: "历史数据",
							icon: "image://" + require('../assets/历史数据.png'),
							onclick: checkHistoryInChart
						}
					}
				},
				"tooltip": {
					"trigger": "axis",
					"axisPointer": {
						"type": "shadow"
					},
					"formatter": function (params) {
						return params[1].seriesName + ": " + params[1].data;
					}
				},
				"legend": {
					"data": [{
						"name": "实际值",
						"icon": "circle"
					}, {
						"name": "低于较差区间",
						"icon": "circle"
					}, {
						"name": "较差区间",
						"icon": "circle"
					}, {
						"name": "中间区间",
						"icon": "circle"
					}, {
						"name": "良好区间",
						"icon": "circle"
					}, {
						"name": "优秀区间",
						"icon": "circle"
					}],
					"selectedMode": false,
					right: 20,
					top: 40
				},
				"title": [{
					"left": "center",
					"text": this.$route.params.name + "环境监测子弹图"
				}, {
					"text": "数据来源：中国环境监测总站",
					"borderWidth": 0,
					"textStyle": {
						"fontSize": 10,
						"fontWeight": "normal"
					},
					"x": 5,
					"y2": 0
				}, {
					"text": "更新时间：20190205",
					"borderWidth": 0,
					"textStyle": {
						"fontSize": 10,
						"fontWeight": "normal"
					},
					"x": 5,
					"y2": 18,
					"show": true
				}, {
					"text": "©环境监测系统",
					"borderColor": "#999",
					"borderWidth": 0,
					"textStyle": {
						"fontSize": 10,
						"fontWeight": "normal"
					},
					"x": "right",
					"y2": 0
				}],
				"yAxis": {
					"data": ["温度", "湿度", "甲醛", "光照", "PM2.5", "PM10"],
					"splitLine": {
						"show": false
					},
					splitArea: {
						show: false
					}
				},
				"xAxis": {
					"splitLine": {
						"show": false
					},
					"axisLine": {
						"show": false,
					},
					"axisTick": {
						"show": false,
					},
					"axisLabel": {
						"show": false,
					}
				},
				"color": ["rgba(255,255,255,0)", "#e23273"],
				"series": [{
					"type": "bar",
					"name": "目标值",
					"data": [100, 100, 100, 100, 100, 100],
					"barWidth": 30,
					"z": 9
				}, {
					"type": "custom",
					"name": "实际值",
					"data": [88, 83, 94, 76, 62, 45],
					"z": 10,
					renderItem: (_, api) => {
						const [x, y] = api.coord([api.value(0), api.value(1)]);
						return {
							type: 'group',
							children: [{
								type: 'line',
								shape: {
									x1: x,
									x2: x,
									y1: y - 30,
									y2: y + 20,
								},
								style: {
									stroke: api.visual('color'),
									lineWidth: 4
								}
							}]
						};
					},
				}, {
					"type": "bar",
					"barWidth": 50,
					"barGap": "-130%",
					"stack": "指标范围",
					"silent": true,
					"name": "低于较差区间",
					"data": [30, 35, 40, 35, 35, 20],
					"itemStyle": {
						"color": "#d3d3d3"
					},
					"label": {
						"position": "insideRight",
						"show": true,
						"formatter" : function (params) {
							return params.dataIndex;
						}
					}
				}, {
					"type": "bar",
					"barWidth": 50,
					"barGap": "-130%",
					"stack": "指标范围",
					"silent": true,
					"name": "较差区间",
					"data": [20, 20, 15, 15, 13, 20],
					"itemStyle": {
						"color": "#FFA39E"
					},
					"label": {
						"position": "insideRight",
						"show": true,
						"formatter" : function (params) {
							return params.dataIndex;
						}
					}
				}, {
					"type": "bar",
					"barWidth": 50,
					"barGap": "-130%",
					"stack": "指标范围",
					"silent": true,
					"name": "中间区间",
					"data": [20, 20, 15, 22, 13, 20],
					"itemStyle": {
						"color": "#FFD591"
					},
					"label": {
						"position": "insideRight",
						"show": true,
						"formatter" : function (params) {
							return params.dataIndex;
						}
					}
				}, {
					"type": "bar",
					"barWidth": 50,
					"barGap": "-130%",
					"stack": "指标范围",
					"silent": true,
					"name": "良好区间",
					"data": [20, 20, 20, 18, 13, 20],
					"itemStyle": {
						"color": "#91D5FF"
					},
					"label": {
						"position": "insideRight",
						"show": true,
						"formatter" : function (params) {
							return params.dataIndex;
						}
					}
				}, {
					"type": "bar",
					"barWidth": 50,
					"barGap": "-130%",
					"stack": "指标范围",
					"silent": true,
					"name": "优秀区间",
					"data": [10, 5, 10, 10, 26, 20],
					"itemStyle": {
						"color": "#A7E8B4"
					},
					"label": {
						"position": "insideRight",
						"show": true,
						"formatter" : function (params) {
							return params.dataIndex;
						}
					}
				}]
			}
			chart.setOption(option);
			document.querySelector('#menu_toggle_icon').onclick = () => chart.resize();
			document.querySelector('body').onresize = () => chart.resize();
		}
	}
</script>

<style scoped>
	#chart {
		height: 100%;
		width: 100%;
	}
</style>
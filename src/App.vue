<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>

export default {
	name: 'app',
	components: {
	},
	beforeCreate () {
		//页面加载时读取sessionStorage里的store数据
		if (sessionStorage.getItem('state')) {
			console.log(this.$store.state)
			this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('state'))));
			console.log(this.$store.state)
		}
		
		//页面刷新时将store数据保存到sessionStorage里
		window.addEventListener('beforeunload', () => {
			sessionStorage.setItem('state', JSON.stringify(this.$store.state));
		});
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	heigth: 200px;
}

html, body, #app {
	height: 100%;
	margin: 0;
}
</style>

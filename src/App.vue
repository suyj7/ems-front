<template>
	<div id="app" v-loading="this.$store.state.appLoading">
		<router-view/>
	</div>
</template>

<script>

export default {
	name: 'app',
	components: {
	}
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

html, body, #app {
	height: 100%;
	margin: 0;
}
</style>

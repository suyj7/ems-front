<template>
	<div>
	{{this.msg}}，{{count}}秒后返回<a href="/login">登录页面</a>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				msg: this.$route.params.msg,
				count: 3
			}
		},
		mounted() {
			sessionStorage.removeItem('authorized');
			sessionStorage.removeItem('authorization');
			this.$cookies.remove('PHPSESSID');
			setInterval(() => {
				this.count --;
				if (this.count == 0) {
					this.$router.push('/login');
				}
			}, 1000);
		}
	}
</script>

<style scoped>
</style>
<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import appMixin from './App-mixins';
	import routes from 'javascripts/routers';
	import storage from 'javascripts/utils/storage';

	export default {
		mixins: [appMixin],
		data() {
			return {
				token: "defaulttoken"
			}
		},
		created() {
			let href = window.location.href.split('#');
			let router = href[1];
			if(!storage.get("token")) {
				this.$router.push("/login");
			}
			this.initializationEnv();
			this.initializationLogin(router);
		},
		mounted() {
			let self = this;
			self.$router.beforeEach((to, from, next) => {
				//this.initializationLogin(router);
				if(!storage.get("token")&&to.path!='/login') {
					return next("/login");
				}
				document.title = to ? to.meta.title : "后台管理";
				console.log("=======");
				next();
			});
		}
	};
</script>
<style scoped="scoped" lang="scss">
	div {
		height: 100%;
		width: 100%;
		max-width: 100%;
		overflow-x: hidden;
	}
</style>
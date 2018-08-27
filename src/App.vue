<template>
	<div>
		<router-view></router-view>
	</div>
</template>

<script type="text/javascript">
	import appMixin from './App-mixins';
	import routes from 'javascripts/routers';

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
			console.log("href=" + href);
			this.initializationEnv();
			this.initializationLogin(router);
		},
		mounted() {
			let self = this;
			self.$router.beforeEach((to, from, next) => {
				console.log("=======");
				next();
			});
		}
	};
</script>
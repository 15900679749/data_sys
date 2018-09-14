export default {
	methods: {
		initializationEnv() {
			// 接收参数	
		},
		initializationLogin(path, next) {
			let goPath = next || this.$router.push.bind(this.$router);
			
			console.log("token=" + this.token);			
			// return next('/home');
		}
	}
}
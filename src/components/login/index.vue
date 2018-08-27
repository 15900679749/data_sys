<template>
	<div class="divbg">login</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				lg: "login"
			}
		},
		methods: {},
		mounted() {
			console.log("login mounted");
		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import "~scss/common.scss";
	.divbg {
		width: 100px;
		height: 100px;
		border: 2px solid red;
	}
</style>
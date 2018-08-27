<template>
	<div >home1</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				d: "abc"
			}
		},
		methods: {},
		mounted() {
			console.log("d==" + this.d);
		}
	}
</script>

<style lang="scss">
	.hdiv {
		font-size: 20px;
	}
</style>
<template>
	<el-button icon="el-icon-plus" type="primary" round @click="establish">创建问卷</el-button>
</template>

<script>
	import bus from './eventBus';
	export default {
		data() {
			return {

			}
		},
		methods: {
			establish() {
				if(location.hash.endsWith("#/questionNaire")) {
					bus.$emit("getStatus", true);
				} else {
					bus.$emit("getStatustemp", true);
				}
				//return this.$router.push({path:'/edit/edit_template'});
			}
		},
		mounted() {

		}
	}
</script>

<style scoped="scoped" lang="scss">
	.el-button {
		text-align: right;
	}
</style>
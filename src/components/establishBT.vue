<template>
	<el-button icon="el-icon-plus" type="primary" round @click="establish">{{btnname}}</el-button>
</template>

<script>
	import bus from './eventBus';
	export default {
		data() {
			return {
				btnname:''
			}
		},
		
		methods: {
			establish() {
				if(location.hash.endsWith("#/questionNaire")) {
					this.btnname="创建问卷";
					bus.$emit("getStatus", true);
				} else {
					this.btnname="创建模板";
					bus.$emit("getStatustemp", true);
				}
				//return this.$router.push({path:'/edit/edit_template'});
			}
		},
		mounted() {

		},
		created() {
			if(location.hash.endsWith("#/questionNaire")) {
					this.btnname="创建问卷";
					
				} else {
					this.btnname="创建模板";
					
				}
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.el-button {
		text-align: right;
	}
</style>
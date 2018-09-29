<template>
	<el-button icon="el-icon-plus" type="primary" round @click="establish">{{btnname}}</el-button>
</template>

<script>
	import bus from './eventBus';
	import storage from 'javascripts/utils/storage';
	export default {
		data() {
			return {
				btnname: '',
				userlevel: 0,
			}
		},
		props: ["templist"],
		methods: {
			establish() {
				if(location.hash.endsWith("#/questionNaire")) {
					this.btnname = "创建问卷";
					bus.$emit("getStatus", true);
					this.$emit("gettmpList");
				} else {
					this.btnname = "创建模板";
					if(this.userlevel > 1) {
						this.$message({
							type: 'error',
							message: '对不起，您没有此权限'
						});
						return
					} else {
						bus.$emit("getStatustemp", true);
					}

				}
				//return this.$router.push({path:'/edit/edit_template'});
			}
		},
		mounted() {

		},
		created() {
			if(location.hash.endsWith("#/questionNaire")) {
				this.btnname = "创建问卷";

			} else {
				this.btnname = "创建模板";

			}
			this.userlevel = Number(JSON.parse(storage.get('user')).level)
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.el-button {
		text-align: right;
	}
</style>
<template>
 <el-button icon="el-icon-plus" type="primary" round @click="establish">创建问卷</el-button>
</template>

<script>
export default{
data(){
	return{
		
		}
	},
	methods:{
		establish(){
			return this.$router.push({path:'/edit/edit_template'});
		}
	},
	mounted() {
		
	}
}
</script>

<style scoped="scoped" lang="scss">
@import "~scss/common.scss";
.el-button{
	text-align: right;
}
</style>
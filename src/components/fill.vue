<template>
	<div>	
	<el-form >
	<el-form-item :label="item.labelname"  v-for="item in formlist">
		<el-input v-model="item.name"></el-input>
	</el-form-item>
	</el-form>
	
</div>
	
</template>

<script>
			import headTop from 'view/head/headTop.vue';
	export default{
		data(){
			return{		
			
			}
		},
		props: ["formlist"],
		methods: {
			
		},
		components:{
			headTop
		}
	}
</script>

<style scoped="scoped" lang="scss">
@import "~scss/common.scss";
.el-input{
	width:30%;
}
.el-form-item{
	margin-left:8%;
}
</style>
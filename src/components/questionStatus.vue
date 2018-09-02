<template>
	<el-select v-model="select" slot="prepend" placeholder="问卷状态" style="width:12%;margin-left:1%;">
		<el-option label="未完成" value="1"></el-option>
		<el-option label="创建中" value="2"></el-option>
		<el-option label="已结束" value="3"></el-option>
	</el-select>
</template>

<script>
	export default{
		data(){
			return{
				select:''
			}
		},
		methods:{
			
		},
		mounted() {
			
		}
	}
</script>

<style>
</style>
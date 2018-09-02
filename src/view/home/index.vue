<template>
	<el-container>
		<el-header>
			<headTop></headTop>
		</el-header>
		<el-main>
			<el-row>
		<el-col :span="24" style="width:100%;overflow: auto;">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</el-col>
	</el-row>
		</el-main>
		
	</el-container>
	
	
</template>

<script>
	import headTop from 'view/head/headTop.vue';
	export default{
		data(){
			return{
				
			}
		},
		methods: {
			
		},
		components:{
			headTop
		}
	}
</script>

<style>
</style>
<template>
	<div class="Templatecontain">
	<el-row justify="space-between">
		<el-col :span="20">
			<searchInput></searchInput>
			<questionStatus></questionStatus>
		</el-col>
		<el-col :span="4">
			<establishBT></establishBT>
		</el-col>
	</el-row>
	<oneTemplate></oneTemplate>
	
	</div>
</template>

<script>
	import searchInput from 'components/searchInput.vue';
	import questionStatus from 'components/questionStatus.vue';
	import establishBT  from 'components/establishBT.vue';
	import oneTemplate  from 'components/oneTemplate.vue';
	export default{
		data(){
			return{
				
			}
		},
		methods: {
			
		},
		components:{
			searchInput,
			questionStatus,
			establishBT,
			oneTemplate
		}
	}
	
</script>

<style>
	.Templatecontain .el-input__inner{
		height:34px;
		line-height: 34px;
	}
	.Templatecontain .el-input__icon{
		line-height: 34px;
		color:#313134;
	}
	.Templatecontain .el-button.is-round{
		padding: 9px 23px;
		font-size:14px;
	}
</style>
<style scoped="scoped" lang="scss">
	@import "~scss/common.scss";
.Templatecontain .el-input__inner{
		height:34px;
		line-height: 34px;
	}
</style>
<template>
	<div class="Templatecontain">
		
	
	<el-table :data="tableData" border :header-cell-style="{background:'#f7f7f7',color:'#1f1f1f'}" style="width:1100px">
		<el-table-column prop="id" label="ID" width="100" align="center"></el-table-column>
		<el-table-column prop="photo" label="微信头像/ID/昵称" width="200" align="center"></el-table-column>
		<el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>
		<el-table-column prop="tel" label="手机号" width="180" align="center"></el-table-column>
		<el-table-column prop="sex" label="性别" width="100" align="center"></el-table-column>
		<el-table-column prop="address" label="地址" width="300" align="center"></el-table-column>
		<el-table-column prop="admin" label="权限" width="110" align="center"></el-table-column>
	</el-table>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return{
				tableData:[{
					id:'1',
					photo:"路边的仙人掌",
					name:'赵敏',
					tel:'18900597456',
					sex:'男',
					address:'上海市虹口区虹口龙之梦38A',
					admin:''
					
				}]
			}
		},
			methods: {
		},
		mounted() {
			
		},
	}
</script>

<style scoped="scoped" lang="scss">
	.Templatecontain{
		width:100%;
		height:100%;
		padding:90px 10% 0px 10%;
		box-sizing: border-box;
	}
</style>
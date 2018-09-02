<template>
	<el-tabel :data="tableData" style="width:100%" border header-row-class-name="header-style" stripe>
		<el-tabel-column prop="id" label="ID" width="200"></el-tabel-column>
		<el-tabel-column prop="photo" label="微信头像/ID/昵称" width="250"></el-tabel-column>
		<el-tabel-column prop="name" label="姓名" width="150"></el-tabel-column>
		<el-tabel-column prop="tel" label="手机号" width="200"></el-tabel-column>
		<el-tabel-column prop="sex" label="性别" width="100"></el-tabel-column>
		<el-tabel-column prop="address" label="地址" width="300"></el-tabel-column>
		<el-tabel-column prop="admin" label="权限" width="150"></el-tabel-column>
	</el-tabel>
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
	.header-style{
		background:#333;
	}
</style>
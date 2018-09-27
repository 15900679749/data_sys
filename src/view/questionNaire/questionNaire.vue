<template>
	<div class="Templatecontain">
		<el-row justify="space-between">
			<el-col :span="20">
				<searchInput :search="search" @sgetList="sgetList"></searchInput>
				<questionStatus :search="search" @sgetList="sgetList"></questionStatus>
			</el-col>
			<el-col :span="4">
				<establishBT></establishBT>
			</el-col>
		</el-row>
		<oneTemplate_ques :list="list" @getList="getList"></oneTemplate_ques>
		<div class="block">
			<span class="demonstration"></span>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="pageSizes" :page-size="searchInfo.pageSize" layout="total, prev, pager, next, jumper" :total="searchInfo.pageTotal">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import searchInput from 'components/searchInput.vue';
	import questionStatus from 'components/questionStatus.vue';
	import establishBT from 'components/establishBT.vue';
	import oneTemplate_ques from 'components/oneTemplate_ques.vue';
	export default {
		data() {
			return {
				currentPage1: 1,
				pageSizes: [10, 20, 50, 100],
				searchInfo: {
					name: "",
					status: "",
					pageIndex: 1,
					pageSize: 10,
					pageTotal: 0
				},
				list: [],
				search: "ques"
			}
		},
		methods: {
			getList() {
				let sendModel = this.searchInfo;
				delete sendModel.pageTotal;
				this.$post("/Home/Subject/subList", sendModel).then((res) => {
					let resdata = res;
					this.list = resdata.list;
					this.searchInfo.pageTotal = Number(resdata.page.pageTotal);
				});
			},
			sgetList(name, value) {
				this.searchInfo.pageIndex = 1;
				if(name == "name") {
					this.searchInfo.name = value;
				} else if(name == "status") {
					this.searchInfo.status = value;
				}
				this.getList();
			},
			handleSizeChange(val) {
				this.searchInfo.pageSize = val;
				this.getList();
			},
			handleCurrentChange(val) {
				this.searchInfo.pageIndex = val;
				this.getList();
			},
			searchBtn() {
				this.getList();
			}
		},
		created() {
			this.getList();
		},
		components: {
			searchInput,
			questionStatus,
			establishBT,
			oneTemplate_ques
		}
	}
</script>

<style>
	.Templatecontain .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
	
	.Templatecontain .el-input__icon {
		line-height: 34px;
		color: #313134;
	}
	
	.Templatecontain .el-button.is-round {
		padding: 9px 23px;
		font-size: 14px;
	}
	
	.Templatecontain .block {
		text-align: center;
	}
</style>
<style scoped="scoped" lang="scss">
	.Templatecontain .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
</style>
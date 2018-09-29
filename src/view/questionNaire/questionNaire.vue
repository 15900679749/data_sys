<template>
	<div class="Templatecontain">
		<el-row justify="space-between">
			<el-col :span="20">
				<searchInput :search="search" @sgetList="sgetList"></searchInput>
				<questionStatus :search="search" @sgetList="sgetList"></questionStatus>
			</el-col>
			<el-col :span="4">
				<establishBT ></establishBT>
			</el-col>
		</el-row>
		<oneTemplate_ques :list="list" @getList="getList" @publishAn="publishAn" :templist="templist"></oneTemplate_ques>
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
	import { Message } from "element-ui";
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
				search: "ques",
				templist:[]
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
					for(var i = 0; i < resdata.list.length; i++) {
						if(resdata.list[i].status == 2) {
							this.list[i].statusName = "进行中"
						} else if(resdata.list[i].status == 3) {
							this.list[i].statusName = "暂停"
						} else {
							this.list[i].statusName = "草稿"
						}

					}

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
			},
			publishAn(item) {
				var statusNumber = item.status < 3 ? Number(item.status) + 1 : 2
				this.$post("/Home/Subject/publishSub", {
					id: item.id,
					status: statusNumber
				}).then((res) => {

					item.status = statusNumber;
					var statusMessage = statusNumber == 3 ? "您已暂停问卷" : "恭喜你，发布成功！";
					Message({
						showClose: true,
						message: statusMessage,
						type: 'success',
						duration: 3000
					});

					if(item.status == 2) {
						item.statusName = "进行中"
					} else if(item.status == 3) {
						item.statusName = "暂停"
					} else {
						item.statusName = "草稿"
					}

				});

			},
			gettmpList() {
				let sendModel = this.searchInfo;
				delete sendModel.pageTotal;
				delete sendModel.status;
				this.$post("/Home/Tpl/tplList", sendModel).then((res) => {
					let resdata = res;
					this.templist = resdata.list;
				});
			}
		},
		created() {
			this.getList();
			this.gettmpList();
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
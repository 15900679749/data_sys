<template>
	<el-autocomplete v-model="sName" :debounce=0 :fetch-suggestions="querySearchAsync" placeholder="请输入问卷名进行搜查..." @select="handleSelect">

		<i class="el-input__icon el-icon-search" slot="suffix" @click="handleIconClick"></i>
		<!--<el-button slot="append" icon="el-icon-search"></el-button>-->
	</el-autocomplete>
	</el-col>

</template>

<script>
	export default {
		data() {
			return {
				list: [],
				sName: '',
				searchInfo: {
					name: "",
					status: "",
					pageIndex: 1,
					pageSize: 10
				},
				ajaxb: true
			};
		},
		props: {
			search: {
				type: String,
				default: ""
			}
		},
		methods: {
			loadAll() {
				return [];
			},
			querySearchAsync(queryString, callback) {
				if(queryString.length < 2) return;
				if(!this.ajaxb) return;
				let slist = [];
				if(this.search == "ques") {
					let sendModel = this.searchInfo;
					delete sendModel.pageTotal;
					this.ajaxb = false;
					this.$post("/Home/Subject/subList", sendModel).then((res) => {
						let resdata = res;
						let dataList = resdata.list;
						for(var k = 0; k < dataList.length; k++) {
							slist.push({
								"value": dataList[k].sub_name,
								"lable": dataList[k].sub_name
							});
						}
						this.ajaxb = true;
					});
				}
				callback(slist);
			},
			handleSelect(item) {
				if(item.value == "") return;
				if(this.search == "ques") {
					this.$emit("sgetList", "name", item.value);
				}
			},
			handleIconClick(ev) {
				if(this.sName == "") return;
				if(this.search == "ques") {
					this.$emit("sgetList", "name", this.sName);
				}
			}
		},
		mounted() {
			//this.restaurants = this.loadAll();
		}
	}
</script>

<style>
	.el-autocomplete {
		width: 50%;
		margin-bottom: 45px;
	}
	
	.el-autocomplete .el-input__inner {
		width: 100%;
		border-radius: 14px;
	}
</style>
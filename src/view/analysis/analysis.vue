<template>
	<div>
		<div class="editTemContain">
			<div>
				<el-row type="flex" justify="space-between" class="conTop">
					<el-col :span="17">
						<el-button class="analysisicon">分析&下载</el-button>
					</el-col>
					<el-col :span="7" class="toprightbt">
						<el-button class="downloadicon">下载此报告</el-button>
						<el-button class="lasticon">下载原始问卷</el-button>
					</el-col>
				</el-row>
				<div class="conBottom">
					<div class="conBottomT">
						<h6>{{questiontitle}}</h6>
						<p v-text="contentText"></p>
					</div>

					<el-collapse v-model="activeNames" v-for="(item,index) in modList" :key="index" @change="handleChange">

						<el-collapse-item :title="item.mod_name" :name="index">
							<div class="collapseinner">
								<el-col :span="24" v-if="item.mod.length!=0" v-for="(mitem,mindex) in item.mod">
									<!--<span>{{qitem.modorder}}、{{qitem.itemmodname}}</span>-->
									<!--<span v-if="mitem.serial_number==mindex">{{mitem.serial_number}}、{{mitem.mod_name}}</span>-->
								</el-col>
								<el-row v-for="(qitem,qindex) in item.item" :key="qindex" v-bind:class="qitem.modorder?'bordernone':''">
									<span v-if="qitem.modorder&&qitem.order==1" class="comvetitle">{{Number(qitem.modorder)+1}}、{{qitem.itemmodname}}</span>
									<el-col :span="24"><span>{{qitem.order}}</span><span>{{qitem.itemmodname?")":"、"}}</span><span>{{qitem.title}}：</span><span class="typetip">【{{qitem.cat}}】</span></el-col>

									<el-col :span="24" v-if="qitem.sub_cat=='single'||qitem.sub_cat=='multiple'">
										<el-table :data="qitem.option" border style="width: 100%" :summary-method="getSummaries" show-summary>
											<el-table-column prop="option_name" label="选项" width="180">
											</el-table-column>

											<el-table-column prop="num" label="小计" width="180">
											</el-table-column>
											<el-table-column label="比例">
												<!--<template slot-scope="scope" v-if="scope.row.date!='本题有效填写人次'">-->
												<template slot-scope="scope">
													<el-progress :percentage="Number(scope.row.percent)*100||0"></el-progress>
												</template>
											</el-table-column>

										</el-table>
									</el-col>
									<el-col :span="23" :offset="1" v-else>
										<el-button size="medium" @click="tagItem(qitem)" class="checkmy">查看详细信息</el-button>
										<el-table :data="qitem.resultList" border style="width: 100%" v-show="!!qitem.itemshow">
											<el-table-column prop="rownum" label="序号" width="180"></el-table-column>
											<el-table-column prop="answer_time" label="日期" width="180"></el-table-column>
											<el-table-column label="详细内容" v-if="qitem.sub_cat=='uploadimg'">

												<template slot-scope="scope" v-if="qitem.sub_cat=='uploadimg'">
													<img :src="imgitem" v-for="(imgitem,imgindex) in qitem.resultList[scope.$index].result" class="uploadimgList" />
												</template>

											</el-table-column>

											<el-table-column label="详细内容" v-if="qitem.sub_cat=='loCation'" prop="result">

											</el-table-column>
											<el-table-column prop="result" label="详细内容" v-else>
											</el-table-column>

										</el-table>

									</el-col>

								</el-row>

							</div>

						</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import headTop from 'view/head/headTop.vue';
	import topic from 'components/topic.vue';
	import { jsNumDX } from 'javascripts/utils/index';

	import { ofill, osingle, omultiple, omultistage, ouploadimg, oloCation, ofractions, ocomprehensive } from "components/itemType";
	export default {
		data() {
			return {
				contentText: '添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加添加问卷说明添加问卷说明添加问卷说明添加问卷说明添卷说明',
				activeNames: ['1'],
				questiontitle: "",
				quesId: "",
				modList: [],
				quesList: [],
				resultList: [],
				tableData: [{
					date: '男',
					name: '0',
					address: 50

				}, {
					date: '女',
					name: '0',
					address: 0
				}, {
					date: '本题有效填写人次',
					name: '2',

				}]

			}
		},
		methods: {
			handleChange(val) {

			},
			getItemOptions(itemList) {
				let resList = [];
				Array.from(itemList, (obj, index) => {
					let sub_cat = obj.sub_cat;
					obj.resultList = [];
					switch(sub_cat) {
						case "multiple":
							{
								let multiple = JSON.parse(JSON.stringify(obj));
								for(var km in multiple.option) {
									multiple.option[km].effective = obj.effective;
								}
								resList.push(multiple);
							}
							break;
						case "single":
							{
								let single = JSON.parse(JSON.stringify(obj));
								for(var km in single.option) {
									single.option[km].effective = obj.effective;
								}
								resList.push(single);
							}
							break;

						default:
							{
								resList.push(obj);
							}
							break;
					}

				}, this)
				return resList;

			},
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				var lyconut = data[0].effective || "";
				columns.forEach((column, index) => {
					if(index === 0) {
						sums[index] = '本次有效填写人次';
						return;
					}
					if(index === 1) {
						sums[index] = lyconut;
						return;
					}
				});
				return sums;
			},
			tagItem(item) {
				var _this = this;
				let type = item.sub_cat;
				item.itemshow = !item.itemshow;
				this.$post("/Home/Analysis/detail", {
					id: item.id
				}).then((res) => {
					if(item.sub_cat == 'uploadimg') {
						var imgLoad = res;
						res.forEach((obj, index) => {
							obj.result = JSON.parse(obj.result);
						});
						item.resultList = imgLoad;
					} else if(item.sub_cat == 'loCation') {
						var obj = res || [];
						res.forEach((obj, index) => {
							obj.result = JSON.parse(obj.result).addresname + "," + JSON.parse(obj.result).locationName;
						});
						item.resultList = obj; //objres.addresname+obj.locationName;
					} else {
						item.resultList = res;
					}
				})
			}
		},
		mounted: function() {

		},
		components: {
			headTop,
			topic
		},
		created() {
			this.quesId = this.$route.query.questionId;
			this.$post("/Home/Analysis/itemList", {
				id: this.quesId
			}).then((res) => {
				this.contentText = res.description || "";
				this.questiontitle = res.sub_name || "";
				let modlist = res.mod;
				let activelist = [];
				for(var k = 0; k < modlist.length; k++) {
					var option = {};
					activelist.push(k);
					option.mod_name =modlist[k].mod_name;
					option.qtitle = this.quesList.length + 1 + '、';
					option.id = modlist[k].id;
					option.sortId = modlist[k].order_num;
					option.qlist = [];
					option.pid = modlist[k].pid;
					if(modlist[k].item.length != 0) {
						let opList = this.getItemOptions(modlist[k].item);
						option.qlist = modlist[k].item;
						modlist[k].item = opList;
					}
					if(modlist[k].mod && modlist[k].mod.length != 0) {
						for(var j = 0; j < modlist[k].mod.length; j++) {
							for(var v = 0; v < modlist[k].mod[j].item.length; v++) {
								modlist[k].mod[j].item[v].itemmodname = modlist[k].mod[j].mod_name
								modlist[k].mod[j].item[v].modorder = modlist[k].mod[j].serial_number
								modlist[k].item.push(modlist[k].mod[j].item[v]);
							}

						}
						let opList2 = this.getItemOptions(modlist[k].item);
						option.qlist = modlist[k].item;
						modlist[k].item = opList2;
					}

					for(var j = 0; j < option.qlist.length; j++) {
						option.qlist[j].itemshow = false;
					}
					modlist[k].mod_name = jsNumDX(k + 1) + modlist[k].mod_name;
					//	
					this.modList.push(modlist[k]);
					var modList = this.modList;

				}
				this.activeNames = activelist;

			});
		}

	}
</script>
<style>
	.conBottom .el-collapse-item__wrap {
		border: none;
		border-radius: 0 0 4px 4px;
	}
	
	.conBottom .el-collapse-item__header {
		padding-left: 22px;
		border: none;
		border-radius: 4px;
	}
	
	.conBottom .el-collapse-item__content {
		padding: 10px 0;
		border-top: 1px solid #ebeef5;
	}
	
	.el-table th>.cell {
		text-align: center;
	}
</style>
<style scoped="scoped" lang="scss">
	.el-main {
		background-color: #f3f3f3;
	}
	
	.editTemContain {
		padding: 68px 120px 0;
		background-color: #f3f3f3;
		>div {
			background-color: #fff;
			padding: 0 30px;
		}
	}
	
	.conTop {
		padding: 15px 0;
		color: #fff;
		font-size: 14px;
		.el-button {
			border: none;
			text-align: center;
			color: #fff;
			padding: 14px 26px;
			padding-left: 50px;
			&.analysisicon {
				background: #ffbc1b url(../../statics/images/analysisicon.png) 18px center no-repeat;
			}
			&.downloadicon {
				background: #005ad4 url(../../statics/images/downloadicon.png) 18px center no-repeat;
			}
			&.lasticon {
				border: 1px solid #005ad4;
				color: #005ad4;
				padding: 14px 25px;
				padding-left: 14px;
			}
		}
	}
	
	.conBottom {
		padding: 60px;
		background-color: #fff;
		font-size: 14px;
	}
	
	.conBottomT {
		padding-bottom: 35px;
		border-bottom: 1px dashed #e4e4e4;
		margin-bottom: 35px;
		>p {
			color: #666;
			line-height: 30px;
		}
	}
	
	h6 {
		text-align: center;
		padding-bottom: 40px;
	}
	
	.el-collapse-item {
		border-color: #e0e0e0;
		border-radius: 4px;
		margin-bottom: 20px;
		border: 1px solid #ebeef5;
		position: relative;
	}
	
	.el-collapse {
		border: none;
	}
	
	.toprightbt {
		text-align: right;
	}
	
	.collapseinner {
		padding: 22px;
		.el-row {
			padding-bottom: 30px;
			border-bottom: 1px dashed #e4e4e4;
			>.el-col:nth-of-type(1) {
				margin-bottom: 25px;
			}
		}
	}
	
	.el-table,
	.el-table th>.cell {
		text-align: center;
	}
	
	.collapseinner .el-row {
		padding-top: 30px;
	}
	
	.uploadimgList {
		margin: 0 10px;
	}
	
	.bordernone:not(:last-child) {
		border-bottom: none !important;
	}
	
	.comvetitle {
		display: block;
		margin: 10px 0 45px;
	}
	.checkmy{
		margin-bottom:20px;
	}
</style>
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

					<el-collapse v-model="activeNames" @change="handleChange" v-for="(item,index) in modList" :key="index">

						<el-collapse-item :title="item.mod_name" name="index">
							<div class="collapseinner">
								<el-row v-for="(qitem,qindex) in item.item" :key="qindex">
									<el-col :span="24"><span>{{qitem.order}}</span><span>{{qitem.title}}：</span><span class="typetip">【{{qitem.cat}}】</span></el-col>

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
										<el-button size="medium">查看详细信息</el-button>
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
				myqList:[],
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
					switch(sub_cat) {
						case "fill": {
	let ifill = JSON.parse(JSON.stringify(ofill));
	for(var km in ifill) {
		obj.hasOwnProperty(km) && (ifill[km] = obj[km])
	}
	resList.push(ifill);
}

}

}, this)
return resList;

},
getSummaries(param) {
		var _this = this

		const {
			columns,
			data
		} = param;//这里没搞明白
		param.data = this.myqList;
		const sums = [];
		columns.forEach((column, index) => {
					if(index === 0) {
						sums[index] ='本题有效填写人数';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {//这里不需要这个方法，不是我去计算。我只是要赋值。
            sums[index] = _this.data.quesList
            console.log(columns,data)
            sums[index] += ' 元';
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
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

				for(var k = 0; k < modlist.length; k++) {
					var option = {};
					option.mod_name = modlist[k].mod_name;
					option.qtitle = this.quesList.length + 1 + '、';
					option.id = modlist[k].id;
					option.sortId = modlist[k].order_num;
					option.qlist = [];
					option.pid = modlist[k].pid;
					if(modlist[k].item.length != 0) {
						//						let opList =this.getItemOptions(modlist[k].item) ;

						option.qlist = modlist[k].item;
						
					}
					//					if(modlist[k].mod && modlist[k].mod.length != 0) {
					//						for(var j = 0; j < modlist[k].mod.length; j++) {
					//							let icomprehensive = JSON.parse(JSON.stringify(ocomprehensive));
					//							for(var km in icomprehensive) {
					//								modlist[k].mod[j].hasOwnProperty(km) && (icomprehensive[km] = modlist[k].mod[j][km])
					//								if(km == "serial_number") {
					//									modlist[k].mod[j][km]
					//								}
					//							}
					//							let copList = this.getItemOptions(modlist[k].mod[j].item);
					//							icomprehensive.qlist = copList;
					//							option.qlist.push(icomprehensive);
					//						}
					//					}

					this.quesList.push(option);

					console.log(this.quesList);

					this.modList.push(modlist[k]);
					for(var v=0;v<option.qlist.length;v++){
						//debugger
						//this.myqList=this.myqList.push(option.qlist[v])
					}
				}

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
</style>
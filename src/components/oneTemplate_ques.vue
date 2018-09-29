<template>

	<div>

		<el-row class="oneTcontain" v-for="(item,index) in list" :key="index">
			<el-row type="flex" justify="space-between" class="ontemplateTopL">
				<el-col :span="6">
					<span class="vote">{{item.sub_name}}&nbsp;&nbsp;ID:{{item.uid}}</span>
				</el-col>
				<el-col :span="6" class="ontemplateTopR">
					<span>状态:{{item.statusName}}</span>
					<span>答卷:<b>{{item.answer}}</b></span>
					<span v-text="item.sub_name"></span>
				</el-col>
			</el-row>
			<el-row type="flex" justify="space-between">
				<el-col :span="8" class="ontemplateBotL">
					<span @click="designAn(item)"><i class="designAnicon"></i>设计问卷</span>
					<span @click="sendAn(item)"><i class="sendAn"></i>发送问卷</span>
					<span @click="analyzeDown(item)"><i class="analyzeDown"></i>分析&下载</span>
				</el-col>
				<el-col :span="6" class="ontemplateBotR">
					<el-button class="active" @click="publishAn(item)"><i class="el-icon-edit" v-if="item.status!=2"></i>{{item.status!=2?"发布":"暂停"}}</el-button>
					<el-button @click="deleItem(item)"><i class="el-icon-delete"></i>删除</el-button>
				</el-col>
			</el-row>

		</el-row>
		<div v-show="jumpshow" class="jump">
			<div class="jumpitem">

				<p>创建问卷</p>
				<template>
					<el-radio v-model="ckRadio" label="1" class="establish">从模板创建</el-radio>
					<el-radio v-model="ckRadio" label="2" class="establish">从空白创建</el-radio>
				</template>
				<div class="jumpitemcontent">
					<ul>
						<li>选择模板：</li>
						<li>所属区：</li>
					</ul>
					<ul>
						<li>
							<el-select v-model="modelId" placeholder="请选择" :disabled="ckRadio=='2'">
								<el-option v-for="item in moptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>
						<li>
							<el-select v-model="region" placeholder="请选择">
								<el-option v-for="item in qoptions" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</li>
					</ul>
				</div>
				<el-button @click="canclejump" size="medium">取消</el-button>
				<el-button size="medium" @click="submit">确定</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import bus from './eventBus';
	import { Message } from "element-ui";
	import storage from 'javascripts/utils/storage';

	export default {
		data() {
			return {
				jumpshow: false,
				ckRadio: '1',
				region: "",
				modelId: "",
				qoptions: [{
					value: '黄浦区',
					label: '黄浦区'
				}, {
					value: '虹口区',
					label: '虹口区'
				}],
				moptions: [],
				value: ''
			}
		},
		props: {
			list: {
				type: Array,
				default: () => []
			},
			templist: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			edtingTemplate() {

			},
			deleItem(item) {
				this.$confirm('您确定要删除该记录, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post("/Home/Subject/delSub", {
						"id": item.id
					}).then((res) => {
						this.$alert('删除成功！', '提示', {
							confirmButtonText: '确定',
							callback: action => {
								this.$emit("getList");
							}
						});
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			designAn(item) {
				return this.$router.push({
					path: '/edit/edit_questionnaire',
					query: {
						questionId: item.id,
					}
				});
			},
			publishAn(item) {
				this.$emit("publishAn", item);
			},
			sendAn(item) {

				return this.$router.push({
					path: '/sendpage',
					query: {
						questionId: item.id,
					}
				});
			},
			analyzeDown(item) {
				return this.$router.push({
					path: '/analysis',
					query: {
						questionId: item.id,
					}
				});
			},
			jump() {
				//this.jumpshow = true
			},
			canclejump() {
				this.jumpshow = false;
				//				debugger
				if(this.$route.query.modelId && this.$route.query.modelname) {
					this.$router.push({
						path: '/temPlate'
					});
				}
			},
			submit() {
				if(this.ckRadio == "1") {
					if(this.modelId == "") {
						Message({
							showClose: true,
							message: "请选择模板!",
							type: 'warning',
							duration: 2000
						});
						return false;
					}
					if(this.modelId == "" || this.region == "") {
						Message({
							showClose: true,
							message: "请选择所属区域!",
							type: 'warning',
							duration: 2000
						});
						return false;
					}
				} else {
					if(this.region == "") {
						Message({
							showClose: true,
							message: "请选择所属区域!",
							type: 'warning',
							duration: 3000
						});
						return false;
					}
				}
				this.$post("/Home/Subject/createNewSubject", {
					template: this.modelId || 0,
					area_belong: this.region
				}).then((res) => {
					console.log(res);
					this.$router.push({
						path: 'edit/edit_questionnaire',
						query: {
							questionId: res.id,
						}
					});
				});
			},
			gettmpList() {
				let sendModel = this.searchInfo;
				delete sendModel.pageTotal;
				delete sendModel.status;
				this.$post("/Home/Tpl/tplList", sendModel).then((res) => {
					let resdata = res;
					this.templist = resdata.list;
					debugger
				});
			}
		},
		mounted() {
			let self = this;
			bus.$on("getStatus", function(b) {
				self.jumpshow = b;
			});
		},
		watch: {
			'$route' (to, from) {
				this.$router.go(0);
			},
			templist: function(v) {
				if(v.length == 0) return;
				v.forEach((obj, index) => {
					let moptionitm = {};
					moptionitm.value = obj.id;
					moptionitm.label = obj.tmp_name;
					this.moptions.push(moptionitm);
					index == 0 && (this.modelId = obj.id);
				});
			}
		},
		created() {
			if(this.$route.query.modelId && this.$route.query.modelname) {
				let moptionitm = {};
				moptionitm.value = this.$route.query.modelId;
				moptionitm.label = this.$route.query.modelname;
				this.moptions.push(moptionitm);
				this.jumpshow = true;
				this.modelId = this.$route.query.modelId;
			} 
		}
	}
</script>
<style>
	.establish .el-radio__input.is-checked+.el-radio__label {
		color: #fff;
	}
	
	.establish .el-radio__input.is-checked .el-radio__inner {
		border-color: #333;
		background: #333;
	}
</style>
<style scoped="scoped" lang="scss">
	.oneTcontain {
		margin-bottom: 14px;
	}
	
	.el-row {
		width: 100%;
	}
	
	.el-row.ontemplateTopL {
		background: #f7f7f7;
		border-bottom: 1px solid #e0e0e0;
	}
	
	.el-row.oneTcontain {
		color: #808080;
		border: 1px solid #e0e0e0;
		border-radius: 2px;
		>.el-row {
			padding: 0 30px;
			font-size: 14px;
			align-items: center;
			>.el-col {
				display: flex;
				padding: 18px 0;
			}
		}
	}
	
	span.vote {
		color: #1f1f1f;
		font-weight: bold;
		margin-right: 30px;
	}
	
	.el-icon-edit-outline {
		color: #005ad4;
		margin-right: 8px;
	}
	
	.edting {
		cursor: pointer;
	}
	
	.el-col.ontemplateTopR {
		display: flex;
		justify-content: space-between;
		>div {
			width: 66%;
			display: flex;
			justify-content: space-between;
			>span {
				width: 40%;
				display: flex;
				&:nth-of-type(1) {
					width: 60%
				}
			}
		}
	}
	
	span>b {
		color: #005ad4;
		font-weight: normal;
	}
	
	.designAnicon,
	.sendAn,
	.analyzeDown,
	.edtingTemplate {
		background-size: 100%;
		background-repeat: no-repeat;
		height: 14px;
		width: 14px;
		display: inline-block;
		margin-right: 10px;
		vertical-align: middle;
	}
	
	.designAnicon {
		background-image: url(../statics/images/design.png);
	}
	
	.sendAn {
		background-image: url(../statics/images/send.png);
	}
	
	.analyzeDown {
		background-image: url(../statics/images/analy.png);
	}
	
	.el-button {
		padding: 9px 15px;
		margin-right: 12px;
		color: #303033;
		border-color: #303033;
	}
	
	.el-button.active {
		color: #005ad4;
		border-color: #005ad4;
	}
	
	.el-icon-edit,
	.el-icon-delete {
		margin-right: 12px;
	}
	
	.ontemplateBotL {
		display: flex;
		width: 30%;
		justify-content: space-between;
		>span {
			cursor: pointer;
		}
	}
	
	.ontemplateBotR {
		width: 20%;
		display: flex;
		justify-content: flex-end;
		.el-button {
			margin-right: 0;
			margin-left: 12px;
		}
	}
	
	.edtingTemplate {
		background-image: url(../statics/images/edtingTemplateicon.png);
		height: 16px;
	}
	
	.jump {
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .3);
		top: 0;
		z-index: 200;
		p {
			padding: 10px 0 20px;
		}
		.el-radio__inner {
			background-color: #333;
		}
		.el-radio {
			color: #fff;
		}
		.jumpitem {
			position: absolute;
			z-index: 300;
			top: 50%;
			left: 50%;
			width: 30%;
			background: #409EFF;
			color: #fff;
			transform: translate(-50%, -50%);
			padding: 20px 2% 30px;
			text-align: center;
			.el-button {
				width: 40%;
				display: inline-block;
				margin-top: 30px;
				&:nth-of-type(1) {
					margin-left: 5%;
				}
			}
			.jumpitemcontent {
				width: 100%;
				margin: 30px auto 0;
				float: left;
				ul {
					&:nth-of-type(1) {
						width: 30%;
						li {
							padding: 14px 0;
						}
					}
					width: 70%;
					float:left;
					li {
						text-align: center;
						padding: 8px 0;
					}
				}
			}
		}
	}
</style>
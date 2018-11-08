<template>

	<div>

		<el-row class="oneTcontain" v-for="(item,index) in list" :key="index">
			<el-row type="flex" justify="space-between" class="ontemplateTopL">
				<el-col :span="17">
					<span class="vote">{{item.tmp_name}}&nbsp;&nbsp;ID:{{item.uid}}</span>
					<!--<span @click="edting" class="edting"><i class="el-icon-edit-outline"></i>编辑</span>-->
				</el-col>
				<el-col :span="7" class="ontemplateTopR">
					<span>创建者:{{item.create_man}}</span>
					<span v-text="item.create_time"></span>
				</el-col>
			</el-row>
			<el-row type="flex" justify="space-between">
				<el-col :span="8">
				
					<span @click="edtingTemplate(item,userlevel)" v-if="userlevel==1"><i class="edtingTemplate"></i>编辑模板</span>
					<span @click="edtingTemplate(item,userlevel)" v-if="userlevel>1"><i class="edtingTemplate"></i>查看模板</span>
				</el-col>
				<el-col :span="6" class="ontemplateBotR">

					<el-button class="active" @click="publishTemp(item)" v-if="userlevel==1"><i class="el-icon-edit"></i>使用模板</el-button>

					<el-button @click="deleItem(item)" v-if="userlevel==1"><i class="el-icon-delete"></i>删除</el-button>
				</el-col>
			</el-row>

		</el-row>
		<div v-show="jumpshow" class="jump">
			<div class="jumpitem">
				<p>创建模板</p>
				<template>
					<el-radio v-model="ckRadio" label="1" class="establish" disabled>从模板创建</el-radio>
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
							<el-select v-model="region" placeholder="请选择" disabled>
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
				userlevel: 0,
				jumpshow: false,
				ckRadio: '2',
				region: "",
				modelId: "",
				qoptions: [{
					value: '黄浦区',
					label: '黄浦区'
				}, {
					value: '虹口区',
					label: '虹口区'
				}],
				moptions: [{
					value: '模板1',
					label: '模板1'
				}, {
					value: '模板2',
					label: '模板2'
				}],
				value: ''
			}
		},
		props: ["list"],
		methods: {
			edtingTemplate(item, status) {
				var edit = parseInt(status) > 1 ? 0 : 1;
				return this.$router.push({
					path: '/edit/edit_template',
					query: {
						templateId: item.id,
						status: edit
					}
				})
			},
			deleItem(item) {
				this.$confirm('您确定要删除该记录，是否继续？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post("/Home/Tpl/delTpl", {
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
			canclejump() {
				this.jumpshow = false;
				//				if(this.ckRadio == "2") {
				//					this.$router.push({
				//						path: '/temPlate'
				//					});
				//				}
			},
			publishTemp(item) {
				this.$router.push({
					path: '/questionNaire',
					query: {
						"modelId": item.id,
						"modelname": item.tmp_name
					}
				});
			},

			submit() {
				//				if(this.ckRadio == "1") {
				//					if(this.modelId == "") {
				//						Message({
				//							showClose: true,
				//							message: "请选择模板!",
				//							type: 'warning',
				//							duration: 2000
				//						});
				//						return false;
				//					}
				//					if(this.modelId == "" || this.region == "") {
				//						Message({
				//							showClose: true,
				//							message: "请选择所属区域!",
				//							type: 'warning',
				//							duration: 2000
				//						});
				//						return false;
				//					}
				//				} else {
				//					if(this.region == "") {
				//						Message({
				//							showClose: true,
				//							message: "请选择所属区域!",
				//							type: 'warning',
				//							duration: 3000
				//						});
				//						return false;
				//					}
				//				}

				this.$post("/Home/Tpl/createNewTpl", {
					//					template:this.modeId||0,
					//					area_belong:this.region
				}).then((res) => {
					console.log(res);
					this.$router.push({
						path: 'edit/edit_template',
						query: {
							templateId: res.id,
						}
					});
				});

				//				this.$router.push({
				//					path: 'edit/edit_template',
				//					query: {
				//						modelId: this.modelId,
				//						region: this.region
				//					}
				//				});
			}
		},
		mounted() {
			let self = this;
			bus.$on("getStatustemp", function(b) {

				if(this.userlevel > 1) {
					debugger
					this.$message({
						type: 'error',
						message: '对不起，您没有此权限'
					});
					return
				} else {
					self.jumpshow = b;
				}

			});
		},
		created() {
			this.userlevel = 1;//Number(JSON.parse(storage.get('user')).level);
		}
	}
</script>
<style type="text/css">
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
		/*width: 22%;*/
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
		width: 100%;
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
</style>
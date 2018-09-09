<template>

	<div>

		<el-row class="oneTcontain" v-for="(item,index) in list" :key="index">
			<el-row type="flex" justify="space-between" class="ontemplateTopL">
				<el-col :span="6">
					<span class="vote">投票&nbsp;&nbsp;ID:{{item.idNum}}</span>
					<span @click="edting" class="edting"><i class="el-icon-edit-outline"></i>编辑</span>
				</el-col>
				<el-col :span="6" class="ontemplateTopR">

					<span>状态:{{item.status}}</span>
					<span>答卷:<b>{{item.answerNum}}</b></span>

					<span v-text="item.timeNum"></span>

				</el-col>
			</el-row>
			<el-row type="flex" justify="space-between">
				<el-col :span="8" class="ontemplateBotL">

					<span @click="designAn"><i class="designAnicon"></i>设计问卷</span>
					<span @click="sendAn"><i class="sendAn"></i>发送问卷</span>
					<span @click="analyzeDown"><i class="analyzeDown"></i>分析&下载</span>

				</el-col>
				<el-col :span="6" class="ontemplateBotR">

					<el-button class="active"><i class="el-icon-edit"></i>发布</el-button>

					<el-button><i class="el-icon-delete"></i>删除</el-button>
				</el-col>
			</el-row>
			
		</el-row>
		<div v-show="jumpshow" class="jump">
				<div class="jumpitem">

					<p>创建问卷</p>
					<template>
						<el-radio v-model="ckRadio" label="1">从模板创建</el-radio>
						<el-radio v-model="ckRadio" label="2">从空白创建</el-radio>
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
			edting() {

			},
			edtingTemplate() {

			},
			designAn() {

			},
			sendAn() {

			},
			analyzeDown() {
				return this.$router.push({
					path: '/analysis'
				});
			},
			jump() {
				//this.jumpshow = true
			},
			canclejump() {
				this.jumpshow = false;
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
				this.$router.push({
					path: 'edit/edit_template',
					query: {
						modelId: this.modelId,
						region: this.region
					}
				});
			}
		},
		mounted() {
			let self = this;
			bus.$on("getStatus", function(b) {
				self.jumpshow = b;
			});
		},
		created() {

		}
	}
</script>
<style>
	.el-radio__input.is-checked+.el-radio__label {
		color: #fff;
	}
	
	.el-radio__input.is-checked .el-radio__inner {
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
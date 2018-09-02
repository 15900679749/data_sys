<template>

	<div>

		<el-row class="oneTcontain" v-for="item in list">
			<el-row type="flex" justify="space-between" class="ontemplateTopL">
				<el-col :span="6">
					<span class="vote">投票&nbsp;&nbsp;ID:{{item.idNum}}</span>
					<span @click="edting" class="edting"><i class="el-icon-edit-outline"></i>编辑</span>
				</el-col>
				<el-col :span="6" class="ontemplateTopR">
					<span>创建者:{{item.creator}}</span>
					<span v-text="item.timeNum"></span>

				</el-col>
			</el-row>
			<el-row type="flex" justify="space-between">
				<el-col :span="8">
					
						<span @click="edtingTemplate"><i class="edtingTemplate"></i>编辑模板</span>
					
				</el-col>
				<el-col :span="6" class="ontemplateBotR">
					
						<el-button class="active"><i class="el-icon-edit"></i>使用模板</el-button>
					
					<el-button><i class="el-icon-delete"></i>删除</el-button>
				</el-col>
			</el-row>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
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

			}
		},
		mounted() {

		}
	}
</script>

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
		width:22%;
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
</style>
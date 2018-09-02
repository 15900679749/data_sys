<template>
	<el-row class="oneTcontain">
		<el-row type="flex" justify="space-between" class="ontemplateTopL">
			<el-col :span="6">
				<span class="vote">投票&nbsp;&nbsp;ID:{{idNum}}</span>
				<span @click="edting"><i class="el-icon-edit-outline"></i>编辑</span>
			</el-col>
			<el-col :span="6" class="ontemplateTopR">
				<div v-if="actionType">
					<span>状态:{{status}}</span>
					<span>答卷:<b>{{answerNum}}</b></span>				
				</div>
				<div v-else><span>创建者:{{creator}}</span></div>
				<span v-text="timeNum"></span>
				
			</el-col>
		</el-row>
		<el-row  type="flex" justify="space-between">			
			<el-col :span="8" >
				<div v-if="actionType">
					<span @click="designAn"><i class="designAnicon"></i>设计问卷</span>
					<span @click="sendAn"><i class="sendAn"></i>发送问卷</span>
					<span @click="analyzeDown"><i class="analyzeDown"></i>分析&下载</span>
				</div>
				<div v-else>
				<span @click="edtingTemplate"><i></i>编辑模板</span>
				</div>
			</el-col>
			<el-col :span="6">
				<div v-if="actionType">
					<el-button>发布</el-button>
				</div>
				<div v-else>
					<el-button>使用模板</el-button>
				</div>
				<el-button>删除</el-button>
			</el-col>
		</el-row>
	</el-row>

</template>

<script>
	export default{
data(){
	return{
		idNum:1,
		status:'已完成',
		answerNum:0,
		creator:"xxxxxx",
		timeNum:"11111",
		actionType:true
		}
	},
	methods:{
		edting(){
			
		},
		edtingTemplate(){
			
		},
		designAn(){
			
		},
		sendAn(){
			
		},
		analyzeDown(){
			
		}
	},
	mounted() {
		
	}
}
</script>

<style scoped="scoped" lang="scss">
	.el-row{
		width: 100%;
	}
	.el-row.ontemplateTopL{
		background: #f7f7f7;
		border-bottom:1px solid #e0e0e0 ;
	}
	.el-row.oneTcontain{
		color:#808080;
		border:1px solid #e0e0e0;
		border-radius: 2px;
		>.el-row{
			padding:0 30px;
			font-size: 14px;
			align-items: center;
			>.el-col{
				display: flex;
				padding:18px 0;
			}
		}
	}
	
	span.vote{
		color:#1f1f1f;
		font-weight: bold;
		margin-right:30px;
	}
	.el-icon-edit-outline{
		color:#005ad4;
		margin-right:8px;
	}
	.el-col.ontemplateTopR{
		display: flex;
		justify-content: flex-start;
		>div{
			width: 66%;
			display: flex;
			justify-content: space-between;
			>span{
				width:40%;
				display: flex;
				&:nth-of-type(1){
					width:60%
				}
			}
		}
	
		    
	}
	span>b{
		color:#005ad4;
		font-weight: normal;
	}
	.designAnicon,.sendAn,.analyzeDown{
		background-size:100%;
		background-repeat: no-repeat;
		height:14px;
		width:14px;
		display: inline-block;
		margin-right: 10px;
	}
	.designAnicon{
		background-image: url(../statics/images/design.png);
	}
	.sendAn{
		background-image: url(../statics/images/send.png);
	}
	.analyzeDown{
		background-image: url(../statics/images/analy.png);
	}
	
</style>
<template>
	<div class="sendpage">
		<div>
			<h6>问卷标题</h6>
			<p><span>问卷说明：</span>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</p>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
		<div class="sendset">
			<el-row  type="flex" justify="center">
				<el-col :span="22">
					红包设置：
				</el-col>
			</el-row>
			<el-row  type="flex" justify="center">
							
				<el-col :span="8">
					<el-form-item label="红包总金额：">
				    <el-input v-model="ruleForm.totalprice"></el-input>
				    <span>元</span>
				   </el-form-item>
				</el-col>
				<el-col :span="8">
					</el-form-item>
				  	<el-form-item label="红包总数量：">
				    <el-input v-model="ruleForm.totalnum"></el-input>
				    <span>个</span>
				  </el-form-item>

				</el-col>
				
			
			</el-row>
			
		
		<el-row  type="flex" justify="center">		
			

			<el-col :span="12">
				<el-radio-group v-model="ruleForm.resource" class="radiogroup">
		      <el-radio label="线上品牌商赞助"></el-radio>
		      <el-radio label="线下场地免费"></el-radio>
		    </el-radio-group>
			</el-col>
		</el-row>
		</div>
		<div class="sendset">
			<el-row  type="flex" justify="center">
				<el-col :span="22">
					问卷链接与二维码：
				</el-col>
			</el-row>
			<el-row type="flex" justify="center">
				<el-col :span="8">
					<img src="../../statics/images/wechatcode.png"/>
				</el-col>
				<el-col :span="16" class="urlrepeat">
					<div>
						<el-input></el-input>
						<el-button>复制</el-button>
					</div>
					<el-button>下载二维码</el-button>
				</el-col>

			</el-row>
		</div>
	
	</el-form>
	</div>
</template>

<script>
	
	
	export default{
		data(){
			return{				
					contentText:'添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加添加问卷说明添加问卷说明添加问卷说明添加问卷说明添卷说明',
				ruleForm:{
					totalprice:0,
					totalnum:0,
					resource:'',
					
				},
				rules:{
						
					}
			}
		},
		methods: {
			
		},
		components:{
			
		}
	}
</script>
<style scoped="scoped" lang="scss">
*{
	box-sizing: border-box;
}
.el-radio-group.radiogroup{
	width: 100%;
	.el-radio:nth-of-type(1){
		margin-right: 30%;
	}
}
	.sendpage {
		
		h6{
			text-align: center;
			line-height: 120px;
		}
		p{
		word-break: break-all;	
		line-height: 24px;
		}
		    
		width: 100%;
		box-sizing: border-box;
		padding: 15px 120px 0;
		height: 100%;
		>div {
			background-color: #fff;
		}
	}
	
	.sendset{
		margin-top:30px;
		padding:20px 10%;
		border:1px solid rgba(0,0,0,.2);
		border-radius: .3em;
		box-shadow: 0 1px white inset;
		.el-row{
			margin:15px 0;
			&:nth-of-type(2){
				margin-top:30px;
			}
		}
		.el-input{
			width:40%;
		}
		img{
			width:40%;
			padding:5%;
			border:1px solid rgba(0,0,0,.2);
			margin-left:20%;
		}
	}
	.urlrepeat{
		.el-input{width: 60%;}
		.el-button{
			margin-top:20px;
		}
		div{
			.el-button{
				margin-top:0px;
		margin-left:20px;
	}
		}
	} 
</style>
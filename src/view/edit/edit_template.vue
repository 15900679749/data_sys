<template>
	<div>
		<el-row :gutter="20" class="top">
			<el-col :span="3" :offset="9">
				<i class="el-icon-search"></i>预览</el-col>
			<el-col :span="3"><i class="el-icon-check"></i>完成</el-col>
		</el-row>
		<div class="editTemContain">
			<div>
				<el-row  type="flex" justify="end" class="conTop">
					<el-col :span="3"><i class="el-icon-plus"></i>新建模块</el-col>
				</el-row>
				<div class="conBottom">
					<div class="conBottomT">
						<h6>问卷标题</h6>
						<p v-text="contentText"></p>
					</div>
				
				
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item title="一、模块名称" name="1">
						
						<topic></topic>
					</el-collapse-item>
					<el-collapse-item title="二、模块名称" name="2">
						
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
	
	export default{
		data(){
			return{				
					contentText:'添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加添加问卷说明添加问卷说明添加问卷说明添加问卷说明添卷说明',
					 activeNames: ['1'],
					 	
			}
		},
		methods: {
			 handleChange(val) {
        console.log(val);
      }
		},
		components:{
			headTop,
			topic
		}
	}
</script>
<style>
	.conBottom .el-collapse-item__wrap{
		border:none;
		    border-radius: 0 0 4px 4px;
	}
	.conBottom .el-collapse-item__header{
	padding-left:22px;	
	    border:none;
	    
	    border-radius: 4px;
	}
	.conBottom .el-collapse-item__content{
		padding:10px 0;
		border-top:1px solid #ebeef5;
	}
</style>
<style scoped="scoped" lang="scss">
@import "~scss/common.scss";
*{
	box-sizing: border-box;
}
.top{
	padding:29px 0;
	
	>.el-col{
    display: flex;
    justify-content: center;
    border-right: 2px solid #ccc;
    height: 10px;
    align-items: center;
    &:nth-of-type(1){
    	color:#0b61d6;
    }
     &:nth-of-type(2){
    	border-right:none;
    }
    >i{
    	margin-right:10px;
    	font-size:18px;
    	font-weight: bold;
    }
    
	}
}
	.editTemContain{
		padding:68px 120px 0;
		background-color:#f3f3f3;
		>div{
			background-color:#fff;
		}
	}
	.conTop{
		padding:15px 0;
		background: #303033;
		color:#fff;
		font-size:14px;
		i{
			font-size:20px;
			margin-right:18px;
			display: inline-block;
			vertical-align: middle;
		}
	}
	.conBottom{
		padding:60px;
		background-color:#fff;
		font-size:14px;
		
	}
	.conBottomT{
		padding-bottom:35px;
		border-bottom: 1px dashed #e4e4e4;
		margin-bottom: 35px;
		>p{
			color:#666;
			line-height: 30px;
		}
	}
	h6{
		text-align: center;
		padding-bottom:40px;
	}
	.el-collapse-item{
		
		border-color:#e0e0e0;
		border-radius: 4px;
		margin-bottom:20px;
		border: 1px solid #ebeef5;
		
	}
	
	.el-collapse{
		border:none;
	}
	
</style>
<template>
	<div>
		<div class="editTemContain">
			<div>
				<el-row  type="flex" justify="space-between" class="conTop">
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
						<h6>问卷标题</h6>
						<p v-text="contentText"></p>
					</div>
				
				
				<el-collapse v-model="activeNames" @change="handleChange">
					<el-collapse-item title="一、模块名称" name="1">
						 <el-dropdown trigger="click">
						      <span class="el-dropdown-link">
						        下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
						      </span>
						      <el-dropdown-menu slot="dropdown">
						        <el-dropdown-item>黄金糕</el-dropdown-item>
						        <el-dropdown-item>狮子头</el-dropdown-item>
						        <el-dropdown-item>螺蛳粉</el-dropdown-item>
						        <el-dropdown-item>双皮奶</el-dropdown-item>
						        <el-dropdown-item>蚵仔煎</el-dropdown-item>
						      </el-dropdown-menu>
						    </el-dropdown>
						<div class="collapseinner">
								<el-row>
									<el-col :span="24"><span>第1题：</span><span>您的姓名：</span><span class="typetip">【填空题】</span></el-col>
								
									<el-col :span="23" :offset="1">
										<el-button size="medium">查看详细信息</el-button>
									</el-col>
								</el-row>
							<el-row >
									<el-col :span="24"><span>第2题：</span><span>您的性别：</span><span class="typetip">【单选题】</span></el-col>
								<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="date"
      label="选项"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="小计"
      width="180">
    </el-table-column>
    <!--<el-table-column
      prop="address"
      label="比例">
      
    </el-table-column>-->
    <el-table-column label="地址">
          <template slot-scope="scope" v-if="scope.row.date!='本题有效填写人次'">
              <el-progress :percentage="scope.row.address"></el-progress>
          </template>
      </el-table-column>

  </el-table>
</template>
							</el-row>
						</div>
						
						
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
					  tableData: [{
          date: '男',
          name: '0',
          address:  50

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
	.el-table th>.cell{
		text-align: center;
	}
</style>
<style scoped="scoped" lang="scss">


.el-main{
	background-color:#f3f3f3;
}
	.editTemContain{
		padding:68px 120px 0;
		background-color:#f3f3f3;
		>div{
			background-color:#fff;
			padding:0 30px;
		}
	}
	.conTop{
		padding:15px 0;
		
		color:#fff;
		font-size:14px;
		.el-button{
			border:none;
			text-align: center;
			color:#fff;
			padding:14px 26px;
    padding-left: 50px;
    &.analysisicon{
		background: #ffbc1b url(../../statics/images/analysisicon.png) 18px center no-repeat;
	}
			&.downloadicon{
				background: #005ad4 url(../../statics/images/downloadicon.png) 18px center no-repeat;
			}
			&.lasticon{
				border:1px solid #005ad4;
				color:#005ad4;
				padding:14px 25px;
				padding-left:14px;
			}	
				
			
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
		position:relative;
		
	}
	
	.el-collapse{
		border:none;
	}
	
	.toprightbt{
		text-align: right;
	}
	

	.collapseinner{
		padding:22px;
		.el-row{
			padding-bottom:30px;
			border-bottom: 1px dashed #e4e4e4;
			>.el-col:nth-of-type(1){
				margin-bottom:25px;
			}
		}
		
	}
	.el-table,.el-table th>.cell{
		text-align: center;
	}
	
</style>
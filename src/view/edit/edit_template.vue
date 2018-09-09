<template>
	<div>
		<el-row :gutter="20" class="top">
			<el-col :span="3" :offset="9">
				<i class="el-icon-search"></i>预览</el-col>
			<el-col :span="3"><i class="el-icon-check"></i>完成</el-col>
		</el-row>
		<div class="editTemContain">
			<div>
				<el-row type="flex" justify="end" class="conTop">
					<el-col :span="3" @click.native="openModel"><i class="el-icon-plus"></i>新建模块</el-col>
				</el-row>
				<div class="conBottom">
					<div class="conBottomT">
						<h6>问卷标题</h6>
						<p v-text="contentText"></p>
					</div>

					<el-collapse v-model="activeNames" @change="handleChange">
						<div class="edit_item" v-for="item in list">
							<el-dropdown trigger="click" placement="bottom">
								<span class="el-dropdown-link">
						        	<i class="new"></i> 新建题目
						        </span>
								<el-dropdown-menu slot="dropdown">
									<el-dropdown-item>填空题</el-dropdown-item>
									<el-dropdown-item>选择题</el-dropdown-item>
									<el-dropdown-item>多选题</el-dropdown-item>
									<el-dropdown-item>位置上传</el-dropdown-item>
									<el-dropdown-item>分数题</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<el-collapse-item :title="item.title">
								<!--<topic></topic>-->
							</el-collapse-item>
						</div>
					</el-collapse>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import headTop from 'view/head/headTop.vue';
	import topic from 'components/topic.vue';

	export default {
		data() {
			return {
				contentText: '添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加问卷说明添加添加问卷说明添加问卷说明添加问卷说明添加问卷说明添卷说明',
				activeNames: ['1'],
				region: "",
				modelId: "",
				list: []
			}
		},
		methods: {
			handleChange(val) {
				console.log(val);
			},
			openModel() {
				let self = this;
				this.$prompt('请输入模块名称', '新建模块', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					//        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
					//      inputErrorMessage: '邮箱格式不正确'
				}).then(({
					value
				}) => {
					var option = {};
					option.title = (self.list.length + 1) + "、" + value;
					debugger
					option.tlist = [];
					self.list.push(option);

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消输入'
					});
				});
			}

		},
		created() {
			this.region = this.$route.query.region;
			this.modelId = this.$route.query.modelId;
		},
		components: {
			headTop,
			topic
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
	
	.el-popper[x-placement^=bottom] .popper__arrow::after {
		border-bottom-color: #005ad4;
	}
</style>
<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.top {
		padding: 29px 0;
		>.el-col {
			display: flex;
			justify-content: center;
			border-right: 2px solid #ccc;
			height: 10px;
			align-items: center;
			&:nth-of-type(1) {
				color: #0b61d6;
			}
			&:nth-of-type(2) {
				border-right: none;
			}
			>i {
				margin-right: 10px;
				font-size: 18px;
				font-weight: bold;
			}
		}
	}
	
	.editTemContain {
		padding: 68px 120px 0;
		background-color: #f3f3f3;
		>div {
			background-color: #fff;
		}
	}
	
	.conTop {
		padding: 15px 0;
		background: #303033;
		color: #fff;
		font-size: 14px;
		i {
			font-size: 20px;
			margin-right: 18px;
			display: inline-block;
			vertical-align: middle;
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
	}
	
	.el-collapse {
		border: none;
	}
	
	.new {
		background: url(../../statics/images/newquestion.png) no-repeat;
		position: absolute;
		top: 13px;
		display: inline-block;
		left: 17px;
		height: 20px;
		width: 20px;
	}
	
	.newitem {
		position: absolute;
		top: 0;
		right: 100px;
		background: #005ad4;
		color: #fff;
		z-index: 100;
		padding: 10px 0;
		li {
			&:nth-of-type(1) {
				padding: 7px 30px 7px 50px;
			}
			padding:7px 60px 7px 20px;
		}
	}
	
	.el-dropdown {
		position: absolute;
		top: 0;
		right: 100px;
		background: #005ad4;
		color: #fff;
		z-index: 100;
		padding: 15px 40px;
	}
	
	.el-dropdown-menu {
		/*top:170px !important;*/
		padding: 10px 20px;
		background: #005ad4;
	}
	
	.el-dropdown-menu__item {
		color: #fff;
	}
	
	.el-popper[x-placement^=bottom] .popper__arrow::after {
		border-bottom-color: #005ad4;
	}
	
	.edit_item {
		position: relative;
	}
</style>
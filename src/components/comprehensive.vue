<template>
	<div class="compre">
							<el-collapse v-model="activeNames" @change="handleChange">
						<div class="edit_item" v-for="(item,index) in list" :key="index">
							<el-dropdown placement="bottom">
								<span class="el-dropdown-link">
						        	<i class="new"></i> 新建题目
						        </span>
								<el-dropdown-menu slot="dropdown" class="topicdropdown">
									<el-dropdown-item @click.native="addItem(index,'fill')">填空题</el-dropdown-item>
									<el-dropdown-item @click.native="addItem(index,'single')">选择题</el-dropdown-item>
									<el-dropdown-item @click.native="addItem(index,'multiple')">多选题</el-dropdown-item>
									<el-dropdown-item @click.native="addItem(index,'loCation')">位置上传</el-dropdown-item>
									<el-dropdown-item @click.native="addItem(index,'uploadimg')">图片上传</el-dropdown-item>
									<el-dropdown-item @click.native="addItem(index,'multistage')">多级下拉</el-dropdown-item>
									<el-dropdown-item @click.native="addItem(index,'fractions')">分数题</el-dropdown-item>
									
								</el-dropdown-menu>
							</el-dropdown>
							<el-input v-model="item.title" placeholder="模块名称" class="titlename"></el-input>
							<el-collapse-item :title="item.qtitle" :name="index">

								<div class="topic" v-for="(qitem,qindex) in item.qlist" :key="qindex">

									<!--<topic :list="list"></topic>-->
									<template v-if="qitem.qtype=='fill'">
										<fill :item="qitem" @removeDomain="removeDomain" :index="index" :qindex="qindex"></fill>
									</template>
									<template v-if="qitem.qtype=='single'">
										<single :item="qitem" @changeDomainRadio="changeDomainRadio" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown"></single>
									</template>
									<template v-if="qitem.qtype=='multiple'">
										<multiple :item="qitem" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown"></multiple>
									</template>
									<template v-if="qitem.qtype=='multistage'">
										<multistage :item="qitem" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown"></multistage>
									</template>
									<template v-if="qitem.qtype=='loCation'">
										<loCation :item="qitem" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown"></loCation>
									</template>
									<template v-if="qitem.qtype=='uploadimg'">
										<uploadimg :item="qitem" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown"></uploadimg>
									</template>
									<template v-if="qitem.qtype=='fractions'">
										<fractions :item="qitem" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown"></fractions>
									</template>								
								</div>
							</el-collapse-item>
						</div>
					</el-collapse>
	</div>
</template>

<script>
	import headTop from 'view/head/headTop.vue';
	import topic from 'components/topic.vue';
	import fill from 'components/fill.vue';
	import single from 'components/single.vue';
	import multiple from 'components/multiple.vue';
	import multistage from 'components/multistage.vue';
	import uploadimg from 'components/uploadimg.vue';
	import loCation from 'components/loCation.vue';
	import fractions from 'components/fractions.vue';
	import { Message } from "element-ui";
	import comprehensive from 'components/comprehensive.vue';
	export default {
		data() {
			return {
				contentText: '',
				questiontitle: '',
				activeNames: [],
				region: "",
				modelId: "",
				list: []
			}
		},
		methods: {
			handleChange(val) {
				console.log(val);
			},
			addfill(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "fill",
					must: false,
					name: "",
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false
				});

			},
			addsingle(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "single",
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					domack: '0',
					domains: [{
						value: '选项',
						sort: 1
					}]
				});
			},
			addmultiple(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "multiple",
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					domains: [{
						value: '选项',
						sort: 1
					}],
					checkedGroup: ['篮球', '足球'],
					GroupList: ''
				});

			},
			addmultistage(index) {
				let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "multistage",
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					options2: [{
						value: '选项1',
						label: "上海"
					}, {
						value: '选项2',
						label: '北京',
						disabled: true
					}],
					options3: [{
							value: '选项1',
							label: "一级选项"
						}, {
							value: '选项2',
							label: '二级选项',
							disabled: true
						},
						{
							value: '选项3',
							label: '三级选项',
							disabled: true
						},
						{
							value: '选项4',
							label: '四级选项',
							disabled: true
						}
					],
					options4: [{
						value: '选项1',
						label: "上海"
					}, {
						value: '选项2',
						label: '北京',
						disabled: true
					}],
					options5: [{
						value: '选项1',
						label: "上海"
					}, {
						value: '选项2',
						label: '北京',
						disabled: true
					}],
					value2: ''

				})
			},
			adduploadimg(index) {
				let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "uploadimg",
					namevalue: '标题',
					must: false,
					show: true,
					edittextinput: true,
					changeButton: false,
					options: [{
						imagescr: '',
					}],
					imageLength: 1,
					imageUrl:''
				})
			},
			addloCation(index) {
				let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "loCation",
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
				})
			},
			addfractions(index) {
				let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					qtitle: ix,
					qtype: "fractions",
					silidervalue: 100,
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
				})
			},
			addcomprehensive(index){
								let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					qtitle:ix,
					qtype:"comprehensive",
					
				});

			},
			addItem(index, type) {
				switch(type) {
					case "fill":
						{
							this.addfill(index);
						}
						break;
					case "single":
						{
							this.addsingle(index);
						}
						break;
					case "multiple":
						{
							this.addmultiple(index);
						}
						break;
					case "multistage":
						{
							this.addmultistage(index);
						}
						break;
					case "uploadimg":
						{
							this.adduploadimg(index);
						}
						break;
					case "loCation":
						{
							this.addloCation(index);
						}
						break;
					case "fractions":
						{
							this.addfractions(index);
						}
						break;
						case "comprehensive":
						{
							this.addcomprehensive(index);
						}
						break;
					default:
						break;
				}
				this.activeNames.indexOf(index) == -1 && this.activeNames.push(index)
			},
			addDomain(index, qindex) {
				let sort = this.list[index].qlist[qindex].domains.length + 1;
				let options = {
					"value": "选项",
					"sort": sort
				}
				this.list[index].qlist[qindex].domains.push(options);
			},
			changeDomainRadio(index, qindex, v) {
				this.list[index].qlist[qindex].domack = v;
			},
			removeDomain(index, qindex) {

				//				let aindex = this.list[index].qlist[qindex];
				//					aindex && this.list[index].qlist.splice(aindex, 1)
				let nlist = this.list[index].qlist.deleteIndex(qindex);
				this.list[index].qlist = nlist;
			},
			removeDomainitem(index, qindex, dindex) {
				let dlist = this.list[index].qlist[qindex].domains.deleteIndex(dindex);
				this.list[index].qlist[qindex].domains = dlist;
			},
			domainSortdown(index, qindex, dindex, type) {
				var sdomainItem = this.list[index].qlist[qindex].domains[dindex];
				var sortList = this.list[index].qlist[qindex].domains;
				var sortId = sdomainItem.sort; //排序
				if(type == "up") {
					if(sortId != 1) {
						let uitem = this.list[index].qlist[qindex].domains[dindex - 1];
						let iuitem = this.list[index].qlist[qindex].domains.indexOf(uitem);
						let usort = uitem.sort;
						uitem.sort = sortId;
						sortList.splice(iuitem, 1, uitem);
						sdomainItem.sort = usort;
						sortList.splice(dindex, 1, sdomainItem);
					}
				} else {
					if(sortId != sortList.length) {
						let uitem = this.list[index].qlist[qindex].domains[dindex + 1];
						let iuitem = this.list[index].qlist[qindex].domains.indexOf(uitem);
						let usort = uitem.sort;
						uitem.sort = sortId;
						sortList.splice(iuitem, 1, uitem);
						sdomainItem.sort = usort;
						sortList.splice(dindex, 1, sdomainItem);
					}
				}
				sortList.sort(function(a, b) {
					return a.sort - b.sort;
				});
				this.list[index].qlist[qindex].domains = sortList;

			},
			openModel() {
				let self = this;
				//				this.$prompt('请输入模块名称', '新建模块', {
				//					confirmButtonText: '确定',
				//					cancelButtonText: '取消',
				//        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
				//      inputErrorMessage: '邮箱格式不正确'
				//				}).then(({
				//					value
				//				}) => {
				var option = {};
				//					option.title = value;
				option.title = "模板名称";
				option.qtitle = self.list.length + 1 + '、';
				option.qlist = [];
				self.list.push(option);

				//				}).catch(() => {
				//					this.$message({
				//						type: 'info',
				//						message: '取消输入'
				//					});
				//				});
			}

		},
		mounted: function() {

			console.log(this.activeNames);
		},

		created() {
			this.region = this.$route.query.region;
			this.modelId = this.$route.query.modelId;

		},

		components: {
			headTop,
			topic,
			fill,
			single,
			multiple,
			multistage,
			loCation,
			uploadimg,
			fractions,
			comprehensive
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
	
	.topicdropdown.el-popper[x-placement^=bottom] .popper__arrow::after {
		border-bottom-color: #005ad4;
	}
	
	.topicdropdown.el-popper[x-placement^=top] .popper__arrow::after {
		border-top-color: #005ad4;
	}
	
	.questiontitle .el-input__inner {
		border: none;
		text-align: center;
	}
	
	.questiontitle .el-textarea__inner {
		border: none;
		text-align: left;
	}
	
	.titlename .el-input__inner {
		width: 40%;
		margin-top: 5px;
		border: none;
	}
	
	.topic .el-form-item__label {
		display: block;
		width: 100%;
		text-align: left;
	}
</style>
<style scoped="scoped" lang="scss">
	* {
		box-sizing: border-box;
	}
	
	.edit_tempbg {
		background-color: #f3f3f3;
	}
	
	.top {
		padding: 29px 0;
		background-color: #fff;
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
		height: 100%;
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
		.el-input {
			.el-input__inner {
				border: none;
				text-align: center;
			}
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
	
	.questiontitle .el-input__inner {
		border: none;
		text-align: center;
	}
	
	.titlename {
		position: absolute;
		top: 0;
		left: 50px;
		z-index: 200;
		width: 50%;
	}
</style>
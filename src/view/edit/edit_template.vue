<template>
	<div class="edit_tempbg">
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
						<el-input type="text" v-model="questiontitle" placeholder="问卷标题" class="questiontitle"></el-input>
						<el-input type="textarea" v-model="contentText" placeholder="问卷说明" class="questiontitle"></el-input>
					</div>

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
									<el-dropdown-item @click.native="addItem(index,'comprehensive')">综合题</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>
							<el-input v-model="item.mod_name" placeholder="模块名称" class="titlename"></el-input>
							<el-collapse-item :title="item.qtitle" :name="index">

								<div class="topic" v-for="(qitem,qindex) in item.qlist" :key="qindex">

									<template v-if="qitem.sub_cat=='fill'">
										<fill :item="qitem" @removeDomain="removeDomain" :taccord="taccord" :index="index" :qindex="qindex" @itemSortdown="itemSortdown" @submitForm="submitForm"></fill>
									</template>
									<template v-if="qitem.sub_cat=='single'">
										<single :item="qitem" :qlist="item.qlist" :taccord="taccord" @changeDomainRadio="changeDomainRadio" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></single>
									</template>
									<template v-if="qitem.sub_cat=='multiple'">
										<multiple :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></multiple>
									</template>
									<template v-if="qitem.sub_cat=='multistage'">
										<multistage :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></multistage>
									</template>
									<template v-if="qitem.sub_cat=='loCation'">
										<loCation :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></loCation>
									</template>
									<template v-if="qitem.sub_cat=='uploadimg'">
										<uploadimg :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></uploadimg>
									</template>
									<template v-if="qitem.sub_cat=='fractions'">
										<fractions :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></fractions>
									</template>
									<template v-if="qitem.sub_cat=='comprehensive'">
										<comprehensive @deleCom="delem" :taccord="taccord" :index="index" :list="qitem.list" :qindex="qindex" @itemSortdown="itemSortdown"></comprehensive>
									</template>

								</div>
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
				list: [],
				taccord: "、",
				questionId: "",
				parentModle: "",

			}
		},
		methods: {
			handleChange(val) {
				console.log(val);
			},
			addfill(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					ppid: this.questionId,
					pid: 0,
					id: 0,
					serial_number: '',
					qtitle: ix,
					sub_cat: "fill",
					is_must: false,
					title: '标题',
					show: true,
					edittextinput: true,
					changeButton: false
				});
			},
			addsingle(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					ppid: this.questionId,
					pid: 0,
					id: 0,
					serial_number: 0,
					qtitle: ix,
					sub_cat: "single",
					is_must: false,
					title: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					default_choose: '',
					option: [{
						id: 0,
						order_num: 1,
						option_name: '选项1',
						default_choose: 0,
						related_sub: "",
						skip_sub: ""
					}]
				});
			},
			addmultiple(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					poSition: '',
					qtitle: ix,
					qtype: "multiple",
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					domains: [{
						value: '选项1',
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
					poSition: '',
					qtitle: ix,
					qtype: "multistage",
					must: false,
					namevalue: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					doptions: [{
							value: '2',
							label: '2级',
							disabled: true
						},
						{
							value: '3',
							label: '3级',
							disabled: true
						},
						{
							value: '4',
							label: '4级',
							disabled: true
						}
					],
					value: "2",
					olist: [{
						"name": "",
						"value": "",
						"id": 1,
						"svalue": "",
						"options": [],
						"childList": []
					}, {
						"name": "",
						"id": 2,
						"svalue": "",
						"value": "",
						"options": [],
						"childList": []
					}, {
						"name": "",
						"svalue": "",
						"value": "",
						"id": 3,
						"options": [],
						"childList": []
					}, {
						"name": "",
						"svalue": "",
						"value": "",
						"id": 4,
						"options": [],
						"childList": []
					}]
				})
			},
			adduploadimg(index) {
				let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					poSition: '',
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
					imageUrl: ''
				})
			},
			addloCation(index) {
				let ix = this.list[index].qlist.length + 1;

				let dindex = !!this.list[index].qlist.domains ? this.list[index].qlist.domains.length : 1;
				this.list[index].qlist.push({
					poSition: '',
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
					poSition: '',
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
			addcomprehensive(index) {
				let ix = this.list[index].qlist.length + 1;
				var option = {};
				option.title = "综合题名称";
				option.qtitle = this.list[index].qlist.length + 1 + '、';
				option.qlist = [];
				option.changeButton = false;
				this.list[index].qlist.push({
					poSition: '',
					qtitle: ix,
					qtype: "comprehensive",
					list: [option],

				});
			},
			delem(index, pindex) {
				this.list[index].qlist.splice(pindex, 1);
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
				let sort = this.list[index].qlist[qindex].option.length + 1;
				let options = {
					id: 0,
					order_num: sort,
					option_name: "选项" + sort,
					default_choose: 0,
					related_sub: '',
					skip_sub: ''
				}
				this.list[index].qlist[qindex].option.push(options);
			},
			changeDomainRadio(index, qindex, v) {
				this.list[index].qlist[qindex].default_choose = v;
				let domainlist = this.list[index].qlist[qindex].option;
				for(let i in domainlist) {
					if(domainlist[i].option_name == v) {
						domainlist[i].default_choose = 1;
					}
				}
			},
			removeDomain(index, qindex) {
				let nlist = this.list[index].qlist.deleteIndex(qindex);
				this.list[index].qlist = nlist;
			},
			removeDomainitem(index, qindex, dindex) {
				let dlist = this.list[index].qlist[qindex].option.deleteIndex(dindex);
				this.list[index].qlist[qindex].option = dlist;
			},
			itemSortdown(index, qindex, type) {
				debugger
				var listItem = this.list[index].qlist[qindex];
				var sortList = this.list[index].qlist;
				debugger
				var sortId = listItem.order_num;
				if(type == 'up') {
					if(sortId != 1) {
						let uitem = this.list[index].qlist[qindex - 1];
						let iuitem = this.list[index].qlist.indexOf(uitem);
						let usort = uitem.qtitle;
						uitem.order_num = sortId;
						sortList.splice(iuitem, 1, uitem);
						listItem.order_num = usort;
						sortList.splice(qindex, 1, listItem);
					} else {
						this.$message({
							type: 'error',
							message: '已经是第一题，无法继续上移!'
						});
					}
				} else if(type == 'down') {
					if(sortId != sortList.length) {
						let uitem = this.list[index].qlist[qindex + 1];
						let iuitem = this.list[index].qlist.indexOf(uitem);
						let usort = uitem.qtitle;
						uitem.order_num = sortId;
						sortList.splice(iuitem, 1, uitem);
						listItem.qtitle = usort;
						sortList.splice(qindex, 1, listItem);
						debugger

					} else {
						this.$message({
							type: 'error',
							message: '已经是最后一题，无法继续下移!'
						});

					}
				} else {
					let jumpnum = parseInt(this.list[index].qlist[qindex].poSition);
					if(jumpnum != sortId) {
						let uitem = this.list[index].qlist[jumpnum - 1];
						let iuitem = this.list[index].qlist.indexOf(uitem);
						let usort = jumpnum;
						uitem.order_num = sortId;
						sortList.splice(iuitem, 1, uitem);
						listItem.order_num = usort;
						sortList.splice(qindex, 1, listItem);
						listItem.changeButton = !listItem.changeButton;
						listItem.poSition = '';
					} else {
						this.$message({
							type: 'error',
							message: '已经是第' + jumpnum + '题，无法进行跳转!'
						});
					}

				}
				sortList.sort(function(a, b) {
					return a.order_num - b.order_num;
				});

				this.list[index].qlist = sortList;

			},
			domainSortdown(index, qindex, dindex, type) {
				var sdomainItem = this.list[index].qlist[qindex].option[dindex];
				var sortList = this.list[index].qlist[qindex].option;
				var sortId = sdomainItem.order_num; //排序
				if(type == "up") {
					let uitem = this.list[index].qlist[qindex].option[dindex - 1];
					if(uitem != undefined && uitem != null) {
						let usort = uitem.order_num;
						uitem.order_num = sortId;
						sdomainItem.order_num = usort;
					}
				} else {
					let uitem = this.list[index].qlist[qindex].option[dindex + 1];
					if(uitem != undefined && uitem != null) {
						let usort = uitem.order_num;
						uitem.order_num = sortId;
						sdomainItem.order_num = usort;
					}
				}
				sortList.sort(function(a, b) {
					return a.order_num - b.order_num;
				});
				this.list[index].qlist[qindex].option = sortList;

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
				option.mod_name = "模板名称";
				option.qtitle = self.list.length + 1 + '、';
				option.id = 0;
				option.pid = 0;
				option.chief = 0;
				option.sortId = 0;
				option.qlist = [];

				//				}).catch(() => {
				//					this.$message({
				//						type: 'info',
				//						message: '取消输入'
				//					});
				//				});
				self.list.push(option);
				//				this.$post("/Home/Subject/createNewMod", {
				//					pid: this.questionId,
				//					chief: this.parentModle || 0,
				//					mod_name: option.mod_name
				//				}).then((res) => {
				//					option.id = res.id;
				//					self.list.push(option);
				//				})
			},
			submitForm(item, index) {
				let subModel = item;
				delete subModel.changeButton;
				delete subModel.edittextinput;
				delete subModel.show;
				delete subModel.id;
				let self = this;
				switch(item.sub_cat) {
					case "fill":
						{
							subModel.option = {};
						}
						break;
					case "single":
						{
							delete subModel.default_choose;
							subModel.option.forEach(item => {
								delete item.id;
							});
						}
						break;
				}
				this.$post("/Home/Subject/createNewItem", subModel).then((res) => {
					self.list[index].id = res.id;
				});
			}
		},
		mounted: function() {
			console.log(this.activeNames);
		},
		created() {
			this.questionId = this.$route.query.questionId;
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
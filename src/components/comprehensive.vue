<template>
	<div class="compre">
		<el-form v-model="activeNames" @change="handleChange">
			<el-form-item class="edit_item" :label="(qindex+1)+comtaccord">
				<el-input v-model="comitem.title" placeholder="综合题名称" class="titlename"></el-input>
				<div class="compretopright">
					<span @click.prevent="deletecomp" class="deletecomp">删除</span>
					<span @click.prevent="changeposition(comitem)" class="oposition">位置变更</span>
					<div class="changeposition" v-show="comitem.changeButton">
						<el-button type="info" plain @click="itemSortdownc(index,qindex,'up')">上移一题</el-button>
						<el-button type="info" plain @click="itemSortdownc(index,qindex,'down')">下移一题</el-button>
						<div>移至【
							<el-input v-model="comitem.poSition" class="inputposition"></el-input>】题
							<el-button type="primary" plain class="positionsure" @click.native="itemSortdownc(index,qindex,'jumpitem')">确定</el-button>
						</div>
					</div>
				</div>
				<el-dropdown placement="bottom">
					<span class="el-dropdown-link">创建小题</span>
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

				<div class="topic" v-for="(qitem,qindex) in comitem.qlist" :key="qindex">
					<template v-if="qitem.sub_cat=='fill'">
						<fill :item="qitem" @removeDomain="removeDomain" :taccord="taccord" :index="index" :qindex="qindex" @itemSortdown="itemSortdown" @submitForm="submitForm"></fill>
					</template>
					<template v-if="qitem.sub_cat=='single'">
						<single :item="qitem" @changeDomainRadio="changeDomainRadio" :taccord="taccord" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></single>
					</template>
					<template v-if="qitem.sub_cat=='multiple'">
						<multiple :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown" @submitForm="submitForm"></multiple>
					</template>
					<template v-if="qitem.sub_cat=='multistage'">
						<multistage :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown" @submitForm="submitForm"></multistage>
					</template>
					<template v-if="qitem.sub_cat=='loCation'">
						<loCation :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown" @submitForm="submitForm"></loCation>
					</template>
					<template v-if="qitem.sub_cat=='uploadimg'">
						<uploadimg :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown" @submitForm="submitForm"></uploadimg>
					</template>
					<template v-if="qitem.sub_cat=='fractions'">
						<fractions :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown" @submitForm="submitForm"></fractions>
					</template>
				</div>
			</el-form-item>

		</el-form>
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
	import { ofill, osingle, omultiple, omultistage, ouploadimg, oloCation, ofractions } from "./itemType";
	export default {
		data() {
			return {
				contentText: '',
				questiontitle: '',
				activeNames: [],
				region: "",
				modelId: "",
				taccord: ") "
			}
		},
		props: {
			index: {
				type: Number,
				default: 0
			},
			qindex: {
				type: Number,
				default: 0
			},
			comitem: {
				type: Object,
				default: {}
			},
			comtaccord: {
				type: String,
				default: ""
			}
		},
		created() {
			//			debugger
			//let aa = this.comitem;
		},
		methods: {
			handleChange(val) {
				console.log(val);
			},
			addfill(index) {
				let ix = this.comitem.qlist.length + 1;
				let ifill = JSON.parse(JSON.stringify(ofill));
				ifill.ppid = this.comitem.pid;
				ifill.pid = this.comitem.id;
				ifill.serial_number = ix;
				ifill.qtitle = ix;
				this.comitem.qlist.push(ifill);
			},
			addsingle(index) {
				let ix = this.comitem.qlist.length + 1;
				let isingle = JSON.parse(JSON.stringify(osingle));				
				isingle.ppid = this.comitem.pid;
			
				isingle.pid = this.comitem.id;
				isingle.serial_number = ix;
				isingle.qtitle = ix;
				this.comitem.qlist.push(isingle);
			},
			addmultiple(index) {
				let ix = this.comitem.qlist.length + 1;
				let imultiple = JSON.parse(JSON.stringify(omultiple));
				imultiple.ppid = this.comitem.pid;
				imultiple.pid = this.comitem.id;
				imultiple.serial_number = ix;
				imultiple.qtitle = ix;
				this.comitem.qlist.push(imultiple);
			},
			addmultistage(index) {
				let ix = this.comitem.qlist.length + 1;
				let imultistage = JSON.parse(JSON.stringify(omultistage));
				imultistage.ppid = this.comitem.pid;
				imultistage.pid = this.comitem.id;
				imultistage.serial_number = ix;
				imultistage.qtitle = ix;
				this.comitem.qlist.push(imultistage);
			},
			adduploadimg(index) {
				let ix = this.comitem.qlist.length + 1;
				let iuploadimg = JSON.parse(JSON.stringify(ouploadimg));
				iuploadimg.ppid = this.comitem.pid;
				iuploadimg.pid = this.comitem.id;
				iuploadimg.serial_number = ix;
				iuploadimg.qtitle = ix;
				this.comitem.qlist.push(iuploadimg);
			},
			addloCation(index) {
				let ix = this.comitem.qlist.length + 1;
				let iloCation = JSON.parse(JSON.stringify(oloCation));
				iloCation.ppid = this.comitem.pid;
				iloCation.pid = this.comitem.id;
				iloCation.serial_number = ix;
				iloCation.qtitle = ix;
				this.comitem.qlist.push(iloCation);
			},
			addfractions(index) {
				let ix = this.comitem.qlist.length + 1;
				let ifractions = JSON.parse(JSON.stringify(ofractions));
				ifractions.ppid = this.comitem.pid;
				ifractions.pid = this.comitem.id;
				ifractions.serial_number = ix;
				ifractions.qtitle = ix;
				this.comitem.qlist.push(ifractions);
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
				let sort = this.comitem.qlist[qindex].option.length + 1;
				let options = {
					id: 0,
					order_num: sort,
					option_name: "选项" + sort,
					default_choose: 0,
					related_sub: '',
					skip_sub: ''
				}
				this.comitem.qlist[qindex].option.push(options);
			},
			changeDomainRadio(index, qindex, v) {
				this.comitem.qlist[qindex].default_choose = v;
				let domainlist = this.comitem.qlist[qindex].option;
				for(let i in domainlist) {
					if(domainlist[i].option_name == v) {
						domainlist[i].default_choose = 1;
					}
				}
			},
			removeDomain(index, qindex) {
				this.$confirm('您确定要删除吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let dmodel = this.comitem.qlist[qindex];
					if(dmodel.id != 0) {
						this.$post("/Home/Subject/deleteItem", {
							id: dmodel.id
						}).then((res) => {});
					}
					let nlist = this.comitem.qlist.deleteIndex(qindex);
					this.comitem.qlist = nlist;
				}).catch(() => {});
			},
			deletecomp() {
				this.$emit("deleCom", this.index, this.qindex);
			},
			changeposition(item) {
				item.changeButton = !item.changeButton;
			},
			removeDomainitem(index, qindex, dindex) {
				let dlist = this.comitem.qlist[qindex].domains.deleteIndex(dindex);
				this.comitem.qlist[qindex].domains = dlist;
			},
			itemSortdownc(index, qindex, type) {
				this.$emit("itemSortdown", index, qindex, type);
			},
			itemSortdown: function(index, qindex, type) {
				var listItem = this.comitem.qlist[qindex];
				var sortList = this.comitem.qlist;
				var serial_number = listItem.serial_number;
				listItem.changeButton = false;
				if(type == 'up') {
					
					let uitem = this.comitem.qlist[qindex - 1];
					if(uitem != undefined && uitem != null) {
						let usort = uitem.serial_number;
						uitem.serial_number = serial_number;
						listItem.serial_number = usort;
					} else {
						this.$message({
							type: 'error',
							message: '已经是第一题，无法继续上移!'
						});
					}
				} else if(type == 'down') {
					let uitem = this.comitem.qlist[qindex + 1];
					if(uitem != undefined && uitem != null) {
						let usort = uitem.serial_number;
						uitem.serial_number = serial_number;
						listItem.serial_number = usort;
					} else {
						this.$message({
							type: 'error',
							message: '已经是最后一题，无法继续下移!'
						});
					}
				} else if(type == 'jumpitem') {
					let num = "";
					num = this.comitem.qlist[qindex].poSition;
					if(window.isNaN(num)) {
						this.$message({
							type: 'error',
							message: '输入有误，无法进行跳转!'
						});
						return;
					}
					let jumpnum = parseInt(num);
					if(jumpnum != serial_number) {
						let uitem = this.comitem.qlist[jumpnum - 1];
						if(uitem != undefined && uitem != null) {
							let usort = uitem.serial_number;
							uitem.serial_number = serial_number;
							uitem.poSition = '';
							listItem.serial_number = usort;
							listItem.poSition = '';
						} else {
							this.$message({
								type: 'error',
								message: '找不到第' + jumpnum + '题，无法进行跳转!'
							});
						}
					} else {
						this.$message({
							type: 'error',
							message: '已经是第' + jumpnum + '题，无法进行跳转!'
						});
					}
				}
				sortList.sort(function(a, b) {
					return a.serial_number - b.serial_number;
				});
				this.comitem.qlist = sortList;
			},
			submitForm(item, index) {
				let subModel = JSON.parse(JSON.stringify(item));
				delete subModel.changeButton;
				delete subModel.edittextinput;
				delete subModel.show;
				delete subModel.poSition;
				//delete subModel.id; //如果 id=0,表示新加，有值表示修改
				let self = this; //fill single  multiple uploadimg loCation fractions 不需要特殊处理
				switch(item.sub_cat) {
					case "multistage":
						{
							let olist = subModel.olist; //多级下拉转换
							let svalue = parseInt(subModel.value); //选择显示几个
							delete subModel.olist;
							delete subModel.doptions;
							delete subModel.value;
							subModel.option = [{
								"default_choose": svalue,
								"option_name": olist
							}];
						}
						break;
					case "single":
						{
							delete subModel.default_choose;
						}
						break;
					case "multiple":
						{
							delete subModel.checkedGroup;
						}
						break;
				}
				this.$post("/Home/Subject/createNewItem", subModel).then((res) => {
					item.id = res.id;
				});
			},
			domainSortdown(index, qindex, dindex, type) {
				var sdomainItem = this.comitem.qlist[qindex].option[dindex];
				var sortList = this.comitem.qlist[qindex].option;
				var sortId = sdomainItem.order_num; //排序
				if(type == "up") {
					let uitem = this.comitem.qlist[qindex].option[dindex - 1];
					if(uitem != undefined && uitem != null) {
						let usort = uitem.order_num;
						uitem.order_num = sortId;
						sdomainItem.order_num = usort;
					}
				} else {
					let uitem = this.comitem.qlist[qindex].option[dindex + 1];
					if(uitem != undefined && uitem != null) {
						let usort = uitem.order_num;
						uitem.order_num = sortId;
						sdomainItem.order_num = usort;
					}
				}
				sortList.sort(function(a, b) {
					return a.order_num - b.order_num;
				});
				this.comitem.qlist[qindex].option = sortList;
			}
		},
		mounted: function() {
			console.log(this.activeNames);
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
			fractions
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
	
	.topic .compre .el-form-item__label {
		/*width: 0;
    text-align: right;
    margin-left: 50px;
        margin-top: 5px;*/
	}
	
	.topic .compre>.el-form>.edit_item>.el-form-item__label {
		width: 0;
		text-align: right;
		margin-left: 50px;
		margin-top: 5px;
		float: left;
	}
	
	.topic .compre>.el-form>.edit_item>.el-form-item__content>.compretopright>.changeposition {
		right: 12%;
		top: 35px;
	}
	
	.topic .compre .titlename {
		position: initial;
		width: 60%;
	}
	/*.compre .el-dropdown{
		position: inherit !important;
	}*/
	
	.compre .el-dropdown {
		top: 6px !important;
	}
	
	.el-dropdown-menu:nth-of-type(2).el-popper[x-placement^=bottom] .popper__arrow::after {
		border-bottom-color: #fff;
	}
	
	.el-dropdown-menu:nth-of-type(2).el-popper[x-placement^=top] .popper__arrow::after {
		border-top-color: #fff;
	}
	
	.compre .changeposition .el-button {
		width: 100%;
		display: block;
	}
	
	.compre .changeposition .el-button.positionsure {
		width: 40px;
		display: inline-block;
		margin: 0;
		padding: 3px 0;
	}
	
	.compre .changeposition {}
	
	.el-collapse-item__wrap {
		overflow: initial;
	}
	
	.compre .changeposition .inputposition .el-input__inner {
		background-color: rgb(245, 245, 245);
		height: 14px;
		line-height: 14px;
		margin: 0;
		border: none;
		padding: 0 5px;
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
		/*background: url(../statics/images/newquestion.png) no-repeat;*/
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
		/*background: #005ad4;*/
		/*color: #fff;*/
		/*z-index: 100;
		padding: 10px 0;
		li {
			&:nth-of-type(1) {
				padding: 7px 30px 7px 50px;
			}
			padding:7px 60px 7px 20px;
		}*/
	}
	
	.el-dropdown {
		position: absolute;
		top: 12px;
		right: 100px;
		/*background: #005ad4;*/
		color: #299bfc;
		/*z-index: 100;
		padding: 15px 40px;*/
	}
	
	.el-dropdown-menu {
		top: 170px !important;
		/*padding: 10px 20px;
		background: #005ad4;*/
	}
	/*.el-dropdown-menu__item {
		color: #fff;
	}*/
	
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
	
	.deletecomp {
		position: absolute;
		right: 40px;
		color: #299bfc;
		top: 12px;
	}
	/*.compreitem .el-dropdown{
		background:none;
		color:#299bfc;
	}*/
	
	.changeposition {
		padding: 5px 0;
		width: 20%;
		position: absolute;
		right: 23%;
		z-index: 1000;
		top: 5%;
		background: rgb(245, 245, 245);
		text-align: center;
		>* {
			color: #000;
			height: 24px;
			line-height: 24px;
			margin: 0;
			padding: 0;
		}
	}
	
	.changeposition .el-button {
		border: none;
	}
	
	.changeposition .inputposition .el-input__inner {
		background-color: rgb(245, 245, 245);
		height: 14px;
		line-height: 14px;
		margin: 0;
		border: none;
		padding: 0 5px;
	}
	
	.changeposition>div>span {
		display: inline-block;
		width: 0;
	}
	
	.compre .compretopright {
		width: 15%;
		display: inline-block;
		span {
			width: 48%;
			display: inline-block;
		}
	}
	
	.compre .deletecomp {
		position: initial;
	}
	
	.oposition {
		color: #299bfc;
	}
	
	.compre {
		.changeposition .inputposition .el-input__inner {
			background-color: rgb(245, 245, 245);
			height: 14px;
			line-height: 14px;
			margin: 0;
			border: none;
			padding: 0 5px;
		}
	}
</style>
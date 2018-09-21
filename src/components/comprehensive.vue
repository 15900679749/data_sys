<template>
	<div class="compre">
		<el-form v-model="activeNames" @change="handleChange">
			<el-form-item class="edit_item" v-for="(item,index) in list" :key="index" :label="item.qtitle">
				<el-input v-model="item.title" placeholder="模块名称" class="titlename"></el-input>
				<div class="compretopright">
					<span @click.prevent="deletecomp" class="deletecomp">删除</span>
					<span @click.prevent="changeposition(item)" class="oposition">位置变更</span>
					<div class="changeposition" v-show="list.changeButton">
						<el-button type="info" plain @click="itemSortdown(index,qindex,'up')">上移一题</el-button>
						<el-button type="info" plain @click="itemSortdown(index,qindex,'down')">下移一题</el-button>
						<div>移至【
							<el-input v-model="item.poSition" class="inputposition"></el-input>】题
							<el-button type="primary" plain class="positionsure" @click.native="itemSortdown(index,qindex,'jumpitem')">确定</el-button>
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

				<!--<el-collapse-item :title="item.qtitle" :name="index">-->

				<div class="topic" v-for="(qitem,qindex) in item.qlist" :key="qindex">

					<!--<topic :list="list"></topic>-->
					<template v-if="qitem.sub_cat=='fill'">
						<fill :item="qitem" @removeDomain="removeDomain" :taccord="taccord" :index="index" :qindex="qindex" @itemSortdown="itemSortdown"></fill>
					</template>
					<template v-if="qitem.sub_cat=='single'">
						<single :item="qitem" @changeDomainRadio="changeDomainRadio" :taccord="taccord" @addDomain="addDomain" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown"></single>
					</template>
					<template v-if="qitem.sub_cat=='multiple'">
						<multiple :item="qitem" @addDomain="addDomain" :taccord="taccord" :index="index" :qindex="qindex" @removeDomainitem="removeDomainitem" @removeDomain="removeDomain" @domainSortdown="domainSortdown" @itemSortdown="itemSortdown"></multiple>
					</template>
					<template v-if="qitem.sub_cat=='multistage'">
						<multistage :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" kdsssss @itemSortdown="itemSortdown"></multistage>
					</template>
					<template v-if="qitem.sub_cat=='loCation'">
						<loCation :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown"></loCation>
					</template>
					<template v-if="qitem.sub_cat=='uploadimg'">
						<uploadimg :item="qitem" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown"></uploadimg>
					</template>
					<template v-if="qitem.qtype=='fractions'">
						<fractions :item="sub_cat" :taccord="taccord" :index="index" :qindex="qindex" @removeDomain="removeDomain" @itemSortdown="itemSortdown"></fractions>
					</template>
				</div>
				<!--</el-collapse-item>-->
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
	export default {
		data() {
			return {
				contentText: '',
				questiontitle: '',
				activeNames: [],
				region: "",
				modelId: "",
				taccord: " ) "
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
					serial_number: ix,
					poSition: "",
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
					serial_number: ix,
					poSition: "",
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
					qtitle: ix,
					sub_cat: "multiple",
					title: '标题',
					serial_number: ix,
					poSition: "",
					is_must: false,
					title: '标题',
					show: true,
					edittextinput: true,
					changeButton: false,
					option: [{
						id: 0,
						order_num: 1,
						option_name: '选项1',
						default_choose: 0,
						related_sub: "",
						skip_sub: ""
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
			addmultistage(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					poSition: '',
					qtitle: ix,
					sub_cat: "multistage",
					serial_number: ix,
					is_must: false,
					title: '标题',
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
				this.list[index].qlist.push({
					sub_cat: "uploadimg",
					serial_number: ix,
					poSition: "",
					qtitle: ix,
					is_must: false,
					title: '标题',
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
				this.list[index].qlist.push({
					sub_cat: "loCation",
					title: '标题',
					serial_number: ix,
					poSition: "",
					qtitle: ix,
					sub_cat: "fill",
					is_must: false,
					show: true,
					edittextinput: true,
					changeButton: false,
				})
			},
			addfractions(index) {
				let ix = this.list[index].qlist.length + 1;
				this.list[index].qlist.push({
					poSition: '',
					qtitle: ix,
					sub_cat: "fractions",
					silidervalue: 100,
					serial_number: ix,
					is_must: false,
					title: '标题',
					show: true,
					edittextinput: true,
					changeButton: false
				})
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
			deletecomp() {
				this.$emit("deleCom", this.index, this.qindex);
			},
			changeposition(item) {
				item.changeButton = !item.changeButton;
			},
			removeDomainitem(index, qindex, dindex) {
				let dlist = this.list[index].qlist[qindex].domains.deleteIndex(dindex);
				this.list[index].qlist[qindex].domains = dlist;
			},
			itemSortdown: function(index, qindex, type) {
				this.$emit("itemSortdown", this.index, this.qindex, type, this.list.poSition);
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
			}
		},
		props: {
			list: {
				type: Array,
				default: []
			},
			index: {
				type: Number,
				default: 0
			},
			qindex: {
				type: Number,
				default: 0
			}
		},
		mounted: function() {
			console.log(this.activeNames);
		},
		created() {},
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
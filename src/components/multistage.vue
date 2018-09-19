<template>
	<div>
		<el-form class="mulcontent">
			<el-form-item :label="(qindex+1)+taccord+item.namevalue+':'" :key="index" @mouseover.native.prevent="showcart(item)" @mouseout.native.prevent="showcart(item)" :class="{'bordernone':item.edittextinput,'itemborder':item.show}">
				<i v-if="item.must" v-text="'*'" class="itemmust"></i>
				<div v-for="(oitem,oindex) in item.olist" class="selectdiv">
					<template v-if="oitem.id<=parseInt(item.value)">
						<!--<span>{{oitem.name}}</span>-->
						<el-select placeholder="请选择" v-model="oitem.svalue" @change="dchange(oitem,oindex)">
							<el-option v-for="(obj,indx) in oitem.options" :label="obj.value" :key="indx" :value="obj.value"></el-option>
						</el-select>
					</template>
				</div>
				<div v-show="item.show" class="transition-box">
					<span @click="showedit(item)">编辑</span>
					<span @click.prevent="removeDomain(index,qindex)">删除</span>
					<span @click.prevent="changeposition(item)">位置变更</span>
					<div class="changeposition" v-if="item.changeButton">
						<el-button type="info" plain @click="itemSortdown(index,qindex,'up')">上移一题</el-button>
						<el-button type="info" plain @click="itemSortdown(index,qindex,'down')">下移一题</el-button>
						<div>移至【
							<el-input v-model="item.poSition" class="inputposition"></el-input>】题
							<el-button type="primary" plain class="positionsure" @click.native="itemSortdown(index,qindex,'jumpitem')">确定</el-button>
						</div>
					</div>
				</div>
				<el-row v-if="item.edittextinput" class="edittextinput">
					<el-col class="singleinputcontent">
						<el-form-item :label="'题目文本'">
							<el-input v-model="item.namevalue"></el-input>
							<el-checkbox label="必答" name="type" v-model="item.must"></el-checkbox>
							<div class="singleedit">
								<el-row type="flex">
									<el-col :span="24" class="edittext">多级下拉编辑:</el-col>
								</el-row>
								<el-row type="flex">
									<el-col :span="24">
										<el-form-item label="选项级数：" class="seletlevel">
											<el-select v-model="item.value" placeholder="请选择" @change="schange">
												<el-option v-for="(option,index) in item.doptions" :key="index" :value="option.value" :disabeld="option.disabled" :label="option.label">
												</el-option>
											</el-select>
										</el-form-item>
									</el-col>
								</el-row>
								<el-row type="flex" justify="space-between">
									<el-col :span="5" v-for='(oitem,oindex) in item.olist' :key='oindex' >
										<template v-if="oitem.id<=parseInt(item.value)" >
											<label class="oindex">{{oindex+1}}级选项</label>
											<!--<el-input placeholder="" v-model="oitem.name"></el-input>-->
											<el-input type="textarea" @blur="txtBlur(oitem,oindex)" v-model="oitem.value" :autosize="{ minRows: 2, maxRows: 4}">
											</el-input>
										</template>
									</el-col>
								</el-row>
							</div>

							<el-button type="primary" @click="submitForm(item)">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>

	</div>

</template>

<script>
	import headTop from 'view/head/headTop.vue';
	export default {
		data() {
			return {

			}
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
			index: {
				type: Number,
				default: 0
			},
			qindex: {
				type: Number,
				default: 0
			},
			taccord:{
				type:String,
				default:""
			}
		},
		methods: {
			showedit(item) {
				item.edittextinput = !item.edittextinput;
			},
			showcart(item) {
				item.show = item.edittextinput || !item.show;
				//				item.style={
				//					"border":"1px solid #eee",
				//				}
			},
			submitForm(item) {
				item.edittextinput = !item.edittextinput;
				item.show = !item.show;
			},
			removeDomain() {
				this.$emit("removeDomain", this.index, this.qindex);
			},
			command(callback, vc) {
				console.log("回调参数" + callback);
				if(!callback) {
					var ctx = this;
					ctx.AREACODE2 = '请选择';
					if(vc != '') {
						ctx.show2 = true;
						ctx.getAreaListDataSearch(vc, 1);
					}
				}
			},
			schange(o) {},
			dchange(obj, oindex) {
				let op = this.item.olist[oindex + 1];
				if(op != null) {
					let sd = op.childList.filter(item => {
						return item.label == obj.svalue
					})[0];
					this.item.olist[oindex + 1].options.length = 0;
					let noption = sd.value.split(",");
					noption.forEach(sop => {
						if(sop != "") {
							this.item.olist[oindex + 1].options.push({"label":sop,"value":sop});
						}
					})
				}
			},
			txtBlur(obj, oindex) {
				let varrary = obj.value.split('\n');
				if(varrary.length > 0) {
					obj.childList.length = 0;
					obj.options.length = 0;
					if(obj.value.startsWith("---")) {
						let _arrary = obj.value.split("---");
						_arrary.forEach(item => {
							if(item != "") {
								let _value = item.split("\n");
								let lkey = _value[0];
								let lvalue = _value.join(",");
								lvalue.endsWith(",") && (lvalue = lvalue.substring(0, lvalue.lastIndexOf(',')))
								obj.childList.push({
									"label": lkey,
									"value": lvalue.replace(lkey + ",", "")
								});
								let oary = lvalue.replace(lkey + ",", "").split(",");
								oary.forEach(op => {
									if(op != "") {
										obj.options.push({
											"label": op,
											"value": op
										});
									}
								});
							}
						});
					} else {
						varrary.forEach(v => {
							if(obj.childList.indexOf(v) == -1) {
								obj.childList.push({
									"label": v,
									"value": v
								});
								obj.options.push({
									"label": v,
									"value": v
								});
							}
						})
					}

					let nList = this.item.olist[oindex + 1];
					if(nList != null) {
						nList.childList.length = 0;
						nList.options.length = 0;
						var res = "";
						if(obj.value.startsWith("---")) {
							let _arrary = obj.value.split("---");
							_arrary.forEach(item => {
								if(item != "") {
									let _value = item.split("\n");
									let lkey = _value[0];
									let lvalue = _value.join(",");
									lvalue.endsWith(",") && (lvalue = lvalue.substring(0, lvalue.lastIndexOf(',')))
									let clist = lvalue.replace(lkey + ",", "").split(",");
									clist.forEach(k => {
										if(k != "") {
											res += "---" + k + "\n";
											var vres = "";
											for(var j = 1; j < 3; j++) {
												vres += k + "级选项" + j + ",";
												res += k + "级选项" + j + "\n";
												nList.options.push({
													"label": k,
													"value": k
												});
											}
											nList.childList.push({
												"label": k,
												"value": vres.substring(0, vres.length - 1)
											});
										}
									});
									nList.value = res.substring(0, res.lastIndexOf("\n"));
								}
							});
						} else {
							var res = "";
							for(var i = 0; i < obj.childList.length; i++) {
								res += "---" + obj.childList[i].label + "\n";
								var vres = "";
								for(var j = 1; j < 3; j++) {
									vres += obj.childList[i].label + "级选项" + j + ",";
									res += obj.childList[i].label + "级选项" + j + "\n";
									nList.options.push({
										"label": obj.childList[i].label + "级选项" + j,
										"value": obj.childList[i].label + "级选项" + j
									});
								}
								nList.childList.push({
									"label": obj.childList[i].label,
									"value": vres.substring(0, vres.length - 1)
								});
							}
							nList.value = res.substring(0, res.lastIndexOf("\n"));
						}
					}
				}
			},
			addDomain() { //这个相当于是item就是formlistOne的每一项
				//debugger
				this.cformlistThree[0].domains.push({
					"value": ""
				})
				//				this.formlistOne.domain.domains.push({我不动了
				//					value: ''
				//				});
			},
			changeposition(item) {
				item.changeButton = !item.changeButton;
			},
			itemSortdown:function(index, qindex,type){
				this.$emit("itemSortdown", index, qindex,type);
			},
		},
		created() {

		},
		components: {
			headTop
		}
	}
</script>
<style>
	.topic .el-form-item__label {
		float: none;
	}
	
	.custom-tree-container .custom-tree-node {
		padding-right: 138px;
	}
	
	.custom-tree-container .el-button[data-v-50eb698a] {
		display: inline-block;
	}
	
	
	
	.changeposition .inputposition .el-input__inner {
		background-color: rgb(245, 245, 245);
		height: 14px;
		line-height: 14px;
		margin: 0;
		border: none;
		padding: 0 5px;
	}
	
	.el-form-item .el-input.inputposition {
		margin-left: 0;
	}
	
	.singleedit .el-radio__input.is-checked+.el-radio__label {
		display: none;
	}
	
	.singleedit .el-radio__label {
		display: none;
	}
	
	.singleinputcontent .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
	
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
		.seletlevel .el-form-item__content{
		top:0px;
		display: inline-block;
	}
	.seletlevel .topic .el-form-item__label{
		display: inline-block;
	}
</style>
<style scoped="scoped" lang="scss">
	.el-input {
		width: 30%;
		margin-left: 76px;
	}
	
	.textinputhidden {
		display: none;
	}
	
	.el-form>.el-form-item {
		padding: 10px 5% 0;
		border: 1px solid transparent;
		margin-bottom: 5px;
		padding-bottom: 40px;
	}
	
	.el-form-item__label {}
	
	.el-form>.el-form-item.itemborder {
		border: 1px solid #eee;
		padding-bottom: 0;
	}
	
	.el-form>.el-form-item.bordernone {
		border: 1px solid transparent;
		height: auto;
		/*margin-bottom:30px;*/
	}
	
	.el-button {
		width: 100%;
		padding: 10px 0;
		margin-top: 20px;
		display: block;
	}
	
	.el-form-item .edittextinput {
		border: 1px dashed rgb(121, 121, 121);
		height: auto;
		padding: 10px 5%;
	}
	
	.el-form-item .el-checkbox {
		margin-left: 10%;
	}
	
	.el-form-item .el-input {
		height: 32px;
		line-height: 32px;
	}
	
	.el-collapse-item {
		padding-bottom: 20px;
	}
	
	.transition-box span {
		color: rgb(41, 155, 252);
		text-decoration: underline;
		margin-right: 15%;
		cursor: pointer;
		display: inline-block;
		width: 80px;
	}
	
	.el-dropdown-menu {
		/*position:static !important;*/
	}
	
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
	
	.changeposition>div>span {
		display: inline-block;
		width: 0;
	}
	
	.el-button+.el-button {
		margin-left: 0;
	}
	
	.singleinputcontent p {
		width: 70%;
		padding-left: 5px;
		color: red;
		background: rgb(242, 242, 242);
		margin-top: 20px;
	}
	
	.singleinputcontent .el-input {
		margin-left: 0;
	}
	
	.singleedit .el-row {
		margin-bottom: 10px;
		>.el-col {
			text-align: center;
			&:nth-of-type(1) {
				text-align: left;
			}
		}
	}
	
	.singleedit {
		.iconplus {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 40px;
		}
		i {
			font-size: 24px;
			align-items: center;
			margin-right: 5px;
		}
		.el-radio {
			color: rgba(255, 255, 255, 0);
			border: none;
		}
		.el-input {
			width: 60%;
		}
		.el-icon-back {
			display: flex;
			transform: rotate(-90deg);
			border: 1px solid #303133;
			border-radius: 50%;
			font-weight: bold;
			padding: 2px;
			height: 15px;
			width: 15px;
			font-size: 14px;
		}
		.backright {
			transform: rotate(90deg);
		}
		.btngroup {
			display: flex;
			justify-content: space-between;
			.el-button {
				width: 25%;
			}
		}
	}
	
	.cityoptions .el-col {
		border: 1px solid rgb(121, 121, 121);
		margin-top: 60px;
		position: relative;
		.el-button {
			border: none;
			margin: 0;
		}
		>p {
			position: absolute;
			top: -80px;
			background: none;
			width: 100%;
			color: rgb(121, 121, 121);
			text-align: center;
		}
	}
	.selectdiv{
		display: inline-block;
		margin-right:15px;
		width:23%;
	}
	.edittext{
		background:rgb(242,242,242);
		padding-left:5px;
		box-sizing: border-box;
		margin-top:20px;
	}
.olistlabel label{
	width: 100%;
	text-align: center;
	display: inline-block;
}
.olistlabel .el-textarea .el-textarea__inner{
	height:200px !important;}
	.oindex{
		width: 100%;
		display: inline-block;
		text-align: center;
	}
</style>
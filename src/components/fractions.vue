<template>
	<div>
		<el-form>
			<el-form-item :label="(qindex+1)+taccord+item.title+':'" :key="index" @mouseover.native.prevent="showcart(item)" @mouseout.native.prevent="showcart(item)" :class="[{'bordernone':item.edittextinput,'itemborder':item.show,'itemmust':item.is_must}]">
				<!--<i v-if="item.is_must" v-text="'*'" class="itemmust"></i>-->
				<el-row type="flex" justify="start" class="loCationtips">
					<div class="block">
						<span class="demonstration">{{item.option[0].option_name}}</span>
						<!--<el-slider v-model="item.silidervalue" show-input :max="parseInt(item.silidervalue)"></el-slider>-->
						<!--<el-slider v-model="item.silidervalue" show-input></el-slider>-->
						<el-progress :percentage="100" :show-text="false" style="width:85%;left:5%;top:18px;"></el-progress>

					</div>

				</el-row>
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
							<el-input v-model="item.title"></el-input>
							<el-checkbox label="必答" name="type" v-model="item.is_must" :disabled="status!='1' && type!='0' "></el-checkbox>

						</el-form-item>
						<el-form-item :label="'总分'">
							<el-input v-model="item.option[0].option_name"></el-input>
						</el-form-item>
						<el-button type="primary" @click="submitForm(item)">保存</el-button>
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
				poSition: '',
				cformlistSix: [],
				imageUrl: '',
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
			taccord: {
				type: String,
				default: ""
			},
			status: {
				type: String,
				default: "1"
			},
			type: {
				type: String,
				default: ""
			}
		},
		methods: {
			showedit(item) {
				item.edittextinput = !item.edittextinput;
			},
			showcart(item) {
				if(this.status != "1") {
					return;
				}
				item.show = item.edittextinput || !item.show;
			},
			submitForm(item) {
				if(this.status != "1") {
					return;
				}
				this.$emit("submitForm", item, this.index);
			},
			removeDomain() {
				if(this.status != "1") {

					this.$message({
						type: 'error',
						message: '当前问卷状态无法进行此操作'
					});
					return;
				}
				this.$emit("removeDomain", this.index, this.qindex);
			},
			command(callback, vc) {
				debugger
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
			addDomain() { //这个相当于是item就是formlistOne的每一项
				//debugger
				if(this.status != "1") {

					this.$message({
						type: 'error',
						message: '当前问卷状态无法进行此操作'
					});
					return;
				}
				this.cformlistSix[0].domains.push({
					"value": ""
				})
				//				this.formlistOne.domain.domains.push({我不动了
				//					value: ''
				//				});
			},
			itemSortdown: function(index, qindex, type) {
				if(this.status != "1") {

					this.$message({
						type: 'error',
						message: '当前问卷状态无法进行此操作'
					});
					return;
				}
				this.$emit("itemSortdown", index, qindex, type);
			},
			changeposition(item) {
				if(this.status != "1") {

					this.$message({
						type: 'error',
						message: '当前问卷状态无法进行此操作'
					});
					return;
				}
				item.changeButton = !item.changeButton;
			}
		},
		created() {
			this.cformlistSix = this.formlistSix;
		},
		watch: {
			//			this.cformlistSix[0].silidervalue:function(val){
			//				this.txtSilider=val;
			//				
			//			}
		},
		components: {
			headTop
		}
	}
</script>
<style>
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
	
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 100px;
		height: 100px;
		line-height: 100px;
		text-align: center;
	}
	
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
	
	.elform .el-form-item__label {
		width: 100%;
		text-align: left;
	}
	
	.el-slider__input {
		position: absolute;
		bottom: -175px;
		left: 92px;
		z-index: 222;
	}
	
	.el-slider__input .el-input__inner {}
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
	
	.el-select-dropdown__item {
		text-align: center;
		box-sizing: border-box;
	}
	
	.transition-box {
		position: relative
	}
	
	.elform>label.el-form-item__label {
		width: 100%;
		text-align: left;
	}
	
	.loCationtips {
		width: 100%;
		height: 70px;
		padding-top: 15px;
		.block {
			width: 100%;
			span.demonstration {
				position: absolute;
			}
			.el-slider {
				display: inline-block;
				width: 100%;
				margin-left: 6%;
			}
		}
	}
</style>
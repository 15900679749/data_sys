<template>
	<div>
		<el-form>

			<el-form-item :label="item.qtitle+'、'+item.namevalue+':'" @mouseover.native.prevent="showcart(item)" @mouseout.native.prevent="showcart(item)" :class="{'bordernone':item.edittextinput,'itemborder':item.show}">
				<i v-if="item.must" v-text="'*'" class="itemmust"></i>

				<el-radio-group v-model="item.domack" @change="dochange">
					<el-radio :label="im.value" v-for="(im,inx) in item.domains" :key="inx">{{im.value}}</el-radio>
				</el-radio-group>

				<div v-show="item.show" class="transition-box">
					<span @click="showedit(item)">编辑</span>
					<span @click.prevent="removeDomain(item)">删除</span>
					<span @click.prevent="changeposition(item)">位置变更</span>
					<div class="changeposition" v-if="item.changeButton">
						<el-button type="info" plain>上移一题</el-button>
						<el-button type="info" plain>下移一题</el-button>
						<div>移至【
							<el-input v-model="poSition" class="inputposition"></el-input>】题</div>
					</div>
				</div>
				<el-row v-if="item.edittextinput" class="edittextinput">
					<el-col class="singleinputcontent">
						<el-form-item :label="'题目文本'">
							<el-input v-model="item.namevalue"></el-input>
							<el-checkbox label="必答" name="type" v-model="item.must"></el-checkbox>
							<div class="singleedit">
								<el-row type="flex">
									<el-col :span="16">项目编辑:</el-col>
									<el-col :span="3">默认</el-col>
									<el-col :span="5" style="text-align: center;">操作</el-col>
								</el-row>
								<!--	<el-form-item v-for="(domain, index) in item.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">-->
								
									<el-form-item v-for="(domain, index) in item.domains" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}" :key="index">
										<el-row>
											<el-col :span="16">
												<el-input v-model="domain.value"></el-input>
											</el-col>
											<el-col :span="3">
<el-radio-group v-model="gdomack" @change="gdochange">
												<el-radio :label="domain.value" border></el-radio>
</el-radio-group>
											</el-col>
											<el-col :span="5" class="iconplus">
												<i class="el-icon-circle-plus-outline"></i><i class="el-icon-remove-outline"></i><i class="el-icon-back"></i><i class="el-icon-back backright"></i>
											</el-col>
										</el-row>
									</el-form-item>
								
								<div class="btngroup">
									<el-button @click="addDomain" type="primary" plain>+新增选项</el-button>
									<el-button @click="addDomain()" type="primary" plain>+关联逻辑</el-button>
									<el-button @click="jump()" type="primary" plain>+跳转逻辑</el-button>
								</div>

							</div>
							<p class="tips">注：关联逻辑与跳转逻辑只能设置其中一项</p>
							<el-button type="primary" @click="submitForm(item)">保存</el-button>
						</el-form-item>
					</el-col>
				</el-row>
				<div v-show="jumpshow" class="jump">
					<div class="jumpitem">

						<p>跳题逻辑：</p>
						<div class="jumpitemcontent">
							<ul>
								<li>选项</li>
								<li>男</li>
								<li>女</li>
							</ul>
							<ul>
								<li>跳转到</li>
								<li>
									<el-select v-model="value" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</li>
								<li>
									<el-select v-model="value" placeholder="请选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</li>
							</ul>
						</div>
						<el-button @click="canclejump" size="medium">取消</el-button>
						<el-button size="medium">确定</el-button>

					</div>
				</div>
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
				jumpshow: false,
				gdomack: '',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				value: ''

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
			}
		},
		methods: {
			showedit(item) {
				item.edittextinput = !item.edittextinput;
			},
			dochange(item) {
				this.gdomack=item;
			},
			gdochange(item){
				this.$emit("changeDomainRadio",this.index, this.qindex,item);
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
			removeDomain(item) {
				var index = this.item.indexOf(item);
				if(index !== -1) {
					this.item.splice(index, 1)
				}
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
			addDomain() {
				this.$emit("addDomain", this.index, this.qindex);
			},
			changeposition(item) {
				item.changeButton = !item.changeButton;
			},
			jump() {
				this.jumpshow = true
			},
			canclejump() {
				this.jumpshow = false;
			}

		},
		created() {
			this.gdomack = this.item.domack;
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
	
	.jump {
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .8);
		top: 0;
		z-index: 200;
		.jumpitem {
			position: absolute;
			z-index: 300;
			top: 50%;
			left: 50%;
			width: 30%;
			border: 1px dashed #303133;
			background: #fff;
			transform: translate(-50%, -50%);
			padding: 20px 2% 30px;
			.el-button {
				width: 40%;
				display: inline-block;
				margin-top: 30px;
				&:nth-of-type(1) {
					margin-right: 10%;
					margin-left: 5%;
				}
			}
			.jumpitemcontent {
				width: 100%;
				margin: 0 auto;
				border-top: 1px solid #303133;
				border-left: 1px solid #303133;
				float: left;
				ul {
					&:nth-of-type(1) {
						width: 30%;
					}
					width: 70%;
					float:left;
					li {
						border-bottom: 1px solid #303133;
						border-right: 1px solid #303133;
						text-align: center;
						padding: 8px 0;
						&:nth-of-type(1) {
							background: #409EFF;
							padding: 0;
						}
					}
				}
			}
		}
	}
			.itemmust{
		color:red;
		font-style: normal;
		    position: absolute;
    left: -13px;
    top: 3px;
	}
</style>
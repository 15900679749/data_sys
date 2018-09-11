<template>
	<div>
		<el-form>
			<el-form-item :label="(qindex+1)+'、'+item.namevalue" :key="index" @mouseover.native.prevent="showcart(item)" @mouseout.native.prevent="showcart(item)" :class="{'bordernone':item.edittextinput,'itemborder':item.show}">
				<i v-if="item.must" v-text="'*'"></i>
				<el-checkbox-group v-model="checkedGroup" @change="handleChecked">
					<el-checkbox v-for="(checkoption,index) in GroupList" :label="checkoption" :key="index">{{checkoption}}</el-checkbox>
				</el-checkbox-group>

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
							<el-checkbox label="必答" name="type"></el-checkbox>
							<div class="singleedit">
								<el-row type="flex">
									<el-col :span="19">选项编辑:</el-col>
									<el-col :span="5" style="text-align: center;">操作</el-col>
								</el-row>
							<!--	<el-form-item v-for="(domain, index) in item.domains" :label="'域名' + index" :key="domain.key" :prop="'domains.' + index + '.value'" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">-->
									<el-form-item v-for="(domain, index) in item.domains" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}" :key="index">
									<el-row>
										<el-col :span="19">
											<el-input v-model="item.radioinput1"></el-input>
										</el-col>
										<el-col :span="5" class="iconplus">
											<i class="el-icon-circle-plus-outline"></i><i class="el-icon-remove-outline"></i><i class="el-icon-back"></i><i class="el-icon-back backright"></i>
										</el-col>
									</el-row>
								</el-form-item>
								<div class="btngroup">
									<el-button @click="addDomain()" type="primary" plain>+新增选项</el-button>
									<el-button @click="addDomain()" type="primary" plain>+关联逻辑</el-button>
									<el-button @click="addDomain()" type="primary" plain>+跳转逻辑</el-button>
								</div>
							</div>
							<p class="tips">注：关联逻辑与跳转逻辑只能设置其中一项</p>
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
	const checkOptions=['篮球','足球','羽毛球','乒乓球']
	export default {
		data() {
			return {
				poSition: '',
				cformlistTwo:{},
				checkedGroup:['篮球','足球'],
				GroupList:checkOptions,
				
				
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
				var index = this.formlistTwo.indexOf(item);
				if(index !== -1) {
					this.formlistTwo.splice(index, 1)
				}
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
				this.cformlistTwo[0].domains.push({"value":""})
				//				this.formlistOne.domain.domains.push({我不动了
				//					value: ''
				//				});
			},
			changeposition(item) {
				item.changeButton = !item.changeButton;
			},
			handleChecked(value){
				let checkedCount=value.length;
				
			}
		},
		created(){
			this.cformlistTwo=this.formlistTwo;
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
	.singleedit .el-radio__input.is-checked+.el-radio__label{
			display: none;
		}
	.singleedit	.el-radio__label{
			display: none;
		}
		.singleinputcontent .el-input__inner{
		height:34px;
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
	
	.singleinputcontent p{
			width:70%;
			padding-left:5px;
		    color:red;
		    background: rgb(242,242,242);
		    margin-top:20px;
		}
	.singleinputcontent .el-input{
		margin-left:0;
	}
	.singleedit .el-row{
		margin-bottom: 10px;
		>.el-col{
			text-align: center;
			&:nth-of-type(1){
				text-align: left;
			}
		}
	}
	
	.singleedit{
		.iconplus{
			display: flex;
			align-items: center;
			    justify-content: center;
			    height:40px;
		}
		i{
			font-size:24px;
			    align-items: center;
			    margin-right:5px;
		}
		.el-radio{
		color:rgba(255,255,255,0);
		border:none;
		}
		.el-input{
			width:60%;
		}
		.el-icon-back{
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
			.backright{
			  transform: rotate(90deg);
		   
		}
		.btngroup{
			display: flex;
			justify-content: space-between;
		.el-button{
			width:25%;
			
		}	
		}
		
		
	} 
	
		
</style>
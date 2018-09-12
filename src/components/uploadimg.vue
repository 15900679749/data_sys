<template>
	<div>
		<el-form>
			<el-form-item :label="(qindex+1)+'、'+item.namevalue+':'" :key="index" @mouseover.native.prevent="showcart(item)" @mouseout.native.prevent="showcart(item)" :class="{'bordernone':item.edittextinput,'itemborder':item.show}">
				<i v-if="item.must" v-text="'*'" class="itemmust"></i>
				<el-row  justify="start">
					
					<el-col :span="6" v-for="(inx,index) in item.imageLength" :key="index">
						<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list='true' :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"  :limit="item.imageLength"  >
					<img :src="imageUrl[index]" alt="" v-if="imageUrl[index]" class="avatar"/>
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						</el-upload>	
					</el-col>
				</el-row>
				
				

				<div v-show="item.show" class="transition-box">
					<span @click="showedit(item)">编辑</span>
					<span @click.prevent="removeDomain(index,qindex)">删除</span>
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
								<el-row type="flex" >
									<el-col :span="3">最大上传数量:</el-col>
							
											<el-select v-model="item.imageLength" placeholder="请选择" >
											<!--<el-option v-for="(option,index) in 5" :key="index" :value="option.value" :disabeld="option.disabled" :label="option.label">-->	
												<el-option v-for="(option,index) in 5"  :value="option"  :key="index">{{option}}
											</el-option>
										</el-select>
									
								
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
				poSition: '',
				cformlistFour: {},
				 imageUrl: []
			
				
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
				this.cformlistThree[0].domains.push({"value":""})
				//				this.formlistOne.domain.domains.push({我不动了
				//					value: ''
				//				});
			},
			changeposition(item) {
				item.changeButton = !item.changeButton;
			},
			handleAvatarSuccess(res,file){
//				this.imageUrl=URL.createObjectURL(file.raw)

				
				var imgurl=URL.createObjectURL(file.raw);
			
				this.imageUrl.push(imgurl);
			},
			beforeAvatarUpload(file){
				const isJPG=file.type==='image/jpeg';
				const isLt2M=file.size / 1024 / 1024<2;
				
				if(!isJPG){
					this.$message.error('上传头像图片只能是JPG格式！')
				}
				return isJPG && isLt2M;
			}
		},
		created(){
			this.cformlistFour=this.formlistFour;
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
	
		.cityoptions .el-col{
			border:1px solid rgb(121, 121, 121);
			margin-top:60px;
			position:relative;
			.el-button{
			border:none;
			margin:0;
			
		}
		>p{
			position:absolute;
			top:-80px;
			background:none;
			width:100%;
			color:rgb(121, 121, 121);
			text-align: center;
		}
		} 
		
		 .el-select-dropdown__item{
		 	text-align: center;
		 	box-sizing: border-box;
		 }
		 .transition-box{
		 	position:relative
		 }
</style>
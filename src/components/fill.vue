<template>
	<div>	
	<el-form>
		<el-form-item :label="item.labelname+':'"  v-for="(item,index) in formlist" :key="index" @mouseover.native.prevent="showcart(item)" @mouseout.native.prevent="showcart(item)" :class="{'bordernone':item.edittextinput,'itemborder':item.show}" >
		<el-input v-model="item.name" ></el-input>
		<transition name="el-fade-in-linear" >
			<div v-show="item.show" class="transition-box">
				<span @click="showedit(item)">编辑</span>
				<span @click.prevent="removeDomain(item)">删除</span>
				<el-dropdown menu-align='end' trigger="click" size="medium">
						<span class="el-dropdown-link" role="button">位置变更<i class="el-icon-arrow-down el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown" @command="command($event,show)">
							<el-dropdown-item command="">上移一题</el-dropdown-item>
							<el-dropdown-item command="">下移一题</el-dropdown-item>
							<el-dropdown-item command="">移至【】题</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>

			</div>
		</transition>
		<el-row v-if="item.edittextinput">
			<el-col>
				<el-form-item :label="'题目文本'" >
					<el-input v-model="item.namevalue"></el-input>
					<el-checkbox label="必答" name="type"></el-checkbox>
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
	export default{
		data(){
			return{	
			
			}
		},
		props: ["formlist"],
		methods: {
			showedit(item){
				item.edittextinput=!item.edittextinput;
			},
			showcart(item){
				item.show=item.edittextinput||!item.show;
//				item.style={
//					"border":"1px solid #eee",
//				}
			},
			submitForm(item){
				item.edittextinput=!item.edittextinput;
				item.show=!item.show;
			},
			 removeDomain(item) {
			        var index = this.formlist.indexOf(item);
			        if (index !== -1) {
			          this.formlist.splice(index, 1)
	        		}
				},
				command(callback,vc){
					debugger
					console.log("回调参数"+callback);
					if(!callback){
						var ctx=this;
						ctx.AREACODE2='请选择';
						if(vc!=''){
							ctx.show2=true;
							ctx.getAreaListDataSearch(vc,1);
						}
					}
				}
			},
		components:{
			headTop
		}
	}
</script>

<style scoped="scoped" lang="scss">
@import "~scss/common.scss";
.el-input{
	width:30%;
	margin-left:76px;
}
.textinputhidden{
	display: none;
}
.el-form>.el-form-item{
	padding:10px 5% 0;
	border:1px solid transparent;
	margin-bottom:5px;
	height:75px;
	
}
.el-form-item__label{
	
}

.el-form>.el-form-item.itemborder{
	
	border:1px solid #eee;
}
.el-form>.el-form-item.bordernone{
	border:none;
	height:auto;
	margin-bottom:30px;
}
.el-button{
	width:100%;
	padding:5px 0;
	margin-top:20px;
	display: block;
}
.el-form-item .el-form-item{
	border:1px dashed rgb(121,121,121);
	height:auto;
	padding:10px 5%;
}

.el-form-item .el-checkbox{
	margin-left:10%;
}
.el-form-item .el-input{
	height:32px;
	line-height: 32px;
}
.el-collapse-item{
	padding-bottom: 20px;
}
.transition-box span{
	color:rgb(41,155,252);
	text-decoration: underline;
	margin-right:15%;
	cursor: pointer;
	    display: inline-block;
    width: 80px;
}
</style>
<template>
	<div v-show="relevanceshow" class="relevance">
					<div class="relevanceitem">

						<p>关联逻辑设置：</p>
						<div class="relevanceitemcontent">
							<ul>
								<li>选项</li>
								<li v-for="(domainitem,doindex) in domains" :key="doindex">{{domainitem.value}}</li>
							</ul>
							<ul>
								<li>关联题目</li>
								<li v-for="(domainitem,doindex) in domains">
									<el-select v-model="limited" placeholder="请选择">
										<!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
											<el-option v-for="(itemoption,itindex) in qlist" :key="itindex"  :label="itemoption.qtitle+itemoption.namevalue" :value="itindex">
										</el-option>
									</el-select>
								</li>
							</ul>
						</div>
						<el-button @click="canclerelevance" size="medium">取消</el-button>
						<el-button size="medium" @click="surerelevance">确定</el-button>

					</div>
				</div>
</template>

<script>
	import bus from './eventBus';
	export default {
		data() {
			return {
				value: '',
				limited:''
			}
		},
		props: {
			relevanceshow:{
				type:Boolean,
				default:false
			},
			domains:{
				type: Array,
				default: []
			},		
			qlist:{
				type:Array,
				default:[]
			},
			item:{
				type:Object,
				default:{}
			},
		},
		methods: {
			canclerelevance(){
				this.$emit("canclerelevance")
			},
			surerelevance(){
				
			},
//			handselect(index, qindex){
//				debugger
//				this.$emit("handselect", index, qindex);
//			},

			selectedList(){
				for(let i in this.qlist){
					this.limited=this.qlist[i].value;
				}
			}
		},
		created() {
//			this.selectedList();
		},
		components: {
			
		}
	}
</script>

<style scoped="scoped" lang="scss">
.relevance{
		position: fixed;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, .8);
		top: 0;
		z-index: 200;
		.relevanceitem {
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
			.relevanceitemcontent {
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
</style>
<template>
	<div v-show="jumpshow" class="jump">
		<div class="jumpitem">

			<p>跳题逻辑设置：</p>
			<div class="jumpitemcontent">
				<ul>
					<li>
						<span>选项</span>
						<span>跳转到</span>
					</li>
					<li v-for="(domainitem,index) in domains" :key="index">
						<span>{{domainitem.value}}</span>
						<span>
							<el-select v-model="domainitem.jumpoption" placeholder="请选择" :disabled="!!domainitem.relevanceoption">
								<el-option v-for="(itemoption,index) in qlist" :label="itemoption.qtitle+itemoption.namevalue" :value="itemoption.qtitle+itemoption.namevalue" :key="index">
								</el-option>
							</el-select>
						</span>
					</li>
				</ul>
			</div>
			<el-button @click="canclejump(item)" size="medium">取消</el-button>
			<el-button @click="surejump" size="medium">确定</el-button>

		</div>
	</div>
</template>

<script>
	import bus from './eventBus';
	export default {
		data() {
			return {
				value: '',
			}
		},
		props: {
			item: {
				type: Object,
				default: {}
			},
			jumpshow: {
				type: Boolean,
				default: false
			},
			domains: {
				type: Array,
				default: []
			},
			qlist: {
				type: Array,
				default: []
			},

		},
		methods: {
			canclejump(item) {
				this.$emit("canclejump",item);
			},
			surejump() {
this.$emit("surejump");
			},
		},
		components: {

		}
	}
</script>

<style scoped="scoped" lang="scss">
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
				li {
					border-bottom: 1px solid #303133;
					border-right: 1px solid #303133;
					text-align: center;
					float: left;
					width: 100%;
					
					&:nth-of-type(1) {
						background: #409EFF;
						padding: 0;
					}
					span {
						
						display: inline-block;
						padding: 8px 0;
						&:nth-of-type(1) {
							width: 30%;
							border-right: 1px solid #303133;
						}
						width: 69%;
						float:left;
					}
				}
			}
		}
	}
</style>
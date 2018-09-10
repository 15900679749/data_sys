<template>
	<div class="topic">
		<p><i v-if="must" v-text="'*'"></i><span>{{itemindex}}</span>{{itemName}}</p>
		<fill :formlist="qlist.tlist"></fill>
		<!--<single :formlistOne="formlistOne"></single>
		<multiple :formlistTwo="formlistTwo"></multiple>
		<multistage :formlistThree="formlistThree"></multistage>
		<uploadimg :formlistFour="formlistFour"></uploadimg>
		<loCation :formlistFive="formlistFive"></loCation>
		<fractions :formlistSix="formlistSix"></fractions>-->
	</div>
</template>

<script>
	import fill from 'components/fill.vue';
	import single from 'components/single.vue';
	import multiple from 'components/multiple.vue';
	import multistage from 'components/multistage.vue';
	import uploadimg from 'components/uploadimg.vue';
	import loCation from 'components/loCation.vue';
	import fractions from 'components/fractions.vue';
	const checkOptions = ['篮球', '足球', '羽毛球', '乒乓球']
	export default {
		data() {
			return {
				must: true,
				itemindex: "1",
				itemName: "基本信息",
				qlist:[],
//				formlist: [{
//					must: true,
//					itemindex: "1",
//					itemName: "基本信息",
//					labelname: "姓名",
//					name: "11",
//					namevalue: '',
//					show: false,
//					edittextinput: false,
//					changeButton: false
//				}],
				formlistOne: [{
					must: false,
					itemindex: "",
					itemName: "",
					labelname: "性别",
					name: "11",
					namevalue: '',
					show: false,
					edittextinput: false,
					changeButton: false,
					question: [{
							name: "男",
							value: 0,
						},
						{
							name: "女",
							value: 1,
						}
					],
					radioinput1: "",
					radiock: 0,
					domains: [{
						value: '',
					}],

				}],
				formlistTwo: [{
					must: false,
					itemindex: "",
					itemName: "",
					labelname: "你喜欢的运动",
					name: "11",
					namevalue: '',
					show: false,
					edittextinput: false,
					changeButton: false,
					question: {
						name: "性别",
						value1: "男",
						value2: "女"
					},
					radioinput1: "",
					radiock: 0,
					domains: [{
						value: '',
					}],
					checkedGroup: ['篮球', '足球'],
					GroupList: checkOptions,
				}],
				formlistThree: [{
					must: false,
					itemindex: "",
					itemName: "",
					labelname: "你所在的地区",
					name: "11",
					namevalue: '',
					show: false,
					edittextinput: false,
					changeButton: false,
					question: {
						name: "性别",
						value1: "男",
						value2: "女"
					},
					radioinput1: "",
					radiock: 0,
					domains: [{
						value: '',
					}],
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
				}],
				formlistFour: [{
					must: false,
					itemindex: "",
					itemName: "",
					labelname: "上传你的照片",
					name: "11",
					namevalue: '',
					show: false,
					edittextinput: false,
					changeButton: false,
					question: {
						name: "性别",
						value1: "男",
						value2: "女"
					},
					radioinput1: "",
					radiock: 0,
					domains: [{
						value: '',
					}],
					checkedGroup: ['篮球', '足球'],
					GroupList: checkOptions,
					options: [{
						imagescr: '',
					}],
					imageLength: 1
				}],
				formlistFive: [{
					must: false,
					itemindex: "",
					itemName: "",
					labelname: "请上传你地理位置",
					name: "11",
					namevalue: '',
					show: false,
					edittextinput: false,
					changeButton: false,
					question: {
						name: "性别",
						value1: "男",
						value2: "女"
					},
					radioinput1: "",
					radiock: 0,
					domains: [{
						value: '',
					}],
					checkedGroup: ['篮球', '足球'],
					GroupList: checkOptions,
					options: [{
						imagescr: '',
					}],
					imageLength: 1
				}],
				formlistSix: [{
					silidervalue: 100,
					must: false,
					itemindex: "",
					itemName: "",
					labelname: "请对本次的服务进行打分：",
					name: "11",
					namevalue: '',
					show: false,
					edittextinput: false,
					changeButton: false,
					question: {
						name: "性别",
						value1: "男",
						value2: "女"
					},
					radioinput1: "",
					radiock: 0,
					domains: [{
						value: '',
					}],
					checkedGroup: ['篮球', '足球'],
					GroupList: checkOptions,
					options: [{
						imagescr: '',
					}],
					imageLength: 1
				}],

			}
		},
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		created(){
			debugger
			this.qlist=this.list;
		},
		methods: {},
		mounted() {

		},
		components: {
			fill,
			single,
			multiple,
			multistage,
			uploadimg,
			loCation,
			fractions
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.topic {
		padding: 30px 22px 0px;
		p {
			padding-bottom: 20px;
			>span {
				margin-right: 13px;
			}
		}
	}
	
	i {
		color: #ff0000;
		margin-right: 16px;
		font-style: normal;
		font-weight: bold;
	}
	
	.transition-box {
		position: relative
	}
</style>
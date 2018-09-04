<template>
	<div class="topic">
		<p><i v-if="must" v-text="'*'"></i><span>{{itemindex+'.'}}</span>{{itemName}}</p>
		<fill :formlist="formlist"></fill>
	</div>
</template>

<script>
		import fill from 'components/fill.vue';
			export default {
		data() {
			return {
				must:true,
				itemindex:"1",
					 itemName:"基本信息",		
				 formlist:[{
					 	labelname:"姓名",
						name:"11",
						namevalue:'',
						show:false,
						edittextinput:false,
					 },{
					 	labelname:"姓名",
						name:"22",
						show:false,
						edittextinput:false,
					 }],
			}
		},
		methods: {
		
		},
		mounted() {

		},
		components:{
			fill
		}
	}
</script>

<style scoped="scoped" lang="scss">
@import "~scss/common.scss";
.topic{
	padding:30px 22px 0px;
	p{
		padding-bottom:20px;
		>span{
			margin-right:13px;
		}
		
	}
	
}
i{
	color:#ff0000;
	margin-right:16px;
	font-style: normal;
	font-weight: bold;
}

</style>
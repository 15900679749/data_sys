<template>
	<div class="topic">
		<p><i v-if="must" v-text="'*'"></i>{{itemindex}}{{itemName}}</p>
		<fill :formlist="formlist"></fill>
	</div>
</template>

<script>
		import fill from 'components/fill.vue';
			export default {
		data() {
			return {
				must:true,
				itemindex:"一",
					 itemName:"基本信息",		
				 formlist:[{
					 	labelname:"姓名",
						name:"11"
					 },{
					 	labelname:"姓名",
						name:"22"
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
	p{
		padding:0 22px;
	}
	
}
i{
	color:#ff0000;
	margin-right:16px;
	font-style: normal;
	font-weight: bold;
}

</style>
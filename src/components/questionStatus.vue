<template>
	<el-select v-model="svalue" @change="handleIconClick" slot="prepend" placeholder="问卷状态" style="width:18%;margin-left:1%;">
		<el-option v-for="(op,index) in soptions" :key="index" :label="op.label" :value="op.value"></el-option>
	</el-select>
</template>

<script>
	export default {
		data() {
			return {
				svalue: "",
				soptions: [{
					"label": "全部",
					"value": 0
				}, {
					"label": "草稿",
					"value": 1
				}, {
					"label": "进行中",
					"value": 2
				}, {
					"label": "暂停",
					"value": 3
				}]
			}
		},
		props: {
			search: {
				type: String,
				default: ""
			}
		},
		methods: {
			handleIconClick() {
				if(this.svalue.length == 0) return;
			
				this.$emit("sgetList", "status", this.svalue);
				
//				if(this.search == "ques") {
//					this.$emit("sgetList", "status", this.svalue);
//				}
//				if(this.search=="temp"){
//					this.$emit("sgetList","")
//				}
			}
		},
		mounted() {

		}
	}
</script>

<style>

</style>
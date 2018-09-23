<template>
	<el-select v-model="svalue" @change="handleIconClick" slot="prepend" placeholder="问卷状态" style="width:12%;margin-left:1%;">
		<el-option v-for="op in options" :label="op.label" :value="op.value"></el-option>
	</el-select>
</template>

<script>
	export default {
		data() {
			return {
				svalue: "",
				options: [{
					"label": "全部",
					"value": 0
				}, {
					"label": "未完成",
					"value": 1
				}, {
					"label": "创建中",
					"value": 2
				}, {
					"label": "已结束",
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
				if(this.search == "ques") {
					this.$emit("sgetList", "status", this.svalue);
				}
			}
		},
		mounted() {

		}
	}
</script>

<style>

</style>
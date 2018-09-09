<template>
	<div class="Templatecontain">
		<el-row justify="space-between">
			<el-col :span="20">
				<searchInput></searchInput>
				<questionStatus></questionStatus>
			</el-col>
			<el-col :span="4">
				<establishBT></establishBT>
			</el-col>
		</el-row>
		<oneTemplate_temp :list="list"></oneTemplate_temp>
	</div>
</template>

<script>
	import searchInput from 'components/searchInput.vue';
	import questionStatus from 'components/questionStatus.vue';
	import establishBT from 'components/establishBT.vue';
	import oneTemplate_temp from 'components/oneTemplate_temp.vue';
	export default {
		data() {
			return {
				jumpshow: false,
				list: [{
						idNum: 1,
						status: '已完成',
						answerNum: 0,
						creator: "xxxxxx",
						timeNum: "11111"
					},
					{
						idNum: 1,
						status: '已完成',
						answerNum: 0,
						creator: "xxxxxx",
						timeNum: "11111",
						actionType: false
					},
					{
						idNum: 1,
						status: '已完成',
						answerNum: 0,
						creator: "xxxxxx",
						timeNum: "11111",
						actionType: false
					},
					{
						idNum: 1,
						status: '已完成',
						answerNum: 0,
						creator: "xxxxxx",
						timeNum: "11111",
						actionType: false
					},
					{
						idNum: 1,
						status: '已完成',
						answerNum: 0,
						creator: "xxxxxx",
						timeNum: "11111",
						actionType: false
					}

				]
			}
		},
		methods: {
		},
		components: {
			searchInput,
			questionStatus,
			establishBT,
			oneTemplate_temp
		}
	}
</script>

<style>
	.Templatecontain .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
	
	.Templatecontain .el-input__icon {
		line-height: 34px;
		color: #313134;
	}
	
	.Templatecontain .el-button.is-round {
		padding: 9px 23px;
		font-size: 14px;
	}
</style>
<style scoped="scoped" lang="scss">
	.Templatecontain .el-input__inner {
		height: 34px;
		line-height: 34px;
	}
</style>
<template>
	<el-container>
		<el-header>
			<headTop></headTop>
		</el-header>
		<el-main>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
		</el-main>
	</el-container>
</template>
<script>
	import headTop from 'view/head/headTop.vue';
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			headTop
		}
	}
</script>

<style scoped="scoped" lang="scss">

.el-header{
	width:100%;
	padding:0;
	    position: fixed;
    z-index: 100;
}
.el-main{
	/*max-width:100%;
	max-height:100%;
	overflow-x: hidden;
	overflow-y: scroll;*/
	padding:0;
	margin-top:30px;
}
</style>
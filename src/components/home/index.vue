<template>
	<!--<div >home1</div>-->
	<el-row>
		

	<el-menu :default-active="defaultActive" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#303033" text-color="#fff" active-text-color="#fff" router>
		<el-menu-item index="uSer">用户管理</el-menu-item>
		<el-menu-item index="temPlate">模板管理</el-menu-item>
		<el-menu-item index="questionNaire">问卷管理</el-menu-item>
		<el-menu-item index="myQuestion">我的问卷</el-menu-item>
	</el-menu>
	<el-col :span="24" style="width:100%;overflow: auto;">
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</el-col>
		</el-row>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				d: "abc",
				defaultActive:"uSer"
			}
		},
		methods: {
			handleSelect(key,keyPath){
				console.log(key,keyPath);
//				this.$router.push({path:'/'+key})
			},
			
		},
		mounted() {
			console.log("d==" + this.d);
		},
//		computed:{
//			defaultActive: function(){
//				return this.$route.path.replace('/', '');
//			}
//		}
	}
</script>

<style lang="scss">
	.hdiv {
		font-size: 20px;
	}
</style>
<template>
	<div>
		<el-row type="flex" justify="space-around">
			<el-col :span="9">
				<el-menu :default-active="defaultActive" class="el-menu-demo" @select="handleSelect" mode="horizontal" background-color="#303033" text-color="#fff" active-text-color="#fff" router>
					<el-menu-item index="uSer" class="is-active">用户管理</el-menu-item>
					<el-menu-item index="temPlate">模板管理</el-menu-item>
					<el-menu-item index="questionNaire">问卷管理</el-menu-item>
					<el-menu-item index="analysis">我的问卷</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="6" class="headtopRight">
				<el-col :span="18">
					<img :src="baseImgPath" alt="" class="avator" />
					<el-dropdown menu-align='end' trigger="click" size="medium">
						<span class="el-dropdown-link" role="button">{{avtar}}<i class="el-icon-arrow-down el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="">修改信息</el-dropdown-item>
							<el-dropdown-item command="">修改密码</el-dropdown-item>
							<el-dropdown-item command="">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</el-col>
				<el-col class="exit" :span="4">退出</el-col>
			</el-col>
		</el-row>
		<!--<el-col :span="24" style="width:100%;overflow: auto;">-->
		<!--<keep-alive>-->

		<!--</keep-alive>-->
		<!--</el-col>-->
	</div>
</template>

<script type="text/javascript">
	//	import {signout} from '@/api/getData'
	export default {
		data() {
			return {
				d: "abc",
				baseImgPath: "../../src/statics/images/photoicon.png",
				avtar: '上海申华有限科技公司',
				key: ''
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				sessionStorage.setItem("MenuActive",key);
//				this.$store.commit("saveMenuActive", key);
			},
		},
		mounted() {},
		computed: {
			defaultActive: function() {
				return sessionStorage.getItem("MenuActive") || "uSer"
				//return this.$store.getters.guserInfo;
				//return this.$store.state.menuActive;
			}
		}
	}
</script>

<style scoped="scoped" lang="scss">

	.hdiv {
		font-size: 20px;
	}
	
	.el-row {
		background: #303033;
		height: 60px !important;
		.headtopRight {
			display: flex;
			flex-flow: row;
			justify-content: space-between;
			>.el-col {
				justify-content: space-around;
				display: flex;
				flex-flow: row;
				align-items: center;
				color: #fff;
				.el-dropdown-link {
					color: #fff;
					cursor: pointer;
				}
			}
		}
	}
	
	.el-menu--horizontal {
		border-bottom: none;
		display: flex;
		justify-content: space-around;
	}
	
	.el-menu--horizontal>.el-menu-item {
		height: 55px;
	}
</style>
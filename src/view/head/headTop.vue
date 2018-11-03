<template>
	<div>
		<el-row type="flex" justify="space-around">
			<el-col :span="9">
				<el-menu :default-active="defaultActive" class="el-menu-demo" @select="handleSelect" mode="horizontal" background-color="#303033" text-color="#fff" active-text-color="#fff" router>
					<el-menu-item index="uSer">用户管理</el-menu-item>
					<el-menu-item index="temPlate">模板管理</el-menu-item>
					<el-menu-item index="questionNaire">问卷管理</el-menu-item>
					<el-menu-item index="analysis">我的问卷</el-menu-item>
				</el-menu>
			</el-col>
			<el-col :span="4" class="headtopRight">
				<el-col :span="15">
					<img :src="baseImgPath" alt="" class="avator" />
					<span role="button">{{name}}</span>
					<!--<el-dropdown menu-align='end' trigger="click" size="medium">
						<span class="el-dropdown-link" role="button">{{name}}<i class="el-icon-arrow-down el-icon--right"></i></span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item command="">修改信息</el-dropdown-item>
							<el-dropdown-item command="">修改密码</el-dropdown-item>
							<el-dropdown-item command="">退出</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>-->
				</el-col>
				<el-col class="exit" :span="4" @click.native="exit">退出</el-col>
			</el-col>
		</el-row>
		<!--<el-col :span="24" style="width:100%;overflow: auto;">-->
		<!--<keep-alive>-->

		<!--</keep-alive>-->
		<!--</el-col>-->
	</div>
</template>

<script type="text/javascript">
	import storage from 'javascripts/utils/storage';
	export default {
		data() {
			return {
				d: "abc",
				baseImgPath:storage.getObject("user").wx_url||"",
				name: '',
				key: '',
				
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				sessionStorage.setItem("MenuActive", key);
				//				this.$store.commit("saveMenuActive", key);
			},
			getname() {
				if(storage.getObject("user").name){
					this.name = storage.getObject("user").name
				}
				
			},
			exit() {
				this.$post("/Home/Login/loginOut", {
					token: storage.get("token")
				}).then((res) => {
					//					this.$message({
					//						type: 'success',
					//						message: '成功退出登录'
					//					});
					storage.remove("token");
					storage.remove("user");
					
						this.$router.replace({ path: '/login' })
					
				})
			}
		},
		mounted() {
		
		},
		computed: {
			defaultActive: function() {
//				debugger
				if(this.$route.path.split('/').length>1){
					return this.$route.path.split('/')[1];
				}else{
					return sessionStorage.getItem("MenuActive") || "uSer"
				}
//				return sessionStorage.getItem("MenuActive") || "uSer"
				//return this.$store.getters.guserInfo;
				//return this.$store.state.menuActive;
				
			}
		},
		created() {
			this.getname();
		}
	}
</script>

<style scoped="scoped" lang="scss">
	.avator {
		margin-right: 20px;
	}
	
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
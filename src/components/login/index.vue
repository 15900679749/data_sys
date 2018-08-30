<template>
	<div class="divCenter">
		<el-row>
			<el-col :span="4">
				<el-input id="name" v-model="name" placeholder="请输入帐号">
					<template slot="prepend">帐号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
				<el-input id="password" v-model="password" type="password" placeholder="请输入密码">
					<template slot="prepend">密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
				<el-button id="login" @click='loginin' style="width:70%；a" type="primary">登录</el-button>
			</el-col>
			<el-col :span="4">
				<el-button id="login" @click='add' style="width:70%；a" type="primary">设置</el-button>
			</el-col>
			<el-col :span="4">
				<el-button id="logi1n" @click='getc' style="width:70%；a" type="primary">读取</el-button>
			</el-col>
			<el-col :span="4">
				<el-button id="log3in" @click='del' style="width:70%；a" type="primary">删除</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	import cookie from 'javascripts/utils/cookie';

	export default {
		data() {
			return {
				name: '',
				password: ""
			}
		},
		methods: {
			loginin: function() {
				this.$get('https://www.apiopen.top/satinApi?type=1&page=1').then((res) => {
					console.log(res);
					//setTimeout(()=>{alert("login ok!")},1000);
				});
				//				
				this.$router.push({
					path: '/'
				});
			},
			add() {
				cookie.setCookie("zx", "123467");
			},
			getc() {
				console.log(cookie.getCookie("zx"));
			},
			del() {
				cookie.delCookie("zx", "123467");
			}
		},
		mounted() {
			console.log("login mounted");

		}
	}
</script>

<style scoped="scoped" lang="scss">
	@import "~scss/common.scss";
	.divCenter {
		margin-left: 50%;
		transform: rotateX(-50%);
		/*width: 80%;*/
	}
</style>
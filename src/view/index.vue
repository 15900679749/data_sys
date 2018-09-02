<template>
	<div class="container">
		<transition name="el-fade-in">
			<section class="login-container" v-show="show">
				<h3 class="title">用户登录</h3>
				<el-form :model="loginForm" ref="loginForm" :rules="rules">
					<el-form-item prop="username">
						<el-input type="text" v-model="loginForm.username" placeholder="请输入用户名..."><span>dsfsf</span></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<el-input type="password" placeholder="请输入密码..." v-model="loginForm.password"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="loginin()" class="submit_btn" size="medium">登录</el-button>
					</el-form-item>
				</el-form>
			</section>

		</transition>
	</div>

	<!--	
	
	
	
	
		<el-row>
			<el-col :span="8">
				<el-input id="name" v-model="name" placeholder="请输入帐号">
					<template slot="prepend">帐号</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-input id="password" v-model="password" type="password" placeholder="请输入密码">
					<template slot="prepend">密码</template>
				</el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="8">
				<el-button id="login" @click='loginin' type="primary">登录</el-button>
			</el-col>
		</el-row>-->

</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				loginForm: {
					username: '',
					password: ""
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur',
						customClass: 'user-input-class'
					}],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur',
						customClass: 'user-input-class'
					}],
				},
				show: false,

			}

		},
		methods: {
			loginin: function() {

				this.$post('http://192.168.1.91/Home/Login/login', this.loginForm).then((res) => {
					console.log(JSON.parse(res));
				}).catch((err) => {

				})
			}
		},
		mounted() {
			this.show = true;
			console.log("login mounted");
		}
	}
</script>
<style>
	.login-container input.el-input__inner {
		background-color: rgba(255, 255, 255, .1);
		border: none;
		border-bottom: 1px solid #303033;
		border-radius: 0;
		padding-left: 30px;
	}
	
	.login-container input.el-input__inner[type="text"] {
		background-image: url(../../statics/images/usernameicon.png);
		background-repeat: no-repeat;
		background-position: 10px center;
	}
	
	.login-container input.el-input__inner[type="password"] {
		background-image: url(../../statics/images/passwordicon.png);
		background-repeat: no-repeat;
		background-position: 10px center;
	}
	
	.login-container input.el-input__inner::-webkit-input-placeholder {
		color: #8a8a8a;
		font-size: 12px;
		text-align: center;
	}
</style>
<style scoped="scoped" lang="scss">
	@import "~scss/common.scss";
	/*.divCenter {
		margin-left:50%;
		transform: rotateX(-50%);
		width: 80%;
	}*/
	
	.container {
		display: flex;
		height: 100%;
		width: 100%;
		background: #ebebeb url(../../statics/images/bg.png) no-repeat center bottom/100% 100%;
	}
	
	.login-container {
		/*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 100px auto 235px;
		width: 250px;
		padding: 30px 20px 15px 20px;
		background: rgba(255, 255, 255, .9);
		/*border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;*/
		.title {
			margin: 0px auto 30px auto;
			text-align: center;
			color: #000;
			/*text-align: center;
     	width:60%;
		height:90px;
		margin:-26% auto;
		background:url(../../statics/images/logo.png) no-repeat 50% 50%/60% 50% ,linear-gradient(#fff,#e9e9e9);
border: 1px solid #eaeaea;
box-shadow: 0 0 -1px #cac6c6;*/
		}
		.remember {
			margin: 0px 0px 35px 0px;
		}
		.el-form {
			.submit_btn {
				width: 100%;
				padding: 18px 0;
				background: #303033;
				border: none;
				border-radius: 2px;
				margin-top: 10px;
			}
		}
	}
</style>
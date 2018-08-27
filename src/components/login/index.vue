<template>
	<div class="divCenter">
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
				<el-button id="login" @click='loginin' style="width:70%；a" type="primary">登录</el-button>
			</el-col>
		</el-row>
	</div>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				name: '',
				password: ""
			}
		},
		methods: {
			loginin: function() {
				alert("login ok!");
				this.$router.push({path:'/'});
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
		margin-left:50%;
		transform: rotateX(-50%);
		width: 80%;
	}
</style>
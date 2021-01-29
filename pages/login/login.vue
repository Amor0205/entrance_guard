<template>
	<view class="login">
		<h4 class="title">监狱物联网管理系统</h4>
		<view class="inp">
			<u-form :model="loginForm" ref="loginForm" :rules="loginRules">
				<u-form-item label="账号:" prop="username" style="font-size: 20rpx; color: #FFFFFF; height: 50rpx; width: 50%; margin: 0 auto;">
					<view class="" style="color: #FFFFFF;">
						<u-input v-model="loginForm.username" placeholder="请输入账号"></u-input>
					</view>
				</u-form-item>
				<u-form-item label="密码:" prop="password" style="font-size: 20rpx; color: #FFFFFF;  height: 50rpx; width: 50%; margin: 0 auto;">
					<view class="" style="color: #FFFFFF; width: 100%; line-height: 100%;">
						<u-input v-model="loginForm.password" type="password" placeholder='请输入密码' maxlength='14' />
					</view>
				</u-form-item>
				<view class="" style="display: flex;align-items: center; justify-content: space-between; margin-left:21%">
					<u-form-item label="验证码:" prop="code" style="font-size: 20rpx; color: #FFFFFF; height: 50rpx; width: 50%; margin: 0 auto;">
						<view class="" style="color: #FFFFFF;">
							<u-input v-model="loginForm.code" placeholder="请输入验证码"></u-input>
						</view>
					</u-form-item>
					<view class="login-code">
						<img :src="codeUrl" @click="getCode" class="login-code-img" />
					</view>
				</view>
				<!-- 	<view class="agreement">
					<u-checkbox-group>
						<u-checkbox v-model="loginForm.rememberMe" @change="checkboxChange"></u-checkbox>
					</u-checkbox-group>
					<view class="agreement-text">
						记住密码
					</view>
				</view> -->
			</u-form>
			<view class="submit" @click="handleLogin">
				登录
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCodeImg,
		login,
		getInfo
	} from '../../src/ajax.js'
	// import { getCodeImg } from "@/api/login";
	// import Cookies from "js-cookie";
	// import { encrypt, decrypt } from '@/utils/jsencrypt'

	export default {
		name: "Login",
		data() {
			return {
				codeUrl: "",
				cookiePassword: "",
				loginForm: {
					username: "",
					password: "",
					rememberMe: false, //记住密码
					code: "",
					uuid: ""
				},
				loginRules: {
					username: [{
						required: true,
						message: '请输入姓名',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}],
					password: [{
						required: true,
						trigger: "blur",
						message: "密码不能为空"
					}],
					code: [{
						required: true,
						trigger: "change",
						message: "验证码不能为空"
					}]
				},
				loading: false,
				redirect: undefined
			};
		},
		watch: {
			// $route: {
			// 	handler: function(route) {
			// 		this.redirect = route.query && route.query.redirect;
			// 	},
			// 	immediate: true
			// }
		},
		created() {
			this.getCode();
			this.getCookie();
		},
		methods: {
			abc() {
				uni.navigateTo({
					url: '../home'
				})
			},
			getCode() {
				getCodeImg().then(res => {
					// console.log(res.data.data);
					this.codeUrl = "data:image/gif;base64," + res.data.data.img;
					this.loginForm.uuid = res.data.data.uuid;
					// console.log(this.loginForm.uuid);
				});
			},
			// 勾选记住密码
			checkboxChange(e) {
				this.loginForm.rememberMe = e.value;
			},
			getCookie() {
				const username = uni.getStorageSync("username");
				const password = uni.getStorageSync("password");
				const rememberMe = uni.getStorageSync('rememberMe')
				this.loginForm = {
					username: username === undefined ? this.loginForm.username : username,
					password: password === undefined ? this.loginForm.password : password,
					rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
				};
			},
			handleLogin() {
				this.$refs.loginForm.validate(valid => {
					if (this.loginForm.username.length != 0 && this.loginForm.password.length != 0 && this.loginForm.code.length) {
						// this.loading = true;
						uni.showLoading({
							title: '登录中'
						})
						if (this.loginForm.rememberMe) {
							uni.setStorageSync("username", this.loginForm.username, {
								expires: 30
							});
							uni.setStorageSync("password", (this.loginForm.password), {
								expires: 30
							});
							uni.setStorageSync('rememberMe', this.loginForm.rememberMe, {
								expires: 30
							});
						} else {
							uni.removeStorageSync("username");
							uni.removeStorageSync("password");
							uni.removeStorageSync('rememberMe');
						}
						login(
								this.loginForm.username,
								this.loginForm.password,
								this.loginForm.code,
								this.loginForm.uuid
							).then(res => {
								if (res.data.code == 200) {
									uni.hideLoading()
									return res.data
									console.log(res);
								} else if (res.data.code == 400) {
									uni.hideLoading()
									uni.showToast({
										icon: "none",
										title: res.data.message
									})
									return res.data
								} else if (res.data.code === 402) {
									uni.hideLoading()
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
									return res.data
								}
							})
							.catch(err => {
								uni.hideLoading()
								uni.showToast({
									icon: "none",
									title: '网络错误'
								})
							})
							.then((res) => {
								console.log(res);
								if (res.code === 200) {
									// 保存token getUserInfo
									uni.setStorageSync('token', res.data.token)
									//请求 -- 获取用户信息
									return getInfo(
										res.data.token
									).then(res => {
										uni.showToast({
											title: '登录成功',
											icon: 'success'
										})
										uni.hideLoading()
										// 保存用户信息
										uni.setStorageSync('userInfo', res.data.data)
										uni.reLaunch({
											url: '../index/index'
										})
									}).catch(err => {
										uni.hideLoading()
										uni.showToast({
											icon: 'none',
											title: res.message
										})
									})
								}
							})
					} else {
						uni.showToast({
							title: '请输入正确的登录信息',
							icon: 'none'
						})
					}
				});
			}
		}
	};
</script>

<style rel="stylesheet/scss" lang="scss">
	.login {
		// width: 100%;
		background-image: url(../../static/imgs/beijing.png);
		background-size: 100% 100%;
		background-position: center center;
		// overflow: auto;
		// overflow: hidden;
		height: 100%;
		position: absolute;
		left: 0px;
		width: 100%;
		top: 50%;
		transform: translateY(-50%);

		// .input {
		// 	width: 50%;
		// 	// height: 75%;
		// 	// border: 1px #b4b4b4 solid;
		// 	position: absolute;
		// 	left: 0;
		// 	right: 0;
		// 	top: 0;
		// 	bottom: 0;
		// 	margin-left: auto;
		// 	margin-right: auto;
		// 	margin-top: auto;
		// 	margin-bottom: auto;
		// }

		//  display: flex;
		//  justify-content: center;
		//  align-items: center;
		//  height: 100%;
		// background-image: url(../../static/imgs/beijing.png);
		//  background: rgb(76, 120, 187);
		//  background-size: cover;
	}

	.title {
		margin: 0px auto 30px auto;
		text-align: center;
		color: #707070;
	}

	.login-form {
		border-radius: 6px;
		background: #ffffff;
		width: 400px;
		padding: 25px 25px 5px 25px;

		.el-input {
			height: 38px;

			input {
				height: 38px;
			}
		}

		.input-icon {
			height: 39px;
			width: 14px;
			margin-left: 2px;
		}
	}

	.login-tip {
		font-size: 13px;
		text-align: center;
		color: #bfbfbf;
	}

	.login-code {
		width: 40%;
		height: 50px;
		// float: right;

		img {
			cursor: pointer;
			vertical-align: middle;
		}
	}

	.el-login-footer {
		height: 40px;
		line-height: 40px;
		position: fixed;
		bottom: 0;
		width: 100%;
		text-align: center;
		color: #fff;
		font-family: Arial;
		font-size: 12px;
		letter-spacing: 1px;
	}

	.login-code-img {
		height: 38px;
	}

	.input {
		// background: #1d3a61;
		padding: 10rpx 10rpx 10rpx 10rpx;

		// border: 1rpx solid red;
		// border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
		.inputText {
			width: 30%;
			height: 20%;
			// border: 1px solid #1167B6;
			font-size: 10rpx;
			text-align: center;
			line-height: 40px;
			border-radius: 20px;
			color: #FFFFFF;
		}
	}

	// 记住密码
	.agreement {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		margin-left: 20rpx;

		.agreement-text {
			padding-left: 8rpx;
			color: #949494;
			font-size: 16rpx;
		}
	}

	// 登录
	.submit {
		width: 150rpx;
		height: 30rpx;
		background: #c88500;
		margin: 0 auto;
		font-size: 18rpx;
		text-align: center;
		color: #ffffff;
		padding: 5rpx 0rpx 5rpx 0rpx;
		border-radius: 30rpx;
		margin-top: 40rpx;
		line-height: 30rpx;
	}

	.inp {
		margin-top: 100rpx;
	}
</style>

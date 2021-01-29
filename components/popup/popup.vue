<template>
	<view>
		<!-- 弹出层 -->
			<view class="uni-banner" v-if="popping">
				<view class="verification" >
					身份验证
				</view>
				<view class="verify" >
					<view class="" v-for="(item,index) in verify" :key='index'>
						<view class="verifyall" @click="goto(item)">
							<view class="verifyimg">
								<image :src="item.img" class="verifyimgs"></image>
							</view>
							<view class="verifytext" @click="go">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 做黑色阴影颜色 -->
			<!-- <view class="uni-mask" v-if="popping"></view> -->
			<view class="">
				
			</view>
		
	</view>
</template>
verification
<script>
	export default {
		props:{
			popping:{
			 type:Boolean,
			default:false
			}
		},
		
		data() {
			return {
				bannerShow: false,
				verify:[
					{
						img:'../../static/imgs/tou.png',
						title:'人脸认证'
					},{
						img:'../../static/imgs/shuaka.png',
						title:'刷卡认证'
					},{
						img:'../../static/imgs/mima.png',
						title:'密码'
					},
				]
			};
		},
		// 监听页面返回
		onBackPress() {
			if (this.bannerShow) {
				this.bannerShow = false;
				return true;
			}
		},
		methods: {
			closeBanner: function() {
				this.bannerShow = false;
				this.$emit("closeBan",false)
			},
			showBanner: function() {
				this.bannerShow = true;
			},
			//刷卡验证点击
			goto(res) {
				
				switch (res.title) {
					case '人脸认证':
						
						break;
					case '刷卡认证':
						
						break;
					case '密码验证':
						
						break;
					
					default:
						break;
				}
			},
		},
		

	}
</script>


<style scoped lang="scss">
	/* 弹出层形式的广告 */
	.uni-banner {
		width: 70%;
		height: 50%;
		border: 1px red solid;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin-left: auto;
		margin-right: auto;
		margin-top: auto;
		margin-bottom: auto;
		z-index: 99;
		background: #1D395E;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
		opacity: 0.9;
		.verification{
			font-size: 10rpx;
			color: #FFFFFF;
		margin: 10rpx 0rpx 0rpx 10rpx;
		}
		.verify{
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-top: 10rpx;
			.verifyall{
				.verifyimg{
					width: 240px;
					height: 320px;
					.verifyimgs{
							width: 240px;
							height: 320px;
					}
				}
				.verifytext{
					font-size: 16rpx;
					color: #FFFFFF;
					text-align: center;
				}
			}
		}
	}

	.uni-mask {
		/* z-index: 9999; */
		
	}
</style>

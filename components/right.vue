<template>
	<view>
		<view class="m-right">
			<!-- title -->
			<view class="pandect">
				数据总览
			</view>
			<view class="pandects">

			</view>
			<!-- 状态 -->
			<view class="reveal">
				<view class="condition">
					<view class="" v-for="(item,index) in condition" :key='index'>
						<view class="conditionItem">
							<view class="conditionImg">
								<image :src="item.imgs" mode="" class="conditionImgs"></image>

							</view>
							<view class="conditionText">{{item.title}}</view>
						</view>
					</view>
				</view>
				<view class="choice">
					<text :checked="seletedAll" @click="checkedAll()">全选/</text>
					<text :checked="seletedAll" @click="checkedAllNo">取消全选</text>
				</view>
			</view>
			<!-- 楼层 -->
			<view class='floor'>
				<view v-for="(item,index) in floor" :key='index' class="itemFloor">
					<view class="two">
						<view class="level">
							{{item.level}}
						</view>
						<view class="u-checkbox-group">
							<u-checkbox-group>
								<u-checkbox @change="checkboxChange(item)" v-model="item.checked" :name="item.level" shape="square"
								 active-color='#038BFF' size='20rpx'></u-checkbox>
							</u-checkbox-group>
						</view>
					</view>
					<!-- 颜色 -->
					<view class="hue">
						<view class="itemcolor" v-for="(item1,index1) in item.color" :key='index1'>
							<view class="color" :style="{background:item1}">
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				condition: [{
						imgs: '../../static/imgs/m1.png',
						title: '状态一',
					},
					{
						imgs: '../../static/imgs/m2.png',
						title: '状态二',
					},
					{
						imgs: '../../static/imgs/m3.png',
						title: '状态三',
					},
					{
						imgs: '../../static/imgs/m4.png',
						title: '状态四',
					},
				],
				floor: [{
						level: '楼层一',
						color: ['#3E86D9', '#EF3232', '#CFBA0A', '#454A53', '#3E86D9', '#3E86D9', '#3E86D9', '#3E86D9', '#3E86D9',
							'#3E86D9'
						],
						checked: false,
					},
					{
						level: '楼层二',
						color: ['#3E86D9', '#EF3232', '#CFBA0A', '#454A53', '#3E86D9', '#3E86D9', '#3E86D9', '#3E86D9', '#3E86D9',
							'#3E86D9'
						],
						checked: false,
					}
				],
				seletedAll: false,
				checkList: [], //选中值
			}
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(item) {
				if (item.checked == true) {
					console.log(this.checkList);
				} else {
					this.checkList.splice(this.checkList.indexOf(), 1); //取消
					console.log(this.checkList);
				}
			},
			// 选中任一checkbox时，由checkbox-group触发
			// checkboxGroupChange(e) {
			// 	console.log(e);
			// },
			// 全选
			checkedAll() {
				this.floor.filter(res => {
					if (res.checked == false) {
						res.checked = true
					}
				})
				this.checkList.push(this.floor)
				console.log(this.checkList);
			},
			//取消全选
			checkedAllNo() {
				this.seletedAll = false
				this.floor.map(val => {
					val.checked = this.seletedAll;
					this.checkList = []
				})
				console.log(this.checkList);
			},

		},
		mounted() {

		},
		onLoad() {

		},
		filters: {

		},
		computed: {

		},
		watch: {

		},
		directives: {

		}
	}
</script>

<style scoped lang="scss">
	// 右边div
	.m-right {
		width: 100%;
		height: 100%;
		background: #071641;
		opacity: 0.8;
		position: relative;
		border: 1px transparent solid;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;

		.pandect {
			font-size: 12rpx;
			color: white;
			text-align: center;
			margin-top: 20rpx;
			background-image: url(../static/imgs/ys1.png);
			background-size: 70% 80%;
			background-repeat: no-repeat;
			background-position: center;
			padding: 5rpx 0 5rpx 0;

		}

		.pandects {
			width: 100%;
			height: 5%;
			font-size: 12rpx;
			color: white;
			text-align: center;
			margin-top: 20rpx;
			background-image: url(../static/imgs/ys2.png);

			background-size: 100% 100%;
			background-repeat: no-repeat;
			background-position: center;
			position: absolute;
			top: 15rpx;
			opacity: 0.7;

		}

		.reveal {
			margin-top: 20rpx;
			display: flex;
			justify-content: space-between;
			padding: 0rpx 5rpx 0rpx 5rpx;

			.condition {
				display: flex;
				align-items: center;

				.conditionItem {
					display: flex;
					align-items: center;
					margin-right: 5rpx;
				}

				.conditionImg {
					width: 10rpx;
					height: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;

					.conditionImgs {
						width: 10rpx;
						height: 10rpx;
					}
				}

				.conditionText {
					font-size: 8rpx;
					color: white;
					margin-left: 3rpx;
				}
			}

			.choice {
				font-size: 8rpx;
				color: white;
			}
		}

		.floor {

			.itemFloor {
				.two {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 0rpx 5rpx 0rpx 0rpx;

					.level {
						width: 140px;
						height: 40px;
						font-size: 12rpx;
						color: white;
						margin-top: 12rpx;
						line-height: 40px;
						background-image: linear-gradient(to right, #0357FF, transparent);
						padding-left: 5rpx;
					}
				}

				.hue {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-top: 15rpx;
					padding: 0rpx 5rpx 0rpx 5rpx;
					.itemcolor {
						.color {
							width: 25px;
							height: 25px;
							border-radius: 50%;
						}
					}
				}



			}


		}
	}
</style>

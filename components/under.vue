<template>
	<view>
		<view class="m-left-below">
			<view class="kuang">

			</view>
			<view class="below-head">
				监狱控制台
			</view>
			<view class="select">
				<view v-for="(item,index) in list1" :key='index' class="list1">
					<view class="itemlist1" :class=" item.checked == true ? 'curs' : '' " @click="control(item)">
						{{item.title}}
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
				list1: [{
					title: '应急全开',
					checked: false,
					index: '1'
				}, {
					title: '应急关门',
					checked: false,
					index: '2'
				}, {
					title: '一键戒严',
					checked: false,
					index: '3'
				}, {
					title: '多选开门',
					checked: false,
					index: '4'
				}, {
					title: '多选关门',
					checked: false,
					index: '5'
				}, {
					title: '多选开灯',
					checked: false,
					index: '6'
				}, {
					title: '多选关灯',
					checked: false,
					index: '7'
				}, {
					title: '查看监控',
					checked: false,
					index: '8'
				}, ],
				rSelects: [], //点击控制台添加的数组
			}
		},
		methods: {
			//控制台点击
			control(item) {
				if (item.checked == false) {
					if (item.title == '应急全开') {
						console.log(11);
						item.checked = true
					} else if (item.title == '应急关门') {
						console.log(222);
						item.checked = true
					} else if (item.title == '一键戒严') {
						console.log(333);
						item.checked = true
					}else if(item.title == '多选开门'){
						console.log(444);
						item.checked = true
					}else if(item.title == '多选关门'){
						console.log(555);
						item.checked = true
					}else if(item.title == '多选开灯'){
						console.log(666);
						item.checked = true
					}else if(item.title == '多选关灯'){
						console.log(777);
						item.checked = true
					}else if(item.title == '查看监控'){
						console.log(888);
						item.checked = true
					}
				}

			}
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
	.m-left-below {
		width: 100%;
		height: 100%;
		background: #071641;
		opacity: 0.7;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
		position: relative;

		.kuang {
			width: 100%;
			height: 30%;
			font-size: 12rpx;
			color: white;
			text-align: center;
			background-image: url(../static/imgs/panels.png);
			background-size: 30% 100%;
			background-repeat: no-repeat;
			background-position: center;
			position: absolute;
			top: 2rpx;


		}

		.below-head {
			width: 100%;
			height: 45%;
			background-image: url(../static/imgs/panel.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			text-align: center;
			font-size: 12rpx;
			color: white;
			padding-top: 5rpx;
		}

		.select {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;

			.list1 {}

			.itemlist1 {
				background-image: url(../static/imgs/btns.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				font-size: 6rpx;
				color: white;
				padding: 8rpx 13rpx 12rpx 13rpx;
				text-align: center;
			}

			.curs {
				background-image: url(../static/imgs/btn.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				font-size: 6rpx;
				color: white;
				padding: 8rpx 13rpx 12rpx 13rpx;
				text-align: center;

			}
		}
	}
</style>

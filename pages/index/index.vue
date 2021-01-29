<template>
	<view class="box">
		<!-- 顶部显示 -->
		<view class="head">
			<view class="headright">
				四川省微壹科技发展有限责任公司
			</view>
			<view class="topText">
				<view class="topText1">{{this.regionName}}</view>
				<view class="topText2">监狱物联网管理系统</view>
			</view>
			<view class="message">
				<view class="user" @click="verification">
					{{this.userInfo.userName}}
				</view>
				<view class="quit" @click="goOut">
					<image src="../../static/imgs/quit.png" mode="" class="quitImg"></image>
				</view>
			</view>
		</view>
		<!-- 中间显示部分 -->
		<!-- <view class="middle"> -->
		<!-- 头部数据总览 -->
		<view class="m-right">
			<view class=" information">
				<!-- title -->
				<view class="pandect">
					数据总览
				</view>
				<view class="pandects">
				</view>
				<!-- 状态 -->
				<view class="reveal">
					<view class="" style="display: flex;justify-content: space-around; align-items: center;">
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
							<view class="succeed" v-if="this.code">
							
							</view>
						<view class="lose"  v-else>
							
						</view>
					</view>
					<view class="choice">
						<text :checked="seletedAll" @click="checkedAll()">全选/</text>
						<text :checked="seletedAll" @click="checkedAllNo">取消全选</text>
					</view>
				</view>
			</view>
			<view class="">
				<scroll-view scroll-y="true" :style="{height:m_right - information + 'px' }">
					<!-- 楼层 -->
					<view class='floor'>
						<view v-for="(item,index) in status" :key='index' class="itemFloor">
							<view class="two">
								<view class="level">
									{{item.floorName}}
								</view>
								<view class="u-checkbox-group">
									<u-checkbox-group>
										<u-checkbox @change="checkboxChange(item)" v-model="item.checked" :name="item.floorName" shape="square"
										 active-color='#038BFF' size='20rpx'></u-checkbox>
									</u-checkbox-group>
								</view>
							</view>
							<!-- 房间 -->
							<view class="hue">
								<view class="itemcolor" v-for="(item1,index1) in item.data" :key='index1'>
									<view class="colors" :class=" item1.checked == true ? 'a' : '' " @tap="tapInfo(item,item1)" @longtap="longtap(item1)">
										<view class="twos">
											<view class="doorNames">
												{{item1.doorName}}
											</view>
											<view class="statusImg" v-if="item1.disabled=='01'">
												<image src="../../static/imgs/gm.png" mode="" class="statusImgs"></image>
											</view>
											<view class="statusImg" v-if="item1.disabled=='02'">
												<image src="../../static/imgs/gmz.png" mode="" class="statusImgs"></image>
											</view>
											<view class="statusImg" v-if="item1.disabled=='03'">
												<image src="../../static/imgs/km.png" mode="" class="statusImgs"></image>
											</view>
											<view class="statusImg" v-if="item1.disabled=='04'">
												<image src="../../static/imgs/kmz.png" mode="" class="statusImgs"></image>
											</view>
											<view class="statusImg" v-if="item1.disabled=='05'">
												<image src="../../static/imgs/mlx.png" mode="" class="statusImgs"></image>
											</view>
											<view class="statusImg" v-if="item1.disabled=='06'">
												<image src="../../static/imgs/yc.png" mode="" class="statusImgs"></image>
											</view>
										</view>
										<!-- 勾选以后的样式 -->
										<view class="b">
										</view>
									</view>
									<!-- 点击上锁 -->
									<view class="">
										<view class="indicate" v-if="item1.lock==0">
											<image src="../../static/imgs/s.png" mode="" class="indicateImg"></image>
										</view>
										<view class="indicate" v-else>
											<!-- <image src="../../static/imgs/j.png" mode="" class="indicateImg"></image> -->
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 长按弹出框 -->
		<u-popup v-model="longPress" mode="center" width="40%" height="40%">
			<view style="info">
				<view class="apartment" style="">
					当前房间信息
				</view>
				<view class="essential">
					<view class="">
						楼层：{{this.msg.floorName}}
					</view>
					<view class="">
						房间号：{{this.msg.doorName}}
					</view>
					<!-- <view class=""> -->
					<view class="">
						房间状态：{{this.msg.doorStatuss}}
					</view>
					<!-- </view> -->
					<view class="">
						异常信息：{{this.msg.devStatus}}
					</view>
				</view>

				<view class="setting">
					<view class="locks">
						<view class="lock" v-if="this.msg.lock==0" @click="deblocking()">
							解锁
						</view>
						<view class="lock2" v-else @click="uplatch()">
							上锁
						</view>
					</view>
					<view class="restoration" @click="reset">
						复位
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 左下div -->
		<!-- 底部控制台 -->
		<view class="base">
			<view class="kuang">
			</view>
			<view class="below-head">
				监狱控制台
			</view>
			<view class="select">
				<view class="list1" v-for="(item, index) in list1" :key="index">
					<view class="itemlist1" :class="{'curs': item.checked==true}" @click="clickBtn(item,index)">
						<!-- @click="control(item)" -->
						{{item.funName}}
					</view>
				</view>
			</view>
		</view>
		<!-- 点击开门弹出层 -->
		<u-popup v-model="door" mode="center" :mask-close-able='close'>
			<view class="plies">
				<view class="attention">
					开门
				</view>
				<view class="select">
					<view class="breadth">选择开门宽度：</view>
					<view class="btn">
						<view v-for="(item,index) in open" :key='index'>
							<view class="button" :class="{'ac': item.checked==true}" @click="openDoor(item,index)">
								{{item.title}}
								<view class="bc">
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-btn ">
					<view class="reset1" @click="CancelDoor">
						取消
					</view>
					<view class="reset2" @click="Confirmopen">
						确定
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 查看监控弹出框 -->
		<u-popup v-model="monitoring" mode="center" :mask-close-able='close'>
			<!-- width="40%" height="30%" -->
			<view class="monitoring">
				<view class="attention">
					注意
				</view>
				<view class="">
					<view class="frequency">
						<view class="frequencyLeft" style="font-size: 10rpx;">
						</view>
						<view class="frequencyRight">
							<view class="direction">
								<view class="shang">
									<image src="../../static/imgs/shang.png" class="shangimg"></image>
								</view>
								<view class="three">
									<view class="zuo">
										<image src="../../static/imgs/zuo.png" class="zuoimg"></image>
									</view>
									<view class="yuan">
										<view class="yuans">
										</view>
									</view>
									<view class="you">
										<image src="../../static/imgs/you.png" class="youimg"></image>
									</view>
								</view>
								<view class="xia">
									<image src="../../static/imgs/xia1.png" class="xiaimg"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bases">
					<view class="buttons" @click="opendoor">
						开门
					</view>
					<view class="buttons" @click="ignores">
						忽略此条
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 身份验证 -->
		<u-popup v-model="show" mode="center">
			<view class="all">
				<view class="verification">
					身份验证
				</view>
				<view class="verify">
					<view class="" v-for="(item,index) in verify" :key='index'>
						<view class="verifyall" @click="goto(item)">
							<view class="verifyimg">
								<image :src="item.img" class="verifyimgs"></image>
							</view>
							<view class="verifytext">
								{{item.title}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<!-- 人脸认证 -->
		<view class="">
			<u-popup v-model="show1" mode="center" :mask-close-able='close'>
				<view class="humanface">
					<view class="humanfaceText" @click="goBack">
						返回身份验证
					</view>
					<view class="humanfaceimg">
						<image src="../../static/imgs/renlian.png" class="humanfaceimgs"></image>
					</view>
				</view>
			</u-popup>

		</view>
		<!-- 刷卡认证 -->
		<view class="">
			<u-popup v-model="show2" mode="center" :mask-close-able='close'>
				<view class="humanface">
					<view class="humanfaceText" @click="goBacks">
						返回身份验证
					</view>
					<view class="humanfaceimg">
						<image src="../../static/imgs/shuaka1.png" class="humanfaceimgs"></image>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 密码验证 -->
		<u-popup v-model="show3" mode="center" :mask-close-able='close'>
			<view class="input">
				<view class="inputText" @click="goBackss">
					返回身份验证
				</view>
				<u-form :model="form" ref="uForm" :rules="rules">
					<u-form-item label="账号:" prop="mobile" style="font-size: 12rpx; color: #8f8f8f;">
						<view class="" style=" margin-left: -20rpx;">
							<u-input type="mobile" v-model="form.mobile" placeholder="请输入账号"></u-input>
						</view>
					</u-form-item>
					<u-form-item label="密码:" prop="password" style="font-size: 12rpx; color: #8f8f8f;">
						<view class="" style=" margin-left: -20rpx; ">
							<u-input v-model="form.password" type="password" placeholder='请输入密码' maxlength='14' />
						</view>
					</u-form-item>
				</u-form>
				<view class="submit" @click="submit">
					确定
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getOpenDoor,
		getCloseDoor,
		getdoorControl,
		getDesData,
		getclosdoorControl,
		getFunctionList,
		logOut,
		getDevice,
		lock,
		unlock,
		restoration
	} from '../../src/ajax.js'
	export default {
		name: "",
		components: {},
		props: {},
		data() {
			return {
				// 开门弹出框
				open: [{
						title: '全开',
						checked: false,
						id: 1
					},
					{
						title: '开二分之一',
						checked: false,
						id: 2
					},
					{
						title: '开三分之一',
						checked: false,
						id: 3
					},
					{
						title: '开四分之一',
						checked: false,
						id: 4
					},
				],
				// 监狱控制台
				list1: [],
				rSelects: [], //点击控制台添加的数组
				condition: [{
						imgs: '../../static/imgs/km.png',
						title: '开门',
					},
					{
						imgs: '../../static/imgs/kmz.png',
						title: '开门中',
					},
					{
						imgs: '../../static/imgs/gm.png',
						title: '关门',
					},
					{
						imgs: '../../static/imgs/gmz.png',
						title: '关门中',
					},
					{
						imgs: '../../static/imgs/yc.png',
						title: '异常',
					},

					{
						imgs: '../../static/imgs/mlx.png',
						title: '离线',
					},
				],
				floor: [],
				color: [{
					disabled: '01', //异常
					colors: '#C6353F'
				}, {
					disabled: '02',
					colors: '#3E485A' //掉线
				}, {
					disabled: '03',
					colors: '#387DCC' //关门
				}, {
					disabled: '04', //开门
					colors: '#44A869'
				}, ],

				seletedAll: false,
				verify: [{
					img: '../../static/imgs/tou.png',
					title: '人脸认证'
				}, {
					img: '../../static/imgs/shuaka.png',
					title: '刷卡认证'
				}, {
					img: '../../static/imgs/mima.png',
					title: '密码认证'
				}, ],
				form: {
					mobile: '',
					password: '',
				},
				rules: {
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '请输入正确的手机号',
							trigger: ['change', 'blur'],
						}
					],

					password: [{
							required: true,
							message: '请输入密码',
							trigger: ['change', 'blur'],
						},
						{
							pattern: /[A-Za-z0-9]+$/,
							// 正则检验前先将值转为字符串
							message: '密码不正确'
						},
					],
				},
				rSelect: [], //点击楼层添加的数组
				door: false, //开门弹出框默认值
				monitoring: false, //查看监控弹出层默认值
				show: false, //身份验证弹框默认值
				show1: false, //人脸验证弹框默认值
				show2: false, //刷卡认证弹框默认值
				show3: false, //密码认证弹框默认值
				close: false,
				border: true,
				isChange: '-1', //控制台单选
				isChanges: '-1',
				checkList: [], //右侧选择的值
				showAllCheck: false,
				cartList: [],
				allChecked: false, //全选默认为false
				arraychecked: [], //点击房间进行底部操作
				breadth: [], //点击开门宽度进行操作,
				information: 0,
				m_right: 0,
				functionListHeight: '', //获取设备的高度
				userInfo: '', //获取用户信息
				arr2: [], //开门宽度选择
				openid: [],
				arraycheckeds: [],
				status: [], //当前区域设备
				status_t: [], //勾选上的房间列表
				status_l: [], //勾选上的楼层
				status_all: [], //全选
				time: '',
				longPress: false, //长按弹出框 默认值
				msg: '', //展示的信息
				times: '',
				devStatuss: '',
				doorStatuss: '',
				token: '',
				regionName: '', //获取监区
				code:''
			}
		},
		onLoad() {

		},
		methods: {
			// if(this.userInfo.devRegionId==1){

			// }else{}

			//获取监区
			getprison() {
				getDevice(this.userInfo.devRegionId).then(res => {
					if (res.data.code == 200) {
						this.regionName = res.data.data.regionName
						console.log(this.regionName);
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: res.data.message
					})
				})
			},
			// 退出登录
			goOut() {
				logOut(
					this.token
				).then(res => {
					if (res.data.code == 200) {
						// 清除token
						uni.setStorageSync('token', '')
						// 清除userInfo
						uni.setStorageSync("userInfo", '')
						uni.reLaunch({
							url: '../login/login'
						})
					}
				}).catch(err => {
					// console.log(123);
					uni.showToast({
						icon: 'none',
						title: res.data.message
					})
				})

			},

			// 长按弹框
			longtap(item1) {
				this.msg = item1
				console.log(this.msg);
				this.longPress = true
				this.times = Math.round(new Date())
				if (this.msg.exeMsg == '00') {
					// if (this.msg.devStatus == '无') {
					// 	switch (this.msg.doorStatus) {
					// 		case "01":
					// 			this.msg.doorStatuss = "关门"
					// 			break;
					// 		case "02":
					// 			this.msg.doorStatuss = "关门中"
					// 			break;
					// 		case "03":
					// 			this.msg.doorStatuss = "开门"
					// 			break;
					// 		case "04":
					// 			this.msg.doorStatuss = "开门中"
					// 			break;
					// 		case "05":
					// 			this.msg.doorStatuss = "掉线"
					// 			break;
					// 		default:
					// 			break;
					// 	}
						var timestamp3 = new Date(this.msg.heartTime).getTime();
						if (this.times - timestamp3 <= 10000) {
							switch (this.msg.doorStatus) {
								case "01":
									this.msg.doorStatuss = "关门"
									break;
								case "02":
									this.msg.doorStatuss = "关门中"
									break;
								case "03":
									this.msg.doorStatuss = "开门"
									break;
								case "04":
									this.msg.doorStatuss = "开门中"
									break;
								case "05":
									this.msg.doorStatuss = "掉线"
									break;
								default:
									break;
							}
						}else{
							switch (this.msg.doorStatus) {
								case "01":
									this.msg.doorStatuss = "关门"
									break;
								case "02":
									this.msg.doorStatuss = "关门中"
									break;
								case "03":
									this.msg.doorStatuss = "开门"
									break;
								case "04":
									this.msg.doorStatuss = "开门中"
									break;
								case "05":
									this.msg.doorStatuss = "掉线"
									break;
								default:
									break;
							}
						}
					// } else {
						
					// }
				} else{
					this.msg.doorStatuss = '异常'
				}
			},
			// 上锁
			uplatch() {
				var _this = this
				var id = _this.msg.doorId
				uni.showModal({
					title: '提示',
					content: '确定锁定该房间吗？',
					success: function(res) {
						if (res.confirm) {
							lock(
									id
								).then(res => {
									if (res.data.code == 200) {
										_this.longPress = false
										uni.showToast({
											title: '房间已上锁',
											icon: 'success'
										})
										_this.status_t.map(res=>{  //遍历为true的房间改为false,清除数组
											if(res.doorId == _this.msg.doorId){
												res.checked=false
												_this.status_t=[]
											}
										})
										_this.state()
									}
								})
								.catch(err => {
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								})
						} else if (res.cancel) {

						}
					},

				});


			},
			// 解锁
			deblocking() {
				var _this = this
				var id = _this.msg.doorId
				uni.showModal({
					title: '提示',
					content: '确定解锁该房间吗？',
					success: function(res) {
						if (res.confirm) {
							unlock(
									id
								).then(res => {
									if (res.data.code == 200) {
										_this.longPress = false
										uni.showToast({
											title: '房间已解锁',
											icon: 'success'
										})
										_this.state()
									}
									
								})
								.catch(err => {
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								})
						} else if (res.cancel) {

						}
					},

				});
			},
			// 复位
			reset() {
				var _this = this
				var id = _this.msg.doorId
				uni.showModal({
					title: '提示',
					content: '确定复位该房间吗？',
					success: function(res) {
						if (res.confirm) {
							restoration(
									id
								).then(res => {
									if (res.data.code == 200) {
										_this.longPress = false
										uni.showToast({
											title: '房间已复位',
											icon: 'success'
										})
									}
								})
								.catch(err => {
									console.log(err);
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								})
						} else if (res.cancel) {

						}
					},

				});
			},
			//查看监控的开门
			opendoor() {
				this.monitoring = false
				this.door = true
			},
			//房间点击 value1 楼层信息 value2 房间信息
			tapInfo(item, item1) {
				if(item1.lock==0){
					uni.showToast({
						title: '该房间已锁定',
						icon: 'none'
					});
				}else{
					var roomIdList = [];
					var floorRoom = [];
					if (this.status_t.length == 0) { //第一次点击房间添加到新数组暂用
						this.status_t.push(item1)
					} else {
						this.status_t.filter(res => { //把新数组里面房间id遍历到roomIdList
							roomIdList.push(res.doorId)
						})
						if (roomIdList.indexOf(item1.doorId) == -1) {
							this.status_t.push(item1)
						} else {
							this.status_t.splice(roomIdList.indexOf(item1.doorId), 1)
						}
					}
					
					floorRoom = this.status_t.filter(res => {
						return res.floorId == item.floorId
					})
					
					if (floorRoom.length == item.data.length) { //新数组长度与原数组长度相同 添加到将每个房间添加到status_l里面
						this.status_l.push(item)
					} else {
						this.status_l = this.status_l.filter(res => { //判断房间id 取出不相同的
							return res.floorId != item.floorId
						})
					}
					item1.checked = !item1.checked;
					this.status.map(res => {
						if (item.floorId == res.floorId) { //遍历判断当前点击房间是否与数据房间id相同
							var list
							list = res.data.filter(res_1 => {
								if (res_1.checked == true) { //遍历当前楼层为true的房间，暂时储存在list
									return res_1
								}
							})
							if (list.length == res.data.length) { //判断储存数组的长度是否与原数组长度相同
								res.checked = true; //相同则为true,勾选当前楼层所有房间，反之
							} else {
								res.checked = false;
							}
						}
					})
				}
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(item) {
				// status_l
				var floorIdList = [];
				var roomIdList = [];
				if (this.status_l.length == 0) {
					// 第一次勾选
					//将选中的楼层数据添加到数组
					this.status_l.push(item)
					// 将选中的楼层下的房间添加到选中房间的数组
					item.data.map(res => {
						this.status_t.push(res)
					})
					console.log(this.status_l)
				} else {
					// 有已经勾选时  再次勾选
					// 将勾选房间的楼层id 取出备用
					this.status_t.filter(res => {
						roomIdList.push(res.floorId)
					})
					// 将勾选楼层id单独取出 备用
					this.status_l.filter(res => {
						floorIdList.push(res.floorId)
					})
					// 判定勾选楼层id中是否 包含点击勾选传的楼层id
					if (floorIdList.indexOf(item.floorId) == -1) {
						//将选中的楼层数据添加到数组
						this.status_l.push(item)
						item.data.map(res => {
							this.status_t.push(res)
						})
					} else {
						// 如果勾选时 已有勾选楼层id中包含点击勾选传的楼层id 说明是再次点击勾选 需要取出勾选楼层以及房间
						this.status_l.splice(floorIdList.indexOf(item.floorId), 1)
						//移除勾选房间
						// this.status_t.filter((res,index)=>{
						// 	if(res.floorId == item.floorId){
						// 		this.status_t.splice(index,1)
						// 	}
						// })
						for (var i = this.status_t.length - 1; i >= 0; i--) {
							if (this.status_t[i].floorId == item.floorId) {
								this.status_t.splice(i, 1)
							}
						}
					}
				}
				item.checked != item.checked
				this.status.filter(res => { // 判断楼层为true 遍历每个房间为true
					if (res.checked == true) {
						res.data.map(res_1 => {
							res_1.checked = true;
							// uni.showToast({
							// 	title: '已勾选当前楼层房间',
							// 	icon: 'success'
							// })
						})
					} else {
						res.data.map(res_1 => {
							res_1.checked = false;
						})
					}
				})
			},
			// 全选
			checkedAll() {
				this.status_t = []
				// 第一次勾选
				//将选中的楼层数据添加到数组
				// if(this.status_l==0){
				this.status.map(res => {
					this.status_l.push(res)
				})
				// console.log(this.status_l);
				// 将选中的楼层下的房间添加到选中房间的数组
				this.status.map(floor => {
					floor.data.map(res1 => {
						this.status_t.push(res1)
					})
				})
				// console.log(this.status_t)
				// }
				this.showAllCheck = true;
				this.status.map(floor => {
					floor.checked = true; // 先遍历楼层为true，在遍历房间为true
					floor.data.map(item => {
						if (item.checked = true) {
							item.checked = true
							uni.showToast({
								title: '已勾选所有楼层和房间',
								icon: 'success'
							})
						}
					})
				})
			},
			//取消全选
			checkedAllNo() {
				this.status_t = [] //将楼层和房间数组为空
				this.status_l = []
				this.showAllCheck = false;
				this.status.map(floor => {
					floor.checked = false;
					floor.data.map(item => {
						item.checked = false
					})
				})
			},
			//每三秒获取一次设备状态
			timeOut() {
				setTimeout(res => {
					this.state()
				}, 3000)
			},
			// 状态
			async state() {
				var _this = this
				var roomIdList = [];
				_this.status_t.filter(res => {
					roomIdList.push(res.doorId)
				})
				// 获取当前区域设备状态
				await getDesData(
						_this.userInfo.devRegionId
					).then(res => {
						if (res.data.code == 200) {
							this.code=res.data.code
							setTimeout(res => {
								this.code=''
							}, 1000)
							
							if (_this.status_l.length > 0) {
								_this.status_l.map(res_1 => {

									res.data.data.map(res_2 => {
										if (res_1.floorId == res_2.floorId) {
											res_2.checked = res_1.checked
										}
									})
								})
							}
							if (_this.status_t.length > 0) {
								// for (var i = 0; i < _this.status_t.length; i++) {
								// 	for (var j = 0; j < res.data.data.length; j++) {
								// 		for (var k = 0; k < res.data.data[j].data.length; k++) {
								// 			if(_this.status_t[i].doorId == res.data.data[j].data[k].doorId){
								// 				res.data.data[j].data[k].checked = _this.status_t[i].checked
								// 				console.log(res.data.data[j].data[k].checked)
								// 			}
								// 		}

								// 	}
								// }
								_this.status_t.map(res_1 => {
									res.data.data.map(res_2 => {
										res_2.data.map(res_3 => {
											if (res_1.doorId == res_3.doorId) {
												res_3.checked = res_1.checked
											}
										})
									})
								})
								_this.status = res.data.data
								console.log(_this.status_t)
							} else {
								_this.status = res.data.data
								console.log(_this.status);
							}
							this.timeOut()
						}
					})
					.catch(err => {
						// uni.showToast({
						// 	icon: 'none',
						// 	title: res.data.message
						// })
					})
				//获取的当前时间戳
				this.time = Math.round(new Date())
				// console.log(this.time);
				this.status.map(floor => {
					if (floor.data == null) {
						floor.data = []
					} else {
						floor.data.map(res => {
							if (res.exeMsg == '00') { //先判断exeMsg是否为00
								if (res.devStatus == '无') { //判断设备状态	
									switch (res.doorStatus) {
										case "01":
											res.disabled = "01" //关门
											break;
										case "02":
											res.disabled = "02" //关门中
											break;
										case "03":
											res.disabled = "03" //开门
											break;
										case "04":
											res.disabled = "04" //开门中
											break;
										case "05":
											res.disabled = "05" //掉线
											break;
										default:
											break;
									}
									
									var timestamp3 = new Date(res.heartTime).getTime();
									if (this.time - timestamp3 >= 10000) {
										res.disabled = '05' //掉线				
									} else {
										switch (res.doorStatus) {
											case "01":
												res.disabled = "01" //关门
												break;
											case "02":
												res.disabled = "02" //关门中
												break;
											case "03":
												res.disabled = "03" //开门
												break;
											case "04":
												res.disabled = "04" //开门中
												break;
											case "05":
												res.disabled = "05" //掉线
												break;
											default:
												break;
										}
									}
								} else {
									res.disabled = "06" //异常
								}
							} else {
								res.disabled = '06' //异常
							}
						})
					}
				})

			},
			//获取底部功能列表
			getList() {
				getFunctionList(
					this.userInfo.devRegionId
				).then(res => {
					if (res.data.code == 200) {
						this.list1 = res.data.data
						// console.log(this.list1);
					}
				}).catch(err => {
					uni.showToast({
						icon: 'none',
						title: res.data.message
					})
				})
			},
			//控制台点击
			clickBtn(item, index) {
				let _this = this
				if (_this.userInfo.isPermit == 0) {
					uni.showToast({
						title: '请先登录验证',
						icon: 'none'
					});
					_this.show = true
				} else {
					item.checked = true
					// 选择按钮
					_this.list1.filter(res => {
						res.checked = false; //遍历当前点击的按钮是否为true，
					})
					item.checked = true;
					switch (item.funName) {
						case '一键全开':
							uni.showModal({
								title: '提示',
								content: '确定打开当前区域房间门吗？',
								success: function(res) {
									if (res.confirm) {
										getOpenDoor(
											_this.userInfo.devRegionId,
											_this.list1.funId
										).then(res => {
											if (res.data.code == 200) {
												console.log(res);
												uni.showToast({
													title: '正在开门',
													icon: 'none'
												});
												item.checked = false
												// console.log(item.checked);
												_this.checkedAllNo()
												_this.arraychecked = []
												_this.state()
											}
										}).catch(err => {
											uni.showToast({
												icon: 'none',
												title: res.data.message
											})
										})

									} else if (res.cancel) {
										item.checked = false
										_this.checkedAllNo()
										// _this.arraychecked = []
									}
								}
							});
							break;
						case '一键全关':
							uni.showModal({
								title: '提示',
								content: '确定关闭当前区域房间门吗？',
								success: function(res) {
									if (res.confirm) {
										getCloseDoor(
											_this.userInfo.devRegionId,
											_this.list1.funId
										).then(res => {
											if (res.data.code == 200) {
												console.log(res);
												item.checked = false
												_this.checkedAllNo()
												_this.arraychecked = []
												_this.state()
											}
										}).catch(err => {
											uni.showToast({
												icon: 'none',
												title: res.data.message
											})
										})

									} else if (res.cancel) {
										item.checked = false
										_this.checkedAllNo()
										_this.arraychecked = []
									}
								}
							});

							break;
						case '一键戒严':
							this.arraychecked = []
							item.checked = true
							console.log(333);
							break;
						case '开门':
							_this.status_t.map(res => {
								if (res.checked == true) {
									_this.arraychecked.push(res.doorId)
									// console.log(_this.arraychecked);
								}
							})
							if (_this.arraychecked.length) {
								this.door = true
							} else {
								item.checked = false
								uni.showToast({
									title: '请选择开启的房间',
									icon: 'none'
								});
							}
							break;
						case '关门':
							_this.arraychecked = []
							_this.status_t.map(res => {
								if (res.checked == true) {
									_this.arraychecked.push(res.doorId)
									// console.log(_this.arraychecked);
								}
							})
							if (_this.arraychecked.length) {
								uni.showModal({
									title: '提示',
									content: '确定关闭选择的房间吗？',
									success: function(res) {
										if (res.confirm) {
											getclosdoorControl(
													_this.arraychecked,
												).then(res => {
													if (res.data.code == 200) {
														item.checked = false
														_this.checkedAllNo()
														_this.arraychecked = []
														_this.status_t = []
															_this.state()
														uni.showToast({
															title: '正在关闭房间门',
															icon: 'none'
														});
													}
												})
												.catch(err => {
													uni.showToast({
														icon: 'none',
														title: res.data.message
													})
												})
										} else if (res.cancel) {
											item.checked = false
											// _this.checkedAllNo()
											// _this.arraychecked = []
										}
									},

								});
							} else {
								item.checked = false
								uni.showToast({
									title: '请选择关闭的房间',
									icon: 'none'
								});
							}
							// this.arraychecked = []
							// item.checked = true
							// console.log(5555);
							break;
						case '开灯':
							this.arraychecked = []
							item.checked = true
							// console.log(666);
							break;
						case '关灯':
							this.arraychecked = []
							item.checked = true
							// console.log(777);
							break;
						case '查看监控':
							this.arraychecked = []
							item.checked = true
							this.monitoring = true
							// console.log(888);
							break;
						default:
							break;
					}
					// } else {
					// 	uni.showToast({
					// 		title: '请先选择房间',
					// 		icon: 'none'
					// 	});
					// }
				}
			},

			// 开门宽度选择
			openDoor(item) {
				this.open.filter(res => {
					res.checked = false;
				})
				item.checked = true;
			},
			//开门宽度的确认按钮
			Confirmopen() {
				let _this = this
				let breadth = []
				_this.open.map(item => { //遍历当前选择的开门宽度，添加到数组里面
					if (item.checked == true) {
						breadth.push(item.id)
					}
				})
				// console.log(breadth);
				_this.openid = breadth.join(",");
				// console.log(this.openid);
				_this.status_t.map(res => {
					if (res.checked == true) {
						_this.arraycheckeds.push(res.doorId)
						// console.log(_this.arraycheckeds);
					}
				})
				uni.showModal({
					title: '提示',
					content: '确定开启选择的房间吗？',
					success: function(res) {
						if (res.confirm) {
							if (breadth.length) {
								getdoorControl(
									_this.arraycheckeds,
									_this.openid
								).then(res => {
									if (res.data.code == 200) {
										// console.log(res);
										_this.arraychecked = []
										_this.arraycheckeds = []
										_this.door = false
										_this.status_t
										_this.status_l
										_this.checkedAllNo()
										_this.state()
										_this.list1.filter(res => {
											res.checked = false; //遍历当前点击的按钮是否为true，
										})
										uni.showToast({
											title: '正在开启房间门',
											icon: 'none'
										});
									}
								}).catch(err => {
									uni.showToast({
										icon: 'none',
										title: res.data.message
									})
								})
								
							} else {
								uni.showToast({
									title: '请先选择开门宽度',
									icon: 'none'
								});
							}
						} else if (res.cancel) {
							uni.showToast({
								title: '取消操作',
								icon: 'none'
							});
						}
					}
				});

			},
			// 取消开门弹框
			CancelDoor() {
				this.door = false
			},
			// 监控忽略此条
			ignores() {
				this.monitoring = false
			},
			//身份验证
			verification() {
				// this.show = true
			},
			// 身份验证
			//验证点击
			goto(res) {
				switch (res.title) {
					case '人脸认证':
						this.show = false
						this.show1 = true
						break;
					case '刷卡认证':
						this.show = false
						this.show2 = true
						break;
					case '密码认证':
						this.show = false
						this.show3 = true
						break;
					default:
						break;
				}
			},
			//返回身份验证
			goBack() {
				this.show1 = false
				this.show = true
			},
			goBacks() {
				this.show2 = false
				this.show = true
			},
			goBackss() {
				this.show3 = false
				this.show = true
			},
			// 登录提交
			submit() {
				this.$refs.uForm.validate(valid => {
					if (valid && this.form.mobile.length != 0 && this.form.password.length != 0) {
						var ajaxPromise = new Promise(function(resolve, reject) {
							resolve();
						});
						uni.showLoading({
							title: '登录中'
						})
					} else {
						uni.showToast({
							title: '请先输入正确的登录信息',
							icon: 'none'
						})
					}
				});
			},
			// 获取设备高度
			async getM_rightHeight() {
				//获取元素高度
				uni.createSelectorQuery().in(this).select('.m-right').boundingClientRect(data => {
					this.m_right = data.height
				}).exec();
			},
			async getInformationHeight() {
				//获取头部元素高度
				uni.createSelectorQuery().in(this).select('.information').boundingClientRect(data => {
					this.information = data.height
				}).exec();
			},
		},
		mounted() {
			this.state()

			// 挂载获取设备高度
			this.getInformationHeight()
			this.getM_rightHeight()
			this.getList()
			this.getprison()
		},
		onShow() {
			if (uni.getStorageSync('userInfo')) {
				this.userInfo = uni.getStorageSync('userInfo')
				console.log(this.userInfo);
			}
			if (uni.getStorageSync('token')) {
				this.token = uni.getStorageSync('token')
				// console.log(this.token);
			}
		},
		onLoad() {
			if (uni.getStorageSync('token').length == 0) {
				uni.redirectTo({
					url: '../login/login'
				})
			}
		},
		onHide: function() {
			//写在onHide()中，切换页面或者切换底部菜单栏时关闭定时器。
			clearInterval(this.timeOut)
		},
		watch: {

		},
		computed: {

		},
		created() {
		
		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 100%;
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
		display: flex; // 上下均分
		flex-direction: column;
		justify-content: space-between;

		//头部显示
		.head {
			width: 100%;
			height: 10%;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.headright {
				width: 25%;
				height: 100%;
				font-size: 11rpx;
				color: #FFFFFF;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-left: 10rpx;

			}

			.topText {
				width: 60%;
				height: 100%;
				text-align: center;
				color: white;
				background-image: url(../../static/imgs/ding.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				display: flex;
				flex-direction: column;
				justify-content: center;

				.topText1 {
					font-size: 16rpx;
					text-align: center;

				}

				.topText2 {
					font-size: 10rpx;
					text-align: center;
				}
			}

			.message {
				width: 25%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;

				.user {
					font-size: 16rpx;
					margin-right: 5rpx;
					color: white;
				}

				.quit {
					width: 24rpx;
					height: 24rpx;
					background: black;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;

					.quitImg {
						width: 12rpx;
						height: 10rpx;
					}
				}


			}

		}

		//中间显示
		// .middle {
		// width: 97%;
		// height: 87%;
		// margin: 0 auto;
		// margin-top: 1%;
		// display: flex; // 上下均分
		// flex-direction: column;
		// justify-content: space-between;
		// 头部数据总览
		.m-right {
			width: 100%;
			height: 72%;
			background: #071641;
			opacity: 0.8;
			position: relative;
			border: 1px transparent solid;
			border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;

			.information {
				// position: fixed;
			}

			.pandect {
				font-size: 12rpx;
				color: white;
				text-align: center;
				// margin-top: 20rpx;
				background-image: url(../../static/imgs/ys1.png);
				background-size: 30% 80%;
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
				// margin-top: 20rpx;
				background-image: url(../../static/imgs/ys2.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				background-position: center;
				position: absolute;
				top: 13rpx;
				opacity: 0.7;

			}

			.reveal {
				margin-top: 10rpx;
				display: flex;
				justify-content: space-between;
				padding: 0rpx 5rpx 0rpx 5rpx;

				.condition {
					display: flex;
					align-items: center;

					.conditionItem {
						display: flex;
						align-items: center;
						margin-right: 10rpx;
					}

					.conditionImg {
						width: 15rpx;
						height: 15rpx;
						display: flex;
						justify-content: center;
						align-items: center;

						.conditionImgs {
							width: 15rpx;
							height: 15rpx;
						}
					}

					.conditionText {
						font-size: 10rpx;
						color: white;
						margin-left: 3rpx;
					}
				}

				.choice {
					font-size: 10rpx;
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
						flex-wrap: wrap;
						align-items: center;
						margin-top: 10rpx;
						padding: 0rpx 5rpx 0rpx 5rpx;
						// position: relative;

						.itemcolor {
							position: relative;

							// margin: 0 auto;
							.colors {
								width: 90px;
								height: 30px;
								font-size: 13rpx;
								text-align: center;
								line-height: 30px;
								color: #000000;
								margin: 0rpx 15rpx 10rpx 10rpx;
								border: 1px solid transparent;
								background: #ffffff;

								.twos {
									display: flex;
									justify-content: space-around;
									align-items: center;

									.doorNames {
										margin-left: 15rpx;
									}

									.statusImg {
										width: 19rpx;
										height: 19rpx;

										.statusImgs {
											width: 19rpx;
											height: 19rpx;
										}
									}
								}


							}
						}

						.a {
							// width: 90px;
							// height: 30px;
							// font-size:9rpx;
							// // text-align: center;
							// // line-height: 30px;
							border: 1rpx solid #ff8000 !important;
							position: relative;

							.b {
								position: absolute;
								top: -5rpx;
								right: -5rpx;
								width: 0;
								height: 0;
								border: 5rpx solid;
								border-color: transparent transparent transparent #ff8000;
								transform: rotate(-45deg);

							}
						}



					}

					.indicate {
						width: 10rpx;
						height: 10rpx;
						position: absolute;
						top: -9rpx;
						left: 13rpx;

						.indicateImg {
							width: 10rpx;
							height: 10rpx;
						}
					}


				}


			}
		}

		// 底部控制台
		.base {
			width: 100%;
			height: 14%;
			background: #071641;
			opacity: 0.7;
			border: 1px transparent solid;
			border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
			position: relative;

			.kuang {
				width: 100%;
				height: 30%;
				font-size: 12rpx;
				color: white;
				text-align: center;
				background-image: url(../../static/imgs/panels.png);
				background-size: 30% 100%;
				background-repeat: no-repeat;
				background-position: center;
				position: absolute;
				top: 2rpx;


			}

			.below-head {
				width: 100%;
				height: 45%;
				background-image: url(../../static/imgs/panel.png);
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
					width: 30rpx;
					background-image: url(../../static/imgs/btns.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					font-size: 6rpx;
					color: white;
					padding: 8rpx 15rpx 12rpx 15rpx;
					text-align: center;
				}

				.curs {
					background-image: url(../../static/imgs/btn.png);
					background-size: 100% 100%;
					background-repeat: no-repeat;
					font-size: 6rpx;
					color: white;
					padding: 8rpx 15rpx 12rpx 15rpx;
					text-align: center;

				}
			}
		}

		// 左边div
		// .m-left {
		// width: 66%;
		// height: 100%;
		// display: flex; // 上下均分
		// flex-direction: column;
		// justify-content: space-between;
		// border: 1px transparent solid;

		// .choice {
		// 	font-size: 12rpx;
		// 	color: white;
		// }

		//左上
		// .m-left-up {
		// 	width: 100%;
		// 	height: 78%;
		// 	background: #071641;
		// 	opacity: 0.7;
		// 	border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;


		// 	.left-top {
		// 		display: flex;
		// 		justify-content: space-between;
		// 		align-items: center;
		// 		padding: 10rpx 20rpx 10rpx 20rpx;

		// 		.left-up-text {
		// 			font-size: 12rpx;
		// 			color: white;

		// 		}


		// 	}

		// 	.list {
		// 		display: flex;
		// 		flex-wrap: wrap;
		// 		padding-left: 20rpx;
		// 		position: relative;

		// 		.listAll {
		// 			position: relative;
		// 			margin-right: 14rpx;
		// 			margin-bottom: 15rpx;
		// 		}

		// 		.itemlist {
		// 			width: 50rpx;
		// 			height: 15rpx;
		// 			border: 1rpx solid #038BFF;
		// 			font-size: 10rpx;
		// 			color: white;
		// 			text-align: center;
		// 			line-height: 15rpx;

		// 		}


		// 		.a {
		// 			width: 50rpx;
		// 			height: 15rpx;
		// 			font-size: 10rpx;
		// 			color: white;
		// 			text-align: center;
		// 			line-height: 15rpx;
		// 			border: 1rpx solid #FFFFFF;
		// 			position: relative;
		// 			background: #43b4ff;

		// 			.b {
		// 				position: absolute;
		// 				top: -5rpx;
		// 				right: -5rpx;
		// 				width: 0;
		// 				height: 0;
		// 				border: 5rpx solid;
		// 				border-color: transparent transparent transparent #FFFFFF;
		// 				transform: rotate(-45deg);

		// 			}
		// 		}

		// 		.indicate {
		// 			width: 15rpx;
		// 			height: 15rpx;
		// 			position: absolute;
		// 			top: 5rpx;
		// 			left: 36rpx;

		// 			.indicateImg {
		// 				width: 15rpx;
		// 				height: 15rpx;
		// 			}
		// 		}



		// 	}


		// }

		//左下
		// .under {
		// 	width: 100%;
		// 	height: 20%;
		// }

		// }

		// // 右边div
		// .rightcss {
		// 	width: 33%;
		// 	height: 100%;
		// }

		// }
	}

	// // 楼层弹出框
	// .plies {
	// 	// width: 100%;
	// 	// height: 99%;
	// 	background: #1D395E;
	// 	border: 1rpx solid #086BC8;
	// 	border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
	// 	padding: 10rpx 10rpx 20rpx 10rpx;

	// 	.attention {
	// 		color: #FFFFFF;
	// 		font-size: 12rpx;
	// 		// padding: 5rpx 0rpx 0rpx 10rpx;
	// 	}

	// 	.door {
	// 		font-size: 10rpx;
	// 		color: #ffffff;
	// 		text-align: center;
	// 		margin-top: 10rpx;
	// 	}

	// 	.btn {
	// 		display: flex;
	// 		justify-content: space-between;
	// 		margin-top: 10rpx;

	// 		.button {
	// 			width: 50rpx;
	// 			height: 20rpx;
	// 			background: #086BC8;
	// 			font-size: 9rpx;
	// 			text-align: center;
	// 			line-height: 20rpx;
	// 			border-radius: 10rpx;
	// 			margin-top: 20rpx;
	// 			color: #fff;
	// 			margin-left: 10rpx;
	// 		}
	// 	}
	// }

	// 开门弹出层

	.plies {

		background: #1D395E;
		border: 1rpx solid #086BC8;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
		padding: 10rpx 15rpx 20rpx 15rpx;

		.attention {
			color: #FFFFFF;
			font-size: 12rpx;
			// padding: 5rpx 0rpx 0rpx 10rpx;
		}

		.select {


			display: flex;
			justify-content: space-between;
			align-items: center;

			.breadth {
				font-size: 12rpx;
				color: white;
				margin-top: 20rpx;
			}

			.btn {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 10rpx;

				.button {
					width: 51rpx;
					height: 22rpx;
					background: #086BC8;
					font-size: 8rpx;
					text-align: center;
					line-height: 22rpx;
					margin-top: 10rpx;
					color: #fff;
					margin-left: 10rpx;
					margin-right: 10rpx;
					padding: 0rpx 5rpx 0rpx 5rpx;
				}



				.ac {
					width: 50rpx;
					height: 20rpx;
					font-size: 10rpx;
					color: white;
					text-align: center;
					font-size: 8rpx;
					border: 1px solid #FFFFFF;
					position: relative;
					line-height: 20rpx;

					.bc {
						position: absolute;
						top: -5rpx;
						right: -5rpx;
						width: 0;
						height: 0;
						border: 5rpx solid;
						border-color: transparent transparent transparent #FFFFFF;
						transform: rotate(-45deg);

					}
				}
			}
		}

		.bottom-btn {
			display: flex;
			align-items: center;
			justify-content: center;

			.reset1 {
				width: 50rpx;
				height: 20rpx;
				background: #797979;
				font-size: 9rpx;
				text-align: center;
				line-height: 20rpx;
				color: #FFFFFF;
				border-radius: 5rpx;
				// margin-top: 30rpx;
				margin: 30rpx 20rpx 0rpx 20rpx;
			}

			.reset2 {
				width: 50rpx;
				height: 20rpx;
				background: #086BC8;
				font-size: 9rpx;
				text-align: center;
				line-height: 20rpx;
				color: #FFFFFF;
				border-radius: 5rpx;
				// margin-top: 30rpx;
				margin: 30rpx 20rpx 0rpx 20rpx;
			}
		}


	}

	// 查看监控弹出框
	.monitoring {
		background: #1D395E;
		border: 1rpx solid #086BC8;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;
		padding-bottom: 10rpx;

		.attention {
			color: #FFFFFF;
			font-size: 12rpx;
			padding: 10rpx 0rpx 0rpx 10rpx;
		}

		.frequency {
			// padding: 0rpx 200rpx 100rpx 200rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 10rpx;

			.frequencyLeft {
				width: 300rpx;
				height: 200rpx;
				border: 1rpx solid #FFFFFF;
				margin-left: 10rpx;
			}

			.frequencyRight {

				.direction {

					.shang {
						width: 25rpx;
						height: 25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 0 auto;
						background: #1575F1;
						border-radius: 40%;

						.shangimg {
							width: 20rpx;
							height: 20rpx;
						}
					}

					.three {
						width: 160rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 20rpx 0rpx;

						.zuo {
							width: 25rpx;
							height: 25rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 0 auto;
							background: #1575F1;
							border-radius: 40%;

							.zuoimg {
								width: 20rpx;
								height: 20rpx;
							}
						}

						.yuan {
							width: 40rpx;
							height: 40rpx;
							background: #0D1F37;
							border-radius: 50%;
							position: relative;

							.yuans {
								width: 30rpx;
								height: 30rpx;
								background: #1575F1;
								border-radius: 50%;
								position: absolute;
								left: 0;
								right: 0;
								top: 0;
								bottom: 0;
								margin-left: auto;
								margin-right: auto;
								margin-top: auto;
								margin-bottom: auto;
							}
						}

						.you {
							width: 25rpx;
							height: 25rpx;
							;
							display: flex;
							justify-content: center;
							align-items: center;
							margin: 0 auto;
							background: #1575F1;
							border-radius: 40%;

							.youimg {
								width: 20rpx;
								height: 20rpx;
							}
						}
					}

					.xia {
						width: 25rpx;
						height: 25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 0 auto;
						background: #1575F1;
						border-radius: 40%;

						.xiaimg {
							width: 20rpx;
							height: 20rpx;
						}
					}
				}
			}
		}

		.bases {
			display: flex;
			justify-content: space-around;
			// padding-top: 20rpx;
			margin-top: 20rpx;
			padding-bottom: 20rpx;

			.buttons {
				width: 20%;
				height: 20%;
				background: #038BFF;
				font-size: 10rpx;
				text-align: center;
				color: #ffffff;
				padding: 5rpx 0rpx 5rpx 0rpx;
				border-radius: 5rpx;

			}
		}

	}

	// 身份验证弹出层
	.all {
		background: #1D395E;
		border: 1rpx solid red;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;

		.verification {
			font-size: 10rpx;
			color: #FFFFFF;
			padding: 10rpx 0rpx 0rpx 10rpx;
			// margin-top: 10rpx;
		}

		.verify {
			display: flex;
			justify-content: space-around;
			align-items: center;

			.verifyall {
				.verifyimg {
					width: 240px;
					height: 320px;

					.verifyimgs {
						width: 240px;
						height: 320px;
					}
				}

				.verifytext {
					font-size: 16rpx;
					color: #FFFFFF;
					text-align: center;
					padding-bottom: 10rpx;
				}
			}
		}
	}

	//人脸、刷卡验证
	.humanface {
		background: #1D395E;
		padding: 10rpx 0rpx 0rpx 10rpx;
		border: 1rpx solid red;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;

		.humanfaceText {
			width: 30%;
			height: 20%;
			border: 1px solid #1167B6;
			font-size: 8rpx;
			text-align: center;
			line-height: 40px;
			border-radius: 20px;
			color: white;
			// padding-top: 10rpx;
		}

		.humanfaceimg {
			width: 250px;
			height: 350px;
			padding: 10rpx 40rpx 25rpx 30rpx;

			.humanfaceimgs {
				width: 250px;
				height: 350px;
			}
		}
	}

	//密码验证
	.input {
		background: #1D395E;
		padding: 10rpx 10rpx 10rpx 10rpx;
		border: 1rpx solid red;
		border-image: linear-gradient(to left top, #086BC8, transparent, #086BC8) 10 10;

		.inputText {
			width: 30%;
			height: 20%;
			border: 1px solid #1167B6;
			font-size: 8rpx;
			text-align: center;
			line-height: 40px;
			border-radius: 20px;
			color: white;
		}

		.submit {
			width: 50%;
			height: 20%;
			background: #038BFF;
			margin: 0 auto;
			font-size: 10rpx;
			text-align: center;
			color: #ffffff;
			padding: 5rpx 0rpx 5rpx 0rpx;
			border-radius: 15rpx;
			margin-top: 20rpx;
		}
	}

	//长按弹出框
	.info {
		padding: 10rpx 20rpx 0 20rpx;

	}

	.apartment {
		color: #FFFFFF;
		font-size: 20rpx;
		text-align: center;
	}

	.essential {
		margin-top: 5rpx;
		font-size: 15rpx;
		color: #FFFFFF;
		padding-left: 10rpx;
	}

	.setting {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 10rpx;

		.locks {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.lock {
				width: 70rpx;
				height: 30rpx;
				background: #ffaa00;
				border-radius: 15rpx;
				font-size: 15rpx;
				line-height: 30rpx;
				text-align: center;
				color: #FFFFFF;
			}

			.lock2 {
				width: 70rpx;
				height: 30rpx;
				background: #a39c92;
				border-radius: 15rpx;
				font-size: 15rpx;
				line-height: 30rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}

		.restoration {
			width: 70rpx;
			height: 30rpx;
			background: #ffaa00;
			border-radius: 15rpx;
			font-size: 15rpx;
			line-height: 30rpx;
			text-align: center;
			color: #FFFFFF;
		}
	}
	//重新获取成功暂时
	.succeed{
		width: 10rpx;
		height:10rpx;
		background: #18B566;
		border-radius: 50%;
		margin-left: 10rpx;
	}
	.lose{
		width: 10rpx;
		height:10rpx;
		background: #7a7a7a;
		border-radius: 50%;
		margin-left: 10rpx;
	}
</style>

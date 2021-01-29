import {
	http
} from '@/common/service.js'

/* 
	GET
	
	//http.get(' 接口路径 ', {
	    params: {userName: 'name', password: '123456'}, //会加在url上 
	    header: {}, //会与全局header合并，如有同名属性，局部覆盖全局 
	    dataType: 'json',
	    custom: {auth: true}, //可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	    自定义验证器。statusCode必存在。非必填
	    validateStatus: function validateStatus(statusCode) {
			return statusCode >= 200 && statusCode < 300
	    }
	//})
 
 */
var tokens;
if (uni.getStorageSync) {
	tokens = uni.getStorageSync('token')
	// console.log(tokens)
}


// 获取验证码
export function getCodeImg() {
	return http.get('/code', {
		params: {
		}
	})
}

// 获取用户信息
export function getInfo() {
	return http.get('/system/user/getInfo', {
		params: {
		}
	})
}
// 获取当前区域设备状态
export function getDesData(regionId) {
	return http.get('/device/door/assemblyDesData', {
		params: {
			regionId
		}
	})
}

// 全开
export function getOpenDoor(regionId,funId) {
	return http.get('/server/doorControl/fullOpenClose', {
		params: {
			type:0,
			regionId,
			funId
		}
	})
}

// 全关
export function getCloseDoor(regionId,funId) {
	return http.get('/server/doorControl/fullOpenClose', {
		params: {
			type:1,
			regionId,
			funId
		}
	})
}
// 功能列表
export function getFunctionList(regionId) {
	return http.get('/device/function/list', {
		params: {
			regionId
		}
	})
}
// 获取监区
export function getDevice(devRegionId) {
	return http.get('/device/region/'+ devRegionId, {
		params: {
		}
	})
}






// //  搜索老人
// export function getsearchElder(regionId, searchContent) {
// 	return http.get('/elder/searchElder', {
// 		params: {
// 			regionId, //id
// 			searchContent //名字
// 		}
// 	})
// }


// //  巡视订单
// export function getTour(regionId,type, employeeId,currentPage) {
// 	return http.get('/order', {
// 		params: {
// 			regionId, //区域id
// 			type, 
// 			employeeId,//员工id
// 			currentPage,
// 			pageSize:4
// 		}
// 	})
// }

// //  老人求助
// export function getSeekhelp(regionId,type, employeeId) {
// 	return http.get('/order', {
// 		params: {
// 			regionId, //区域id
// 			type, 
// 			employeeId,//员工id
// 		}
// 	})
// }
// //  进行中订单
// export function getunderway(regionId,type, employeeId) {
// 	return http.get('/order', {
// 		params: {
// 			regionId, //区域id
// 			type, 
// 			employeeId,//员工id
// 		}
// 	})
// }

// //  搜索员工
// export function getsearchEmployee(regionId, searchContent) {
// 	return http.get('/employee/searchEmployee', {
// 		params: {
// 			regionId, //区域id
// 			searchContent, //员工id
// 		}
// 	})
// }

// //  获取房间内老人
// export function getold(orderId) {
// 	return http.get('/elder/showSameRoomElder', {
// 		params: {
// 			orderId
// 		}
// 	})
// }

// //  获取用户信息
// export function getuserinfo(id) {
// 	return http.get('/employee/findById', {
// 		params: {
// 			id
// 		}
// 	})
// }

// //  获取服务内容
// export function getcontent() {
// 	return http.get('/serviceContent', {
// 		params: {
			
// 		}
// 	})
// }





/* 

	POST
	
	
	// 局部修改配置，局部配置优先级高于全局配置
	http.post('/user/login', {userName: 'name', password: '123456'}, {
	    params: {}, // 会加在url上 
	    header: {}, //会与全局header合并，如有同名属性，局部覆盖全局 
	    dataType: 'json',
		custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	    // 自定义验证器。statusCode必存在。非必填
	    validateStatus: function validateStatus(statusCode) {
			return statusCode >= 200 && statusCode < 300
	    }
	})
 */

// // 登录方法
// export function login(username, password, code, uuid) {
//   return request({
//     url: '/auth/login',
//     method: 'post',
//     data: { username, password, code, uuid }
//   })
// }

// 登录
export function login(username, password, code, uuid) {
	return http.post('/auth/login', {
		username,
		password,
		code,
		uuid,
	})
}

// 控制开门宽度
export function getdoorControl(doorId,openCloseDoor) {
	return http.post('/server/doorControl', {
			doorId,
			highLowSpeed:0,
			openCloseDoor
	})
}
// 控制多选关门
export function getclosdoorControl(doorId) {
	return http.post('/server/doorControl', {
			doorId,
			highLowSpeed:0,
			openCloseDoor:0
	})
}











// //提交主动服务
// export function activeService(beImages, afImages,elderId, employeeId, content) {
// 	return http.post('/order/genActiveOrder', {
// 		beImages,
// 		afImages,
// 		elderId,
// 		employeeId,
// 		content
// 	})
// }


// //提交主动服务(巡视)
// export function submitService(beImages, afImages,content, type, elderId,orderId) {
// 	return http.post('/order/submitService', {
// 		beImages,
// 		afImages,
// 		content,
// 		type,
// 		elderId,
// 		orderId
// 	})
// }

// //激光推送
// export function jPush(employeeId,registrationId) {
// 	return http.post('/jPush', {
// 		employeeId,
// 		registrationId
// 	})
// }

// //发起请求协助
// export function postRelease(orderId,parentOrderType,receiveEmpId,content) {
// 	return http.post('/order/colleagueAssistance', {
// 		orderId,
// 		parentOrderType,
// 		receiveEmpId,
// 		content
// 	})
// }










/* 
	upLoad
 */



// //修改 上传 个人信息
// export function setUserInfo(consId, nikeName, sex) {
// 	return http.upload('/consumer/editConsumerMessage1', {
// 		params: {},
// 		/* 会加在url上 */
// 		files: [], // 需要上传的文件列表。使用 files 时，filePath 和 name 不生效。App、H5（ 2.6.15+）
// 		fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
// 		filePath: '', // 要上传文件资源的路径。
// 		name: 'file', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
// 		header: {},
// 		/* 会与全局header合并，如有同名属性，局部覆盖全局 */
// 		formData: {
// 			consId,
// 			nikeName,
// 			sex
// 		} // HTTP 请求中其他额外的 form data
// 	})

// }


/* 
	PUT
*/


// //更新订单状态
// export function putordere(orderId,type,status) {
// 	return http.put('/order/changeOrderStatus', {
// 		orderId,
// 		type,
// 		status
// 	})
// }

// //更新员工状态
// export function workStatus(employeeId, status) {
// 	return http.put('/employee/updateWorkStatus', {
// 		// params: {
// 			employeeId,
// 			status
// 		// }
// 	})
// }

// //接单  单号：前缀加单号  X 巡视  A报警 H协助
// export function receiveOrder(orderId, employeeId) {
// 	return http.put('/order/receiveOrder', {
// 		orderId,
// 		employeeId
// 	})
// }

// 上锁
export function lock (doorId) {
	return http.put('/device/door/lockOrUnLock', {
			doorId,
			type:0
	})
}





// 解锁
export function unlock (doorId) {
	return http.put('/device/door/lockOrUnLock', {
			doorId,
			type:1
	})
}



//退出登录
export function logOut () {
	return http.delete('/system/user/logout', {
		params: {
		
		}
	})
}

//复位
export function restoration (doorId) {
	return http.delete('/server/doorControl/clearExe/' + doorId, {  
			params: {
				
			}
	})
}



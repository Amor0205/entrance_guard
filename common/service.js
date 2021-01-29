/**
 * @version 3.0.3
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: 2.7.9
 */
import Request from '@/utils/luch-request/luch-request/index.js'
import {
	logOut
} from '../src/ajax.js'
const IP = 'http://110.187.88.70:21706'; //全局接口地址

const getTokenStorage = () => {
	let token = ''
	try {
		token = uni.getStorageSync('token')
	} catch (e) {
		//TODO handle the exception
	}
	return token
}

const test = new Request()
/**
 * 修改全局配置示例
 const test = new Request({
	header: {a:1}, // 举例
	baseURL: 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest',
	validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置
		return statusCode >= 200 && statusCode < 300
	}
})
 test.config.baseURL = 'https://www.fastmock.site/mock/26243bdf9062eeae2848fc67603bda2d/luchrequest'
 **/

test.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = IP
	config.header = {
		...config.header,
		a: 1, // 演示
		b: 2 // 演示
	}
	return config
})

test.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作  */
	config.header = {
		...config.header,
		a: 3 // 演示
	}
	/*
	if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
	  return Promise.reject(config)
	}
	*/
	return config
}, (config) => {
	return Promise.reject(config)
})


test.interceptors.response.use((response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
		return Promise.reject(response)
		console.log(response);
	}
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	return Promise.reject(response)
})


const http = new Request()
http.setConfig((config) => { /* 设置全局配置 */
	config.baseURL = IP /* 根域名不同 */
	config.header = {
		...config.header,
		a: 1, // 演示
		b: 2 // 演示
	}
	return config
})


http.interceptors.request.use((config) => { /* 请求之前拦截器。可以使用async await 做异步操作 */
	var tokens = '';
	if (getTokenStorage()) {
		tokens = 'Bearer ' + getTokenStorage();
		// console.log(tokens);
	}
	config.header = {
		...config.header,
		token: getTokenStorage(),
		Authorization: tokens
	}
	/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
	return config
}, (config) => {
	return Promise.reject(config)
})
// 必须使用异步函数，注意
http.interceptors.response.use(async (response) => { /* 请求之后拦截器。可以使用async await 做异步操作  */
	//判断不同状态 退回到登录页面
	if (response.data.code == 400) { //令牌过期
		uni.showToast({
			icon: 'none',
			title: response.data.message
		})
	} else if (response.data.code == 401) { //登录信息过期
		uni.showToast({
			icon: 'none',
			title: response.data.message
		})
		uni.reLaunch({
			url: '/pages/login/login'
		})
	} else if (response.data.code == 402) { //多个账号登录
		uni.showToast({
			icon: 'none',
			title: response.data.message
		})
		uni.reLaunch({
			url: '/pages/login/login'
		})
	} else if (response.data.code !== 200) { // 服务端返回的状态码不等于200，则reject()
		return Promise.reject(response)
	}
	return response
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	console.log(response)
	return Promise.reject(response)
})

export {
	http,
	test
}

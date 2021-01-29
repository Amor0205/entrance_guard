import Vue from 'vue'
import App from './App'
import uView from 'uview-ui';
import { http } from '@/common/service.js' // 全局挂载引入请求处理
import ajax from 'src/ajax.js'


Vue.config.productionTip = false
Vue.use(uView);
Vue.prototype.$http = http;

App.mpType = 'app'



const app = new Vue({
    ...App
})
app.$mount()

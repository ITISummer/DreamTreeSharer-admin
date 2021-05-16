import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import {postRequest,deleteRequest,getRequest,putRequest} from '@/utils/my-request'

import moment from 'moment'
import 'moment/locale/zh-cn'

// 使用中文时间
moment.locale('zh-cn')
Vue.prototype.$moment = moment

Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.getRequest = getRequest;
/*==============================路由导航守卫==================================*/
/**
 * 路由导航守卫 - 防止用户手动刷新操作导致 vuex 数据为空
 * 配置路由导航守卫后，对每一次页面之间跳转都会进行初始化操作
 * 而判断是否需要初始化操作的条件是：用户是否登录，当用户是登录状态，则 localStorage 里存在 token
 * [#Action](https://vuex.vuejs.org/zh/guide/actions.html)
 */
// router.beforeEach((to, from, next) => {
//   if (window.sessionStorage.getItem('token')) {
//     // 判断用户信息是否存在
//     // [js 判断一个 object 对象是否为空](https://blog.csdn.net/FungLeo/article/details/78113661)
//     // if (!window.sessionStorage.getItem('userInfo')) {
//     if (Object.keys(store.state.adminInfo).length === 0) {
//       console.log('main.js--')
//       return getRequest('/get-user-info').then(resp => {
//         if (resp) {
//           // 存入用户信息
//           window.sessionStorage.setItem('adminInfo', JSON.stringify(resp.object))
//           // store.dispatch() 触发 store 的 action 方法
//           store.dispatch('admin/initAdminInfo',resp.object).then(res=>true)
//           next()
//         }
//       })
//     }
//     // next()：放行请求，必须加
//     next()
//   } else {
//     // 判断用户点击要去的页面是否是登录页请求
//     if (to.path === '/admin/login') {
//       next()
//     } else {
//       next('/?redirect=' + to.path)
//     }
//   }
// })
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import axios from "axios";
import {Message} from "element-ui";
import {Loading} from 'element-ui';
import Vue from 'vue'

/*===========================变量===============================*/
let loadingInstance;
let source = axios.CancelToken.source();
let loadingRequestCount = 0;
// create an axios instance
const my_service = axios.create({
  baseURL: '/admin', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// axios 拦截器配置
my_service.interceptors.request.use(config=>{
  config.cancelToken = source.token // 取消请求
  if (config.cancelToken && config.cancelObj && config.cancelObj.cancel) {
    config.cancelObj.cancel('中断请求');
    delete config.cancelObj;
  }
  if (!navigator.onLine) { // 断网提示
    source.cancel('网络故障，请检查!')
  }
  // 配置了store持久化的就不需要取 sessionStorage 的了
  const token = window.sessionStorage.getItem('token');
  // 如果存在 token，后台未放行的请求都得携带这个 token 才能访问
  if (token) {
    config.headers['Authorization'] = token
  }
  // 请求拦截进来调用显示loading效果
  showLoading(config)
  console.log('api.js->axios.interceptors.request.use()')
  return config
},error => {
  console.log('my-request.js->request.use()->error',error)
})

my_service.interceptors.response.use(resp=>{
  console.log('api.js->axios.interceptors.response.use() => success')
  // 响应拦截进来隐藏loading效果，此处采用延时处理是合并loading请求效果，
  // 避免多次请求loading关闭又开启
  // 合并loading请求效果 避免重复请求
  setTimeout(() => {
    hideLoading()
  }, 500);

  if (resp.status === 200) {
    if (resp.data.statusCode === 200) {
      Message.success({message: resp.data.message})
      // 返回数据给前端
      return resp.data
    } else {
      Message.warning({message: resp.data.message})
      return false
    }
  }

},error => {
  console.log('my-request.js->response.use()->error',error)
})
/**
 * 显示loading的函数 并且记录请求次数 ++
 */
const showLoading = () => {
  if (loadingRequestCount === 0) {
    // element的服务方式 target 我这边取的是表单 项目是后台系统 每个页面都有表单 类似整个表单loading
    // 和在表单配置v-loading一样的效果，这么做是全局实现了，不用每个页面单独去v-loading
    loadingInstance = Loading.service({target: '.el-form'});
  }
  loadingRequestCount++
}
/**
 * 隐藏loading的函数，并且记录请求次数
 */
const hideLoading = () => {
  if (loadingRequestCount <= 0) return
  loadingRequestCount--
  if (loadingRequestCount === 0) {
    Vue.nextTick(() => {//以服务的方式调用的 Loading 需要异步关闭
      loadingInstance.close();
    });
  }
}
export default my_service

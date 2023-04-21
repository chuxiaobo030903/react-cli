import axios from 'axios';
const cfg = require('@config/config.local');

// 设置默认请求头(判断是否是本地环境)
if (/(localhost|127|20)/.test(window.location.host)) {
  axios.defaults.baseURL = cfg.dev_api;
} else {
  axios.defaults.baseURL = cfg.prod_api;
}
axios.defaults.headers['Content-Type'] = 'application/json';

// let xwindow: any = window;
// axios.defaults.headers['token'] = xwindow.userMsg.token;
// 请求超时的时间限制
axios.defaults.timeout = 50000;
// 开始设置请求 发起的拦截处理
axios.interceptors.request.use((config: any) => {
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

// 请求到结果的拦截处理
axios.interceptors.response.use((config: any) => {
  if (!config.data.success) {
    // 未登陆授权返回到登录页面
    // if(config.data.error.code == 'ERR$UNAUTHORIZED'){
    //   window.location.href = axios.defaults.baseURL+`/`
    // }
  }
  return config.data;
}, (error: any) => {
  // 当为500的时候是直接走的这里
  return Promise.reject(error);
});


const objectToQuery = (search = {})=> {
  return Object.entries(search).reduce(
      (t, v:any) => `${t}${v[0]}=${window.encodeURIComponent(v[1])}&`,
      Object.keys(search).length ? "?" : ""
  ).replace(/&$/, "");
}


// 创建任务
export const addTask =  async(params) => {
  return await axios.post('/api/v1/task',params)
}
//获取任务列表数据
export const getTaskList =  async(params: any) => {
  return await axios.get('/api/v1/task'+objectToQuery(params))
}

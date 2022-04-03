import axios from 'axios';

// 改造优化：axios 改造成 (包裹并) 返回Promise的函数 ↓
// 这里, function request(option) 里再包裹一个 Promise((resolve, reject)) 对象，
// exp. promise.then((res)=>{res接收的是 resolve(里的参数)})，.catch((err)=>{里err接收的是 reject(里的参数)})
export default function request(option) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL:
        process.env.NODE_ENV === 'production'
          ? 'http://123.207.32.32:9001/'
          : 'http://123.207.32.32:9001/',
      timeout: 5000,
    });

    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 1. 发送网络请求时，在界面的中间位置显示loading的组件

        // 2. 某一些请求，要求用户必须携带token，如果没有携带，直接跳转到登录页面 (router)
        // 3. params/data 需要 serialization 的操作
        console.log('请求被拦截。。。。。');
        return config;
      },
      (err) => {}
    );

    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              console.log('请求错误');
              break;
            case 401:
              console.log('未授权访问');
              break;
            case 404:
              console.log('网络请求错误!');
              break;
            default:
              console.log('其他错误哦');
          }
        }
        return err;
      }
    );

    // call instance(option), 先执行，再放到Promise里的 resolve 和 reject
    instance(option)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

import axios from 'axios'
export const GetAxios = (config, login, baseUrl) => {
  let instance = axios.create({
    headers: {
      'content-type': 'application/json'
    }
  })

  instance.defaults.baseURL = baseUrl
  instance.defaults.withCredentials = true

  // 添加请求拦截器
  instance.interceptors.request.use(config, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })

  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // console.log(response)
    if (response.status === 200) {
      if (response.headers['content-type'].indexOf('application/json') !== -1) {
        if (response.data.code === 100000) {
          // 登录失败 跳转到登陆页面
          // 登录
          // 跳转到登录页
          localStorage.removeItem('Student-Toknn')
          login()
          console.log(response.data)
        } else {
          return response.data
        }
      } else {
        // 文件流
      }
    }
    return response.data
  }, function (error) {
    // 对响应错误做点什么
    console.log(error)
    return Promise.reject(error)
  })
  return instance
}

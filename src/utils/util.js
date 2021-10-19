import api from '../api/api'
export default {
  install: function (Vue) {
    Vue.prototype.$api = api
    Vue.prototype.ImgUrl = (src) => {
      return process.env.VUE_APP_CDN + src
    }
    Vue.prototype.formatDate = (time, fmt) => {
      if (time > 0) {
        let date = new Date(time * 1000)
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
          'M+': date.getMonth() + 1,
          'd+': date.getDate(),
          'h+': date.getHours(),
          'm+': date.getMinutes(),
          's+': date.getSeconds()
        }
        for (let k in o) {
          if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
          }
        }
        return fmt
      } else {
        return ''
      }
    }
  }
}

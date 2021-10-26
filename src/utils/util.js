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
    Vue.prototype.downloadBlob = (res, fileName) => {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.ms-excel' }))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      let id = 'blobDownload' + Math.round(Math.random() * 1000000)
      link.id = id
      link.setAttribute('download', fileName) // 命名可能会出现问题，格式一定和后端下载的格式一样

      document.body.appendChild(link)
      link.click()
      document.getElementById(id).remove()
    }
  }
}

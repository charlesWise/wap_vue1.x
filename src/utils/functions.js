/**
 * Created by xuxin on 16/3/24.
 */
import Conf from '../constants/config'

let toastConf = Conf.toast
let alertConf = Conf.alert
let headerConf = Conf.header
let loadingConf = Conf.loading
let footerConf = Conf.footer
//let redirectUrl = Conf.redirectUrl

let toast = {
  show (message) {
    toastConf.show = true
    toastConf.msg = message
  },
  hide () {
    toastConf.show = false
    toastConf.msg = ''
  }
}

let alert = {
  show (message) {
    alertConf.show = true
    alertConf.msg = message
  },
  hide () {
    alertConf.show = false
    alertConf.msg = ''
  }
}

let loading = {
  show () {
    loadingConf.show = true
  },
  hide () {
    loadingConf.show = false
  }
}

let functions = {}
functions = {
  setHeader (title) {
    headerConf.title = title || Conf.chinese.title
  },
  showFooter () {
    footerConf.show = true
  },
  hideFooter () {
    footerConf.show = false
  },
  isShowFooter (name) {
    let arr = Conf.footerCanSee
    return arr[name] !== undefined ? true : false
  },
  isEmptyObject (obj) {
    let name
    for (name in obj ) {
      return false
    }
    return true
  },
  initWindow (id) {
    var wrap = document.getElementById(id)
    wrap.style.minHeight = document.documentElement.clientHeight + 'px'
    wrap.style.width = document.documentElement.clientWidth + 'px'
  }
}

export { toast, alert, loading, functions }

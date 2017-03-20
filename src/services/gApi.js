/**
 * Created by xuxin on 16/3/22.
 */
import { alert as Alert } from '../utils/functions'
import Conf from '../constants/config'
import Vue from 'vue'
import apiMap from '../constants/config.api'
import localStorageCtrl from '../controllers/localStorageCtrl'

const LoginUrl = Conf.url.login

function noop () {}

function requireLogin (logined) {
  return parseInt(logined) !== 0
}

function redirect () {
  Conf.redirectUrl = 'account'
  window.location.hash = LoginUrl
}

// state 是否隐藏
function closeLoadding(state) {
  if(state) return;
  Conf.loading.show = false;
}

function request (options) {
  let resolve = options.resolve || noop
  let reject = options.reject || noop
  let method = options.method || 'get'
  let data = options.data || {}
  let url = options.url || ''
  let isHideLoadding = (function() {
    var state = false;
    Conf.noLoadding.some(function(item) {
      // 匹配目录
      if(url.indexOf(apiMap[item]) !== -1) {
        return state = true;
      }
    });
    return state;
  }());

  if(!isHideLoadding) {
    Conf.loading.show = true;
  }
  return Vue.http[method](url, data)
    .then(function (response) {
      let res = response.data
      // 把boolen由string 转为 boolen
      if(res && res.boolen) {
        res.boolen = parseInt(res.boolen);
      }
      if (!requireLogin(res.logined)) {
        localStorageCtrl.clearAll()
        redirect.call(this)
      }
      closeLoadding(isHideLoadding);
      return resolve.call(this, res)
    }, function (response) {
      Alert.show(response.statusText)
      reject.call(this, response.statusText)
      closeLoadding(isHideLoadding);
    })
}

let apiConf = {
  isLogin: apiMap.isLogin,
  userInfo: apiMap.userInfo,
  userAccount: apiMap.userAccount
}

function gApi (url, options) {
  let reject = options.reject || noop
  // 检测网络状态 安卓以外的 通过这种方式监测网络
  if ((typeof navigator.onLine === 'boolean' && !navigator.onLine)) {
    Alert.show('无法连接到服务器或网络，请检查网络设置')
    reject()
    return false
  }

  options.url = apiConf[url]

  return request(options)
}

export default gApi

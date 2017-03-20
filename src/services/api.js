/**
 * Created by xuxin on 16/3/22.
 */
import ApiMap from '../constants/config.api'
import { alert as Alert } from '../utils/functions'
import Conf from '../constants/config'
import localStorageCtrl from '../controllers/localStorageCtrl'

//let ENVIRONMENT = window.ENVIRONMENT
//
const LoginUrl = Conf.url.login

function noop () {}

// 检查 str 不是 arr里的元素
function isMatch(str, arr) {
  var state = false;
  arr.some(function(item) {
    // 匹配目录
    if(str.indexOf(ApiMap[item]) !== -1) {
      return state = true;
    }
  });
  return state;
}

// state 是否隐藏
function closeLoadding(state) {
  if(state) return;
  Conf.loading.show = false;
}

function requireLogin (logined) {
  return parseInt(logined) !== 0
}

function redirect () {
  Conf.redirectUrl = this.$route.name
  window.location.hash = LoginUrl
}

function request (options) {
  let resolve = options.resolve || noop
  let reject = options.reject || noop
  let method = options.method || 'get'
  let data = options.data || {}
  let url = options.url || ''
  let isHideLoadding = isMatch(url, Conf.noLoadding);

  if(!isHideLoadding) {
    Conf.loading.show = true;
  }
  return this.$http[method](url, data)
    .then(function (response) {
      let res = response.data
      if(res && res.boolen) {
        res.boolen = parseInt(res.boolen);
      }
      if (!requireLogin(res.logined)) {
        localStorageCtrl.clearAll()
        redirect.call(this)

      // 如果请求失败，把错误信息打出来
      }  else if(!res.boolen && !options.isHideErrorPop){
        Conf.alert.show = true;
        Conf.alert.msg = res.message || '';
      }
      closeLoadding(isHideLoadding);
      return resolve.call(this, res)
    }, function (response) {
      Alert.show(response.statusText)
      reject.call(this, response.statusText)
      closeLoadding(isHideLoadding);
      //reject.call(this, {
      //  boolen: 999,
      //  message: response.statusText
      //})
    })
}

let START_WITH_FLASH = /^\//
let START_WITH_HTTP = /^http/

let api = {}

// options.isHideErrorPop = true // 说明不要弹出错误提示框
var createApi = function (key) {
  api[key] = function (options) {
    let reject = options.reject || noop
    // 检测网络状态 安卓以外的 通过这种方式监测网络
    if ((typeof navigator.onLine === 'boolean' && !navigator.onLine)) {
      Alert.show('无法连接到服务器或网络，请检查网络设置')
      reject.call(this)
      return false
    }

    let url = ApiMap[key]
    //if (!START_WITH_HTTP.test(url)) {
    //  url = START_WITH_FLASH.test(url) ? url : '/' + url
    //  url = Config['host'] + url
    //}

    options.url = url

    return request.call(this, options)
  }
}

for (var key in ApiMap) {
  if (ApiMap.hasOwnProperty(key)) {
    createApi(key)
  }
}

export default api

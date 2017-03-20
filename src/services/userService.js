/**
 * Created by xuxin on 16/4/19.
 */
import localData from './localStorage'
import Conf from '../constants/config'
import { toast } from '../utils/functions'
import gApi from '../services/gApi'

//let this.user = {
//  avatar: 'http://www.xinhehui.com/public/image/default_01.jpg'
//}

const localUser = 'userInfo'

let userService = {
  user: {},
  setUser (obj) {
    this.user = {avatar: 'http://www.xinhehui.com/public/image/default_01.jpg'}
    //obj = this.parseObj(obj)
    Object.assign(this.user, obj)
    this.user.avatar = this.user['ava'] && this.user['ava']['url_s50'] ? this.user['ava']['url_s50'] : this.user.avatar
    localData.set(localUser, this.user)
  },
  parseObj (obj) {
    obj.is_binding_bank = parseInt(obj.is_binding_bank)
    return obj
  },
  getUser () {
    if ( !this.isInCache() && localData.get(localUser) ) {
      this.user = localData.get(localUser)
    } else {
      //防止localStorage被清空
      //先判断是否登录,若登录则请求用户信息,否则不处理
      gApi('isLogin', {
        resolve: function (json) {
          if (json.boolen == 1) {
            userService.getUserFromRemote()
          }
        }
      })
    }
    return this.user
  },
  getUserFromRemote: function () {
    gApi('userInfo', {
      resolve: function (json) {
        if (json.boolen === 1) {
          if (json.data === '请先登录吧') {
            if (window.location.hash.indexOf('login') === -1) {
              window.location.href = '/#login'
            }
          } else {
            userService.setUser(json.data)
          }
        }
      }
    })
  },
  isInCache () {
    return this.user.uid
  },
  init: function () {
    userService.getUser()
  },
  getAva () {
    return this.user.avatar
  },
  setAva (val) {
    this.user.avatar = val
    localData.set(localUser, this.user)
    return this.user.avatar
  },
  getAccountBalance () {
    if (!this.user['accountBalance']) {
      gApi('userAccount', {
        resolve: function (json) {
          if (json.boolen == 1) {
            userService.user['accountBalance'] = json['data']['top_amount_view']
          }
        }
      })
    }
    return this.user['accountBalance']
  },
  getAttr (attr) {
    return this.user[attr]
  },
  setAttr (attr, val) {
    if (attr) {
      this.user[attr] = val
      localData.set(localUser, this.user)
    }
  },
  clear () {
    this.user = {}
    localData.remove(localUser)
  }
}

export default userService

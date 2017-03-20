/**
 * Created by xuxin on 16/4/25.
 */
import localData from './localStorage'
import Conf from '../constants/config'
import { toast } from '../utils/functions'

class userClass {
  constructor() {
    this.localUser = 'userInfo'
    this.user = {
      avatar: 'http://www.xinhehui.com/public/image/default_01.jpg'
    }
  }

  setUser (obj) {
    Object.assign(this.user, obj)
    localData.set(this.localUser, this.user)
  }

  //加入localstorage被清空了咋办
  getUser () {
    if (this.isInCache()) {
      //return user
    } else if ( localData.get(this.localUser) ) {
      this.setUser(localData.get(this.localUser))
    } else {
      //toast.show('请登录')
      //window.location.hash = Conf.url.login
    }

    return this.user
  }

  isInCache () {
    return this.user.uid
  }

  init () {
    this.getUser()
  }

  getAva () {
    this.user.avatar = this.user['ava'] && this.user['ava']['url_s50'] ? this.user['ava']['url_s50'] : this.user.avatar
    return this.user.avatar
  }

  getAttr (attr) {
    return this.get()[attr]
  }

  setAttr (attr, val) {
    if (attr) {
      this.user[attr] = val
    }
  }
}

export default userClass

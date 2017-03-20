/**
 * Created by xuxin on 16/4/26.
 */
import userService from '../services/userService'
import formService from '../services/formService'
import transferService from '../services/transferService'

let localStorageCtrl = {
  init () {
    // 初始化forms,user,transfer对象
    formService.init()
    userService.init()
    transferService.init()
  },
  clearAll () {
    formService.clearForm()
    userService.clear()
    transferService.clear()
  },
  refresh () {
    formService.refreshFormToLocal()
  }
}

export default localStorageCtrl


import Api from '../service/api'

function noop() {}
export default {
  login(data, resolve, reject) {
    let options = {
      data: data,
      resolve: resolve || noop,
      reject: reject || noop
    }
    return Api.login.call(this, options)
  }
}

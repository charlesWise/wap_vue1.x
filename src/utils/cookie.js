/**
 * cookie增删改查
 */
export default {
  /**
   * 获取cookie
   * @param sName
   * @returns {*}
   */
  getCookie: function (sName) {
    // 将cookie字符串用'；'分割成数组
    var aCookie = document.cookie.split("; ")
    var length = aCookie.length
    for (var i = 0; i < length; i++) {
      // 将键值对用'='隔开
      var aCrumb = aCookie[i].split("=")
        // 如果找到了这个cookie名称，则返回cookie的值
      if (sName == aCrumb[0]) return decodeURIComponent(aCrumb[1])
    }
    // 没有此cookie
    return null
  },
  /**
   * 设置cookie
   * @param sName
   * @param sValue
   * @param sExpires
   */
  setCookie: function (sName, sValue, sExpires) {
    var sCookie = sName + "=" + encodeURIComponent(sValue)
    if (sExpires != null && (sExpires instanceof Date)) {
      sCookie += "; expires=" + sExpires.toGMTString()
    }
    document.cookie = sCookie
  },
  /**
   * 删除cookie
   * @param sName
   */
  removeCookie: function (sName) {
    document.cookie = sName + "=; expires=Fri, 31 Dec 1999 23:59:59 GMT;"
  }
}

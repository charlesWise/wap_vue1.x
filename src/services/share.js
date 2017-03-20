/**
 * @description
 * share 微信自定义分享 页面授权 事件自定义
 */
import Api from './api.js'

export default function() {
  return {
    getWxCfg :function () {
      var _this = this
      Api.wxAuth({}, function (json) {
        if(json.boolen === 1){
          _this.doCfgWx(json.data)
        }
      }, 'json')
    },

    doCfgWx :function (conf) {
      wx.config({
        debug: false,
        appId: conf.appId,
        timestamp: conf.timestamp,
        nonceStr: conf.nonceStr,
        signature: conf.signature,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo'
        ]
      })

      wx.ready(function () {
        Api.getInvite( {}, function (json) {
          if(json.boolen == 1){
            var title = json.data.title
            var desc = json.data.desc
            var link = json.data.ur
            var imgUrl = json.data.logo

            var shareData = {
              title: title,
              desc: desc,
              link: link,
              imgUrl: imgUrl
            }

            var shareData1 = {
              title: desc,
              desc: desc,
              link: link,
              imgUrl: imgUrl
            }

            wx.onMenuShareAppMessage(shareData)//监听"分享给朋友"
            wx.onMenuShareTimeline(shareData1)//监听"分享到朋友圈"
            wx.onMenuShareQQ(shareData)//监听"分享到QQ"
            wx.onMenuShareWeibo(shareData)//监听"分享到微博"
          }
        })
      })
    }
  }
})
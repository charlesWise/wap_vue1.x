/**
 * Copyright (c) 2012, All rights reserved.
 *
 * @fileOverview countDown time
 * @version 1.0
 * @author <a href="mailto:zeng.xianghu@hotmail.com">Hoogle</a>、<a href="http://weibo.com/yinuoba">新浪微博(一诺吧)</a>)
 *
 * @description 倒计时
 * @extends countDown(options) 倒计时
 * @description 倒计时
 * @param {String} [options.tian] 存放天的选择器 形式如'#tian' (可选参数) 如果不需要显示天，可直接不传入这一参数
 * @param {String} [options.shi] 存放小时的选择器 形式如'#shi'
 * @param {String} [options.fen] 存放分钟的选择器 形式如'#fen'
 * @param {String} [options.miao] 存放秒的选择器 形式如'#miao'  (可选参数)如果不需要显示秒，则直接不传入这一参数
 * @param {Date} [options.Date] toDate 截止日期
 * @param {Number} [options.inner] 结束时间戳与当前戳之差
 * @param {Function} [options.callback] 没执行一次倒计时执行一次的方法
 * @param {Function} [options.endFun] 倒计时完毕后的回调函数
 * @param {Boolean} [options.hasUnit] 是否带时分秒的单位
 * @param {Boolean} [options.isHideEmptyDay] 当天数为0的时候是否隐藏它
 * @example
 * $util.countDown({
     tian: '#tian',
     shi: '#shi',
     fen: '#fen',
     miao: '#miao',
     toDate: new Date('2012/03/30 23:59:59')
 })
 $util.countDown({
     tian: '#tian',
     shi: '#shi',
     fen: '#fen',
     miao: '#miao',
     inner: 30000
 })
 */
export default function (options) {
  var toDate = options.toDate
  var tian = options.tian
  var shi = options.shi
  var fen = options.fen
  var miao = options.miao
  var inner = options.inner
  var callback = options.callback || function () {}
  var endFun = options.endFun || function () {}
  var hasUnit = options.hasUnit
  var countType = options.countType
  var tick2
    // 找出天、时、分、秒节点
  var tianObj = tian != null ? document.querySelectorAll(tian)[0] : null
  var shiObj = shi != null ? document.querySelectorAll(shi)[0] : null
  var fenObj = fen != null ? document.querySelectorAll(fen)[0] : null
  var miaoObj = miao != null ? document.querySelectorAll(miao)[0] : null

  var tianUnit = ''
  var shiUnit = ''
  var fenUnit = ''
  var miaoUnit = ''
  if (hasUnit) {
    tianUnit = '天'
    shiUnit = '时'
    fenUnit = '分'
    miaoUnit = '秒'
  }
  // 倒计时处理方法
  var countTime = function (inner) {

    // today 现在时间,new Date()
    // innerTime 截止时间与现在时间的时间轴的差
    // sectimeOld 截止时间与现在时间之间的秒数
    // secondSold 截止时间与现在时间之间的秒数(整数)
    // msPerDay 一天的总秒数
    // e_daysold 剩余的天数
    // daysold 剩余的天数（整数）
    // e_hrsold 剩余天数以外的小时数
    // hrsold 剩余天数以外的小时数(整数)
    // e_minsold 剩余分数
    // minsold 剩余分数(整数)
    // seconds 得到尾剩余秒数(整数)

    // 根据不同的参数，计算时间差
    var innerTime
    if (inner != null) {
      innerTime = inner
    } else {
      innerTime = toDate.getTime() - new Date().getTime()
    }

    var sectimeOld = innerTime / 1000 //剩余总秒数
    var secondSold = Math.floor(sectimeOld) //秒数取整
    var msPerDay = 24 * 60 * 60 * 1000 //一天的毫秒数
    var e_daysold = innerTime / msPerDay // 剩余天数
    var daysold = Math.floor(e_daysold) // 剩余天数取整
    var e_hrsold = (e_daysold - daysold) * 24 // 除去天后的剩余小时数
    var hrsold = Math.floor(e_hrsold)
    var e_minsold = (e_hrsold - hrsold) * 60
    var minsold = Math.floor((e_hrsold - hrsold) * 60)
    var seconds = Math.round((e_minsold - minsold) * 60)

    callback({
      daysold: daysold,
      hrsold: hrsold,
      minsold: minsold,
      seconds: seconds,
      innerTime: innerTime,
      params: options
    })

    // 如果已经到期了，则都显示为0，并且不再执行
    if (innerTime <= 0) {
      if (!hasUnit) {
        if (tian !== undefined && tianObj) {
          tianObj.innerHTML = '00'
        }
        if (shi !== undefined && shiObj) {
          shiObj.innerHTML = '00'
        }
        if (fen !== undefined && fenObj) {
          fenObj.innerHTML = '00'
        }
        if (miao !== undefined && miaoObj) {
          miaoObj.innerHTML = '00'
        }
      } else {
        if (miao !== undefined && miaoObj) {
          miaoObj.innerHTML = '0秒'
        }
      }
      endFun(options)
        // 阻止定时器继续执行
      return false
    } else {
      // 小于2位数，则十位补0
      if (hrsold < 10) {
        hrsold = '0' + hrsold
      }
      if (minsold < 10) {
        minsold = '0' + minsold
      }
      if (seconds < 10) {
        seconds = '0' + seconds
      }
    }
    // 给天、时、分、秒的DOM设置值
    if (tian != null && tianObj) {
      if (parseInt(daysold, 10)) {
        // 如果存在这个设置则把他显示
        // 这个时候有值了，就要显示出来
        if (options.isHideEmptyDay) {
          tianObj.style.display = ''
        }
        tianObj.innerHTML = (daysold < 10 ? '0' + daysold : daysold) + tianUnit
      } else {
        // 这时是空值，设置了则要隐藏
        if (options.isHideEmptyDay) {
          tianObj.style.display = 'none'
        } else {
          tianObj.innerHTML = '00' + tianUnit
        }
      }
    }
    if (shi != null && shiObj) {
      shiObj.innerHTML = hrsold + shiUnit
      if (tian == null) {
        var shiTemp = 24 * parseInt(daysold, 10) + parseInt(hrsold, 10);
        shiObj.innerHTML = (shiTemp < 10 ? '0' + shiTemp : shiTemp) + shiUnit
      }
    }
    if (fen != null && fenObj) {
      fenObj.innerHTML = minsold + fenUnit;
      if (tian == null && shi == null) {
        var fenTemp = parseInt(daysold, 10) * 24 * 60 + parseInt(hrsold, 10) * 60 + parseInt(minsold, 10)
        fenObj.innerHTML = (fenTemp < 10 ? '0' + fenTemp : fenTemp) + fenUnit
      }
    }
    if (miao != null && miaoObj) {
      miaoObj.innerHTML = seconds + miaoUnit;
      if (tian == null && shi == null && fen == null) {
        miaoObj.innerHTML = sectimeOld + miaoUnit
      }
    }
  };

  // 函数内部不断自调用
  tick2 = window.setInterval(function () {
    if (inner >= 0) {
      countTime(inner)
      if (!countType) {
        inner -= 1000
      } else {
        inner += 1000
      }
    }
  }, 1000)

  return tick2
}

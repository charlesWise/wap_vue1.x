import ApiMap from './config.api'

const chinese = {
  title: 'wap_vue1.x'
}

const config = {
  host: 'https://xinhehui.com',
  proxyApi: '/Mobile2',
  chinese: chinese,
  redirectUrl: '',
  toast: {
    show: false,
    msg: ''
  },
  alert: {
    show: false,
    msg: ''
  },
  header: {
    title: chinese.XHH
  },
  headerCanSee: [],
  footerCanSee: {
    home: 1,
    invest: 1
  },
  footer: {
    show: true
  },
  loading: {
    show: false
  },
  prjType: {
    RYS: 1,
    YYS: 5,
    SDT: 8
  },
  //常用的url
  url: {
    login: 'login',
    account: 'account',
    toConfirmBank: 'toConfirmBank'
  },
  noNeedLogin: ['login', 'home', 'invest'],
  // ajax时不用显示loadding状态的接口或者路径
  noLoadding: ['updatePwd', 'isLogin', 'account', 'bankCardCheck', 'rechargeSubmit', 'callBackFinish'],
  //上传图片服务器
  uploadImg: 'Public/Upload/uploadImg',
  //图片地址服务器
  imgSrc: 'Mobile2/User/uploadAva'
}

let ENVIRONMENT = window.ENVIRONMENT
let LocalHost = window.LocalHost

if (ENVIRONMENT === 'product') {  // 生产
  config.host = 'https://www.xinhehui.com'
} else if (ENVIRONMENT === 'ywwap') { // 运维
  config.host = 'https://ywuat.xinhehui.com'
} else if (ENVIRONMENT === 'testwap') { // 测试
  config.host = 'http://testwap5.xinhehui.com'
} else if (ENVIRONMENT === 'dev') { // 本地开发模式
  config.host = 'http://luosiyi.dev.xinhehui.com'
}

if (LocalHost) {
  config.host = LocalHost
}

export default config

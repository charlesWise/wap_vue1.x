let test = {
  wxAuth: '/Weixin/Weixin/getJssdk', //微信授权接口
  getInvite: '/Mobile2/Share/getInvite', //邀请好友
  testIndex: 'https://cnodejs.org/api/v1/topics?page=1&limit=1',
  weixin: 'http://local.weixin.com/Weixin/User/getThreeItems',
  Tplist: 'http://local.weixin.com/Weixin/Invest/plist'
}

let account = {
}

let auth = {
  'login': 'Mobile2/Auth/login',
  'logout': 'Mobile2/Auth/logout',
  'isLogin' :'Mobile2/Auth/isLogin',
  'getMobileCodeRegister' : 'Mobile2/Auth/getMobileCodeRegister',
  'register' : 'Mobile2/Auth/register'
}
//鑫拍档
let xinPartner = {
  getCommissionRecord: 'Mobile2/XinPartner/getCommissionRecord', //佣金流水记录
  xinPartnerList: 'Mobile2/XinPartner/xinPartnerList', // 邀请记录
  xinPartnerSalary: 'Mobile2/XinPartner/xinPartnerSalary', //鑫拍档
  joinXinPartner: 'Mobile2/XinPartner/joinXinPartner', //判断鑫拍档资格
  doJoinXinPartner: 'Mobile2/XinPartner/doJoinXinPartner'//加入鑫拍档
}
//投资列表
let invest = {
  plist: 'Mobile2/Invest/plist', // 列表页
  pdetail: 'Mobile2/Invest/pdetail', // 详情页
  pbuyN: 'Mobile2/Invest/pbuyN', // 投资
  prjBaseInfo: 'Mobile2/Invest/prjBaseInfo', // 项目信息
  getGuarantor: 'Mobile2/Invest/getGuarantor', // 安全保障
  prj_replay_plan_new: 'Mobile2/Invest/prj_replay_plan_new', // 还款计划
  invest_history: 'Mobile2/Invest/invest_history', // 投资记录
  getPrjProcedure: 'Mobile2/Invest/getPrjProcedure', // 项目进度
  calculator: 'Mobile2/Invest/calculator', // 计算收益
  payPrjDetail: 'Mobile2/Invest/payPrjDetail', // 投资页
  pbuyCheck: 'Mobile2/Invest/pbuyCheck', // 奖券
  pbuyProtocol : 'http://yangwenxia.dev.xinhehui.com/Index/Protocol/view', // 投资页协议

  ilist: 'Mobile2/FinancList/ilist', // 理财记录
  order_replay_plan: 'Mobile2/Invest/order_replay_plan', // 还款列表
  protocolView: 'Mobile2/FinancList/protocolView' // 查看合同
}
//账户
let userData = {
  userAccount: 'Mobile2/User/account', //获取用户信息
  userInfo: 'Mobile2/User/userInfo', //获取用户信息
  uploadAva: 'Mobile2/User/uploadAva', //上传头像
  editEmail1: 'Mobile2/User/editEmail1', //修改邮箱-第一步
  editemail2: 'Mobile2/User/editemail2', //修改邮箱-第二步
  authMail: 'Mobile2/Auth/authMail', //邮箱认证
  mobileAuth: 'Mobile2/User/mobileAuth', //手机认证
  sendMobileAuthCode: 'Mobile2/User/sendMobileAuthCode', //手机认证-发送手机认证动态码
  editMobile1: 'Mobile2/User/editMobile1', //修改手机号码-第一步
  editMobile2: 'Mobile2/User/editMobile2', //修改手机号码-第二步
  sendCheckOldMobileCode: 'Mobile2/User/sendCheckOldMobileCode', //修改手机号码-第一步-发送动态码
  sendEditMobileCode: 'Mobile2/User/sendEditMobileCode', //修改手机号码-第二步-发送动态码
  updatePwd: 'Mobile2/User/updatePwd', //修改密码
  getNextRepay: 'Mobile2/User/get_next_repay', //下一个或上一个回款数据
  bankList: 'Mobile2/User/bank_list', //获取开户行列表
  userBanks: 'Mobile2/User/user_banks', //用户已绑定银行卡
  checkPwd: 'Mobile2/User/check_pwd', //检查密码
  isSetSqa: 'Mobile2/User/is_set_sqa', //安全保护问题: 检测是否设置过
  getSqaList: 'Mobile2/User/get_sqa_list', //安全保护问题: 问题列表
  setSqa: 'Mobile2/User/set_sqa', //安全保护问题: 设置
  setSqaCheck: 'Mobile2/User/set_sqa_check', //安全保护问题: 检测安保问题
  myTyjBonus: 'Mobile2/User/my_tyj_bonus', //体验金收益
  editUname: 'Mobile2/User/editUname'//用户名修改接口
}
//统计专用
let stats = {
  a1: 'Mobile2/Stats/a1', //新增用户（下载后首次打开客户端总数）
  a2: 'Mobile2/Stats/a2', //活跃用户（当天打开客户端总数）
  a3: 'Mobile2/Stats/a3'//累计用户（历史激活客户端总数）
}
//红包活动专区V2
let special = {
  getStats: 'Mobile2/Special/getStats',  //用户统计
  listSpecial: 'Mobile2/Special/listSpecial', //活动专区列表
  listDetail: 'Mobile2/Special/listDetail', //红包列表
  novice : 'Mobile2/Special/novice' //新手专区列表
}
//分享
let share = {
  getRandom: 'Mobile2/Share/getRandom', //获取随机分享内容
  getShareNews: 'Mobile2/Share/getNews', //获取公告分享内容
  qrCode: 'Mobile2/Share/qrCode', //显示二维码
  getInvite: 'Mobile2/Share/getInvite', //推荐分享
  shareSharkBonus: 'Mobile2/Share/shareSharkBonus', //红包摇一摇分享
  getShareBehavior: 'Mobile2/Share/getShareBehavior'//通用分享
}
//摇一摇
let shake = {
  invest: 'Mobile2/Shake/invest', //摇一摇理财
  investClear: 'Mobile2/Shake/invest_clear', //重置服务器端摇一摇计数器
  getSharkBonusNum: 'Mobile2/Shake/getSharkBonusNum'//摇一摇获取红包的数量, 和WEBVIEW的地址
}
//推荐好友
let recommend = {
  index: 'Mobile2/Recommend/index', //获取推荐消息
  recommendInvest: 'Mobile2/Invest/recommendInvest'
}
//推送
let pushMessage = {
  saveId: 'Mobile2/Push/saveId', //保存百度云生成的 user_id,  channel_id, 如果没有则添加，  有则更新
  delId: 'Mobile2/Push/delId', //删除绑定
  getPushMessage: 'Mobile2/Push/getPushMessage'//获取推送消息列表V4
}
//公开的API(不用登录)
let publicAPI = {
  verify: 'Mobile2/Public/verify', //验证码
  banner: 'Mobile2/Public/banner', //banner数据
  monthActivityBanner: 'Mobile2/Public/monthActivityBanner', //每月活动banner
  exceptionLog: 'Mobile2/Public/exceptionLog', //保存异常记录
  getNews: 'Mobile2/Public/getNews', //公告动态列表
  getNewsContent: 'Mobile2/Public/getNewsContent', //公告动态内容
  helpQuestion: 'Mobile2/Public/helpQuestion'//常见问题解答接口
}
//手机支付密码
let payPassword = {
  getPayUserBank: 'Mobile2/PayPassword/getUserBank',
  setPayPassword: 'Mobile2/PayPassword/setPassword', //设置/重置密码(通用)
  getPayMobileCode: 'Mobile2/PayPassword/getMobileCode', //获取手机动态码(通用)
  checkMobileCode: 'Mobile2/PayPassword/checkMobileCode', //验证手机动态码(通用)
  checkIdentity: 'Mobile2/PayPassword/checkIdentity', //实名信息校验
  checkBank: 'Mobile2/PayPassword/checkBank', //银行卡信息校验
  checkSQAPay: 'Mobile2/PayPassword/checkSQA', //安保问题校验
  checkPayPassword: 'Mobile2/PayPassword/checkPayPassword', //验证用户支付密码
  getUserSqa: 'Mobile2/PayPassword/getUserSqa'//获取用户设置的安保问题
}
//收支，  提现,  银行卡绑定
let payAccount = {
  getMyRechargeBankList: 'Mobile2/PayAccount/getMyBankLimitMoney',  //充值页面的我的银行卡列表
  rechargeSubmit: 'Mobile2/PayAccount/msubmit',  //充值
  callBackFinish: '/Mobile2/PayAccount/callBackFinish',  //充值结束查看是否到账
  bankCardCheck: 'Mobile2/PayAccount/bankCardCheck', //没有绑定易宝的 则验卡
  getLimitMoneyData: 'Mobile2/PayAccount/getLimitMoneyData',  //获取银行信息 限额
  toConfirmBank: 'Mobile2/PayAccount/toConfirmBank',  //验证银行
  bindBankCard: 'Mobile2/PayAccount/bindBankCard',  //银行卡验证页面 发送验证码
  confirmBindBankCard: 'Mobile2/PayAccount/confirmBindBankCard',  //确认绑卡
  getUserRechargeRecord: 'Mobile2/PayAccount/getUserRechargeRecord', //用户的充值历史记录 V2
  getUserRechargeDetail: 'Mobile2/PayAccount/getUserRechargeDetail', //用户的充值记录明细V2
  //提现
  getMyBindBanks: 'Mobile2/PayAccount/getMyBindBanks', //提现页获取绑定的银行卡列表
  getApplyCashout: 'Mobile2/PayAccount/getApplyCashout', //提现申请初始化页面统计
  applyCashout: 'Mobile2/PayAccount/applyCashout', //提现申请

  getSftCity: 'Mobile2/PayAccount/getSftCity', //获取盛付通的省份信息
  getSftCitysById: 'Mobile2/PayAccount/getSftCitysById', //根据盛付通省份id获取城市列表
  getBankListByKey: 'Mobile2/PayAccount/getBankListByKey', //根据银行、省市、关键词搜索支行列表


  getFundAccount: 'Mobile2/PayAccount/getFundAccount', //获取某个绑定的银行卡信息
  saveFundAccount: 'Mobile2/PayAccount/saveFundAccount', //增/改三方账户信息
  sendDelFundAuthCode: 'Mobile2/PayAccount/sendDelFundAuthCode', //手机认证-删除三方账户信息 认证动态码
  delFundAccount: 'Mobile2/PayAccount/delFundAccount', //解除/删除银行卡信息
  getMyRecordList: 'Mobile2/PayAccount/getMyRecordList', //收支记录
  getCashoutFee: 'Mobile2/PayAccount/getCashoutFee', //获取提现资金管理费
  cancelCashout: 'Mobile2/PayAccount/cancelCashout', //取消提现申请
  getMyCashoutList: 'Mobile2/PayAccount/getMyCashoutList', //提现申请记录
  getMyXianxiaList: 'Mobile2/PayAccount/getMyXianxiaList', //获取我的线下充值的列表
  paybanklist: 'Mobile2/PayAccount/paybanklist', //获取可以充值的银行参数
  getCashoutFundList: 'Mobile2/PayAccount/getCashoutFundList', //获取可以提现的银行卡和银行参数V4
  getCashoutFundAccountList: 'Mobile2/PayAccount/getCashoutFundAccountList', //获取可以提现的银行卡和银行参数(2015.12.08新，  app版本5.4.1)
  getBankFundList: 'Mobile2/PayAccount/getBankFundList', //获取可以充值的银行卡和银行参数V4
  mrechargePay2: 'Mobile2/PayAccount/mrechargePay2', //新充值的wap页面1
  fundRecordIndex: 'Mobile2/PayAccount/fundRecordIndex', //资金记录首页统计 V3

  getUserCashoutRecord: 'Mobile2/PayAccount/getUserCashoutRecord', //用户的提现申请记录 V2
  getUserCashoutDetail: 'Mobile2/PayAccount/getUserCashoutDetail', //用户的提现记录详情信息 V2
  addBank: 'Mobile2/PayAccount/addBank'//fzc
}
//流量包API(不用登录)忘记密码
let password = {
  setPassword: 'Mobile2/Password/setPassword', //重置密码(通用)
  getMobileCode: 'Mobile2/Password/getMobileCode', //获取手机动态码
  checkMobile: 'Mobile2/Password/checkMobile', //手机确认(第一步)
  checkIdentity: 'Mobile2/Password/checkIdentity', //实名信息校验
  checkBank: 'Mobile2/Password/checkBank', //银行卡信息校验
  checkSQA: 'Mobile2/Password/checkSQA', //安保问题校验
  getUserSqa: 'Mobile2/Password/getUserSqa'//获取用户设置的安保问题
}
//我的奖励
let myReward = {
  redCoupon: 'Mobile2/MyBonus/getMyBonus', //红包
  fullCoupon: 'Mobile2/MyCoupons/getMyCoupons', //满减券
  rateCoupon: 'Mobile2/MyCoupons/getMyRateCoupons'//加息券
}

let fastcash = {
  FastCashListCount : 'Mobile2/FastCash/FastCashListCount', //获取变现列表的数字统计
  FastCashList : 'Mobile2/FastCash/FastCashList' //变现列表
}

let ApiMap = Object.assign(test, auth, account, xinPartner, invest, userData, stats, special, share, shake, recommend, pushMessage, publicAPI, payPassword, payAccount, password, fastcash, myReward)

export default ApiMap

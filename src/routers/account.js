/**
 * 账户模块路由
 * @return {[type]} [description]
 */
export default {
  '/login': {
    name: 'login',
    component: function (resolve) {
      require(['./../views/account/login.vue'], resolve)
    }
  },
  '/register': {
    name: 'register',
    component: function (resolve) {
      require(['./../views/account/register.vue'], resolve)
    }
  },
  '/registerProtocol': {
    name: 'registerProtocol',
    component: function (resolve) {
      require(['./../views/account/registerProtocol.vue'], resolve)
    }
  },
  '/findpassword': {
    name: 'findpassword',
    component: function (resolve) {
      require(['./../views/account/findpassword.vue'], resolve)
    }
  },
  '/account': {
    name: 'account',
    component: function (resolve) {
      require(['./../views/account/account.vue'], resolve)
    }
  },
  '/usercenter': {
    name: 'usercenter',
    component: function (resolve) {
      require(['./../views/account/usercenter.vue'], resolve)
    }
  },
  '/accountnews': {
    name: 'accountnews',
    component: function (resolve) {
      require(['./../views/account/accountnews.vue'], resolve)
    }
  },
  '/setting': {
    name: 'setting',
    component: function (resolve) {
      require(['./../views/account/setting.vue'], resolve)
    }
  },
  '/setloginpwd': {
    name: 'setloginpwd',
    component: function (resolve) {
      require(['./../views/account/setloginpwd.vue'], resolve)
    }
  },
  '/setpaypwd/:set_type/:oldpassword': {
    name: 'setpaypwd',
    component: function (resolve) {
      require(['./../views/account/setpaypwd.vue'], resolve)
    }
  },
  '/paypassword': {
    name: 'paypassword',
    component: function (resolve) {
      require(['./../views/account/paypassword.vue'], resolve)
    }
  },
  '/modifypaypwd': {
    name: 'modifypaypwd',
    component: function (resolve) {
      require(['./../views/account/modifypaypwd.vue'], resolve)
    }
  },
  '/findpaypwdviasecurity': {
    name: 'findpaypwdviasecurity',
    component: function (resolve) {
      require(['./../views/account/findpaypwdviasecurity.vue'], resolve)
    }
  },
  '/findpaypwdviacard': {
    name: 'findpaypwdviacard',
    component: function (resolve) {
      require(['./../views/account/findpaypwdviacard.vue'], resolve)
    }
  },
  '/setsecurity': {
    name: 'setsecurity',
    component: function (resolve) {
      require(['./../views/account/setsecurity.vue'], resolve)
    }
  },
  '/selectsecurityproblem': {
    name: 'selectsecurityproblem',
    component: function (resolve) {
      require(['./../views/account/selectsecurityproblem.vue'], resolve)
    }
  },
  '/modifysecurity': {
    name: 'modifysecurity',
    component: function (resolve) {
      require(['./../views/account/modifysecurity.vue'], resolve)
    }
  },
  '/accountInformation': {
    name: 'accountInformation',
    component: function (resolve) {
      require(['./../views/account/accountInformation.vue'], resolve)
    }
  },
  '/currentPhone': {
    name: 'currentPhone',
    component: function (resolve) {
      require(['./../views/account/currentPhone.vue'], resolve)
    }
  },
  '/avatarSetting': {
    name: 'avatarSetting',
    component: function (resolve) {
      require(['./../views/account/avatarSetting.vue'], resolve)
    }
  },
  '/usernameSetting': {
    name: 'usernameSetting',
    component: function (resolve) {
      require(['./../views/account/usernameSetting.vue'], resolve)
    }
  },
  '/mailboxBinding': {
    name: 'mailboxBinding',
    component: function (resolve) {
      require(['./../views/account/mailboxBinding.vue'], resolve)
    }
  },
  '/newMobile': {
    name: 'newMobile',
    component: function (resolve) {
      require(['./../views/account/newMobile.vue'], resolve)
    }
  },
  '/mobileAuthentication': {
    name: 'mobileAuthentication',
    component: function (resolve) {
      require(['./../views/account/mobileAuthentication.vue'], resolve)
    }
  },

  // 我的奖励
  '/myRedEnvelope': {
    name: 'myRedEnvelope',
    component: function (resolve) {
      require(['./../views/account/myRedEnvelope.vue'], resolve)
    },
    subRoutes: {
      '/red': {
        // 当匹配到 /foo 时，这个组件会被渲染到 Foo 组件的 <router-view> 中。
        // 为了简便，这里使用了一个组件的定义
        component: function (resolve) {
          require(['./../views/account/redRulesList.vue'], resolve)
        }
      },
      // 其他子路由
      '/full': {
        // 当匹配到 /foo 时，这个组件会被渲染到 Foo 组件的 <router-view> 中。
        // 为了简便，这里使用了一个组件的定义
        component: function (resolve) {
          require(['./../views/account/fullCouponList.vue'], resolve)
        }
      },
      '/rate': {
        // 当匹配到 /foo 时，这个组件会被渲染到 Foo 组件的 <router-view> 中。
        // 为了简便，这里使用了一个组件的定义
        component: function (resolve) {
          require(['./../views/account/rateCouponList.vue'], resolve)
        }
      },
      '/fin': {
        // 当匹配到 /foo 时，这个组件会被渲染到 Foo 组件的 <router-view> 中。
        // 为了简便，这里使用了一个组件的定义
        component: function (resolve) {
          require(['./../views/account/financialManagement.vue'], resolve)
        }
      }
    }
  },
  '/redRules': {
    name: 'redRules',
    component: function (resolve) {
      require(['./../views/account/redRules.vue'], resolve)
    }
  },
  '/fullCouponRules': {
    name: 'fullCouponRules',
    component: function (resolve) {
      require(['./../views/account/fullCouponRules.vue'], resolve)
    }
  },
  '/rateCouponRules': {
    name: 'rateCouponRules',
    component: function (resolve) {
      require(['./../views/account/rateCouponRules.vue'], resolve)
    }
  },
  '/financialRules': {
    name: 'financialRules',
    component: function (resolve) {
      require(['./../views/account/financialRules.vue'], resolve)
    }
  },
  '/redRuleHistory': {
    name: 'redRuleHistory',
    component: function (resolve) {
      require(['./../views/account/redRuleHistory.vue'], resolve)
    }
  },
  '/fullCouponHistory': {
    name: 'fullCouponHistory',
    component: function (resolve) {
      require(['./../views/account/fullCouponHistory.vue'], resolve)
    }
  },
  '/rateCouponHistory': {
    name: 'rateCouponHistory',
    component: function (resolve) {
      require(['./../views/account/rateCouponHistory.vue'], resolve)
    }
  },
  '/investmentRecord': {
    name: 'investmentRecord',
    component: function (resolve) {
      require(['./../views/account/investmentRecord.vue'], resolve)
    }
  },
  '/acessRecord': {
    name: 'acessRecord',
    component: function (resolve) {
      require(['./../views/account/acessRecord.vue'], resolve)
    }
  },
  //企福鑫
  '/qiFuXin': {
    name: 'qiFuXin',
    component: function (resolve) {
      require(['./../views/account/qiFuXin.vue'], resolve)
    }
  },
  '/joinQiFuXin': {
    name: 'joinQiFuXin',
    component: function (resolve) {
      require(['./../views/account/joinQiFuXin.vue'], resolve)
    }
  },
  '/fundrecord': {
    name: 'fundrecord',
    component: function (resolve) {
      require(['./../views/account/fundrecord.vue'], resolve)
    }
  },
  '/cashrecord': {
    name: 'cashrecord',
    component: function (resolve) {
      require(['./../views/account/cashrecord.vue'], resolve)
    }
  },

  //账户余额
  '/accountBalance': {
    name: 'accountBalance',
    component: function (resolve) {
      require(['./../views/account/money/accountBalance.vue'], resolve)
    }
  },
  //添加银行卡
  '/addBank': {
    name: 'addBank',
    component: function (resolve) {
      require(['./../views/account/money/addBank.vue'], resolve)
    }
  },
  //选择银行卡
  '/selectBank': {
    name: 'selectBank',
    component: function (resolve) {
      require(['./../views/account/money/selectBank.vue'], resolve)
    }
  },
  //限额说明
  '/bankLimitList': {
    name: 'bankLimitList',
    component: function (resolve) {
      require(['./../views/account/money/bankLimitList.vue'], resolve)
    }
  },
  //银行卡绑定确认
  '/toConfirmBank': {
    name: 'toConfirmBank',
    component: function (resolve) {
      require(['./../views/account/money/toConfirmBank.vue'], resolve)
    }
  },
  //充值
  '/recharge': {
    name: 'recharge',
    component: function (resolve) {
      require(['./../views/account/money/recharge.vue'], resolve)
    }
  },
  //充值记录
  '/rechargeRecord': {
    name: 'rechargeRecord',
    component: function (resolve) {
      require(['./../views/account/money/rechargeRecord.vue'], resolve)
    }
  },
  //充值记录详情
  '/rechargeDetail/:id': {
    name: 'rechargeDetail',
    component: function (resolve) {
      require(['./../views/account/money/rechargeDetail.vue'], resolve)
    }
  },
  //提现记录
  '/withdrawRecord': {
    name: 'withdrawRecord',
    component: function (resolve) {
      require(['./../views/account/money/withdrawRecord.vue'], resolve)
    }
  },
  //提现记录详情
  '/withdrawDetail': {
    name: 'withdrawDetail',
    component: function (resolve) {
      require(['./../views/account/money/withdrawDetail.vue'], resolve)
    }
  },
  //提现
  '/withdraw': {
    name: 'withdraw',
    component: function (resolve) {
      require(['./../views/account/money/withdraw.vue'], resolve)
    }
  },
  //选择省份
  '/selectProvince': {
    name: 'selectProvince',
    component: function (resolve) {
      require(['./../views/account/money/selectProvince.vue'], resolve)
    }
  },
  //选择城市
  '/selectCity/:provinceId': {
    name: 'selectCity',
    component: function (resolve) {
      require(['./../views/account/money/selectCity.vue'], resolve)
    }
  },
  //选择支行
  '/selectSubBank/:provinceId/:cityId': {
    name: 'selectSubBank',
    component: function (resolve) {
      require(['./../views/account/money/selectSubBank.vue'], resolve)
    }
  },
  '/invite': {
    name: 'invite',
    component: function (resolve) {
      require(['./../views/account/invite.vue'], resolve)
    }
  },
  '/hotActivity': {
    name: 'hotActivity',
    component: function (resolve) {
      require(['./../views/account/hotActivity.vue'], resolve)
    }
  },
  '/newbieArea': {
    name: 'newbieArea',
    component: function (resolve) {
      require(['./../views/account/newbieArea.vue'], resolve)
    }
  },
  '/aboutMore': {
    name: 'aboutMore',
    component: function (resolve) {
      require(['./../views/account/aboutMore.vue'], resolve)
    }
  },
  '/infoCenter': {
    name: 'infoCenter',
    component: function (resolve) {
      require(['./../views/account/infoCenter.vue'], resolve)
    }
  },
  '/aboutXinhehui': {
    name: 'aboutXinhehui',
    component: function (resolve) {
      require(['./../views/account/aboutXinhehui.vue'], resolve)
    }
  },
  '/faq': {
    name: 'faq',
    component: function (resolve) {
      require(['./../views/account/faq.vue'], resolve)
    }
  }
}

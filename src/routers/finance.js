/**
 * 投资模块路由
 * @return {[type]} [description]
 */
export default {
  '/invest': {
    name: 'invest',
    component: function (resolve) {
      require(['./../views/finance/invest.vue'], resolve)
    }
  },
  '/invest/details/:prj_id': {
    name: 'investDetails',
    component: function (resolve) {
      require(['./../views/finance/details.vue'], resolve)
    }
  },
  '/invest/info/:prj_id': {
    name: 'investInfo',
    component: function (resolve) {
      require(['./../views/finance/investInfo.vue'], resolve)
    }
  },
  '/invest/calculator/:prj_id':{
    name: 'investCalculator',
    component: function (resolve) {
      require(['./../views/finance/calculator.vue'], resolve)
    }
  },
  '/invest/deepDetails/:prj_id': {
    name: 'investDeepDetails',
    component: function (resolve) {
      require(['./../views/finance/deepDetails.vue'], resolve)
    }
  },
  '/invest/tickets':{
    name: 'investTickets',
    component: function (resolve) {
      require(['./../views/finance/tickets.vue'], resolve)
    }
  },
  '/invest/protocol':{
    name: 'investProtocol',
    component: function (resolve) {
      require(['./../views/finance/protocol.vue'], resolve)
    }
  },
  '/invest/result':{
    name: 'invesRresult',
    component: function (resolve) {
      require(['./../views/finance/result.vue'], resolve)
    }
  },
  '/invest/review/:prj_id':{
    name: 'invesReview',
    component: function (resolve) {
      require(['./../views/finance/review.vue'], resolve)
    }
  },
  // 理财记录
  '/record/:index': {
    name: 'investRecord',
    component: function (resolve) {
      require(['./../views/finance/record.vue'], resolve)
    }
  },
  // 还款列表
  '/record/repayment/:order_id': {
    name: 'repaymentRecord',
    component: function (resolve) {
      require(['./../views/finance/repayment.vue'], resolve)
    }
  },
  // 查看合同
  '/record/contract/:id':{
    name: 'contractRecord',
    component: function (resolve) {
      require(['./../views/finance/contract.vue'], resolve)
    }
  },
  // 已流标
  '/record/failedbid':{
    name: 'failedbidRecord',
    component: function (resolve) {
      require(['./../views/finance/failedbid.vue'], resolve)
    }
  }
}

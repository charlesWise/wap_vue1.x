/**
 * 充值提现模块路由
 * @return {[type]} [description]
 */
export default {
  '/ui': {
    name: 'ui',
    component: function (resolve) {
      require(['./../views/payAccount/ui.vue'], resolve)
    }
  }
}

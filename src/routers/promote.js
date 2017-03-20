/**
 * 活动及介绍性模块路由
 * @return {[type]} [description]
 */
export default {
  '/input': {
    name: 'input',
    component: function (resolve) {
      require(['./../views/promote/input.vue'], resolve)
    }
  }
}

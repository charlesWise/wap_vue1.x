'use strict'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueTouch from 'vue-touch'
import { functions } from './utils/functions'
import Conf from './constants/config'
import Base from './constants/base'
import localStorageCtrl from './controllers/localStorageCtrl'
import prototype from './constants/prototype'
import gApi from './services/gApi'
import scrollDirective from './directive/iscroll'

import routerMap from './routers/routers'

import App from './App'

// 注册s双击事件，点titlebar返回顶部用到
VueTouch.registerCustomEvent('doubletap', {
  type: 'tap',
  taps: 2
})

if (process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true
}
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueTouch)
Vue.use(prototype)
Vue.use(scrollDirective);
// Vue.mixin(Base)

Vue.http.options.emulateJSON = true

//Vue.http.options.xhr = {withCredentials: true}

let router = new VueRouter({
  transitionOnLoad: true,
  linkActiveClass: 'active'
})

localStorageCtrl.init()

routerMap(router)

function closePop() {
  ['loading', 'alert', 'toast'].forEach(function(item) {
    Conf[item].show = false;
  })
}

// 开始跳转
router.beforeEach(function (transition) {
  let name = transition.to.name
  if (functions.isShowFooter(name)) {
    functions.showFooter()
  } else {
    functions.hideFooter()
  }
  window.scrollTo(0, 0)
  localStorageCtrl.refresh();
  closePop();

  if (name === 'login') {
    gApi('isLogin', {
      resolve: function (json) {
        if (json.boolen == 1) {
          transition.redirect(Conf.url.account)
        } else {
          transition.next()
        }
      }
    })
  } else {
    transition.next()
  }
})

router.start(App, '#app')


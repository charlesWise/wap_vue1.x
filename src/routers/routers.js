/**
 * Created by xuxin on 16/3/21.
 */
import Account from './account.js'
import Finance from './finance.js'
import PayAccount from './payAccount.js'
import Promote from './promote.js'

let defaultRouter = {
  '/': {
    name: 'home',
    component: function (resolve) {
      require(['./../views/index.vue'], resolve)
    }
  },
  '/:username': {
    component: {
      template: '<p>用户名是{{$route.params.username}}</p>'
    }
  },

  '/test': {
    name: 'test',
    component: function (resolve) {
      require(['./../views/test/index.vue'], resolve)
    },
    subRoutes: {
      '/nest': {
        name: 'nest',
        component: function (resolve) {
          require(['./../views/test/nest.vue'], resolve)
        }
      }
    },
    auth: true // 这里 auth 是一个自定义字段, 可在全局的钩子函数中进行身份验证
  },
  '*': {
    component: function (resolve) {
      require(['./../views/index.vue'], resolve)
    }
  },

  '/multipleForm': {
    component (resolve) {
      require(['./../views/test/multiForm/index'], resolve)
    }
  },
  '/address': {
    component (resolve) {
      require(['./../views/test/multiForm/address'], resolve)
    }
  },
  '/pullToRefresh': {
    component (resolve) {
      require(['./../views/test/pullToRefresh_normal'], resolve)
    }
  },
  '/upload': {
    component (resolve) {
      require(['./../views/test/upload'], resolve)
    }
  },
  '/static1': {
    component (resolve) {
      require(['./../views/test/static1'], resolve)
    }
  },
  '/static2': {
    component (resolve) {
      require(['./../views/test/static2'], resolve)
    }
  },

  '/xinPartner': {
    component (resolve) {
      require(['./../views/test/xinPartner'], resolve)
    }
  },
  
  // demo

  '/demo': {
    name: 'demo',
    component: function (resolve) {
      require(['./../views/test/demo/index.vue'], resolve)
    },
    // subRoutes: {
    //   '/nest': {
    //     name: 'nest',
    //     component: function (resolve) {
    //       require(['./../views/test/nest.vue'], resolve)
    //     }
    //   }
    // },
    auth: true // 这里 auth 是一个自定义字段, 可在全局的钩子函数中进行身份验证
  }
}

let routerMaps = Object.assign(defaultRouter, Account, Finance, PayAccount, Promote)

export default function (router) {
  router.map(routerMaps)
}

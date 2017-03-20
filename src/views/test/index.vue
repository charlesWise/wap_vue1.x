<template>
  <div class="main" v-el:main style="position: absolute;height: 100%;width:100%;left:0;">
    <div id="scroll">
      <div class="line">当前路径:{{$route.path}}</div>
      <tab>
        <tab-item :selected="$route.path === '/test'" v-link="{path: '/test', exact: true}">首页</tab-item>
        <tab-item :selected="$route.path === '/invest'" v-link="{path: '/invest'}">投资</tab-item>
        <tab-item :selected="$route.path === '/test/nest'" v-link="{path: '/test/nest'}">嵌套页面</tab-item>
        <tab-item :selected="$route.name === 'ui'" v-link="{name: 'ui'}">ui</tab-item>
        <tab-item :selected="$route.name === 'input'" v-link="{name: 'input'}">input</tab-item>
      </tab>

      <i class="account_blue"></i>

      <div style="margin: 20px 0;">
        <group>
          <cell title="route加载进页面时"></cell>
        </group>
        <div v-if="$loadingRouteData">Loading ...</div>
        <div v-if="!$loadingRouteData" style="word-break: break-all;">{{msg|json 4}}</div>
      </div>
      <div v-el="scroll" style="height: 800px;background-color: #888;"></div>


      <div>
        <group>
          <switch title="ActionSheet" :value.sync="as"></switch>
          <div title="alert" @click="openAlert">alert</div>
          <cell title="登陆" link="/login"></cell>
          <cell title="多步表单" link="/multipleForm"></cell>
          <cell title="下拉刷新" link="/pullToRefresh"></cell>
          <cell title="上传" link="/upload"></cell>
          <cell :title="type">
            <spinner :type="type" slot="value"></spinner>
          </cell>
        </group>
        <actionsheet :show.sync="as" :menus="asData" show-cancel></actionsheet>
      </div>

      <div>
        <group>
          <cell title="子路由"></cell>
        </group>
        <router-view></router-view>
      </div>

    </div>
  </div>
</template>
<style lang="sass">
  /*.weui_actionsheet{display: none;}*/
</style>
<script>
  import Api from '../../services/api'
  import Group from 'vux/components/group/'
  import Cell from 'vux/components/cell/'
  import Actionsheet from 'vux/components/actionsheet/'
  import Tab from 'vux/components/tab'
  import TabItem from 'vux/components/tab-item'
  import Switch from 'vux/components/switch/'
  import Alert from 'vux/components/alert'
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/button'
  import { functions, alert } from '../../utils/functions'
  import Vue from 'vue'
  import Spinner from '../../components/common/spinner/index.vue'
  import iScroll from 'iscroll'

  export default{
    data () {
      return {
        title: '测试主页面',
        as: false,
        asData: {
          menu1: '选项1',
          menu2: '选项2'
        },
        alertData: {
          show: false,
          message: ''
        },
        formObj: {},
        msg: '',
        type: 'ios'
      }
    },
    components: {
      Actionsheet,
      Switch,
      Group,
      Cell,
      Tab,
      TabItem,
      Alert,
      XInput,
      XButton,
      Spinner
    },
    created () {
      functions.setHeader(this.title)
    },
    ready () {
      new iScroll(this.$els.main, {tap: true, tap: true})
    },
    route: {
      //在激活阶段，data 切换钩子会在 activate 被断定（ resolved ）以及界面切换之前被调用
      data: function (transition) {
        function resolve (data) {
          this.msg = data
        }

        let options = {
          resolve: resolve
        }
        return Api.index.call(this, options)
      },
      //在激活阶段，当组件被创建而且将要切换进入的时候被调用
      activate: function (transition) {
        transition.next()
      },
      //在激活阶段，当一个组件将要被禁用和移除之时被调用
      deactivate: function (transition) {
        transition.next()
      }
    },

    events: {
      'menu-click': function (menu) {
        console.log('选择了' + menu)
      }
    },

    methods: {
      openAlert () {
        alert.show('哈哈')
      }
    }
  }
</script>

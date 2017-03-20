<template>
  <div class="base-view">
    <div class="main">
    <div class="photo">
      <div class="portrait" v-link="'usercenter'"><img :src="user.avatar" /></div>
      <div class="news" v-link="'accountnews'"><span class="account-news"></span><em v-if="tipsCount.msg > 0">{{tipsCount.msg}}+</em></div>
    </div>
    <main class="account-container">
      <div class="account-header">
        <div class="account-sum" v-link="{name: 'accountBalance'}">
          <p class="title">账户余额（元）</p>
          <p class="number">{{userInfo.top_amount_view|empty}}</p>
        </div>
        <div class="funds">
          <ul>
            <li><h2>{{userInfo.totalAccountView|empty}}</h2><p>账户净资产（元）</p></li>
            <li><h2>{{userInfo.money_invest|empty}}</h2><p>我的投资（元）</p></li>
          </ul>
        </div>
      </div>
      <aside class="record">
        <p>理财记录<span><a v-link="{name: 'investRecord', params:{index: 0}}">全部记录 ></a></span></p>
        <ul>
          <li v-link="{name: 'investRecord', params: {index: 1}}"><h3 class="icon-sale"><em v-show="tipsCount.ys>0">{{tipsCount.ys}}</em></h3><br />预售投资</li>
          <li v-link="{name: 'investRecord', params: {index: 2}}"><h3 class="icon-finish"><em v-if="tipsCount.investDone > 0">{{tipsCount.investDone}}</em></h3><br />投标完成</li>
          <li v-link="{name: 'investRecord', params: {index: 3}}"><h3 class="icon-wait"><em v-if="tipsCount.investWait > 0">{{tipsCount.investWait}}</em></h3><br />待还款</li>
          <li v-link="{name: 'investRecord', params: {index: 4}}"><h3 class="icon-end"><em v-if="tipsCount.repaymentDone > 0">{{tipsCount.repaymentDone}}</em></h3><br />还款结束</li>
        </ul>
      </aside>
      <section class="account-list">
        <ul>
          <cell v-for="item in category_list" :name="item.name" :link="item.link" :link_path="item.link_path"></cell>
        </ul>
      </section>
      <div class="security">
        <p>账户资金安全由人保财险全额承保<span class="icon-insure"></span></p>
      </div>
    </main>
  </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/button'
  import cell from '../../components/cell/cell.vue'
  import Api from '../../services/api'
  import userService from '../../services/userService'
  import { functions, alert as Alert } from '../../utils/functions'
  import viewMixin from '../../constants/viewMixin'

  export default {
    data () {
      return {
        user: userService.user,
        userInfo: {},
        tipsCount: {
          msg: 0,
          ys: 0,
          investDone: 0,
          investWait: 0,
          repaymentDone: 0
        },
        category_list:[
          {
            name: '鑫拍档',
            link: 'invest'
          },
          {
            name: '司马小鑫'
          },
          {
            name: '我的奖励',
            link_path: '/myRedEnvelope/red'
          },
          {
            name: '理财金',
            link: 'invest'
          },
          {
            name: '资金记录',
            link: 'fundrecord'
          },
          {
            name: '变现记录',
            link_path: '/cashrecord'
          },
          {
            name: '企福鑫',
            link: 'qiFuXin'//joinQiFuXin
          }
        ]
      }
    },
    mixins: [viewMixin],
    components: {
      XInput,
      XButton,
      cell
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        let options = {
          resolve: function (data) {
            if (data.boolen == 1) {
              let result = data.data
              this.userInfo = result
              userService.setAttr('accountBalance', this.userInfo.top_amount_view)
              this.tipsCount.msg = result && result.tip_num && result.tip_num.xiaoxi ? result.tip_num.xiaoxi : 0
              this.tipsCount.ys = parseInt(result['status_5']) || 0
              this.tipsCount.investDone = parseInt(result['status_2']) || 0
              this.tipsCount.investWait = parseInt(result['status_3']) || 0
              this.tipsCount.repaymentDone = parseInt(result['status_4']) || 0
            } else {}
          }
        }
        Api.userAccount.call(this, options)
      }
    }
  }
</script>

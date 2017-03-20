<template>
  <div class="base-view fixed-headbar">
    <title-bar title="还款列表"></title-bar>
    <section class="repayment" v-if="show">
      <template v-for="item in list">
        <h1>还款日期：{{item.repay_date}}</h1>
        <ul>
          <li class="title">{{repaymentPeriods(item.repay_periods)}}</li>
          <li><span>应收本金</span><em>{{item.principal}}元</em></li>
          <li><span>应收利息</span><em>{{item.yield}}元</em></li>
          <li><span>剩余本金</span><em>{{item.rest_principal}}元</em></li>
        </ul>
      </template>
    </section>
  </div>
</template>
<script>
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'

  export default{
    data () {
      return {
        show: false
      }
    },
    components: {
      TitleBar
    },
    ready: function() {
      var params = this.$route.params;
      Api.order_replay_plan.call(this, {
        resolve: function(d) {
          if(d.boolen){
            this.list = d.data.list;
          }
          this.show = true;
        },
        data: params
      })
    },
    methods: {
      repaymentPeriods: function (v) {
        var num = parseInt(v);
        return isNaN(num) ? v : '第'+num+'期还款';
      }
    }
  }
</script>

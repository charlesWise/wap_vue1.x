<template>
  <div class="main">
    <template v-if="show">
      <div class="detail-head">
        <div class="head"><a href="javascript:;" v-link="'/invest'" class="icon-goback"></a>项目详情</div>
        <div class="content">
          <dl>
            <dt><p class="white"><span>{{item.rate}}</span><em v-if="item.reward_money_rate">+{{item.reward_money_rate}}</em> %</p><p class="gray">预期年化收益率</p></dt>
            <dd><p class="white"><span>{{item.time_limit}}</span></p><p class="gray">期限项目</p></dd>
          </dl>
          <div class="total"><p>{{item.remaining_amount}}<span>/{{item.demand_amount}}</span></p><p class="small-font">剩余可投金额/融资规模</p></div>
        </div>
      </div>
      <div class="detail-center">
        <div class="wave-border"><wave-circle :ratio='item.schedule / 100' diameter="10"></wave-circle></div>
        <div class="person-setting">
          <section class="set-items">
            <ul>
              <li><em class="tit first">垫资贷</em> <em class="gray smallfs">{{item.prj_no}}</em><i v-if="item.is_newbie == 1" class="icon-new-norm"></i><span>{{item.prj_type_display}}</span></li>
              <li class="presell" v-if="item.bid_status == 1">
                <em class="tit">项目状态</em>
                <i v-if="item.is_pre_sale == 1 && item.rest_remaind_amount">预售投资</i>
                <i v-if="item.is_pre_sale == 1 && !item.rest_remaind_amount">预售结束</i>
                <i v-if="item.is_pre_sale == 0">{{item.status_display}}</i>
                <span v-if="item.start_bid_time_diff" class="pre-time"><time><count-down :timestamp='item.start_bid_time_diff' type="details"></count-down></time></span>
                </li>
              <li v-else class="presell"><em class="tit">项目状态</em><i></i><span class="pre-time">{{item.status_display}}</span></li>
              <li><em class="tit">即刻投资</em><span>收益自{{item.qixi_day}}起算</span></li>
              <li><em class="tit">还款日</em><span>{{item.repay_time}}</span></li>
              <li v-if="item.end_bid_time_diff && is_early != 1"><em class="tit">剩余投标时间</em><span><count-down  :timestamp='item.end_bid_time_diff'></count-down></span></li>
            </ul>
          </section>
        </div>
      </div>
      <div class="view-more">
        <section class="monitor-footer" v-touch:swipeup="goInvest" v-touch-options:swipeup="{threshold: 10 }">
          <p><span class="icon-upglide animate-next"></span></p>
          <h1>继续拖动，查看更多<p class="two-sides-line"><img src="../../assets/images/account/two-sides-line.png" alt="" /></p></h1>
        </section>
        <invest-btn :opts="btnData"></invest-btn>
      </div>
    </template>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import { functions } from '../../utils/functions'
  import Api from '../../services/api'
  import WaveCircle from '../../components/finance/WaveCircle.vue'
  import transferService from '../../services/transferService'
  import CountDown from '../../components/common/countdown'
  import investBtn from '../../components/finance/investBtn.vue'

  var stateMap = {
    1: '待开标',
    2: '投标中',
    3: '已满标',
    4: '待还款',
    5: '已还款结束',
    7: '截止投标',
    8: '还款中',
    99: '已流标',
  }

  export default{
    data () {
      return {
        show: false,
        item: {},
        btnData: {}
      }
    },
    created () {
      this.getDate();
    },
    ready () {
    },
    components: {
      WaveCircle,
      CountDown,
      investBtn
    },
    methods: {
      goInvest: function() {
        transferService.set('investBtn', this.btnData);
        this.$router.go({
          name: 'investInfo',
          params: this.$route.params
        })
      },
      // 获取详情页数据
      getDate: function() {
        var opts = {
          resolve: function(d) {
            if(d.boolen) {
              d = d.data;
              d.status_display = stateMap[d.bid_status];

              this.btnData = {
                // 待开标  且  不是预售标
                isStartWarn: d.bid_status == 1 && d.is_pre_sale != 1,
                // 预售投资 待开标 可预售标  没结束
                isPresell: d.bid_status == 1 && d.is_pre_sale == 1 && d.rest_remaind_amount,
                // 是否够投资
                is_balance_less: d.is_balance_less,
                rate: d.rate,
                time_limit: d.time_limit,
                reward_money_rate: d.reward_money_rate,
                is_biding: d.is_biding,
                // 投资按钮是否可点
                btnIsTrue: d.isStartWarn || d.isPresell || d.is_biding,
                prj_id: d.prj_id
              }
              this.item = d;
            }
           this.show = true;
          },
          data: this.$route.params
        }
        Api.pdetail.call(this, opts);
      }
    }
  }
</script>

<template>
  <div class="base-view fixed-headbar">
    <title-bar :index="parseInt(this.$route.params.index)" :navs="subNavs" title="理财记录"></title-bar>
    <pull-up v-if="showPupUp" :opts="pullOpts" inline-template>
      <section class="financial-record record-top">
        <article v-for="item in lists" class="record-list record-wrap">
          <h1><i class="refund-right"></i>还款日期：{{item.date_next_repayment}}</h1>
          <div class="sub-content">
            <h2><span class="type blue" :class="{orange: item.prj_type_display === '月益升', green:item.prj_type_display === '司马小鑫'}">{{item.prj_type_display}}</span><span class="title">{{item.prj_name}}<em>{{item.prj_no}}</em></span><!-- <span class="icon-sign">鑫</span> --></h2>
            <aside class="status">
              <ul>
                <li><h3>{{item.money}}</h3><p>投资金额(元)</p></li>
                <li><h3>{{item.incoming}}</h3><p>收益(元)</p></li>
                <li><h3>{{item.bid_status_display}}</h3><p>状态</p></li>
                <li><h3>{{item.date_deal}}</h3><p>成交时间</p></li>
              </ul>
            </aside>
            <!-- 预售中 -->
            <div class="schedule-btn" v-if="item.bid_status == 7"><p>生效后自动进入投标结束状态</p></div>
            <!-- 投标结束 -->
            <div class="schedule-btn" v-if="item.bid_status == 3"><p>暂未生成还款计划</p></div>
            <!-- 待还款 -->
            <div v-if="item.bid_status == 4" class="schedule-btn xin-btn">
              <a v-if="item.is_have_contract != 1" href="javascript:;" class="contract grey">查看合同</a>
              <a v-else v-link="{name: 'contractRecord', params:{id: item.order_id}}" class="contract">查看合同</a>
              <a v-link="{name: 'repaymentRecord', params:{order_id: item.order_id}}" class="repayment">还款列表</a></div>
            <!-- 已还款结 -->
            <div v-if="item.bid_status == 5" class="schedule-btn xin-btn">
              <a v-if="item.is_have_contract != 1" href="javascript:;" class="contract grey">查看合同</a>
              <a v-else v-link="{name: 'contractRecord', params:{id: item.order_id}}" class="contract">查看合同</a>
              <a v-link="{name: 'repaymentRecord', params:{order_id: item.order_id}}" class="repayment">还款列表</a>
            </div>

            <!-- 其它待定 -->
            <div v-if="item.bid_status != 5 && item.bid_status != 7 && item.bid_status != 3 && item.bid_status != 4" class="schedule-btn xin-btn"><p>先放着</p></div>
          </div>
        </article>
        <div nodata class="warm-prompt withdrawNo">
          <h3 class="without"></h3>
          <p>暂无投资记录<br>尝试购买项目，赚取收益吧</p>
          <div class="submit-button" v-link="{name:'invest'}"><input class="blue go-see" type="button" value="去投资"></div>
        </div>
        <p v-if="params.status == 2 && isLastPage" style="text-align:center;padding-top:30px;font-size:14px;">没有更多记录，<a v-link="{name: 'failedbidRecord'}">查看流标项目</a></p>  
      </section>
    </pull-up>
  </div>
</template>
<script>
  import TitleBar from '../../components/titlebar'
  import PullUp from '../../components/common/pullup'
  import transferData from '../../services/transferService'

  export default{
    data () {
      return {
       showPupUp: false,
       subNavs: [
        {
          title: '理财记录',
          status: 0
        },
        {
          title: '预售投资',
          status: 5
        },
        {
          title: '投标结束',
          status: 2
        },
        {
          title:'待还款',
          status: 3
        },
        {
          title:'已还款结束',
          status: 4
        }],
       pullOpts: {
        port: 'ilist',
        params: {
          p: 1,
          prj_type: 0,
          status: 0
        }
       }
      }
    },
    components: {
      TitleBar,
      PullUp
    },
    methods: {
    },
    events: {
      titleCallBack: function(item) {
        this.pullOpts.params.status = item.status;
        this.showPupUp = true;
      }
    }
  }
</script>

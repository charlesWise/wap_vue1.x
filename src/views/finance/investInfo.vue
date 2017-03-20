<template>
  <div class="fixed-headbar">
    <title-bar :navs="subNavs" title="项目信息"></title-bar>
    <section class="invest-type-tabs">
      <div class="tab-scroll">
        <ul>
          <li :class="{active: port == 'prjBaseInfo'}" @click="changeNav('prjBaseInfo')">项目信息</li>
          <li :class="{active: port == 'getGuarantor'}" @click="changeNav('getGuarantor')">安全保障</li>
          <li :class="{active: port == 'prj_replay_plan_new'}" @click="changeNav('prj_replay_plan_new')">还款计划</li>
          <li :class="{active: port == 'invest_history'}" @click="changeNav('invest_history')">投资记录</li>
          <li :class="{active: port == 'getPrjProcedure'}" @click="changeNav('getPrjProcedure')">项目进度</li>
        </ul>
      </div>
    </section>
    <section class="project-info f-base-info" v-if="isFinish">
      <div class="project-content" v-if="port == 'prjBaseInfo'">
        <ul>
          <li>
            <h1 v-if="item.baoli_tips">{{item.baoli_tips}}</h1>
            <p v-for="info in item.base_info"><span>{{info.k}}</span><em>{{info.v}}</em></p>
          </li>
          <li v-for="info in item.extension">
            <h1>{{info.k}}</h1>
            <dl v-for="con in info.v">
              <dt>{{con.k}}：</dt>
              <dd>{{con.v}}</dd>
            </dl>
          </li>
          <li v-if="item.cailiao" @click="goReview">
            <h1>合同原件</h1>
            <div class="contract-list">
              <p v-for="img in item.cailiao"><img alt="{{img.name}}" :src="img.small"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="project-content" v-if="port == 'getGuarantor'">
        <ul>
          <li v-if="item.risk_audit">
            <h1>风险审核</h1>
            <p class="xindun">{{item.risk_audit}}</p>
          </li>
          <li>
            <h1>担保措施</h1>
            <p v-for="info in item.guarantee_measure">{{info}}</p>
          </li>
          <li>
            <h1>资金安全</h1>
            <p>全流程专人跟进，专款专用。</p>
            <p>跟单业务人员编号 —— {{item.prj_manager_no}}</p>
          </li>
        </ul>
      </div>
      <section class="financial-record" v-if="port == 'prj_replay_plan_new'">
        <template v-for="info in item.list">
          <article class="record-list" v-for="con in info">
            <h1><i class="refund-right"></i>还款日期：{{con.repay_date}}</h1>
            <div class="sub-content invest-repayment">
              <h2>{{paseTimes(con.repay_periods)}}</h2>
              <aside class="interest">
                <ul>
                  <li><p>应收本金(元)</p><h3>{{con.principal}}</h3></li>
                  <li><p>应付利息(元)</p><h3>{{con.yield}}</h3></li>
                  <li><p>剩余本金(元)</p><h3>{{con.rest_principal}}</h3></li>
                </ul>
              </aside>
            </div>
          </article>
        </template>
        <div class="repayment-schedule-text">
          <p>1. 以下数据根据"投资金额4,000,000.00元,期限1天"计算,</p>
          <p>2. 您的收益以实际收益为准，预计还款日当天13:00之前到账</p>
          <p>3. 展期、提前还款后还款日、应收本息、应收利息会发生变化，请投资者关注平台公示信息。</p>
        </div>
      </section>
      <section class="invest-record-list" v-if="port == 'invest_history'">
        <pull-up :opts="pullOpts" inline-template>
          <div>
            <div class="stroke-count">
              <ul>
                <li><h3>{{allData.demand_amount}}</h3><p>融资规模</p></li>
                <li><h3>{{allData.remaining_amount}}万</h3><p>剩余可投金额</p></li>
                <li class="remove-border"><h3>{{allData.count_prjorder}}笔</h3><p>已投资共计</p></li>
              </ul>
            </div>
            <section class="set-items wipe-pt">
              <ul class="bidding">
                <li><p><span>投标人</span><span>金额(元)</span><span>时间</span></p></li>
                <li v-for="item in lists"><p><em><i class="icon-mobile"></i>{{item.mobile}}</em><em>{{item.money}}</em><em class="locate">{{item.ctime}}</em></p></li>
              </ul>
            </section>
          </div>
        </pull-up>
      </section>
      <div class="invest-record-list" v-if="port == 'getPrjProcedure'">
        <div class="invest-progress">
          <h3 class="tit info">项目操作由鑫合汇专业风控人员全程现场监控</h3>
          <div class="list">
            <dl v-for="info in item">
              <dt>{{parseProgress($key)}}</dt>
              <dd>
                <i class="icon-insure2"></i>
                <ul>
                  <li v-for="con in info">
                    <p>{{con.title}}</p>
                    <p class="time">{{con.time}}</p>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
          <p class="info">备注：因实际业务操作中，存在债权转让事项发生，将可能s导致部分项目资金动态时间先于项目募集时间。</p>
        </div>
      </div>
    </section>
    <invest-btn :opts="investBtn"></invest-btn>
  </div>
</template>
<style>
  .f-base-info .project-content dl{
    min-height:21px;
    display: -webkit-flex;
  }
  .f-base-info .project-content dl dt{
    width: auto;
    -webkit-flex: 1;
  }
  .f-base-info .project-content dl dd{
    width: auto;
  }
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  import PullUp from '../../components/common/pullup'
  import transferService from '../../services/transferService'
  import investBtn from '../../components/finance/investBtn.vue'

  var progressMap = {
    ready: '项目准备',
    begin: '项目募集',
    stream: '资金动态',
    end: '项目结束'
  }

  export default{
    data () {
      return {
        port: 'prjBaseInfo',
        isFinish: false,
        item: {},
        routeParams: this.$route.params,
        pullOpts: {},
        investBtn: transferService.get('investBtn')
      }
    },
    created () {
    },
    ready () {
      this.getData();
    },
    components: {
      TitleBar,
      PullUp,
      investBtn
    },
    methods: {
      // 合同图片浏览页
      goReview: function() {
        var pactPic = this.item.cailiao;
        var arr = [];
        pactPic.forEach(function(item) {
          var obj = {}
          obj.title = item.name;
          obj.url = item.big;
          arr.push(obj);
        });

        // 保存
        transferService.set('investPactPic', {
          len: arr.length,
          lists: arr,
          prj_id: this.routeParams.prj_id
        });

        this.$router.go({
          name: 'invesReview',
          params: this.routeParams
        })
      },
      changeNav: function(portName) {
        if(portName == this.port) return;
        this.port = portName;

        // 投资记录。这里用的是无限上拉，跟别的不一样
        if(portName == 'invest_history'){
          this.pullOpts = {
            port: 'invest_history',
            params: this.routeParams,
          }
        } else {
          this.getData();
        }
      },
      getData: function() {
        this.isFinish = false;
        var opts = {
          resolve: function(d) {
            if(d.boolen) {
              this.item = d.data;
            }
            this.isFinish = true;
          },
          data: this.routeParams
        }
        Api[this.port].call(this, opts);
      },
      paseTimes: function(str) {
        var num = parseInt(str);
        return isNaN(num) ? str : '第'+num+'期还款';
      },
      parseProgress: function(v) {
        return progressMap[v];
      }
    },
  }
</script>

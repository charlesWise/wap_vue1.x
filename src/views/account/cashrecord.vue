<template>
	<!-- 提现记录 -->
  <div>
	<title-bar title="变现记录"></title-bar>
  <pull-up :opts="pullOpts" inline-template>
  	<section class="financial-record record-top">
  		<article class="record-list"  v-for="item in lists">
        <h1><i class="refund-right"></i>{{item.status_str}}</h1>
        <div class="sub-content">
          <h2><span class="type green">速兑通</span><span class="title"><em>{{item.prj_name}}</em></span></h2>
          <aside class="status">
            <ul>
              <li><h3>{{item.rate}}</h3><p>预期年化收益率</p></li>
              <li><h3>{{item.curr_time_limit}}</h3><p>剩余期限</p></li>
              <li><h3>{{item.realcash_money}}</h3><p>实际变现金额（元）</p></li>
              <li><h3>{{item.fee_money}}</h3><p>手续费（元）</p></li>
            </ul>
          </aside>
          <div class="schedule-btn xin-btn"><a href="javascript:;" class="protocol">查看合同</a><a href="javascript:;" class="particular">还款列表</a></div>
        </div>
      </article>
  	</section>
  </pull-up>
</div>
</template>

<style lang="sass">

</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'
  import PullUp from '../../components/common/pullup'

  export default{
    data () {
      return {
        pullOpts: {
          port: 'FastCashList',
          params: {
            type: 3,
            page: 1
          }
        }
      }
    },
    components: {
    	TitleBar,
      PullUp
    }
  }
</script>

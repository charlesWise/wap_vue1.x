<template>
	<!-- 资金记录 -->
  <div>
	<title-bar  :navs="subNavs" title="全部"></title-bar>
  <pull-up :opts="pullOpts" inline-template>
	<section class="financial-record">
    	<article class="record-list" v-for="item in lists">
    		<h1><i class="refund-right"></i>{{item.status | statusToCatlog}}<time>{{item.ctime}}</time></h1>
	    	<div class="sub-content financial">
	    		<h2><i class="green">{{item.money_change.substr(0,1)}}</i>{{item.money_change.substr(1)}}</h2>
	    		<aside class="remark">
	    			<p>可用余额：<em>{{item.amount}}元</em></p>
	    			<p>备注：<em>{{item.remark}}</em></p>
	    		</aside>
	    		<div class="serial"><p>资金流水号：{{item.record_no}}</p></div>
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
      	subNavs: [
        {
          title: '全部',
          status: 0
        },
        {
          title: '充值',
          status: 1
        },
        {
          title: '投资',
          status: 2
        },
        {
          title: '回款',
          status: 3
        },
        {
          title:'提现',
          status: 4
        },
        {
          title:'奖励',
          status: 5
        },
        {
          title:'变现交易',
          status: 6
        }],
        pullOpts: {
          port: 'getMyRecordList',
          params: {
            p: 1,
            prj_type: 0,
            status: 0
          },
          parseAllData: function (res){
            res.data.count = res.data.list.count
            res.data.page = {}
            res.data.page.total_page = res.data.list.totalPages
            res.data.page.current_page = res.data.list.nowPage
            res.data.totalRows = res.data.list.totalRows
            res.data.html = res.data.list.html
            res.data.list = res.data.list.data
          }
        }
      }
    },
    components: {
      TitleBar,
      PullUp
    },
    events: {
      titleCallBack: function(item) {
        var opts = Object.assign(
              this.pullOpts,
              {
                params:{
                  status: item.status
                }
              }
            )
        this.pullOpts = opts;
      }
    }
  }
</script>

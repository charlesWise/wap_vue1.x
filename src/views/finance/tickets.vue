<template>
  <div class="base-view fixed-headbar">
    <title-bar title="选择奖励" rightlink='确定'></title-bar>
    <section class="select-reward">
      <dl v-for="item in lists" @click="select(item, $index)">
        <dt><a href="javascript:;"><em v-if="$index == selectIndex"></em></a><span><i v-if="item.amount">￥</i>{{item.amount || item.reward_name}}</span></dt>
        <dd>
          <h3>{{all.rewardTypeMap[item.reward_type].v}}<span v-if="item.isRecom">推荐</span></h3>
          <p><span v-if="item.reward_type == 2">{{item.reward_name}}</span><span v-if="item.reward_type == 3">预计奖励{{item.profit_jiaxi}}元</span></p>
          <p>{{item.expire_time}}过期</p>
        </dd>
      </dl>
    </section>
  </div>
</template>
<script>
  import TitleBar from '../../components/titlebar'
  import formService from '../../services/formService'
  var investForm = formService.getForm('investForm');
  var no_use = investForm.no_use;

  export default{
    data () {
      return {
        lists: investForm.tickets,
        all: investForm,
        selectIndex: investForm.tickedSelectIndex
      }
    },
    components: {
      TitleBar
    },
    ready: function() {
      
    },
    methods: {
      select: function(item, count) {
        // 点的是当前list则取消
        if(count === this.selectIndex) {
          item = no_use;
          this.selectIndex = investForm.tickedSelectIndex = -1;
        } else {
          this.selectIndex = investForm.tickedSelectIndex = count;
        }
        investForm.profit = item.profit;
        investForm.investMoney = investForm.money - (item.amount || 0);
        investForm.recomTicketDisplay = investForm.rewardTypeMap[item.reward_type].v;
      }
    },
    events: {
      // 点右上角 协议 触发
      'click-right-link': function() {
        window.history.back();
      }
    }
  }
</script>

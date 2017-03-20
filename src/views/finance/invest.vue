<template>
  <div class="main">
    <div class="invest-nav">
      <section class="tabs">
        <ul>
          <li :class="{'active': prjtype===1}" @click="changeNav(1)"><a href="javascript:;">日益升</a></li>
          <li :class="{'active': prjtype===6}" @click="changeNav(6)"><a href="javascript:;">年益升</a></li>
          <li :class="{'active': prjtype===8}" @click="changeNav(8)"><a href="javascript:;">速兑通</a></li>
        </ul>
      </section>
      <template v-if="prjtype == 8">
        <section class="search-area" :class="{ active: hasFocus }">
          <form @submit="formSubmit()">
            <div class="search-box">
              <i class="zoom"></i>
              <input @focus="addFocus()" type="text" v-model="searchVal" placeholder="{{placeholder}}" />
            </div>
            <a class="cancel" @click="cancel()" href="javascript:;">取消</a>
          </form>
        </section>
        <section class="sort-list">
          <ul>
            <li :class="{active: order == 1}" @click="sortNav(1)">发布</li>
            <li :class="{active: order == 2}" @click="sortNav(2)">利率</li>
            <li :class="{active: order == 4}" @click="sortNav(4)">额度</li>
            <li :class="{active: order == 3}" @click="sortNav(3)">期限<span v-if="rank == 'asc'">↑</span><span v-if="rank == 'desc'">↓</span></li>
          </ul>
        </section>
      </template>
    </div>
    <div role="IScroll" class="hasInvestBar" :class="{'hasInvestBar-big': prjtype == 8}">
      <div :class="{order: prjtype===8}"  v-el:main>
        <section v-if="prjtype !== 8" class="entry"><div class="title">司马小鑫预留入口</div></section>
        <pull-up api="plist" :params="pullParams">
          <section slot="list" class="investLists">
            <ul>
                <li v-for="item in lists" v-link="{name: 'investDetails',params: {prj_id: item.id}}">
                  <h2>{{item.prj_type_name}} {{item.time_limit}}{{item.time_limit_unit_view}}<span><em v-if="" class="red-xin">鑫</em><em v-if="" class="silver">银</em><em v-if="item.activity_id > 0" class="orange">活</em><em v-if="item.is_xzd == 1" class="clock"></em><em v-if="item.is_pre_sale == 1" class="green">预</em><i v-if="item.is_new == 1" class="new-client"></i></span></h2>
                  <dl>
                    <dd>
                      <h3><i>{{item.rate_view}}</i><span v-if="item.reward_money_rate">+{{item.reward_money_rate}}</span>%</h3>
                      <p>投资限额:<font>{{item.min_bid_amount_name}}+</font></p>
                      <p>剩余可投:<font>{{item.remaining_amount_view}}</font></p>
                    </dd>
                    <!-- 等待开标 -->
                    <template v-if="item.start_bid_time_diff > 0">
                      <dt class="waiting">
                        <div class="opening-bid">
                          <p class="time"><count-down :timestamp='item.start_bid_time_diff'></count-down></p>
                          <p class="btn"><em class="tips">开标提醒</em></p>
                        </div>
                      </dt>
                    </template>
                    <template v-else>
                      <!-- 开标中 -->
                      <template v-if="item.end_bid_time_diff > 0">
                        <dt class="ing">
                          <div class="opening-bid">
                            <p class="time"><count-down :timestamp='item.end_bid_time_diff'></count-down></p>
                            <wave-circle :ratio='item.schedule / 100' diameter="10"></wave-circle>
                          </div>
                        </dt>
                      </template>
                      <!-- 标结束 -->
                      <template v-else>
                        <dt>
                          <wave-circle :ratio='item.schedule / 100' diameter="10"></wave-circle>
                        </dt>
                      </template>
                    </template>
                  </dl>
                </li>
            </ul>
          </section>
        </pull-up>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import PullUp from '../../components/common/pullup2'
  import CountDown from '../../components/common/countdown'
  import WaveCircle from '../../components/finance/WaveCircle'
  import viewMixin from '../../constants/viewMixin'

  export default{
    mixins: [viewMixin],
    data () {
      return {
        title: '投资',
        prjtype: 1,
        rank: 'desc',
        searchVal: '', // 排序规则
        order: 1,
        showList: true,
        placeholder: '搜索',
        hasFocus: false,
        pullParams: {},
        lists: []
      }
    },
    beforeCompile () {
      this.resetOpts();
    },
    ready () {
    },
    watch: {
    },
    components: {
      PullUp,
      CountDown,
      WaveCircle
    },
    methods: {
      changeNav: function(n) {
        if(this.prjtype == n) return;
        this.prjtype = n;
        // 8时为速兑通
        if(n == 8) {
          this.cancel()
        } else {
         this.resetOpts();
        }
      },
      // 搜索框获取交点
      addFocus: function() {
        this.hasFocus = true;
        this.placeholder = '';
      },
      //取消搜索
      //取消速兑通所有的配置项
      cancel: function() {
        this.hasFocus = false;
        this.searchVal = '';
        this.placeholder = '搜索';
        this.order = 1; // 恢复默认
        this.rank = 'desc';

        // 总体搜索下
        this.resetOpts({
          order: 1,
        });
      },
      //提交数据
      formSubmit: function() {
        if(!this.hasFocus || !this.searchVal) return;
        this.resetOpts({
          prj_name: this.searchVal, // 查询关键字
          order: this.order
        });
      },
      // 排序 3:期限,有正返两种排序
      sortNav: function(n) {
        var obj = {}
        // 之前已经选中期限，这时开始切换排序方式
        if(n == 3 && this.order == 3) {
          this.rank = this.rank == 'desc' ? 'asc' : 'desc';
          obj.sort = this.rank;

        // 第二次点当前选中的项
        } else if(this.order == n) {
          return
        } else {
          this.rank = 'desc';
          this.order = n;
        }

        obj.prj_name = this.searchVal;
        obj.order = this.order;
        this.resetOpts(obj)
      },
      // 重置opts
      resetOpts: function(param) {
        this.lists = [];
        param = param || {};
        param.prjtype = this.prjtype;
        this.pullParams = param;
      }
    },
    events: {
      'pullup:completed': function (data) {
        this.lists = this.lists.concat(data)
      }
    }
  }
</script>

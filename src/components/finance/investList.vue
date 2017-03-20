<template>
  <x-scroll v-ref:scroll lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" :style="{height:scrollHeight+'px'}"  @pullup:loading="getList">
    <ul :style="{height: ulHeight}">
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
                  <p class="time"><count-down $on="countDownFinish" :timestamp='item.start_bid_time_diff'></count-down></p>
                  <p class="btn"><em class="tips">开标提醒</em></p>
                </div>
              </dt>
            </template>
            <template v-else>
              <!-- 开标中 -->
              <template v-if="item.end_bid_time_diff > 0">
                <dt class="ing">
                  <div class="opening-bid">
                    <p class="time"><count-down $on="countDownFinish" :timestamp='item.end_bid_time_diff'></count-down></p>
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
    <p class="no-data" v-if="isNoDate">暂无数据</p>
  </x-scroll>
</template>
<script>
  import Api from '../../services/api'
  import WaveCircle from '../../components/finance/WaveCircle.vue'
  import XScroll from 'vux/components/scroller'
  import { Dom } from '../../utils/dom'
  import CountDown from '../common/countdown'
  import transferService from '../../services/transferService'

  export default{
    props: {
      opts: Object
    },
    data () {
      return {
        title: '下拉刷新',
        lists: [],
        // 初始化高度为了去掉第一次时“上拉刷新"文字提示
        ulHeight: '1000px',
        pullupConfig2: {
          content: '上拉刷新',
          downContent: '上拉刷新',
          upContent: '释放刷新',
          loadingContent: '加载中'
        },
        scroll: true, // 是否正在请求aiax中
        isNoDate: false, // 每次ajax回调时查看是否有数据
        // 保证第一屏滚动条高度为整屏
        scrollHeight: 1000
      }
    },
    created () {
    },
    ready () {
      // created时footer之类的还没解析，取不到值
      this.scrollHeight = Dom.getElemAttr('html') - Dom.getElemAttr('footer') - Dom.getElemAttr('.investLists', 'offsetTop')
      
      // 取出scroller实例化后生成的uuid
      this.uuid = this.$refs.scroll.uuid;
      this.init()
    },
    components: {
      WaveCircle,
      XScroll,
      CountDown
    },
    events:{
      countDownFinish: function() {
        this.init();
      }
    },
    watch: {
      'opts': {
        handler: function () { this.init() },
        deep: true
      }
    },
    methods: {
      init: function () {
        this.lists = []
        this.port = this.opts.port
        this.scroll = true
        this.params = Object.assign({page_size: 10, p: 1}, this.opts)
        var self = this;

        this.settings = {
          resolve: function (d) {
            this.ulHeight = 'auto'
            this.lists = this.lists.concat(d.data.list)
            var totlaPage = d.data.total_page
            var curPage = d.data.current_page

            // 页码不对则什么也不作
            if(curPage !== this.params.p) return;
            // 还有下一页时触发这个事件
            var state = 'pullup:reset'

            if (totlaPage >= curPage + 1) {
              this.params.p = ++curPage
              this.scroll = true
            } else {
              // 上拉结束
              state = 'pullup:done'
            }
            if (!this.lists.length) {
              this.isNoDate = true
            }
            // 触发回调, 要有个时间间隔，保证完全加到页面里了
            setTimeout(function () {
              self.$broadcast(state, self.uuid)
            }, 100)
          },
          data: this.params
        }
        this.getList()
      },
      getList: function () {
        if (this.scroll) {
          this.isNoDate = false
          this.scroll = false
          Api[this.port].call(this, this.settings)
        }
      }
    }
  }
</script>

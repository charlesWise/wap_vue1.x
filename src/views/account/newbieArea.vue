<template>
  <div>
  	<title-bar title="新手专区"></title-bar>
    <section class="investLists new-invest">
      <ul>
        <li class="title">日益升</li>
        <li v-for="item in lists1" v-link="{name: 'investDetails',params: {prj_id: item.id}}">
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
        <li class="title">月益升</li>
        <li v-for="item in lists2" v-link="{name: 'investDetails',params: {prj_id: item.id}}">
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
  </div>
</template>

<style lang="sass">
  
</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'
  import WaveCircle from '../../components/finance/WaveCircle.vue'

  export default{
    data () {
      return {
        lists1: [],
        lists2: []
      }
    },
    components: {
      TitleBar,
      WaveCircle
    },
    attached () {
      this.fetchList()
    },
    methods: {
      fetchList: function () {
        let options = {
          data: {},
          resolve: (res)=>{
            this.lists1 = res.data.list['0']
            this.lists2 = res.data.list['1']
          }
        }
        Api.novice.call(this, options)
      }
    }
  }
</script>

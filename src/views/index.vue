<template>
  <div class="main">
    <div class="home-content" v-el:main style="height: 100%;">
      <swiper :list="list" auto></swiper>
      <aside class="more" v-link="'aboutMore'"><a href="javascript:;" class="icon-more" v-if="ok"><span></span></a></aside>

      <section class="guide">
        <ul>
          <li v-link="'hotActivity'"><span class="icon-activity"></span><h3>热门活动</h3></li>
          <li @click="jumpTo"><span class="icon-steward"></span><h3>司马小鑫<p><em>智能理财管家</em></p></h3></li>
          <li v-link="'invite'"><span class="icon-friends"></span><h3>邀请好友</h3></li>
        </ul>
      </section>
      <hgroup class="new-title" v-show="isNewbie">
        <ul>
          <li class="text" v-link="'newbieArea'"><h2>新手专区<em>1元尝新基</em></h2><p>新人首单优惠10%</p></li>
          <li class="solid-logo"><span><img src="../assets/images/index/solid-logo.jpg"></span></li>
        </ul>
      </hgroup>

      <section v-if="recommShow" class="income-area">
        <div class="income-top">
          <dl>
            <dt>
            <div class="content" v-link="{ name: 'investDetails', params: { prj_id: recomm[0].id }}">
              <h1>{{recomm[0].time_limit}}<span>{{recomm[0].time_limit_unit_view}}</span></h1>
              <p>收益{{recomm[0].rate_view}}%</p>
            </div>
            </dt>
            <dd>
              <div class="right-top" v-link="{ name: 'investDetails', params: { prj_id: recomm[3].id }}">
                <span class="icon-hot"></span>
                <div class="content">
                  <h1>{{recomm[3].time_limit}}<span>{{recomm[3].time_limit_unit_view}}</span></h1>
                  <p>收益{{recomm[3].rate_view}}%</p>
                </div>
              </div>
              <div class="right-bottom" v-link="{ name: 'investDetails', params: { prj_id: recomm[4].id }}">
                <div class="content">
                  <h1>{{recomm[4].time_limit}}<span>{{recomm[4].time_limit_unit_view}}</span></h1>
                  <p>收益{{recomm[4].rate_view}}%</p>
                </div>
              </div>
            </dd>
          </dl>
        </div>
        <div class="income-bottom">
          <ul>
            <li class="li-left" v-link="{ name: 'investDetails', params: { prj_id: recomm[2].id }}">
              <div class="content">
                <h1>{{recomm[2].time_limit}}<span>{{recomm[2].time_limit_unit_view}}</span></h1>
                <p>收益{{recomm[2].rate_view}}%</p>
              </div>
            </li>
            <li class="li-right" v-link="{ name: 'investDetails', params: { prj_id: recomm[3].id }}">
              <div class="content">
                <h1>{{recomm[1].time_limit}}<span>{{recomm[1].time_limit_unit_view}}</span></h1>
                <p>收益{{recomm[1].rate_view}}%</p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="sass">

</style>
<script>
  import Swiper from '../components/swiper/index.vue'
  import Api from '../services/api'
  import AppFooter from '../components/Footer.vue'

  import { functions } from '../utils/functions'
  import userService from '../services/userService'

  export default{
    data () {
      return {
        title: '首页',
        list: [],
        ok: false,
        recomm: [],
        recommShow:false,
        isNewbie: parseInt(userService.getAttr("is_newbie"))
      }
    },
    attached () {
      functions.setHeader(this.title)
      this.fetchBanner()
      this.fetchIntroduce()
    },
    ready () {
      this.$els.main.style.minHeight = document.documentElement.clientHeight + 'px'
    },
    components: {
      AppFooter,
      Swiper
    },
    methods: {
      jumpTo: function () {
        window.alert('Je ne veux pas travailler!')
      },
      fetchBanner: function () {
        function resolve (res) {
          this.list = []
          res.data.map(item => {
            if (item.img) {
              this.list.push({url: item.href, img: item.img.attach.url})
            }
          })
        }
        let options = {
          data: {type: 3},
          resolve: resolve
        }
        Api.banner.call(this, options)
      },
      fetchIntroduce: function () {
        function resolve (res) {
          if(res.boolen){
            this.recomm = res.data
            this.recommShow = true
          }
        }
        let options = {
          data: {},
          resolve: resolve
        }
        Api.recommendInvest.call(this, options)
      }
    }
  }
</script>

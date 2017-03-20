<template>
  <div>
    <title-bar title="资讯中心"></title-bar>
    <section class="news-tab">
      <ul>
        <li :class="{'active': pullOpts.params.news_type===1}" @click="changeNav(1)">平面公告</li>
        <li :class="{'active': pullOpts.params.news_type===2}" @click="changeNav(2)">最新动态</li>
        <li :class="{'active': pullOpts.params.news_type===3}" @click="changeNav(3)">媒体报道</li>
      </ul>
    </section>
    <section  :class="{'news-list':pullOpts.params.news_type===1, 'news-lists':pullOpts.params.news_type===2, 'media-list':pullOpts.params.news_type===3}">
      <pull-up :opts="pullOpts" inline-template>
       <ul><li v-for="item in lists">
          <dl><dt><img :src="item.thumb.url" alt="" /></dt><dd>
            <h3>{{item.title}}</h3><time>{{item.time_display}}</time><p>{{item.content}}</p>
          </dd></dl>
        </li></ul>
      </pull-up>
    </section>
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
          port: 'getNews',
          params: {
            p: 1,
            news_type: 1,
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
      changeNav: function(n){
        this.pullOpts.params.news_type = n;
      }
    },
    events: {
    }
  }
</script>

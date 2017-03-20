<!-- 更多 -->

<template>
  <div>
    <title-bar title="更多"></title-bar>
    <section class="set-items">
      <ul>
        <li><a href="javascript:;">鑫吧客<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <li v-link="'faq'"><a href="javascript:;">常见问题<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <li v-link="'infoCenter'"><a href="javascript:;">资讯中心<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <li v-link="'aboutXinhehui'"><a href="javascript:;">关于鑫合汇<span class="not-set"><i class="arrow-r"></i></span></span></a></li>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <li><a href="javascript:;">关于<span>V6.0.0</span></a></li>
      </ul>
    </section>
    <section class="monitor-footer">
      <h3>400-821-8616</h3>
      <p>周一至周五 09:00-21:00</p><p>双休\节假日 09:00-17:00</p>
      <h1>监督举报<p class="two-sides-line"><img src="../../assets/images/account/two-sides-line.png" alt="" /></p></h1>
    </section>
  </div>
</template>

<style lang="sass">
  
</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'

  export default{
    data () {
      return {
      }
    },
    components: {
      TitleBar
    },
    attached () {
    },
    methods: {
    }
  }
</script>

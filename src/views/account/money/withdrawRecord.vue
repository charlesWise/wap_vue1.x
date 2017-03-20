<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="提现记录"></title-bar>
      <section class="set-items">
        <div class="warm-prompt withdrawNo">
          <h3 class="without"></h3>
          <p>您还未进行过提现</p>
        </div>
      </section>

      <section class="set-items">
        <form action="">
          <ul>
            <li v-link="{name: 'withdrawDetail'}"><label class="label-width cur-pwd trace-log"><span class="log-text">￥20,000.00<br/><em>2016-02-02 15:47</em></span></label><span class="">成功 <i class="arrow-r"></i></span></span></li>
            <li><label class="label-width cur-pwd trace-log"><span class="log-text">￥20,000.00<br/><em>2016-02-02 15:47</em></span></label><span class="">失败 <i class="arrow-r"></i></span></span></li>
            <li><label class="label-width cur-pwd trace-log"><span class="log-text">￥20,000.00<br/><em>2016-02-02 15:47</em></span></label><span class="">成功 <i class="arrow-r"></i></span></span></li>
            <li><label class="label-width cur-pwd trace-log"><span class="log-text">￥20,000.00<br/><em>2016-02-02 15:47</em></span></label><span class="">失败 <i class="arrow-r"></i></span></span></li>
            <li><label class="label-width cur-pwd trace-log"><span class="log-text">￥20,000.00<br/><em>2016-02-02 15:47</em></span></label><span class="">成功 <i class="arrow-r"></i></span></span></li>
            <li><label class="label-width cur-pwd trace-log"><span class="log-text">￥20,000.00<br/><em>2016-02-02 15:47</em></span></label><span class="">失败 <i class="arrow-r"></i></span></span></li>
          </ul>
        </form>
      </section>
    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'

  export default {
    mixins: [viewMixin],
    components: {
      titleBar
    }
  }
</script>

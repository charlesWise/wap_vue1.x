<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="提现记录详情"></title-bar>
      <section class="set-items wipe-pt">
        <form action="">
          <ul>
            <li><label class="label-width record-left">申请时间</label><span class="input-width record-right" type="text">2015-12-14 09:46</span></li>
            <li><label class="label-width record-left">状态</label><span class="input-width record-right" type="text">成功</span></li>
            <li><label class="label-width record-left">提现金额(元)</label><span class="input-width record-right" type="text">20,000.00</span></li>
            <li><label class="label-width record-left">提现转账费用(元)</label><span class="input-width record-right" type="text">0.00</span></li>
            <li><label class="label-width record-left">手续费（元）</label><span class="input-width record-right" type="text">0.00</span></li>
            <li><label class="label-width record-left">提现银行信息</label><span class="input-width record-right" type="text">建设银行杭州余杭保健路支行</span></li>
            <li><label class="label-width record-left">处理时间</label><span class="input-width record-right" type="text">2015-12-14 09:46</span></li>
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

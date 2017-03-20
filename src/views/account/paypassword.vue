<template>
  <!-- 手机支付密码设置 -->
  <div class="person-setting">
    <title-bar title="支付密码"></title-bar>
    <section class="set-items">
      <ul>
        <cell name="修改支付密码" link="modifypaypwd"></cell>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <cell name="通过安全问题找回" link="findpaypwdviasecurity"></cell>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <cell name="通过动态码+已绑定银行卡找回" link="findpaypwdviacard"></cell>
      </ul>
    </section>
  </div>
</template>

<style lang="sass">

</style>

<script>
  import TitleBar from '../../components/titlebar'
  import cell from '../../components/cell/cell.vue'

  export default{
    data () {
      return {
      }
    },
    components: {
      TitleBar,
      cell
    },
    methods: {
      
    }
  }
</script>

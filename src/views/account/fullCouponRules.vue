<template>
  <!-- 满减券使用规则 -->
  <div class="person-setting">
    <title-bar title="满减券使用规则"></title-bar>
    <section class="rule">
      <p>1.投资项目时，必须满足指定的项目期限及投资金额，才可使用满减券。</p>
      <p>2.使用时直接充当投资金额（比如充值1990元即可用满2000-10元券，投资金额为2000元）。</p>
      <p>3.一次投资只可使用一张满减券。</p>
      <p>4.满减券不可与红包、加息券等其他奖励共同使用。</p>
      <p class="power">最终解释权归鑫合汇所有有</p>
    </section>
  </div>
</template>
<style>
</style>
<script>
  import TitleBar from '../../components/titlebar'
  export default{
    data(){
      return{
        title:'满减券使用规则'
      }
    },
    components:{
      TitleBar
    },
    methods: {

    }
  }
</script>

<template>
  <!-- 加息券使用规则 -->
  <div class="person-setting">
    <title-bar title="加息券使用规则"></title-bar>
    <section class="rule">
      <p>1.投资项目时，必须满足指定的项目期限才可使用加息券。</p>
      <p>2.使用后以“项目发布利率+加息券利率”计息，项目到期后返还加息券奖励。</p>
      <p>3.若投资项目后变现，则加息截止变现成功日当天。</p>
      <p>4.一次投资只可使用一张加息券。</p>
      <p>5.加息券可与项目奖励利率共同使用，不可与红包、满减券等其他奖励共同使用。</p>
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
        title:'加息券使用规则'
      }
    },
    components:{
      TitleBar
    },
    methods: {

    }
  }
</script>

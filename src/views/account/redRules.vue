<template>
  <!-- 红包使用规则 -->
    <div class="person-setting">
      <title-bar title="红包使用规则"></title-bar>
      <section class="rule">
        <p>1.每次投资可使用的红包金额为投资金额的一定比例（见使用比例），单个项目多次投资可多次使用，无使用上限。</p>
        <p>举例：如果你有20元使用比例1%的红包，投资金额为2000元，则使用红包金额为2000*1%，即20元，完成这笔投资只需扣除你账户余额1980元。</p>
        <p>2.“使用比例”相同的红包可叠加使用。</p>
        <p>3.红包不可与满减券、加息券等奖励共同使用。</p>
        <p>4.红包有效期见红包上的日期。</p>
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
          title:'红包使用规则'
      }
    },
    components:{
      TitleBar
    },
    methods: {

    }
  }
</script>

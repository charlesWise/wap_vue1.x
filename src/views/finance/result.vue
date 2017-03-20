<template>
  <div class="main fixed-headbar">
    <title-bar title="结果详情"></title-bar>
    <section class="result-details">
      <h3>点贷款<span>{{item.prj_no}}</span></h3>
      <ul>
        <li><span class="line blue"></span><i class="icon-succeed"></i><span>投资成功</span></li>
        <li><span class="line"></span><i class="icon-await"></i><span class="await">等待募集完成<br><em>等待其他出借人投资</em></span></li>
        <li><i class="icon-account"></i><span>还款到账</span></li>
      </ul>
    </section>
    <section>
      <div class="submit-button"><input @click="go('invest')" class="blue" type="button" value="继续投资"></div>
      <div class="submit-button view-log"><input @click="go('investRecord')" class="white" type="button" value="查看记录"></div>
    </section>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import formService from '../../services/formService'
  var investForm = formService.getForm('investForm');

  export default{
    data () {
      return {
        item: investForm
      }
    },
    created () {
    },
    ready () {
    },
    components: {
      TitleBar
    },
    methods: {
      go: function(target) {
        this.$router.go({
          name: target
        })
      }
    }
  }
</script>

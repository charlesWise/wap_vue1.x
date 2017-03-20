<template>
  <!-- 安全保护问题修改 -->
  <div class="person-setting">
    <title-bar title="安全保护问题修改"></title-bar>
    <!--第一步开始-->
    <section class="set-items">
      <div class="verify"><p class="big">安保问题：{{quest}}</p></div>
      <form action="">
        <ul>
          <q-input qtype="text" itemname="问题答案" holdertext="问题答案" :inputvalue.sync="sqaAnswer"></q-input>
        </ul>
        <div class="submit-button"><input class="blue" type="button" value="下一步" @click="checkSQA" /></div>
      </form>
      <tip :msg="tipMsg" :tip-show.sync="tipShow"></tip>
    </section>
    <!--第一步结束-->
    <!--第二步开始-->
    <!--
    <section class="set-items">
      <form action="">
        <ul>
          <li><a href="javascript:;">选择安保问题<span>></span></a></li>
          <li><label class="label-width cur-pwd">问题答案</label><input class="input-width cur-input" type="password" placeholder="问题答案"></li>
        </ul>
        <div class="submit-button"><input class="blue" type="button" value="提交" /></div>
      </form>
    </section>
    -->
    <!--第二步结束-->
  </div>
</template>

<style lang="sass">

</style>

<script>
  import TitleBar from '../../components/titlebar'
  import QInput from '../../components/QInput'
  import Tip from '../../components/tip'
  import Api from '../../services/api'
  export default{
    data () {
      return {
        quest: '',
        questid: '',
        sqaAnswer: '',
        tipShow: false,
        tipMsg: '答案有误'
      }
    },
    components: {
      TitleBar,
      QInput,
      Tip
    },
    attached () {
      function resolve (res) {
        this.quest = res.data.code_name;
        this.questid = res.data.code_no;
      }
      let options = {
        data: {},
        resolve: resolve
      }
      Api.getUserSqa.call(this, options)
    },
    methods: {
      checkSQA: function () {
        if(this.sqaAnswer){
          function resolve (res) {
            if(res.boolen == 1){
              this.$route.router.go('/setsecurity');
            }
            else{
              this.tipShow = true
              this.sqaAnswer=''
            }
          }
          let options = {
            data: {'sqa_key':this.questid,'sqa_value':this.sqaAnswer},
            resolve: resolve
          }
          Api.setSqaCheck.call(this, options)
        }
      }
    }
  }
</script>

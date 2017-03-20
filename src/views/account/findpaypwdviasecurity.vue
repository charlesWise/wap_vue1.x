<template>
  <!-- 通过安保问题找回支付密码 -->
  <div class="person-setting">
    <title-bar title="支付密码找回"></title-bar>
    <section class="set-items">
      <div class="verify"><p>请回答安全保护问题来校验身份</p><p class="big">{{quest}}</p></div>
      <form action="">
        <ul>
          <q-input qtype="text" itemname="问题答案" holdertext="问题答案" :inputvalue.sync="sqaAnswer"></q-input>
        </ul>
        <div class="submit-button"><input @click="checkSQA" class="blue" type="button" value="下一步" /></div>
      </form>
      <tip :msg="tipMsg" :tip-show.sync="tipShow"></tip>
    </section>
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
              //this.$route.router.go('/setpaypwd?set_type=sqa');
              this.$route.router.go({ name: 'setpaypwd', params: { set_type: 'sqa'}})
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
          Api.checkSQAPay.call(this, options)
        }
      }
    }
  }
</script>

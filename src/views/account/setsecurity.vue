<template>
  <!-- 安全保护问题设置 -->
  <div class="person-setting">
    <title-bar :title="title"></title-bar>

    <section v-if="donotselect" class="set-items">
      <form action="">
        <ul>
          <q-input itemname="支付密码" holdertext="支付密码" :inputvalue.sync="payPwd"></q-input>
          <li @click="selectsecurityproblem"><a href="javascript:;">选择安保问题<span><i class="arrow-r"></i></span></span></a></li>
          <q-input qtype="text" itemname="问题答案" holdertext="问题答案" :inputvalue.sync="sqaAnswer"></q-input>
        </ul>
        <div class="submit-button"><input class="blue" type="button" value="提交" @click="setSQA" /></div>
        <tip :msg="tipMsg" :tip-show.sync="tipShow"></tip>
      </form>
    </section>
    <!--问题选择-->
    <section v-else class="set-items">
      <ul>
        <li v-for="que in queList" @click="selectQue(que.code_no)">
          <a href="javascript:;">{{que.code_name}}
            <span v-if="questid == que.code_no" class="select-character"></span>
          </a>
        </li>
      </ul>
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
  import userService from '../../services/userService'
  export default{
    data () {
      return {
        title:'安全保护问题设置',
        payPwd:'',
        quest:'',
        sqaAnswer:'',
        tipShow: false,
        tipMsg: '',
        queList: null,
        questid: '1',
        donotselect: true
      }
    },
    components: {
      TitleBar,
      QInput,
      Tip
    },
    attached () {
      function resolve (res) {
        this.queList = res.data
      }
      let options = {
        data: {},
        resolve: resolve
      }
      Api.getSqaList.call(this, options)
    },
    methods: {
      selectsecurityproblem: function() {
        this.title = '问题选择'
        this.donotselect = false
      },
      selectQue: function (no) {
        this.questid = no
        setTimeout(() => {
          this.title = '安全保护问题设置'
          this.donotselect = true
        }, 1000);
        
      },
      setSQA: function () {
        if(this.sqaAnswer && this.payPwd){
          function resolve (res) {
            if(res.boolen == 1){
              this.tipMsg = '安保问题设置成功'
              this.tipShow = true
              userService.getAttr('is_set_sqa', true)
              setTimeout(()=>{this.$route.router.go('/setting')},1000);
            }
            else{
              this.tipMsg = '安保问题设置失败'
              this.tipShow = true
              this.payPwd = ''
              this.sqaAnswer=''
            }
          }
          let options = {
            data: {'sqa_key':this.questid,'sqa_value':this.sqaAnswer,'pay_password':this.payPwd},
            resolve: resolve
          }
          Api.setSqa.call(this, options)
        }
      }
    }
  }
</script>

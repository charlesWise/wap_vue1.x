<template>
  <!-- 登录密码修改 -->
  <div class="person-setting">
    <title-bar title="登录密码修改"></title-bar>
    <section class="set-items">
      <form action="登录密码修改">
        <ul>
          <q-input itemname="当前密码" holdertext="输入当前密码" type="text" :inputvalue.sync="curPassword"></q-input>
          <q-input itemname="新密码" holdertext="确认密码" :inputvalue.sync="pwd1"></q-input>
          <q-input itemname="确认密码" holdertext="再次填写确认" :inputvalue.sync="pwd2"></q-input>
        </ul>
        <div class="submit-button">
          <input class="blue" type="button" value="提交" @click="changeLoginPwd" />
        </div>
        <tip :msg="tipMsg" :tip-show.sync="tipShow"></tip>
      </form>
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
        formObj: {
          curPassword: '',
          pwd1: ''
        },
        curPassword: '',
        pwd1: '',
        pwd2: '',
        tipShow: false,
        tipMsg: ''
      }
    },
    components: {
      TitleBar,
      QInput,
      Tip
    },
    computed: {
      canSubmit () {
        for (let v in this.formObj) {
          if (this.formObj.hasOwnProperty(v)) {
            if (!this.formObj[v]) {
              return false
            }
          }
        }
        return true
      }
    },
    methods: {
      changeLoginPwd: function () {
        if(this.curPassword && this.pwd1 && this.pwd2){
          function resolve (res) {
            if(res.boolen == 1){
              this.tipMsg = '修改密码成功'
              this.tipShow = true
              setTimeout(()=>{this.$route.router.go('/setting')},1000);
            }
            else{
              this.tipMsg = '修改密码失败'
              this.tipShow = true
              this.curPassword=''
              this.pwd1=''
              this.pwd2=''
            }
          }
          let options = {
            data: {'oldPwd':this.curPassword,'pwd1':this.pwd1,'pwd2':this.pwd2},
            resolve: resolve
          }
          Api.updatePwd.call(this, options)
        }
      }
    }
  }
</script>

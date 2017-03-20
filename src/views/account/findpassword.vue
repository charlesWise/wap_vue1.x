<template>
  <div class="main">
    <section class="login-container">
      <title-bar :title="title" bg-color="black"></title-bar>
      <div class="login-form">
        <form action="">
          <!--安全校验-->
          <div v-if="step1">
            <div class="submit-btn"><input type="submit" value="向右滑动验证"  @click="toStep2" class="login-submit"></div>
          </div>
          <!--忘记密码-->
          <div v-if="step2">
            <y-input qtype="tel" holdertext="手机号" :inputvalue.sync="formObj.mobile"></y-input>
            <div class="input-box"><input type="text" placeholder="动态码" v-model="formObj.code" class="login-input"><dynamic-code></dynamic-code></div>
            <div class="submit-btn"><input type="submit" value="下一步"  @click="toStep3" class="login-submit"></div>
          </div>
          <!--登录密码设置-->
          <div v-if="step3">
            <y-input qtype="password" holdertext="登录密码" :inputvalue.sync="formObj.pwd1"></y-input>
            <y-input qtype="password" holdertext="确认登录密码" :inputvalue.sync="formObj.pwd2"></y-input>
            <div class="submit-btn"><input type="submit" value="提交"  @click="submit" class="login-submit"></div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>
<style lang="sass">
body {
  height:100%;
}
.main {
  height:100%;
}
.pwd-setting span {
  position:absolute;
  right:5%;
  top:0;
}
.register-free {
  float:left;
}
</style>
<script>
  import Api from '../../services/api'
  import { functions, alert as Alert } from '../../utils/functions'
  import userService from '../../services/userService'
  import Conf from '../../constants/config'
  import TitleBar from '../../components/titlebar'
  import DynamicCode from '../../components/finance/DynamicCode'
  import YInput from '../../components/YInput'

  const ACCOUNT_URL = Conf.url.account

  export default{
    data () {
      return {
        title: '安全校验',
        step1: true,
        step2: false,
        step3: false,
        formObj: {
          mobile: '',
          pwd1: '',
          pwd2: '',
          code: ''
        }
      }
    },
    created () {
    },
    components: {
      TitleBar,
      DynamicCode,
      YInput
    },
    methods: {
      toStep2: function () {
        //切换到下一步
        this.step1 = false
        this.step2 = true
        this.title = "忘记密码"
      },
      toStep3: function () {
        //切换到下一步
        this.step2 = false
        this.step3 = true
        this.title = "登录密码设置"
      },
      submit: function () {
        let options = {
          data: this.formObj,
          resolve: function (data) {
            userService.setUser(data.data)
            window.location.hash = Conf.redirectUrl ? Conf.redirectUrl : ACCOUNT_URL
          }
        }
        Api.register.call(this, options)
      }
    },
    events: {
      'click-dynamic-code': function(ctndown){
        //console.log("捕获点击获取动态吗事件");
        function resolve (res) {
          if(res.boolen == 1){
            ctndown();
          }
          else{
            //获取动态码失败
          }
        }
        let options = {
          //first,oldpasswd,sqa,bank
          data: this.formObj,
          resolve: resolve
        }
        //if(this.countTime === 0)
        Api.sendMobileAuthCode.call(this, options)
      }
    }
  }
</script>

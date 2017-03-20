<template>
  <div class="main">
    <section class="login-container">
      <title-bar :title="title" bg-color="black" rightlink="注册协议" :rightlinkshow="step2"></title-bar>
      <div class="login-form">
        <form action="">
        <div v-if="step1">
          <y-input qtype="tel" holdertext="手机号" :inputvalue.sync="formObj.mobile"></y-input>
          <!--<div class="submit-btn"><input type="submit" value="下一步"  @click="toStep2" class="login-submit"></div>-->
          <div class="right-hold" @click="toStep2" ><p><span>向右滑动验证</span><a class="drag-hand" href="javascript:;"><i class="icon-drag"></i></a></p></div>
        </div>
        <div v-if="step2">
          <div class="input-box"><input type="text" placeholder="动态码" v-model="formObj.code" class="login-input"><dynamic-code></dynamic-code></div>
          <y-input qtype="password" holdertext="登录密码" :inputvalue.sync="formObj.password"></y-input>
          <!--<y-input qtype="text" holdertext="邀请码" :inputvalue.sync="formObj.hongbaoCode"></y-input>-->

          <div class="input-box"  v-show="showInvite"><input type="tel"  placeholder="邀请码" class="login-input" v-model="formObj.hongbaoCode"><span class="verifiy-code"><a class="open" @click="changeInvite(false)" href="javascript:;">收起<i class="open-yzm"></i></a></span></div>

          <div class="invitation-code" v-show="!showInvite"><p><span  @click="changeInvite(true)">邀请码<i class="close-yzm"></i></span></p></div>

          <div class="submit-btn"><input type="submit" value="完成"  @click="submit" class="login-submit"></div>
          <div class="invitation-code"><p><input class="checkout-gouxuan" type="checkbox" v-model="agreeProtocol">同意注册协议</p></div>
        </div>
        </form>
        <div class="validation-wrong"><p class="assure">账户资金安全有人保财险全额承保</p></div>
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
        title: '注册',
        step1: true,
        step2: false,
        showInvite: false,
        agreeProtocol: true,
        formObj: {
          is_hand: false,
          mobile: '',
          password: '',
          hongbaoCode: ''
        }
      }
    },
    created () {
      functions.setHeader(this.title)
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
      },
      changeInvite: function(sta){
        this.showInvite = sta
      },
      submit: function () {
        let options = {
          data: this.formObj,
          resolve: function (data) {
            userService.setUser(data.data)
            window.location.hash = Conf.redirectUrl ? Conf.redirectUrl : ACCOUNT_URL
          }
        }
        if(this.agreeProtocol){
          Api.register.call(this, options)
        }
      }
    },
    events: {
      'click-dynamic-code': function(ctndown){
        console.log("捕获点击获取动态吗事件");
        //
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
        Api.getMobileCodeRegister.call(this, options)
      },
      'click-right-link': function(){
        this.$route.router.go('/registerProtocol');
      }
    }
  }
</script>

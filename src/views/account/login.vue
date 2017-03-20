<template>
  <div class="main">
    <section class="login-container">
      <div class="login-close"><i class="icon-close" @click="gotomain"></i></div>
      <div class="login-form">
        <form action="">
          <y-input qtype="text" holdertext="手机号" :inputvalue.sync="formObj.account"></y-input>
          <y-input qtype="password" holdertext="登录密码" :inputvalue.sync="formObj.password"></y-input>
          <div class="submit-btn"><input type="submit" value="登录"  @click="submit" class="login-submit"></div>
          <div class="forget-pwd right-cen"><span class="register-free" v-link="'register'">免费注册</span><span v-link="'findpassword'" class="fg-pwd">忘记密码</span></div>
        </form>
      </div>

      <tips :tip-show.sync="show" :msg="msg"></tips>
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
.register-free {
  float:left;
}
.fg-pwd{
  float: right;
}
</style>
<script>
  import Api from '../../services/api'
  import { functions, alert as Alert } from '../../utils/functions'
  import userService from '../../services/userService'
  import Conf from '../../constants/config'
  import YInput from '../../components/YInput'
  import tips from '../../components/tip/index.vue'

  const ACCOUNT_URL = Conf.url.account

  export default{
    data () {
      return {
        formObj: {
          account: '',
          password: '',
          is_hand: false
        },
        msg: '',
        show: false
      }
    },
    created () {
      functions.setHeader(this.title)
    },
    components: {
      YInput,
      tips
    },
    methods: {
      gotomain: function(){
        this.$route.router.go('/');
      },
      submit: function () {
        let options = {
          data: this.formObj,
          resolve: function (data) {
            if (data.boolen === 1) {
              userService.setUser(data.data)
              this.$router.go({name: Conf.redirectUrl ? Conf.redirectUrl : ACCOUNT_URL})
            }else{
              this.msg = data.message
              this.show = true
            }
//            window.location.hash = Conf.redirectUrl ? Conf.redirectUrl : ACCOUNT_URL
          }
        }
        Api.login.call(this, options)
      }
    }
  }
</script>

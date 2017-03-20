<template>
  <!-- 手机支付密码设置 -->
  <div class="person-setting">
    <title-bar title="手机支付密码设置"></title-bar>
    <!--第一步开始-->
    <section class="pay-pwd" v-show="step1">
      <p>请输入六位数字手机支付密码</p>
      <form action="">
        <six-password :input-pwd.sync="pwd"></six-password>
        <div class="submit-button"><input class="blue" type="button" value="确定" @click="step(2)" /></div>
      </form>
    </section>
    <!--第一步结束-->
    <!--第二步开始-->
    <section class="pay-pwd" v-show="step2">
      <p>确认支付密码</p>
      <form action="">
        <six-password :input-pwd.sync="pwd2"></six-password>
        <div class="submit-button"><input class="half reset-btn" type="button" value="重新设置" @click="step(1)" /><input class="half blue" type="button" value="确定" @click="setPayPwd" /></div>
      </form>
      <!--<div class="tips">支付密码设置成功</div>-->
    </section>
    <!--第二步结束-->
  </div>
</template>

<style lang="sass">

</style>

<script>
  import SixPassword from '../../components/finance/SixPassword'
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  import userService from '../../services/userService'
  export default{
    data () {
      return {
        pwd:'',
        pwd2:'',
        step1: true,
        step2: false,
        setType: '',
        oldpassword: '',
        testtxt: 'Bonsoir'
      }
    },
    attached () {
      //设置修改密码类型，可以有四种：first,sqa,bank,oldpassword
      this.setType = this.$route.params.set_type
      if(this.setType == 'oldpasswd') this.oldpassword = this.$route.params.oldpassword
    },
    components: {
      SixPassword,
      TitleBar
    },
    methods: {
      step: function (n) {
        console.log(this.pwd)
        if(n == 2){
          if(this.pwd.length == 6){
            this.step1 = false
            this.step2 = true
          }
        } else if (n == 1){
          this.step1 = true
          this.step2 = false
          this.pwd = ''
          this.pwd2 = ''
        }
      },
      setPayPwd: function () {
        function resolve (res) {
          if(res.boolen == 1){
            //修改用户信息
            userService.setAttr('is_paypwd_mobile_set', true)
            this.$route.router.go('/setting');
          }
          else{
            //this.tipShow = true
            this.pwd = ''
            this.pwd2 = ''
            this.step1 = true
            this.step2 = false
            console.log(this.step2)
          }
        }
        let options = {
          resolve: resolve
        }
        if(this.setType == 'oldpasswd'){
          options.data = {
            'set_type':this.setType,
            'password':this.pwd,
            'password_repeat':this.pwd2,
            'password_old':this.oldpassword
          }
        } else {
          options.data = {
            'set_type':this.setType,
            'password':this.pwd,
            'password_repeat':this.pwd2
          }
        }
        Api.setPayPassword.call(this, options)
      }
    }
  }
</script>

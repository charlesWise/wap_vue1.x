<template>
  <!-- 支付密码修改 -->
  <div class="person-setting">
    <title-bar title="修改支付密码"></title-bar>
    <section class="set-items">
      <form action="">
        <ul>
          <li><label class="label-width cur-pwd">当前支付密码</label><input class="input-width cur-input" type="password" placeholder="当前支付密码" v-model="payPwd"></li>
        </ul>
        <div class="submit-button"><input @click="verifyPayPwd" class="blue" type="button" value="下一步" /></div>
      </form>
      <tip msg="密码有误" :tip-show.sync="tipShow"></tip>
    </section>
  </div>
</template>

<style lang="sass">

</style>

<script>
  import TitleBar from '../../components/titlebar'
  import Tip from '../../components/tip'
  import Api from '../../services/api'
  import userService from '../../services/userService'
  
  export default{
    data () {
      return {
        uid: userService.getAttr('uid'),
        payPwd: '',
        tipShow: false
      }
    },
    components: {
      TitleBar,
      Tip
    },
    methods: {
      verifyPayPwd: function () {
        if(this.payPwd){
          function resolve (res) {
            if(res.boolen == 1){
              //this.$route.router.go('/setpaypwd?set_type=oldpassword&oldpassword=' + this.payPwd);
              this.$route.router.go({ name: 'setpaypwd', params: { set_type: 'oldpasswd', oldpassword: this.payPwd }})
            }
            else{
              this.tipShow = true
              this.payPwd=''
            }
          }
          let options = {
            data: {'uid':this.uid,'payPassword':this.payPwd},
            resolve: resolve
          }
          Api.checkPayPassword.call(this, options)
        }
      }
    }
  }
</script>

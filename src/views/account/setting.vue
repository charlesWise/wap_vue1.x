<template>
  <!-- 设置 -->
  <div class="person-setting">
    <title-bar title="设置"></title-bar>

    <section class="set-items">
      <ul>
        <cell link="setloginpwd" name="登录密码" span_val="已设置"></cell>
        <cell :link="payPwdPath" :link_params="setpayParams" name="支付密码" :span_val="payPwdSet"></cell>
        <cell :link="securityPath" name="安全保护问题" :span_val="securitySet"></cell>
      </ul>
    </section>
    <!--<section class="set-items">-->
      <!--<ul>-->
        <!--<li class="del-border"><a href="javascript:;">消息通知<span class="switch"><input class="weui_switch" type="checkbox" :disabled="disabled" v-model="notice"/></span></a></li>-->
      <!--</ul>-->
    <!--</section>-->
    <section class="set-items">
      <ul>
        <li class="del-border">
          <a href="javascript:;" class="big-font">使用支付密码充值
            <span class="switch">
              <input class="weui_switch" type="checkbox" v-model="usePayPwdToCharge"/>
            </span>
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
  import Cell from '../../components/cell/cell.vue'
  import Api from '../../services/api'
  import userService from '../../services/userService'

  export default{
    data () {
      return {
        paypwdset: userService.getAttr('is_paypwd_mobile_set'), //支付密码是否设置
        securityset: userService.getAttr('is_set_sqa'), //安保问题是否设置
        notice: false, //是否打开消息通知
        usePayPwdToCharge: userService.getAttr('is_passwd_recharge') //不知哪个参数？是否使用支付密码充值
      }
    },
    attached () {
      //alert(JSON.stringify(userService))
    },
    components: {
      TitleBar,
      Cell
    },
    methods: {
      fetchInfo: function(){
        function resolve (res) {
          this.securityset = res.boolen
        }
        let options = {
          data: {},
          resolve: resolve
        }
        Api.isSetSqa.call(this, options)
      }
    },
    computed: {
      payPwdPath:function () {
        if(this.paypwdset == 1) return 'paypassword'
        else return "setpaypwd"
      },
      setpayParams:function () {
        if(this.paypwdset == 1) return ''
        else return "{ set_type: 'first' }"
      },
      payPwdSet:function () {
        if(this.paypwdset == 1) return '已设置'
        else return "未设置"
      },
      securityPath:function () {
        if(this.securityset == 1) return 'modifysecurity'
        else return "setsecurity"
      },
      securitySet:function () {
        if(this.securityset == 1) return '已设置'
        else return "未设置"
      }
    }
  }
</script>

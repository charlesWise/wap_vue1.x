<template>
  <!-- 通过动态码和银行卡找回支付密码 -->
  <div class="person-setting">
    <title-bar title="支付密码找回"></title-bar>
    <section class="set-items">
      <form action="">
        <ul>
          <li @click="showPop"><a href="javascript:;">选择要验证的银行卡<span>></span></a></li>
          <li><label class="label-width">银行卡号</label><input class="input-width" placeholder="银行卡卡号" v-model="accountNo"></li>
          <li><label class="label-width">手机动态码</label><input class="input-width dynamic-code" placeholder="手机动态码" v-model="dyncode"><dynamic-code></dynamic-code></li>
        </ul>
        <div class="submit-button"><input :class="{'blue':isSatisfied}" type="button" value="下一步" @click="checkAccount" /></div>
      </form>
    </section>
    <div v-show="popshow" class="mask"></div>
    <div v-show="popshow" class="popup-bottom">
      <h3><span @click="hidePop" class="icon-close"></span>选择要验证的银行卡</h3>
      <ul>
        <li v-for="bank in bankList" @click="hidePop(bank.id)"><p>{{bank.bank_name}}（{{bank.bank_no_tail}}）</p></li>
      </ul>
    </div>
  </div>
</template>

<style lang="sass">

</style>

<script>
  import DynamicCode from '../../components/finance/DynamicCode'
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  export default{
    data () {
      return {
        bankList: null,
        selectedCardId: '',
        accountNo: '',
        dyncode: '',
        popshow: false,
        isSatisfied: false
      }
    },
    components: {
      DynamicCode,
      TitleBar
    },
    attached () {
      function resolve (res) {
        this.bankList = res.data
      }
      let options = {
        data: {},
        resolve: resolve
      }
      Api.getPayUserBank.call(this, options)
    },
    methods: {
      showPop: function(){
        this.popshow = true
      },
      hidePop: function(id){
        this.selectedCardId = id
        console.log(this.selectedCardId)
        this.popshow = false
      },
      checkAccount: function(){
        function resolve (res) {
          if(res.boolen){
            this.$route.router.go('/setpaypwd?set_type=bank');
          } else {
            //清空数据，提示错误
            this.dyncode = ''
          }
        }
        let options = {
          data: {"account_id":this.selectedCardId, "account_no":this.accountNo, "code": this.dyncode},
          resolve: resolve
        }
        Api.checkBank.call(this, options)
      }
    },
    events: {
      'click-dynamic-code': function(ctndown){
        console.log("捕获点击获取动态吗事件");
        ctndown();
        function resolve (res) {
          if(res.boolen == 1){
            //
          }
          else{
            //获取动态码失败
          }
        }
        let options = {
          //first,oldpasswd,sqa,bank
          data: {},
          resolve: resolve
        }
        if(this.countTime === 0)
        Api.getPayMobileCode.call(this, options)
      }
    },
    computed: {
      isSatisfied: function(){
        if(this.selectedCardId && this.accountNo && this.dyncode) return true;
        else return false;
      }
    }
  }
</script>

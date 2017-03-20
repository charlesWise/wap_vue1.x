<template>
  <div class="base-view">
    <div class="main">

      <title-bar title="充值" rightlink="充值记录"></title-bar>
      <form v-form-validate='formObj'>
        <section class="set-items">
          <ul>
            <li>
              <label class="label-width">账户余额</label>
              <em class="amount" type="text" >{{userInfo.accountBalance}}元</em>
            </li>
          </ul>
        </section>
        <section class="set-items wipe-pt">
          <div class="verify"><p>大额充值,请使用*****</p></div>
            <ul>
              <li>
                <label class="label-width">金额</label>
                <input class="input-width" type="number" placeholder="请输入充值金额" v-model="formObj.amount">
              </li>
              <li @click="bankSheetShow=true">
                <label class="label-width cur-pwd lable-bank">
                  <i class="bank-{{selectedBank.bank}}"></i>
                  <span class="bank-text">{{selectedBank.bank_name}}<br/><em>尾号{{selectedBank.account_no_short}}</em></span>
                </label>
                <span class="not-set">限额￥{{selectedBank.single_yun}} <i class="arrow-r"></i></span>
              </li>
            </ul>
          <div class="submit-button"><input  @click="submit" class="" type="button" value="确定" /></div>
        </section>

        <input type="hidden" name="pay_pwd"/>

      </form>

      <tip :msg="msg" :tip-show.sync="tipShow"></tip>
      <bank-sheet :show.sync="bankSheetShow" :menus="bankList"></bank-sheet>
      <password-sheet :show.sync="passwordShow"></password-sheet>
      <pop-box :show.sync="pop.show" :msg="pop.msg"></pop-box>
    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'
  import tip from '../../../components/tip'
  import bankSheet from '../../../components/actionsheet/bankSheet.vue'
  import popBox from '../../../components/popbox/index.vue'
  import passwordSheet from '../../../components/actionsheet/password.vue'
  import userService from '../../../services/userService'
  import Api from '../../../services/api'
  import { functions, alert as Alert } from '../../../utils/functions'
  import Conf from '../../../constants/config'
//  import formValidate from '../../../directive/formValidate'

  const SET_PAY_PASSWORD_FIRST = '请先设置支付密码'
  let {
      real_name,
      person_id,
      is_passwd_recharge,
      is_paypwd_mobile_set
    } = userService.user
  //is_passwd_recharge  为0要输密码  为1时不需输密码
  is_passwd_recharge = parseInt(is_passwd_recharge)
  is_paypwd_mobile_set = parseInt(is_paypwd_mobile_set)

  export default {
    data () {
      return {
        userInfo: userService.user,
        msg: '',
        tipShow: false,
        passwordShow: false,
        bankSheetShow: false,
        bankList: [],
        selectedBank: {},
        isCanSubmit: false,
        formObj: {},
        password: Number,
        device: this.$route.query.device,
        submiting: false,
        pop: {
          show: false,
          msg: ''
        }
      }
    },
    mixins: [viewMixin],
//    directives: {
//      formValidate: formValidate
//    },
    components: {
      titleBar,
      tip,
      bankSheet,
      passwordSheet,
      popBox
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        userService.getAccountBalance()

        Api.getMyRechargeBankList.call(this, {
          resolve: function (json) {
            if (json.boolen === 1) {
              this.bankList = json.data
              this.selectedBank = this.bankList[0]
            }
          }
        })
      },

      popToggle (show, msg) {
        this.pop.show = show
        this.pop.msg = msg
      },

      syncFormData () {
        this.formObj.pay_npndws = !is_passwd_recharge
        this.formObj.is_re = 1
        this.formObj.device = this.device
        this.formObj.realName = real_name
        this.formObj.personNo = person_id
        this.formObj.payType = this.selectedBank.channel
        this.formObj.bank_no_id = this.selectedBank.id
        this.formObj.bank = this.selectedBank.bank_name
        this.formObj.bank_code = this.selectedBank.bank
        this.formObj.bank_no = this.selectedBank.account_no

        if (is_passwd_recharge) {
          this.formObj['pay_pwd'] = this.password
        }

      },

      showPassword () {
        this.passwordShow = true
      },

      submit () {
        let self = this
        if (is_passwd_recharge && !is_paypwd_mobile_set) {
          this.popToggle(true, SET_PAY_PASSWORD_FIRST)
          setTimeout(function(){
            self.$router.go({name: Conf.url.account})
          }, 1000)
        } else if (is_passwd_recharge && is_paypwd_mobile_set) {
            //出现密码盘
            this.showPassword()
        } else {
          this.doSubmit()
        }
      },

      doSubmit () {
        this.syncFormData()
        this.popToggle(true, '处理中...');
        // 充值提交动作  连连、易联、易宝
        Api.rechargeSubmit.call(this, {
          method: 'post',
          data: this.formObj,
          resolve: function (json) {
            if (json.boolen == 1) {
              this.getMoneyStatus(this, json.ticket_no, function() {
                if(json['payType'] == 'yibaoApi' || json['payType'] == 'liandong'){ // 易宝Api
                  window.location.href = json['yibaoParam']['data']['url']
                } else if(json['payType'] == 'yibao'){ // 老易宝
                  window.location.href = json['urlParam']['gateway_url']
                } else if(json['payType'] == 'yilianH5'){ // 易联
                  // 跳转到易联H5se
                  window.location.href = json['urlParam']['gateway_url']
                } else if(json['payType'] == 'lianlian'){ // 连连
                  // 提交到连连
//                  submitForm({
//                    action: json['urlParam']['gateway_url'],
//                    params: json['urlParam']['req_data']
//                  });
                }
              })
            } else {
              this.popToggle();
              Alert.show(json['message'])
            }
          }
        })
      },

      getMoneyStatus (ctx, tickey_no, callBack) {
        window.setTimeout(callBackFinish, 0);

        function callBackFinish () {
          Api.callBackFinish.call(ctx, {
            data: {ticket_no: tickey_no},
            resolve: function (json) {
              if (json['boolen'] == 1) {
                if (json['state'] == 2) { // 轮询 处理中
                  window.setTimeout(callBackFinish, 5000)
                } else {
                  callBack()
                }
              } else {
                this.popToggle()
                Alert.show(json.message)
              }
            }
          })
        }
      },

      submitForm (options) {
//        function submitForm(options){
//          var $form = $("<form>");
//
//          $form.attr('id', 'dump_' + new Date().getTime());
//          $form.attr('action', options.action);
//          $form.attr('method', options.method || 'POST');
//
//          $form.append($('<input type="hidden" name="req_data"/>').val(JSON.stringify(options.params)));
//
//          $('body').append($form);
//          $form.css('display','none');
//          $form.submit();
//          $('body').remove($form);
//        };
      }


    },
    events: {
      'click-right-link': function () {
        this.$router.go({name: 'rechargeRecord'})
      },
      'bank-choose': function (menu) {
        this.selectedBank = this.bankList[menu]

        let bank = this.selectedBank
        let is_bankck = parseInt(bank.is_bankck)
        // 没有绑定易宝的 则验卡再跳到对应页面
        if(is_bankck != 1){
          Api.bankCardCheck.call(this, {
            data: {
              bank_code: bank.bank,
              card_no: bank.account_no
            },
            resolve: function (json) {
              let query = {
                card_no: bank.bank,
                bank_code: bank.account_no,
                bank_name: bank.bank_name,
                id: bank.id,
                addbank: 2,
                device: this.device
              }
              if (json.boolen == 1) {
                this.$router.go({
                  name: 'toConfirmBank',
                  query: query
                })
              } else {
                this.$router.go({
                  name: 'addBank',
                  query: query
                })
              }
            }
          })

          return true
        }
      },
      'password-done': function (pwd) {
        //验证密码是否正确,正确则确认充值,不正确提示错误
        this.password = pwd
        this.doSubmit()
      }
    }
  }
</script>

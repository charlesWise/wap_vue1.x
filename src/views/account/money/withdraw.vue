<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="提现" rightlink="提现记录"></title-bar>
      <section class="set-items">
        <ul>
          <li><label class="label-width">账户余额</label><small class="most" type="text" readonly>余额{{userInfo.accountBalance}}元</small></li>
        </ul>
      </section>

      <form v-form-validate='formObj'>
        <section class="set-items">
          <ul>
            <li>
              <label class="label-width">提现金额</label>
              <input class="input-width" type="number" v-model="formObj.money" placeholder="此次最多可提现{{withdraw.cashoutwable_amount}}元">
            </li>
          </ul>
        </section>
        <section class="set-items">
          <ul v-if="hasBank">
            <li @click="bankSheetShow=true">
              <label class="label-width cur-pwd lable-bank">
                <i class="bank-{{selectedBank.bank}}"></i>
                <span class="bank-text">{{selectedBank.bank_name}}<br/>
                  <em>尾号{{selectedBank.acount_name|last4}}</em>
                </span>
              </label>
              <!--<span class="not-set">限额￥10000 <i class="arrow-r"></i></span>-->
              </span>
            </li>
            <li v-if="!hasSubBank" v-link="{name: 'selectProvince'}">
              <label class="label-width">开户行</label>
              <small class="most" type="text">{{formObj.sub_bank ? formObj.sub_bank:'该卡首次提现需完善分支行信息'}}</small>
            </li>
          </ul>
          <div class="verify">
            <div class="withdraw">
              <p>已获得免手续费次数<em>{{withdraw.free_tixian_times}}次</em></p>
              <p>可免费提现金额<em>￥{{withdraw.free_money}}</em></p>
            </div>
          </div>
          <div v-if="!hasBank" class="submit-button" v-link="{name: 'addBank', query: {addFrom: 1}}"><input class="" type="button" value="绑定银行卡" /></div>
          <div v-else="hasBank" class="submit-button"><input @click="bankSheetShow=true" class="" type="button" value="确定" /></div>

          <div class="warm-prompt"><p>温馨提示:</p><p>充值后未用于投资的金额，提现将收取0.2%的提现转账费用（由第三方支付平台收取）</p></div>
        </section>
      </form>

      <bank-sheet :show.sync="bankSheetShow" :menus="bankList" title="选择提现方式"></bank-sheet>
      <password-sheet :show.sync="passwordShow"></password-sheet>

    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'
  import userService from '../../../services/userService'
  import bankSheet from '../../../components/actionsheet/bankSheet.vue'
  import passwordSheet from '../../../components/actionsheet/password.vue'
  import Api from '../../../services/api'
  import last4 from '../../../filters/last4'
  import transferService from '../../../services/transferService'
  import {alert as Alert} from '../../../utils/functions'

  export default {
    data () {
      return {
        userInfo: userService.user,
        bankList: [],
        selectedBank: {},
        bankSheetShow: false,
        withdraw: {},
        subBank: transferService.get('subBank'),
        formObj: {
          money: Number,
          use_reward_money: 1,
          bank: '',   //银行code
          bank_name: '',    //银行名
          out_account_id: '',  //银行账户id
          out_account_no: '',  //银行账户
          sub_bank: '',    //支行名字
          sub_bank_id: 0,  //支行id
//          bak: '',    //备注
//          verify_code: 0,  //手机端不需提交
          temp_pcode: 0,  //省份
          code: 0,  //城市
          free_times: 0      //可免费提现次数
//          payPwd: '',  //支付密码
        }
      }
    },
    computed: {
      hasBank: function () {
        return this.bankList.length > 0
      },
      hasSubBank: function () {
        return this.selectedBank.sub_bank_id !== "0"
      }
    },
    mixins: [viewMixin],
    filters: {
      last4
    },
    components: {
      titleBar,
      bankSheet,
      passwordSheet
    },
    created () {
      Api.getMyBindBanks.call(this, {
        resolve: function (json) {
          if (json.boolen == 1) {
            this.bankList = json.data
            if (this.bankList.length > 0) {
              this.selectedBank = this.bankList[0]
              this.syncForm()
            }
          }
        }
      })

      Api.getApplyCashout.call(this, {
        resolve: function (json) {
          if (json.boolen == 1) {
            this.withdraw = json.data
            this.formObj.free_times = this.withdraw.free_tixian_times
          }
        }
      })
    },
    methods: {
      syncForm () {
        this.formObj.bank = this.selectedBank.bank
        this.formObj.bank_name = this.selectedBank.bank_name
        this.formObj.out_account_no = this.selectedBank.acount_name
        this.formObj.out_account_id = this.selectedBank.id
        this.formObj.sub_bank = this.selectedBank.sub_bank||this.subBank.bank_name
        this.formObj.sub_bank_id = this.selectedBank.sub_bank_id||this.subBank.id
        this.formObj.temp_pcode = this.selectedBank.bank_province
        this.formObj.code = this.selectedBank.bank_city
      },
      applyCashout () {
        Api.applyCashout.call(this, {
          data: this.formObj,
          resolve: function (json) {
            if (json.boolen == 1) {
              Alert.show('提交申请成功')
              this.$router.go({
                name: 'account'
              })
            } else{
              Alert.show(json.message)
            }
          }
        })
      }
    },
    events: {
      'click-right-link': function () {
        this.$router.go({name: 'withdrawRecord'})
      },
      'goBack': function () {
        transferService.remove('subBank')
      },
      'password-done': function (pwd) {
          this.formObj.payPwd = pwd
      }
    }
  }
</script>

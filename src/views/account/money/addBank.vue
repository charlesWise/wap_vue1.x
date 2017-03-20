<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="绑定银行卡" rightlink="限额说明"></title-bar>
      <p class="deposit-card">充值仅支持储蓄卡</p>
      <section class="set-items">
        <form v-form-validate="formObj">
          <ul>
            <li @click="selectBank">
              <a href="javascript:;">{{bank.name}}
                <span><i class="arrow-r"></i></span>
              </a>
            </li>
            <li>
              <label class="label-width">银行卡卡号</label>
              <input class="input-width" type="text" placeholder="输入卡号" v-model="formObj.card_no">
            </li>
          </ul>
          <div class="submit-button" @click="toConfirm"><input class="blue" type="button" value="下一步" /></div>
        </form>
      </section>

      <pop-box :show.sync="pop.show" :msg="pop.msg"></pop-box>

    </div>
  </div>
</template>
<style lang="sass">
  /*.main{*/
    /*overflow: auto;*/
    /*-webkit-overflow-scrolling: touch;*/
  /*}*/
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar/index.vue'
  import popBox from '../../../components/popbox/index.vue'
  import {alert as Alert } from '../../../utils/functions'
  import transferService from '../../../services/transferService'
  import Api from '../../../services/api'

  const CHECKING = '验证中...'

  export default {
    data () {
      return {
        bank: {},
        formObj: {},
        pop: {
          show: false,
          msg: ''
        }
      }
    },
    mixins: [viewMixin],
    components: {
      titleBar,
      popBox
    },
    created () {
      let selectedBank = transferService.get('bank')
      let cardNo = transferService.get('cardNo')

      let params = {
        addbank: this.$route.query.addbank || 1,
        device: this.$route.query.device || 4,
        addFrom: this.$route.query.addFrom || 0,
        id: this.$route.query.id || 0,
        bank_code: this.$route.query.bank_code || '',
        card_no: cardNo || this.formObj.card_no || this.$route.query.card_no || ''
      }

      if (selectedBank) {
        this.bank = transferService.get('bank')
      } else {
        this.bank = {name: '选择银行'}
      }

      //优先选择 本地存储 的银行卡号
      params.bank_code = this.bank.myCode || params.bank_code
      this.formObj = Object.assign({}, params)

    },
    detached () {
      if (this.$route.query.card_no !== this.formObj.card_no) {
        transferService.set('cardNo', this.formObj.card_no)
      } else {
        transferService.remove('cardNo')
      }
    },
    events: {
      'click-right-link': function () {
        this.$router.go({name: 'bankLimitList'})
      }
    },
    methods: {
      popToggle (show, msg) {
        this.pop.show = show
        this.pop.msg = msg
      },
      selectBank () {
        let myCode = this.formObj.bank_code
        let query = myCode ? {myCode: myCode} : {}
        this.$router.go({
          name: 'selectBank',
          query: query
        })
      },
      toConfirm () {
        this.popToggle(true, CHECKING)
        Api.bankCardCheck.call(this, {
          data: this.formObj,
          resolve: function (json) {
            if(json.boolen == 1){
              this.$router.go({
                name: 'toConfirmBank',
                query: {
                  card_no: this.formObj.card_no,
                  bank_code: this.formObj.bank_code,
                  bank_name: this.bank.name,
                  id: this.formObj.id,
                  addbank: this.formObj.addbank,
                  device: this.formObj.device,
                  addFrom: this.formObj.addFrom
                }
              })
            } else {
              this.popToggle(false, '')
              Alert.show(json.message)
            }
          }
        })
      }
    },
    events: {
      'goBack': function () {
        transferService.remove('bank')
        transferService.remove('cardNo')
      }
    }

  }
</script>

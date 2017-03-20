<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="校验"></title-bar>
      <form v-form-validate="formObj">
        <section class="set-items">
          <ul>
            <li><label class="label-width">姓名</label><input class="input-width" type="text" placeholder="姓名" v-model="formObj.real_name"></li>
            <li><label class="label-width">身份证</label><input class="input-width" type="text" placeholder="身份证" v-model="formObj.person_id"></li>
          </ul>
        </section>
        <section class="set-items">
          <ul>
            <li>
              <label class="label-width">中国银行</label>
              <input class="input-width" type="text" placeholder="中国银行" value="尾号{{formObj.card_no|last4}}"readonly>
            </li>
          </ul>
        </section>
        <section class="set-items">
          <ul>
            <li>
              <label class="label-width">预留手机号</label>
              <input class="input-width cur-input" type="text" placeholder="银行预留手机号" v-model="formObj.mobile">
            </li>
            <li>
              <label class="label-width">动态码</label>
              <input class="input-width dynamic-code" type="text" placeholder="动态码" v-model="formObj.validate_code">
              <dynamic-code></dynamic-code>
              <!--<span><a class="get-code" href="javascript:;">点击获取</a></span>-->
            </li>
          </ul>
          <div class="submit-button" @click="confirmBindBankCard"><input class="blue" type="button" value="提交" /></div>
        </section>
      </form>
      <pop-box></pop-box>
    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'
  import popBox from '../../../components/popbox/index.vue'
  import dynamicCode from '../../../components/finance/DynamicCode.vue'
  import Api from '../../../services/api'
  import transferService from '../../../services/transferService'
  import userService from '../../../services/userService'
  import {alert as Alert} from '../../../utils/functions'
  import last4 from '../../../filters/last4'

  const PROCESSING = '处理中'
  const REALNAMEAUTHING = '实名认证中...'

  let {
      real_name,
      person_id,
      is_id_auth
    } = userService.user

  is_id_auth = !is_id_auth ? 0 : parseInt(is_id_auth)

  export default {
    data () {
      return {
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
      popBox,
      dynamicCode
    },
    filters: {
      last4
    },
    created () {
      this.formObj = {
        addbank: this.$route.query.addbank || 1,
        id: this.$route.query.id || 0,
        card_no: this.$route.query.card_no || '',
        bank_code: this.$route.query.bank_code || '',
        bank_name: this.$route.query.bank_name || '',
        person_id: person_id || '',
        real_name: real_name || '',
        is_id_auth: is_id_auth,
        requestid: ''
      }
    },
    events: {
      'click-dynamic-code': function (countdown) {
        let params = this.getBindParams()
        if (!params) {
          return false
        }

        if(is_id_auth === 1){ // 已实名认证
          this.popToggle(true, PROCESSING);
        } else { // 用户未实名验证
          this.popToggle(true, REALNAMEAUTHING);
        }

        Api.bindBankCard.call(this, {
          data: params,
          resolve: function (json) {
            if(json.boolen == 1){ // 绑卡成功
              if(json.data){
                // 把办卡成功的requestid存到隐藏input
                this.formObj.requestid = json['data']['requestid'];
                is_id_auth = 1

                //同步本地的用户信息
                let user = userService.user
                user.is_id_auth = is_id_auth
                user.person_id = this.formObj.person_id
                user.real_name = this.formObj.real_name
                userService.setUser(user)
              }
              countdown(); // 倒计时
            } else {
              this.popToggle(false); // 隐藏处理中
              Alert.show(json.message);
            }
          }
        })
      }
    },
    methods: {
      popToggle (show, msg) {
        this.pop.show = show || false
        this.pop.msg = msg || ''
      },

      getBindParams () {
        let {
            card_no,
            person_id,
            real_name,
            mobile,
            device,
            addbank,
            id
          } = this.formObj

        if (!real_name) {
          Alert.show('银行卡号必填')
          return false
        }
        if (!person_id) {
          Alert.show('身份证号必填')
          return false
        }
        if (!card_no) {
          Alert.show('银行卡号必填')
          return false
        }
        if (!mobile) {
          Alert.show('手机号码必填')
          return false
        }
        var params = {
          card_no: card_no,
          person_id: person_id,
          real_name: real_name,
          mobile: mobile,
          device: device,
          addbank: addbank
        }
        if(id){
          params['id'] = id;
        }
        return params
      },

      confirmBindBankCard () {
        this.popToggle(true, PROCESSING)
        Api.confirmBindBankCard.call(this, {
          data: this.formObj,
          resolve: function (json) {
            if(json.boolen == 1){
              if(this.formObj.addFrom == 0){
                transferService.remove('bank')
                transferService.remove('cardNo')
                this.$router.go({name: 'recharge'})
              }else{
                //跳到提现页面, 注意区分wap和app
//              goTarget()
              }
            } else {
              this.popToggle()
              Alert.show(true,json.message);
            }
          }
        })
      }

    }

  }
</script>

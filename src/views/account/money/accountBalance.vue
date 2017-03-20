<template>
  <div class="base-view">
    <div class="main">

      <title-bar title="账户余额"></title-bar>
      <section class="remain-money">
        <h3>账户余额</h3>
        <p>{{userInfo.accountBalance}}<span>元</span></p>
      </section>
      <div class="submit-button" @click="goRecharge"><input class="blue" type="button" value="充值" /></div>
      <div class="submit-button" v-link="{name: 'withdraw'}"><input class="withdraw-btn" type="button" value="提现" /></div>

    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'
  import Api from '../../../services/api'
  import userService from '../../../services/userService'

  //将信息存在userservice中,userservice来同步信息
  export default {
    data () {
      return {
        userInfo: userService.user
      }
    },
    mixins: [viewMixin],
    components: {
      titleBar
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        userService.getAccountBalance()
      },
      goRecharge () {
        let hasBinding = parseInt(this.userInfo.is_binding_bank)
        this.$router.go({
          name: hasBinding? 'recharge' : 'addBank'
        })
      }
    }
  }
</script>

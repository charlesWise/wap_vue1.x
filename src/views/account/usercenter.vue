<template>
  <div class="person-setting">
    <!-- 用户中心 -->
    <title-bar title="用户中心"></title-bar>
    <section class="set-items">
      <ul>
        <cell :left_ava="avatar" name="账户信息" link="accountInformation"></cell>
        <cell left_lcon="icon-code" name="我的二维码" link="invest"></cell>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <cell left_lcon="icon-set" name="设置" link="setting"></cell>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <li class="log-out" @click="logout"><a href="javascript:;">退出登录</a></li>
      </ul>
    </section>
  </div>
</template>

<style lang="sass">
</style>

<script>
  import cell from '../../components/cell/cell.vue'
  import TitleBar from '../../components/titlebar'
  import userService from '../../services/userService'
  import localStorageCtrl from '../../controllers/localStorageCtrl'
  import Api from '../../services/api'

  export default{
    data () {
      return {
        avatar: userService.getAva()
      }
    },
    components: {
      cell,
      TitleBar
    },
    methods: {
      logout () {
        Api.logout.call(this, {
          resolve: function () {
            localStorageCtrl.clearAll()
            this.$router.go({name: 'login'})
          }
        })
      }
    }
  }
</script>

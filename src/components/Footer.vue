<template>
  <footer :style="{display: show ? 'block' : 'none'}">
    <ul>
      <li><a v-link="{path: '/', exact: true}" :class="{'blue': $route.path === '/' }"><span :class="{'home-blue': $route.path === '/', 'home-gray': $route.path !== '/'}"></span><br />首页</a></li>
      <li><a v-link="{path: '/invest'}" :class="{'blue': $route.path === '/invest' }"><span :class="{'invest-blue': $route.path === '/invest', 'invest-gray': $route.path !== '/invest'}"></span><br />投资</a></li>
      <li><a v-link="{path: '/account'}" :class="{'blue': $route.path === '/account' }"><span :class="{'account-blue': $route.path === '/account', 'account-gray': $route.path !== '/account'}"></span><br />账户</a></li>
    </ul>
  </footer>
</template>
<style  lang="sass">
  @import "../assets/scss/components/_footer.scss";
</style>
<script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: false,
        default: true
      }
    },
    ready () {
    }
  }
</script>

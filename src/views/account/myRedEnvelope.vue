<template>
  <!-- 我的奖励 -->
    <div class="person-setting">
      <aside class="top-title">
        <h1>我的奖励</h1>
        <a class="icon-goback" @click="historyback"></a>
      </aside>
      <a href="javascript:;" class="riga" v-link="{name: rules}">使用规则</a>
      <section class="award-tab">
        <ul>
          <li v-link="{ path: '/myRedEnvelope/red' }" @click="changeRule">红包</li>
          <li v-link="{ path: '/myRedEnvelope/full' }" @click="changeRule">满减券</li>
          <li v-link="{ path: '/myRedEnvelope/rate' }" @click="changeRule">加息券</li>
          <li v-link="{ path: '/myRedEnvelope/fin' }" @click="changeRule">理财金</li>
        </ul>
      </section>
      <router-view></router-view>
    </div>
</template>
<style>
  .riga{
    float: right;
    position: absolute;
    top: 4%;
    right:11%;
    color: #ffffff;
    font-size: 14px;
    z-index: 9999;
  }
</style>
<script>
  import VueRouter from 'vue-router'
  import Vue from 'vue'
  import routerMap from '../../routers/routers'

  export default{
    data(){
      return{
        title:'',
        rules: this.$route.path == '/myRedEnvelope/red' ? 'redRules' : this.$route.path == '/myRedEnvelope/full' ? 'fullCouponRules' : this.$route.path == '/myRedEnvelope/rate' ? 'rateCouponRules' : 'financialRules'
      }
    },
    components:{
      VueRouter
    },
    methods: {
      historyback: function () {
        window.history.go(-1)
      },
      changeRule: function (e) {
        this.rules = e.target.innerHTML == '红包' ? 'redRules' : e.target.innerHTML == '满减券' ? 'fullCouponRules' : e.target.innerHTML == '加息券' ? 'rateCouponRules' :'financialRules';
      }
    }
  }
</script>

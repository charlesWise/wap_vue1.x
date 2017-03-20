<template>
  <!-- 投资记录 -->
    <div class="person-setting">
      <title-bar title="投资记录"></title-bar>
      <section class="set-items wipe-pt">
        <ul class="limit-log">
          <li class="bor-blue"><p><span class="support-bank">投资项目</span><span class="single">投资金额(元)</span><span class="day">预期收益(元)</span></p></li>

          <li><p><em class="bank-name">推荐用户187****7161注册<br />2015-05-08</em><em>18,188,888,00</em><em>已使用<br />90天</em></p></li>
          <li><p><em class="bank-name">推荐用户187****7161注册<br />2015-05-08</em><em>18,188,888,00</em><em>已使用<br />90天</em></p></li>
          <li><p><em class="bank-name">推荐用户187****7161注册<br />2015-05-08</em><em>18,188,888,00</em><em>已使用<br />90天</em></p></li>
          <li><p><em class="bank-name">推荐用户187****7161注册<br />2015-05-08</em><em>18,188,888,00</em><em>已使用<br />90天</em></p></li>
          <li><p><em class="bank-name">推荐用户187****7161注册<br />2015-05-08</em><em>18,188,888,00</em><em>已使用<br />90天</em></p></li>

        </ul>
      </section>
      <section class="set-items wipe-pt dn">
        <div class="warm-prompt withdrawNo">
          <h3 class="without"></h3>
          <p>暂无理财金记录</p>
        </div>
      </section>
      <section class="with-finance"><p>拥有理财金：<span>0.00元</span></p></section>
    </div>
</template>
<style>
  .dn{
    display: none;
  }
</style>
<script>
  import TitleBar from '../../components/titlebar'

  export default{
    data(){
      return{
          title:'投资记录'
      }
    },
    components:{
      TitleBar
    },
    methods: {

    }
  }
</script>

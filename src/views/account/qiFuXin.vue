<template>
  <!-- 企福鑫 -->
    <div class="person-setting">
      <title-bar title="企福鑫"></title-bar>
      <section class="qifuxin-content">
        <div class="head">
          <i class="tencent-logo"></i><span><a v-link="{name: 'joinQiFuXin'}">+邀请好友</a></span>
        </div>
        <div class="stroke-count employee">
          <ul>
            <li><h3>3000万</h3><p>加入员工</p></li>
            <li><h3>109</h3><p>定制项目</p></li>
            <li class="remove-border"><h3>187,545,555,00万</h3><p>为员工带来收益</p></li>
          </ul>
        </div>
        <div class="no-bidding"><i class="xhh-logo"></i><p>还没有可用投标</p></div>
      </section>
    </div>
</template>
<style>
</style>
<script>
  import TitleBar from '../../components/titlebar'

  export default{
    data(){
      return{
        title:'企福鑫'
      }
    },
    components:{
      TitleBar
    },
    methods: {

    }
  }
</script>

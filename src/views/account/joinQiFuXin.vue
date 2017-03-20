<template>
  <!-- 企福鑫 -->
  <div class="person-setting">
    <title-bar title="企福鑫"></title-bar>
    <section class="qifuxin-content">
      <div class="photo-preview">
        <p>头像预留</p>
      </div>
      <section class="set-items">
        <form action="">
          <ul>
            <li><label class="label-width">企业代码</label><input class="input-width" type="text" placeholder="请输入企业代码"></li>
          </ul>
        </form>
      </section>
      <div class="submit-button"><input class="blue" type="button" value="立即加入" @click="goJoin"></div>
      <div class="photo-preview preview">
        <p>头像预留</p>
      </div>
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
      goJoin: function () {

      }
    }
  }
</script>

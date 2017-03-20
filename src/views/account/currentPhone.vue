<template>
  <!-- 个人信息 -->
  <div class="person-setting">
    <title-bar title="当前手机号"></title-bar>
    <section class="set-items">
      <form action="">
        <ul>
          <input-x :msg.sync="parentMsg" :input_type="liMessage.input_type" :labe_name="liMessage.labe_name" :input_name="liMessage.input_name" :input_placeholder="liMessage.input_placeholder"></input-x>
        </ul>
        <div class="submit-button"><input class="blue" type="button" value="更换手机号" v-link="{name: 'mobileAuthentication'}"/></div>
        <div class="verify"><p>温馨提示：若您当前手机号码已停止使用，可以发送邮件至 helpdesk@xinhehui.com 申请更换手机号码，请您在邮件中提供：姓名、手机号、本人手持身份证正反面照片，客服会在24小时内处理，或拨打客服电话 <em>400-821-8616</em></p></div>
      </form>
    </section>
  </div>
</template>
<style>
</style>
<script>
  import inputX from '../../components/input/inputX.vue'
  import userService from '../../services/userService'
  import TitleBar from '../../components/titlebar'

  export default{
    data(){
        return{
          title: '当前手机号',
          parentMsg: userService.getAttr('mobile'),
          liMessage: {
            labe_name: '手机号',
            input_name: 'mobile',
            input_placeholder: '手机号',
            input_type: 'tel'
          }
        }
    },
    components:{
      inputX,
      TitleBar
    },
    methods: {
      historyback: function () {
        window.history.go(-1)
      }
    },
    created () {
      let mobil = this.parentMsg;
      if(Number(mobil)){
        this.parentMsg = mobil.substr(0, 3) + '****' + mobil.substr(7);
      }
    }
  }
</script>

<template>
  <!-- 邮箱绑定 -->
    <div class="person-setting">
      <title-bar title="邮箱绑定"></title-bar>
      <section class="set-items">
        <form action="">
          <ul>
            <input-x :msg.sync="parentMsg" :labe_name="liMessage.labe_name" :input_name="liMessage.input_name" :input_placeholder="liMessage.input_placeholder"></input-x>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="提交" @click="saveData" /></div>
          <tip :msg.sync="msg" :tip-show="tip_show"></tip>
          <div class="tips add-height" v-show="postMessage">认证邮件已发送，<br />请前往邮箱激活链接 ！</div>
        </form>
      </section>
    </div>
</template>
<style>
</style>
<script>
  import inputX from '../../components/input/inputX.vue'
  import TitleBar from '../../components/titlebar'
  import userService from '../../services/userService'
  import ApiMap from '../../constants/config.api'
  import tip from '../../components/tip/index.vue'
  import VueResource from 'vue-resource'

  export default{
    data(){
        return{
          title:'邮箱绑定',
          parentMsg: '',
          postMessage: false,
          tip_show: false,
          msg: '',
          liMessage: {
            labe_name: '邮箱',
            input_name: 'mailbox',
            input_placeholder: '请输入邮箱地址'
          }
        }
    },
    components:{
      inputX,
      TitleBar,
      tip
    },
    methods: {
      historyback: function () {
          window.history.go(-1)
      },
      saveData: function () {
        if(this.parentMsg == ''){
          this.tip_show = true;
          this.msg = '邮箱地址不能为空';
          return false;
        }
        //ApiMap.authMail
        this.$http({url: ApiMap.authMail, method: 'GET',data: {mail: this.parentMsg}}).then(function (response) {
          // success callback
          console.info(response);debugger
          if(response.data.boolen == 1){
            //提示成功
            this.tip_show = true;
            this.msg = response.data.message;
            userService.setAttr('email', this.parentMsg);
            userService.setAttr('is_email_auth', 1);
//            console.info(userService.getUser());
            this.$router.go('accountInformation');
          }else{
            this.tip_show = true;
            this.msg = response.data.message;
          }
        }, function (response) {
          // error callback
          console.info(response);
          this.tip_show = true;
          this.msg = response.data.message;
        });
      }
    }
  }
</script>

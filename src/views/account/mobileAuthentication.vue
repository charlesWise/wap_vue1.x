<template>
  <!-- 当前手机认证 -->
    <div class="person-setting">
      <title-bar title="当前手机认证"></title-bar>
      <section class="set-items">
        <form action="">
          <ul>
            <input-x :msg.sync="parentMsg" :input_type="liMessage.input_type" :labe_name="liMessage.labe_name" :input_name="liMessage.input_name" :input_placeholder="liMessage.input_placeholder"></input-x>
            <input-code :msg.sync="parentCode" :input_type="liCode.input_type" :labe_name="liCode.labe_name" :input_name="liCode.input_name" :input_placeholder="liCode.input_placeholder"></input-code>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="下一步" @click="goNext"/></div>
        </form>
      </section>
      <tip :msg.sync="msg" :tip-show.sync="tip_show"></tip>
    </div>
</template>
<style>
</style>
<script>
  import inputX from '../../components/input/inputX.vue'
  import inputCode from '../../components/input/inputCode.vue'
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  import userService from '../../services/userService'
  import tip from '../../components/tip/index.vue'

  export default{
    data(){
        return{
          title:'当前手机认证',
          parentMsg: '',
          parentCode: '',
          currentPhone: userService.getAttr('mobile'),
          tip_show: false,
          msg: '',
          liMessage: {
            labe_name: '手机号',
            input_name: 'mailbox',
            input_placeholder: '手机号',
            input_type: 'tel'
          },
          liCode: {
            labe_name: '动态码',
            input_name: 'code',
            input_placeholder: '动态码',
            input_type: 'tel'
          }
        }
    },
    components:{
      inputX,
      inputCode,
      TitleBar,
      tip
    },
    methods: {
      goNext: function () {
        if(this.parentCode !== ''){
          let options = {
            data: {'mobile': this.parentMsg,'code': this.parentCode},
            resolve: function (data) {
              console.info(data);
              if(data.boolen == 1){
                this.$router.go('newMobile');
              }else{
                this.tip_show = true; this.msg = data.message;
              }
            }
          }
          Api.editMobile1.call(this, options);
        }
      }
    },
    events: {
      "click-dynamic-code": function (countDown) {
        let options = {
          data: {'mobile': this.parentMsg},
          resolve: function (data) {
            console.info(data);
            if(data.boolen == 1){
              this.tip_show = true; this.msg = '动态码已发送成功'
              countDown();
            }else{
              this.tip_show = true; this.msg = data.message;
            }
          }
        }
        if(this.parentMsg == ''){
          this.tip_show = true; this.msg = '手机号不能为空'
        }
        else if(this.parentMsg !== this.currentPhone){
          this.tip_show = true; this.msg = '手机号不符'
        }
        else if(this.parentMsg == this.currentPhone){
          Api.sendCheckOldMobileCode.call(this, options);
        }
      }
    }
  }
</script>

<template>
  <!-- 绑定新手机 -->
    <div class="person-setting">
      <title-bar title="绑定新手机"></title-bar>
      <section class="set-items">
        <div class="verify"><p>请输入你需要绑定的新手机号</p></div>
        <form action="">
          <ul>
            <input-x :msg.sync="parentMsg" :input_type="liMessage.input_type" :labe_name="liMessage.labe_name" :input_name="liMessage.input_name" :input_placeholder="liMessage.input_placeholder"></input-x>
            <input-code :msg.sync="parentCode" :input_type="liCode.input_type" :labe_name="liCode.labe_name" :input_name="liCode.input_name" :input_placeholder="liCode.input_placeholder"></input-code>
          </ul>
          <div class="submit-button"><input class="blue" type="button" value="提交" @click="saveData"/></div>
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
          title:'绑定新手机',
          parentMsg: '',
          parentCode: '',
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
      saveData: function () {
        if(this.parentMsg !== '' && this.parentCode !== ''){
          let options = {
            data: {'mobile': this.parentMsg,'code': this.parentCode},
            resolve: function (data) {
              console.info(data);
              if(data.boolen == 1){
                userService.setAttr('mobile', this.parentMsg);
                this.$router.go('accountInformation');
              }else{
                this.tip_show = true; this.msg = data.message;
              }
            }
          }
          Api.editMobile2.call(this, options)
        }
      }
    },
    events: {
      "click-dynamic-code": function (countDown) {
        let regx = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
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
        else if(!regx.test(this.parentMsg)){
          this.tip_show = true; this.msg = '请输入正确的手机号'
        }
        else if(regx.test(this.parentMsg)){
          Api.sendEditMobileCode.call(this, options);
        }
      }
    }
  }
</script>

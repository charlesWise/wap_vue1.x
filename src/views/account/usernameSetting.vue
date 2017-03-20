<template>
  <!-- 用户名设置 -->
    <div class="person-setting">
      <aside class="top-title">
        <h1>头像设置</h1>
        <a class="icon-goback" @click="historyback"></a>
      </aside>
      <a href="javascript:;" class="riga" @click="saveData">保存</a>
      <section class="set-items">
        <form action="">
          <div class="verify"><p>*用户名只可设置一次，请输入你熟悉的用户名</p></div>
          <ul>
            <input-x :msg.sync="parentMsg" :input_type="liMessage.input_type" :labe_name="liMessage.labe_name" :input_name="liMessage.input_name" :input_placeholder="liMessage.input_placeholder"></input-x>
          </ul>
        </form>
      </section>
      <tip :msg.sync="msg" :tip-show.sync="tip_show"></tip>
    </div>
</template>
<style>
  .riga{
    float: right;
    position: absolute;
    top: 2%;
    right: 4%;
    color: #ffffff;
    font-size: 16px;
    z-index: 9999;
  }
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import inputX from '../../components/input/inputX.vue'
  import ApiMap from '../../constants/config.api'
  import VueResource from 'vue-resource'
  import userService from '../../services/userService'
  import tip from '../../components/tip/index.vue'

  export default{
      data(){
          return{
            title: '用户名设置',
            parentMsg: '',
            tip_show: false,
            msg: '',
            liMessage: {
              labe_name: '用户名',
              input_name: 'username',
              input_placeholder: '输入用户名'
            }
          }
      },
      components:{
        inputX,
        tip,
        TitleBar
      },
      methods: {
        historyback: function () {
          window.history.go(-1)
        },
        saveData: function () {
          if(this.parentMsg == ''){
            this.tip_show = true;
            this.msg = '用户名不能为空';
            return false;
          }
          //ApiMap.editUname
          this.$http({url: ApiMap.editUname, method: 'GET',data: {username: this.parentMsg}}).then(function (response) {
            // success callback
            console.info(response);
            if(response.data.boolen == 1){
              //提示成功
              this.tip_show = true;
              this.msg = response.data.message;
              userService.setAttr('uname', this.parentMsg);
              userService.setAttr('is_set_uname', 1);
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

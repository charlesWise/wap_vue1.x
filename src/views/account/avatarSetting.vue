<template>
  <!-- 头像设置 -->
    <div class="person-setting">
      <title-bar title="头像设置"></title-bar>
      <section class="photo-setting">
        <div><img src="" alt="" v-bind:src="img_src"/></div>
      </section>
      <section class="set-items">
        <ul>
          <li class="choose-album">
            <p>从相册选一张</p>
            <upload :name="upload" :action="action" $on="onFileClick" :accept="accept"></upload>
          </li>
        </ul>
      </section>
      <tip :msg.sync="msg" :tip-show.sync="tip_show"></tip>
    </div>
</template>
<style>
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import upload from '../../components/common/upload/clickUpload.vue'
  import userService from '../../services/userService'
  import config from '../../constants/config'
  import tip from '../../components/tip/index.vue'
  import VueResource from 'vue-resource'

  export default{
    data(){
      return{
        title: '头像设置',
        img_src: userService.getAva(),
        tip_show: false,
        msg: '',
        upload: 'headimg',
        action: config.uploadImg,
        accept: 'image/jpg, image/png, image/jpeg'
      }
    },
    components:{
      TitleBar,
      upload,
      tip
    },
    methods: {
      historyback: function () {
            window.history.go(-1)
      },
      getImageSrc : function (result) {
        // GET request
        this.$http({url: config.imgSrc, method: 'GET',data: {path: result}}).then(function (response) {
          // success callback
          console.info(response);
          if(response.data.boolen == 1){
            //提示成功
            this.tip_show = true;
            this.msg = '头像上传成功';
            this.img_src = response.data.data.url_s50;
            userService.setAva(this.img_src);
//            console.info(userService.getUser());
            this.$router.go('accountInformation');
          }else{
            this.tip_show = true;
            this.msg = response.data.message;
          }
        }, function (response) {
          // error callback
          console.info(response);
        });
      }
    },
    created () {
//      console.info(userService.get());
    },
    // 在创建实例时 `events` 选项简单地调用 `$on`
    // 用于子组件调用 派发时 沿着父链向上冒泡在触发一个监听器
    events: {
      onFileClick: function (myFiles) {
        //点击触发
        // 事件回调内的 `this` 自动绑定到注册它的实例上
//        console.info('upload');
//        console.info(myFiles);
      },
      onFileChange: function (myFiles) {
        //内容改变触发
//        console.info(myFiles);
      },
      onFileError: function (myFiles,err) {
//        console.info(err);
        this.tip_show = true;
        this.msg = err;
      },
      onAllFilesUploaded: function (allFiles) {
        //图片上传回调
        console.info(allFiles);
      },//文件上传完毕 调用
      onFileUpload: function (file, res) {
//        debugger
//        console.info(file);
//        console.info(res);
        if(res.boolen == 1){
          //把图片地址储存到服务器
          this.getImageSrc(res.result);
        }else{
          console.info(res.message);
          this.tip_show = true;
          this.msg = res.message;
        }
      }
    }
  }
</script>

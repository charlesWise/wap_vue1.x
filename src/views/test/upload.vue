<template>
  <div class="main">
    <div class="container" id="app">
      使用示例,目前上传的地址
      <br>

      <!--显示上传成功的图片 -->
      <ul v-show="uploadedFiles.length > 0">
        <li v-for="file in uploadedFiles">Name: <em>{{ file.name }}</em> Size: <em>{{ file.size | prettyBytes }}</em></li>
      </ul>
      <!-- 上传进度条 -->
      <div class="progress-bar" :style="{width: fileProgress+'%'}" v-show="fileProgress > 0" ></div>
      <!-- 所有图片上传完 -->
      <p v-if="allFilesUploaded"><strong>All Files Uploaded</strong></p>
      <!-- 较全的用法 -->
      <file-upload class="my-file-uploader" name="myFile" id="myCustomId" action="{{action}}" multiple>slot的信息</file-upload>
      <!-- 最简单的用法 -->
      <file-upload name="anotherFile" action="{{action}}"></file-upload>
    </div>
  </div>
</template>
<style lang="sass">
  .progress-bar {
    opacity: 1;
    height: 2px;
    margin: 0.4em 0;
    width: 0;
    background: green;
  }
</style>
<script>
  import { functions } from '../../utils/functions'
  import FileUpload from '../../components/common/upload/upload.vue';

  export default{
    data () {
      return {
        title: '上传',
        action: '',
        uploadedFiles: [],
        fileProgress: 0,
        allFilesUploaded: false
      }
    },
    created () {
      functions.setHeader(this.title)
    },
    components: {
      FileUpload
    },
    events: {
      onFileClick: function(file) {
        console.log('onFileClick', file);
      },
      onFileChange: function(file) {
        console.log('onFileChange', file);
        // here is where we update our view
        this.fileProgress = 0;
        this.allFilesUploaded = false;
      },
      beforeFileUpload: function(file) {
        // called when the upload handler is called
        console.log('beforeFileUpload', file);
      },
      afterFileUpload: function(file) {
        // called after the xhr.send() at the end of the upload handler
        console.log('afterFileUpload', file);
      },
      onFileProgress: function(progress) {
        console.log('onFileProgress', progress);
        // update our progress bar
        this.fileProgress = progress.percent;
      },
      onFileUpload: function(file, res) {
        console.log('onFileUpload', file, res);
        // update our list
        this.uploadedFiles.push(file);
      },
      onFileError: function(file, res) {
        console.error('onFileError', file, res);
      },
      onAllFilesUploaded: function(files) {
        console.log('onAllFilesUploaded', files);
        // everything is done!
        this.allFilesUploaded = true;
      }
    }
  }
</script>

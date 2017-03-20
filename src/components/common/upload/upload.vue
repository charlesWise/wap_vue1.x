<template>
  <div class="{{ classStr }}">
    <label for="{{ name }}">
      <input type="file" name="{{ name }}" id="{{ id || name }}" accept="{{ accept }}" v-on:click="fileInputClick" v-on:change="fileInputChange" multiple="{{ multiple }}" />
      <slot></slot>
    </label>
    <button type="button" v-on:click="fileUpload">Upload</button>
  </div>
</template>
<style lang="sass">
</style>

<script>
  export default {
    props: {
      classStr: String,
      name: {
        type: String,
        required: true
      },
      id: String,
      action: {
        type: String,
        required: true
      },
      accept: String,
      multiple: String,
      headers: Object
    },
    data: function() {
      return {
        myFiles: []
      }
    },
    methods: {
      fileInputClick: function() {
        // 选择图片对话框出来
        this.$dispatch('onFileClick', this.myFiles)
      },
      fileInputChange: function() {
        // 图片变更
        var ident = this.id || this.name
        this.myFiles = document.getElementById(ident).files
        this.$dispatch('onFileChange', this.myFiles)
      },
      _onProgress: function(e) {
        // XHR 实现的上传 百分比
        e.percent = (e.loaded / e.total) * 100
        this.$dispatch('onFileProgress', e)
      },
      _handleUpload: function(file) {
        this.$dispatch('beforeFileUpload', file)
        var form = new FormData()
        var xhr = new XMLHttpRequest()
        try {
          form.append('Content-Type', file.type || 'application/octet-stream')
          form.append('file', file)
        } catch (err) {
          this.$dispatch('onFileError', file, err)
          return
        }

        return new Promise(function(resolve, reject) {

          xhr.upload.addEventListener('progress', this._onProgress, false)

          xhr.onreadystatechange = function() {
            if (xhr.readyState < 4) {
              return
            }
            if (xhr.status < 400) {
              var res = JSON.parse(xhr.responseText)
              this.$dispatch('onFileUpload', file, res)
              resolve(file)
            } else {
              var err = JSON.parse(xhr.responseText)
              err.status = xhr.status
              err.statusText = xhr.statusText
              this.$dispatch('onFileError', file, err)
              reject(err)
            }
          }.bind(this)

          xhr.onerror = function() {
            var err = JSON.parse(xhr.responseText)
            err.status = xhr.status
            err.statusText = xhr.statusText
            this.$dispatch('onFileError', file, err)
            reject(err)
          }.bind(this)

          xhr.open('POST', this.action, true)
          if (this.headers) {
            for(var header in this.headers) {
              xhr.setRequestHeader(header, this.headers[header])
            }
          }
          xhr.send(form)
          this.$dispatch('afterFileUpload', file)
        }.bind(this))
      },
      fileUpload: function() {
        if(this.myFiles.length > 0) {
          // 将files转化为数组
          var arrayOfPromises = Array.prototype.slice.call(this.myFiles, 0).map(function(file) {
            return this._handleUpload(file)
          }.bind(this))
          // 等待promise结束
          Promise.all(arrayOfPromises).then(function(allFiles) {
            this.$dispatch('onAllFilesUploaded', allFiles)
          }.bind(this)).catch(function(err) {
            this.$dispatch('onFileError', this.myFiles, err)
          }.bind(this))
        } else {
          // 未选择文件
          var err = new Error("请选择文件")
          this.$dispatch('onFileError', this.myFiles, err)
        }
      }
    }
  }
</script>

<template>
  <div id="toast" v-show="show">
    <div class="ui_mask_transparent"></div>
    <div class="ui_toast">
      <p class="ui_toast_content"><slot></slot></p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false,
        twoWay: true
      },
      time: {
        type: Number,
        default: 2000
      },
      type: {
        type: String,
        default: 'cancel'
      }
    },
    watch: {
      show: function (val) {
        const _this = this
        if (val) {
          clearTimeout(this.timeout)
          this.timeout = setTimeout(function () {
            _this.show = false
          }, _this.time)
        }
      }
    }
  }
</script>
<style>
  .ui_mask_transparent {
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .ui_toast {
    position: fixed;
    z-index: 3;
    top: 180px;
    width: 50%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(40,40,40,.75);
    padding: 10px 20px;
    text-align: center;
    border-radius: 5px;
    color: #fff;
  }

  .ui_icon_toast {
    margin: 22px 0 0;
    display: block;
  }
</style>

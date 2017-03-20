<template>
  <div class="toast" v-show="tipShow">
    <div class="ui_mask_transparent"></div>
    <div class="ui_toast">
      <p class="ui_toast_content">{{msg}}</p>
    </div>
  </div>
</template>

<style lang="sass">
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
    background: #606060;
    padding: 10px 20px;
    text-align: center;
    min-height: 3rem;
    border-radius: 5px;
    color: #fff;
  }

  .ui_icon_toast {
    margin: 22px 0 0;
    display: block;
  }
</style>

<script>
export default{
  props: {
    msg: {
      type: String,
      default: '出错喽'
    },
    tipShow: {
      type: Boolean,
      default: true,
      twoWay: true
    }
  },
  watch: {
    'tipShow': function (val, oldVal) {
      if (val) {
        setTimeout(() => {this.tipShow = false}, 2000)
      }
    }
  }
  }
</script>

<template>
  <div class="popbox" v-show="show">
    <div class="ui_mask_transparent"></div>
    <div class="ui-dialog">
      <div class="content">{{msg}}</div>
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
    background: rgba(0, 0, 0, .6);
  }

  .ui-dialog {
    position: fixed;
    z-index: 13;
    width: 85%;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    background-color: #fafafc;
    text-align: center;
    border-radius: 3px;
  }

  .content {
    padding: 2rem;
  }
</style>

<script>
  export default{
    props: {
      msg: {
        type: String,
        default: '出错喽'
      },
      show: {
        type: Boolean,
        default: false,
        twoWay: true
      }
    }
  }
</script>

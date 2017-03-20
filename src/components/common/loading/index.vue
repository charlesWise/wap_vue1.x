<template>
  <div class="weui_dialog_alert" v-show="show">
    <div class="weui_mask">
      <img src="../../../assets/images/load/loading.gif" alt="">
    </div>
    <!-- <spinner :type="type"></spinner> -->
  </div>
</template>

<script>
  import Spinner from '../spinner/index.vue'
  export default {
    props: {
      show: {
        type: Boolean,
        required: false,
        default: true
      },
      type: 'spiral'
    },
    components: {
      Spinner
    },
    methods: {
      onHide: function () {
        this.show = false
        this.$dispatch('on-hide')
      }
    },
    watch: {
      show: function (val) {
        if (val) {
          this.$dispatch('on-show')
        }
      }
    }
  }
</script>

<style>
  .weui_mask{
    display: -webkit-box;
    -webkit-box-align: center; /* 垂直排序 */
    -webkit-box-pack: center;/* 水平排序 */
  }
  .weui_dialog_alert img{
    width:120px;
    border-radius: 5px;
  }
</style>

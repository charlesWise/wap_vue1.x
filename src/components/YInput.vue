<template>
    <div class="input-box">
      <input type="{{qtype}}" placeholder="{{holdertext}}" v-model="inputvalue" class="login-input">
      <span class="clean input-clean" @click="cleanInfo" v-show="inputvalue">x</span>
    </div>
</template>
<style>
</style>
<script>
  /*
  * API:
  * */
  export default{
    data () {
      return {}
    },
    props: {
      itemname: {
        type: String,
        default: ''
      },
      holdertext: {
        type: String,
        default: ''
      },
      qtype: {
        type: String,
        default: 'password'
      },
      inputvalue: {
        type: String,
        required: true,
        twoWay: true
      },
      span_class: {
        type: String
      },
      span_val: {
        type: String
      },
      img_src: {
        type: String
      }
    },
    methods: {
      cleanInfo: function () {
        this.inputvalue = ''
      }
    },
    components: {
    }
  }
</script>

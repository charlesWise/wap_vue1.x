<template>
  <li>
    <label class="label-width">{{itemname}}</label>
    <input class="input-width" type="{{qtype}}" placeholder="{{holdertext}}" v-model="inputvalue">
    <a href="javascript:;">
      <span class="clean" @click="cleanInfo" v-show="inputvalue">x</span>
    </a>
  </li>
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

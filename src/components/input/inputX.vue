<template>
  <li>
    <label class="label-width">{{labe_name}}</label><input class="input-width" type="{{input_type}}" placeholder="{{input_placeholder}}" name="{{input_name}}" v-model="msg"><a href="javascript:;"><span class="clean" v-show="msg" @click="cleanMessage">x</span></a>
  </li>
</template>
<style>
</style>
<script>

  export default{
    data(){
        return{
        }
    },
    props: {
      labe_name: {
        type: String,
        required: false,
        default: ''
      },
      input_name: {
        type: String,
        required: false,
        default: ''
      },
      input_placeholder: {
        type: String,
        required: false,
        default: ''
      },
      input_type: {
        type: String,
        required: false,
        default: 'text'
      },
      msg: {
        type: String,
        required: true,
        default: '',
        twoWay: true,
        coerce: function (val) {
          return val.replace(/\s+/g, "")// 将值转换为字符串
        }
      }
    },
    components:{

    },
    methods: {
      historyback: function () {
        window.history.go(-1)
      },
      cleanMessage: function () {
        this.msg = '';
      }
    }
  }
</script>

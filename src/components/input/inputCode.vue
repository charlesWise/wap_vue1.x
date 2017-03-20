<template>
  <li><label class="label-width">{{labe_name}}</label><input class="input-width dynamic-code" type="{{input_type}}" placeholder="{{input_placeholder}}" name="{{input_name}}" v-model="msg"><dynamic-code></dynamic-code></li>
</template>
<style>
</style>
<script>
  import DynamicCode from '../../components/finance/DynamicCode'

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
        required: false,
        default: '',
        twoWay: true
      }
    },
    components:{
      DynamicCode
    },
    methods: {

    }
  }
</script>

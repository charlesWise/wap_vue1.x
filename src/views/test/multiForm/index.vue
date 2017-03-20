<template>
  <div class="main">
    <router-view>

    </router-view>
    <form>
      <x-input title="姓名" placeholder="请输入姓名" :value.sync="formObj.account" :required=true></x-input>
      <x-input title="密码" placeholder="请输入密码" keyboard="number" :value.sync="formObj.pwd" :required=true></x-input>
      <cell title="选择银行" link="/address"></cell>
      <x-input title="备注" placeholder="备注" :value.sync="formObj.backup"></x-input>
      <x-button type="warn">提交</x-button>
    </form>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import XInput from 'vux/components/x-input'
  import XButton from 'vux/components/button'
  import Cell from 'vux/components/cell'
  import { functions } from '../../../utils/functions'
  import formService from '../../../services/formService'

  export default{
    data () {
      return {
        title: '多步表单',
        formObj: formService.getForm('testForm')
      }
    },
    components: {
      XInput,
      XButton,
      Cell
    }
  }
</script>

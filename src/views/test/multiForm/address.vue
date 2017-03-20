<template>
  <div class="main">
    <group>
      <x-input placeholder="二级备注" :value.sync="formObj.backup"></x-input>
    </group>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import { functions } from '../../../utils/functions'
  import Group from 'vux/components/group'
  import XInput from 'vux/components/x-input'
  import formService from '../../../services/formService'

  export default{
    data () {
      return {
        title: '二级选择',
        formObj: formService.getForm('testForm')
      }
    },
    created () {
      functions.setHeader(this.title)
    },
    components: {
      Group,
      XInput
    }
  }
</script>

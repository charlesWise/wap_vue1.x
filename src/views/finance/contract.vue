<template>
  <div class="base-view fixed-headbar">
    <title-bar title="查看合同"></title-bar>
    <div class="register-protocol" v-html="info" style="text-align:left;">
      {{info}}
    </div>
  </div>
</template>
<script>
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'

  export default{
    data () {
      return {
        info: ''
      }
    },
    ready: function() {
      Api.protocolView.call(this, {
        resolve: function(d) {
          this.info = d.data.content;
        },
        data: this.$route.params
      })
    },
    components: {
      TitleBar
    },
    methods: {
    }
  }
</script>

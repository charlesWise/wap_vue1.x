<template>
  <div class="base-view fixed-headbar">
    <template v-if="show">
      <title-bar title="投资协议"></title-bar>
      <section class="agreement-details">
        <div v-html="info"></div>
      </section>
    </template>
  </div>
</template>
<script>
  import TitleBar from '../../components/titlebar'
  import formService from '../../services/formService'
  import Api from '../../services/api'
  var investForm = formService.getForm('investForm');

  export default{
    data () {
      return {
        info: {},
        show: false
      }
    },
    components: {
      TitleBar
    },
    ready: function() {
      Api.pbuyProtocol.call(this, {
        data: {
          id: investForm.protocol_id,
          prj_id: investForm.prj_id,
          show: false
        },
        resolve: function(d) {
          /<body>([\s\S]*?)<\/body>/.test(d);
          this.info = RegExp.$1 || d;
          this.show = true;
        },
        isHideErrorPop: true
      })
    },
    methods: {
    }
  }
</script>

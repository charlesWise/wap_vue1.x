<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="开户城市"></title-bar>
      <section class="set-items wipe-pt">
        <ul>
          <li v-for="item in list" v-link="{name: 'selectSubBank', params: {provinceId: item.temp_pcode, cityId: item.code}}">
            <a href="javascript:;">{{item.name_cn}}
              <span class="not-set"><i class="arrow-r"></i></span>
            </a>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'
  import Api from '../../../services/api'

  export default {
    data () {
      return {
        list: []
      }
    },
    mixins: [viewMixin],
    components: {
      titleBar
    },
    created () {
      Api.getSftCitysById.call(this, {
        data: {
          temp_pcode: this.$route.params.provinceId
        },
        resolve: function (json) {
          if (json.boolen == 1) {
            this.list = json.data
          }
        }
      })
    }
  }
</script>

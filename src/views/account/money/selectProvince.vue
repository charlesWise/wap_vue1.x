<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="开户省份"></title-bar>
      <section class="set-items wipe-pt">
        <ul>
          <li v-for="item in list" v-link="{name: 'selectCity', params: {provinceId: item.temp_pcode}}">
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
      Api.getSftCity.call(this, {
        resolve: function (json) {
          if (json.boolen == 1) {
            let provinces = []
            provinces = json.data.reduce(function (prev, cur, currentIndex) {
              return currentIndex === 1 ? prev['child'].concat(cur['child']) : prev.concat(cur['child'])
            })
            this.list = provinces
          }
        }
      })
    }
  }
</script>

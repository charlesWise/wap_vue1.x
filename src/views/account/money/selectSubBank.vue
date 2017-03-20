<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="开户行"></title-bar>


      <search-box @go-search="search" :is-empty="isEmpty"></search-box>

      <section class="set-items wipe-pt">
        <ul>
          <li v-for="(index, item) in list" @click="selectSubBank(index)">
            <a href="javascript:;">{{item.bank_name}}
              <span v-if="selected === index" class="select-character character"></span>
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
  import searchBox from '../../../components/searchBox/index.vue'
  import transferService from '../../../services/transferService'

  export default {
    data () {
      return {
        list: [],
        selected: -1
      }
    },
    computed: {
      isEmpty: function () {
        return this.list.length === 0
      }
    },
    mixins: [viewMixin],
    components: {
      titleBar,
      searchBox
    },
    created () {
      let params = {
        temp_pcode: this.$route.params.provinceId,
        code: this.$route.params.cityId
      }
      this.getBankListByKey(params)
    },
    methods: {
      search (key_word) {
        let params = {
          temp_pcode: this.$route.params.provinceId,
          code: this.$route.params.cityId,
          key_word: key_word
        }
        this.getBankListByKey(params)
      },
      selectSubBank (index) {
        this.selected = index
        transferService.set('subBank', this.list[this.selected])
        window.history.go(-3)
      },
      getBankListByKey (params) {
        Api.getBankListByKey.call(this, {
          data: params,
          resolve: function (json) {
            if (json.boolen == 1) {
              this.list = json.data
            }
          }
        })
      }
    }
  }
</script>

<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="选择银行"></title-bar>
      <section class="set-items">
        <ul class="limit">
          <li><p><span class="support-bank">支持的银行</span><span class="single">单笔限额(万)</span><span class="day">单日限额(万)</span></p></li>

          <li v-for="(index, bank) in list" @click="chooseBank(index)">
            <p>
              <em class="bank-name">
                <i class="bank-{{bank.myCode}}"></i>{{bank.name}}
              </em>
              <em v-if="bank.single">{{bank.single}}</em>
              <em v-else>不限额</em>
              <em v-if="bank.day">{{bank.day}}</em>
              <em v-else>不限额</em>
              <i  v-if="selected===index" class="select-character"></i>
            </p>
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
  import transferService from '../../../services/transferService'

  export default {
    data () {
      return {
        myCode: '',
        list: [],
        selected: -1
      }
    },
    created () {
      this.myCode = this.$route.query.myCode || ''

      Api.getLimitMoneyData.call(this, {
        resolve: function (json) {
          if (json.boolen === 1) {
            this.list = json.data
            this.initSelected()
          }
        }
      })

    },
    mixins: [viewMixin],
    components: {
      titleBar
    },
    methods: {
      initSelected () {
        let self = this
        if (this.myCode) {
          this.list.forEach(function (elem, index) {
            if (elem['myCode'] === self.myCode) {
              self.selected = index
            }
          })
        }
      },
      chooseBank (index) {
        this.selected = index

        transferService.set('bank', this.list[this.selected])

        window.history.go(-1)
      }

    }

  }
</script>

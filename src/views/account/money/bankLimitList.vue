<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="限额说明"></title-bar>
      <section class="set-items">
        <form action="">
          <ul class="limit">
            <li><p><span class="support-bank">支持的银行</span><span class="single">单笔限额(万)</span><span class="day">单日限额(万)</span></p></li>

            <li v-for="(index, bank) in list">
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
        </form>
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
      Api.getLimitMoneyData.call(this, {
        resolve: function (json) {
          if (json.boolen === 1) {
            this.list = json.data
          }
        }
      })
    },
  }
</script>

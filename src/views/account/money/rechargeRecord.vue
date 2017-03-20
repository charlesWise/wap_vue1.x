<template>
  <div>
    <div class="main">
      <title-bar title="充值记录"></title-bar>

      <pull-up api="getUserRechargeRecord">
        <section slot="list" class="set-items">
          <ul>
            <li v-for="record in lists" v-link="{name: 'rechargeDetail',params: {id: record.id}}">
              <label class="label-width cur-pwd trace-log">
              <span class="log-text">￥{{record.amount}}<br/>
                <em>{{record.ctime}}</em></span>
              </label>
              <span class="">{{record.status|rechargeStatus}} <i class="arrow-r"></i></span>
              </span>
            </li>
          </ul>
        </section>
        <section slot="noData" class="set-items">
          <div class="warm-prompt withdrawNo">
            <h3 class="without"></h3>
            <p>您还未进行过充值</p>
          </div>
        </section>
      </pull-up>

    </div>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import viewMixin from '../../../constants/viewMixin'
  import titleBar from '../../../components/titlebar'
  import Api from '../../../services/api'
  import rechargeStatus from '../../../filters/rechargeStatus'
  import PullUp from '../../../components/common/pullup2/index.vue'

  export default {
    data () {
      return {
        lists: [],
        pullOpts: {
          port: 'getUserRechargeRecord',
          params: {
            p: 1
          }
        }
      }
    },
    mixins: [viewMixin],
    components: {
      titleBar,
      PullUp
    },
    filters: {
      rechargeStatus
    },
    events: {
      'pullup:completed': function (data) {
        this.lists = this.lists.concat(data)
      }
    }
  }
</script>

<template>
  <div class="base-view">
    <div class="main">
      <title-bar title="充值明细"></title-bar>
      <section class="set-items wipe-pt">
        <ul>
          <li><label class="label-width record-left">充值时间</label><span class="input-width record-right" type="text">{{record.ctime}}</span></li>
          <li><label class="label-width record-left">状态</label><span class="input-width record-right" type="text">{{record.status|rechargeStatus}}</span></li>
          <li><label class="label-width record-left">充值金额(元)</label><span class="input-width record-right" type="text">{{record.amount}}</span></li>
          <li><label class="label-width record-left">到账金额(元)</label><span class="input-width record-right" type="text">{{record.real_amount}}</span></li>
          <li><label class="label-width record-left">处理时间</label><span class="input-width record-right" type="text">{{record.verifytime}}</span></li>
          <li><label class="label-width record-left">支付流水号</label><span class="input-width record-right" type="text">{{record.ticket_no}}</span></li>
          <li><label class="label-width record-left">备注</label><span class="input-width record-right" type="text">{{record.bak}}</span></li>
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
  import rechargeStatus from '../../../filters/rechargeStatus'

  export default {
    data () {
      return {
        record: {
          id: 0,
          ticket_no: 0,
          amount: 0,
          status: 1,
          bak: "",
          ctime: 0,
          verifytime: 0,
          smt_time: 0,
          real_amount: 0
        }
      }
    },
    mixins: [viewMixin],
    components: {
      titleBar
    },
    filters: {
      rechargeStatus
    },
    created () {
      Api.getUserRechargeDetail.call(this, {
        data: {
          id: this.$route.params.id
        },
        resolve: function (json) {
          if (json.boolen == 1) {
            this.record = json.data
          }
        }
      })
    },
  }
</script>

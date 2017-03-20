<template>
  <div>
    <div class="detail-foot-btn" @click="goInvest()" :class="{gray: !opts.btnIsTrue}">
      <span class="handle" @click.stop="goCalc">
      <i class="icon-pull-handle"></i></span>
      <em>{{btnFont()}}</em>
    </div>
    <template v-if="isShowPop">
      <div class="mask"></div>
      <div class="popup-box remain-lack">
        <h1>余额不足，请先充值</h1>
        <div class="login-pwd">
          <p class="topup"><a href="javascript:" @click="this.isShowPop = false" class="add-border">取消</a><a class="blue" v-link="{name:'recharge'}">去充值</a></p>
        </div>
      </div>
    </template>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import transfer from '../../services/transferService'

  export default{
    props: {
      opts: Object
    },
    data () {
      return {
        isShowPop: false,
        isSaveData: true // 跳到计算器页用不用保存到localstorage
      }
    },
    ready: function(){
      var id = this.$route.params.prj_id;
      var localData = transfer.get('investBtn');
      if(localData && localData.prj_id === id) {
        this.isSaveData = false;
      }
    },
    components: {
    },
    methods: {
      // 调用计算器
      goCalc: function(e) {
        if(this.isSaveData) {
          transfer.set('investBtn', this.opts)
        }
        this.$router.go({name: 'investCalculator', parmas: {prj_id: this.opts.prj_id}});
      },
      // 进入投资页面
      goInvest: function() {
        // 不可点的就什么也不作
        if(!this.opts.btnIsTrue || this.moneyIsLess()) return ;

        // 这个是弹框的
        if(this.opts.isStartWarn) {
          console.log('开标提醒')
          return;
        }
        // 跳到投资页
        this.$router.go({
          name: 'investDeepDetails',
          params: {
            parmas: {prj_id: this.opts.prj_id}
          }
        })
      },
      // 检查余额不足
      moneyIsLess: function() {
        var state = false;
        // 不足
        if(this.opts.is_balance_less == 1) {
          this.isShowPop = state = true;
        }
        return state;
      },
      btnFont: function() {
        var ref = '立即投资';
        if(this.opts.isStartWarn) {
          ref = '开标提醒'
        }
        if(this.opts.isPresell) {
          ref = '预售投资'
        }

        return ref;
      }
    }
  }
</script>

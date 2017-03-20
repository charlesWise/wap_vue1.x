<template>
  <div class="calculator-wrap fixed-headbar">
    <title-bar title="计算器"></title-bar>
    <section class="calculator">
      <div class="head">
        <ul>
          <li class="border-right"><h1>{{item.rate}}<span class="add" v-if="item.reward_money_rate">+{{item.reward_money_rate}}</span>%</h1><p>年化利率</p></li>
          <li><h1>{{item.time_limit}}</h1><p>期限</p></li>
        </ul>
      </div>
      <div class="content">
        <div class="calc-input"><input class="field" @focus="removeData" v-model="item.money" type="number" placeholder="投资金额"><input class="btn" type="button" value="计算" @click="calc"></div>
        <div class="principal-area">
          <h2>到期本息(元)</h2>
          <h1>{{item.earnings}}</h1>
          <p><a @click.prevent="goInvest" :class="{blue: item.isSale}">直接投资</a></p>
        </div>
      </div>
    </section>
  </div>
</template>
<style lang="sass">
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  import transfer from '../../services/transferService'
  

  export default{
    data () {
      return {
        item: {}
      }
    },
    components: {
      TitleBar
    },
    ready: function() {
      var obj = transfer.get('investBtn');
      obj.earnings = obj.isSale = '';
      obj.money = this.getLocalMoney();
      this.item = obj;
      if(obj.money) {
        this.calc();
      }
    },
    methods: {
      getLocalMoney: function() {
        var investMoney = transfer.get('investMoney') || {};
        var ref = '';
        if(investMoney.prj_id == this.$route.params.prj_id) {
          ref = investMoney.money
        }
        return ref;
      },
      removeData: function() {
        this.item.earnings = '';
        this.item.isSale = '';
      },
      calc: function() {
        if(!this.item.money) return
        var opts = {
          resolve: function(d) {
            if(d.boolen) {
              var state = this.item.is_balance_less == 0 && this.item.is_biding && parseFloat(d.data);
              this.item.earnings = d.data;
              this.item.isSale = state;
            }
          },
          data: {
            prj_id: this.item.prj_id,
            money: this.item.money
          }
        }
        Api.calculator.call(this, opts);
      },
      // 进行投资
      goInvest: function() {
        if(!this.item.isSale) return;
        transfer.set('investMoney', {
          prj_id: this.item.prj_id,
          money: this.item.money
        });
        this.$router.go({
          name: 'investDeepDetails',
          params: this.$route.params
        })
      }
    }
  }
</script>

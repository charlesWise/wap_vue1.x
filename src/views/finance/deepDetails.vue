<template>
  <section class="invest-type-content fixed-headbar">
    <template v-if="show">
      <title-bar title="投资" rightlink='协议'></title-bar>
        <dl>
          <dt>垫资贷<span>{{item.prj_no}}</span></dt>
          <dd>
            <p>项目期限：<em>{{item.time_limit}}</em></p>
            <p>预期年化利率：<em>{{item.rate}}<em class="font12" v-if="item.reward_money_rate">+{{item.reward_money_rate}}</em> %</em></p>
            <p>剩余可投：<em>{{item.remaining_amount}}</em></p>
          </dd>
        </dl>
      </section>
      <section class="set-items">
          <form action="">
            <ul>
              <li><label class="label-width">金额</label><input v-model="money" class="input-width" type="number" placeholder="至少投{{item.min_bid_amount}}元" ></li>
            </ul>
            <div class="remain-bill"><span>账号余额：<i>{{item.top_amount_view}}</i>元</span><em><a v-link="{name:'recharge'}">充值</a></em></div>
            <div class="submit-button"><input @click="submit" :class="{blue: money > 0}" type="button" value="立即投资" /></div>
          </form>
      </section>
      <template v-if="item.isShowPop">
        <div class="mask"></div>
        <div v-if="showDetail" class="popup-bottom">
          <h3><span @click='item.isShowPop = false' class="icon-close"></span>投资详情</h3>
          <div class="details-box">
            <section class="set-items wipe-pt">
              <ul>
                <li><em class="tit">投资金额</em><span>{{item.money}}元</li>
                <li><em class="tit">使用金额</em><span>{{item.investMoney}}元</li>
                <li v-if="item.tickets && item.tickets.length" v-link="{name: 'investTickets'}"><em class="tit">使用奖励</em><small v-if="item.tickets.length">{{item.tickets.length}}个可用</small><span>{{item.recomTicketDisplay}}<i class="arrow-r"></i></li>
                <li><em class="tit">到期收益</em><span class="addbold">{{item.profit}}元 </li>
              </ul>
            </section>
            <div class="go-checkbox"><input v-model="item.choice" class="choice" type="checkbox">同意&lt;{{item.protocol_name}}&gt;协议</div>
            <div class="submit-button"><input @click="confirmInvest" :class="{blue: item.choice}" type="button" value="确认付款" /></div>
          </div>
        </div>
        <div v-if="showPay" class="popup-bottom confirmInvestPayment">
          <h3 class="caption"><span @click="changePop" class="icon-back"></span>输入密码</h3>
          <section @click="this.$els.password.focus()" class="payment-box">
            <div class="small-pwd">
              <span :class="{active: payPasswordLen > 0}"><em>•</em></span>
              <span :class="{active: payPasswordLen > 1}"><em>•</em></span>
              <span :class="{active: payPasswordLen > 2}"><em>•</em></span>
              <span :class="{active: payPasswordLen > 3}"><em>•</em></span>
              <span :class="{active: payPasswordLen > 4}"><em>•</em></span>
              <span :class="{active: payPasswordLen > 5}"><em>•</em></span>
            </div>
            <input v-el:password @keyup="payCheck()" class="inputPassword" v-model="inputPassword" type="number">
            <div v-if="passwordErrorMsg" class="input-number">{{passwordErrorMsg}}</div>
          </section>
        </div>
      </template>
    </template>
  </section>
</template>
<style>
  .confirmInvestPayment .small-pwd{
    display: -webkit-flex;
  }
  .confirmInvestPayment .small-pwd span{
    width: auto;
    float: none;
    -webkit-flex: 1;
  }
  .confirmInvestPayment .small-pwd span:last-child{
    border:0;
  }
  .confirmInvestPayment .small-pwd span em{
    display: none;
  }
  .confirmInvestPayment span.active em{
    display:block;
  }
  .inputPassword{
    height: 0;
    width:0;
    outline:0;
  }
  .payment-box .input-number{
    padding:0 0 20px;
  }
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  import formService from '../../services/formService'
  import transfer from '../../services/transferService'
  import userService from '../../services/userService'
  var investForm = formService.getForm('investForm');

  export default{
    data () {
      return {
        show: false,
        showDetail: true,
        item: {},
        showPay: false,
        money: null,
        inputPassword: '',
        payPasswordLen: 0,
        isPaying: false,
        passwordErrorMsg: '' // 密码错误信息
      }
    },
    ready () {
      this.getDate();
    },
    components: {
      TitleBar
    },
    methods: {
      // 获取详情页数据
      getDate: function() {
        var self = this;
        if(investForm.prj_id == this.$route.params.prj_id) {
          fillData();
        } else {
          var opts = {
          resolve: function(d) {
            fillData(d.data);
          },
            data: this.$route.params
          }
          Api.payPrjDetail.call(this, opts);
        }

        // 添加数据
        function fillData(d) {
          // 计算器页代来的投资额度
          var calcData = transfer.get('investMoney') || {};
          var calcMoney = '';
          if(calcData.prj_id == self.$route.params.prj_id) {
            calcMoney = calcData.money
          }

          if(d) {
            Object.forEach(investForm, function(k) {
              delete investForm[k]
            })
          }

          Object.assign(investForm, d);
          self.money = investForm.money = calcMoney || investForm.money || null;
          investForm.rewardTypeMap = {
            0: {
              k: 'no_use',
              v: '未使用奖励'
            },
            1: {
              k: 'hongbao',
              v: '红包'
            },
            2: {
              k: 'manian',
              v: '满减券'
            },
            3: {
              k: 'jiaxi',
              v: '加息券'
            }
          }
          investForm.isShowPop = investForm.isShowPop || false;
          investForm.choice = investForm.choice == undefined ? true : investForm.choice;

          self.item = investForm;
          self.show = true;
        }
      },
      // 提交投资
      submit: function() {
        if(!this.money) return;
        investForm.money = this.money;
        Api.pbuyCheck.call(this, {
          resolve: function(d) {
            if(d.boolen) {
              d = d.data;
              // 取出红包数据
              var tickets = d.reward_info;
              investForm.reward_id = ''; // 红包ID
              investForm.profit = d.income; // 收益
              investForm.reward_type = 0; // 红包类型
              investForm.recomTicketDisplay = '未使用奖励' // 红包类别显示文字
              investForm.investMoney = investForm.money; // 实际投资金额
              investForm.tickedSelectIndex = -1; // 当前红包在tickets中的位置

              // 这时有红包数据, 添加相应的数据, 只要有红包就一定有推荐的
              if(!tickets.hasOwnProperty('reward_type')) {
                var tuijian = tickets['tuijian'];
                var bagType = investForm.reward_type = tuijian.reward_type;
                var ticketList = investForm.tickets = tickets.hongbao.concat(tickets.manian, tickets.jiaxi); // 券列表
                investForm.reward_id = tuijian.reward_id;
                investForm.profit = tuijian.profit;
                investForm.recomTicketDisplay = investForm.rewardTypeMap[bagType].v;
                investForm.investMoney = investForm.money - (tuijian.amount || 0);
                investForm.no_use = tickets.no_use; // 不用红包时的数据

                var tuijianInArr = tickets[investForm.rewardTypeMap[bagType].k][0]; // 取数组中对应的推荐券
                tuijianInArr.isRecom = 1; // 当前红包加个isRecom方便下面循环

                ticketList.forEach(function(item, index) {
                  if(item.isRecom) {
                    delete item.isRecom;
                    investForm.tickedSelectIndex = index;
                  }
                })
              }
              this.item = investForm;
              investForm.isShowPop = true; // 弹出框
            }
          },
          data: {
            prjid: investForm.prj_id,
            money: investForm.money,
            is_pre_buy: investForm.is_pre_sale == 1
          }
        })
      },
      // 确认付钱
      confirmInvest: function() {
        if(!this.item.choice) return;
        this.showDetail = false;
        this.showPay = true;
        this.$nextTick(function() {
          this.$el.querySelector('.inputPassword').focus();
        })
      },
      // 支付与详情之间切换
      changePop: function() {
        this.showDetail = true;
        this.showPay = false;
        this.passwordErrorMsg = '';
        this.inputPassword = '';
        this.payPasswordLen = 0;
      },
      // 输入支付密码
      payCheck: function() {
        var len = this.payPasswordLen = this.inputPassword.length;
        if(len >= 6) {
          this.inputPassword = this.inputPassword.slice(0, 6);
          this.payPasswordLen = 6;
        }
        if(len == 6 && !this.isPaying) {
          this.isPaying = true;
          var uid = userService.getAttr('uid');
          Api.checkPayPassword.call(this, {
            resolve: function(d) {
              if(d.boolen) {
                sumitOrder.call(this);
              } else {
                this.passwordErrorMsg = d.message;
              }
              this.isPaying = false;
            },
            data: {
              uid: uid,
              payPassword: this.inputPassword
            },
            isHideErrorPop: true
          })

          function sumitOrder() {
            Api.pbuyN.call(this, {
              resolve: function(d) {
                if(d.boolen) {
                  this.$router.go({
                    name: 'invesRresult'
                  })
                }
              },
              data: {
                money: investForm.money,
                prj_id: investForm.prj_id,
                paypwd: this.inputPassword,
                reward_id: investForm.reward_id,
                reward_type: investForm.reward_type
              }
            })
          }
          
        }
      }
    },
    computed:{
    },
    events: {
      // 点右上角 协议 触发
      'click-right-link': function() {
        this.$router.go({
          name: 'investProtocol'
        })
      }
    }
  }
</script>

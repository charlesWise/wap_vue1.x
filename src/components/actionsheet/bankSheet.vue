<template>
<div class="actionsheet_wrap">
  <div class="ui_mask_transition" :class="{'ui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>
  <div class="popup-bottom" :class="{'ui_actionsheet_toggle': show}">
    <h3 v-if="showCancel" @click="show=false"><span class="icon-close"></span>{{title}}</h3>
    <ul class="withdraw-ui">
      <li v-for="(key, obj) in menus" @click="dispatchEvent('bank-choose', key)">
        <p>
          <i class="bank-{{obj.bank}}"></i>
          <em>{{obj.bank_name}}(尾号{{obj.account_no_short}})<br /><small>充值上限{{obj.single_sign}}元</small></em>
          <span :class="{'select-character': selected==0}"></span>
        </p>
      </li>
      <li v-link="{name: 'addBank'}"><p class="new-card">使用新卡提现<i class="arrow-r"></i></p></li>
    </ul>
  </div>
</div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true,
        default: false,
        twoWay: true
      },
      showCancel: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '选择充值方式'
      },
      menus: {
        type: Array,
        required: false,
        default: []
      }
    },
    data () {
      return {
        selected: 0
      }
    },
    methods: {
      dispatchEvent (event, menu) {
        if (event === 'menu-click') {
          this.$dispatch(event, menu)
          this.selected = menu
          this.show = false
        }
      }
    }
  }
</script>

<style>
  .ui_mask_transition{
    position: fixed;
    z-index: 1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: none;
    background: transparent;
    -webkit-transition: background .3s;
    transition: -webkit-transform .3s;
  }
  .ui_fade_toggle{
    background: rgba(0, 0, 0, 0.6);
  }

  .popup-bottom {
    position: fixed;
    left: 0;
    bottom: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    z-index: 2;
    width: 100%;
    -webkit-transition: -webkit-transform .3s;
    transition: transform .3s,-webkit-transform .3s;
  }

  .ui_actionsheet_toggle {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
</style>

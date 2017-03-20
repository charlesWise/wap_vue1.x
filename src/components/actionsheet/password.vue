<template>
  <div class="actionsheet_wrap">
    <div class="ui_mask_transition" :class="{'ui_fade_toggle': show}" :style="{display: show ? 'block' : 'none'}" @click="show=false"></div>

    <div class="popup-bottom" :class="{'ui_actionsheet_toggle': show}">
      <h3 v-if="showCancel" @click="show=false" class="caption"><span class="icon-back"></span>输入密码</h3>
      <section class="payment-box">
        <div class="small-pwd">
          <span v-for="n in 5"><em :class="{'hide': n+1>len}">•</em></span>
          <span class="del-border"><em class="hide" :class="{'hide': len<6}">•</em></span>
        </div>
        <div class="keyboard">
          <ul>
            <li v-for="n in 9" class="num" @click="input(n+1)">{{n+1}}</li>
            <li class="gray"><span>占位</span></li>
            <li class="num" @click="input(0)">0</li>
            <li class="del-num gray" @click="delete"><i class="icon-cutout"></i></li>
          </ul>
        </div>
      </section>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'

  const {
    addClass,
    removeClass
    } = Vue.util

  const DONE = 'password-done'

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
      }
    },
    data () {
      return {
        selected: 0,
        len: 0,
        pwd: ''
      }
    },
    methods: {
      input (n) {
        if (this.len < 6) {
          this.len++
          this.pwd += n

          if (this.len == 6) {
            this.dispatchEvent(DONE, this.pwd)
          }
        }
      },
      delete (event) {
        if (this.len > 0) {
          this.len--
          this.pwd = this.pwd.substr(0, this.len)
        }
      },
      dispatchEvent (event, menu) {
        if (event === DONE) {
          this.$dispatch(event, menu)
          this.len = 0
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

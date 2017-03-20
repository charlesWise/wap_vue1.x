<template>
  <div id="wrap">
    <!--<app-header :show="header.show">{{header.title}}</app-header>-->
    <router-view class="view" transition="translate" transition-mode="out-in"></router-view>

    <app-footer :show="footer.show"></app-footer>

    <!--<toast :show.sync="toastData.show" :time=10000000>{{toastData.msg}}</toast>-->
    <alert :show.sync="alertData.show" title="提示">{{alertData.msg}}</alert>
    <x-load :show.sync="loadingData.show"></x-load>
  </div>
</template>

<script>
  import AppHeader from './components/Header.vue'
  import AppFooter from './components/Footer.vue'
  import Alert from 'vux/components/alert'
  import Conf from './constants/config'
  import FastClick from 'fastclick'
  import XLoad from './components/common/loading/index.vue'

  export default {
    components: {
//      Toast,
      Alert,
      XLoad,
      AppHeader,
      AppFooter
    },
    data () {
      return {
        header: Conf.header,
        footer: Conf.footer,
        toastData: Conf.toast,
        alertData: Conf.alert,
        loadingData: Conf.loading
      }
    },
    ready () {
      // 解决点击事件300ms延时问题
      FastClick.attach(document.body)
    }
  }
</script>

<style lang="sass">
@import '~vux/vux.css';
@import "./assets/scss/common.scss";

.base-view{
  position: absolute;
  bottom: 0;
  width:100%;
  left:0;
  top:0;
}
.base-view.hasHeadBar{
  top: 48px;
}
.base-view.hasInvestBar{
  top: 72px;
  bottom: 46px;
}
.base-view.hasInvestBar.hasInvestBar-big{
  top: 159px;
}


#wrap{
  height: 100%;
  width: 100%;
}
.main{
  min-height: 100%;
}
.line{
  line-height: 30px;
}
.view {
  transition: all .4s ease;
}
.translate-enter, .translate-leave {
  opacity: 0;
  transform: translate(10px, 0);
}

.fade-transition {
  transition: opacity .3s ease;
}
.fade-enter, .fade-leave {
  opacity: 0;
}
</style>

<template>
  <div class="main">
    <!--<p v-for="item in list">{{item.id}}<br></p>-->
    <!--<div class="loading">加载中</div>-->

    <x-scroll lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" :style="{height:scrollHeight+'px'}"  @pullup:loading="getScrollData">
      <div class="box2">
        <p v-for="item in list">{{item.id}}<br></p>
      </div>
    </x-scroll>
  </div>
</template>
<style lang="sass">
  .loading{
    text-align: center;
    margin-bottom: 100px;
  }
</style>
<script>
  import { functions } from '../../utils/functions'
  import Api from '../../services/api'
  import XScroll from 'vux/components/scroller'

  export default{
    data () {
      return {
        title: '下拉刷新',
        p: 1,
        prjType: 1,
        list: [],
        pullupConfig2: {
          content: '下拉刷新',
          downContent: '下拉刷新',
          upContent: '释放刷新',
          loadingContent: '加载中'
        },
        scroll: true,
        loaded: false,
        scrollHeight: 0
      }
    },
    created () {
      functions.setHeader(this.title)
      this.plist()
      this.scrollHeight = document.documentElement.clientHeight - 120
    },
    detached () {
    },
    components: {
      XScroll
    },
    methods: {
      test () {
        window.alert('haha')
      },
      getScrollData (uuid) {
        if (this.scroll) {
          this.scroll = false
          this.plist(broadcast)
        }

        var _this = this
        function broadcast () {
          setTimeout(function () {
            _this.$broadcast('pullup:reset', uuid)
          }, 10)
        }
      },
      plist: function (cb) {
        let data = {
          p: this.p,
          page: this.p,
          prjtype: this.prjtype
        }
        function resolve (data) {
          this.p++
          this.scroll = true
          let newList = data.data.list
          let len = newList.length
          for (var i = 0; i < len; i++) {
            this.list.push(newList[i])
          }

          cb && cb()
        }
        let options = {
          data: data,
          resolve: resolve
        }
        Api.plist.call(this, options)
      }
    }
  }
</script>

<template>
  <div class="main" style="position: absolute;height: 100%;width:100%;left:0;">
    <div id="scroll">
    haha

    <div class="item" v-for="item in list">{{item.id}}<br></div>

    <div class="loading">加载中</div>
    </div>
  </div>
</template>
<style lang="sass">
  .loading{
    text-align: center;
    margin-bottom: 100px;
  }
  #scroll{
    position: relative;

  }
  .item{
    height: 200px;
    background-color: #444;
    color: white;
    width: 100%;
    margin-top: 10px;
  }
</style>
<script>
  import { functions } from '../../utils/functions'
  import Api from '../../services/api'
  import iScroll from 'iscroll'

  export default{
    data () {
      return {
        title: '下拉刷新',
        p: 1,
        prjType: 1,
        list: [],
        scroll: true,
        loaded: false,
        myScroll: {}
      }
    },
    created () {
      functions.setHeader(this.title)
    },
    ready () {
      this.myScroll = new iScroll(this.$el)
    },
    detached () {
    },

    route: {
      data (transition) {
        if (!this.loaded) {
          this.loaded = true
          this.plist()
        }
        var touchup = 'ontouchend' in window ? 'touchend' : 'mouseup'
        window.addEventListener(touchup, this.getScrollData, false)
        window.addEventListener('scroll', this.getScrollData, false)
      },
      deactivate (transition) {
        var touchup = 'ontouchend' in window ? 'touchend' : 'mouseup'
        window.removeEventListener(touchup, this.getScrollData, false)
        window.removeEventListener('scroll', this.getScrollData, false)
        transition.next()
      }
    },
    methods: {
      test () {
        window.alert('haha')
      },
      getScrollData () {
        function getPageHeight () {
          var client = document.compatMode === 'BackCompat' ? document.body : document.documentElement
          return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, client.clientHeight)
        }
        if (this.scroll) {
          let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(window.scrollY)
          if (getPageHeight() <= totalheight + 200) {
            this.scroll = false
            this.plist()
          }
        }
      },
      plist: function () {
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
          this.$nextTick(()=>{this.myScroll.refresh()})

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

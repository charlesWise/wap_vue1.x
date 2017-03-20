<!-- 
  分发内容
  <div slot="list"></div>
  加载中
  <div slot="loading"></div>
  没更多内容
  <div slot="noMore"></div>
  没内容
  <div slot="noData"></div>
  
  触发几种事件
  pullup:nodata: 没数据时
  pullup:parseData: 对ajax返回的格式进行整理, 主要用于解析页码相关
  pullup:completed: 每次拉取数据成功后调用，这时还没加入到lists中，把新拉取的数据作为参数传入
  pullup:last: 最后一页了
 -->
<template>
  <div class="pull-up">
    <div class="pull-up-list" v-el:list>
      <slot name="list"></slot>
    </div>
    <div class="pull-up-loading" v-if="isScrolling">
      <slot name="loading">加载中...</slot>
    </div>
    <div class="pull-up-noMore" v-if="isLastPage">
      <slot name="noMore">没有更多内容</slot>
    </div>
    <div class="pull-up-noData" v-if="isNoData">
      <slot name="noData">暂无内容</slot>
    </div>
  </div>
</template>
<style>
  .pull-up-noData, .pull-up-loading, .pull-up-noMore {
    text-align: center;
    line-height: 3rem;
    font-size: 1.4rem;
    padding-bottom: 10px;
  }
</style>
<script>
  import { functions, alert as Alert } from '../../../utils/functions'
  import Api from '../../../services/api'

  const isTouch = 'ontouchend' in document;
  const touchend = isTouch ? 'touchend' : 'mouseup'
  const windowHeight = document.documentElement.clientHeight
  const offsetBottom = 50; // 距离最底部距离
  var scrollNode;

  // 计算IScroll是否滑动到最下边
  function isScrollToBottom() {
    // 未用iscroll则判断原始滚动
    if(!scrollNode) return getScrollHeight();

    var h = scrollNode.clientHeight; // 总高度
    var scrollTop = (scrollNode.style.transform.match(/-([^p])+/) || [0])[0]; // 滚动过的高度

    return h - Math.abs(scrollTop) - windowHeight <= offsetBottom;
  }

  // 用body判断是否scroll到底部
  function getScrollHeight () {
    let client = document.compatMode === 'BackCompat' ? document.body : document.documentElement;
    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, client.clientHeight);
    // 获取当前位置
    let totalheight = windowHeight + window.scrollY;
    return scrollHeight <= totalheight + offsetBottom;
  }

  export default{
    props: {
      isInit: {
        type: Boolean,
        default: true
      },
      api: {
        type: String,
        default: ''
      },
      params: {
        type: Object,
        default: Object
      },
      method: {
        type: String,
        default: 'get'
      }
    },
    data () {
      return {
        p: 1,
        pagesize: 10,
        isScrolling: false,
        isNoData: false,
        isLastPage: false,
        setting: {}
      }
    },
    ready () {
      scrollNode = document.querySelector('.scrollNode');
      this.init()
    },
    // 移除dom的时候去掉
    detached () {
      this.removeEvent();
    },
    // 销毁时触发
    destroyed() {
      this.removeEvent();
    },
    events: {
      'IScroll:end': function(scrollObj) {
        this.getScrollData();
      }
    },
    methods: {
      addEvent: function () {
        window.addEventListener(touchend, this.getScrollData, false)
        window.addEventListener('scroll', this.getScrollData, false)
      },
      removeEvent: function() {
        window.removeEventListener(touchend, this.getScrollData, false)
        window.removeEventListener('scroll', this.getScrollData, false)
      },
      init: function() {        
        this.addEvent();
        this.$dispatch('IScroll:top')
        if (!this.isInit) {
          return false
        }

        // 拼合参数, 这样方便监控传入参数修改后重置各参数
        this.finalParams = Object.assign({
          pagesize: this.pagesize,
          p: this.p
        }, this.params);

        this.settings = {
          method: this.method,
          data: this.finalParams,
          resolve: function (d) {
            if (d.boolen) {
              let list = []
              let page = {}

              // 统一页码格式
              if (!d.data.page) {
                page = this.keepPageSame(d.data)
              }
              // 还可以手工整理页码格式
              this.$dispatch('pullup:parseData', d);

              if (!d.data.list) {
                list = d.data.data;
              } else {
                list = d.data.list;
              }

              let totlaPage = page.total_page
              let curPage = page.current_page

              this.isScrolling = false;

              // 页码不对则什么也不作
              if (curPage != this.finalParams.p) {
                return false
              }

              // 只有当第一次请求就没数据时
              // 才会触发这里，因为如果是最后一页再请求下一页是不会发请求的
              if (!list.length) {
                this.isNoData = true
                this.$dispatch('pullup:nodata');
                this.$dispatch('pullup:last');
                return false
              }

              // 非最后一页
              if (totlaPage >= curPage + 1) {
                this.finalParams.p = ++curPage;
              } else {
                // 最后一页了, 没数据
                this.removeEvent();
                this.$dispatch('pullup:last');
                this.isLastPage = true;
              }
              this.$dispatch('pullup:completed', list)
            }
            

            this.$nextTick(function () {
              let listDiv = this.$els.list
              if (listDiv.offsetHeight < windowHeight) {
                this.getList()
              }
            })
          }
        }
        this.getList()
      },
      // 获取数据
      getList: function () {
        this.isScrolling = true;
        Api[this.api].call(this, this.settings)
      },
      // 重新添加配制项
      reset: function() {
        this.removeEvent()
        this.resetData()
        this.init()
      },
      resetData () {
        this.isScrolling = false
        this.isNoData = false
        this.isLastPage = false
      },
      // 检查是否满足上拉条件
      getScrollData () {
        if(this.isScrolling || this.isLastPage) return false;
        if (isScrollToBottom()) {
          this.getList()
        }
      },
      keepPageSame: function (data) {
        return {
          total_page: data.total_page || data.totalPages,
          current_page: data.current_page || data.nowPage
        }
      }
    },
    watch: {
      //切换tab时reset
      'params':{
        handler: function(){this.reset()},
        deep: true
      },
      'api': function(){this.reset()},
      'method': function(){this.reset()}
    }
  }
</script>

<!-- 
  调用方法
  下面inline-template不能省，是为了把里面的内容作为子模板时调用
  子模板要有个根元素，即pull-up下只能有一个根元素，因为，多个的话this.$el取到将是注释之类的
  lists就是数据列表
  <pull-up :opts="pullOpts" inline-template>
    <section>
      <article v-for="item in lists">
      </article>
    </section>
  </pull-up>
  
  opts 包括
  port: ajax名字
  params: 提交的数据
  parseData: 只解析list数据
  parseAllData: ajax取得数据后先通过这个处理 
  默认处理格式:{
    data:{
      list:[],
      page: {
        total_page: 总页数，
        current_page: 当前页
      }
    }
  }

  childData: 这里的都会被加到this里

  触发几种事件
  pullup:nodata: 没数据时
  pullup:completed: 每次拉取数据成功后调用，这时还没加入到lists中，把新拉取的数据作为参数传入
  pullup:last: 最后一页了

  如果要自定义
  数据为空的样式 则<div nodata>xxxx</div> 默认 暂无数据
  更新中的样式  则<div loadding></div> 默认 加载中
 -->
<style>
  .loading,.no-data{
    text-align: center;
    padding: 20px 0;
    font-size:16px;
  }
</style>
<script>
  import { functions, alert as Alert } from '../../../utils/functions'
  import Api from '../../../services/api'
  import WaveCircle from '../../../components/finance/WaveCircle.vue'
  import CountDown from '../../common/countdown'
  import QuestionItem from '../../../components/QuestionItem'

  export default{
    props: {
      opts: Object
    },
    components:{
      WaveCircle,
      CountDown,
      QuestionItem
    },
    data () {
      return {
        lists: [], // data.list里的数据
        isScrolling: false,
        isNoData: false,
        isLastPage: false,
        params: {},
        allData: {} // 返回data里所以的数据
      }
    },
    // 编译前加下 加载中/暂无数据 状态
    beforeCompile () {
      var elem = this.$el,
          map = {
            nodata:{
              text: '<p v-if="isNoData && !isScrolling" class="no-data">暂无数据</p>',
              ifVal: 'isNoData && !isScrolling'
            },
            // loadding:{
            //   text: '<div v-if="isScrolling" class="loading">加载中</div>',
            //   ifVal: 'isScrolling'
            // }
          },
          str = '';

      Object.forEach(map, function(k, v) {
        var node = elem.querySelector("[" + k + "]");
        if(node) {
          node.setAttribute('v-if', v.ifVal);
        } else {
          str += v.text;
        }
      })

      if(str) {
        var frame = document.createElement('div');
        frame.innerHTML = str;
        var nodes = [].slice.call(frame.children);
        nodes.forEach(function(item) {
          elem.appendChild(item);
        });
      }
    },
    // 插入dom的时候加事件
    attached () {
      var isTouch = this.isTouch = 'ontouchend' in document;
      var touchend = isTouch ? 'touchend' : 'mouseup'

      window.addEventListener(touchend, this.getScrollData, false)
      window.addEventListener('scroll', this.getScrollData, false)

      this.init();
    },
    // 移除dom的时候去掉
    detached () {
      this.removeEvent();
    },
    methods: {
      removeEvent: function() {
        var isTouch = this.isTouch;
        var touchend = isTouch ? 'touchend' : 'mouseup'
        window.removeEventListener(touchend, this.getScrollData, false)
        window.removeEventListener('scroll', this.getScrollData, false)
      },
      init: function() {
        this.lists = [];
        this.isScrolling = false;
        this.isNoData = false;
        this.isLastPage = false;
        
        //把methods里的方法加到this里
        if(this.opts.childData) {
          var self = this;
          Object.forEach(this.opts.childData, function(k, v) {
            self[k] = v;
          })
        }
        this.port = this.opts.port;
        this.params = Object.assign({pagesize: 10, p: 1}, this.opts.params);
        this.parseData = this.opts.parseData || function(){};
        this.parseAllData = this.opts.parseAllData || function() {};
        this.settings = {
          resolve: function(d) {
            if(d.boolen) {
              this.parseAllData(d);
              // 统一格式
              if(!d.data.page) {
                d.data.page = this.keepPageSame(d.data)
              }
              this.allData = d.data;
              if(!d.data.list) d.data.list = d.data.data
              this.parseData(d.data.list);
              this.$dispatch('pullup:completed', d.data.list);
              var allLists = this.lists.concat(d.data.list);
              var totlaPage = d.data.page.total_page
              var curPage = d.data.page.current_page
              

              // 页码不对则什么也不作
              if(curPage != this.params.p) return;
              // 没值了，
              if (!allLists.length) {
                this.isNoData = true;
                this.$dispatch('pullup:nodata');
                return ;
              }

              // 判断是不是最后一页
              if (totlaPage >= curPage + 1) {
                this.params.page = this.params.p = ++curPage;           
              } else {
                // 最后一页了, 没数据
                this.removeEvent();
                this.$dispatch('pullup:last');
                this.isLastPage = true;
              }
              this.lists = allLists;
            }
            this.isScrolling = false;
          },
          reject: function(d) {
            if(Object.isString(d)) {
              d = {message: d}
            }
            Alert.show(d.message)
          },
          data: this.params
        }
        this.getList();
      },
      // 检查是否满足上拉条件
      getScrollData () {
        if(this.isScrolling) return;

        // 获取当前位置
        let totalheight = parseFloat(document.documentElement.clientHeight) + parseFloat(window.scrollY)
        if (this.getSrollHeight() <= totalheight + 200) {
          this.getList()
        }
      },
      // 获取页面高度
      getSrollHeight: function() {
        var client = document.compatMode === 'BackCompat' ? document.body : document.documentElement
        return Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, client.clientHeight)
      },
      // 获取数据
      getList: function () {
        this.isScrolling = true;
        Api[this.port].call(this, this.settings)
      },
      keepPageSame: function (data) {
        return {
          total_page: data.total_page || data.totalPages,
          current_page: data.current_page || data.nowPage
        }
      }
    },
    filters:{
      statusToCatlog: function(status){
        var text = ""
        switch(status){
          case '1': text = "充值"; break;
          case '2': text = "投资"; break;
          case '3': text = "回款"; break;
          case '4': text = "提现"; break;
          case '5': text = "奖励"; break;
          case '6': text = "变现交易"; break;
        }
        return text
      },
      activityStatusFilter: function(status){
        switch(status){
          case 0: return "即将开启";
          case 1: return "火热进行";
          case 2: return "活动结束";
        }
      }
    },
    events:{
      countDownFinish: function() {
        this.init();
      }
    },
    watch: {
      'opts':{
        handler: function() {this.init();},
        deep: true
      }
    }
  }
</script>

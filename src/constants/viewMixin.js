/**
 * Created by xuxin on 16/5/3.
 *
 * 
 * v-scrolltop加了touchstart事件，点了后滚动到顶部，300为滚动时间
 * <p v-scrolltop.300>top</p>
 *
 * 滚动到#abc位置，300为时间，如果没#abc则跳到顶部
 * <p v-scrollelem:#abc.300>top</p>
 *
 * 
 */
//import IScroll from 'iscroll'
import IScroll from '../lib/iscroll'
import empty from '../filters/empty'
import formValidate from '../directive/formValidate'

export default {
  data () {
    return {
      scroll: {},
      //iscroll的滚动区域
      scrollBar: Object,
      oldHeight: 0,
      // 页面数据加载完成后有没有触发过从新计算滚动条
      // 没触发直接events里滚动则会页面跳却是，无法达到目的
      isTriggeredRefresh: false
    }
  },
  filters: {
    empty
  },
  directives: {
      formValidate: formValidate
    },
  attached () {
    let self = this
    let scrollElem = self.$el.querySelector('[role="IScroll"]') || self.$el;
    scrollElem.classList.add('base-view');

    this.scrollWrap = scrollElem;
    this.scrollBar = scrollElem.firstElementChild;
    // 方便计算滚动位置
    this.scrollBar.classList.add('scrollNode');
    // 为IScroll作必要的css设置
    this.oldHeight = this.scrollBar.clientHeight;
  },
  ready (){
    var self = this;
    // 如果放到attached时的话，因为是刚插入到文档会有个动画效果
    // 放这里不会
    this.scroll = new IScroll(this.scrollWrap, {onScrollEnd:function() {self.$broadcast('IScroll:end', self)}})
    this.scrollBar.addEventListener('touchstart', this.resetScroll);
  },
  methods: {
    resetScroll: function(e) {
      var h = this.scrollBar.clientHeight;
      if(h != this.oldHeight) {
        this.isTriggeredRefresh = true;
        this.scroll.refresh();
        this.oldHeight = h;
      }
    },
    isCanScroll: function() {
      if(!this.scroll.scrollTo) return false;
      !this.isTriggeredRefresh && this.resetScroll();
      return true;
    }
  },
  destroyed: function() {
    this.scrollBar.removeEventListener('touchstart', this.resetScroll);
  },
  // 需要滚动到顶底的，就触发这个事件
  events:{
    // time 必须为数字格式
    'IScroll:top': function(time) {
      if(!this.isCanScroll()) return ;
      this.scroll.scrollTo(0, 0, parseInt(time) || 0);
    },
    'IScroll:elem': function(elem, time) {
      if(!this.isCanScroll()) return ;
      if(!elem) {
        this.$emit('IScroll:top', time)
      } else {
        this.scroll.scrollToElement(elem, parseInt(time) || 0);
      };
    }
  }
  // events: {
  //   'pullup:completed': function () {
  //     let self = this
  //     this.$nextTick(()=>{
  //       if (self.scroll.refresh) {
  //         self.scroll.refresh()
  //       } else {
  //         window.setTimeout(()=>{self.scroll.refresh()}, 200)
  //       }
  //     })
  //     //继续冒泡
  //     return true
  //   }
  // }
}

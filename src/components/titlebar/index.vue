<!-- 
  <title-bar back-name="xxx" :index="index" :navs="navs" title="理财记录" $on="titleCallBack"></title-bar>
  back-name 自定义返回的路由，也可以:back-name="'xx'"
  navs: [{title:xxx, status:1}, {title:xxx, status:2}] 不传则没下拉
  titleCallBack 回调把当前obj传回去
  index 指定显示navs第几个，会默认触发titleCallBack

  bgColor: 如果black则标题栏背景为透明
  rightlink：标题栏右侧文字，点击会触发click-right-link事件
  rightlinkshow：标题栏右侧文字是否出现，默认隐藏
 -->
<template>
  <div>
    <aside class="top-title" v-touch:doubletap="onDoubleTap" :class="{bgnoir: bgColor == 'black'}">
      <h1>{{title}} <i v-if="navs.length" @click="showList = !showList" class="down-arrow"></i></h1>
      <a @click="goBack" class="icon-goback"></a>
      <span @click="sendRightLinkClick" v-if="rightlink && rightlinkshow" class="rightlink">{{rightlink}}</span>
      <div v-if="navs.length && showList" class="popup-top">
        <ul class="withdraw-ui">
          <li @click="changeNav(item, $index)" v-for="item in navs" :class="{gray: $index == selected}">{{item.title}}</li>
        </ul>
      </div>
    </aside>
    <div v-if="showList" @click="showList = false" class="mask mask-inside"></div>
  </div>
</template>

<style>
.top-title{
  position: relative;
  /*z-index: 9998;*/
}
.bgnoir {
  background-color:transparent;
}
.top-title .popup-top{
  top: 100%;
}
.top-title .mask{
  /*z-index: 9997;*/
}
.rightlink {
  position:absolute;
  right:5%;
  top:0;
  color: white;
}
</style>

<script>
export default{
  props: {
    title: {
      type: String,
      required: true
    },
    navs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    backName: {
      type: String
    },
    bgColor: {
      type: String
    },
    rightlink: {
      type: String
    },
    rightlinkshow: {
      type: Boolean,
      default: true
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      showList: false,
      selected: 0
    }
  },
  ready() {
    if(this.navs.length) {
      this.changeNav(this.navs[this.index]);
    }
  },
  methods: {
    onDoubleTap: function() {
      var h = document.body.scrollTop;
      Move();

      // t当前时间 b初始化值(一开始距离) c终点 d持续时间ms
      function easeInOut(t,b,c,d){
         if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
         return -c/2 * ((t-=2)*t*t*t - 2) + b;
      }

      function Move(){
       var t=0, c = h, d = 100;
       clearTimeout(Move._t);
       function _run(){
        if(t<d){
         t++;
         var paser = -Math.ceil(easeInOut(t,-h,c,d));
         document.body.scrollTop = paser;
         Move._t = setTimeout(_run, 10);
        }else{
         document.body.scrollTop = c + "px";
        }
       }
       _run();
      }
    },
    goBack: function () {
      var backName = this.backName;
      if(backName) {
        this.$router.go({
          name: backName
        })
        return ;
      }
      this.$dispatch('goBack')
      window.history.go(-1)
    },
    changeNav: function(item, index) {
      // 防止重复选择
      if(this.selected === index) return
      this.selected = index || 0;
      this.title = item.title;
      this.showList = false;
      this.$dispatch('titleCallBack', item);
    },
    sendRightLinkClick: function(){
      this.$dispatch('click-right-link')
    }
  }
}
</script>

<!--
  Author:Yanfei Qiao 
  用法：
  <wave-circle :ratio="比例值" fill-color="#FFCE67" bg-color="#FF9A59" diameter="200px"></wave-circle>
  其中ratio必须传值，其他几个有默认值
-->
<template>
  <div class="waveCircle" :style="{ backgroundColor: bgColor, width: diameter, height: diameter}">
    <canvas v-el:canv data-ratio = "{{ ratio }}"></canvas>
  </div>
</template>

<script>
var requestAnimationFrame = (function(){
 return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function( callback ){
       return window.setTimeout(callback, 1000 / 60)
     }
})()
var cancelAnimationFrame = window.cancelAnimationFrame || 
                           window.mozCancelAnimationFram || 
                           window.webkitCancelAnimationFrame || function(handle) {
                              window.clearTimeout(handle);
                           };
export default {
  props: {
    ratio: Number,
    fillColor: String,
    bgColor: String,
    diameter: String
  },
  data () {
    return {
      amp: 6,
      isActing: true // 当前元素是否存在Dom中
    }
  },
  // router-view 有 keep-alive 时
  // 离开当前页时只会触发detached，等下次再进入这个页面的时候才会 beforeDestroy,再触发detached
  // 如果没 keep-alive
  // 则只运行 beforeDestroy
  beforeDestroy() {
    this.clearLoop();
  },
  detached() {
    this.clearLoop();
  },
  attached () {
    this.isActing = true;
    let self = this
    let cv = self.$els.canv
    let ctx = cv.getContext('2d')
    let percentage = parseFloat(cv.dataset.ratio)

    // 取进度数字
    let w = cv.width = cv.parentNode.offsetWidth
    let h = cv.height = cv.parentNode.offsetHeight

    let step = 0
    // 百分比前数字的宽度
    let rateTextWidth
    let rateFont = '24px Arial'
    let unitFont = '12px Arial'
    // 如果有self.unit，为了让文字正中对齐，要左偏移
    let offset = (function() {
      // 满标状态
      if(isNaN(self.ratioInPercentage)) {
        return 0
      } else {
        ctx.font = unitFont
        return ctx.measureText('%').width / 2
      }
    }())
    
    function loop(){
      if(!self.isActing) return;;
      ctx.clearRect(0,0,w,h);

      // 画出圆
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2, 0, 2*Math.PI);
      ctx.fill();

      // 设置图形叠加方式为：只显示圆内的部分
      ctx.globalCompositeOperation = "source-in";
      ctx.fillStyle = self.fillColor ? self.fillColor : "#11A0EC";
      //角度增加一度
      step++
      //角度转换成弧度
      var angle = step*Math.PI/180
      //矩形高度的变化量
      var deltaHeight = Math.sin(angle) * self.amp
      var deltaHeightRight = Math.cos(angle) * self.amp;
      //开始绘制路径
      ctx.beginPath()
      let ratio = 1-percentage;
      //左上角
      ctx.moveTo(0, h * ratio +deltaHeight)
      //右上角
      ctx.bezierCurveTo(w /2, h * ratio+deltaHeight-self.amp, w / 2, h * ratio +deltaHeightRight-self.amp, w, h * ratio+deltaHeightRight)
      //右下角
      ctx.lineTo(w, h)
      //左下角
      ctx.lineTo(0, h)
      //左上角
      ctx.lineTo(0, h * ratio + +deltaHeight)
      //闭合路径
      ctx.closePath()
      //填充路径
      ctx.fill()

      // 图形叠加方式设置为默认
      ctx.globalCompositeOperation = "source-over";

      // 画出文字 - 数字部分 (23)% 或者 "满"
      ctx.save();
      ctx.font = rateFont
      //设置文本的水平对对齐方式
      ctx.textAlign = 'center'
      ctx.fillStyle = '#fff'//设置文本的垂直对齐方式
      ctx.textBaseline = 'middle'
      if(offset) {
        // 位移ctx达到文字和%剧中显示
        ctx.setTransform(1, 0, 0, 1, -offset, 0);
      }
      ctx.fillText(self.ratioInPercentage, w/2, h/2)

      // 画 %
      if(offset) {
        rateTextWidth = Math.ceil(ctx.measureText(self.ratioInPercentage).width / 2)
        ctx.font = unitFont
        ctx.textAlign = 'left'
        ctx.textBaseline = 'hanging'
        ctx.fillText('%', w/2 + rateTextWidth, h/2)
      }
      ctx.restore();
      self.interval = requestAnimationFrame(loop)
    }
    loop();
  },
  methods: {
    clearLoop: function() {
      this.isActing = false;
      cancelAnimationFrame(self.interval);
    }
  },
  computed:{
    ratioInPercentage: function () {
      if(this.ratio == 1) {
        return "满"
      } else {
        let result = this.ratio * 100
        if(result.toString().indexOf('.') !== -1){
          result = result.toFixed(1)
        }
        return  result
      }
    }
  }
}
</script>

<style>
.waveCircle {
  border-radius:100%;
  overflow: hidden;
  /*float:left;*/
  display: block;
  margin: 0 auto;
  position:relative;
  background-color:#60C1F4;
  width:100%;
  height: 100%;
}
</style>

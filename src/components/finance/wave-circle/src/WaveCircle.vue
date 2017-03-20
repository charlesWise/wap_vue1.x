<!--
  Author:Yanfei Qiao 
  用法：
  <wave-circle :ratio="比例值" fill-color="#FFCE67" bg-color="#FF9A59" diameter="200px"></wave-circle>
  其中ratio必须传值，其他几个有默认值
-->
<template>
  <div class="waveCircle" :style="{ backgroundColor: bgColor, width: diameter, height: diameter}">
    <canvas v-el:canv data-ratio = "{{ ratio }}"></canvas>
    <h2>{{ ratioInPercentage }}</h2
  </div>
</template>

<script>
window.requestAnimFrame = (function(){
 return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
     window.mozRequestAnimationFrame ||
     function( callback ){
      window.setTimeout(callback, 1000 / 60)
     }
})()
export default {
  props: {
    ratio: Number,
    fillColor: String,
    bgColor: String,
    diameter: String
  },
  data () {
    return {
      amp: 6
    }
  },
  ready () {
    let self = this
    let canvas = self.$els.canv
    let ctx = canvas.getContext('2d')
    let percentage = parseFloat(canvas.dataset.ratio)
    canvas.width = canvas.parentNode.offsetWidth
    canvas.height = canvas.parentNode.offsetHeight
    let step = 0
    function loop(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
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
      ctx.moveTo(0, canvas.height * ratio +deltaHeight)
      //右上角
      ctx.bezierCurveTo(canvas.width /2, canvas.height * ratio+deltaHeight-self.amp, canvas.width / 2, canvas.height * ratio +deltaHeightRight-self.amp, canvas.width, canvas.height * ratio+deltaHeightRight)
      //右下角
      ctx.lineTo(canvas.width, canvas.height)
      //左下角
      ctx.lineTo(0, canvas.height)
      //左上角
      ctx.lineTo(0, canvas.height * ratio + +deltaHeight)
      //闭合路径
      ctx.closePath()
      //填充路径
      ctx.fill()
      window.requestAnimFrame(loop)
    }
    loop()
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
        return  result + "%"
      }
    }
  }
}
</script>

<style>
.waveCircle {
  border-radius:100%;
  overflow: hidden;
  float:left;
  position:relative;
  background-color:#60C1F4;
  width:100px;
  height:100px;
}
.waveCircle h2{
  text-align: center;
  position: absolute;
  top:15%;
  left:0px;
  right:0px;
  color:#fff;
}
</style>

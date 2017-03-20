<template>
  <span v-html="htmlStr"></span>
</template>

<script>
  // d:天 h:时 m:分 s:秒
  // 当倒计时结束的时候触发事件 countDownFinish
  var templType = {
        investList: '<time>{d}天</time>{h}:{m}:{s}', // 投资列表
        details: '{d}天 {h}:{m}:{s}' // 投资详情
      }

  export default {
    data() {
      return {
        htmlStr: ''
      }
    },
    props: {
      timestamp: Number,
      // 固定两位
      fixed: {
        type: Boolean,
        default: true
      },
      type:{
        type: String,
        default: 'investList'
      }
    },
    // 从dom中移除时清除
    detached: function() {
      clearTimeout(this.setTime_id)
    },
    beforeDestroy: function() {
      clearTimeout(this.setTime_id)
    },
    // 插入dom时触发
    // ready等事件时，如果之前dom编译过。再次从内存中调进来是不会触发的
    attached: function() {
      this.tmpl = templType[this.type];
      this.stamp = this.timestamp;
      this.parseTime();
    },
    methods: {
      parseTime: function() {
        // 当移除元素时就没this.$el，不判读会报错
        if(!this.$el) return;
        var times = parseInt(this.stamp / 1000), // 一共多少秒
            self = this,
            oneDay = 24 * 60 * 60,
            oneHour = 60*60,
            target = {},
            remain, d, h, m, s, htmlStr; // 剩余多少/天/小时/分/秒

        remain = times / oneDay; // 剩余天数
        d = parseInt(remain); // 天数
        remain = times % oneDay // 剩余秒数
        h = parseInt(remain / oneHour); // 小时
        remain = remain % oneHour; // 剩余秒数
        m = parseInt(remain / 60); // 分钟
        remain = remain % 60; // 剩余秒数
        s = parseInt(remain); // 秒数

        if(this.fixed) {
          if(h < 10) {
            h = '0' + h;
          }
          if(m < 10) {
            m = '0' + m;
          }
          if(s < 10) {
            s = '0' + s;
          }
        }

        target.d = d;
        target.h = h;
        target.m = m;
        target.s = s;

        // 填充数据
        this.htmlStr = this.tmpl.replace(/\{([^\}]+)\}/g, function(a, b) {
          return target[b];
        });
        this.stamp -= 1000;
        if(this.stamp < 0 ) {
          this.$dispatch('countDownFinish'); 
          return ;
        }
        this.setTime_id = setTimeout(function() {
          self.parseTime.call(self);
        }, 1000);
      }
    },
    watch: {
      'timestamp': function(v) {
        var oldStamp = this.stamp;
        this.stamp = this.timestamp;
        // 如果倒计时已经结束，则从新启动
        if(oldStamp < 0) {
          this.parseTime();
        }
      }
    }
  }
</script>

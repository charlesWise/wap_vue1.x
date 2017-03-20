var scroll = {};
scroll.install = function(Vue) {
  // 滚动到顶部
  // <p v-scrolltop.300>top</p>
  Vue.directive('scrolltop', {
    bind: function(v) {
      this.handle = this.handle.bind(this);
      this.el.addEventListener('touchstart', this.handle)
    },
    handle: function() {
      var time = Object.keys(this.modifiers)[0];
      this.vm.$dispatch('IScroll:top', time);
    },
    unbind: function() {
      this.el.removeEventListener('touchstart', this.handle)
    }
  });

  // 滚动到某个元素，如果没#abc则跳到顶部
  // <p v-scrollelem:#abc.300>top</p>
  Vue.directive('scrollelem', {
    bind: function(v) {
      this.handle = this.handle.bind(this);
      this.el.addEventListener('touchstart', this.handle)
    },
    handle: function() {
      var time = Object.keys(this.modifiers)[0];
      this.vm.$dispatch('IScroll:elem', this.arg, time)
    },
    unbind: function() {
      this.el.removeEventListener('touchstart', this.handle)
    }
  });
}

export default scroll
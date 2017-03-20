<template>
<div class="content">
  <header :style="{display: show ? 'block' : 'none'}">
    <div class="header-left" @click="goBack">返回</div>
    <div class="header-center"><slot></slot></div>
    <div class="header-right">添加</div>
  </header>
</div>
</template>
<style lang="sass">
  header{
    position: fixed;
    top: 0;
    left: 0;
    height: 3rem;
    line-height: 3rem;
    width: 100%;
    text-align: center;
    background-color: #10a0eb;
    color: white;
    font-size: 16px;
    z-index: 9999;
    overflow: hidden;
  }
</style>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  ready () {
//      console.log(this)
  },
  methods: {
    goBack: function () {
      window.history.go(-1)
    }
  }
}
</script>

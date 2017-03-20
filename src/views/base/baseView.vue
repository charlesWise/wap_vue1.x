<template>
  <div class="base-view">
      <slot></slot>
  </div>
</template>
<style lang="sass">
  .base-view{
    position: absolute;
    height: 100%;
    width:100%;
    left:0;
    min-height: 1000px;
  }
</style>
<script>
  import IScroll from 'iscroll'

  export default{
    data () {
      return {
        scroll: {}
      }
    },
    ready () {
      this.scroll = new IScroll(this.$el)
    }
  }
</script>

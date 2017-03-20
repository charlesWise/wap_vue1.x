<template>
  <section class="search-view" :class="{ active: hasFocus }">
    <form @submit="formSubmit">
      <div class="search-box">
        <i class="zoom"></i>
        <input @focus="addFocus()" type="text" v-model="searchVal" placeholder="{{placeholder}}" />
      </div>
      <a class="cancel" @click="cancel()" href="javascript:;">取消</a>
    </form>
    <div class="verify search-tip" v-if="isEmpty"><p>如搜索不到分支行，请在上方输入“其它”</p></div>
  </section>
</template>
<style lang="sass">
</style>
<script>

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索'
      },
      isEmpty: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        hasFocus: false,
        searchVal: ''
      }
    },
    methods: {
      formSubmit: function () {
        if (this.searchVal) {
          this.$dispatch('go-search', this.searchVal)
        }
      },
      // 搜索框获取交点
      addFocus: function() {
        this.hasFocus = true
        this.placeholder = ''
      },
      //取消搜索
      cancel: function() {
        this.hasFocus = false
        this.searchVal = ''
        this.placeholder = '搜索'
      },
    }
  }
</script>

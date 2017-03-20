<template>
  <span class="verifiy-code"><a @click="sendDynamicCode" class="get-code">{{msgDisplay}}</a></span>
</template>

<style lang="sass">

</style>

<script>
import Api from '../../services/api'
export default{
    props: {
    },
    data () {
      return {
        msg: '获取动态码',
        countTime: 0,
        response: true,
        tm: null
      }
    },
    computed: {
      msgDisplay: function () {
        if(this.msg == '获取动态码') return this.msg;
        else return this.msg + '(' + this.countTime + ')';
      }
    },
    detached(){
      clearInterval(this.tm);
    },
    methods: {
      sendDynamicCode: function () {
        if (this.response) {
          this.$dispatch('click-dynamic-code', this.countDown)
        }
      },
      countDown: function () {
        this.response = false;
        this.msg = '重新获取';
        this.countTime = 60;
        this.tm = setInterval(() => {
          if(this.countTime === 1){
            clearInterval(this.tm);
            this.msg = '获取动态码';
            this.response = true;
          }
          this.countTime--;
        }, 1000);
      }
    }
  }
</script>

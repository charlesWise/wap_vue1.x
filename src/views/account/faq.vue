<template>
  <div>
    <title-bar title="常见问题"></title-bar>
    <section class="problem-tab">
      <div class="tab-scroll">
        <ul>
          <li :class="{'active': pullOpts.params.type===2}" @click="changeNav(2)">注册/登录</li>
          <li :class="{'active': pullOpts.params.type===3}" @click="changeNav(3)">充值/提现</li>
          <li :class="{'active': pullOpts.params.type===4}" @click="changeNav(4)">投资/回款</li>
          <li :class="{'active': pullOpts.params.type===6}" @click="changeNav(6)">变现</li>
          <li :class="{'active': pullOpts.params.type===7}" @click="changeNav(7)">自动投标</li>
        </ul>
      </div>
    </section>
    
    <section class="problem-lists">
      <pull-up :opts="pullOpts" inline-template>
        <ul>
          <dl v-for="item in lists">
          <question-item>
            <dt slot="q">{{item.q}}</dt>
            <div class="solved" slot="a">{{item.a}}</div>
          </question-item>
          </dl>
        </ul>
      </pull-up>
    </section>
  
  </div>
</template>

<style lang="sass">
</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'
  import PullUp from '../../components/common/pullup'

  export default{
    data () {
      return {
        pullOpts: {
          port: 'helpQuestion',
          params: {
            type: 2,
            p: 1
          }
        }
      }
    },
    components: {
      TitleBar,
      PullUp
    },
    methods: {
      changeNav: function(n){
        this.pullOpts.params.type = n;
      }
    }
  }
</script>

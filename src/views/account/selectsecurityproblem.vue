<template>
  <!-- 安保问题选择 -->
  <div class="person-setting">
    <title-bar title="问题选择"></title-bar>
    <section class="set-items">
      <ul>
        <li v-for="que in queList" @click="selectQue(que.code_no)">
          <a href="javascript:;">{{que.code_name}}
            <span v-if="questid == que.code_no" class="select-character"></span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<style lang="sass">

</style>

<script>
  import TitleBar from '../../components/titlebar'
  import QInput from '../../components/QInput'
  import Api from '../../services/api'
  export default{
    data () {
      return {
        queList: null,
        questid: '1'
      }
    },
    components: {
      TitleBar,
      QInput
    },
    attached () {
      function resolve (res) {
        this.queList = res.data
      }
      let options = {
        data: {},
        resolve: resolve
      }
      Api.getSqaList.call(this, options)
    },
    methods: {
      selectQue: function (no) {
        this.questid = no
        console.log(this.questid)
        this.$route.router.go('/setsecurity?set_type=sqa');
      }
    }
  }
</script>

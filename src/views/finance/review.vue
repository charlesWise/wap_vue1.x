<template>
  <div class="base-view fixed-headbar review-title">
    <title-bar title="查看合同原件"></title-bar>
    <section class="invest-bargain invest-pact">
      <div v-el:wrap  class="bargain-note">
        <swiper v-if="isShow" :show_dots="false" :current.sync="current" :list="info.lists" auto :height="h"></swiper>
      </div>
      <div v-if="isShow" class="pagination"><span v-for="item in (info.len - 1)" :class="{active: $index == current}"></span></div>
    </section>
  </div>
</template>
<style>
  .review-title{
    -webkit-box-sizing: border-box;
  }
  .invest-pact{
    position: absolute;
    top:48px;
    width: 100%;
    bottom:30px;
  }
  .invest-pact .bargain-note{
    position: absolute;
    top:0;
    width: 100%;
    bottom:0;
  }
  .invest-pact .bargain-note{
    text-align: center;
  }
  .invest-pact .pagination{
    position: absolute;
    bottom: -30px;
    width: 100%;
    padding:0;
    height: 22px;
    padding-top: 8px;
  }
  .invest-pact .pagination span{
    width: 7px;
    height: 7px;
  }
</style>
<script>
  import TitleBar from '../../components/titlebar'
  import Api from '../../services/api'
  import transferService from '../../services/transferService'
  import Swiper from '../../components/swiper/index.vue'

  export default{
    data () {
      return {
        info: {},
        isShow: false,
        h: 0,
        current: 0,
        prj_id: this.$route.params.prj_id
      }
    },
    ready: function() {
      this.h = this.$els.wrap.clientHeight;
      var data = transferService.get('investPactPic');
      if(data.prj_id == this.prj_id) {
        this.info = data;
        this.isShow = true;
      } else {
        Api.prjBaseInfo.call(this, {
          resolve: function(d) {
            if(!d.boolen) return;
            d = d.data;
            var pactPic = d.cailiao;
            this.isShow = true;
            if(d) {
              var arr = [];
              pactPic.forEach(function(item) {
                var obj = {}
                obj.title = item.name;
                obj.url = item.big;
                arr.push(obj);
              });
              this.info = {
                len: arr.length,
                lists: arr,
                prj_id: this.prj_id
              }

              // 保存
              transferService.set('investPactPic',this.info);
            }
          },
          data: this.$route.params
        })
      }
      
    },
    components: {
      TitleBar,
      Swiper
    },
    methods: {
    }
  }
</script>

<template>
  <section class="fortune">
    <p v-link="{name: 'acessRecord'}">我的理财金(元)<i class="right-arrow"></i></p>
    <h1>615,500.00</h1>
    <p class="earning">可提取收益(元)</p>
    <p class="sumo">13,615,500.00</p>
    <p class="extract"><a @click="drawingProceeds">提取收益</a></p>
    <div class="footer-due"><p class="due-in" v-link="{name: 'investmentRecord'}">投资记录<span>待收0.00元<i class="right-arrow"></i></span></p></div>
  </section>
</template>
<style>
  .fortune{
    padding-bottom: 18rem;
  }
</style>
<script>

  export default{
    data(){
        return{
            title:'我的理财金'
        }
    },
    components:{

    },
    methods: {
      drawingProceeds: function () {
        console.info('提取收益');

      }
    }
  }
</script>

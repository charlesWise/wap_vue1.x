<template>
  <li>
    <h2>鑫股一号 2天<span><em class="red-xin">鑫</em><em class="orange">活</em></span></h2>
    <dl>
      <dd>
        <h3><i>8.5</i>+0.2%</h3>
        <p>投资限额:<font>1000+</font></p>
        <p>剩余可投:<font>24.67万</font></p>
      </dd>
      <dt>
       <div class="waveCircle">
        <canvas data-ratio="0.1" width="100" height="100"></canvas>
      </div><!--v-component-->
                  </dt>
    </dl>
  </li>
  <li>
    <h2>鑫银一号 7天<span><em class="orange">活</em></span><i class="new-client"></i></h2>
    <dl>
      <dd>
        <h3><i>8.5</i>+0.2%</h3>
        <p>投资限额:<font>1000+</font></p>
        <p>剩余可投:<font>24.67万</font></p>
      </dd>
      <dt class="ing">
        <p class="time"><time>122天</time>24:20:00</p>
         <div class="waveCircle">
          <canvas data-ratio="0.1" width="100" height="100"></canvas>
        </div>
      </dt>
    </dl>
  </li>
  <li>
    <h2>经营贷 2天<span><em class="orange">活</em><em class="clock"></em></span></h2>
    <dl>
      <dd>
        <h3><i>8.9</i>%</h3>
        <p>投资限额:<font>1000+</font></p>
        <p>剩余可投:<font>24.67万</font></p>
      </dd>
      <dt class="waiting">
        <div class="opening-bid">
          <p class="time"><time>122天</time>24:20:00</p>
          <p class="btn"><em class="tips">开标提醒</em></p>
        </div>
      </dt>
    </dl>
  </li>
</template>
<style lang="sass">
</style>
<script>
  export default{
    data () {
      return {
      }
    },
    components: {
    }
  }
</script>

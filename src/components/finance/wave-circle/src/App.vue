<template>
  <div id="app">
    <wave-circle :ratio='0.6' fill-color="#FFCE67" bg-color="#FF9A59" diameter="200px"></wave-circle>
    <wave-circle :ratio='1'></wave-circle>
    <wave-circle :ratio='0.3'></wave-circle>
    <wave-circle :ratio='0.02'></wave-circle>
  </div>
</template>

<script>
import WaveCircle from './WaveCircle.vue'
export default {
  components: {
    WaveCircle
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>

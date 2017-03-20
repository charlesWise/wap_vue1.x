<template>
	<li>
		<dl>
			<slot name="q"></slot>
			<dd><span :class="{'icon-turnoff':!showAnswer, 'icon-turnon':showAnswer}" @click="foldQuestion"></span></dd>
		</dl>
		<div class="solve" v-show="showAnswer">
			<slot name="a"></slot>
		</div>
	</li>
</template>
<style>
</style>
<script>
  /*
  * API:
  * */
  export default{
    data () {
      return {
      	showAnswer: false
      }
    },
    methods: {
      foldQuestion: function () {
        this.showAnswer = !this.showAnswer
      }
    }
  }
</script>

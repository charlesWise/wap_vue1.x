<template>
  <div>
  	<title-bar title="邀请好友"></title-bar>
  	<section class="invite-friends">
      <div class="content">
        <h1>方式一</h1>
        <p>非鑫拍档每邀请1名好友完成首次投资，可获得一个<span>10元红包</span>。</p>
        <div class="submit-button"><input class="blue" type="button" value="立即邀请"></div>
      </div>
      <div class="content">
        <h1>方式二</h1>
        <p>非鑫拍档每邀请1名好友完成首次投资，可获得一个<span>10元红包</span>。</p>
        <div class="submit-button"><input class="orange" type="button" value="成为鑫拍档"></div>
        <div class="submit-button dn"><input class="" type="button" value="本期已满，下期再见"></div>
      </div>
    </section>
  </div>
</template>

<style lang="sass">

</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'

  export default{
    data () {
      return {
      }
    },
    components: {
      TitleBar
    },
    events: {
    }
  }
</script>

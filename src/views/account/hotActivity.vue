<template>
  <div>
  	<title-bar title="活动专区"></title-bar>
    <pull-up :opts="pullOpts" inline-template>
  	<section class="activity-items">
      <ul>
        <li v-for="item in lists">
          <a :href="item.url_wap">
          <dl>
            <dt><span :class="{ 'notyet': item.act_status == 0, 'going': item.act_status == 1, 'finished': item.act_status == 2 }">{{item.act_status | activityStatusFilter}}</span><time>{{item.end_time_display}}止</time></dt>
            <dd>
              <span class="column-figure"><img :src="item.pic_iphone_url" alt="" /></span><span class="column-text"><h3>{{item.name}}</h3><p>{{{item.summary}}}</p></span>
            </dd>
          </dl>
          </a>
        </li>
      </ul>
    </section>
    </pull-up>
  </div>
</template>

<style lang="sass">
.activity-items li>a{
  color:#000;
}
.activity-items ul li dt span {
  width: auto;
  padding-left: .5em;
  padding-right: .5em;
}
.activity-items ul li dt span.notyet {
  background-color:#06B306;
}
.activity-items ul li dt span.going {
  background-color:red;
}
.activity-items ul li dt span.finished {
  background-color:#999;
}
.activity-items ul li dd span.column-text p {
  text-overflow: ellipsis;
  height: 4.5em;
  overflow:hidden;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color:#999;
}
</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'
  import PullUp from '../../components/common/pullup'

  export default{
    data () {
      return {
        pullOpts: {
          port: 'listSpecial',
          params: {
            p: 1,
            prj_type: 0,
            status: 0
          }
        }
      }
    },
    components: {
      TitleBar,
      PullUp
    },
    events: {
    }
  }
</script>

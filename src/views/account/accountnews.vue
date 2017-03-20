<template>
  <div>
	<title-bar :navs="subNavs" title="全部消息"></title-bar>
  <pull-up :opts="pullOpts" inline-template>
    <section class="activity-items message-tips">
      <ul>
        <!-- | filterBy messageFilter item-->
        <li v-for="item in lists">
          <dl>
            <dt><i class="icon-message"></i><em>{{item.remind_title}}</em><time>{{item.show_time}} <i class="arrow-r"></i></time></dt>
            <dd>
              <p>{{item.remind_message}}</p>
            </dd>
          </dl>
        </li>
      </ul>
    </section>
  </pull-up>
</div>
</template>

<style lang="sass">
  body{
    overflow: visible;
  }
</style>

<script>
  import Api from '../../services/api'
  import TitleBar from '../../components/titlebar'
  import PullUp from '../../components/common/pullup'

  export default{
    data () {
      return {
        subNavs: [
        {
          title: '全部消息',
          status: 0
        },
        {
          title: '开标提醒',
          status: 1
        },
        {
          title: '投资成功',
          status: 2
        },
        {
          title: '到期提醒',
          status: 3
        },
        {
          title:'变现提醒',
          status: 4
        },
        {
          title:'回款提醒',
          status: 5
        },
        {
          title:'活动奖励',
          status: 6
        },
        {
          title:'预约提现',
          status: 7
        }],
        selectedType: 0,
        pullOpts: {
          port: 'getPushMessage',
          params: {
            type: 0,
            page: 1
          }
        }
      }
    },
    components: {
    	TitleBar,
      PullUp
    },
    events: {
      'titleCallBack': function (item) {
        switch(item.status){
          case 1: this.selectedType = '31'; break; //新项目
          case 2: this.selectedType = '1'; break; //投资成功
          case 3: this.selectedType = '33'; break; //到期提醒
          case 4: this.selectedType = '190'; break; //变现提醒
          case 5: this.selectedType = '34'; break; //还款提醒
          case 6: this.selectedType = '81'; break; //活动奖励提醒
          case 7: this.selectedType = '2'; break; //预约提醒
          default: this.selectedType = 0;
        }

        var opts = Object.assign(
              this.pullOpts,
              {
                params:{
                  type: this.selectedType,
                }
              }
            )

        this.pullOpts = opts;
      }
    }
  }
</script>

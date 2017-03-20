<template>
  <!-- 个人信息 -->
  <div class="person-setting">
    <title-bar title="个人信息"></title-bar>
    <section class="set-items">
      <ul>
        <cell v-for="(index, item) in category_list" v-if="index < 2" :name="item.name" :link="item.link" :img_src="item.img_src" :span_class="item.span_class" :span_val="item.span_val"></cell>
      </ul>
    </section>
    <section class="set-items">
      <ul>
        <cell v-for="(index, item) in category_list" v-if="index > 1" :name="item.name" :link="item.link" :span_class="item.span_class" :span_val="item.span_val"></cell>
      </ul>
    </section>
  </div>
</template>
<style>
</style>
<script>
  import Api from '../../services/api'
  import cell from '../../components/cell/cell.vue'
  import userService from '../../services/userService'
  import TitleBar from '../../components/titlebar'

  export default{
      data(){
          return{
            title: '个人信息',
            category_list:[
              {
                id: 'head',
                name: '头像',
                link: 'avatarSetting',
                left_lcon: '',
                span_class: 'not-set person-image',
                span_val: '',
                img_src: userService.getAva()
              },
              {
                id: 'user',
                name: '用户名',
                link: userService.getAttr('is_set_uname') == 0 ? 'usernameSetting' : '',
                left_lcon: '',
                span_class: 'not-set',
                span_val: userService.getAttr('uname') ? userService.getAttr('uname') : '未设置'
              },
              {
                id: 'mobile',
                name: '手机认证',
                link: userService.getAttr('is_mobile_auth') ? 'currentPhone' : '',
                left_lcon: '',
                span_class: 'not-set',
                span_val: userService.getAttr('mobile') ? userService.getAttr('mobile') : '未设置'
              },
              {
                id: 'email',
                name: '邮箱认证',
                link: userService.getAttr('email') ? '' : 'mailboxBinding',
                left_lcon: '',
                span_class: 'not-set',
                span_val: userService.getAttr('email') ? userService.getAttr('email') : '未设置'
              },
              {
                id: 'uname',
                name: '实名认证',
                link: '',
                left_lcon: '',
                span_class: 'not-set',
                span_val: userService.getAttr('real_name') ? userService.getAttr('real_name') : '未实名'
              }
            ]
          }
      },
      components:{
        Api,
        cell,
        TitleBar
      },
      methods: {
        historyback: function () {
          window.history.go(-1)
        },
        getVal: function (name) {
          return this.user_info[name];
        }
    },
    created () {
      console.info('22');
      console.info(userService.getUser());
      let mobil = this.category_list[2]['span_val'];
      if(Number(mobil)){
        this.category_list[2]['span_val'] = mobil.substr(0, 3) + '****' + mobil.substr(7);
      }
      let eamil = this.category_list[3]['span_val'];
      if(eamil.indexOf('@') > 0){
        this.category_list[3]['span_val'] = eamil.substr(0, eamil.indexOf('@') - 4) + '****' + eamil.substr(eamil.indexOf('@'));
      }
      let name = this.category_list[4]['span_val'];
      if(name != '' && name != '未实名'){
        this.category_list[4]['span_val'] = '*' + name.substr(1);
      }
//      console.info(this.user_info);
    }
  }
</script>

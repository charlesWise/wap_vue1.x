<template>
  <li v-link="{name: link,path: link_path, params: link_params}">
    <a href="javascript:;">
      <em v-if="left_lcon" class="{{left_lcon}}"></em>
      <em v-if="left_ava"><img :src="left_ava" style="width: 20px;height:20px;border-radius:20px;margin-top: -10px;"></em>
      {{name}}
      <span class="{{span_class}}" v-if="img_src"><div class="avatar"><img :src="img_src" class="img_ra" /></div> > </span>
      <span class="{{span_class}}" v-else>{{span_val}} > </span>
    </a>
  </li>
</template>
<style>
  .avatar{
    border-radius:100%;
    overflow: hidden;
    height: 50px;
    margin-top: 5px;
  }
  .img_ra{
    vertical-align:inherit;
    width: 50px;
    height: 50px;
  }
</style>
<script>
  /*
  * API:
  * 1.左侧传入图标样式class--left_lcon
  * 2.传入名称--name
  * 3.右侧显示图片或者文字--img_src/span_val 以及显示的class--span_class
  * 4.跳转路径--link
  * */
    export default{
      data(){
        return {}
      },
      props: {
        name: {
          type: String,
          required: false,
          default: ''
        },
        link: {
          type: String,
          required: false
        },
        link_path: {
          type: String,
          required: false
        },
        link_params: {
          type: String,
          required: false
        },
        left_lcon: {
          type: String,
          required: false
        },
        left_ava: {
          type: String,
          required: false
        },
        span_class: {
          type: String,
          required: false
        },
        span_val: {
          type: String,
          required: false
        },
        img_src: {
          type: String,
          required: false
        }
      },
      methods: {
      },
      components: {
      }
    }
</script>

/**
 * Created by xuxin on 16/4/28.
 */
import Vue from 'vue'

const {
  bind,
  isObject,
  addClass,
  removeClass
  } = Vue.util


let formValidate = {
  deep: true,
  //twoWay: true,
  //params: ['a'],
  //paramWatchers: {
  //  a: function (val, oldVal) {
  //    console.log('a changed!')
  //  }
  //},
  bind () {
    //console.log(this.params.a)
  },
  update (obj) {
    //console.log(obj)

    let isCanSubmit = true

    //初始情况没有属性值
    if (Object.isEmptyObject((obj))) {
      isCanSubmit = false
    } else {
      for (let v in obj) {
        if (obj.hasOwnProperty(v)) {
          if (obj[v]!==0 && !obj[v]) {
            isCanSubmit = false
          }
        }
      }
    }

    let btn = this.el.querySelector('input[type=button]')
    if (isCanSubmit) {
      addClass(btn, 'blue')
      btn.disabled = false
    } else {
      removeClass(btn, 'blue')
      btn.disabled = true
    }
  }
}

export default formValidate


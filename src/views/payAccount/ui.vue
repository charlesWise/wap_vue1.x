<template>
  <div class="main">
    <!-- show cell -->
    <group>
      <cell title="vue" value="coollitter"></cell>
    </group>

    <!-- show button click -->
    <box gap="10px 10px">
      <x-button type="warn" @click="delete">Delete</x-button>
      <alert :show.sync="success" title="delete click">delete success~</alert>
    </box>

    <!-- show alert -->
    <group>
      <switch title="Toggle alert" :value.sync="shows"></switch>
      <alert :show.sync="shows" title="congratulations">Message is sent successfully~</alert>
    </group>

    <!-- show loading -->
    <div>
      <group>
        <switch title="Toggle Loading" :value.sync="show1" @change="show1change"></switch>
      </group>
      <loading :show="show1" :text="text1"></loading>
    </div>

    <!-- show confirm pop -->
    <div>
      <group>
        <switch title="Toggle confirm" :value.sync="showConfirm"></switch>
      </group>
      <confirm :show.sync="showConfirm" title="confirm deleting the item"><p style="text-align:center;">Are you sure?</p></confirm>
    </div>

  </div>
</template>

<script>
import {
  Style,
  Group,
  Cell,
  Alert,
  Switch,
  XButton,
  Box,
  Loading,
  Confirm,
  Input as XInput
} from 'vux'

export default {
  components: {
    Style,
    Group,
    Cell,
    Alert,
    Switch,
    XButton,
    Box,
    Loading,
    Confirm,
    XInput
  },
  methods: {
    /**
     * 点击删除按钮
     * @return {[type]} [description]
     */
    delete: function () {
      this.success = true
    },
    /**
     * 弹出加载进度
     * @param  {[type]} val [description]
     * @return {[type]}     [description]
     */
    show1change (val) {
      const _this = this
      if (val) {
        tick(0, function (percent) {
          if (percent === 100) {
            _this.show1 = false
            _this.text1 = 'Start processing'
            return
          }
          _this.text1 = `${percent}% completed`
        })
      }
    },

    changeNum (val) {
      console.info(val)
    }
  },
  data () {
    return {
      success: false,
      show1: false,
      text1: 'Processing',
      showConfirm: false,
      password: '123456'
    }
  }
}

/**
 * 计数
 * @param  {[type]}   i  [description]
 * @param  {Function} cb [description]
 * @return {[type]}      [description]
 */
function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 50)
}
</script>

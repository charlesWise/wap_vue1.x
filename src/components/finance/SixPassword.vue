<template>
  <div class="pwd-box">
    <input type="tel" maxlength="6" class="pwd-input" @input="handleInput" v-model="inputPwd">
    <div class="fake-box" v-el:fake-box>
      <input type="password" readonly="" v-model="fakeArr[0]">
      <input type="password" readonly="" v-model="fakeArr[1]">
      <input type="password" readonly="" v-model="fakeArr[2]">
      <input type="password" readonly="" v-model="fakeArr[3]">
      <input type="password" readonly="" v-model="fakeArr[4]">
      <input type="password" readonly="" v-model="fakeArr[5]">
    </div>
  </div>
</template>

<style lang="sass">
.pwd-box{
  width:310px;
  padding-left: 1px;
  position: relative;
  border: 1px solid #9f9fa0;
  border-radius: 3px;
  overflow:hidden;
  margin: 0 auto;
}
.pwd-box input[type="tel"]{
  width: 99%;
  height: 45px;
  color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  font-size: 18px;
  opacity: 0;
  z-index: 1;
  letter-spacing: 35px;
}
.fake-box input{
  width: 45px;
  height: 48px;
  border: none;
  border-right: 1px solid #e5e5e5;
  text-align: center;
  font-size: 30px;
}
.fake-box input:nth-last-child(1){
  border:none;
}
</style>

<script>
export default{
    props: {
      inputPwd: {
        required: true,
        twoWay: true
      }
    },
    data () {
      return {
        fakeArr: [],
        length: 0
      }
    },
    methods: {
      handleInput: function () {
        let pwd = this.inputPwd.trim();
        let len = pwd.length;
        //console.log(this.length + "VS" + len)
        if(len>this.length) this.fakeArr.push(pwd[len-1]);
        else if(len<this.length) this.fakeArr.pop(pwd[this.length-1]);
        this.length = pwd.length;
      }
    },
    watch: {
      'inputPwd': function (val, oldVal) {
        if(val == ''){
          this.fakeArr = []
          this.length = 0
        }
      }
    }
  }
</script>

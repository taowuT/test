<template>
  <transition name="back">
    <div class="card-back-wrap" :style="{background: changeColor.color}" v-show="isBack">
      <div class="back-black"></div>
      <div class="back-line">
        {{cvc}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props:{
    changeColor: {
      type: Object,
      default: {}
    },
    isBack: {
      type: Boolean,
      default: false
    },
    cvc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
.card-back-wrap
    position: absolute
    top: 30px
    left: 50%
    margin-left: -145px
    padding: 20px
    box-sizing: border-box
    width: 290px
    height: 183px
    background-color #999
    border-radius: 14.5px
    transition-timing-function: linear
    overflow: hidden
    .back-black
      position: absolute
      top: 9%
      left: 0
      width: 100%
      height: 22%
      background-color: #2a1d16
    .back-line
      position: absolute
      top: 35%
      left: 5%
      box-sizing: border-box
      padding-right: 5px
      width: 75%
      height: 18%
      background-image: repeating-linear-gradient(0.1deg, #fff 20%, #fff 40%, #fea 40%, #fea 44%, #fff 44%)
      text-align: right
      line-height: 2.1

.back-enter-active
  transition: all .3s .3s
.back-leave-active
  transition: all .3s 
.back-enter,
.back-leave-active
  transform: rotateY(-90deg)
</style>
<template>
  <transition name="tip">
    <div class="tip-wrap" v-show="isTip">
      <div class="tip">
        {{tipText}}
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    tipText: {
      type: String,
      default: ''
    },
    isTip: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.tip-wrap 
  position: fixed
  left: 0
  right: 0
  top: 0
  bottom: 0
  background-color rgba(200, 200, 200, .5)
  z-index: 998
  .tip 
    position: absolute 
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    padding: 5px
    max-width: 200px
    color: #007bff 
    font: 400 20px "微软雅黑"
    text-align: center
    border: 1px solid #007bff
    border-radius: 5px
    background-color: rgba(200, 200, 200, .5)


.tip-enter-active,
.tip-leave-active
  transition: all .3s
.tip-enter,
.tip-leave-active
  opacity: 0

</style>

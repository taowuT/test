<template>
  <div class="mask" ref="maskBlock" @click="test">
    
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: Object,
      default: {}
    }
  },
  methods: {
    test() {
      console.log(this.color.linear)
    }
  },
  watch: {
      'color.linear'() {
          this.$refs.maskBlock.style.background = this.color.linear
      }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mask
    position: absolute
    top: -50%
    left: -10%
    height: 250%
    width: 200%
    transform: rotate(25deg)
    background-color: #222
</style>

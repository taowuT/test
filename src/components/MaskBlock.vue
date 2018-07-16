<template>
  <div class="mask" :style="{background: color}">
  
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.mask
    position: absolute
    top: -50%
    left: -50%
    height: 300%
    width: 200%
    transform: rotate(25deg)
    background-color: #222
</style>

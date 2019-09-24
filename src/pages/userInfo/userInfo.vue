<template>
  <div>
     <div href="javascript:" class="go_back"  @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
     </div>
     <div class="name">瞅我干啥</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
   .name
     color red
     font-size 50px
   .go_back
     width 100px
     height 100px
     line-height 100px
</style>

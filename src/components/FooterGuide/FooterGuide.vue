<template>
  <footer class="footer_guide border-1px">
    <span class="guide_item" :class="{on:'/msite'===$route.path}" @click="goto('/msite')">
      <span class="item_icon">
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>外卖</span>
    </span>
    <span class="guide_item" @click="goto('/search')" :class="{on:'/search'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-search"></i>
      </span>
      <span>搜索</span>
    </span>
    <span class="guide_item" @click="goto('/order')" :class="{on:'/order'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>订单</span>
    </span>
    <span class="guide_item" @click="goto('/profile')" :class="{on:'/profile'===$route.path}">
      <span class="item_icon">
        <i class="iconfont icon-geren"></i>
      </span>
      <span>我的</span>
    </span>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    name:'FooterGuide',  
    methods:{
       goto(path){
         this.$router.replace(path)
       }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import  '../../assets/stylus/mixins.styl'
  .footer_guide  
    top-border-1px(#e4e4e4)
    position fixed
    z-index 100
    left 0
    right 0
    bottom 0
    background-color #fff
    width 100%
    height 50px
    display flex
    .guide_item
      display flex
      flex 1
      text-align center
      flex-direction column
      align-items center
      margin 5px
      color #999999
      &.on
        color #02a774
      span
        font-size 12px
        margin-top 2px
        margin-bottom 2px
        .iconfont
          font-size 22px
</style>

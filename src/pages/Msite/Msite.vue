<template>
<section class="msite">
    <Header :title="address.name||'正在定位中'" >
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </Header>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide"  v-for="(categorys,index) in categorysArr" :key='index'>
            <a href="javascript:" class="link_to_food" v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="'https://fuss10.elemecdn.com' + category.image_url"/>
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <div v-else>
           <img src="./images/msite_back.svg" alt="back">
      </div>
    </nav>
     <ShopList/>
  </section>
</template>

<script type="text/ecmascript-6">
  import chunk from "lodash/chunk"
  import {mapState} from "vuex"
  import ShopList from '../../components/ShopList/ShopList'
  import Swiper from 'swiper'
  import 'swiper/css/swiper.min.css'
  export default {
    components:{
       ShopList
     },
     computed:{
       ...mapState(['address', 'categorys']),
       categorysArr(){
         const {categorys}=this   //返回一个包含拆分区块的新数组（相当于一个二维数组）
                          //  array (Array): 需要处理的数组 
                          // [size=1] (number): 每个数组区块的长度 
         return  chunk(categorys,8)
       }
     },
      mounted(){
       //异步获取分类列表到vuex的state
        // await this.$store.dispatch('getCategory')  // dispatch()返回的promise在状态更新且界面更新后才成功
        this.$store.dispatch('getCategory',()=>{
          this.$nextTick(()=>{
                new Swiper ('.swiper-container', {
                   loop: true, // 循环模式选项    
                  // 如果需要分页器
                    pagination: {
                    el: '.swiper-pagination',
                    },
                  })    
          })
        })
     
      }        
      // watch:{
      //   categorys(){
      //     this.$nextTick(()=>{
      //         new Swiper ('.swiper-container', {
      //   loop: true, // 循环模式选项    
      //   // 如果需要分页器
      //   pagination: {
      //     el: '.swiper-pagination',
      //   },
      // }) 
    // })
        // }
      // }
  }   
    /*   
  解决swiper异步轮播的bug
  1. watch + nectTick()
  2. callback + nextTick()
  3. 利用dispatch()返回的promise
  
  */
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import  '../../assets/stylus/mixins.styl'
     .msite  //首页
        width 100%
        .msite_nav
          bottom-border-1px(#e4e4e4)
          margin-top 45px
          height 200px
          background #fff
          .swiper-container
            width 100%
            height 100%
            .swiper-wrapper
              width 100%
              height 100%
              .swiper-slide
                display flex
                justify-content center
                align-items flex-start
                flex-wrap wrap
                .link_to_food
                  width 25%
                  .food_container
                    display block
                    width 100%
                    text-align center
                    padding-bottom 10px
                    font-size 0
                    img
                      display inline-block
                      width 50px
                      height 50px
                  span
                    display block
                    width 100%
                    text-align center
                    font-size 13px
                    color #666
            .swiper-pagination
              >span.swiper-pagination-bullet-active
                background #02a774
</style>

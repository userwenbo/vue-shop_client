<template>
 <div>
  <div class="goods">
    <div class="menu-wrapper" ref="left">
      <ul ref="leftUl">
        <!-- current -->
        <li class="menu-item" 
         v-for="(good,index) in goods" :key="index" 
         :class="{current: currentIndex===index}"
         @click="selectItem(index)"
         >
          <img class="icon" :src="good.icon" v-if="good.icon">
          <span class="text bottom-border-1px">{{good.name}}</span>
        </li>  
      </ul>
    </div>
    <div class="foods-wrapper" ref="right">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good) in goods" :key="good.name">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index"
             @click="showFood(food)"
            >
              <div class="icon">
                <img width="57" height="57"
                     :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span></div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                   <CartControl :food="food"></CartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCart></ShopCart>
  </div>
   <Food :food="food" ref="food"/>
</div>
 
</template>

<script type="text/ecmascript-6">
import {mapState} from "vuex"
import Food from '../../components/Food/food'
import ShopCart from '../../components/ShopCart/ShopCart'
import BScroll from '@better-scroll/core'
  export default {
    components:{
      Food,
      ShopCart
    },
     data(){
        return {
          scrollY:0,
          tops:[],
          food:{},
        }
     },
      computed:{
        ...mapState({
          goods:state=>state.shop.goods
        }),      //currentIndex当前分类的下标{}类名确定只是你不确定有没有
        currentIndex(){
          const {scrollY,tops}=this
          const index=tops.findIndex((top,index)=>scrollY>=top && scrollY<tops[index+1])
          //  如果新的index与保存的index不一样  那么才会存储
          if(index!=this.index&&this.leftScroll){
             this.index=index    //如果新的index和保存的index不一样才会做下面的工作
            // 在当前分类变化时, 让左侧列表滑动到当前分类处
             const li=this.$refs.leftUl.children[index]
             this.leftScroll.scrollToElement(li,300) //滚动到指定的目标元素
          }
          return index
        }
      },
      mounted(){
      if(this.goods.length>0){
          this.initScroll()     //切换路由，路由组件会死亡，路由组件在在访问的时候创建  
          this.initTop()
        }         
      },
      watch:{     //路由组件什么时候床架创建访问的时候
        goods(){
          this.$nextTick(()=>{
             this.initScroll()
             this.initTop()
          })
        }
      },
      methods:{
        //初始化滚动对象
        initScroll(){
           //必须在列表数据显示之后
          this.leftScroll=new BScroll(this.$refs.left, {
               click:true 
          })
          this.rightScroll=new BScroll(this.$refs.right, {
               click:true,
               probeType:1  // 非实时 触摸
          })  
                   //绑定scroll监听
            this.rightScroll.on('scroll',({x,y})=>{
                this.scrollY=Math.abs(y)
            })  
              //绑定scrollEnd监听
            this.rightScroll.on('scrollEnd',({x,y})=>{
                this.scrollY=Math.abs(y)
            }) 
         },
            //初始化top值
          initTop(){
              const tops=[]
              let top=0
              tops.push(top)
              const lis=Array.from(this.$refs.rightUl.children)
              
                lis.forEach(li => {
                  top+=li.clientHeight
                  tops.push(top)
                })
              //保存tops
              this.tops=tops
            },
          selectItem(index){
             const top=this.tops[index]
             //立即将scrollY设置到相应的位置
             this.scrollY=top
             this.rightScroll.scrollTo(0,-top,500)
          },
          showFood(food){
            this.food=food
            //显示food组件界面
            this.$refs.food.toggleShow()     //标签对象就是组件对象
          }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../assets/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


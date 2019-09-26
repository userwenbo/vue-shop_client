import {reqGoods,reqInfo,reqRatings} from "../../api";
import Vue from 'vue'

import {  
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO ,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT,
  CLEAR_CART
 } from "../mutation-types";

const state={
    goods: [],
    ratings: [],
    info: {},
    cartFoods:[],  //购物车所有food的数组
}

const actions={
  
  // 异步获取商家信息
    async getShopInfo({commit}, cb) {
      const result = await reqInfo()
      if (result.code === 0) {
        const info = result.data
        commit(RECEIVE_INFO, {info})
           cb && cb()
      }
    },
     async getShopGoods({commit},cb){
       const result = await reqGoods()
       if(result.code===0){
         const goods=result.data
         commit(RECEIVE_GOODS,{goods})
         cb && cb()
       }
     },
    async getShopRatings({commit},cb){
       const result = await reqRatings()
       if(result.code===0){
         const ratings=result.data
         commit(RECEIVE_RATINGS,{ratings})
         cb && cb()
       }
     },
     //更新food数量的同步action
      updateFoodCount({commit},{isAdd,food}){
         if(isAdd){
           commit(ADD_FOOD_COUNT,{food})
         }else{
           commit(REDUCE_FOOD_COUNT,{food})
         }
      }
}
/* 
包含n个用于直接更新状态数据的方法的对象
*/
const mutations={
   [RECEIVE_INFO](state, {info}) {
     state.info = info
   },
   [RECEIVE_RATINGS](state, {ratings}) {
     state.ratings = ratings
   },
   [RECEIVE_GOODS](state, {goods}) {
     state.goods = goods
   },
   [ADD_FOOD_COUNT](state, {food}) {
     if(!food.count){
       //给food添加有个新的属性  值为1
        // food.count=1 
        Vue.set(food,'count',1)
        state.cartFoods.push(food)
     }else{
       food.count++ //不用state了    //不需要加
     }  
   },
   [REDUCE_FOOD_COUNT](state, {food}) {
     if(food.count>0){
        food.count--
        if(food.count===0){ ///只有从0-1计算效率高
          state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
     }  
   },
      [CLEAR_CART](state) {
        // 删除购物车中所有food的count属性
        state.cartFoods.forEach(food=>{
           food.count=0   //让购物列表count不显示
        })
        state.cartFoods=[]
     },
}
const getters={
  //总数量
  totalCount(state){
    return state.cartFoods.reduce((pre,food)=>pre+food.count,0)
  },
  //总价格
    totalPrice(state) {
      return state.cartFoods.reduce((pre, food) => pre + food.count*food.price, 0)
    }
}
export default {
  state,
  mutations,
  actions,
  getters
}
 
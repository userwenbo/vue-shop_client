import {reqAddress,reqCategorys,reqShops} from '../api'

import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS} from './mutation-types'
export default {
   async getAddress({commit,state},callback){
     const {longitude,latitude}=state
      //发ajax请求
       const result=await reqAddress(longitude, latitude)
       //提交mutation
       if(result.code===0){
         const address=result.data
         commit(RECEIVE_ADDRESS,{address})
         typeof callback === 'function' && callback()
       }
   },
    async getCategory({commit},callback){
        //发ajax请求
        const result = await reqCategorys()
        //提交mutation
        if(result.code===0){
          const categorys = result.data
          commit(RECEIVE_CATEGORYS,{categorys}) //同步执行mutation方法 执行完之后
          //再同步执行mutation 
          //在commit()更新状态数据之后调用回调函数
          typeof callback==='function' && callback()
        }
    },
    async getShops({commit,state},callback){
      const {longitude,latitude}=state
        //发ajax请求
        const result = await reqShops({longitude, latitude})
        //提交mutation
        if(result.code===0){
          const shops=result.data
          commit(RECEIVE_SHOPS,{shops})
          typeof callback === 'function' && callback()
        }
    }
}
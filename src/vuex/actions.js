import {reqAddress,reqCategorys,reqShops,reqAutoLogin,reqGoods,reqInfo,reqRatings} from '../api'

import {RECEIVE_ADDRESS,RECEIVE_SHOPS,RECEIVE_CATEGORYS,RECEIVE_USER,RECEIVE_TOKEN,LOGOUT,RECEIVE_GOODS,RECEIVE_RATINGS,RECEIVE_INFO} from './mutation-types'
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
    },
    saveUser({commit},user){
      //将token保存到local中 
      const token=user.token
      localStorage.setItem('token_key', token)
      delete user.token   //删除user的token
      commit(RECEIVE_USER,{user})
      commit(RECEIVE_TOKEN,{token})
    },
    //退出登录
    logout({commit}){
      //清除token
      localStorage.removeItem('token_key')
      commit(LOGOUT)
    },
    //自动登录异步action
    async autoLogin({commit}){
       const result=await reqAutoLogin()
       if(result.code===0){
          const user=result.data
          commit(RECEIVE_USER,{user})//没有token需要
       }
    },
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
     }

}
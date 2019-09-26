import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../vuex/store'

import routes from './routes'

Vue.use(VueRouter)
const router=new VueRouter({
  mode: 'history',
  routes
})
//定义全局前置守卫
const paths=['/a','/b']  //需要进行登录检查的数组
  router.beforeEach((to,form,next)=>{
    const path=to.path
    //需要检查的数组里面有，并且有taken
    if(paths.indexOf(path)!=-1&&!store.state.user.token){
       next('/login')
    }else{ 
       next()
    }
      
  })
export default router
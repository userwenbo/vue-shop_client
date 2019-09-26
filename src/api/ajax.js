/* 封装axios */
import axios from 'axios'
import qs from 'qs'
import {Toast} from 'mint-ui'
import store from '../vuex/store'  //得到store对象
import router from '../router/index'
//创建一个新的Axios的实例
const instance=axios.create({
    timeout:10000,            //如果10s之后不返回，那么就会进入失败的回调
    baseURL: '/api'
})
/* 
添加请求拦截器, 处理Post请求参数(从对象转换为urlencoding)
*/
instance.interceptors.request.use((config)=>{
    if(config.method.toUpperCase()==='POST'&&config.data instanceof Object){
         config.data=qs.stringify(config.data) 
    }
     //处理token
    const token=store.state.user.token
    //只要有token就携带给浏览器
    if(token){
            config.headers['Authorization'] = token // 如果token存在, 将token添加到请求头中
    }else{
        //如果没有token但请求需要token
         if (config.headers.checkdToken) {
            throw new Error('没有token,不能请求') //中断promise ,进入失败的回调
         }
       
    }
                               
    return config
})

/* 
添加响应拦截器
    成功回调: 成功的结果不再是response, 而是response.data
    失败回调: 统一处理请求异常
*/

    instance.interceptors.response.use(response=>{
       return response.data
    },error=>{
       //没有token直接发请求错误
    // 发请求前的异常
    if (!error.response) {
           // 发需要授权的请求前发现没有token(没有登陆)
            // 如果当前没在登陆界面
           if (error.status === 401) { // 发需要授权的请求前发现没有token(没有登陆)
               // 如果当前没在登陆界面
               if (router.currentRoute.path !== '/login') {
                   router.replace('/login')
                   Toast(error.message)
               } else {
                   Toast('没有token, 请求前取消的请求, 已在login, 不需要跳转')
               }
           }
        // 发请求后的异常
      } else {
        const status = error.response.status
        if (status === 401) { // 授权过期
            if (router.currentRoute.path !== '/login') {
                // 退出登陆
                store.dispatch('logout')
                router.replace('/login')
                Toast(error.response.data.message)
            }
        } else if (status === 404) {
            Toast('请求的资源不存在')
        } else {
            Toast('请求异常: ' + error.message)
        }
    }
       return new Promise(()=>{})   //返回一个pending状态的promise
    })     
    export default instance




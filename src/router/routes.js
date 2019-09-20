
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/login/login.vue'
export default [
   {
     path:'/msite',
     component: Msite,
     meta:{
       isShowFooter: true
     }
   },
   {
     path:'/search',
     component: Search,
     meta: {
       isShowFooter: true
     }
   },
   {
     path:'/order',
     component: Order,
     meta: {
       isShowFooter: true
     }
   },
   {
     path: '/profile',
     component: Profile,
     meta: {
       isShowFooter: true
     }
   },
   {
     path: '/login',
     component:Login,
   },
   {
     path:'/',
     redirect: '/msite'
   }
]
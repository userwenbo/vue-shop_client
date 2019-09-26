
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/login/login.vue'
import Shop from '../pages/shop/shop.vue'
import Goods from '../pages/shop/goods.vue'
import Info from '../pages/shop/info.vue'
import Ratings from '../pages/shop/ratings.vue'
import UserInfo from '../pages/userInfo/userInfo.vue'


import A from '../pages/test/A.vue'
import B from '../pages/test/B.vue'
import B1 from '../pages/test/B1.vue'
import B2 from '../pages/test/B2.vue'
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
     path:'/userInfo',
     component:UserInfo
   },
   {
     path:'/shop',
     component:Shop,
     children:[
        {
          path: '/shop/goods',
          component: Goods,
        },
        {
          path: 'info',
          component: Info,
        },
        {
          path: 'ratings',
          component: Ratings,
        },
        {
          path:'',
          redirect:'/shop/goods'
        }
     ]
   },
     {
       path: '/a',
       component: A
     }, {
       path: '/b',
       component: B,
       children: [{
           path: '/b/b1',
           component: B1
         },
         {
           path: '/b/b2',
           component: B2
         },
       ]
     },
   {
     path:'/',
     redirect: '/msite'
   }
]
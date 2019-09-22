
import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/login/login.vue'
import Shop from '../pages/shop/shop.vue'
import Goods from '../pages/shop/goods.vue'
import Info from '../pages/shop/info.vue'
import Ratings from '../pages/shop/ratings.vue'
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
     path:'/',
     redirect: '/msite'
   }
]
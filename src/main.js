import Vue from 'vue'
import router from './router'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'

import loading from './assets/images/loading.gif'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import CartControl from './components/CartControl/CartControl.vue'
import './validate'
import App from './App.vue'
import Star from './components/star/star.vue'
import  './mock/mockServer'
import i18n from './i18n'

Vue.use(VueLazyload,{
  loading
})
Vue.config.productionTip = false

/*注册全局组件标签 */
Vue.component('Header',Header)
Vue.component('Star', Star)
Vue.component('CartControl',CartControl)
Vue.component(Button.name, Button)

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')

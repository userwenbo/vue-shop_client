import Vue from 'vue'
import router from './router'
import store from './vuex/store'
import Header from './components/Header/Header.vue'
import './validate'
import App from './App.vue'
import Star from './components/star/star.vue'

Vue.config.productionTip = false
   
/*注册全局组件标签 */  
Vue.component('Header',Header)
Vue.component('Star', Star)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import msite from './modules/msite'
import shop from './modules/shop'
import user from './modules/user'


Vue.use(Vuex)

export default new Vuex.Store({
   actions, //总mutations
   getters, // 总actions
   mutations,
   modules:{
      msite,
      shop,
      user
   }
})

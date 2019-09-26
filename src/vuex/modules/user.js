import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOGOUT,
} from "../mutation-types";

import API2 from "../../api2";
const state = {
  user: {}, //登录用户信息
  token: localStorage.getItem('token_key'), //登录的token标识去local里面取最新的值
}
const actions = {
  saveUser({
    commit
  }, user) {
    //将token保存到local中 
    const token = user.token
    localStorage.setItem('token_key', token)
    delete user.token //删除user的token
    commit(RECEIVE_USER, {
      user
    })
    commit(RECEIVE_TOKEN, {
      token
    })
  },
  //退出登录
  logout({
    commit
  }) {
    //清除token
    localStorage.removeItem('token_key')
    commit(LOGOUT)
  },
  //自动登录异步action
  async autoLogin({
    commit
  }) {
    const result = await API2.user.autoLogin()
    if (result.code === 0) {
      const user = result.data
      commit(RECEIVE_USER, {
        user
      }) //没有token需要
    }
  }
}
const mutations = {
  [RECEIVE_USER](state, {
    user
  }) {
    state.user = user
  },
  [RECEIVE_TOKEN](state, {
    token
  }) {
    state.token = token
  },
  [LOGOUT](state) {
    state.user = {},
      state.token = ''
  },
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}




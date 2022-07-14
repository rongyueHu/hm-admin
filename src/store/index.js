import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import user from './modules/user'
import getters from './getters'
const vuexLocal = new VuexPersistence({
  // 指定用的是存储方式是本地存储
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '' // token
  },
  mutations: {
    setUser (state, payload) {
      state.token = payload
    }
  },
  actions: {
  },
  getters,
  modules: {
    user
  },
  plugins: [vuexLocal.plugin]
})

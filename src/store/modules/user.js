// 用户列表
// import { user } from '@/api/user'
const state = {
  // userlist: {} // 存放用户列表数据
}
const mutations = {
  /* setUser (state, payload) {
    state.userlist = payload
  } */
}
const actions = {
  /*  async user (context, { pagenum, pagesize }) {
    try {
      const res = await user({ pagenum, pagesize })
      console.log('1', res)
      context.commit('setUser', res.data.data) // 提交数据
    } catch (err) { console.log(err) }
  } */
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

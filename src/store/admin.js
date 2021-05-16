const state = {
  adminInfo: {}
}

const mutations = {
//  初始化 admin info
  INIT_ADMIN_INFO(state,data){
    state.adminInfo = data
  }
}

const actions = {
//  初始化 admin info
  initAdminInfo({commit},data){
    commit('INIT_ADMIN_INFO',data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

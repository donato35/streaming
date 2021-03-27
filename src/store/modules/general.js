// initial state


const state = () => ({
    user: null
  })
  
  // getters
  const getters = {}
  
  // actions
  const actions = {
    storeUser({ commit }, user) {
      commit("setUser", user);
    }
  }
  
  // mutations
  const mutations = {
    increment (state, testo) {
      state.prova =testo
    },
    setUser(state, u) {
      state.user = u;
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
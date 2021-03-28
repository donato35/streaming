// initial state


const state = () => ({
    username: null,
    isLogged: false
  })
  
  // getters
  const getters = {}
  
  // actions
  const actions = {
    storeUsername({ commit }, username) {
      commit("setUsername", username);
    },
    storeIsLogged({ commit }, lstate) {
      commit("setIsLogged", lstate);
    },

  }
  
  // mutations
  const mutations = {
    setUsername(state, username) {
      state.username = username;
    },
    setIsLogged(state, lstate) {
      state.isLogged = lstate;
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
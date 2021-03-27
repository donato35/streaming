// initial state

const setup = () => {
    return "prva setup"
}
const state = () => ({
    prova: setup()
  })
  
  // getters
  const getters = {}
  
  // actions
  const actions = {}
  
  // mutations
  const mutations = {
    increment (state, testo) {
        state.prova =testo
      }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }
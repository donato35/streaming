import { createStore, createLogger } from 'vuex'
import events from './modules/event'
import general from './modules/general'
import VuexPersist from 'vuex-persist'

const debug = process.env.NODE_ENV !== 'production'

const vuexPersist = new VuexPersist({
    key: 'my-app',
    storage: sessionStorage
  })

export default createStore({
  modules: {
    events,
    general
  },
  strict: debug,
  plugins: debug ? [createLogger(),vuexPersist.plugin] : [vuexPersist.plugin]
})
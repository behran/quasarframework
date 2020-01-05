import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import tasks from './store-tasks'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      tasks
    },
    
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
}

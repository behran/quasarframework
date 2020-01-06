import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import tasks from './store-tasks'
import settings from './store-settings'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      tasks,
      settings
    },
    
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
}

import Vue from 'vue'
import Vuex from 'vuex'

// we first import the module
import tasks from './store-tasks'
import settings from './store-settings'
import auth from './store-auth'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  return new Vuex.Store({
    modules: {
      tasks,
      settings,
      auth
    },
    
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })
}

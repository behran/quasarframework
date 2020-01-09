import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  loggedIn: false
}
const actions = {
  registerUser ({}, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log(response)
    }).catch(error => {
      showErrorMessage(error.message)
    })
  },
  logoutUser () {
    firebaseAuth.signOut()
  },
  loginUser ({}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      console.log(response)
    }).catch(error => {
      showErrorMessage(error.message)
    })
  },
  handleAuthStateChange ({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        this.$router.push('/').catch(err => {})
        dispatch('tasks/fbReadData', null, { root: true })
      } else {
        commit('tasks/clearTasks', null, { root: true })
        commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        this.$router.replace('/auth').catch(err => {})
      }
    })
  }
}
const mutations = {
  setLoggedIn (state, value) {
    state.loggedIn = value
  }
}
const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

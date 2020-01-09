import Vue from 'vue'

import { uid, Notify } from 'quasar'
import { firebaseDb, firebaseAuth } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
  tasks: {
    // 'ID1': {
    //   name: 'Go to shop',
    //   completed: false,
    //   dueDate: '2019/06/12',
    //   dueTime: '18:30'
    // },
    // 'ID2': {
    //   name: 'Get bananas',
    //   completed: false,
    //   dueDate: '2019/06/13',
    //   dueTime: '14:00'
    // },
    // 'ID3': {
    //   name: 'Get apples',
    //   completed: false,
    //   dueDate: '2019/06/14',
    //   dueTime: '16:00'
    // }
  },
  search: '',
  sort: 'dueDate',
  taskDownloaded: false
}

const mutations = {
  updateTask (state, payload) {
    Object.assign(state.tasks[ payload.id ], payload.updates)
  },
  deleteTask (state, id) {
    Vue.delete(state.tasks, id)
  },
  addTask (state, payload) {
    Vue.set(state.tasks, payload.id, payload.task)
  },
  setSearch (state, value) {
    state.search = value
  },
  setSort (state, value) {
    state.sort = value
  },
  setTaskDownloaded (state, value) {
    state.taskDownloaded = value
  },
  clearTasks (state) {
    state.tasks = {}
  }
}

const actions = {
  updateTask ({ dispatch }, payload) {
    dispatch('fbUpdateTask', payload)
  },
  deleteTask ({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask ({ dispatch }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    dispatch('fbAddTask', payload)
  },
  setSearch ({ commit }, value) {
    commit('setSearch', value)
  },
  setSort ({ commit }, value) {
    commit('setSort', value)
  },
  fbReadData ({ commit }) {
    const { uid } = firebaseAuth.currentUser
    let userTasks = firebaseDb.ref(`tasks/${uid}`)
    
    userTasks.once('value', spanshot => {
      commit('setTaskDownloaded', true)
    }, error => {
      showErrorMessage(error.message)
      this.$router.push('/auth')
    })
    
    userTasks.on('child_added', spanshot => {
      let task = spanshot.val()
      let payload = {
        id: spanshot.key,
        task: task
      }
      commit('addTask', payload)
    })
    //сдежить в реал тайме изменния
    userTasks.on('child_changed', spanshot => {
      let task = spanshot.val()
      let payload = {
        id: spanshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })
    
    // удаление
    userTasks.on('child_removed', spanshot => {
      let taskId = spanshot.key
      
      commit('deleteTask', taskId)
    })
  },
  fbAddTask ({}, payload) {
    let { uid } = firebaseAuth.currentUser
    const taskId = payload.id
    let taskRef = firebaseDb.ref(`tasks/${uid}/${taskId}`)
    taskRef.set(payload.task, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task added!')
      }
    })
    
  },
  fbUpdateTask ({}, payload) {
    const { uid } = firebaseAuth.currentUser
    const taskId = payload.id
    let taskRef = firebaseDb.ref(`tasks/${uid}/${taskId}`)
    taskRef.update(payload.updates, error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        let keys = Object.keys(payload.updates)
        if (!(keys.includes('completed') && keys.length === 1)) {
          Notify.create('Task updated!')
        }
        
      }
    })
  },
  fbDeleteTask ({}, taskId) {
    const { uid } = firebaseAuth.currentUser
    let taskRef = firebaseDb.ref(`tasks/${uid}/${taskId}`)
    taskRef.remove(error => {
      if (error) {
        showErrorMessage(error.message)
      } else {
        Notify.create('Task deleted!')
      }
    })
  }
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks)
    
    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[ a ][ state.sort ].toLowerCase(),
        taskBProp = state.tasks[ b ][ state.sort ].toLowerCase()
      if (taskAProp > taskBProp) {
        return 1
      } else if (taskAProp < taskBProp) {
        return -1
      } else {
        return 0
      }
    })
    keysOrdered.forEach(function (key) {
      tasksSorted[ key ] = state.tasks[ key ]
    })
    
    return tasksSorted
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted
    let tasksFiltered = {}
    if (state.search) {
      Object.keys(tasksSorted).forEach(function (key) {
        let task = tasksSorted[ key ],
          taskNameLowerCase = task.name.toLowerCase(),
          searchLowerCase = state.search.toLowerCase()
        
        if (taskNameLowerCase.includes(searchLowerCase)) {
          tasksFiltered[ key ] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function (key) {
      let task = tasksFiltered[ key ]
      if (!task.completed) {
        tasks[ key ] = task
      }
    })
    
    return tasks
  },
  tasksCompleted: (state, getters) => {
    
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach(function (key) {
      let task = tasksFiltered[ key ]
      if (task.completed) {
        tasks[ key ] = task
      }
    })
    
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

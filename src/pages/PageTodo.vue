<template>
    <q-page>
        <div class="q-pa-md absolute full-width full-height column">

            <template v-if="taskDownloaded">
                <div class="row q-mb-lg">
                    <search/>
                    <sort/>
                </div>
                <p v-if="
            search &&
            !Object.keys(tasksTodo).length &&
            !Object.keys(tasksCompleted).length
        ">
                    no serach result</p>

                <q-scroll-area class="q-scroll-area-tasks">

                    <no-tasks
                            v-if="!Object.keys(tasksTodo).length && !search && !settings.showTaskInOneList"
                    ></no-tasks>

                    <tasks-todo
                            v-if="Object.keys(tasksTodo).length"
                            :tasksTodo="tasksTodo"
                    />

                    <tasks-completed
                            v-if="Object.keys(tasksCompleted).length"
                            :tasksCompleted="tasksCompleted"
                            class="q-mb-xl"
                    />

                </q-scroll-area>


                <div class="absolute-bottom text-center q-mb-lg no-pointer-events">
                    <q-btn
                            @click="showAddTask = true"
                            round
                            class="all-pointer-events"
                            color="primary"
                            size="24px"
                            icon="add"
                    />
                </div>
            </template>
            <template v-else>
                <span class="absolute-center">
                    <q-spinner
                            color="primary"
                            size="3em"
                    />
                </span>

            </template>

        </div>


        <q-dialog v-model="showAddTask">
            <add-task @close="showAddTask = false"></add-task>
        </q-dialog>


    </q-page>
</template>

<script>
  import { mapGetters, mapState } from 'vuex'

  export default {
    components: {
      'add-task': require('components/Tasks/Modals/AddTask.vue').default,
      'tasks-todo': require('components/Tasks/TasksTodo.vue').default,
      'tasks-completed': require('components/Tasks/TasksCompleted.vue').default,
      'no-tasks': require('components/Tasks/NoTasks.vue').default,
      'search': require('components/Tasks/Tools/Search.vue').default,
      'sort': require('components/Tasks/Tools/Sort.vue').default
    },
    computed: {
      ...mapGetters('tasks', [ 'tasksTodo', 'tasksCompleted' ]),
      ...mapGetters('settings', [ 'settings' ]),
      ...mapState('tasks', [ 'search', 'taskDownloaded' ])
    },
    data () {
      return {
        showAddTask: false
      }
    },
    mounted () {
      this.$root.$on('showAddTask', () => {
        this.showAddTask = true
      })
    }
  }
</script>

<style>
    .q-scroll-area-tasks {
        display: flex;
        flex-grow: 1;
    }
</style>

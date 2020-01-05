<template>
    <q-page class="q-pa-md">
        <q-list
                v-if="Object.keys(tasks).length"
                separator
                bordered>
            <task
                    v-for="(task,key) in tasks"
                    :key="key"
                    :id="key"
                    :task="task"
            ></task>

        </q-list>
        <div class="absolute-bottom text-center q-mb-lg">
            <q-btn
                    @click="showAddTask = true"
                    round
                    color="primary"
                    size="24px"
                    icon="add"
            />
        </div>

        <q-dialog v-model="showAddTask">
            <add-task @close="showAddTask = false"></add-task>
        </q-dialog>


    </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    components: {
      'task': require('components/Tasks/Task.vue').default,
      'add-task': require('components/Tasks/Modals/AddTask.vue').default
    },
    computed: {
      ...mapGetters('tasks', [ 'tasks' ])
    },
    data () {
      return {
        showAddTask: false
      }
    }
  }
</script>

<style>

</style>

<template>
    <transition
            appear
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
    >
        <div
                :class="{'q-mt-lg':!settings.showTaskInOneList}"
        >
            <list-header
                    v-if="!settings.showTaskInOneList"
                    bgColor="bg-green-4"
            >
                Completed
            </list-header>
            <q-list

                    separator
                    bordered>
                <task
                        v-for="(task,key) in tasksCompleted"
                        :key="key"
                        :id="key"
                        :task="task"
                ></task>

            </q-list>
        </div>
    </transition>

</template>

<script>

  import { mapGetters } from 'vuex'

  export default {
    name: 'TasksCompleted',
    props: [ 'tasksCompleted' ],
    components: {
      'task': require('components/Tasks/Task.vue').default,
      'list-header': require('components/Shared/ListHeader.vue').default
    },
    computed: {
      ...mapGetters('settings', [ 'settings' ])
    }
  }
</script>

<style scoped>

</style>

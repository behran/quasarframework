<template>
    <transition
            appear
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut absolute-top"
    >
        <div>
            <list-header
                    v-if="!settings.showTaskInOneList"
                    bgColor="bg-orange-4"
            >
                Todo
            </list-header>
            <q-list

                    separator
                    bordered>
                <task
                        v-for="(task,key) in tasksTodo"
                        :key="key"
                        :id="key"
                        :task="task"
                ></task>

            </q-list
            >
        </div>
    </transition>

</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'TasksTodo',
    props: [ 'tasksTodo' ],
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

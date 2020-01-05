<template>
    <div class="q-mt-lg">
        <list-header
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

</template>

<script>
  export default {
    name: 'TasksCompleted',
    props: [ 'tasksCompleted' ],
    components: {
      'task': require('components/Tasks/Task.vue').default,
      'list-header': require('components/Shared/ListHeader.vue').default
    }
  }
</script>

<style scoped>

</style>

<template>
    <q-item
            v-rippl
            @click="updateTask({ id, updates:{completed: !task.completed} })"

            :class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
            v-touch-hold:1000.mouse="showEditTaskModal"
            clickable
    >
        <q-item-section side top>
            <q-checkbox
                    :value="task.completed"
                    class="no-pointer-events"
            />
        </q-item-section>

        <q-item-section>
            <q-item-label
                    :class="{'text-strikethrough': task.completed }"
                    v-html="$options.filters.searchHighlight(task.name,search)"
            >
            </q-item-label>
        </q-item-section>

        <q-item-section
                v-if="task.dueDate"
                side>
            <div class="row">
                <div class="column justify-center">
                    <q-icon
                            name="event"
                            size="18px"
                            class="q-mr-xs"
                    />
                </div>
                <div class="column">
                    <q-item-label
                            class="row justify-end"
                            caption
                    >
                        {{task.dueDate | niceDate}}
                    </q-item-label>
                    <q-item-label
                            caption
                            class="row justify-end"
                    >
                        <small>{{taskDueTime}}</small>
                    </q-item-label>
                </div>

            </div>

        </q-item-section>
        <q-item-section side>
            <div class="row">
                <q-btn
                        @click.stop="showEditTaskModal"
                        flat
                        round
                        dense
                        color="primary"
                        icon="edit"/>
                <q-btn
                        @click.stop="promptToDelete(id)"
                        flat
                        round
                        dense
                        color="red"
                        icon="delete"/>
            </div>

        </q-item-section>

        <q-dialog v-model="showEditTask">
            <edit-task
                    :task="task"
                    :id="id"
                    @close="showEditTask = false">

            </edit-task>
        </q-dialog>

    </q-item>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex'
  import { date } from 'quasar'

  export default {
    props: [ 'task', 'id' ],
    components: {
      'edit-task': require('components/Tasks/Modals/EditTask').default
    },
    computed: {
      ...mapState('tasks', [ 'search' ]),
      ...mapGetters('settings', [ 'settings' ]),
      taskDueTime () {
        if (this.settings.show12HourTimeFormat) {
          return date.formatDate(`${this.task.dueDate} ${this.task.dueTime}`, 'h:mmA')
        }
        return this.task.dueTime
      }
    },
    data () {
      return {
        showEditTask: false
      }
    },
    filters: {
      niceDate (value) {
        return date.formatDate(value, 'MMM D')
      },
      searchHighlight (value, search) {
        if (search) {
          let searchRegExp = new RegExp(search, 'ig')
          return value.replace(searchRegExp, match => `<span class="bg-yellow-6">${match}</span>`)
        }
        return value
      }
    },
    methods: {
      ...mapActions('tasks', [ 'updateTask', 'deleteTask' ]),
      showEditTaskModal () {
        this.showEditTask = true
      },
      promptToDelete (id) {
        this.$q.dialog({
          title: 'Confirm',
          message: 'Really deleted',
          cancel: true,
          persistent: true
        }).onOk(() => {
          this.deleteTask(id)
        })
      }
    }
  }
</script>

<style scoped>

</style>

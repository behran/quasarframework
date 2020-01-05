export default {
  components: {
    'modal-header': require('components/Tasks/Modals/Shared/ModalHeader').default,
    'modal-task-name': require('components/Tasks/Modals/Shared/ModalTaskName').default,
    'modal-task-due-date': require('components/Tasks/Modals/Shared/ModalDueDate').default,
    'modal-task-due-time': require('components/Tasks/Modals/Shared/ModalDueTime').default,
    'modal-buttons': require('components/Tasks/Modals/Shared/ModalButtons').default
  },
  methods: {
    submitForm () {
      this.$refs.modalTaskName.$refs.name.validate()
      if (!this.$refs.modalTaskName.$refs.name.hasError) {
        this.submitTask()
      }
    },
    clearDueDate () {
      this.taskToSubmit.dueDate = ''
      this.taskToSubmit.dueTime = ''
    }
  }
}

<template>
    <q-select
            filled
            emit-value
            map-options
            v-model="sortBy"
            class="col q-ml-sm"
            :options="options"
            label="Sort by"
            stack-label
    />
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Sort',
    computed: {
      ...mapState('tasks', [ 'sort' ]),
      sortBy: {
        get () {
          return this.sort
        },
        set (value) {
          this.setSort(value)
        }
      }
    },
    data () {
      return {
        options: [
          {
            label: 'Name',
            value: 'name'
          },
          {
            label: 'Date',
            value: 'dueDate'
          }
        ]
      }
    },
    methods: {
      ...mapActions('tasks', [ 'setSort' ])
    }
  }
</script>

<style scoped>
    .q-select {
        flex: 0 0 112px;
    }
</style>

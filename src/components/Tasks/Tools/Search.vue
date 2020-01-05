<template>
    <q-input
            outlined
            v-model="searchField"
            @keyup.esc="searchField = ''"
            class="col"
            v-select-all
            label="Search">

        <template v-slot:append>
            <q-icon
                    v-if="searchField !== ''"
                    name="close"
                    @click="searchField = ''"
                    class="cursor-pointer"/>
            <q-icon name="search"/>
        </template>

    </q-input>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import { selectAll } from 'src/directives/directive-select-all'

  export default {
    name: 'Search',
    directives: {
      selectAll
    },
    computed: {
      ...mapState('tasks', [ 'search' ]),
      searchField: {
        get () {
          return this.search
        },
        set (value) {
          this.setSearch(value)
        }
      }
    },
    methods: {
      ...mapActions('tasks', [ 'setSearch' ])
    }
  }
</script>

<style scoped>

</style>

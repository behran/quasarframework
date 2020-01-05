<template>
    <div
            class="row q-mb-sm">
        <q-input
                label="Due Time"
                outlined
                class="col"
                :value="dueTime"
                @input="$emit('update:dueTime',$event)"
        >
            <template v-slot:append>
                <q-icon
                        :value="dueTime"
                        name="close"
                        @click="$emit('update:dueTime','')"
                        class="cursor-pointer"/>
                <q-icon name="access_time" class="cursor-pointer">
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-time
                                :value="dueTime"
                                @input="$emit('update:dueTime',$event)"
                        />
                    </q-popup-proxy>
                </q-icon>
            </template>
        </q-input>
    </div>
</template>

<script>
  export default {
    name: 'ModalDueTime',
    props: [ 'dueTime' ]
  }
</script>

<style scoped>

</style>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-tabs>
        <q-route-tab
          label="group wizard"
          to="/group-wizard"
          exact
        />
        <q-route-tab
          label="edit view"
          to="/vertical"
          exact
        />
        <q-route-tab
          label="community view"
          to="/community"
          exact
        />
      </q-tabs>
      <q-btn
        class="fixed-top-right"
        label="Reset data"
        @click="resetData()"
        color="red"
        flat
      />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { initialData } from 'boot/state'

export default {
  name: 'MainLayout',
  methods: {
    resetData () {
      localStorage.removeItem('data')
      const data = initialData()
      // because the various components pull out various values within the data
      // e.g. "group", if we just replace them, the components will still be referring
      // to the old value, so we go one level down, and mixin the initial values to the
      // existing objects
      for (const key of Object.keys(data)) {
        if (typeof data[key] === 'object') {
          Object.assign(this.$root.$data[key], data[key])
        } else {
          this.$root.$data[key] = data[key]
        }
      }
    }
  }
}
</script>

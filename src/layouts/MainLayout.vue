<template>
  <q-layout view="lHh Lpr lFf" class="main">
    <q-header elevated>
      <q-toolbar>
        <q-space/>
        <q-tabs>
          <q-route-tab
            label="Home"
            to="/"
            exact
          />
          <q-route-tab
            label="Agreements"
            to="/agreements"
            exact
          />
          <q-route-tab
            label="Proposals"
            to="/proposals"
            exact
          />
        </q-tabs>
        <q-space/>
        <q-btn
          unelevated
          icon="fas fa-cog"
          label="Prototype Options"
        >
          <q-menu>
            <div class="q-pa-md">
              <div class="text-caption text-uppercase">Voting control</div>
              <div class="row q-gutter-md">
                <q-radio v-model="options.votingControl" val="faces" label="Faces" />
                <q-radio v-model="options.votingControl" val="slider" label="Slider" />
                <q-radio v-model="options.votingControl" val="text-buttons" label="Text" />
              </div>
              <q-btn
                label="Reset prototype data"
                @click="resetData()"
                color="red"
                flat
              />
            </div>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <portal-target name="layout"/>
  </q-layout>
</template>

<script>
import { DATA_KEY, initialData } from 'boot/state'

export default {
  name: 'MainLayout',
  data () {
    return {
      options: this.$root.$data.options
    }
  },
  methods: {
    resetData () {
      localStorage.removeItem(DATA_KEY)
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

<style scoped>
.main {
  background-image: url(~assets/repeating_grey.png);
  background-attachment: fixed;
  background-size: 600px;
}
</style>

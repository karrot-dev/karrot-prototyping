<template>
  <q-layout view="hHh lpr lFf" class="main">
    <q-header bordered>
      <q-toolbar>
        <q-space/>
        <q-tabs
          mobile-arrows
        >
          <q-route-tab
            label="Home"
            to="/"
            exact
          />
          <q-route-tab
            label="Agreements"
            to="/agreements"
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
export default {
  name: 'MainLayout',
  data () {
    return {
      options: this.$root.$data.options
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

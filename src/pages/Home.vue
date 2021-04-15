<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;" class="larger-text">
      <q-card>
        <q-card-section>
          <div class="text-h4 q-my-lg">Welcome to the Karrot prototype!</div>
          <p>The prototype site is to enable us to try out new ideas for features before we build them into the software properly.</p>
          <p>We are exploring ways to manage agreements / rules within groups using a democratic processes.</p>
          <p>We have been meeting each week and discussing in the <a href="https://community.foodsaving.world/c/karrot/governance-design-process/24">Governance Design Process</a> category on our community forum.</p>
          <p>The code for this site is available at <a href="https://github.com/yunity/karrot-prototyping">github.com/yunity/karrot-prototyping</a></p>
        </q-card-section>
        <q-card-section>
          <div class="text-h5 q-mb-lg">Scenarios</div>
          <q-banner class="bg-yellow-1 q-mb-md">
            Note: for this prototype, all data is only stored on your computer, it does not allow you to connect with other users.
          </q-banner>
          <div class="q-mb-lg">
            <div class="text-h6">Empty data</div>
            <p>This let's you see how it would be when you start using the feature.</p>
            <q-btn
              label="Reset to empty data"
              @click="resetData('empty')"
              color="primary"
            />
          </div>
          <div class="q-mb-lg">
            <div class="text-h6">With sample agreements and proposals</div>
            <p>This let's you see how it would look like after you've been using it for a while.</p>
            <q-btn
              label="Reset to sample data"
              @click="resetData('sample')"
              color="primary"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { DATA_KEY, initialData } from 'boot/state'

export default {
  methods: {
    resetData (scenario) {
      localStorage.removeItem(DATA_KEY)
      const data = initialData(scenario)
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
      // go back to home page, as our current page might be invalid, or the data might
      // not actually update properly... just being safe/simple
      this.$router.push('/')
      this.$q.notify({
        message: `Reset data to ${scenario}`,
        color: 'pink'
      })
    }
  }
}
</script>

<style scoped>
.larger-text p {
  font-size: 140%;
}
</style>

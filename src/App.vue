<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { debounce } from 'quasar'
import { DATA_KEY } from 'boot/state'
export default {
  name: 'App',
  data () {
    return {
      group: this.$root.$data.group
    }
  },
  watch: {
    // here we watch for changes in the data, and save it to local storage every 1000ms
    '$root.$data': {
      handler: debounce(function (value) {
        console.log('saving data')
        localStorage.setItem(DATA_KEY, JSON.stringify(value))
        this.$q.notify({
          message: 'Saved data to local storage!',
          color: 'pink'
        })
      }, 1000),
      deep: true
    }
  }
}
</script>

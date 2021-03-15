import Vue from 'vue'
import { date } from 'quasar'
import PortalVue from 'portal-vue'

const { formatDate } = date

Vue.filter('formatDate', value => {
  if (value) {
    return formatDate(value, 'YYYY-MM-DD')
  }
})

Vue.use(PortalVue)

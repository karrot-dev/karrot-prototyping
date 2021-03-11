import Vue from 'vue'
import { date } from 'quasar'
const { formatDate } = date

Vue.filter('formatDate', value => {
  if (value) {
    return formatDate(value, 'YYYY-MM-DD')
  }
})

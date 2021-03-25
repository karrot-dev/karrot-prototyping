<template>
  <div v-if="values.length > 0">
    <div class="text-bold q-my-sm">This agreement will help to support:</div>
    <q-chip
      v-for="category in selectedCategories"
      :key="category.name"
      color="red-3"
    >
      {{ category.name }}
    </q-chip>
    <div class="text-bold q-my-sm">By encouraging/facilitating:</div>
    <q-chip
      v-for="value in selectedValues"
      :key="value.name"
      color="green-3"
    >
      {{ value.name }}
    </q-chip>
  </div>
</template>

<script>
import { valueCategoryDefinitions, valueDefinitions } from 'src/data'

export default {
  props: {
    values: {
      required: true,
      type: Array
    }
  },
  methods: {
    valuesForCategory (category) {
      return valueDefinitions.filter(value => value.categories.includes(category))
    }
  },
  computed: {
    selectedValues () {
      return this.values.map(name => valueDefinitions.find(value => value.name === name))
    },
    selectedCategories () {
      const categories = new Set()
      for (const value of this.selectedValues) {
        for (const category of value.categories) {
          categories.add(category)
        }
      }
      return Array.from(categories).map(name => valueCategoryDefinitions.find(category => category.name === name))
    }
  }
}
</script>

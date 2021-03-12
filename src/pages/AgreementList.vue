<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <div class="text-h4">Agreements</div>
      <q-card
        class="q-pa-md q-my-md"
        v-for="agreement in agreements"
        :key="agreement.title"
      >
        <q-badge floating color="positive">
          Approved {{ agreement.date | formatDate }}
        </q-badge>
        <div class="text-h5">{{ agreement.title }}</div>

        <div class="text-caption">Summary:</div>
        <q-markdown :src="agreement.summary"/>
        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            label="Show full text"
            color="primary"
            :to="`/agreements/${agreement.id}`"
          />
        </q-card-section>
      </q-card>
      <q-btn class="q-mt-lg" to="/proposals/new" round color="primary" icon="fa fa-plus" />
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    const now = new Date()
    const { agreements } = this.$root.$data.group
    return {
      agreements: agreements.filter(({ date }) => date < now)
    }
  }
}
</script>

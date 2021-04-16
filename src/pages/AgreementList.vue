<template>
  <q-page class="q-pt-lg">
    <div style="width: 800px; margin: 0 auto;">
      <div class="text-h4">Agreements</div>

      <q-tabs v-model="tab">
        <q-route-tab name="approved" to="/agreements/approved">Approved</q-route-tab>
        <q-route-tab name="proposed" to="/agreements/proposed">Proposals</q-route-tab>
        <q-btn class="absolute-right" to="/proposals/new" color="primary">Propose new agreement</q-btn>
      </q-tabs>

      <q-tab-panels v-model="tab" class="bg-transparent">
        <q-tab-panel name="approved">
          <q-banner class="text-center q-mt-lg" v-if="agreements.length === 0">
            There are no agreements!
          </q-banner>
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
                label="Open details"
                color="primary"
                :to="`/agreements/${agreement.id}`"
              />
            </q-card-section>
          </q-card>
        </q-tab-panel>
        <q-tab-panel name="proposed">
          <q-banner class="text-center q-mt-lg" v-if="proposals.length === 0">
            There are no proposals!
          </q-banner>
          <q-card
            class="q-my-md"
            v-for="agreement in proposals"
            :key="agreement.title"
          >
            <q-banner class="bg-warning text-white">
              <div class="text-h6">{{ dateInWords(agreement.date) }} remaining for discussion and voting</div>
            </q-banner>
            <div class="q-pa-md">
              <q-badge floating color="warning">
                Due by {{ agreement.date | formatDate }}
              </q-badge>
              <div class="text-h5">{{ agreement.title }}</div>

              <div class="text-caption">Summary:</div>
              <q-markdown :src="agreement.summary"/>
              <q-card-section class="q-pa-sm">
                <q-btn
                  class="q-mr-md"
                  label="Open discussion and voting"
                  color="primary"
                  :to="`/proposals/${agreement.id}`"
                />
              </q-card-section>
            </div>
          </q-card>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import formatDistance from 'date-fns/formatDistance'

export default {
  data () {
    const now = new Date()
    const { agreements } = this.$root.$data.group
    return {
      tab: 'approved',
      agreements: agreements.filter(({ date }) => date < now),
      proposals: agreements.filter(({ date }) => date >= now)
    }
  },
  methods: {
    dateInWords (date) {
      return formatDistance(new Date(), date)
    }
  }
}
</script>

<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <q-card
        class="q-pa-md q-my-md"
      >
        <q-badge floating color="positive">
          Approved {{ agreement.date | formatDate }}
        </q-badge>
        <div class="text-h4">{{ agreement.title }}</div>
        <q-card-section>
          <div class="text-caption">Summary:</div>
          <q-markdown :src="agreement.summary" />

          <div class="text-caption">Content:</div>
          <q-markdown :src="agreement.content" />

          <div class="q-mt-sm">
            <q-chip color="secondary">
              Sharing is Caring
            </q-chip>
            <q-chip color="secondary">
              Sustainability
            </q-chip>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            label="Show History"
            color="primary"
          />
          <q-btn
            label="Propose change"
            color="primary"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    const { id } = this.$route.params
    const { agreements } = this.$root.$data.group
    const agreement = agreements[id || 0]
    return {
      agreement
    }
  }
}
</script>

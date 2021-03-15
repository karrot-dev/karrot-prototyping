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

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            label="Show History (not implemented yet)"
            color="primary"
          />
          <q-btn
            label="Propose change"
            color="primary"
            :to="`/agreements/${id}/propose`"
          />
        </q-card-section>

        <q-card-section>

          <div class="q-mt-sm">
            <q-chip color="secondary">
              Sharing is Caring
            </q-chip>
            <q-chip color="secondary">
              Sustainability
            </q-chip>
          </div>
          <template v-if="agreement.summary">
            <div class="text-caption text-uppercase">Summary</div>
            <q-markdown :src="agreement.summary" />
          </template>

          <div class="text-caption text-uppercase">Content</div>
          <q-markdown :src="agreement.content" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    const { agreementId: id } = this.$route.params
    const { agreements } = this.$root.$data.group
    const agreement = agreements.find(a => a.id === id)
    return {
      id,
      agreement
    }
  }
}
</script>

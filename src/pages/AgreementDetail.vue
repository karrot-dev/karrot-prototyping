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
          <!--
          <q-btn
            class="q-mr-md"
            label="Show History (not implemented yet)"
            color="primary"
          />
          -->
          <q-btn
            label="Propose change"
            color="primary"
            :to="`/agreements/${id}/propose`"
          />
        </q-card-section>

        <q-card-section>
          <agreement :agreement="agreement"/>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import Agreement from 'components/Agreement'

export default {
  components: {
    Agreement
  },
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

<template>
  <div>
    <q-card-section>
      <h3>Proposal</h3>
      <h4>Due in {{ dueInWords }}</h4>
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="proposal.title"
        label="Agreement Title"
        outlined
      />
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="proposal.summary"
        label="Summary"
        outlined
        autogrow
        input-style="min-height: 100px;"
      />
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="proposal.content"
        label="Agreement text"
        outlined
        autogrow
        input-style="min-height: 200px;"
      />
    </q-card-section>

    <q-card-section>
      <div class="q-mt-sm">
        <q-chip color="secondary">+ Add value tags</q-chip>
      </div>
    </q-card-section>

    <q-card-section>
      <q-input
        v-model="proposal.reason"
        label="Reason for proposal"
        outlined
        autogrow
        input-style="min-height: 100px;"
      />
    </q-card-section>
  </div>
</template>

<script>
import { date } from 'quasar'
import formatDistance from 'date-fns/formatDistance'

const { addToDate } = date

export default {
  props: {
    agreement: {
      type: Object,
      required: true
    }
  },
  data () {
    const { id } = this.$route.query
    const { pendingAgreements } = this.$root.$data.group
    const proposal = pendingAgreements[id || 0]
    proposal.dueBy = addToDate(new Date(), { days: 7 })
    return {
      vote: null,
      proposal
    }
  },
  computed: {
    smallScreen () {
      return this.$q.screen.width < 450 || this.$q.screen.height < 450
    },
    dueInWords () {
      return formatDistance(new Date(), this.proposal.dueBy)
    }
  }
}
</script>

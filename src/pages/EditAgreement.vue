<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;" class="row">
      <!--

        This is an implementation of https://community.foodsaving.world/t/stage-3-making-a-decision/608/4

      -->
      <q-card class="q-pa-md col-8">
        <q-card-section>
          <h3>Proposal</h3>
          <h4>Due in {{ dueInWords }}</h4>

          Vote!
          <q-btn-toggle
            v-model="vote"
            toggle-color="primary"
            rounded
            unelevated
            size="xl"
            :options="[
            { value: -2, icon: 'far fa-sad-cry' },
            { value: -1, icon: 'far fa-sad-tear' },
            { value: 0, icon: 'far fa-meh' },
            { value: 1, icon: 'far fa-grin' },
            { value: 2, icon: 'far fa-grin-hearts' },
          ]"
          />
          <q-btn
            v-if="vote !== null"
            @click="vote = null"
            icon="fas fa-times"
            title="Clear vote"
            color="red"
            size="sm"
            flat
          />
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

        <q-card-actions
          class="q-pa-sm"
          align="center"
        >
          <q-btn
            label="Submit"
            color="primary"
            to="agreement-details"
          />
        </q-card-actions>
      </q-card>
      <q-card class="q-pa-md col">
        <q-chat-message :text="['Oh, this looks like a good idea']"/>
        <q-chat-message :text="['No it\'s really bad']" sent/>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { date } from 'quasar'
import formatDistance from 'date-fns/formatDistance'

const { addToDate } = date

export default {
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

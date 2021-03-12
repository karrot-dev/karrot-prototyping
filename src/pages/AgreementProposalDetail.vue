<template>
  <q-page class="flex flex-center">
    <div style="width: 1000px;" class="row">
      <q-card
        class="q-pa-md col-8"
      >
        <q-banner class="bg-warning text-white q-mb-md">
          <div class="text-h6">{{ dueInWords }} remaining for discussion and voting</div>
        </q-banner>

        <div class="text-h4">{{ agreement.title }}</div>

        <q-card-section v-if="previousAgreement">
          <p>
            This is a proposal to modify the existing agreement: <a :href="`/#/agreements/${previousAgreementId}`" target="_blank">{{ previousAgreement.title }}</a>.
          </p>
        </q-card-section>

        <q-card-section v-else>
          <p>This is a proposal for a new agreement.</p>
        </q-card-section>

        <q-card-section>
          <div class="text-caption">Reason:</div>
          <q-markdown :src="agreement.reason" />

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

        <q-card-section>
          Vote!
          <q-btn-toggle
            v-model="agreement.vote"
            toggle-color="primary"
            rounded
            unelevated
            size="xl"
            :options="[
            { value: -2, icon: 'far fa-sad-cry', disable: disableNegativeVote },
            { value: -1, icon: 'far fa-sad-tear', disable: disableNegativeVote },
            { value: 0, icon: 'far fa-meh' },
            { value: 1, icon: 'far fa-grin' },
            { value: 2, icon: 'far fa-grin-hearts' },
          ]"
          />
          <q-btn
            v-if="agreement.vote !== null"
            @click="agreement.vote = null"
            icon="fas fa-times"
            title="Clear vote"
            color="red"
            size="sm"
            flat
          />
          <q-banner class="bg-green-1 q-pa-md q-mt-md">
            <template #avatar>
              <q-icon name="fas fa-comments" color="primary" />
            </template>
            <template v-if="disableNegativeVote">
              Please consider participating in the discussion by writing in the chat.
              You cannot vote negatively if you haven't written anything.
            </template>
            <template v-else>
              Thanks for participating in the discussion! This means you can vote negatively if you want, but consider continuing the discussion.
            </template>
            <br class="q-mb-sm">
            This helps people to understand your perspective, and possibly change the proposal to include your considerations.
            <br class="q-mb-sm">
            Your vote will be anonymous, but your messages will not be.
          </q-banner>
        </q-card-section>

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            label="Edit proposal"
            color="primary"
            :to="`/proposals/${id}/edit`"
          />
          <q-btn
            v-if="previousAgreement"
            label="Show changes to existing agreement"
            color="primary"
            @click="showChanges()"
          />
        </q-card-section>
      </q-card>
      <q-card class="q-pa-md col flex">
        <div ref="chat" style="height: 400px; overflow-y: scroll; overflow-x: hidden;" class="full-width">
          <q-chat-message
            v-for="(message, index) in agreement.messages"
            :key="index"
            :text="[message]"
          />
        </div>
        <q-space/>
        <form @submit.stop.prevent="sendMessage()" class="full-width">
          <q-input v-model="message" outlined />
        </form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import formatDistance from 'date-fns/formatDistance'
import AgreementDiffDialog from '../components/AgreementDiffDialog'

export default {
  data () {
    const { proposalId: id } = this.$route.params
    const { agreements } = this.$root.$data.group
    const agreement = agreements.find(a => a.id === id)
    const { previousAgreementId } = agreement
    let previousAgreement
    if (previousAgreementId) {
      previousAgreement = agreements.find(a => a.id === previousAgreementId)
    }
    return {
      id,
      agreement,
      previousAgreement,
      previousAgreementId,
      message: ''
    }
  },
  methods: {
    sendMessage () {
      console.log('sending message', this.message)
      this.agreement.messages.push(this.message)
      this.message = ''
      this.$nextTick(() => {
        this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight)
      })
    },
    showChanges () {
      this.$q.dialog({
        component: AgreementDiffDialog,
        fromAgreement: this.previousAgreement,
        toAgreement: this.agreement
      })
    }
  },
  computed: {
    dueInWords () {
      return formatDistance(new Date(), this.agreement.date)
    },
    disableNegativeVote () {
      return this.agreement.messages.length === 0
    }
  }
}
</script>

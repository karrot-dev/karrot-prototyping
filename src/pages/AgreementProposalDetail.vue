<template>
  <q-page class="flex flex-center" :style="$q.platform.is.mobile ? '' : 'padding-right: 340px;'">
    <div style="width: 100%; max-width: 1000px;">
      <q-card class="q-pa-md">
        <q-banner class="bg-warning text-white q-mb-md">
          <div class="text-h6">{{ dueInWords }} remaining for discussion and voting</div>
        </q-banner>

        <div class="text-h4">{{ agreement.title }}</div>

        <q-card-section v-if="previousAgreement">
          This is a proposal to modify the existing agreement: <a :href="`/#/agreements/${previousAgreementId}`" target="_blank">{{ previousAgreement.title }}</a>.
        </q-card-section>

        <q-card-section v-else>
          This is a proposal for a new agreement.
        </q-card-section>

        <q-card-section>
          <div class="text-caption text-uppercase">Reason for proposal</div>
          <q-markdown :src="agreement.reason" />
        </q-card-section>

        <q-card-section v-if="!hasChanged">
          <q-banner class="bg-green-1 q-pa-md q-mt-md q-mb-lg">
            <template #avatar>
              <q-icon name="fas fa-edit" color="primary" />
            </template>
            No changes have been proposed yet, so there is nothing to vote on.
            <template #action>
              <q-btn
                label="Propose changes"
                color="primary"
                :to="`/proposals/${id}/edit`"
              />
            </template>
          </q-banner>

          <q-banner class="bg-orange-1 q-pa-md q-mt-md" v-if="!hasWrittenInChat">
            <template #avatar>
              <q-icon name="fas fa-comments" color="primary" />
            </template>
            Please consider participating in the discussion by writing in the chat.
            <br class="q-mb-sm">
            This helps people to include your perspective in the proposal.
            <template #action v-if="$q.platform.is.mobile">
              <q-btn
                label="Open discussion"
                color="primary"
                @click="showMobileChat = true"
              />
            </template>
          </q-banner>
        </q-card-section>

        <template v-if="hasChanged">

          <q-card-section>
            <div class="text-h6 q-mb-md">The proposal</div>
            <div
              class="bg-grey-2 limit-height q-pa-md"
              ref="content"
              :class="{ 'content-overflow': contentOverflow }"
            >
              <agreement :agreement="agreement"/>
            </div>
            <q-btn
              v-if="contentOverflow"
              class="full-width"
              outline
              label="Open full proposal"
              @click="openFull()"
            />

            <div class="q-mt-md q-gutter-md">
              <q-btn
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
              <q-btn
                v-if="$q.platform.is.mobile"
                label="Open discussion"
                color="primary"
                @click="showMobileChat = true"
              />
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-h6 q-mb-md">What do you think about this proposal?</div>
            <div class="row q-my-lg" v-if="options.votingControl === 'text-buttons'">
              <template v-if="$q.platform.is.mobile">
                <q-select
                  class="col-grow"
                  label="Vote"
                  outlined
                  v-model="agreement.vote"
                  :options="[
                    { label: getLabel(-2), value: -2, disable: !hasWrittenInChat },
                    { label: getLabel(-1), value: -1, disable: !hasWrittenInChat },
                    { label: getLabel(0), value: 0 },
                    { label: getLabel(1), value: 1 },
                    { label: getLabel(2), value: 2 },
                  ].reverse()"
                >
                  <template #append>
                    <q-btn
                      :disable="agreement.vote === null"
                      @click.stop="agreement.vote = null"
                      icon="fas fa-times"
                      title="Clear vote"
                      :color="agreement.vote === null ? 'grey' : 'red'"
                      size="sm"
                      flat
                    />
                  </template>
                </q-select>
              </template>
              <template v-else>
                <q-space/>
                <q-btn-toggle
                  unelevated
                  v-model="agreement.vote"
                  :options="[
                    { label: getLabel(-2), value: -2, disable: !hasWrittenInChat },
                    { label: getLabel(-1), value: -1, disable: !hasWrittenInChat },
                    { label: getLabel(0), value: 0 },
                    { label: getLabel(1), value: 1 },
                    { label: getLabel(2), value: 2 },
                  ]"
                >
                  <q-btn
                    :disable="agreement.vote === null"
                    @click="agreement.vote = null"
                    icon="fas fa-times"
                    title="Clear vote"
                    :color="agreement.vote === null ? 'grey' : 'red'"
                    size="sm"
                    flat
                  />
                </q-btn-toggle>
                <q-space/>
              </template>
            </div>

            <div class="row" v-if="options.votingControl === 'slider'">
              <q-slider
                class="col-grow"
                v-model="agreement.vote"
                color="green"
                :min="-2"
                :step="1"
                :max="2"
                snap
                markers
                :label="agreement.vote !== null"
                :label-always="agreement.vote !== null"
                :label-value="getLabel(agreement.vote)"
              />
              <q-btn
                :disable="agreement.vote === null"
                @click="agreement.vote = null"
                icon="fas fa-times"
                title="Clear vote"
                :color="agreement.vote === null ? 'grey' : 'red'"
                size="sm"
                flat
              />
            </div>

            <div class="row" v-if="options.votingControl === 'faces'">
              <q-space/>
              <q-btn-toggle
                v-model="agreement.vote"
                toggle-color="primary"
                rounded
                unelevated
                size="xl"
                :options="[
                { value: -2, icon: 'far fa-sad-cry', disable: !hasWrittenInChat },
                { value: -1, icon: 'far fa-sad-tear', disable: !hasWrittenInChat },
                { value: 0, icon: 'far fa-meh' },
                { value: 1, icon: 'far fa-grin' },
                { value: 2, icon: 'far fa-grin-hearts' },
              ]"
              />
              <q-btn
                :disable="agreement.vote === null"
                @click="agreement.vote = null"
                icon="fas fa-times"
                title="Clear vote"
                :color="agreement.vote === null ? 'grey' : 'red'"
                size="sm"
                flat
              />
              <q-space/>
            </div>
            <q-banner class="bg-green-1 q-pa-md q-my-md">
              <template #avatar>
                <q-icon name="fas fa-person-booth" color="primary" />
              </template>
              Voting is anonymous.
              <br class="q-mb-sm">
              If enough people have voted and the score is positive in {{ dueInWords }} then this proposal will be approved!
            </q-banner>
            <q-banner class="bg-orange-1 q-pa-md q-mt-md" v-if="!hasWrittenInChat">
              <template #avatar>
                <q-icon name="fas fa-comments" color="primary" />
              </template>
              Please consider participating in the discussion by writing in the chat.
              You cannot vote negatively if you haven't written anything.
              <br class="q-mb-sm">
              This helps people to include your perspective in the proposal.
            </q-banner>
          </q-card-section>
        </template>
      </q-card>

      <div
        v-if="showMobileChat"
        class="fixed-full z-fullscreen bg-white"
      >
        <q-toolbar class="text-white bg-primary">
          <q-btn
            stretch
            flat
            @click="showMobileChat = false"
          >
            &larr; Back
          </q-btn>
          <q-toolbar-title>Proposal Discussion</q-toolbar-title>
        </q-toolbar>
        <div ref="chat" style="position: absolute; top: 60px; bottom: 85px; width: 100%; padding: 16px; overflow-y: auto;">
          <q-chat-message
            v-for="(message, index) in agreement.messages"
            :key="index"
            :text="[message]"
          />
        </div>
        <form @submit.stop.prevent="sendMessage()" class="full-width absolute-bottom q-pa-md">
          <q-input v-model="message" outlined placeholder="Write a message"/>
        </form>
      </div>
    </div>
    <portal v-if="!$q.platform.is.mobile" to="layout">
      <q-drawer
        side="right"
        bordered
        behavior="desktop"
        show-if-above
        overlay
        :width="340"
        :breakpoint="500"
      >
        <q-banner class="bg-grey-14 text-white">
          Discussion
        </q-banner>
        <div ref="chat" style="position: absolute; top: 50px; bottom: 85px; width: 100%; padding: 16px; overflow-y: auto;">
          <q-chat-message
            v-for="(message, index) in agreement.messages"
            :key="index"
            :text="[message]"
          />
        </div>
        <form @submit.stop.prevent="sendMessage()" class="full-width absolute-bottom q-pa-md">
          <q-input v-model="message" outlined placeholder="Write a message"/>
        </form>
      </q-drawer>
    </portal>
  </q-page>
</template>

<script>
import formatDistance from 'date-fns/formatDistance'
import AgreementDiffDialog from '../components/AgreementDiffDialog'
import AgreementDialog from 'components/AgreementDialog'
import Agreement from 'components/Agreement'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    Agreement
  },
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
      message: '',
      options: this.$root.$data.options,
      contentOverflow: false,
      showMobileChat: false
    }
  },
  methods: {
    async sendMessage () {
      console.log('sending message', this.message)
      this.agreement.messages.push(this.message)
      this.message = ''
      await this.$nextTick()
      await this.$nextTick()
      this.$refs.chat.scrollTo(0, this.$refs.chat.scrollHeight)
    },
    showChanges () {
      this.$q.dialog({
        component: AgreementDiffDialog,
        fromAgreement: this.previousAgreement,
        toAgreement: this.agreement
      })
    },
    getLabel (score) {
      if (score === null) return null
      return {
        '-2': 'Strong Resistance',
        '-1': 'Resistance',
        0: 'Neutral',
        1: 'Support',
        2: 'Strong Support'
      }[score]
    },
    checkContentOverflow () {
      if (this.$refs.content) {
        const { clientHeight, scrollHeight } = this.$refs.content
        this.contentOverflow = scrollHeight > clientHeight
      } else {
        this.contentOverflow = false
      }
    },
    openFull () {
      this.$q.dialog({
        component: AgreementDialog,
        agreement: this.agreement
      })
    }
  },
  mounted () {
    this.checkContentOverflow()
  },
  watch: {
    agreement: {
      deep: true,
      immediate: true,
      handler () {
        this.checkContentOverflow()
      }
    }
  },
  computed: {
    hasChanged () {
      if (!this.previousAgreement) return true
      return [
        'title',
        'summary',
        'content'
      ].some(key => this.agreement[key] !== this.previousAgreement[key])
    },
    dueInWords () {
      return formatDistance(new Date(), this.agreement.date)
    },
    hasWrittenInChat () {
      return this.agreement.messages.length > 0
    }
  }
}
</script>

<style scoped>
.limit-height {
  position: relative;
  max-height: 600px;
  overflow-y: hidden;
}
.limit-height.content-overflow::before {
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  background: linear-gradient(transparent 80%,#fff);
}
</style>

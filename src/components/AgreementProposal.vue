<template>
  <q-card
    v-bind="$attrs"
    class="q-pa-lg"
  >
    <form>
      <h3 v-if="isNew">new proposal</h3>
      <h3 v-else>edit proposal</h3>

      <q-input
        v-model="proposal.reason"
        filled
        label="Reason for change"
      />

      <q-space class="q-my-lg"/>

      <q-input
        v-model="proposal.title"
        filled
        label="Title"
      />

      <q-space class="q-my-lg"/>

      <q-input
        v-model="proposal.overview"
        filled
        label="Overview"
      />

      <q-space class="q-my-lg"/>

      <q-input
        v-model="proposal.text"
        filled
        autogrow
        label="Text"
      />
    </form>
  </q-card>
</template>

<script>
export default {
  name: 'AgreementProposal',
  props: {
    proposal: {
      type: Object,
      default: () => ({
        id: null,
        reason: '',
        title: '',
        overview: '',
        text: ''
      })
    }
  },
  computed: {
    isNew () {
      return this.proposal.id === null
    }
  }
}
</script>

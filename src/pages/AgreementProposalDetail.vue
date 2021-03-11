<template>
  <q-page class="flex flex-center">
    <div style="width: 1000px;" class="row">
      <q-card
        class="q-pa-md col-8"
      >
        <q-banner class="bg-primary text-white q-mb-md">
          <div class="text-h6">{{ dueInWords }} remaining for discussion and voting</div>
        </q-banner>

        <div class="text-h4">{{ agreement.title }}</div>

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

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            label="Edit proposal"
            color="primary"
            :to="`/proposals/${id}/edit`"
          />
          <q-btn
            label="Show history"
            color="primary"
          />
        </q-card-section>
      </q-card>
      <q-card class="q-pa-md col">
        <q-chat-message :text="['Oh, this looks like a good idea']"/>
        <q-chat-message :text="['No it\'s really bad']" sent/>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import formatDistance from 'date-fns/formatDistance'

export default {
  data () {
    const { id } = this.$route.params
    const { agreements } = this.$root.$data.group
    const agreement = agreements[id || 0]
    return {
      id,
      vote: null,
      agreement
    }
  },
  computed: {
    dueInWords () {
      return formatDistance(new Date(), this.agreement.date)
    }
  }
}
</script>

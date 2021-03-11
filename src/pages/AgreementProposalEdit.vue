<template>
  <q-page class="flex flex-center">
    <div style="width: 600px;">
      <q-card
        class="q-pa-md"
      >
        <div class="text-h4">Edit proposal</div>

        <q-card-section>
          <q-input
            v-model="agreement.title"
            label="Agreement Title"
            outlined
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.reason"
            label="Reason"
            outlined
            autogrow
            input-style="min-height: 100px;"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.summary"
            label="Summary"
            outlined
            autogrow
            input-style="min-height: 100px;"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.content"
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

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            label="Save"
            color="primary"
          />
        </q-card-section>
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

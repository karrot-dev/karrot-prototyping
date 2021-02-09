<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-card class="q-pa-md q-my-md">
        <q-card-section>
          <q-input
            v-model="group.pendingAgreements.title"
            label="Agreement Title"
            outlined
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="group.pendingAgreements.summary"
            label="Summary"
            outlined
            autogrow
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="group.pendingAgreements.content"
            label="Agreement text"
            outlined
            autogrow
          />
        </q-card-section>

        <q-card-section>
          <div class="q-mt-sm">
            <q-chip color="secondary">+ Add value tags</q-chip>
          </div>
        </q-card-section>

        <q-card-actions
          class="q-pa-sm"
          align="center"
        >
          <q-btn
            label="Submit"
            color="primary"
            to=agreement-details
          />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      group: this.$root.$data.group
    }
  }
}
</script>

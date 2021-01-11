<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-page class="flex-center">
        <q-tabs
           v-model="tab"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="agreements" icon="fas fa-handshake" label="Agreements" />
          <q-tab name="vision" icon="emoji_objects" label="Vision" />
          <q-tab name="decision-making" icon="thumbs_up_down" label="Decision-making" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="agreements">
            <div class="text-h4">Main Agreement</div>
            Whatever you wrote in the previous section will be displayed here
            <div class="text-h5">Other agreements</div>
            Here you can add other agreements
          </q-tab-panel>
          <q-tab-panel name="vision">
            <div class="text-h4">Vision</div>
            Whatever you wrote in the previous section will be displayed here
          </q-tab-panel>
          <q-tab-panel name="decision-making">
            <div class="text-h4">Decision-making</div>
            Whatever you wrote in the previous section will be displayed here
          </q-tab-panel>
        </q-tab-panels>
      </q-page>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tab: 'agreements'
    }
  }
}
</script>

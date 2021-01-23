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
            <q-card class="q-pa-md">
              <div class="text-h5">Title of agreement</div>
              <q-card-section>
                <q-field label="Summary" filled hint="Proposed 23-01-2018" stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline">
                      {{ group.agreement }}
                    </div>
                  </template>
                </q-field>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div>
                  <q-btn label="Tag" color="secondary" />
                  <q-btn label="Show details" color="primary" />
                </div>
              </q-card-section>
            </q-card>

            <div class="text-h5 q-mt-lg q-mb-sm">Title</div>
            <q-field filled hint="Last updated dd-mm-yyyy">
              <template v-slot:control>
                <div class="self-center full-width no-outline">
                  Text for another agreement.
                </div>
              </template>
            </q-field>
            <div class="text-h5 q-mt-lg q-mb-sm">Title</div>
            <q-field class="q-mt-lg" filled label="Pending" hint="Last updated dd-mm-yyyy" stack-label bg-color="secondary">
              <template v-slot:control>
                <div class="self-center full-width no-outline">Here you can see a pending agreement.</div>
              </template>
            </q-field>
            <template>
              <q-btn class="q-mt-lg" round color="primary" icon="fa fa-plus" />
            </template>
          </q-tab-panel>

          <q-tab-panel name="vision">
            <q-field filled hint="Last updated 15-06-2019">
              <template v-slot:control>
                <div class="self-center full-width no-outline">
                  {{ group.vision }}
                </div>
              </template>
            </q-field>
             <div class="q-mt-md">
                <q-btn
                  to="/vertical"
                  fab-mini color="primary"
                  label="Edit Vision"
                  icon="fas fa-pencil-alt"
                />
             </div>
          </q-tab-panel>

          <q-tab-panel name="decision-making">
            <q-field filled>
              <template v-slot:control>
                <div class="self-center full-width no-outline">
                  {{ group.governanceDescription }}
                </div>
              </template>
            </q-field>
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
      tab: 'agreements',
      group: this.$root.$data.group
    }
  }
}
</script>

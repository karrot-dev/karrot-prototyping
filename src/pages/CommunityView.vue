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
            <q-card
              class="q-pa-md q-my-md"
              v-for="agreement in group.pendingAgreements"
              :key="agreement.title"
            >
              <q-card-section class="justify-between" horizontal>
                <div class="text-h5"> {{ agreement.title }}</div>
                <q-chip
                  clickable
                  icon-right="fa fa-history"
                  color="info"
                >
                  Proposed dd-mm-yyyy
                </q-chip>
              </q-card-section>

              <q-card-section>
                <q-field label="Summary" filled stack-label>
                  <template v-slot:control>
                    <div class="self-center full-width no-outline">
                      {{ agreement.summary }}
                    </div>
                  </template>
                </q-field>
                <div class="q-mt-sm">
                  <q-chip color="secondary">Sharing is Caring</q-chip>
                  <q-chip color="secondary">Sustainability</q-chip>
                </div>
              </q-card-section>

              <q-card-section class="q-pa-sm justify-between" horizontal>
                <q-btn label="Show details" color="primary" to=agreement-details />
                <div>
                  <q-icon name="fas fa-thumbs-up" class="q-pa-sm text-primary" style="font-size: 2em">
                    <q-badge color="green" label="15" floating />
                  </q-icon>
                  <q-icon name="fas fa-thumbs-down" class="q-pa-sm text-primary" style="font-size: 2em">
                    <q-badge color="red" floating>3</q-badge>
                  </q-icon>
                </div>
              </q-card-section>
            </q-card>

            <template>
              <q-btn class="q-mt-lg" to=new-agreement round color="primary" icon="fa fa-plus" />
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

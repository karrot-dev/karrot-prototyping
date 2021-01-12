<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <q-card>
        <q-card-section class="q-pa-lg">
          <div class="text-h6">Community organization</div>
          <div class="text-subtitle2">How do things work in your community?</div>
        </q-card-section>
        <q-card-section>
          <div>
            <q-toggle
              v-model="enableVision"
              label="Does your group has a vision?"
            />
            <template v-if="enableVision">
              <p class="text-bold q-mt-md">What is your group's vision?</p>
              <p>What do you want to achieve? This information will be made public.</p>
              <q-input
                v-model="vision"
                filled
                placeholder="Example: We want to rescue surplus food and provide individuals and businesses in our local community with knowledge, tools and power to act, care and share/donate food, without any compromise."
                autogrow
                hint="Markdown..."
              />
            </template>
          </div>

          <template>
            <div>
              <q-separator class="q-mt-lg q-mb-lg" />
              <q-toggle
                v-model="enableGovernance"
                label="Specify how you make decisions?"
              />
              <template v-if="enableGovernance">
                <p class="text-bold q-mt-md">How does your group make decisions?</p>

                <q-btn-toggle
                  v-model="governanceType"
                  toggle-color="primary"
                  unelevated
                  :options="[
                    { label: 'Unspecified', value: 'unspecified' },
                    { label: 'Do-ocracy', value: 'doocracy' },
                    { label: 'Consensus', value: 'consensus' },
                    { label: 'Majority', value: 'majority' },
                    { label: 'Other', value: 'other' },
                  ]"
                  class="q-mb-md"
                />

                <q-input
                  v-model="governance"
                  filled
                  autogrow
                  placeholder="Example: we use the consensus model to make big decisions, but we apply a do-ocracy model for smaller decisions. If consensus can't be reached, we use majority voting as a last resort"
                  hint="Markdown ..."
                />
              </template>
            </div>
          </template>

          <template>
            <div>
              <q-separator class="q-mt-lg q-mb-lg" />
              <q-toggle
                v-model="enableAgreements"
                label="Do you have an agreement to add?"
              />
              <template v-if="enableAgreements">
                <p class="text-bold q-mt-md">You can propose a general agreement to all future members of your group.</p>
                <p>Your agreement proposal will be pending until other two trusted members approve it.</p>
                <q-input
                  v-model="agreements"
                  filled
                  autogrow
                  placeholder="What should everybody agree to in order to join and stay in this group?"
                  hint="Markdown ...."
                />
              </template>
            </div>
          </template>
        </q-card-section>
        <q-card-section>
          <q-btn
            color="primary"
            label="Done"
            to=community
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      enableVision: false,
      vision: '',
      enableGovernance: false,
      governance: '',
      governanceType: 'unspecified',
      enableAgreements: false,
      agreements: ''
    }
  }
}
</script>

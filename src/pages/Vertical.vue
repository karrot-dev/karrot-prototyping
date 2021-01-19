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
              v-if="useToggles"
              v-model="enableVision"
              label="Does your group has a vision?"
            />
            <template v-if="enableVision">
              <p class="text-bold q-mt-md">What is your group's vision?</p>
              <p>What do you want to achieve? This information will be made public.</p>
              <q-input
                v-model="$root.$data.vision"
                filled
                placeholder="Example: We want to rescue surplus food and provide individuals and businesses in our local community with knowledge, tools and power to act, care and share/donate food, without any compromise."
                autogrow
                hint="Markdown..."
              />
            </template>
          </div>

          <template>
            <div>
              <q-separator class="q-my-lg" />
              <q-toggle
                v-if="useToggles"
                v-model="enableGovernance"
                label="Specify how you make decisions?"
              />
              <template v-if="enableGovernance">
                <p class="text-bold q-mt-md">How does your group make decisions?</p>

                <!--
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
                -->

                <div class="q-mb-md row">
                  <q-btn
                    v-for="type in decisionMakingTypes"
                    :key="type.value"
                    unelevated
                    rounded
                    @click="toggleDecisionMakingType(type.value)"
                    class="q-mr-sm"
                    :class="selectedDecisionMakingTypes.includes(type.value) ? 'bg-primary text-white' : ''"
                    :label="type.label"
                  />
                  <q-space/>
                  <q-btn
                    flat
                    @click="showDecisionMakingHelp = true"
                    label="What do these mean?"
                    icon-right="fas fa-info"
                    color="blue"
                  />
                </div>

                <q-input
                  v-model="$root.$data.governance"
                  filled
                  autogrow
                  placeholder="Example: we use the consensus model to make big decisions, but we apply a do-ocracy model for smaller decisions. If consensus can't be reached, we use majority voting as a last resort"
                  hint="Markdown ..."
                />

                <q-dialog v-model="showDecisionMakingHelp">
                  <q-card>
                    <q-card-section>
                      <div class="text-h5">Decision making approaches</div>
                    </q-card-section>

                    <q-card-section
                      v-for="type in decisionMakingTypes"
                      :key="type.value"
                      class="q-pt-none"
                    >
                      <div class="text-h6">{{ type.label }}</div>
                      <p>{{ type.description }}</p>
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="OK" color="primary" v-close-popup />
                    </q-card-actions>
                  </q-card>
                </q-dialog>

              </template>
            </div>
          </template>

          <template>
            <div>
              <q-separator class="q-my-lg" />
              <q-toggle
                v-if="useToggles"
                v-model="enableAgreements"
                label="Do you have an agreement to add?"
              />
              <template v-if="enableAgreements">
                <p class="text-bold q-mt-md">You can propose a general agreement to all future members of your group.</p>
                <p>Your agreement proposal will be pending until other two trusted members approve it.</p>
                <q-input
                  v-model="$root.$data.agreement"
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
    const useToggles = false
    return {
      useToggles,
      enableVision: !useToggles,
      enableGovernance: !useToggles,
      governanceType: 'unspecified',
      decisionMakingTypes: [
        {
          label: 'Do-ocracy',
          value: 'doocracy',
          description: 'Just do stuff, be cool!'
        },
        {
          label: 'Consensus',
          value: 'consensus',
          description: 'Discuss forever, never do anything'
        },
        {
          label: 'Majority',
          value: 'majority',
          description: 'White men get to decide everything'
        }
      ],
      selectedDecisionMakingTypes: [],
      showDecisionMakingHelp: false,
      enableAgreements: !useToggles
    }
  },
  methods: {
    toggleDecisionMakingType (value) {
      const idx = this.selectedDecisionMakingTypes.indexOf(value)
      if (idx !== -1) {
        this.selectedDecisionMakingTypes.splice(idx, 1)
      } else {
        this.selectedDecisionMakingTypes.push(value)
      }
    }
  }
}
</script>

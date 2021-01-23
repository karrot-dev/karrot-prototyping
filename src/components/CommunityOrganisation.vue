<template>
  <q-card
    v-bind="$attrs"
  >
    <q-card-section class="q-pa-lg">
      <div class="text-h6">Community organization</div>
      <div class="text-subtitle2">How do things work in your community?</div>
    </q-card-section>
    <q-card-section>
      <div>
        <p class="text-bold q-mt-md">What is your group's vision?</p>
        <p>What do you want to achieve? This information will be made public.</p>
        <q-input
          v-model="group.vision"
          filled
          placeholder="Example: We want to rescue surplus food and provide individuals and businesses in our local community with knowledge, tools and power to act, care and share/donate food, without any compromise."
          autogrow
          hint="Markdown..."
        />
      </div>

      <div>
        <q-separator class="q-my-lg" />
        <p class="text-bold q-mt-md">How does your group make decisions?</p>

        <div class="q-mb-md row">
          <q-btn
            v-for="type in governanceTypeOptions"
            :key="type.value"
            unelevated
            rounded
            @click="toggleDecisionMakingType(type.value)"
            class="q-mr-sm"
            :class="group.governanceTypes.includes(type.value) ? 'bg-primary text-white' : ''"
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
          v-model="group.governanceDescription"
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
              v-for="type in governanceTypeOptions"
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

      </div>

      <div>
        <q-separator class="q-my-lg" />
        <p class="text-bold q-mt-md">You can propose a general agreement to all future members of your group.</p>
        <p>Your agreement proposal will be pending until other two trusted members approve it.</p>
        <q-input
          v-model="$root.$data.agreement"
          filled
          autogrow
          placeholder="What should everybody agree to in order to join and stay in this group?"
          hint="Markdown ...."
        />
      </div>
    </q-card-section>
    <q-card-section>
      <slot name="actions"/>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      group: this.$root.$data.group,
      governanceTypeOptions: [
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
      showDecisionMakingHelp: false
    }
  },
  methods: {
    toggleDecisionMakingType (value) {
      const idx = this.group.governanceTypes.indexOf(value)
      if (idx !== -1) {
        this.group.governanceTypes.splice(idx, 1)
      } else {
        this.group.governanceTypes.push(value)
      }
    }
  }
}
</script>

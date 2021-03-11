<template>
  <q-page class="flex flex-center">
    <div>
      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        header-nav
      >
        <q-step
          :name="1"
          title="Basic details"
          icon="emoji_objects"
          :done="Boolean(group.name && group.publicDescription)"
        >
          <q-input
            v-model="group.name"
            filled
            label="Group name"
          />

          <q-input
            v-model="group.image"
            filled
            label="Group image/logo"
          />

          <q-input
            v-model="group.publicDescription"
            filled
            label="Public description"
          />

          <q-input
            v-model="group.description"
            filled
            label="Description for members"
          />
        </q-step>

        <q-step
          :name="2"
          title="Address and Location"
          caption="Optional"
          icon="emoji_objects"
          :done="Boolean(group.address)"
        >
          <q-input
            v-model="group.address"
            filled
            label="Address"
          />

          <div>
            would be a map here
          </div>

          <q-input
            v-model="group.timezone"
            filled
            label="Timezone (maybe we can automatically select it from the location?)"
          />
        </q-step>

        <q-step
          :name="3"
          title="New members"
          caption="Optional"
          icon="emoji_objects"
          :done="Boolean(group.applicationQuestions || group.welcomeMessage)"
        >
          <q-input
            v-model="group.applicationQuestions"
            filled
            label="Application questions"
          />

          <q-input
            v-model="group.welcomeMessage"
            filled
            label="Welcome message"
          />
        </q-step>

        <q-step
          :name="4"
          title="Community"
          caption="Optional"
          icon="emoji_objects"
          :done="Boolean(group.vision || group.decisionsDescription)"
        >
          <community-organisation flat/>
        </q-step>

        <template #navigation>
          <q-stepper-navigation>
            <div class="flex">
              <q-space/>
              <q-btn
                v-if="currentStepIsOptional"
                flat
              >
                skip this step
              </q-btn>
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Previous" class="q-ml-sm" />
              <q-btn @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Next'" />
            </div>
          </q-stepper-navigation>
        </template>
      </q-stepper>
    </div>
  </q-page>
</template>

<script>
import CommunityOrganisation from 'components/CommunityOrganisation'
export default {
  name: 'PageGroupWizard',
  components: { CommunityOrganisation },
  data () {
    return {
      step: 1,
      group: this.$root.$data.group
    }
  },
  computed: {
    currentStepIsOptional () {
      return [2, 3, 4].includes(this.step)
    }
  }
}
</script>

<style>
/* override the colour for the "done" state
   otherwise it's blue and looks the same as the active one */
/* ... the icon + the text */
.q-stepper__tab--done {
  color: #2e7d32;
}
/* ... just the icon */
/*
.q-stepper__tab--done .q-stepper__dot {
  color: #2e7d32;
}
*/
</style>

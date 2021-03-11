<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md" style="max-width: 600px">
      <q-page class="flex-center">
        <div class="text-h4">Agreement Details</div>
          <q-card
            class="q-pa-md q-my-md"
            v-for="agreement in group.agreements"
            :key="agreement.title"
          >
            <q-badge
              floating color="positive"
              align="right"
              label="Approved dd-mm-yyyy"
            />
            <div class="text-h5">{{ agreement.title }}</div>
            <q-card-section>
              <q-field
                class="q-mb-md"
                label="Summary"
                filled
                stack-label
              >
                <template v-slot:control>
                  <div class="self-center full-width no-outline">
                    {{ agreement.summary }}
                  </div>
                </template>
              </q-field>

              <q-field
                label="Content"
                filled
                stack-label
              >
                <template v-slot:control>
                  <div class="self-center full-width no-outline">
                    <p>Values</p>
                    <p>Respect</p>
                    <p>Respect means to us acceptance, openness and fairness.</p>
                    <p>Reliability</p>
                    <p>Reliability stems from our own intrinsic motivation.</p>
                    <p>Sense of responsibility</p>
                    <p>A sense of responsibility implies for us sustainability, transparency and nonmonetary dealing with rescued foods. In the sense of this responsibility towards rescued foods, we consider it more important to quickly process rescued foods than giving them away in a charitable way.
                    <p>Community</p>
                    <p>The structure and the procedure of our meetings, coupled with individual responsibility, aims to prevent conflicts. If possible, feedback is given using non-violent communication. In the event of conflicts, the Well-being Manager is there to mediate.</p>
                  </div>
                </template>
              </q-field>

            <div class="q-mt-sm">
                <q-chip color="secondary">
                Sharing is Caring
                </q-chip>
                <q-chip color="secondary">
                Sustainability
                </q-chip>
              </div>
            </q-card-section>

            <q-card-section class="q-pa-sm">
              <q-btn
                class="q-mr-md"
                label="Show History"
                color="primary"
              />
              <q-btn
                label="Propose change"
                color="primary"
              />
            </q-card-section>
          </q-card>
      </q-page>
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

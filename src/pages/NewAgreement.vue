<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <!--

        This is an implementation of https://community.foodsaving.world/t/stage-3-making-a-decision/608/4

      -->
      <q-card class="q-pa-md q-my-md">
        <q-card-section>
          <h3>Propose a new agreement</h3>
          <p>
            Here you can propose a new agreement for the group.
            It will be open for discussion and other editors will be able to collaborate with you on it.
            All members will be able to make comments and suggestions.
          </p>
          <p>
            When the time period is over, if enough people have voted positively for it, then it will have passed!
            Otherwise, you'll have an option to resubmit it with modifications.
          </p>
        </q-card-section>

        <q-card-section>
          <q-input
            label="Duration for discussion and voting"
            ref="dueBy"
            v-model="dueBy"
            outlined
            @blur="$refs.dueByProxy.hide()"
            @focus="$refs.dueByProxy.show()"
          >
            <component
              :is="smallScreen ? 'QDialog' : 'QMenu'"
              ref="dueByProxy"
              no-focus
              no-refocus
              no-parent-event
              @hide="$refs.dueBy.blur()"
            >
              <q-date
                v-model="dueBy"
                :mask="dueByMask"
                minimal
                @input="() => smallScreen && $refs.dueByProxy.hide()"
              />
            </component>
            <template #append>
              {{ dueInWords }}
            </template>
          </q-input>
        </q-card-section>

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
            input-style="min-height: 100px;"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="group.pendingAgreements.content"
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
  </q-page>
</template>

<script>
import { date } from 'quasar'
import formatDistance from 'date-fns/formatDistance'
// import formatDistanceStrict from 'date-fns/formatDistanceStrict'

const { addToDate, formatDate, extractDate, adjustDate } = date

export default {
  data () {
    const dueByMask = 'YYYY-MM-DD'
    return {
      group: this.$root.$data.group,
      dueByMask,
      dueByDate: addToDate(new Date(), { days: 7 })
    }
  },
  computed: {
    smallScreen () {
      return this.$q.screen.width < 450 || this.$q.screen.height < 450
    },
    dueInWords () {
      return formatDistance(new Date(), this.dueByDate)
    },
    dueBy: {
      get () {
        return formatDate(this.dueByDate, this.dueByMask)
      },
      set (val) {
        val = extractDate(val, this.dueByMask)
        // would need to do a bit of timezone thinking...
        val = adjustDate(val, { hours: 23, minutes: 59, seconds: 59 })
        this.dueByDate = val
      }
    }
  }
}
</script>

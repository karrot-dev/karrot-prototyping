<template>
  <q-page class="flex flex-center">
    <div style="width: 800px;">
      <q-card
        class="q-pa-md"
      >
        <q-card-section v-if="!isNew">
          <div class="text-h4">Edit proposal</div>
        </q-card-section>

        <q-card-section v-if="isNew && isChangeToExistingAgreement">
          <div class="text-h4">Propose change to existing agreement</div>
          <p>
            You are proposing a change to the agreement: <a :href="`/#/agreements/${existingAgreementId}`" target="_blank">{{ existingAgreement.title }}</a>.
          </p>
          <p>
            It will be open for discussion with everyone in the group and other editors will be able to collaborate with you on it.
          </p>
          <p>
            When the time period is over, if enough people have voted positively for it, then it will have passed!
            Otherwise, you'll have an option to resubmit it with modifications.
          </p>
        </q-card-section>

        <q-card-section v-if="isNew && !isChangeToExistingAgreement">
          <div class="text-h4">Propose a new agreement</div>
          <p>
            You are proposing a new agreement for the group.
          </p>
          <p>
            It will be open for discussion with everyone in the group and other editors will be able to collaborate with you on it.
          </p>
          <p>
            When the time period is over, if enough people have voted positively for it, then it will have passed!
            Otherwise, you'll have an option to resubmit it with modifications.
          </p>
        </q-card-section>

        <q-card-section v-if="isNew">
          <q-input
            label="Duration for discussion and voting"
            ref="date"
            v-model="agreementDate"
            outlined
            @blur="$refs.dateProxy.hide()"
            @focus="$refs.dateProxy.show()"
          >
            <component
              :is="smallScreen ? 'QDialog' : 'QMenu'"
              ref="dateProxy"
              no-focus
              no-refocus
              no-parent-event
              @hide="$refs.date.blur()"
            >
              <q-date
                v-model="agreementDate"
                :mask="dateMask"
                :navigation-min-year-month="'2021/03'"
                :options="isValidDate"
                minimal
                @input="() => smallScreen && $refs.dateProxy.hide()"
              />
            </component>
            <template #append>
              {{ dueInWords }}
            </template>
          </q-input>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.title"
            label="Agreement Title"
            outlined
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.reason"
            label="Reason"
            outlined
            autogrow
            input-style="min-height: 100px;"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.summary"
            label="Summary"
            outlined
            autogrow
            input-style="min-height: 100px;"
          />
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="agreement.content"
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

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            :label="isNew ? 'Create' : 'Save'"
            color="primary"
            @click="save()"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import cloneDeep from 'clone-deep'
import formatDistance from 'date-fns/formatDistance'
import { date } from 'quasar'
import { nextId } from 'boot/state'

const { addToDate, formatDate, extractDate, adjustDate } = date

export default {
  data () {
    const { proposalId: id, agreementId } = this.$route.params
    const { agreements } = this.$root.$data.group
    let agreement
    let existingAgreement
    if (id) {
      agreement = agreements.find(a => a.id === id)
    } else {
      if (agreementId) {
        // based on existing agreement
        existingAgreement = agreements.find(a => a.id === agreementId)
        agreement = cloneDeep(existingAgreement)
        agreement.previousAgreementId = agreementId
      } else {
        // a fresh new one
        agreement = cloneDeep(this.$root.$data.newAgreement)
      }
      agreement.date = addToDate(new Date(), { days: 7 })
    }
    return {
      id,
      existingAgreement,
      existingAgreementId: agreementId,
      vote: null,
      agreement,
      dateMask: 'YYYY-MM-DD'
    }
  },
  methods: {
    save () {
      if (this.id) {
        this.$q.notify({
          message: 'Your changes were saved!',
          color: 'green'
        })
        this.$router.push(`/proposals/${this.id}`)
      } else {
        this.$root.$data.group.agreements.push(this.agreement)
        this.$q.notify({
          message: 'Proposal was created!',
          color: 'green'
        })
        this.agreement.id = nextId()
        this.$router.push(`/proposals/${this.agreement.id}`)
      }
    },
    isValidDate (date) {
      // only allow future dates
      return date >= formatDate(new Date(), 'YYYY/MM/DD')
    }
  },
  computed: {
    isNew () {
      return !this.id
    },
    isChangeToExistingAgreement () {
      return Boolean(this.existingAgreement)
    },
    dueInWords () {
      return formatDistance(new Date(), this.agreement.date)
    },
    smallScreen () {
      return this.$q.screen.width < 450 || this.$q.screen.height < 450
    },
    agreementDate: {
      get () {
        return formatDate(this.agreement.date, this.dateMask)
      },
      set (val) {
        if (!val) return // clicking on the selected date sets it to null, we don't want this behaviour
        val = extractDate(val, this.dateMask)
        // would need to do a bit of timezone thinking...
        val = adjustDate(val, { hours: 23, minutes: 59, seconds: 59 })
        this.agreement.date = val
      }
    }
  }
}
</script>

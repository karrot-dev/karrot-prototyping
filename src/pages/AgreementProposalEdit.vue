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
          <div class="text-h4 q-mb-md">Propose change to existing agreement</div>
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
          <div class="text-h4 q-mb-md">Propose a new agreement</div>
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
            label="Time period for discussion and voting"
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

        <q-card-section v-if="isNew && isChangeToExistingAgreement">
          <q-input
            v-model="agreement.reason"
            label="Reason for proposal (optional)"
            hint="Why are making this proposal? Is it a response to something that happened? What are you hoping it will achieve?"
            outlined
            autogrow
            input-style="min-height: 65px;"
          />
        </q-card-section>

        <q-card-section v-if="isNew && isChangeToExistingAgreement">
          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="changes" val="later" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Start the discussion first</q-item-label>
                <q-item-label caption>You can propose changes later</q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-radio v-model="changes" val="now" color="teal" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Propose changes first</q-item-label>
                <q-item-label caption>You can discuss and refine them later</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>

        </q-card-section>

        <template v-if="changes === 'now' || !isChangeToExistingAgreement">
          <q-card-section v-if="isNew && isChangeToExistingAgreement && changes === 'now'">
            <div class="text-h6 q-mb-lg">Proposed changes</div>
            <q-banner class="bg-orange-1 q-pa-md q-mt-md">
              <template #avatar>
                <q-icon name="fas fa-edit" color="primary" />
              </template>
              Propose the changes you'd like to discuss, you can still make changes later
            </q-banner>
          </q-card-section>

          <q-card-section v-if="isNew && !isChangeToExistingAgreement">
            <div class="text-h6">New Agreement</div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="agreement.title"
              label="Agreement Title"
              outlined
            />
          </q-card-section>

          <!--
          <q-card-section v-if="selectedValues.length === 0">
            <q-banner class="bg-orange-1 q-pa-md q-mb-md">
              Add the values you are trying to encourage to help people to understand why the agreement is important.
            </q-banner>
            <q-btn
              label="Add values"
              unelevated
              rounded
              color="green"
              @click="editValues = true"
            />
          </q-card-section>
          <q-card-section v-else>
            <values :values="agreement.values" class="q-mb-lg q-pa-md bg-grey-2"/>
            <q-btn
              label="Edit values"
              unelevated
              rounded
              color="green"
              @click="editValues = true"
            />
          </q-card-section>

          <custom-dialog v-model="editValues">
            <template #message>
              <div
                v-for="category in valueCategoryDefinitions"
                :key="category.name"
              >
                <div class="text-h4 q-my-md q-ml-md">
                  <small style="white-space: nowrap">To help support</small>&nbsp;
                  <strong>{{ category.name }}</strong>&nbsp;
                  <small style="white-space: nowrap">we encourage:</small>
                </div>
                <q-btn
                  v-for="value in valuesForCategory(category.name)"
                  :key="value.name"
                  :label="value.name"
                  unelevated
                  rounded
                  @click="toggleValue(value)"
                  class="q-mr-sm q-mb-sm"
                  :class="selectedValues.includes(value) ? 'bg-green text-white' : ''"
                />
              </div>
            </template>
            <template #actions>
              <QBtn
                v-close-popup
                flat
                color="primary"
                label="Done"
              />
            </template>

          </custom-dialog>
          -->

          <q-card-section>
            <q-input
              v-model="agreement.summary"
              label="Summary (optional)"
              outlined
              autogrow
              input-style="min-height: 65px; max-height: 600px;"
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="agreement.content"
              label="Agreement text"
              outlined
              autogrow
              input-style="min-height: 200px; max-height: 600px;"
            />
          </q-card-section>
        </template>

        <q-card-section class="q-pa-sm">
          <q-btn
            class="q-mr-md"
            :label="isNew ? 'Create proposal' : 'Save'"
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
import CustomDialog from 'components/CustomDialog'
import Values from 'components/Values'
import { valueCategoryDefinitions, valueDefinitions } from 'src/data'

const { addToDate, formatDate, extractDate, adjustDate } = date

export default {
  components: {
    Values,
    CustomDialog
  },
  data () {
    const { proposalId: id, agreementId } = this.$route.params
    const { group } = this.$root.$data
    const { agreements } = group
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
        agreement.reason = ''
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
      dateMask: 'YYYY-MM-DD',
      editValues: false,
      valueCategoryDefinitions,
      changes: 'later'
    }
  },
  methods: {
    valuesForCategory (category) {
      return valueDefinitions.filter(value => value.categories.includes(category))
    },
    toggleValue (value) {
      const idx = this.agreement.values.indexOf(value.name)
      if (idx !== -1) {
        this.agreement.values.splice(idx, 1)
      } else {
        this.agreement.values.push(value.name)
      }
    },
    save () {
      if (this.id) {
        this.$q.notify({
          message: 'Your changes were saved!',
          color: 'green'
        })
        this.$router.push(`/proposals/${this.id}`)
      } else {
        if (this.isChangeToExistingAgreement && this.changes === 'later') {
          // just in case they made changes then selected "later" again
          for (const key of ['title', 'summary', 'content']) {
            this.agreement[key] = this.existingAgreement[key]
          }
        }
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
    selectedValues () {
      return this.agreement.values.map(name => valueDefinitions.find(value => value.name === name))
    },
    selectedCategories () {
      const categories = new Set()
      for (const value of this.selectedValues) {
        for (const category of value.categories) {
          categories.add(category)
        }
      }
      return Array.from(categories).map(name => valueCategoryDefinitions.find(category => category.name === name))
    },
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

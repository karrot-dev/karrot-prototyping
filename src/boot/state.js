import { date } from 'quasar'
import massiveDoc from 'pages/massive-doc.md'

const { addToDate, subtractFromDate } = date

const STATE_VERSION = 5 // can bump this to invalidate the data, if you change it a lot

export const DATA_KEY = `data:v${STATE_VERSION}`

export function nextId () {
  // ms timestamp + random
  // as string to simplify route param check
  return String((new Date().getTime() * 1000) + Math.floor(Math.random() * 1000))
}

export function initialData () {
  const now = new Date()
  return {
    options: {
      votingControl: 'text-buttons'
    },
    // you can use this as a "template" for a new agreement data object
    newAgreement: {
      title: '',
      summary: '',
      content: '',
      tags: [],
      vote: null, // for the current user, as that's all there is!
      date: null, // fill in later,
      messages: [], // chat messages,
      values: [], // list of the value names
      previousAgreementId: null // if it has a history!
    },
    group: {
      // existing fields
      name: '',
      publicDescription: '',
      description: '',
      welcomeMessage: '',
      applicationQuestions: '',
      address: '',
      latitude: null,
      longitude: null,
      timezone: null,
      image: '', // not sure if this is how we use the field

      // new governance-related fields!
      vision: '',
      governanceTypes: [],
      governanceDescription: '',
      agreements: [
        // agreed (date is in the past)

        {
          id: nextId(),
          reason: 'We have a lot of people now, so we need clearer guidelines',
          title: 'Procedures for food pickups',
          summary: 'Make sure you are nice and polite',
          content: 'Being polite is very important, there are 35 different aspects to consider, ...',
          tags: [],
          vote: null,
          messages: [],
          values: [],
          date: subtractFromDate(now, { days: 5 }),
          previousAgreementId: null
        },
        {
          id: nextId(),
          reason: 'We need to tighten up our meetings',
          title: 'Guidelines for running meetings',
          summary: 'Announce them early, take minutes, invite all to speak',
          content: 'It is suggested that you announce the meetings at least 7 days in advance, and publish them at...',
          tags: [],
          vote: null,
          messages: [],
          values: [],
          date: subtractFromDate(now, { days: 12 }),
          previousAgreementId: null
        },
        {
          id: nextId(),
          reason: 'See how a big doc is',
          title: 'Group Agreement',
          summary: '',
          content: massiveDoc,
          tags: [],
          vote: null,
          messages: [],
          values: [],
          date: subtractFromDate(now, { days: 3 }),
          previousAgreementId: null
        },

        // proposals (date is in the future)

        {
          id: nextId(),
          reason: 'A reason to change the agreement',
          title: 'A proposal',
          summary: 'Summary to proposal 1',
          content: 'The agreement with some changes 1',
          tags: [],
          vote: null,
          messages: [],
          values: [],
          date: addToDate(now, { days: 7 }),
          previousAgreementId: null
        },
        {
          id: nextId(),
          reason: 'A reason to change the agreement 2',
          title: 'Another proposal',
          summary: 'Summary to proposal 2',
          content: 'The agreement with some changes 2',
          tags: [],
          vote: null,
          messages: [],
          values: [],
          date: addToDate(now, { days: 14 }),
          previousAgreementId: null
        }
      ]

      // not part of it at the moment...
      // theme: '',
      // status: '',
    }
  }
}

function convertState (data) {
  // ensure dates are dates, etc...
  const { group } = data
  const { agreements } = group
  for (const agreement of agreements) {
    agreement.date = new Date(agreement.date)
  }
  return data
}

export default ({ app }) => {
  const value = localStorage.getItem(DATA_KEY)
  if (value) {
    app.data = convertState(JSON.parse(value))
  } else {
    app.data = convertState(initialData())
  }
}

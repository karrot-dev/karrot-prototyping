import { date } from 'quasar'
const { addToDate, subtractFromDate } = date

const STATE_VERSION = 1 // can bump this to invalidate the data, if you change it a lot

export const DATA_KEY = `data:v${STATE_VERSION}`

export function initialData () {
  const now = new Date()
  return {
    // you can use this as a "template" for a new agreement data object
    newAgreement: {
      title: '',
      summary: '',
      content: '',
      tags: [],
      dueBy: null // fill in later
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
        {
          reason: 'We have a lot of people now, so we need clearer guidelines',
          title: 'Procedures for food pickups',
          summary: 'Make sure you are nice and polite',
          content: 'Being polite is very important, there are 35 different aspects to consider, ...',
          tags: [],
          date: subtractFromDate(now, { days: 5 })
        },
        {
          reason: 'We need to tighten up our meetings',
          title: 'Guidelines for running meetings',
          summary: 'Announce them early, take minutes, invite all to speak',
          content: 'It is suggested that you announce the meetings at least 7 days in advance, and publish them at...',
          tags: [],
          date: subtractFromDate(now, { days: 12 })
        }
      ],
      pendingAgreements: [
        {
          reason: 'A reason to change the agreement',
          title: 'A proposal',
          summary: 'Summary to proposal 1',
          content: 'The agreement with some changes 1',
          tags: [],
          date: addToDate(now, { days: 7 })
        },
        {
          reason: 'A reason to change the agreement 2',
          title: 'Another proposal',
          summary: 'Summary to proposal 2',
          content: 'The agreement with some changes 2',
          tags: [],
          date: addToDate(now, { days: 14 })
        }
      ]

      // not part of it at the moment...
      // theme: '',
      // status: '',
    }
  }
}

export default ({ app }) => {
  const value = localStorage.getItem(DATA_KEY)
  if (value) {
    app.data = JSON.parse(value)
  } else {
    app.data = initialData()
  }
}

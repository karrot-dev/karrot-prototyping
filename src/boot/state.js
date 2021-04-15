import { date } from 'quasar'

const { addToDate, subtractFromDate } = date

const STATE_VERSION = 8 // can bump this to invalidate the data, if you change it a lot

export const DATA_KEY = `data:v${STATE_VERSION}`

export function nextId () {
  // ms timestamp + random
  // as string to simplify route param check
  return String((new Date().getTime() * 1000) + Math.floor(Math.random() * 1000))
}

// you can use this as a "template" for a new agreement data object
export const newAgreement = {
  title: '',
  summary: '',
  content: '',
  tags: [],
  vote: null, // for the current user, as that's all there is!
  date: null, // fill in later,
  messages: [], // chat messages,
  values: [], // list of the value names
  previousAgreementId: null // if it has a history!
}

export function initialData (scenario) {
  if (!scenario) scenario = 'empty'
  switch (scenario) {
    case 'empty':
      return emptyData()
    case 'sample':
      return sampleData()
    default:
      throw new Error('invalid scenario ' + scenario)
  }
}

export function emptyData () {
  return {
    options: {
      votingControl: 'text-buttons'
    },
    newAgreement,
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
      agreements: []
    }
  }
}

export function sampleData () {
  const now = new Date()
  const data = emptyData()
  const cooperationId = nextId()
  data.group.agreements = [
    // agreed (date is in the past)

    {
      id: nextId(),
      reason: '',
      title: 'Meetings & Decisions',
      summary: 'How we run our meetings and how decisions are made',
      content: require('./sample/meetings.md').default,
      values: ['Transparency', 'Reliability', 'Respect'],
      vote: null,
      messages: [],
      date: subtractFromDate(now, { days: 5 }),
      previousAgreementId: null
    },
    {
      id: cooperationId,
      reason: '',
      title: 'Cooperation with companies',
      summary: 'Guidelines for interacting with companies we co-operate with',
      content: require('./sample/store-cooperation.md').default,
      values: ['Local Regulation', 'Transparency', 'Reliability'],
      vote: null,
      messages: [],
      date: subtractFromDate(now, { days: 5 }),
      previousAgreementId: null
    },
    {
      id: nextId(),
      reason: '',
      title: 'Money',
      summary: 'How we deal with money within the group',
      content: require('./sample/money.md').default,
      values: ['Legality', 'Equality', 'Free Access'],
      vote: null,
      messages: [],
      date: subtractFromDate(now, { days: 5 }),
      previousAgreementId: null
    },

    // proposals (date is in the future)

    {
      id: nextId(),
      reason: 'Added step for more transparency',
      title: 'Cooperation with companies',
      summary: 'Guidelines for interacting with companies we co-operate with',
      content: require('./sample/store-cooperation-proposal.md').default,
      tags: [],
      vote: null,
      messages: [],
      values: [],
      date: addToDate(now, { days: 7 }),
      previousAgreementId: cooperationId
    }
  ]
  return data
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

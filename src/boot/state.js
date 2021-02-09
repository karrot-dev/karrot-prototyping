export function initialData () {
  return {
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
          title: 'Title for an agreement 1',
          summary: 'Summary for an agreement 1',
          content: 'The agreement itself 1',
          tags: []
        },
        {
          title: 'This a title 2',
          summary: 'Summary for an agreement 2',
          content: 'The agreement itself 2',
          tags: []
        }
      ],
      pendingAgreements: [
        {
          title: 'A proposal',
          reason: 'A reason to change the agreement',
          summary: 'Summary to proposal 1',
          content: 'The agreement with some changes 1',
          tags: []
        },
        {
          title: 'Another proposal',
          reason: 'A reason to change the agreement 2',
          summary: 'Summary to proposal 2',
          content: 'The agreement with some changes 2',
          tags: []
        }
      ]

      // not part of it at the moment...
      // theme: '',
      // status: '',
    }
  }
}

export default ({ app }) => {
  const value = localStorage.getItem('data')
  if (value) {
    app.data = JSON.parse(value)
  } else {
    app.data = initialData()
  }
}

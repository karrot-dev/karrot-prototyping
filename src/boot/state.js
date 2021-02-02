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
          title: 'This a title 1',
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

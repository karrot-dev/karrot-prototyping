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
      agreements: []

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

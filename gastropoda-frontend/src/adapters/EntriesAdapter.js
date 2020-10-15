class EntriesAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/entries'
  }

  getEntries() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  getEntry(id) {
    return fetch(`${this.baseUrl}/${id}`).then(response => response.json())
  }

  createEntry(value) {
    const newEntry = {
      entry: {
        image: value}
    }
    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newEntry)
    })
    .then(response => response.json())
  }
}
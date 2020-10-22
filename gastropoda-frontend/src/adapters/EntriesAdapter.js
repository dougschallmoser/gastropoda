class EntriesAdapter {
  constructor() {
    this.baseUrl = 'https://gastropoda-frontend.herokuapp.com/api/v1/entries'
  }

  getEntries() {
    return fetch(this.baseUrl).then(response => response.json())
  }

  createEntry(formValues) {
    const newEntry = {
      entry: formValues
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

  updateEntryLikes(id, numOfLikes) {
    const updateLike = {
      entry: {
        likes: numOfLikes
      }
    }

    return fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(updateLike)
    })
    .then(response => response.json())
  }
}
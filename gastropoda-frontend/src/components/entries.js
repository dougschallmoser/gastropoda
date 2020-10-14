class Entries {
  constructor() {
    this.entries = []
    this.adapter = new EntriesAdapter()
    this.loadEntries()
    this.setBindings()
    this.setEventListeners()
  }

  setBindings() {
    this.container = document.querySelector('.container')
    this.newForm = document.querySelector('.new-form')
    this.entriesContainer = document.querySelector('.entries-container')
    this.newEntryImage = document.getElementById('image')
    this.loadFormButton = document.getElementById('button-load-form')
  }

  setEventListeners() {
    this.loadFormButton.addEventListener('click', this.loadForm.bind(this))
  }

  loadForm() {
    if (document.querySelector('.entry-form')) {
      this.closeForm()
    } else {
      const formDiv = document.createElement('div')
      formDiv.className = "entry-form"
      formDiv.innerHTML = `
      <form id="entry-form">
        <label for="title">Title:</label>
        <input type="text" id="title"><p></p>
        <label for="author_name">Author Name:</label>
        <input type="text" id="author_name"><p></p>
        <label for="author_bio">Author Bio:</label>
        <input type="text" id="author_bio" name="author_bio"><p></p>
        <label for="content">Content:</label>
        <input type="text" id="content"><p></p>
        <label for="image">Image URL:</label>
        <input type="text" id="image"><p></p>
        <input type="submit">
      </form>`
      this.newForm.append(formDiv)
      this.loadFormButton.innerText = "Close"
      this.entryForm = document.getElementById('entry-form')
      this.entryForm.addEventListener('submit', this.createEntry.bind(this))
    }
  }

  closeForm() {
    document.querySelector('.entry-form').remove()
    this.loadFormButton.innerText = "Submit Story"
  }

  createEntry(event) {
    event.preventDefault()
    const imageValue = this.newEntryImage.value
    this.adapter.createEntry(imageValue).then(entry => {
      this.entries.push(new Entry(entry))
      this.newEntryImage.value = ''
      this.render()
    })
  }

  loadEntries() {
    this.adapter.getEntries().then(entries => {
      entries.forEach(entry => this.entries.push(new Entry(entry)))
    })
    .then(() => {
      this.render()
    })
  }

  render() {
    this.entriesContainer.innerHTML = ''
    this.entries.map(entry => {
      this.entriesContainer.appendChild(entry.renderItem())
    })
  }

}
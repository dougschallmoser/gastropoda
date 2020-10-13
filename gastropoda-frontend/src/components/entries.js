class Entries {
  constructor() {
    this.entries = []
    this.adapter = new EntriesAdapter()
    this.loadEntries()
    this.setBindings()
    this.setEventListeners()
  }

  setBindings() {
    this.entriesContainer = document.querySelector('.entries-container')
    this.entryForm = document.getElementById('entry-form')
    this.newEntryImage = document.getElementById('image')
    // this.newEntryContent = document.getElementById('content')
  }

  setEventListeners() {
    this.entryForm.addEventListener('submit', this.createEntry.bind(this))
  }

  createEntry(event) {
    event.preventDefault()
    // const contentValue =  this.newEntryContent.value
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

  // render() {
  //   this.entriesContainer.innerHTML = this.entries.map(entry => {
  //     return entry.renderItem()
  //   }).join(' ')
  // }

}
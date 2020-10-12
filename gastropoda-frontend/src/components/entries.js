class Entries {
  constructor() {
    this.entries = []
    this.adapter = new EntriesAdapter()
    // this.bindEventListeners()
    this.loadEntries()
  }

  loadEntries() {
    this.adapter.getEntries().then(entries => {
      entries.forEach(entry => this.entries.push(entry))
    })
    .then(() => {
      this.render()
    })
  }

  render() {
    const entriesContainer = document.getElementById('entries-container')
    entriesContainer.innerHTML = 'my entries here'
    console.log('my entries are:', this.entries)
  }
}
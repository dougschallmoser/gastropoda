class Entries {
  constructor() {
    this.entries = []
    this.adapter = new EntriesAdapter()
    // this.loadEntries()
    this.setBindings()
    this.setEventListeners()
  }

  setBindings() {
    this.navBar = document.getElementById('nav-bar')
    this.mainContent = document.getElementById('main-content')
    this.newEntryImage = document.getElementById('image')
  }

  setEventListeners() {
    this.navBar.getElementsByTagName('a')[2].addEventListener('click', this.loadForm(this))
  }

  loadForm() {
    if (!document.querySelector('.entry-form')) {
      const form = document.createElement('div')
      form.className = "entry-form-div"
      form.innerHTML = `
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
      this.mainContent.append(form)
      this.entryForm = document.getElementById('entry-form')
      this.entryForm.addEventListener('submit', this.createEntry.bind(this))
    } 
  }

  createEntry(event) {
    event.preventDefault()
    const formImageValue = document.getElementById('image').value
    this.adapter.createEntry(formImageValue).then(entry => {
      this.entries.push(new Entry(entry))
      document.getElementById('image').value = ''
      this.render()
    })
  }

  // loadEntries() {
  //   this.adapter.getEntries().then(entries => {
  //     entries.forEach(entry => this.entries.push(new Entry(entry)))
  //   })
  //   .then(() => {
  //     this.render()
  //   })
  // }

  // render() {
  //   this.entriesContainer.innerHTML = ''
  //   this.entries.map(entry => {
  //     this.entriesContainer.appendChild(entry.renderItem())
  //   })
  // }

}
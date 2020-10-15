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
    this.navBar.getElementsByTagName('a')[2].addEventListener('click', this.loadForm.bind(this))
  }

  loadForm() {
    if (!document.querySelector('.entry-form')) {
      const div = `
      <div class="form-container">
        <div class="left">I'm baby normcore mixtape retro offal typewriter slow-carb biodiesel banh mi enamel pin unicorn whatever fingerstache. Cronut semiotics tumblr, enamel pin raw denim master cleanse craft beer pinterest YOLO keytar hexagon. YOLO schlitz crucifix aesthetic. Poke hexagon biodiesel, flannel irony roof party vinyl.<br><img src="images/gastropoda-logo-trq.png"></div>
          <div class="right">
            <div id="submit-heading">Submit your story for review!</div><br>
            <form id="entry-form">
              <div class="row">
                <div class="col-15">
                  <label for="title">Title:</label>
                </div>
                <div class="col-85">
                  <input type="text" id="title" name="title" placeholder="Story Title">
                </div>
              </div>
              <div class="row">
                <div class="col-15">
                  <label for="author_name">Name:</label>
                </div>
                <div class="col-85">
                  <input type="text" id="author_name" name="author_name" placeholder="Author Name">
                </div>
             </div>
             <div class="row">
              <div class="col-15">
                <label for="author_bio">Bio:</label>
              </div>
              <div class="col-85">
                <input type="text" id="author_bio" name="author_bio" placeholder="Author Bio">
              </div>
            </div>
            <div class="row">
              <div class="col-15">
                <label for="content">Content:</label>
              </div>
              <div class="col-85">
                <textarea id="content" name="content" placeholder="Content of the story..." style="height:200px"></textarea>
              </div>
              </div>
            <div class="row">
              <div class="col-15">
                <label for="image">Image:</label>
              </div>
              <div class="col-85">
                <input type="text" id="image" name="image" placeholder="http://www.example.com/image.jpg">
              </div>
            </div>
            <div class="row submit">
              <input type="submit" value="Submit">
            </div>
            </form>
          </div>
        </div>
      </div>`
      this.mainContent.innerHTML = div
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
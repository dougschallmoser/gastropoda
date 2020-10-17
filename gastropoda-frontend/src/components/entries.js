class Entries {
  constructor() {
    this.entries = []
    this.adapter = new EntriesAdapter()
    this.setBindings()
    this.setEventListeners()
  }

  setBindings() {
    this.navBar = document.getElementById('nav-bar')
    this.mainContent = document.getElementById('main-content')
  }

  setEventListeners() {
    this.navBar.getElementsByTagName('a')[1].addEventListener('click', this.loadEntries.bind(this))
    this.navBar.getElementsByTagName('a')[2].addEventListener('click', this.loadForm.bind(this))
  }

  loadForm() {
    if (!document.querySelector('.entry-form')) {
      const div =
      `<div class="form-container">
        <div class="left">
          <p>We accept submissions on a rolling basis, with the aim of publishing 1-3 pieces weekly.</p>
          <p>Response time varies depending on the number of submissions we have at the moment, but if you haven’t heard back from us in a few months, feel free to reach out to us about your piece.</p>
          <p>Please only submit your unpublished work.</p>
          <p>Simultaneous submissions are fine, but please let us know ASAP if your work gets accepted somewhere else. Congrats!</p>
          <p>By submitting to Gastropoda, you agree to grant us First World Electronic Rights and Non-Exclusive Archival Rights, so that we can continue to keep your work on our site. All other rights remain yours. If your work is published elsewhere in the future, please consider giving a shout out to Gastropoda as its first home.</p>
          <p>We cannot offer payment at this time, but we can offer goodwill and love everlasting.</p>
          <p>Please use our form to submit. We would be honored to read your work.</p>
          <img src="images/gastropoda-logo-trq.png"></div>
        <div class="right">
          <div id="submit-heading">Submit your story for review!</div><br>
          <div id="submit-heading2">Fiction or Creative Nonfiction, 100-4,000 words.</div><br>
          <div id="submit-subheading">
            Sure, we like literary stuff, but we are not super picky about the so-called genre your piece might fit into. We can tell you that we’re not interested in gratuitous sex, violence, or vulgarity. We are especially drawn to pieces that don’t follow traditional narrative arcs, that surprise us and leave us with some questions (but not TOO many), and that are overflowing with fresh sensory language that makes our heart hurt a little bit. Send us your misfits, your miscreants, your outcasts, your rebels--the pieces you’ve put your whole essence into, but you aren’t quite sure where they might fit in. They might fit in at Gastropoda. 
          </div>
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
              <textarea id="content" name="content" placeholder="Paste story here..."></textarea>
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
    const self = this
    const titleValue = document.getElementById('title').value
    const nameValue = document.getElementById('author_name').value
    const bioValue = document.getElementById('author_bio').value
    const contentValue = document.getElementById('content').value
    const imageValue = document.getElementById('image').value
    const formValues = {
      title: titleValue,
      author_name: nameValue,
      author_bio: bioValue,
      content: contentValue,
      image: imageValue
    }
    this.adapter.createEntry(formValues).then(entry => {
      const div = document.createElement('div')
      const contentDiv = document.createElement('div')
      const span = document.createElement('span')
      const p = document.createElement('p')
      const p2 = document.createElement('p')
      div.id = "myModal"
      div.className = "modal"
      contentDiv.className = "modal-content"
      span.className = "close"
      span.innerHTML = `&times;`
      contentDiv.append(span)
      if (entry.messages) {
        entry.messages.forEach(message => {
          p2.innerHTML += `<li>${message}</li>`
        })
        p.innerHTML = "Your story was <strong>not</strong> submitted because..."

        contentDiv.append(p)
        contentDiv.append(p2)
        div.append(contentDiv)
        div.style.display = "block"
        document.querySelector('#main-content').append(div)
        
        span.addEventListener('click', function() {
          div.remove()
        })
        window.addEventListener('click', function(event) {
          if (event.target == div) {
            div.remove()
          }
        })
      } else {
        p.innerHTML = "Your story was <strong>successfully</strong> submitted!"

        contentDiv.append(p)
        contentDiv.append(p2)
        div.append(contentDiv)
        div.style.display = "block"
        document.querySelector('#main-content').append(div)
        
        span.addEventListener('click', function() {
          div.remove()
        })
        window.addEventListener('click', function(event) {
          if (event.target == div) {
            div.remove()
          }
        })

        this.entries.push(new Entry(entry))
        self.render()
      }
    })
  }

  loadEntries() {
    if (this.entries.length === 0) {
      this.adapter.getEntries().then(entries => {
        entries.forEach(entry => this.entries.push(new Entry(entry)))
      }).then(() => {this.render()})
    } else {
      this.render()
    }
  }

  render() {
    while (this.mainContent.firstChild) {
      this.mainContent.removeChild(this.mainContent.firstChild);
    }
      const div = document.createElement('div')
      div.className = "entry-grid"
      this.mainContent.append(div)
      this.entries.map(entry => {
        div.prepend(entry.renderItem())
      })
  }

}
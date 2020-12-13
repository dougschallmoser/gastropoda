class Entry {

  static allEntries = []
  static mainContent = document.getElementById('main-content')

  constructor(entry) {
    this.id = entry.id
    this.title = entry.title
    this.authorName = entry.author_name
    this.authorBio = entry.author_bio 
    this.fiction = entry.fiction
    this.content = entry.content
    this.likes = entry.likes
    this.image = entry.image
    this.createdAt = entry.created_at
    this.comments = entry.comments.map(comment => new Comment(comment))
    Entry.allEntries.push(this)
  }

  static loadEntries() {
    const loadingIcon = document.createElement('div')
    loadingIcon.className = 'loader'
    this.mainContent.append(loadingIcon)
    if (Entry.allEntries.length === 0) {
      new EntriesAdapter().getEntries().then(entries => {
        entries.forEach(entry => new Entry(entry))
      }).then(() => {this.renderSlideShow()})
      .catch(error => {Error.renderError(error, "The stories did not load because...")})
    } else {
      this.renderSlideShow()
    }
  }

  static renderSlideShow() {
    while (this.mainContent.firstChild) {
      this.mainContent.removeChild(this.mainContent.firstChild);
    }
    const div = document.createElement('div')
    const buttonLeft = document.createElement('button')
    const buttonRight = document.createElement('button')
    div.className = "slideshow"
    div.classList.add("fade-in-delay2")
    buttonLeft.className = "slideshow-left"
    buttonLeft.innerHTML = "&#10094;"
    buttonRight.className = "slideshow-right"
    buttonRight.innerHTML = "&#10095;"
    this.allEntries.slice(this.allEntries.length - 3).map(entry => {
      div.prepend(entry.renderRecentItem())
    })
    this.mainContent.append(div)
    div.append(buttonLeft)
    div.append(buttonRight)
    this.slideIndex = 1
    document.querySelector('.slides').style.display = "block"
    document.querySelector('.slides').nextSibling.style.display = "block"
    buttonLeft.addEventListener('click', this.changeSlide.bind(this, -1))
    buttonRight.addEventListener('click', this.changeSlide.bind(this, 1))
  }

  static renderAll() {
    while (this.mainContent.firstChild) {
      this.mainContent.removeChild(this.mainContent.firstChild);
    }
    const selectContainer = document.createElement('div')
    const option1 = document.createElement('div')
    const option2 = document.createElement('div')
    const option3 = document.createElement('div')
    selectContainer.id = "select-container"
    selectContainer.className = "fade-in"
    option1.id = "option1"
    option2.id = "option2"
    option3.id = "option3"
    option1.className = "option-selected"
    option1.textContent = "ALL"
    option2.textContent = "FICTION"
    option3.textContent = "CREATIVE NONFICTION"
    selectContainer.append(option1)
    selectContainer.append(option2)
    selectContainer.append(option3)
    this.mainContent.prepend(selectContainer)
    option1.addEventListener('click', this.renderByType.bind(this, ""))
    option2.addEventListener('click', this.renderByType.bind(this, true))
    option3.addEventListener('click', this.renderByType.bind(this, false))
    const div = document.createElement('div')
    div.className = "entry-grid"
    div.classList.add("fade-in")
    this.mainContent.append(div)
    this.allEntries.forEach(entry => {
      div.prepend(entry.renderItem())
    })
  }

  static renderByType(boolean) {
    const div = document.querySelector('.entry-grid')
    const all = document.getElementById('option1')
    const fiction = document.getElementById('option2')
    const nonfiction = document.getElementById('option3')
    all.classList.remove('option-selected')
    fiction.classList.remove('option-selected')
    nonfiction.classList.remove('option-selected')
    div.innerHTML = ''
    this.allEntries.filter(entry => {
      if (typeof boolean === "string") {
        div.prepend(entry.renderItem())
        all.className = "option-selected"
      }
      else if (entry.fiction === boolean) {
        div.prepend(entry.renderItem())
      }
    })
    if (boolean === true) {
      fiction.className = "option-selected"
    } else if (boolean === false) {
      nonfiction.className = "option-selected"
    }
  }

  static changeSlide(n) {
    this.slideIndex += n
    const array = document.getElementsByClassName("slides")
    if (this.slideIndex > array.length) {
      this.slideIndex = 1
    }
    if (this.slideIndex < 1) {
      this.slideIndex = array.length
    }
    for (let i = 0; i < array.length; i++) {
      array[i].style.display = "none"
      array[i].nextSibling.style.display = "none"
    }
    array[this.slideIndex-1].style.display = "block"
    array[this.slideIndex-1].nextSibling.style.display = "block"
  }

  static loadForm() {
    if (!document.querySelector('.entry-form')) {
      const div =
      `<div class="form-container fade-in">
        <div class="left" style="display: none;">
          <p>We accept submissions on a rolling basis, with the aim of publishing 1-3 pieces weekly.</p>
          <p>Response time varies depending on the number of submissions we have at the moment, but if you haven’t heard back from us in a few months, feel free to reach out to us about your piece.</p>
          <p>Please only submit your unpublished work.</p>
          <p>Simultaneous submissions are fine, but please let us know ASAP if your work gets accepted somewhere else. Congrats!</p>
          <p>By submitting to Gastropoda, you agree to grant us First World Electronic Rights and Non-Exclusive Archival Rights, so that we can continue to keep your work on our site. All other rights remain yours. If your work is published elsewhere in the future, please consider giving a shout out to Gastropoda as its first home.</p>
          <p>We cannot offer payment at this time, but we can offer goodwill and love everlasting.</p>
          <p>Please use our form to submit. We would be honored to read your work.</p>
          <img src="images/gastropoda-logo-trq.png">
        </div>
        <div class="right">
          <div id="submit-heading">Submit your story for review!</div><br>
          <div id="submit-heading2">Fiction or Creative Nonfiction, 100-4,000 words.</div><br>
          <div id="submit-subheading">
            Sure, we like literary stuff, but we are not super picky about the so-called genre your piece might fit into. We can tell you that we’re not interested in gratuitous sex, violence, or vulgarity. We are especially drawn to pieces that don’t follow traditional narrative arcs, that surprise us and leave us with some questions (but not TOO many), and that are overflowing with fresh sensory language that makes our heart hurt a little bit. Send us your misfits, your miscreants, your outcasts, your rebels--the pieces you’ve put your whole essence into, but you aren’t quite sure where they might fit in. They might fit in at Gastropoda.
          </div>
          <span id="get-details">
            Read more details 
          </span>
          <form id="entry-form">
            <div class="row">
              <div id="radio-buttons">
                <input type="radio" id="fiction" name="fiction" value="true">
                <label for="fiction" id="fiction">Fiction</label>
                <input type="radio" id="non-fiction" name="fiction" value="false">
                <label for="non-fiction" id="non-fiction">Creative Nonfiction</label>
              </div>
            </div>
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
      const left = document.querySelector('.left')
      document.getElementById('get-details').addEventListener('click', function(event) {
        if (left.style.display === "none") {
          left.style.display = "block"
          event.target.innerHTML = "Close details"
        } else {
          left.style.display = "none"
          event.target.innerHTML = "Read more details"
        }
      })
      document.getElementById('entry-form').addEventListener('submit', this.createEntry.bind(this))
    }
  }

  static createEntry(event) {
    event.preventDefault()
    const formValues = {
      title: document.getElementById('title').value,
      author_name: document.getElementById('author_name').value,
      author_bio: document.getElementById('author_bio').value,
      content: document.getElementById('content').value,
      image: document.getElementById('image').value,
      fiction: document.querySelector('input[name="fiction"]:checked') ? document.querySelector('input[name="fiction"]:checked').value : null
    }
    new EntriesAdapter().createEntry(formValues).then(entry => {
      if (entry.message) {
        Error.renderError(entry, "Your story was <strong>not</strong> submitted because...")
      } else {
        new Entry(entry)
        Entry.renderAll()
      }
    })
    .catch(error => {Error.renderError(error, "Your story was <strong>not</strong> submitted because...")})
  }

  renderItem() {
    const cardDiv = document.createElement('div')
    const cardContainerDiv = document.createElement('div')
    const textDiv = document.createElement('div')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')
    cardDiv.className = "entry-card"
    cardContainerDiv.className = "entry-card-container"
    textDiv.className = "entry-text"
    cardDiv.id = this.id 
    img.src = this.image 
    h3.innerHTML = this.title 
    p.innerHTML = `<strong>${this.authorName}</strong> <span id="card-date">${this.createdAt}</span>`
    cardContainerDiv.append(img)
    cardDiv.append(cardContainerDiv)
    cardDiv.append(textDiv)
    textDiv.append(h3)
    textDiv.append(p)
    cardDiv.addEventListener('click', this.renderEntry.bind(this))
    return cardDiv
  }

  renderRecentItem() {
    const div = document.createElement('div')
    const img = document.createElement('img')
    const p = document.createElement('p')
    img.src = this.image
    img.className = "slides"
    p.className = "no-display"
    p.innerHTML = 
      `<span id="slideshow-title">${this.title}</span><br>
      <span id="slideshow-author">${this.authorName}</span>
      <span id="slideshow-date">${this.createdAt}</span>`
    div.append(img)
    div.append(p)
    img.addEventListener('click', this.renderEntry.bind(this))
    return div
  }

  renderEntry() {
    if (document.querySelector('.display-entry')) {
      document.querySelector('.display-entry').remove()
    } else {
      document.querySelector('#main-content').innerHTML = ''
      const container = document.createElement('div')
      const div = document.createElement('div')
      container.id = "entry-container"
      container.className = "fade-in"
      div.id = "display-entry"
      div.innerHTML = `
        <img src="${this.image}">
        <h2>${this.title.toUpperCase()}</h2>
        <div id="header">
          ${this.authorName}<br class="mobile-break">
          <span id="date">${this.createdAt}</span><br class="mobile-break">
          <span id="fiction-display">${(this.fiction === true) ? 'Fiction' : 'Creative Nonfiction'}</span><br>
        </div>
        <span id="display-likes">
          <span id="like-icon"><img src="images/logo-icon-empty.png"></span>
          <span id="like-count">${this.likes}</span>
          <span id="comment-icon">
            <a href="#comments"><img src="images/comment-white-oval-bubble.svg" height="87" width="100"/></a>
          </a></span>
          <span id="comment-count">${this.comments.length}</span>
        </span>
        <div id="display-entry-content">${this.content}</div>`
      container.append(div)
      document.querySelector('#main-content').append(container)
      document.getElementById('like-icon').addEventListener('click', this.handleLike.bind(this))
      const contributorDiv = document.createElement('div')
      const contributorHeading = document.createElement('div')
      const hr = document.createElement('hr')
      contributorDiv.id = "contributor"
      contributorHeading.id = "contributor-heading"
      contributorHeading.innerHTML = '<span id="maincolor">+</span> ABOUT THE CONTRIBUTOR'
      contributorDiv.append(contributorHeading)
      div.append(contributorDiv)
      contributorDiv.append(hr)
      contributorHeading.addEventListener('click', () => {
        contributorHeading.innerHTML = '<span id="maincolor">-</span> ABOUT THE CONTRIBUTOR'
        if (document.getElementById('author-bio')) {
          document.getElementById('author-bio').remove()
          contributorHeading.innerHTML = '<span id="maincolor">+</span> ABOUT THE CONTRIBUTOR'
        } else {
          const bio = document.createElement('div')
          bio.id = "author-bio"
          bio.innerText = this.authorBio
          contributorDiv.insertBefore(bio, contributorDiv.childNodes[1])
        }
      })
      Comment.displayCommentForm(this.id)
      this.comments.forEach(comment => comment.renderComment())
    }
  }

  handleLike() {
    const likeCount = document.getElementById('like-count')
    const likeIcon = document.getElementById('like-icon')
    if (document.getElementById('full-like')) {
      this.likes--
      new EntriesAdapter().updateEntryLikes(this.id, this.likes).then(response => {
        this.likes = response.likes
        likeCount.innerHTML = this.likes
        likeIcon.innerHTML = '<img src="images/logo-icon-empty.png">'
      })
    } else {
      this.likes++
      new EntriesAdapter().updateEntryLikes(this.id, this.likes).then(response => {
        this.likes = response.likes
        likeCount.innerHTML = this.likes
        likeIcon.innerHTML = '<img src="images/logo-icon-full.png" id="full-like">'
      })
      .catch(error => Error.renderError(error, "The snail did <strong>not</strong> like that because..."))
    }
  }
}
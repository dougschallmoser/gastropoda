class Entry {
  constructor(entry) {
    this.id = entry.id
    this.title = entry.title
    this.author_name = entry.author_name
    this.author_bio = entry.author_bio 
    this.content = entry.content
    this.likes = entry.likes
    this.image = entry.image
    this.created_at = entry.created_at
    this.comments = entry.comments
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
    p.innerHTML = `<strong>${this.author_name}</strong> <span id="card-date">${this.created_at}</span>`
    cardContainerDiv.append(img)
    cardDiv.append(cardContainerDiv)
    cardDiv.append(textDiv)
    textDiv.append(h3)
    textDiv.append(p)
    cardDiv.addEventListener('click', this.loadEntry.bind(this))
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
      <span id="slideshow-author">${this.author_name}</span>
      <span id="slideshow-date">${this.created_at}</span>`
    div.append(img)
    div.append(p)
    img.addEventListener('click', this.loadEntry.bind(this))
    return div
  }

  loadEntry() {
    if (document.querySelector('.display-entry')) {
      document.querySelector('.display-entry').remove()
    } else {
      document.querySelector('#main-content').innerHTML = ''
      const container = document.createElement('div')
      const div = document.createElement('div')
      container.id = "entry-container"
      div.id = "display-entry"
      div.innerHTML = `
        <img src="${this.image}">
        <h2>${this.title.toUpperCase()}</h2>
        <div id="header">
          ${this.author_name}
          <span id="date">${this.created_at}</span>
          <span id="display-likes">
            <span id="like-icon"><img src="images/logo-icon-empty.png"></span>
            <span id="like-count">${this.likes}</span>
            <span id="comment-icon">
              <a href="#comments"><img src="images/comment-white-oval-bubble.svg" height="87" width="100"/></a>
            </a></span>
            <span id="comment-count">${this.comments.length}</span>
          </span>
        </div>
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
          bio.innerText = this.author_bio
          contributorDiv.insertBefore(bio, contributorDiv.childNodes[1])
        }
      })
      this.loadCommentForm()
      this.comments.forEach(comment => this.renderComment(comment))
    }
  }

  renderComment(comment) {
    const showCommentDiv = document.createElement('div')
    showCommentDiv.className = "show-comment"
    showCommentDiv.innerHTML = 
      `<span id="comment-name">${comment.name}</span> <span id="comment-created">${comment.created_at}</span>
       <div id="comment-content">${comment.content}</div`
    if (document.getElementById('make-comment')) {
      const makeComment = document.getElementById('make-comment')
      makeComment.parentNode.insertBefore(showCommentDiv, makeComment.nextSibling);
    } else {
      const commentsHeading = document.getElementById('comments-heading')
      commentsHeading.parentNode.insertBefore(showCommentDiv, commentsHeading.nextSibling);
    }
  }

  loadCommentForm() {
    const div = document.getElementById('display-entry')
    const commentsDiv = document.createElement('div')
    const commentsHeading = document.createElement('div')
    commentsDiv.id = "comments"
    commentsHeading.id = "comments-heading"
    commentsHeading.innerHTML = '<span id="maincolor">+</span> LEAVE A COMMENT'
    commentsDiv.append(commentsHeading)
    div.append(commentsDiv)
    commentsHeading.addEventListener('click', displayCommentForm.bind(this))
    
    function displayCommentForm() {
      commentsHeading.innerHTML = '<span id="maincolor">-</span> LEAVE A COMMENT'
      if (document.getElementById('make-comment')) {
        document.getElementById('make-comment').remove()
        commentsHeading.innerHTML = '<span id="maincolor">+</span> LEAVE A COMMENT'
      } else {
        const makeComment = document.createElement('div')
        makeComment.id = "make-comment"
        commentsDiv.insertBefore(makeComment, commentsDiv.childNodes[1])
        makeComment.innerHTML = 
          `<form id="comment-form">
            <div class="comment-form-name">
              <input type="text" id="name" name="name" placeholder="Your Name">
            </div>
            <div class="comment-form-email">
              <input type="text" id="email" name="email" placeholder="Your Email (required)">
            </div>
            <div class="comment-form-content">
              <input type="text" id="comment-content" name="content" placeholder="Add a public comment...">
            </div>
            <div class="comment-form-submit">
              <input type="submit" value="Comment">
            </div>
          </form>`
        const form = document.getElementById('comment-form')
        form.addEventListener('submit', (event) => {
          event.preventDefault()
          const formValues = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            content: document.getElementById('comment-content').value,
            entry_id: this.id
          }
          new CommentsAdapter().createComment(formValues).then(comment => {
            this.renderModal(comment)
          })
          .catch(error => {this.renderModal(error)})
        })
      }
    }
  }

  renderModal(comment, subject = "comment") {
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
    if (comment.message) {
      if (Array.isArray(comment.message)) {
        comment.message.forEach(message => {
          p2.innerHTML += `<li>${message}</li>`
        })
      } else {
        p2.innerHTML = comment.message
      }
      p.innerHTML = `Your ${subject} did <strong>not</strong> save because...`
      contentDiv.append(p)
      contentDiv.append(p2)
      div.append(contentDiv)
      div.style.display = "block"
      document.querySelector('#main-content').append(div)
      span.addEventListener('click', () => {div.remove()})
      window.addEventListener('click', function(event) {
        if (event.target == div) {div.remove()}
      })
    } else {
      this.comments.push(comment)
      this.renderComment(comment)
      document.getElementById('comment-count').innerHTML++
      document.getElementById('name').value = ''
      document.getElementById('email').value = ''
      document.getElementById('comment-content').value = ''
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
      .catch(response => this.renderModal(response, "like"))
    }
  }
}
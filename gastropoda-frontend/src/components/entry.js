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
    p.innerHTML = `<strong>${this.author_name}</strong> <span id="date">${this.created_at}</span>`

    cardContainerDiv.append(img)
    cardDiv.append(cardContainerDiv)
    cardDiv.append(textDiv)
    textDiv.append(h3)
    textDiv.append(p)

    cardDiv.addEventListener('click', this.loadEntry.bind(this))
    return cardDiv
  }

  loadEntry(event) {
    let self = this
    if (document.querySelector('.display-entry')) {
    document.querySelector('.display-entry').remove()
  } else {
    new EntriesAdapter().getEntry(this.id).then(entry => {
      document.querySelector('#main-content').innerHTML = ''
      const container = document.createElement('div')
      const div = document.createElement('div')
      container.id = "entry-container"
      div.id = "display-entry"
      div.innerHTML = `
        <img src="${entry.image}">
        <h2>${entry.title.toUpperCase()}</h2>
        <h4>${entry.author_name} <span id="date">${entry.created_at}</span></h4>
        <p>${entry.content}</p>`
      container.append(div)
      document.querySelector('#main-content').append(container)

      // ABOUT THE CONTRIBUTOR 
      const contributorDiv = document.createElement('div')
      const contributorHeading = document.createElement('div')
      const hr = document.createElement('hr')
      contributorDiv.id = "contributor"
      contributorHeading.id = "contributor-heading"
      contributorHeading.innerHTML = '<span id="maincolor">+</span> ABOUT THE CONTRIBUTOR'
      contributorDiv.append(contributorHeading)
      div.append(contributorDiv)
      contributorDiv.append(hr)
      contributorHeading.addEventListener('click', displayAuthorBio)
      function displayAuthorBio() {
        contributorHeading.innerHTML = '<span id="maincolor">-</span> ABOUT THE CONTRIBUTOR'
        if (document.getElementById('author-bio')) {
          document.getElementById('author-bio').remove()
          contributorHeading.innerHTML = '<span id="maincolor">+</span> ABOUT THE CONTRIBUTOR'
        } else {
          const bio = document.createElement('div')
          bio.id = "author-bio"
          bio.innerText = entry.author_bio
          contributorDiv.insertBefore(bio, contributorDiv.childNodes[1])
        }
      }

      // COMMENTS
      const commentsDiv = document.createElement('div')
      const commentsHeading = document.createElement('div')
      commentsDiv.id = "comments"
      commentsHeading.id = "comments-heading"
      commentsHeading.innerHTML = '<span id="maincolor">+</span> LEAVE A COMMENT'
      commentsDiv.append(commentsHeading)
      div.append(commentsDiv)
      commentsHeading.addEventListener('click', displayCommentForm)
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
          form.addEventListener('submit', createComment)
          function createComment(event) {
            event.preventDefault()
            const nameValue = document.getElementById('name').value 
            const emailValue = document.getElementById('email').value
            const contentValue = document.getElementById('comment-content').value
            const formValues = {
              name: nameValue,
              email: emailValue,
              content: contentValue,
              entry_id: self.id
            }
            new CommentsAdapter().createComment(formValues).then(comment => {
              self.comments.push(comment)
              renderComments()
            })
          }

        }
      }

      function renderComments() {
        self.comments.forEach(comment => {
          const showCommentDiv = document.createElement('div')
          showCommentDiv.id = "show-comment"
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
        })
      }

      renderComments()

    })
    }
  }
  
}
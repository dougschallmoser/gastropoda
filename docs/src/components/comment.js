class Comment {
  constructor(comment) {
    this.name = comment.name
    this.email = comment.email 
    this.content = comment.content 
    this.entryId = comment.entry_id
    this.createdAt = comment.created_at
  }

  static displayCommentForm(entryId) {
    const div = document.getElementById('display-entry')
    const commentsDiv = document.createElement('div')
    const commentsHeading = document.createElement('div')
    commentsDiv.id = "comments"
    commentsHeading.id = "comments-heading"
    commentsHeading.innerHTML = '<span id="maincolor">+</span> LEAVE A COMMENT'
    commentsDiv.append(commentsHeading)
    div.append(commentsDiv)
    commentsHeading.addEventListener('click', function() {
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
            entry_id: entryId
          }
          new CommentsAdapter().createComment(formValues).then(comment => {
            Comment.renderModal(comment)
          })
          .catch(error => {Comment.renderModal(error)})
        })
      }
    })
  }

  static renderModal(comment, subject = "comment") {
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
      const newComment = new Comment(comment)
      const entry = Entry.allEntries.find(entry => entry.id === newComment.entryId)
      entry.comments.push(newComment)
      newComment.renderComment()
      document.getElementById('comment-count').innerHTML++
      document.getElementById('name').value = ''
      document.getElementById('email').value = ''
      document.getElementById('comment-content').value = ''
    }
  }

  renderComment() {
    const showCommentDiv = document.createElement('div')
    showCommentDiv.className = "show-comment"
    showCommentDiv.innerHTML = 
      `<span id="comment-name">${this.name}</span> <span id="comment-created">${this.createdAt}</span>
       <div id="comment-content">${this.content}</div`
    if (document.getElementById('make-comment')) {
      const makeComment = document.getElementById('make-comment')
      makeComment.parentNode.insertBefore(showCommentDiv, makeComment.nextSibling);
    } else {
      const commentsHeading = document.getElementById('comments-heading')
      commentsHeading.parentNode.insertBefore(showCommentDiv, commentsHeading.nextSibling);
    }
  }

}
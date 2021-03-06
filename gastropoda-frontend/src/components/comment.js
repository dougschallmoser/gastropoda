class Comment {
  constructor(comment) {
    this.name = comment.name
    this.email = comment.email 
    this.content = comment.content 
    this.entryId = comment.entry_id
    this.createdAt = comment.created_at
    this.id = comment.id
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
            if (comment.message) {
              Error.renderError(comment, "Your comment was <strong>not</strong> saved because...")
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
          })
          .catch(error => {Error.renderError(error, "Your comment was <strong>not</strong> saved because...")})
        })
      }
    })
  }

  renderComment() {
    const showCommentDiv = document.createElement('div')
    const deleteButton = document.createElement('span')
    const editButton = document.createElement('span')
    showCommentDiv.className = "show-comment"
    showCommentDiv.id = `show-comment-${this.id}`
    deleteButton.id = "delete-button"
    deleteButton.innerText = "Delete"
    editButton.id = "edit-button"
    editButton.innerText = "Edit"
    showCommentDiv.innerHTML = 
      `<span id="comment-name">${this.name}</span> <span id="comment-created">${this.createdAt}</span>
       <div id="comment-content-${this.id}">${this.content}</div
       `
    showCommentDiv.insertBefore(editButton, showCommentDiv.childNodes[3])
    showCommentDiv.insertBefore(deleteButton, showCommentDiv.childNodes[4])
    deleteButton.addEventListener('click', this.deleteComment.bind(this))
    editButton.addEventListener('click', this.editComment.bind(this))
    if (document.getElementById('make-comment')) {
      const makeComment = document.getElementById('make-comment')
      makeComment.parentNode.insertBefore(showCommentDiv, makeComment.nextSibling);
    } else {
      const commentsHeading = document.getElementById('comments-heading')
      commentsHeading.parentNode.insertBefore(showCommentDiv, commentsHeading.nextSibling);
    }
  }

  deleteComment() {
    const id = this.id
    new CommentsAdapter().deleteComment(id).then(comment => {
      if (comment.message) {
        Error.renderError(comment, "Your comment was <strong>not</strong> deleted because...")
      } else {
        document.getElementById(`show-comment-${this.id}`).innerHTML = ''
        const count = document.getElementById(`comment-count`)
        count.innerHTML = parseInt(count.innerHTML) - 1;
      }
    })
  }

  editComment() {
    const id = this.id
    const commentContent = document.getElementById(`comment-content-${this.id}`)
    const editForm = document.createElement('form')
    editForm.id = "edit-form"
    editForm.innerHTML = `
      <input type="text" value="${this.content}" />
      <input type="submit" value="Save" />
    `
    commentContent.innerHTML = ''
    commentContent.append(editForm)
    editForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const content = event.target.children[0].value
      new CommentsAdapter().editComment(id, content).then(comment => {
        if (comment.message) {
          Error.renderError(comment, "Your comment was <strong>not</strong> saved because...")
        } else {
          commentContent.innerHTML = comment.content
        }
      })
    })
  }

}
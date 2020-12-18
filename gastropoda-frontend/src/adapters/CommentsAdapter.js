class CommentsAdapter {
  constructor() {
    this.baseUrl = 'https://gastropoda.herokuapp.com/api/v1/comments'
    // this.baseUrl = 'http://localhost:3000/api/v1/comments'
  }

  createComment(formValues) {
    const newComment = {
      comment: formValues
    }

    return fetch(this.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(newComment)
    })
    .then(response => response.json())
  }

  editComment(id, content) {
    const commentData = {
      comment: {content: content}
    }

    return fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(commentData)
    })
    .then(response => response.json())
  }

  deleteComment(commentId) {
    return fetch(`${this.baseUrl}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    .then(response => response.json())
  }
}
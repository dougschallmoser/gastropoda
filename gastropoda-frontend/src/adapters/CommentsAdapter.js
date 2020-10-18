class CommentsAdapter {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/v1/comments'
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
}
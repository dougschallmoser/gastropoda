class CommentsAdapter {
  constructor() {
    this.baseUrl = 'https://gastropoda-api.herokuapp.com/api/v1/comments'
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
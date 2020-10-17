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
  }

  renderItem() {
    const cardDiv = document.createElement('div')
    const textDiv = document.createElement('div')
    const img = document.createElement('img')
    const h3 = document.createElement('h3')
    const p = document.createElement('p')

    cardDiv.className = "entry-card"
    textDiv.className = "entry-text"
    cardDiv.id = this.id 
    img.src = this.image 
    h3.innerHTML = this.title 
    p.innerHTML = `<strong>${this.author_name}</strong> <span id="date">${this.created_at}</span>`

    cardDiv.append(img)
    cardDiv.append(textDiv)
    textDiv.append(h3)
    textDiv.append(p)

    cardDiv.addEventListener('click', this.loadEntry.bind(this))
    return cardDiv
  }

  loadEntry(event) {
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
        <p><h2>${entry.title.toUpperCase()}</h2></p>
        <h4>${entry.author_name} <span id="date">${entry.created_at}</span></h4>
        <p>${entry.content}</p>`
      container.append(div)
      document.querySelector('#main-content').append(container)

      // ABOUT THE CONTRIBUTOR 
      const contributorDiv = document.createElement('div')
      const contributorHeading = document.createElement('div')
      contributorDiv.id = "contributor"
      contributorHeading.id = "contributor-heading"
      contributorHeading.innerHTML = '<span id="maincolor">+</span> ABOUT THE CONTRIBUTOR'
      contributorDiv.append(contributorHeading)
      div.append(contributorDiv)
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
        contributorDiv.append(bio)
        }
      }

      // COMMENTS
      const commentsDiv = document.createElement('div')
      const commentsHeading = document.createElement('div')
      commentsDiv.id = "comments"
      commentsHeading.id = "comments-heading"
      commentsHeading.innerHTML = '<span id="maincolor">+</span> COMMENTS'
      commentsDiv.append(commentsHeading)
      div.append(commentsDiv)
      commentsHeading.addEventListener('click', displayComments)
      function displayComments() {
        commentsHeading.innerHTML = '<span id="maincolor">-</span> COMMENTS'
        if (document.getElementById('display-comments')) {
          document.getElementById('display-comments').remove()
          commentsHeading.innerHTML = '<span id="maincolor">+</span> COMMENTS'
        } else {
        const comments = document.createElement('div')
        comments.id = "display-comments"
        comments.innerText = "Hello"
        commentsDiv.append(comments)
        }
      }

    })
    }
  }
  
}
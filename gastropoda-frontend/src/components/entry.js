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
    p.innerHTML = `<strong>${this.author_name}</strong> - ${this.created_at}`

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
        <p><h2>${entry.title.toUpperCase()}</h2></p>
        <h4>${entry.author_name}</h4>
        <h4>Published on: ${entry.created_at}</h4>
        <p>${entry.content}</p>`
      container.append(div)
      document.querySelector('#main-content').append(container)

      // adding contributor feature
      const plus = document.createElement('div')
      const contributor = document.createElement('div')
      plus.id = "plus"
      plus.innerHTML = '+ ABOUT THE CONTRIBUTOR'
      div.append(plus)
      plus.addEventListener('click', displayAuthorBio)

      function displayAuthorBio() {
        plus.innerHTML = '- ABOUT THE CONTRIBUTOR'
        if (document.getElementById('author-bio')) {
          document.getElementById('author-bio').remove()
          plus.innerHTML = '+ ABOUT THE CONTRIBUTOR'
        } else {
        const bio = document.createElement('div')
        bio.id = "author-bio"
        bio.innerText = entry.author_bio
        div.append(bio)
        }
      }
    })
    }
  }
  
}
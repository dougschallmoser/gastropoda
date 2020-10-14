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
    const newDiv = document.createElement('div')
    const image = document.createElement('img')
    const p = document.createElement('p')

    p.innerHTML = `<em>${this.title}</em><br>${this.author_name}<br>${this.created_at}`
    newDiv.className = "item"
    newDiv.id = `item-${this.id}`
    image.src = this.image
    
    newDiv.appendChild(image)
    newDiv.appendChild(p)
    newDiv.addEventListener('click', this.loadEntry)
    return newDiv
  }

  loadEntry(event) {
    if (document.querySelector('.display-entry-div')) {
    document.querySelector('.display-entry-div').remove()
  } else {
    new EntriesAdapter().getEntry(this.id.split("-")[1]).then(entry => {
      const div = document.createElement('div')
      div.className = "display-entry-div"
      document.querySelector('#display-entry').append(div)
      
      div.innerHTML = `
        <p><h2>${entry.title.toUpperCase()}</h2></p>
        <p><h4>${entry.author_name}</h4></p>
        <p><h4>Published on: ${entry.created_at}</h4></p><br>
        ${entry.content}<p></p>`

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
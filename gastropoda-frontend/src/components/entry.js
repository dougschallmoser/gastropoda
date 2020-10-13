class Entry {
  constructor(entry) {
    this.id = entry.id
    this.title = entry.title
    this.author_name = entry.author_name
    this.author_bio = entry.author_bio 
    this.content = entry.content
    this.likes = entry.likes
    this.image = entry.image
  }

  renderItem() {
    const newDiv = document.createElement('div')
    const image = document.createElement('img')
    const p = document.createElement('p')

    p.innerHTML = this.title
    newDiv.className = "item"
    newDiv.id = `item-${this.id}`
    image.src = this.image
    
    newDiv.appendChild(image)
    newDiv.appendChild(p)
    newDiv.addEventListener('click', this.loadEntry)
    return newDiv
  }

  loadEntry(event) {
    new EntriesAdapter().getEntry(this.id.split("-")[1]).then(entry => {
      const div = document.createElement('div')
      div.className = "display-entry-div"
      document.querySelector('#display-entry').append(div)
      
      div.innerHTML = `
        ${entry.title}<br>
        ${entry.content}`
    })
  }
  
}
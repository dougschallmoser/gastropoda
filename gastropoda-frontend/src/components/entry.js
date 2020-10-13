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
    image.id = `image-${this.id}`
    image.src = this.image
    
    newDiv.appendChild(image)
    newDiv.appendChild(p)
    return newDiv
  }
  
}
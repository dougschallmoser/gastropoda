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
    return `<img src="${this.image}" class="item"></img>`
    // return `<div class="item" style="background-image: url(${this.image})"></div>`
  }
  
}
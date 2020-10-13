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

    p.innerHTML = `<em>${this.title}</em><br>${this.author_name}`
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
        <p><h2>${entry.title}</h2></p>
        <p><h3>By: ${entry.author_name}</h3><br></p>
        ${entry.content}`
    })
    }
  }
  
}
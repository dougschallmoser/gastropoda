class Error {

  static renderError(obj, header) {
    const div = document.createElement('div')
    const contentDiv = document.createElement('div')
    const span = document.createElement('span')
    const p = document.createElement('p')
    const p2 = document.createElement('p')
    div.id = "myModal"
    div.className = "modal"
    contentDiv.className = "modal-content"
    span.className = "close"
    span.innerHTML = '&times;'
    contentDiv.append(span)
    contentDiv.append(p)
    contentDiv.append(p2)
    div.append(contentDiv)
    div.style.display = "block"
    document.querySelector('#main-content').append(div)
    div.classList.add("fade-in2")
    span.addEventListener('click', () => {div.remove()})
    window.addEventListener('click', function(event) {
      if (event.target == div) {div.remove()}
    })
    if (Array.isArray(obj.message)) {
      obj.message.forEach(message => {p2.innerHTML += `<li>${message}</li>`})
    } else {
      p2.innerHTML = obj.message
    }
    p.innerHTML = header
  }

}
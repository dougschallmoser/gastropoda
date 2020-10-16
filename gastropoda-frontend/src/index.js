const app = new App()

// ABOUT
const aboutLink = document.getElementById('nav-bar').getElementsByTagName('a')[0]
const mainContent = document.getElementById('main-content')
aboutLink.addEventListener('click', renderAbout)

function renderAbout() {
  if (!document.getElementById('about')) {
    div = `
      <div id="about">
        <p><em>Gastropoda</em> is a literary magazine that seeks to celebrate the spiralic nature of life.</p>

        <p><em>Gastropoda</em> started out as an idea, grew into a fascination, and now blossoms into physical manifestation.</p>
        
        <p><em>Gastropoda</em> aims to slow you down and spin you around, to help you see the beauty and tragedy in all of life’s twists and turns, and to show you that there is no such thing as wasted time.</p>
      </div>
    `
    mainContent.innerHTML = div
  }
}
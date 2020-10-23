class About {
  constructor() {
    this.setBindings()
    this.setEventListeners()
  }

  setBindings() {
    this.navBar = document.getElementById('nav-bar')
    this.mainContent = document.getElementById('main-content')
  }

  setEventListeners() {
    this.navBar.getElementsByTagName('a')[1].addEventListener('click', this.renderAbout.bind(this))
  }

  renderAbout() {
    if (!document.getElementById('about')) {
      this.mainContent.innerHTML =
      `<div id="about">
          <p><span id="gastropoda">GASTROPODA</span> is a literary magazine that seeks to celebrate the spiralic nature of life. What started out as an idea grew into a fascination, and now blossoms into physical manifestation. This magazine aims to slow you down and spin you around, to help you see the beauty and tragedy in all of life’s twists and turns, and to show you that there is no such thing as wasted time.</p>
      </div>`
    }
  }
}
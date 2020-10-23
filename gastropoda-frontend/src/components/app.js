class App {

  constructor() {
    this.entries = Entry.loadEntries()
    this.setBindings()
    this.setEventListeners()
    this.adjustNavbar()
  }

  setBindings() {
    this.navBar = document.getElementById('nav-bar')
    this.mainContent = document.getElementById('main-content')
  }

  setEventListeners() {
    document.getElementById('logo-title').addEventListener('click', Entry.loadEntries.bind(Entry))
    this.navBar.getElementsByTagName('a')[0].addEventListener('click', Entry.renderSlideShow)
    this.navBar.getElementsByTagName('a')[1].addEventListener('click', this.renderAbout.bind(this))
    this.navBar.getElementsByTagName('a')[2].addEventListener('click', Entry.renderAll.bind(Entry))
    this.navBar.getElementsByTagName('a')[3].addEventListener('click', Entry.loadForm.bind(Entry))
    this.navBar.getElementsByTagName('a')[4].addEventListener('click', this.renderContact.bind(this))
    this.navBar.getElementsByTagName('a')[5].addEventListener('click', this.responsiveNav.bind(this))
  }

  renderContact() {
    if (!document.getElementById('contact')) {
      this.mainContent.innerHTML =
      `<div id="contact">
          <div>
            <p>For general inquiries:</p>
            <img src="images/email.png">
            <a href="mailto:gastropodalitmag@gmail.com">gastropodalitmag@gmail.com</a>
          </div>
          <div>
            <p>Follow us on Instagram:</p>
            <img src="images/instagram.png">
            <a href="http://instagram.com/gastropodalitmag">@gastropodalitmag</a>
          </div>
          <p>Please give us at least 30 days before asking about the status of your submission.</p>
        </div>`
    }
  }

  renderAbout() {
    if (!document.getElementById('about')) {
      this.mainContent.innerHTML =
      `<div id="about">
          <p><span id="gastropoda">GASTROPODA</span> is a literary magazine that seeks to celebrate the spiralic nature of life. What started out as an idea grew into a fascination, and now blossoms into physical manifestation. This magazine aims to slow you down and spin you around, to help you see the beauty and tragedy in all of life’s twists and turns, and to show you that there is no such thing as wasted time.</p>
      </div>`
    }
  }

  responsiveNav() {
    if (this.navBar.className === "topnav") {
      this.navBar.className += " responsive"
      this.navBar.getElementsByTagName('a')[5].classList.toggle("change")
    } else {
      this.navBar.className = "topnav"
      this.navBar.getElementsByTagName('a')[5].classList.toggle("change")
    }
  }

  adjustNavbar() {
    if (window.matchMedia("(min-width: 600px)").matches) {
      const sticky = this.navBar.offsetTop
      window.addEventListener('scroll', () => {
        if (window.pageYOffset >= sticky) {
          if (!document.getElementById('gastropoda-nav')) {
            const a = document.createElement('a')
            a.id = "gastropoda-nav"
            a.textContent = "GASTROPODA"
            this.navBar.prepend(a)
          }
          this.navBar.classList.add("sticky")
        } else {
          if (document.getElementById('gastropoda-nav')) {
            document.getElementById('gastropoda-nav').remove()
          }
          this.navBar.classList.remove("sticky")
        }
      })
    }
  }
  
}
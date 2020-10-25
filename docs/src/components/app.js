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
    this.navBar.getElementsByTagName('a')[0].addEventListener('click', Entry.renderSlideShow.bind(Entry))
    this.navBar.getElementsByTagName('a')[1].addEventListener('click', this.renderAbout.bind(this))
    this.navBar.getElementsByTagName('a')[2].addEventListener('click', Entry.renderAll.bind(Entry))
    this.navBar.getElementsByTagName('a')[3].addEventListener('click', Entry.loadForm.bind(Entry))
    this.navBar.getElementsByTagName('a')[4].addEventListener('click', this.renderContact.bind(this))
    this.navBar.getElementsByTagName('a')[5].addEventListener('click', this.mobileNav.bind(this))
  }

  renderContact() {
    if (!document.getElementById('contact')) {
      this.mainContent.innerHTML =
        `<div id="contact" class="fade-in">
          <div id="contact-email">
            <p>For general inquiries:</p>
            <img src="images/email.png">
            <a href="mailto:gastropodalitmag@gmail.com">gastropodalitmag@gmail.com</a>
          </div>
          <div id="contact-instagram">
            <p>Follow us on Instagram:</p>
            <img src="images/instagram.png">
            <a href="http://instagram.com/gastropodalitmag">@gastropodalitmag</a>
          </div>
          <p>Please give us at least 30 days before asking about the status of your submission.</p>
          <div id="snail-walk-rev">
            <img src="images/gastropoda-logo-trq-rev.png" id="snail-rev">
          </div>
        </div>`
    }
    this.animateSnailLeft()
  }

  renderAbout() {
    if (!document.getElementById('about')) {
      this.mainContent.innerHTML =
      `<div id="about" class="fade-in">
          <p><span id="gastropoda">GASTROPODA</span> is a literary magazine that seeks to celebrate the spiralic nature of life. What started out as an idea grew into a fascination, and now blossoms into physical manifestation. This magazine aims to slow you down and spin you around, to help you see the beauty and tragedy in all of life’s twists and turns, and to show you that there is no such thing as wasted time.</p>
          <div id="snail-walk">
            <img src="images/gastropoda-logo-trq.png" id="snail">
          </div>
      </div>`
    }
    this.animateSnailRight()
  }

  animateSnailRight() {
    let move
    const div = document.getElementById('snail-walk')
    const snail = document.getElementById('snail')
    snail.style.left = '0px'
    snail.addEventListener('click', moveSnail) 
    function moveSnail() {
      snail.style.left = parseInt(snail.style.left) + 10 + 'px'
      move = setTimeout(moveSnail, 100)
      if (parseInt(snail.style.left) + 90 >= div.offsetWidth) {
        stopSnail()
      }
    }
    function stopSnail() {
      clearTimeout(move)
      snail.removeEventListener('click', moveSnail)
    }
  }

  animateSnailLeft() {
    let move
    const div = document.getElementById('snail-walk-rev')
    const snail = document.getElementById('snail-rev')
    snail.style.left = '0px'
    snail.addEventListener('click', moveSnail) 
    function moveSnail() {
      snail.style.left = parseInt(snail.style.left) - 10 + 'px'
      move = setTimeout(moveSnail, 100)
      if (parseInt(snail.style.left) - 90 <= (-div.offsetWidth)) {
        stopSnail()
      }
    }
    function stopSnail() {
      clearTimeout(move)
      snail.removeEventListener('click', moveSnail)
    }
  }

  mobileNav() {
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
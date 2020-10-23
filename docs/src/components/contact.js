class Contact {
  constructor() {
    this.setBindings()
    this.setEventListeners()
  }

  setBindings() {
    this.navBar = document.getElementById('nav-bar')
    this.mainContent = document.getElementById('main-content')
  }

  setEventListeners() {
    this.navBar.getElementsByTagName('a')[4].addEventListener('click', this.renderContact.bind(this))
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
}
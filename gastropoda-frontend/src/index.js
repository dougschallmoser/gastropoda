const app = new App()

// ABOUT
const aboutLink = document.getElementById('nav-bar').getElementsByTagName('a')[0]
const mainContent = document.getElementById('main-content')
aboutLink.addEventListener('click', renderAbout)

function renderAbout() {
  if (!document.getElementById('about')) {
    div = `
      <div id="about">
        I'm baby tofu paleo scenester, twee drinking vinegar irony gastropub craft beer post-ironic organic. Locavore adaptogen actually, flannel selvage humblebrag taiyaki offal pug organic sriracha +1. Deep v VHS lumbersexual farm-to-table snackwave, squid wolf. Ugh cold-pressed subway tile XOXO, 90's hella vaporware celiac ethical polaroid fingerstache forage whatever seitan adaptogen.
      </div>
    `
    mainContent.innerHTML = div
  }
}
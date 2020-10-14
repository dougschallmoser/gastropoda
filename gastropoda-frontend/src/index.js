const app = new App()

const navbar = document.getElementById('navbar')
const sticky = navbar.offsetTop

window.onscroll = function() {
  navBar()
}

let navBar = function() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
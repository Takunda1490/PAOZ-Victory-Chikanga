/* nav
ul
menu-close
menu-btn
active */

const nav = document.querySelector("#ul");
const menuClose = document.querySelector("#menu-close");
const menuBtn = document.querySelector("#menu-btn");
const scrollLinks = document.querySelectorAll(".scroll-link");
const navbar = document.querySelector(".nav");
const topLink = document.querySelector(".top-link");
const linksContainer = document.querySelector(".navigation");

/* preloader */
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.classList.add("hide-preloader");
});

/* footer date */

const date = document.getElementById("date");
date.textContent = new Date().getFullYear();

/* top-link */
window.addEventListener("scroll", () => {
  const scrollHeight = window.pageYOffset;

  if (scrollHeight > 500) {
    topLink.classList.add("show-link");
  } else {
    topLink.classList.remove("show-link");
  }
});

/* menu links */

menuClose.addEventListener("click", () => {
  nav.classList.remove("active");
});

menuBtn.addEventListener("click", () => {
  nav.classList.add("active");
});

/* smooth scroll */

scrollLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    //close menu
    nav.classList.remove("active");

    //navigate to specific spot
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    let position = element.offsetTop - navHeight;

    if (navHeight > 100) {
      position = position + containerHeight;
    }

    window.scrollTo({
      left: 0,
      top: position,
    });
  });
});

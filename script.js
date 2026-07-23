/* nav
ul
menu-close
menu-btn
active */

const nav = document.querySelector("#ul")
const menuClose = document.querySelector("#menu-close")
const menuBtn = document.querySelector("#menu-btn")
const linkOne = document.querySelector(".link-1");
const linkTwo = document.querySelector(".link-2");
const linkThree = document.querySelector(".link-3");
const linkFour = document.querySelector(".link-4");



menuClose.addEventListener("click", ()=>{
    nav.classList.remove("active")
});

menuBtn.addEventListener("click", ()=>{
    nav.classList.add("active")
});

linkOne.addEventListener("click", () => {
  nav.classList.remove("active");
});

linkTwo.addEventListener("click", () => {
  nav.classList.remove("active");
});

linkThree.addEventListener("click", () => {
  nav.classList.remove("active");
});

linkFour.addEventListener("click", () => {
  nav.classList.remove("active");
});


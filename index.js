const contactButton = document.querySelector(".nav__contact");
let isModalOpen = false;
const homeSearchInput = document.querySelector("#home-search__input");
const homeSearchButton = document.querySelector("#home-search__button");
const modal = document.querySelector(".modal");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

function homeSearch(search) {
  localStorage.setItem("search", search);
  window.location.href = `${window.location.origin}/find_movies.html`;
}

homeSearchButton.addEventListener("click", (e) => {
  e.preventDefault();
  homeSearch(homeSearchInput.value);
});

homeSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    homeSearch(homeSearchInput.value);
  }
});

function toggleModal() {
  if (isModalOpen) {
    isModalOpen = false;
    document.modal.classList += " display-none";
    document.nav.classList.remove("display-none");
    document.header.classList.remove("display-none");
  } else {
    isModalOpen = true;
    document.modal.classList.remove("display-none");
    document.nav.classList += " display-none";
    document.header.classList += " display-none";
  }
}

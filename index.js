const contactButton = document.querySelector(".nav__contact");
let isModalOpen = false;
const homeSearchInput = document.querySelector("#home-search__input");
const homeSearchButton = document.querySelector("#home-search__button");
const modal = document.querySelector("#modal");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

function homeSearch(search) {
  localStorage.setItem("search", search);
  window.location.href = `https://broadaciousb.github.io/movie-library/find_movies.html`;
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
    modal.classList.add("display-none");
    nav.classList.remove("display-none");
    header.classList.remove("display-none");
  } else {
    isModalOpen = true;
    modal.classList.remove("display-none");
    nav.classList.add("display-none");
    header.classList.add("display-none");
  }
}

function contact(event) {
  event.preventDefault();
  const overlayLoading = document.querySelector(".modal__overlay");
  overlayLoading.classList.remove("display-none");

  emailjs.sendForm(
    "service_e3qqtcf",
    "template_2tit16r",
    event.target,
    "6G_F_yg7CUVy-kc9W"
  )
  .then(() => {
    overlayLoading.classList.add("display-none");
    toggleModal();
  })
  .catch(() => {
    overlayLoading.classList.add("display-none");
    toggleModal();
    alert(
      "The email service is temporarily unavailable. Please contact me directly on broadybmx@gmail.com."
    );
  });
  ;
  console.log("Contact Function");
}

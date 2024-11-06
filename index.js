const homeSearchInput = document.querySelector("#home-search__input");
const homeSearchButton = document.querySelector("#home-search__button");


function homeSearch(search) {
  localStorage.setItem("search", search)
  window.location.href = `${window.location.origin}/find_movies.html`;
};

homeSearchButton.addEventListener("click", (e) => {
  e.preventDefault();
  homeSearch(homeSearchInput.value);
});

homeSearchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    homeSearch(homeSearchInput.value);
  }
});
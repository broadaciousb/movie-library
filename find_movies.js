// DATA API: https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83
// POSTER API: http://img.omdbapi.com/?i=tt3896198&apikey=f54b9d83

const movieListEl = document.querySelector(".movie__list");
const movieAPI = `https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83`;
const searchInput = document.querySelector("#search__input");
const searchButton = document.querySelector("#search__button");
const homeSearch = localStorage.getItem("search");

var filter = ``;

const enterSearch = '<h3 class="error__message too-many-results">Please enter something</h3>';

const tooManyResults =
  '<h3 class="error__message too-many-results">Too many results, narrow your search please.</h3>';

const movieNotFound =
  '<h3 class="error__message movie-not-found">Movie not found, try again.</h3>';

const loadingResults = document.querySelector(".result__overlay--loading");
const loadingBars = document.querySelectorAll(".loading__bar--highlight");

function search(userSearch) {
  var newSearch = userSearch;
  var newAPI = movieAPI + `&s=${newSearch}` + filter;
  main(newAPI);
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  search(searchInput.value);
});

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    search(searchInput.value);
  }
});

function filterMovies(event) {
  if (event.target.value === "movie") {
    filter = "&type=movie";
  } else if (event.target.value === "series") {
    filter = "&type=series";
  } else if (event.target.value === "episode") {
    filter = "&type=episode";
  } else {
    filter = "";
  }
  search(searchInput.value);
}

async function main(API) {
  loadingBars.forEach((bar) => bar.classList.remove("loading__hidden"));
  loadingResults.classList += " result__overlay--visible";

  const movies = await fetch(API);
  const moviesData = await movies.json();
  console.log(moviesData);

  setTimeout(() => {
    loadingResults.classList.remove("result__overlay--visible");
    loadingBars.forEach((bar) => bar.classList.add("loading__hidden"));
    if (!searchInput.value && !homeSearch) {
      movieListEl.innerHTML = enterSearch;
    } else if (moviesData.Error === "Too many results.") {
      movieListEl.innerHTML = tooManyResults;
    } else if (moviesData.Error === "Movie not found!") {
      movieListEl.innerHTML = movieNotFound;
    } else {
      movieListEl.innerHTML = moviesData.Search.map((movie) =>
        movieHTML(movie)
      ).join("");
    }
  }, 500);
}

function movieHTML(movie) {
  return `<div class="movie__wrapper">
            <div class="movie">
              <div class="movie__img--wrapper">
                <img src="${movie.Poster}" alt="" class="movie__img">
              </div>
              <h3 class="movie__title">${movie.Title}</h3>
            </div>
          </div>`;
}

if (homeSearch) {
  search(homeSearch);
  localStorage.removeItem("search");
}

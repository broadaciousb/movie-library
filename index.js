// DATA API: https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83
// POSTER API: http://img.omdbapi.com/?i=tt3896198&apikey=f54b9d83

const movieListEl = document.querySelector(".movie__list");
const movieAPI = `https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83`;
const searchInput = document.querySelector("#search__input");
const searchButton = document.querySelector("#search__button");

var filter = ``;

const tooManyResults =
  '<h3 class="too-many-results">Too many results, narrow your search please.</h3>';

const movieNotFound =
  '<h3 class="movie-not-found">Movie not found, try again.</h3>';

const loadingResults = document.querySelector(".result__overlay--loading");
const loadingBar = document.querySelector(".loading__bar--highlight");

function search() {
  var newSearch = searchInput.value || "game";
  var newAPI = movieAPI + `&s=${newSearch}` + filter;
  main(newAPI);
}

searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  search();
});

searchInput.addEventListener("keypress", (e) => {
  search();
})

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
  console.log(event.target.value);
  console.log(filter);
  search();
}

async function main(API) {
  loadingBar.classList.remove("loading__hidden");
  loadingResults.classList += " result__overlay--visible";
  const movies = await fetch(API);
  const moviesData = await movies.json();
  console.log(moviesData);

  setTimeout(() => {
    loadingResults.classList.remove("result__overlay--visible");
    loadingBar.classList += " loading__hidden";
    if (moviesData.Error === "Too many results.") {
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

search();

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

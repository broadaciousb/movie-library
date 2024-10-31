// DATA API: https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83
// POSTER API: http://img.omdbapi.com/?i=tt3896198&apikey=f54b9d83

const movieListEl = document.querySelector(".movie__list");

async function main() {
  const movies = await fetch("https://www.omdbapi.com/?&i=tt3896198&apikey=f54b9d83&s='star'");
  const moviesData = await movies.json();
  console.log(moviesData);
  movieListEl.innerHTML = moviesData.Search.map((movie) => movieHTML(movie)).join("");
}

main();

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

// DATA API: https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83
// POSTER API: http://img.omdbapi.com/?apikey=[f54b9d83]&


async function main() {
  const movies = await fetch("https://www.omdbapi.com/?i=tt3896198&apikey=f54b9d83");
  moviesData = await movies.json();
  console.log(moviesData);
  
}

main();

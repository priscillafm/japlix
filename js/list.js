//URL de json
const listMovies = "https://japceibal.github.io/japflix_api/movies-data.json";

//almacenar la info de las pelis
let moviesData = [];

fetch(listMovies)
    .then(Response => Response.json())
    .then(data => { moviesData = data; })
    .catch(console.error);

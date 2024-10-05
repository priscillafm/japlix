const url = 'https://japceibal.github.io/japflix_api/movies-data.json'; 
let moviesData = [];
const searchbtn = document.getElementById('btnBuscar');

// cargar datos de peliculas
function dataMovies() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            moviesData = data;
        })
        .catch(error => console.error('Error en la petición:', error));
}

// mostrar estrellas segun puntuacion
function renderStars(voteAverage) {
    let starsHTML = '';
    const totalStars = Math.round(voteAverage / 2);

    for (let i = 0; i < totalStars; i++) {
        starsHTML += '<span class="fa fa-star checked"></span>';
    }
    for (let i = totalStars; i < 5; i++) {
        starsHTML += '<span class="fa fa-star"></span>';
    }

    return starsHTML;
}

//buscar y mostrar pelis
function buscarPeliculas() {
    const searchTerm = document.getElementById('inputBuscar').value.toLowerCase();
    const moviesList = document.getElementById('lista');
    moviesList.innerHTML = ''; 

    if (moviesData.length === 0) {
        moviesList.innerHTML = '<li class="list-group-item">No hay datos de películas disponibles.</li>';
        return;
    }

    const filteredMovies = moviesData.filter(pelicula => 
        pelicula.title.toLowerCase().includes(searchTerm) || 
        pelicula.genres.some(genero => genero.name.toLowerCase().includes(searchTerm)) ||
        (pelicula.tagline && pelicula.tagline.toLowerCase().includes(searchTerm)) ||
        (pelicula.overview && pelicula.overview.toLowerCase().includes(searchTerm))
    );

    filteredMovies.forEach(pelicula => {
        const li = document.createElement('li');
        li.classList.add('list-group-item', 'bg-secondary', 'text-white', 'mb-2'); // Añadir clases de Bootstrap
        li.innerHTML = `
            <h3 class="text-white">${pelicula.title}</h3>
            <p>${renderStars(pelicula.vote_average)}</p>
            <p><em>${pelicula.tagline || ''}</em></p>
        `;
        moviesList.appendChild(li);
    });

    if (filteredMovies.length === 0) {
        moviesList.innerHTML = '<li class="list-group-item">No se encontraron películas que coincidan con la búsqueda.</li>';
    }
}

// cargar informacion cuando se inicia la pag
document.addEventListener('DOMContentLoaded', dataMovies);

//buscar peliculas cuando hacemos click en el bootn
searchbtn.addEventListener('click', buscarPeliculas);
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    } 
});


// Utils

function createMovies(movies, container){
    container.innerHTML = '';
    movies.forEach(movie => {     
        //creando elementos por cada iteración del arreglo obtenido con las películas
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        // URL Base para obtener imágenes de la API https://image.tmdb.org/t/p/w300
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300'+ movie.poster_path);
        
        //Agregando películas en el html
        
        //Agregando las imágenes de las películas en su contenedor 
        movieContainer.appendChild(movieImg);
        
        //// Agregando las películas en el contenedor principal de la sección
        //const trendingMoviesPreviewList = document.querySelector('#trendingPreview .trendingPreview-movieList');
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = '';

    categories.forEach(category => {
        //Creando los elementos por cada cateogíra del arreglo;
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id'+category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `category=${category.id}-${category.name}`;
        });

        const categoryTitleText = document.createTextNode(category.name);

        //Agregando cada categoría en el html
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        
        container.appendChild(categoryContainer);
    });

}

// Llamados a la API
async function getTrendingMoviesPreview() {
    /* Con Fetch
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    */

    //Con Axios
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    createMovies(movies, trendingMoviesPreviewList);

}

async function getCategoriesPreview() {
    /* con Fetch
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await response.json();
    */
    
    //con Axios
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
    //Con Axios
    const { data } = await api('/discover/movie', {
        params: {
            with_genres: id
        }
    });
    const movies = data.results;

    createMovies(movies, genericListSection);
}

async function getMoviesBySearch(query) {
    //Con Axios
    const { data } = await api('search/movie', {
        params: {
            query: query
        }
    });
    const movies = data.results;

    createMovies(movies, genericListSection);
}

async function getTrendingMovies() {
    /* Con Fetch
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    */

    //Con Axios
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    createMovies(movies, genericListSection);

}
//Data
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
        'language': navigator.language || 'es-ES',
    } 
});

function likedMovieList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    //movie.id
    const likedMovies = likedMovieList();
    console.log(likedMovieList());

    if (likedMovies[movie.id]) {
         //removerla de localstorage
         likedMovies[movie.id] = undefined;
    } else {
         //agregar peli a localstorage
         likedMovies[movie.id] = movie;
     }

     localStorage.setItem('liked_movies', JSON.stringify(likedMovies));

     if (location.hash == '') {
        homePage();
     }
}


// Utils

//Agregando películas con un lazy loader
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //console.log(entry.target);
        //console.log({entry});
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    });
});

function createMovies(
    movies,
    container,
    { 
        lazyLoad = false,
        clean = true
    }= {},
    ){
        if (clean) {
        container.innerHTML = '';
    }  
    
    movies.forEach(movie => {     
        //creando elementos por cada iteración del arreglo obtenido con las películas
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = 'movie='+movie.id;
         });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        // URL Base para obtener imágenes de la API https://image.tmdb.org/t/p/w300
        movieImg.setAttribute(
            lazyLoad ? 'data-img' : 'src', 
            'https://image.tmdb.org/t/p/w300'+ movie.poster_path);

        movieImg.addEventListener('error', () => {
            const title = movieImg.getAttribute('alt');
            movieImg.setAttribute('src', `https://dummyimage.com/300x450/f0f0f0/404040.png&text=${title}`);
        });

        //Botón favoritos
        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        //verificamos si ya está clickeado en favoritos para mantener la clase
        likedMovieList()[movie.id] && movieBtn.classList.add('movie-btn--liked'); 
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');    
            likeMovie(movie);
        });

        
        //Agregando películas en el html
        if (lazyLoad) { 
            lazyLoader.observe(movieImg);
        }
        //Agregando las imágenes de las películas en su contenedor 
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        
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

    createMovies(movies, trendingMoviesPreviewList, true);

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

    createMovies(movies, genericListSection, {lazyLoad: true, clean: true});
}

function getPaginatedMoviesByCategory(id) {
    return async function() {
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        if (scrollIsBottom) {
            page++;
            //Con Axios
            const { data } = await api('/discover/movie', {
            params: {
                with_genres: id,
                page,
            }
        });
        const movies = data.results;
        console.log(data.total_pages);
        maxPage = data.total_pages;
        createMovies(movies, genericListSection, {lazyLoad: true, clean: false});
        }
    }    
}

async function getMoviesBySearch(query) {
    //Con Axios
    const { data } = await api('search/movie', {
        params: {
            query: query
        }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(data.total_pages);

    createMovies(movies, genericListSection, {lazyLoad: true, clean: true});
}

function getPaginatedMoviesBySeach(query) {
   return async function() {
        const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

        if (scrollIsBottom) {
            page++;
            //Con Axios
            const { data } = await api('search/movie', {
            params: {
                query: query, 
                page,
            }
        });
            const movies = data.results;
            createMovies(movies, genericListSection, {lazyLoad : true, clean: false});
        }
   }
}

async function getTrendingMovies() {
    /* Con Fetch
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    */

    //Con Axios
    const { data } = await api('/trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericListSection, {lazyLoad: true, clean: true});

    // const btnLoadMore = document.createElement('button');
    // btnLoadMore.innerHTML = 'Cargar más';
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    // genericListSection.appendChild(btnLoadMore);
    
}

async function getPaginatedTrendingMovies() {

const { scrollTop, scrollHeight, clientHeight} = document.documentElement;
const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 15);

const pageIsNotMax = page < maxPage;

if (scrollIsBottom && pageIsNotMax) {
    page++;
    const { data } = await api('/trending/movie/day', {
        params: {
            page,
        },
    });
    const movies = data.results;

    createMovies(movies, genericListSection, {lazyLoad: true, clean: false});
}

    // const btnLoadMore = document.createElement('button');
    // btnLoadMore.innerHTML = 'Cargar más';
    // btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    // genericListSection.appendChild(btnLoadMore);
}

async function getMovieById(id) {
    //Con Axios
    headerSection.style.background = '#333';
    const { data } = await api('movie/' + id);
    const movie = data;
    console.log(movie);
    movieImgUrl = 'https://image.tmdb.org/t/p/w300'+ movie.poster_path;
    headerSection.style.background = `
    linear-gradient(
        180deg, 
        rgba(0, 0, 0, 0.35) 19.27%, 
        rgba(0, 0, 0, 0) 29.17%
        ),
    url(${movieImgUrl})`;

    movieDetailTitle.textContent = movie.title; 
    movieDetailDescription.textContent = movie.overview;
    vote_average = movie.vote_average.toFixed(2); //redondeamos los votos a 2 decimales con toFixed()
    movieDetailScore.textContent = vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);

    getRelatedMoviesById(id);
}

async function getRelatedMoviesById(id) {
    //Con Axios
    const { data } = await api('movie/' + id + '/similar');
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer, true);
    relatedMoviesContainer.scrollTo(0, 0);
}

function getLikedMovies() {
    const likedMovies = likedMovieList();
    // {keys: 'values'}
    const moviesArray = Object.values(likedMovies);
    
    createMovies(moviesArray, likedMoviesListArticle, {lazyLoad: true, clean:true});

    console.log(likedMovies);
}
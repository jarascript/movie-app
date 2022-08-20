const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    } 
});


async function getTrendingMoviesPreview() {
    /* Con Fetch
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();
    */

    //Con Axios
    const { data } = await api('/trending/movie/day');
    const movies = data.results;

    trendingMoviesPreviewList.innerHTML = '';
    
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
        trendingMoviesPreviewList.appendChild(movieContainer);
    });


}

async function getCategoriesPreview() {
    /* con Fetch
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await response.json();
    */
    
    //con Axios
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categoriesPreviewList.innerHTML = '';

    categories.forEach(category => {
        //Creando los elementos por cada cateogíra del arreglo;
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id'+category.id);
        const categoryTitleText = document.createTextNode(category.name);

        //Agregando cada categoría en el html
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        //const categoriesPreviewList = document.querySelector('#categoriesPreview .categoriesPreview-list');
        
        categoriesPreviewList.appendChild(categoryContainer);
    })
}

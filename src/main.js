async function getTrendingMoviesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);
    const data = await res.json();

    const movies = data.results;
    
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
        
        // Agregando las películas en el contenedor principal de la sección
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });


}

async function getCategoriesPreview() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await response.json();
    
    const categories = data.genres;
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
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        previewCategoriesContainer.appendChild(categoryContainer);
    })
}

getTrendingMoviesPreview();
getCategoriesPreview();
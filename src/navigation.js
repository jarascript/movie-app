searchFormBtn.addEventListener('click', () => {
    if(searchFormInput.value == '') {
        alert("Debes ingresar un nombre de película para buscar");
       } 
    else {
        location.hash='search=' + searchFormInput.value; 
    }
});

trendingBtn.addEventListener('click', () => {
    location.hash='trends';
})

arrowBtn.addEventListener('click', () => {
    history.back();
    //location.hash='home';
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({location});
/*
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#category=')) {
        categoriesPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailsPage();
    } else {
        homePage();
    }
*/
//Usando operadores ternarios
    location.hash.startsWith('#trends') ? trendsPage() : 
    location.hash.startsWith('#search=') ? searchPage() :
    location.hash.startsWith('#category=') ? categoriesPage() :
    location.hash.startsWith('#movie=') ? movieDetailsPage() :
    homePage();

    document.body.scrollTop = 0;
}

function homePage() {
    console.log("HOME!");

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //convertimos el string de la url y lo convertimos en un array para obtener el id
    const [, categoryData] = location.hash.split('=') // ['category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-'); 

    headerCategoryTitle.innerHTML = categoryName.replaceAll('%20', ' '); //para quitar los espacios

    getMoviesByCategory(categoryId);

}

function movieDetailsPage() {
    console.log("Movie!");
    headerSection.classList.add('header-container--long');
    //headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    //convertimos el string de la url y lo convertimos en un array para obtener la búsqueda
    const [, movieId] = location.hash.split('=') // ['#movie=', 'movieId']
    console.log(movieId);
    getMovieById(movieId);
}

function searchPage() {
    console.log('Buscando Película!');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');

    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    //convertimos el string de la url y lo convertimos en un array para obtener la búsqueda
    const [, query] = location.hash.split('=') // ['inputSearch', 'query']
    query_final = query.replaceAll('%20', ' '); //para quitar los espacios
    console.log(query_final);
    getMoviesBySearch(query_final);
}

function trendsPage() {
    console.log('TRENDS'); 

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');

    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericListSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Tendencias'; 
    getTrendingMovies();
}

